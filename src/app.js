import {
  DEFAULT_CONFIG,
  FALLBACK_PORTRAIT_URL,
  FLOWER_BOUQUET_ITEMS,
  REASONS_LIST,
  escapeHtml,
  isValidImageSrc
} from './data.js';
import { BirthdayStateStore } from './state.js';
import { RomanticAudioEngine } from './audio.js';
import { RomanticParticleEngine } from './particles.js';

/**
 * Compresses an uploaded image File into a bounded data:image/jpeg base64 URL.
 * @param {File} file
 * @param {number} [maxDimension=960]
 * @param {number} [quality=0.82]
 * @returns {Promise<string>}
 */
export function compressImageFile(file, maxDimension = 960, quality = 0.82) {
  return new Promise((resolve, reject) => {
    if (!file || typeof file.type !== 'string' || !file.type.startsWith('image/')) {
      reject(new Error('Vui lòng chọn một tệp hình ảnh hợp lệ (JPG, PNG, WEBP).'));
      return;
    }

    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Không thể đọc tệp hình ảnh.'));
    reader.onload = () => {
      const dataUrl = String(reader.result || '');
      if (typeof Image === 'undefined' || typeof document === 'undefined') {
        resolve(dataUrl);
        return;
      }
      const img = new Image();
      img.onerror = () => reject(new Error('Tệp hình ảnh bị lỗi hoặc không được hỗ trợ.'));
      img.onload = () => {
        let { width, height } = img;
        if (width > maxDimension || height > maxDimension) {
          if (width >= height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = Math.max(1, width);
        canvas.height = Math.max(1, height);
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(dataUrl);
          return;
        }
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        try {
          const compressed = canvas.toDataURL('image/jpeg', quality);
          resolve(compressed);
        } catch {
          resolve(dataUrl);
        }
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  });
}

/**
 * Main UI Controller for Emmm's 20/10 Gift Landing Page.
 */
export class BirthdayAppController {
  /**
   * @param {Document} doc
   * @param {BirthdayStateStore} [store]
   * @param {RomanticAudioEngine} [audio]
   * @param {RomanticParticleEngine} [particles]
   */
  constructor(doc, store, audio, particles) {
    this.doc = doc;
    this.store = store || new BirthdayStateStore();
    this.audio = audio || new RomanticAudioEngine();

    const prefersReduced =
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced && !this.store.getState().config.reducedMotion) {
      this.store.updateConfig({ reducedMotion: true });
    }

    const canvasEl = this.doc.getElementById('romantic-canvas');
    this.particles =
      particles ||
      new RomanticParticleEngine(canvasEl, {
        reducedMotion: this.store.getState().config.reducedMotion,
        theme: this.store.getState().config.theme
      });

    this.typewriterTimer = null;
    this._lastReasonsName = '';
    this._lastWishLanternsKey = '';
  }

  init() {
    if (typeof window !== 'undefined' && window.location && window.location.search) {
      try {
        const params = new URLSearchParams(window.location.search);
        const nameParam = params.get('name');
        if (nameParam && nameParam.trim()) {
          this.store.updateConfig({ recipientName: nameParam.trim() });
        }
        const themeParam = params.get('theme');
        if (themeParam === 'sakura' || themeParam === 'midnight') {
          this.store.updateConfig({ theme: themeParam });
        }
        if (params.get('unwrap') === '1') {
          this.store.setGiftUnwrapped(true);
        }
      } catch {
        // ignore URLSearchParams errors
      }
    }
    this.particles.init();
    this.attachImageFallback(this.doc.getElementById('hero-portrait-img'));
    this.attachImageFallback(this.doc.getElementById('gift-avatar-img'));
    this.attachImageFallback(this.doc.getElementById('nav-avatar-img'));
    this.renderAll();
    this.bindEvents();
    this.initAudioEngine();
    this.initCardSwipeDeck();
    this.initInteractiveTulips();
    this.initInteractiveLanterns();
    this.initBackgroundTap();
    this.store.subscribe(() => this.renderAll());
  }

  attachImageFallback(imgEl, fallbackUrl = FALLBACK_PORTRAIT_URL) {
    if (!imgEl || typeof imgEl.addEventListener !== 'function') return;
    const applyFallback = () => {
      const fb =
        (typeof imgEl.getAttribute === 'function' && imgEl.getAttribute('data-fallback-src')) ||
        fallbackUrl;
      const currentSrc = imgEl.getAttribute('src');
      if (currentSrc && currentSrc !== fb) {
        imgEl.setAttribute('data-failed-src', currentSrc);
        imgEl.setAttribute('src', fb);
      }
    };
    imgEl.addEventListener('error', applyFallback);
    if (imgEl.complete && typeof imgEl.naturalWidth === 'number' && imgEl.naturalWidth === 0) {
      applyFallback();
    }
  }

  syncPortraitElement(imgEl, config) {
    if (!imgEl || !isValidImageSrc(config.heroPortraitUrl)) return;
    const currentSrc = imgEl.getAttribute('src');
    const failedSrc = imgEl.getAttribute('data-failed-src');
    if (currentSrc !== config.heroPortraitUrl && failedSrc !== config.heroPortraitUrl) {
      if (typeof imgEl.removeAttribute === 'function') {
        imgEl.removeAttribute('data-failed-src');
      } else {
        imgEl.setAttribute('data-failed-src', '');
      }
      imgEl.setAttribute('src', config.heroPortraitUrl);
    }
    imgEl.setAttribute('alt', `Chân dung của ${config.recipientName}`);
  }

  renderAll() {
    const state = this.store.getState();
    const {
      config,
      wishLanterns,
      selectedFlowerId,
      activeLanternId,
      envelopeOpened,
      giftUnwrapped
    } = state;

    // 1. Theme & Reduced Motion attributes on documentElement
    if (this.doc.documentElement) {
      this.doc.documentElement.setAttribute('data-theme', config.theme);
      this.doc.documentElement.setAttribute(
        'data-reduced-motion',
        String(Boolean(config.reducedMotion))
      );
    }
    this.particles.setTheme(config.theme);
    this.particles.setReducedMotion(config.reducedMotion);

    // Sync document title & gift curtain state
    if ('title' in this.doc) {
      this.doc.title = `Chúc Mừng Ngày 20/10 ${config.recipientName} — Món Quà Nhỏ Từ Trái Tim`;
    }
    const giftCurtain = this.doc.getElementById('gift-curtain');
    if (giftCurtain) {
      giftCurtain.classList.toggle('is-hidden', Boolean(giftUnwrapped));
      giftCurtain.setAttribute('aria-hidden', String(Boolean(giftUnwrapped)));
    }

    // 2. Dynamic Text bindings
    this.setText('[data-bind="recipientName"]', config.recipientName);
    this.setText('[data-bind="recipientShortName"]', config.recipientShortName);
    this.setText('[data-bind="senderName"]', config.senderName);
    this.setText('[data-bind="birthdayTagline"]', config.birthdayTagline);
    this.setText('[data-bind="birthdaySubtitle"]', config.birthdaySubtitle);
    this.setText('[data-bind="heroPortraitCaption"]', config.heroPortraitCaption);

    // 3. Pre-loaded Portrait Images (preserve fallback if config URL failed)
    this.syncPortraitElement(this.doc.getElementById('hero-portrait-img'), config);
    this.syncPortraitElement(this.doc.getElementById('gift-avatar-img'), config);
    this.syncPortraitElement(this.doc.getElementById('nav-avatar-img'), config);

    // 4. Simplified Navbar Controls (Music Toggle, Next Cheerful Track, Light/Dark Theme)
    const themeBtn = this.doc.getElementById('btn-toggle-theme');
    if (themeBtn) {
      const isSakura = config.theme === 'sakura';
      themeBtn.setAttribute('aria-pressed', String(isSakura));
      themeBtn.setAttribute(
        'aria-label',
        isSakura ? 'Chuyển sang giao diện Đêm Sao' : 'Chuyển sang giao diện Sáng'
      );
      const labelSpan = themeBtn.querySelector('.btn-label-text');
      if (labelSpan) {
        labelSpan.textContent = isSakura ? 'Giao Diện Tối' : 'Giao Diện Sáng';
      }
    }

    const motionBtn = this.doc.getElementById('btn-toggle-motion');
    if (motionBtn) {
      motionBtn.setAttribute('aria-pressed', String(Boolean(config.reducedMotion)));
    }

    const musicBtn = this.doc.getElementById('btn-toggle-music');
    if (musicBtn) {
      musicBtn.setAttribute('aria-pressed', String(Boolean(this.audio.isPlaying)));
      const labelSpan = musicBtn.querySelector('.btn-label-text');
      if (labelSpan) {
        labelSpan.textContent = this.audio.isPlaying ? 'Đang phát nhạc' : 'Bật nhạc';
      }
    }

    const melodyBtn = this.doc.getElementById('btn-switch-melody');
    if (melodyBtn) {
      const labelSpan = melodyBtn.querySelector('.btn-label-text');
      if (labelSpan) {
        labelSpan.textContent = 'Đổi nhạc';
      }
    }

    const musicPill = this.doc.getElementById('floating-music-pill');
    if (musicPill) {
      musicPill.classList.toggle('is-playing', Boolean(this.audio.isPlaying));
      const playIcon = this.doc.getElementById('mini-play-icon');
      if (playIcon) {
        playIcon.textContent = this.audio.isPlaying ? '❚❚' : '▶';
      }
      const songNameEl = this.doc.getElementById('mini-song-name');
      if (songNameEl) {
        songNameEl.textContent = this.audio.isMp3Mode
          ? 'Một ngày buồn — Kiều Chi'
          : `Giai điệu: ${this.audio.getCurrentTrack()?.title || 'Upbeat Pop'}`;
      }
    }

    // 5. Render Bouquet Section
    this.renderFlowerBouquet(config);

    // 6. Render Reasons List
    this.renderReasons(config);

    // 7. Render Continuous Auto-Floating Sky Lantern Wishes
    this.renderWishLanterns(wishLanterns, activeLanternId, config);

    // 8. Render Love Letter Content
    this.renderLoveLetter(config, envelopeOpened);
  }

  setText(selector, text) {
    const nodes = this.doc.querySelectorAll(selector);
    nodes.forEach((node) => {
      node.textContent = text;
    });
  }

  localizeRecipientText(text, config) {
    if (typeof text !== 'string') return '';
    return this.store.replaceRecipientNames(
      text,
      DEFAULT_CONFIG.recipientName,
      config.recipientName,
      DEFAULT_CONFIG.recipientShortName,
      config.recipientShortName
    );
  }

  renderFlowerBouquet(config) {
    const wishEl = this.doc.getElementById('flower-blessing-wish');
    if (wishEl) {
      const poeticCaption =
        'Mỗi đóa hoa Tulip bung nở là một lời chúc gửi đến Diểm Phúc — mong Emm luôn dịu dàng, tỏa sáng và ngập tràn niềm vui ngày 20/10.';
      wishEl.textContent = this.localizeRecipientText(poeticCaption, config);
    }
  }

  renderReasons(config = this.store.getState().config) {
    const container = this.doc.getElementById('reasons-grid');
    if (!container) return;
    const reasonsKey = `${config.recipientName}|${config.recipientShortName}`;
    if (this._lastReasonsName === reasonsKey && container.innerHTML !== '') return;
    this._lastReasonsName = reasonsKey;

    container.innerHTML = REASONS_LIST.map((r) => {
      const title = this.localizeRecipientText(r.title, config);
      const detail = this.localizeRecipientText(r.detail, config);
      return `
      <article class="reason-card">
        <div class="reason-number" aria-hidden="true">${escapeHtml(r.number)}</div>
        <div>
          <h3 class="reason-title">${escapeHtml(title)}</h3>
          <p class="reason-detail">${escapeHtml(detail)}</p>
        </div>
      </article>
    `;
    }).join('');
  }

  /**
   * Renders the continuous, infinite upward stream of full-text sky lantern wishes.
   * Each lantern displays the complete wish text without truncation and loops endlessly.
   */
  renderWishLanterns(
    wishLanterns,
    activeLanternId,
    config = this.store.getState().config
  ) {
    const activeWish =
      wishLanterns.find((w) => w.id === activeLanternId) || wishLanterns[0] || null;
    const spotlightEl = this.doc.getElementById('lantern-spotlight-text');
    if (spotlightEl && activeWish) {
      const localizedSpot = this.localizeRecipientText(activeWish.text, config);
      spotlightEl.textContent = `✨ Lời chúc từ ${activeWish.author}: "${localizedSpot}"`;
    }

    const wishesKey = `${JSON.stringify(wishLanterns)}-${config.recipientName}-${config.recipientShortName}`;
    if (this._lastWishLanternsKey === wishesKey) {
      return;
    }
    this._lastWishLanternsKey = wishesKey;

    const skyArea = this.doc.getElementById('lantern-sky-floating-area');
    if (!skyArea) return;

    const buildLanternCard = (item, idx, isDuplicateCycle = false) => {
      const laneClass = idx % 2 === 0 ? 'lane-left' : 'lane-right';
      const swayDelay = ((idx % 5) * 0.7).toFixed(2);
      const fullWishText = this.localizeRecipientText(item.text, config);
      return `
        <article
          class="floating-sky-lantern ${laneClass}"
          data-lantern-id="${escapeHtml(item.id)}"
          style="animation-delay: ${swayDelay}s;"
          ${isDuplicateCycle ? 'aria-hidden="true"' : ''}
        >
          <div class="lantern-bulb" aria-hidden="true">
            <span class="lantern-crown"></span>
            <span class="lantern-core-flame"></span>
            <span class="lantern-base-rim"></span>
          </div>
          <span class="lantern-cord" aria-hidden="true"></span>
          <div class="lantern-wish-ribbon">
            <p class="lantern-wish-text">${escapeHtml(fullWishText)}</p>
            <span class="lantern-wish-author">— ${escapeHtml(item.author)}</span>
          </div>
        </article>
      `;
    };

    const primaryCards = wishLanterns.map((item, idx) => buildLanternCard(item, idx, false)).join('');
    const loopCards = wishLanterns.map((item, idx) => buildLanternCard(item, idx, true)).join('');

    skyArea.innerHTML = `
      <div class="lantern-stream-track">
        <div class="lantern-stream-cycle">${primaryCards}</div>
        <div class="lantern-stream-cycle" aria-hidden="true">${loopCards}</div>
      </div>
    `;
  }

  renderLoveLetter(config, envelopeOpened) {
    const parchment = this.doc.getElementById('letter-parchment');
    const sealBtn = this.doc.getElementById('btn-open-envelope');
    if (parchment) {
      parchment.classList.toggle('is-open', Boolean(envelopeOpened));
    }
    if (sealBtn) {
      sealBtn.setAttribute('aria-expanded', String(Boolean(envelopeOpened)));
      const label = sealBtn.querySelector('.seal-btn-text');
      if (label) {
        label.textContent = envelopeOpened
          ? 'Lá Thư Chúc Mừng 20/10'
          : 'Mở Phong Thư 20/10';
      }
    }

    const greetingEl = this.doc.getElementById('letter-greeting');
    if (greetingEl) greetingEl.textContent = config.letterGreeting;

    const bodyEl = this.doc.getElementById('letter-body');
    if (bodyEl && !this.typewriterTimer) {
      bodyEl.innerHTML = config.letterParagraphs
        .map((p) => `<p>${escapeHtml(p)}</p>`)
        .join('');
    }

    const sigEl = this.doc.getElementById('letter-signature');
    if (sigEl) sigEl.textContent = config.letterSignature;
  }

  attach3DTilt(element, maxDeg = 8) {
    if (!element || typeof element.addEventListener !== 'function') return;
    element.addEventListener('mousemove', (e) => {
      if (this.store.getState().config.reducedMotion) return;
      if (
        typeof window !== 'undefined' &&
        typeof window.matchMedia === 'function' &&
        window.matchMedia('(hover: none)').matches
      ) {
        return;
      }
      const rect = element.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const relX = (e.clientX - rect.left) / rect.width - 0.5;
      const relY = (e.clientY - rect.top) / rect.height - 0.5;
      const rotX = (-relY * maxDeg).toFixed(2);
      const rotY = (relX * maxDeg).toFixed(2);
      element.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
    });
    const resetTilt = () => {
      element.style.transform = '';
    };
    element.addEventListener('mouseleave', resetTilt);
    element.addEventListener('touchend', resetTilt, { passive: true });
    element.addEventListener('pointerCancel', resetTilt, { passive: true });
  }

  /**
   * Replays the multi-layered Tulip Bouquet blooming animation.
   * @param {boolean} [silent=false]
   */
  triggerBouquetBloom(silent = false) {
    this._lastBloomAt = Date.now();
    const bouquetSvg = this.doc.getElementById('interactive-bouquet-svg');
    if (bouquetSvg && bouquetSvg.classList) {
      bouquetSvg.classList.remove('is-blooming');
      if (typeof bouquetSvg.getBoundingClientRect === 'function') {
        bouquetSvg.getBoundingClientRect();
      }
      bouquetSvg.classList.add('is-blooming');
    }

    if (typeof this.particles.triggerFlowerShower === 'function') {
      this.particles.triggerFlowerShower(48);
    }
    if (!silent) {
      if (typeof this.audio.playFlowerBloomChime === 'function') {
        this.audio.playFlowerBloomChime();
      } else {
        this.audio.playSparkleChime();
      }
      this.showToast('🌷 Bó hoa Tulip 20/10 đang bung nở rực rỡ!');
    }
  }

  bindEvents() {
    if (typeof window !== 'undefined') {
      window.addEventListener(
        'pointermove',
        (e) => {
          this.particles.onPointerMove(e.clientX, e.clientY);
        },
        { passive: true }
      );
      window.addEventListener(
        'pointerdown',
        (e) => {
          this.particles.onPointerMove(e.clientX, e.clientY);
        },
        { passive: true }
      );
    }

    // 3D Tilt on Hero Portrait Card
    const heroCard = this.doc.getElementById('hero-portrait-3d');
    if (heroCard) {
      this.attach3DTilt(heroCard, 8);
    }

    // Stage 0: Unwrap Gift Curtain Button
    const unwrapBtn = this.doc.getElementById('btn-unwrap-gift');
    const giftCurtain = this.doc.getElementById('gift-curtain');
    if (unwrapBtn) {
      unwrapBtn.addEventListener('click', () => {
        if (typeof unwrapBtn.blur === 'function') unwrapBtn.blur();
        this.store.setGiftUnwrapped(true);
        if (giftCurtain) {
          giftCurtain.classList.add('is-hidden');
          giftCurtain.setAttribute('aria-hidden', 'true');
        }
        this.audio.startMusic(this.audio.melodyKey || 'birthday');
        if (typeof this.store.setMusicState === 'function') {
          this.store.setMusicState(this.audio.isPlaying, this.audio.melodyKey);
        }
        this.audio.playCelebrationChord();
        this.particles.launchFireworkShow();
        this.triggerBouquetBloom(true);
        this.renderAll();
      });
    }

    // Navbar Controls: Music Toggle, Next Track ("Đổi nhạc"), Theme Toggle, Reduced Motion
    const musicBtn = this.doc.getElementById('btn-toggle-music');
    if (musicBtn) {
      musicBtn.addEventListener('click', () => {
        this.audio.toggleMusic();
        if (typeof this.store.setMusicState === 'function') {
          this.store.setMusicState(this.audio.isPlaying, this.audio.melodyKey);
        } else {
          this.renderAll();
        }
      });
    }

    const melodyBtn = this.doc.getElementById('btn-switch-melody');
    if (melodyBtn) {
      melodyBtn.addEventListener('click', () => {
        if (typeof this.audio.nextMelody === 'function') {
          const track = this.audio.nextMelody();
          if (!this.audio.isPlaying) {
            this.audio.startMusic(track.key);
          }
          this.showToast(`🎵 Đã đổi sang giai điệu: ${track.title}`);
        } else {
          const nextMelody = this.audio.melodyKey === 'birthday' ? 'starlight' : 'birthday';
          this.audio.switchMelody(nextMelody);
        }
        if (typeof this.store.setMusicState === 'function') {
          this.store.setMusicState(this.audio.isPlaying, this.audio.melodyKey);
        } else {
          this.renderAll();
        }
      });
    }

    // Blooming Bouquet Replay Trigger
    const replayBloomBtn = this.doc.getElementById('btn-replay-bloom');
    if (replayBloomBtn) {
      replayBloomBtn.addEventListener('click', () => this.triggerBouquetBloom(false));
    }
    const heroBloomBtn = this.doc.getElementById('btn-hero-bloom');
    if (heroBloomBtn) {
      heroBloomBtn.addEventListener('click', () => {
        setTimeout(() => this.triggerBouquetBloom(false), 260);
      });
    }

    const bouquetSvg = this.doc.getElementById('interactive-bouquet-svg');
    if (bouquetSvg) {
      bouquetSvg.addEventListener('click', () => {
        this.triggerBouquetBloom(false);
      });
      if (typeof IntersectionObserver === 'function') {
        const bouquetSection = this.doc.getElementById('flower-bouquet') || bouquetSvg;
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (
                entry.isIntersecting &&
                this.store.getState().giftUnwrapped &&
                Date.now() - (this._lastBloomAt || 0) > 2200
              ) {
                this.triggerBouquetBloom(true);
              }
            });
          },
          { threshold: 0.25 }
        );
        observer.observe(bouquetSection);
      }
    }

    const themeBtn = this.doc.getElementById('btn-toggle-theme');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        const current = this.store.getState().config.theme;
        this.store.updateConfig({ theme: current === 'midnight' ? 'sakura' : 'midnight' });
      });
    }

    const motionBtn = this.doc.getElementById('btn-toggle-motion');
    if (motionBtn) {
      motionBtn.addEventListener('click', () => {
        const current = this.store.getState().config.reducedMotion;
        this.store.updateConfig({ reducedMotion: !current });
      });
    }

    // Love Letter Wax Seal Button
    const sealBtn = this.doc.getElementById('btn-open-envelope');
    if (sealBtn) {
      sealBtn.addEventListener('click', () => {
        const currentlyOpen = this.store.getState().envelopeOpened;
        this.store.setEnvelopeOpened(!currentlyOpen);
        if (!currentlyOpen) {
          this.audio.playCelebrationChord();
          this.particles.triggerCelebrationBurst();
          if (typeof this.particles.triggerFlowerShower === 'function') {
            this.particles.triggerFlowerShower(40);
          }
        }
      });
    }
  }

  initAudioEngine() {
    const audioEl = this.doc.getElementById('bg-audio-player');
    if (audioEl && typeof this.audio.setAudioElement === 'function') {
      this.audio.setAudioElement(audioEl);
    }
    const miniPlayBtn = this.doc.getElementById('mini-play-btn');
    if (miniPlayBtn) {
      miniPlayBtn.addEventListener('click', () => {
        this.audio.toggleMusic();
        if (typeof this.store.setMusicState === 'function') {
          this.store.setMusicState(this.audio.isPlaying, this.audio.melodyKey);
        } else {
          this.renderAll();
        }
      });
    }
    const miniNextBtn = this.doc.getElementById('mini-next-btn');
    if (miniNextBtn) {
      miniNextBtn.addEventListener('click', () => {
        if (typeof this.audio.nextMelody === 'function') {
          const track = this.audio.nextMelody();
          if (!this.audio.isPlaying) {
            this.audio.startMusic(track.key);
          }
          this.showToast(`🎵 Đã đổi sang giai điệu: ${track.title}`);
        }
        this.renderAll();
      });
    }
  }

  initCardSwipeDeck() {
    const deck = this.doc.getElementById('photo-card-deck');
    const prevBtn = this.doc.getElementById('btn-card-prev');
    const nextBtn = this.doc.getElementById('btn-card-next');
    const counterEl = this.doc.getElementById('card-counter');
    const dotsContainer = this.doc.getElementById('card-dots');
    if (!deck) return;

    this.cardItems = Array.from(deck.querySelectorAll ? deck.querySelectorAll('.photo-card-item') : []);
    if (this.cardItems.length === 0) return;

    this.activeCardIndex = 0;

    const updateDeckView = (direction = 0) => {
      const total = this.cardItems.length;
      this.cardItems.forEach((card, idx) => {
        card.classList.remove('is-active', 'is-stacked-1', 'is-stacked-2', 'is-stacked-hidden');
        const diff = (idx - this.activeCardIndex + total) % total;
        if (diff === 0) {
          card.classList.add('is-active');
        } else if (diff === 1) {
          card.classList.add('is-stacked-1');
        } else if (diff === 2) {
          card.classList.add('is-stacked-2');
        } else {
          card.classList.add('is-stacked-hidden');
        }
      });

      if (counterEl) {
        const titles = [
          'Diểm Phúc',
          'Rạng Rỡ & Duyên Dáng',
          'Trong Trẻo & Đáng Yêu',
          'Thanh Xuân Tươi Thắm',
          'Bình Yên & Tươi Vui',
          'Khoảnh Khắc Ngọt Ngào'
        ];
        counterEl.textContent = `${this.activeCardIndex + 1} / ${total} • ${titles[this.activeCardIndex] || 'Emm'}`;
      }

      if (dotsContainer && dotsContainer.children) {
        Array.from(dotsContainer.children).forEach((d, i) => {
          if (d.classList) d.classList.toggle('is-active', i === this.activeCardIndex);
        });
      }

      if (typeof this.audio.playSwipeSwoosh === 'function' && direction !== 0) {
        this.audio.playSwipeSwoosh();
      }
    };

    if (dotsContainer) {
      dotsContainer.innerHTML = '';
      this.cardItems.forEach((_, idx) => {
        if (this.doc.createElement) {
          const dot = this.doc.createElement('button');
          dot.type = 'button';
          dot.className = `card-dot-btn ${idx === 0 ? 'is-active' : ''}`;
          dot.setAttribute('aria-label', `Ảnh ${idx + 1}`);
          dot.addEventListener('click', () => {
            this.goToCard(idx, idx > this.activeCardIndex ? 1 : -1);
          });
          dotsContainer.appendChild(dot);
        }
      });
    }

    this.goToCard = (index, dir = 0) => {
      const total = this.cardItems.length;
      this.activeCardIndex = (index + total) % total;
      updateDeckView(dir);
    };

    if (prevBtn) {
      prevBtn.addEventListener('click', () => this.goToCard(this.activeCardIndex - 1, -1));
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', () => this.goToCard(this.activeCardIndex + 1, 1));
    }

    let startX = 0;
    let currentDeltaX = 0;
    let isDragging = false;

    const onDragStart = (x) => {
      startX = x;
      currentDeltaX = 0;
      isDragging = true;
    };

    const onDragMove = (x) => {
      if (!isDragging) return;
      currentDeltaX = x - startX;
      const activeCard = this.cardItems[this.activeCardIndex];
      if (activeCard && !this.store.getState().config.reducedMotion) {
        const rot = Math.max(-12, Math.min(12, currentDeltaX * 0.07));
        activeCard.style.transform = `translate3d(${currentDeltaX * 0.8}px, ${Math.abs(currentDeltaX) * 0.08}px, 0) rotate(${rot}deg)`;
      }
    };

    const onDragEnd = () => {
      if (!isDragging) return;
      isDragging = false;
      const activeCard = this.cardItems[this.activeCardIndex];
      if (activeCard) {
        activeCard.style.transform = '';
      }
      if (currentDeltaX > 48) {
        this.goToCard(this.activeCardIndex - 1, -1);
      } else if (currentDeltaX < -48) {
        this.goToCard(this.activeCardIndex + 1, 1);
      }
      currentDeltaX = 0;
    };

    deck.addEventListener('touchstart', (e) => {
      if (e.touches && e.touches[0]) onDragStart(e.touches[0].clientX);
    }, { passive: true });

    deck.addEventListener('touchmove', (e) => {
      if (e.touches && e.touches[0]) onDragMove(e.touches[0].clientX);
    }, { passive: true });

    deck.addEventListener('touchend', onDragEnd, { passive: true });

    deck.addEventListener('mousedown', (e) => {
      onDragStart(e.clientX);
    });

    if (typeof window !== 'undefined') {
      window.addEventListener('mousemove', (e) => {
        if (isDragging) onDragMove(e.clientX);
      });
      window.addEventListener('mouseup', () => {
        if (isDragging) onDragEnd();
      });
    }

    updateDeckView(0);
  }

  initInteractiveTulips() {
    const bouquetSvg = this.doc.getElementById('interactive-bouquet-svg');
    if (!bouquetSvg) return;
    const nodes = bouquetSvg.querySelectorAll ? bouquetSvg.querySelectorAll('.bouquet-flower-node') : [];
    const wishes = [
      '🌷 Đóa Tulip 1: Chúc Diểm Phúc luôn rạng ngời và ngập tràn niềm vui!',
      '🌸 Đóa Tulip 2: Nụ cười dịu dàng của Emm làm bừng sáng cả không gian!',
      '🌷 Đóa Tulip 3: Mong Emm luôn bình an, may mắn trên mọi bước đường!',
      '✨ Đóa Tulip 4: Chúc thanh xuân của Emm luôn tươi thắm và ngọt ngào!',
      '💖 Đóa Tulip 5: Đóa hoa đẹp nhất ngày 20/10 gửi tặng Diểm Phúc!',
      '🌷 Đóa Tulip 6: Mong Emm luôn được yêu thương, trân trọng và nâng niu!',
      '🌸 Đóa Tulip 7: Sự ấm áp và tinh tế rất riêng làm nên sức hút của Emm!',
      '✨ Đóa Tulip 8: Chúc mọi ước mơ trong tim Emm sớm thành hiện thực!',
      '🌷 Đóa Tulip 9: Luôn giữ mãi nét hồn nhiên, tươi vui và yêu đời nhé!',
      '🌸 Đóa Tulip 10: Vẻ đẹp trong trẻo, chân thành tựa hoa Tulip sớm mai!',
      '💖 Đóa Tulip 11: Chúc Diểm Phúc ngày 20/10 vạn sự như ý & hạnh phúc!'
    ];

    nodes.forEach((node, idx) => {
      if (node.style) node.style.cursor = 'pointer';
      node.addEventListener('click', () => {
        if (node.classList) {
          node.classList.remove('is-popping');
          if (typeof node.offsetWidth === 'number') void node.offsetWidth;
          node.classList.add('is-popping');
        }
        if (typeof this.audio.playFlowerBloomChime === 'function') {
          this.audio.playFlowerBloomChime();
        }
        if (typeof this.particles.triggerFlowerShower === 'function') {
          this.particles.triggerFlowerShower(16);
        }
        const wishText = wishes[idx % wishes.length];
        const captionEl = this.doc.getElementById('flower-blessing-wish');
        if (captionEl) {
          captionEl.textContent = wishText;
        }
        this.showToast(wishText);
      });
    });
  }

  initInteractiveLanterns() {
    const chipBtns = this.doc.querySelectorAll ? this.doc.querySelectorAll('.wish-chip-btn') : [];
    chipBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const wish = (btn.getAttribute && btn.getAttribute('data-wish')) || 'Chúc Diểm Phúc ngày 20/10 hạnh phúc!';
        if (typeof this.particles.spawnCanvasLantern === 'function') {
          this.particles.spawnCanvasLantern(wish, 'Ông chú Viettel');
        }
        if (typeof this.audio.playLanternGlowChime === 'function') {
          this.audio.playLanternGlowChime();
        }
        this.showToast(`🏮 Đèn trời ước nguyện đã bay lên: "${wish}"`);
      });
    });
  }

  initBackgroundTap() {
    if (typeof window === 'undefined') return;
    window.addEventListener('click', (e) => {
      const target = e.target;
      if (!target) return;
      const tagName = target.tagName ? target.tagName.toLowerCase() : '';
      if (
        tagName === 'button' ||
        tagName === 'a' ||
        tagName === 'input' ||
        (target.closest && (target.closest('button') || target.closest('a') || target.closest('#photo-card-deck')))
      ) {
        return;
      }
      if (typeof this.particles.spawnTouchLantern === 'function') {
        this.particles.spawnTouchLantern(e.clientX, e.clientY);
      }
    });
  }

  showToast(message) {
    const toast = this.doc.getElementById('live-toast');
    if (!toast) return;
    toast.textContent = message;
    toast.style.opacity = '1';
    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => {
      toast.style.opacity = '0';
    }, 3200);
  }
}

// Auto-initialize when running in a browser document
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  window.addEventListener('DOMContentLoaded', () => {
    const app = new BirthdayAppController(document);
    app.init();
    window.__birthdayApp = app;
  });
}
