import {
  DEFAULT_CONFIG,
  FALLBACK_PORTRAIT_URL,
  FLOWER_BOUQUET_ITEMS,
  PHOTO_STACK_ITEMS,
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
    this.envelopeStage = this.store.getState().envelopeOpened ? 'open' : 'closed';
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
    this.initInteractiveReasons();
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
      this.doc.title = `Chúc Mừng Ngày 20/10 ${config.recipientName} — Món Quà Nhỏ`;
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
    this.initInteractiveReasons();
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
      spotlightEl.textContent = `“${localizedSpot}”`;
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
    if (envelopeOpened) {
      this.envelopeStage = 'open';
    } else if (this.envelopeStage === 'open') {
      this.envelopeStage = 'closed';
    }
    const isPeeking = this.envelopeStage === 'peeking';
    const isOpen = this.envelopeStage === 'open' || Boolean(envelopeOpened);

    const parchment = this.doc.getElementById('letter-parchment');
    const sealBtn = this.doc.getElementById('btn-open-envelope');
    const envelopeScene = this.doc.getElementById('envelope-3d-scene');
    const envelopeBox = this.doc.getElementById('envelope-box');
    const topFlap = this.doc.getElementById('envelope-top-flap');
    const innerLetter = this.doc.getElementById('envelope-inner-letter');

    if (parchment) {
      parchment.classList.toggle('is-open', isOpen);
    }
    if (envelopeScene && envelopeScene.classList) {
      envelopeScene.classList.toggle('is-peeking', isPeeking);
      envelopeScene.classList.toggle('is-open', isPeeking || isOpen);
      envelopeScene.classList.toggle('is-extracted', isOpen);
    }
    if (envelopeBox && envelopeBox.classList) {
      envelopeBox.classList.toggle('is-peeking', isPeeking);
      envelopeBox.classList.toggle('is-open', isOpen);
    }
    if (topFlap && topFlap.classList) {
      topFlap.classList.toggle('is-open', isPeeking || isOpen);
    }
    if (innerLetter && innerLetter.classList) {
      innerLetter.classList.toggle('is-peeking', isPeeking);
      innerLetter.classList.toggle('is-open', isPeeking || isOpen);
    }
    if (sealBtn) {
      sealBtn.setAttribute('aria-expanded', String(isOpen));
      const label = sealBtn.querySelector('.seal-btn-text');
      if (label) {
        if (isOpen) {
          label.textContent = 'Lá Thư Chúc Mừng 20/10';
        } else if (isPeeking) {
          label.textContent = 'Ấn Hoặc Kéo Tờ Giấy Lên Để Mở Thư';
        } else {
          label.textContent = 'Chạm Để Mở Phong Thư';
        }
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

  /**
   * Step 1: Opens the envelope flap and slides the stationery letter sheet halfway out of the pocket.
   */
  openEnvelopeFlapToPeek() {
    if (this.envelopeStage !== 'closed') return;
    if (this._closeEnvelopeTimer) {
      clearTimeout(this._closeEnvelopeTimer);
      this._closeEnvelopeTimer = null;
    }
    this.envelopeStage = 'peeking';
    const envelopeScene = this.doc.getElementById('envelope-3d-scene');
    const parchment = this.doc.getElementById('letter-parchment');
    const innerLetter = this.doc.getElementById('envelope-inner-letter');
    if (envelopeScene && envelopeScene.classList) {
      envelopeScene.classList.remove('is-tucking-back', 'is-extracting');
    }
    if (parchment && parchment.classList) {
      parchment.classList.remove('is-closing');
    }
    if (innerLetter) {
      if (innerLetter.classList) innerLetter.classList.remove('is-jumping-out');
      if (innerLetter.style) {
        innerLetter.style.transform = '';
        innerLetter.style.transition = '';
      }
    }
    this.audio.playSparkleChime();
    if (typeof this.particles.triggerCelebrationBurst === 'function') {
      this.particles.triggerCelebrationBurst();
    }
    this.renderAll();
    this.showToast('✦ Phong thư đã mở! Ấn hoặc kéo tờ giấy thư lên để đọc nhé!');
  }

  /**
   * Step 2: Launches the peeking stationery sheet upward out of the pocket and expands it into the full letter view.
   */
  extractLetterToFullView() {
    if (this.envelopeStage === 'open') return;
    if (this._closeEnvelopeTimer) {
      clearTimeout(this._closeEnvelopeTimer);
      this._closeEnvelopeTimer = null;
    }
    const envelopeScene = this.doc.getElementById('envelope-3d-scene');
    const parchment = this.doc.getElementById('letter-parchment');
    const innerLetter = this.doc.getElementById('envelope-inner-letter');

    if (parchment && parchment.classList) {
      parchment.classList.remove('is-closing');
    }

    if (innerLetter) {
      if (innerLetter.style) {
        innerLetter.style.transform = '';
        innerLetter.style.transition = '';
      }
      if (innerLetter.classList) {
        innerLetter.classList.remove('is-jumping-out');
        if (typeof innerLetter.getBoundingClientRect === 'function') {
          innerLetter.getBoundingClientRect();
        }
        innerLetter.classList.add('is-jumping-out');
      }
    }

    if (envelopeScene && envelopeScene.classList) {
      envelopeScene.classList.remove('is-tucking-back', 'is-extracting');
      if (typeof envelopeScene.getBoundingClientRect === 'function') {
        envelopeScene.getBoundingClientRect();
      }
      envelopeScene.classList.add('is-extracting');
    }

    this.envelopeStage = 'open';
    this.store.setEnvelopeOpened(true);

    this.audio.playCelebrationChord();
    this.particles.triggerCelebrationBurst();
    if (typeof this.particles.triggerShockwave === 'function') {
      this.particles.triggerShockwave();
    }
    if (typeof this.particles.triggerFlowerShower === 'function') {
      this.particles.triggerFlowerShower(44);
    }
    this.showToast('✦ Đã mở lá thư chúc 20/10 gửi tặng Diểm Phúc!');
  }

  /**
   * Closes the stationery letter and folds the envelope back to its initial closed state
   * with a multi-stage tuck-and-seal animation.
   */
  closeEnvelopeAndLetter() {
    if (this._closeEnvelopeTimer) {
      clearTimeout(this._closeEnvelopeTimer);
      this._closeEnvelopeTimer = null;
    }
    const wasOpen = this.envelopeStage === 'open' || Boolean(this.store.getState().envelopeOpened);
    const envelopeScene = this.doc.getElementById('envelope-3d-scene');
    const parchment = this.doc.getElementById('letter-parchment');
    const innerLetter = this.doc.getElementById('envelope-inner-letter');

    if (envelopeScene && envelopeScene.classList) {
      envelopeScene.classList.remove('is-extracting', 'is-peeking', 'is-open', 'is-extracted', 'is-tucking-back');
    }
    if (innerLetter) {
      if (innerLetter.classList) {
        innerLetter.classList.remove('is-jumping-out', 'is-peeking', 'is-open');
      }
      if (innerLetter.style) {
        innerLetter.style.transform = '';
        innerLetter.style.transition = '';
      }
    }

    this.envelopeStage = 'closed';
    this.store.setEnvelopeOpened(false);
    this.renderAll();

    if (wasOpen) {
      if (parchment && parchment.classList) {
        parchment.classList.remove('is-closing');
        if (typeof parchment.getBoundingClientRect === 'function') {
          parchment.getBoundingClientRect();
        }
        parchment.classList.add('is-closing');
      }
      if (envelopeScene && envelopeScene.classList) {
        if (typeof envelopeScene.getBoundingClientRect === 'function') {
          envelopeScene.getBoundingClientRect();
        }
        envelopeScene.classList.add('is-tucking-back');
      }
      this._closeEnvelopeTimer = setTimeout(() => {
        if (parchment && parchment.classList) {
          parchment.classList.remove('is-closing');
        }
        if (envelopeScene && envelopeScene.classList) {
          envelopeScene.classList.remove('is-tucking-back');
        }
        this._closeEnvelopeTimer = null;
      }, 1150);
      if (this._closeEnvelopeTimer && typeof this._closeEnvelopeTimer.unref === 'function') {
        this._closeEnvelopeTimer.unref();
      }
    }

    this.audio.playSparkleChime();
    if (typeof this.particles.triggerCelebrationBurst === 'function') {
      this.particles.triggerCelebrationBurst();
    }
    this.showToast('✦ Đã gấp thư & niêm phong lại vào phong bì!');
  }

  /**
   * Steps through the 2-stage envelope choreography (Closed -> Peeking -> Extracted) or forces open/close.
   * @param {boolean} [forceState]
   */
  toggleEnvelopeWithExtraction(forceState) {
    if (forceState === false) {
      this.closeEnvelopeAndLetter();
      return;
    }
    if (forceState === true) {
      if (this.envelopeStage === 'closed') {
        this.openEnvelopeFlapToPeek();
      } else if (this.envelopeStage === 'peeking') {
        this.extractLetterToFullView();
      }
      return;
    }
    if (this.envelopeStage === 'closed') {
      this.openEnvelopeFlapToPeek();
    } else if (this.envelopeStage === 'peeking') {
      this.extractLetterToFullView();
    } else {
      this.closeEnvelopeAndLetter();
    }
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
      this.showToast('✦ Bó hoa Tulip 20/10 đang bung nở rực rỡ!');
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
        const nowPlaying = this.audio.toggleMusic();
        if (nowPlaying) {
          this.showToast('♪ Đang phát: Một ngày buồn — Kiều Chi');
        } else {
          this.showToast('❙❙ Đã tạm dừng nhạc');
        }
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
          this.showToast(`♪ Đã đổi sang giai điệu: ${track.title}`);
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

    // Love Letter Wax Seal Button & 2-Step Interactive Envelope Stage
    const sealBtn = this.doc.getElementById('btn-open-envelope');
    if (sealBtn) {
      sealBtn.addEventListener('click', (e) => {
        if (e && typeof e.stopPropagation === 'function') e.stopPropagation();
        this.toggleEnvelopeWithExtraction();
      });
    }

    const interactiveEnvelope = this.doc.getElementById('interactive-envelope');
    if (interactiveEnvelope) {
      interactiveEnvelope.addEventListener('click', () => {
        if (this.envelopeStage === 'closed') {
          this.openEnvelopeFlapToPeek();
        }
      });
    }

    const innerLetter = this.doc.getElementById('envelope-inner-letter');
    if (innerLetter) {
      let dragStartY = 0;
      let dragDeltaY = 0;
      let isLetterDragging = false;

      innerLetter.addEventListener('click', (e) => {
        if (e && typeof e.stopPropagation === 'function') e.stopPropagation();
        if (this.envelopeStage === 'closed') {
          this.openEnvelopeFlapToPeek();
        } else if (this.envelopeStage === 'peeking') {
          this.extractLetterToFullView();
        }
      });

      innerLetter.addEventListener('keydown', (e) => {
        if (e && (e.key === 'Enter' || e.key === ' ')) {
          if (typeof e.preventDefault === 'function') e.preventDefault();
          this.extractLetterToFullView();
        }
      });

      const onLetterDragStart = (clientY) => {
        if (this.envelopeStage !== 'peeking') return;
        dragStartY = clientY;
        dragDeltaY = 0;
        isLetterDragging = true;
      };

      const onLetterDragMove = (clientY, evt) => {
        if (!isLetterDragging || this.envelopeStage !== 'peeking') return;
        dragDeltaY = clientY - dragStartY;
        if (dragDeltaY < 0) {
          if (evt && evt.cancelable && typeof evt.preventDefault === 'function') {
            evt.preventDefault();
          }
          if (innerLetter.style && !this.store.getState().config.reducedMotion) {
            const liftY = Math.max(-220, -96 + dragDeltaY * 0.85);
            const scaleVal = (1 + Math.min(0.06, Math.abs(dragDeltaY) * 0.0005)).toFixed(3);
            innerLetter.style.transition = 'none';
            innerLetter.style.transform = `translateY(${liftY}px) scale(${scaleVal})`;
          }
        }
      };

      const onLetterDragEnd = () => {
        if (!isLetterDragging) return;
        isLetterDragging = false;
        if (dragDeltaY < -18) {
          this.extractLetterToFullView();
        } else if (innerLetter.style) {
          innerLetter.style.transition = '';
          innerLetter.style.transform = '';
        }
        dragDeltaY = 0;
      };

      innerLetter.addEventListener(
        'touchstart',
        (e) => {
          if (e.touches && e.touches[0]) onLetterDragStart(e.touches[0].clientY);
        },
        { passive: true }
      );
      innerLetter.addEventListener(
        'touchmove',
        (e) => {
          if (e.touches && e.touches[0]) onLetterDragMove(e.touches[0].clientY, e);
        },
        { passive: false }
      );
      innerLetter.addEventListener('touchend', onLetterDragEnd, { passive: true });

      innerLetter.addEventListener('mousedown', (e) => {
        if (e.button !== 0) return;
        onLetterDragStart(e.clientY);
      });

      if (typeof window !== 'undefined') {
        window.addEventListener('mousemove', (e) => {
          if (isLetterDragging) onLetterDragMove(e.clientY, e);
        });
        window.addEventListener('mouseup', () => {
          if (isLetterDragging) onLetterDragEnd();
        });
      }
    }

    const closeEnvelopeBtn = this.doc.getElementById('btn-close-envelope');
    if (closeEnvelopeBtn) {
      closeEnvelopeBtn.addEventListener('click', (e) => {
        if (e && typeof e.stopPropagation === 'function') e.stopPropagation();
        this.closeEnvelopeAndLetter();
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
        const nowPlaying = this.audio.toggleMusic();
        if (nowPlaying) {
          this.showToast('♪ Đang phát: Một ngày buồn — Kiều Chi');
        } else {
          this.showToast('❙❙ Đã tạm dừng nhạc');
        }
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
          this.showToast(`♪ Đã đổi sang giai điệu: ${track.title}`);
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
    let isAnimating = false;

    const updateDeckView = (direction = 0) => {
      const total = this.cardItems.length;
      this.cardItems.forEach((card, idx) => {
        card.classList.remove('is-active', 'is-stacked-1', 'is-stacked-2', 'is-stacked-hidden');
        if (card.style) {
          card.style.transform = '';
          card.style.opacity = '';
          card.style.transition = '';
        }
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
        counterEl.textContent = '';
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

    // Direct click/tap on cards (stacked cards rotate, active card spawns hearts)
    this.cardItems.forEach((card, idx) => {
      card.addEventListener('click', (e) => {
        if (isDragging) return;
        const total = this.cardItems.length;
        const diff = (idx - this.activeCardIndex + total) % total;
        if (diff === 1) {
          this.goToCard(this.activeCardIndex + 1, 1);
        } else if (diff === 2) {
          this.goToCard(this.activeCardIndex + 2, 1);
        } else if (diff === 0) {
          this.spawnCardHeart(e.clientX, e.clientY);
          if (typeof this.audio.playHeartPop === 'function') {
            this.audio.playHeartPop();
          }
        }
      });
    });

    let startX = 0;
    let startY = 0;
    let currentDeltaX = 0;
    let currentDeltaY = 0;
    let isDragging = false;
    let isDirectionLocked = false;
    let isHorizontalSwipe = false;

    const onDragStart = (x, y) => {
      if (isAnimating) return;
      startX = x;
      startY = y;
      currentDeltaX = 0;
      currentDeltaY = 0;
      isDragging = true;
      isDirectionLocked = false;
      isHorizontalSwipe = false;
    };

    const onDragMove = (x, y, e) => {
      if (!isDragging || isAnimating) return;
      currentDeltaX = x - startX;
      currentDeltaY = y - startY;

      if (!isDirectionLocked) {
        if (Math.abs(currentDeltaY) > Math.abs(currentDeltaX) && Math.abs(currentDeltaY) > 8) {
          isDragging = false;
          return;
        }
        if (Math.abs(currentDeltaX) > 8) {
          isDirectionLocked = true;
          isHorizontalSwipe = true;
        }
      }

      if (isHorizontalSwipe) {
        if (e && e.cancelable && typeof e.preventDefault === 'function') {
          e.preventDefault();
        }
        const activeCard = this.cardItems[this.activeCardIndex];
        if (activeCard && !this.store.getState().config.reducedMotion) {
          const rot = Math.max(-14, Math.min(14, currentDeltaX * 0.08));
          activeCard.style.transition = 'none';
          activeCard.style.transform = `translate3d(${currentDeltaX * 0.85}px, ${Math.abs(currentDeltaX) * 0.06}px, 0) rotate(${rot}deg)`;
        }
      }
    };

    const onDragEnd = () => {
      if (!isDragging) return;
      isDragging = false;
      const activeCard = this.cardItems[this.activeCardIndex];
      if (!activeCard) return;

      if (Math.abs(currentDeltaX) > 48 && isHorizontalSwipe) {
        isAnimating = true;
        const dir = currentDeltaX > 0 ? -1 : 1;
        const flyX = currentDeltaX > 0 ? '120%' : '-120%';
        const flyRot = currentDeltaX > 0 ? '16deg' : '-16deg';
        activeCard.style.transition = 'transform 0.24s ease-out, opacity 0.24s ease-out';
        activeCard.style.transform = `translate3d(${flyX}, 0, 0) rotate(${flyRot})`;
        activeCard.style.opacity = '0';

        setTimeout(() => {
          this.goToCard(this.activeCardIndex + dir, dir);
          isAnimating = false;
        }, 220);
      } else {
        activeCard.style.transition = 'transform 0.26s cubic-bezier(0.18, 0.89, 0.32, 1.15)';
        activeCard.style.transform = 'translate3d(0, 0, 0) rotate(0deg)';
        setTimeout(() => {
          if (activeCard.style) activeCard.style.transition = '';
        }, 280);
      }
      currentDeltaX = 0;
      currentDeltaY = 0;
    };

    deck.addEventListener('touchstart', (e) => {
      if (e.touches && e.touches[0]) onDragStart(e.touches[0].clientX, e.touches[0].clientY);
    }, { passive: true });

    deck.addEventListener('touchmove', (e) => {
      if (e.touches && e.touches[0]) onDragMove(e.touches[0].clientX, e.touches[0].clientY, e);
    }, { passive: false });

    deck.addEventListener('touchend', onDragEnd, { passive: true });

    deck.addEventListener('mousedown', (e) => {
      if (e.button !== 0) return;
      if (typeof e.preventDefault === 'function') e.preventDefault();
      onDragStart(e.clientX, e.clientY);
    });

    if (typeof window !== 'undefined') {
      window.addEventListener('mousemove', (e) => {
        if (isDragging) onDragMove(e.clientX, e.clientY, e);
      });
      window.addEventListener('mouseup', () => {
        if (isDragging) onDragEnd();
      });
    }

    updateDeckView(0);
  }

  spawnCardHeart(x, y) {
    const deck = this.doc.getElementById('photo-card-deck');
    if (!deck || !this.doc.createElement) return;
    const heart = this.doc.createElement('span');
    heart.className = 'floating-card-heart';
    heart.innerHTML = '<svg viewBox="0 0 24 24" width="28" height="28" fill="#F43F5E" style="filter: drop-shadow(0 2px 8px rgba(244,63,94,0.5)); display: block;"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>';
    const rect = deck.getBoundingClientRect ? deck.getBoundingClientRect() : { left: 0, top: 0, width: 300, height: 400 };
    const relX = typeof x === 'number' && x > 0 ? x - rect.left : (rect.width || 300) * 0.5;
    const relY = typeof y === 'number' && y > 0 ? y - rect.top : (rect.height || 400) * 0.5;
    heart.style.left = `${relX}px`;
    heart.style.top = `${relY}px`;
    deck.appendChild(heart);
    setTimeout(() => {
      if (heart.parentNode && typeof heart.parentNode.removeChild === 'function') {
        heart.parentNode.removeChild(heart);
      }
    }, 1100);
  }

  initInteractiveTulips() {
    const bouquetSvg = this.doc.getElementById('interactive-bouquet-svg');
    if (!bouquetSvg) return;
    const nodes = bouquetSvg.querySelectorAll ? bouquetSvg.querySelectorAll('.bouquet-flower-node') : [];
    const wishes = [
      '✦ Đóa Tulip 1: Chúc Diểm Phúc luôn rạng ngời và ngập tràn niềm vui!',
      '✦ Đóa Tulip 2: Nụ cười dịu dàng của Emm làm bừng sáng cả không gian!',
      '✦ Đóa Tulip 3: Mong Emm luôn bình an, may mắn trên mọi bước đường!',
      '✦ Đóa Tulip 4: Chúc thanh xuân của Emm luôn tươi thắm và ngọt ngào!',
      '✦ Đóa Tulip 5: Đóa hoa đẹp nhất ngày 20/10 gửi tặng Diểm Phúc!',
      '✦ Đóa Tulip 6: Mong Emm luôn được yêu thương, trân trọng và nâng niu!',
      '✦ Đóa Tulip 7: Sự ấm áp và tinh tế rất riêng làm nên sức hút của Emm!',
      '✦ Đóa Tulip 8: Chúc mọi ước mơ trong tim Emm sớm thành hiện thực!',
      '✦ Đóa Tulip 9: Luôn giữ mãi nét hồn nhiên, tươi vui và yêu đời nhé!',
      '✦ Đóa Tulip 10: Vẻ đẹp trong trẻo, chân thành tựa hoa Tulip sớm mai!',
      '✦ Đóa Tulip 11: Chúc Diểm Phúc ngày 20/10 vạn sự như ý & hạnh phúc!'
    ];

    nodes.forEach((node, idx) => {
      if (node.style) node.style.cursor = 'pointer';
      node.addEventListener('click', (e) => {
        if (e && typeof e.stopPropagation === 'function') e.stopPropagation();
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
          this.particles.spawnCanvasLantern(wish, '');
        }
        if (typeof this.audio.playLanternGlowChime === 'function') {
          this.audio.playLanternGlowChime();
        }
        if (typeof this.particles.triggerCelebrationBurst === 'function') {
          const rect = btn.getBoundingClientRect ? btn.getBoundingClientRect() : null;
          const x = rect ? rect.left + rect.width / 2 : 200;
          const y = rect ? rect.top : 400;
          this.particles.triggerCelebrationBurst(x, y, 18);
        }
        this.showToast(`✦ Hoa đăng ước nguyện đã bay lên: "${wish}"`);
      });
    });

    // Custom wish form submit
    const wishForm = this.doc.getElementById('form-custom-wish');
    const wishInput = this.doc.getElementById('input-custom-wish');
    if (wishForm) {
      wishForm.addEventListener('submit', (e) => {
        if (e && typeof e.preventDefault === 'function') e.preventDefault();
        const text = wishInput && wishInput.value ? wishInput.value.trim() : '';
        if (!text) {
          this.showToast('Vui lòng nhập lời ước nguyện trước khi thả đèn nhé!');
          return;
        }
        if (typeof this.particles.spawnCanvasLantern === 'function') {
          this.particles.spawnCanvasLantern(text, '');
        }
        if (typeof this.audio.playLanternGlowChime === 'function') {
          this.audio.playLanternGlowChime();
        }
        if (typeof this.particles.triggerCelebrationBurst === 'function') {
          const rect = wishForm.getBoundingClientRect ? wishForm.getBoundingClientRect() : null;
          const x = rect ? rect.left + rect.width / 2 : 300;
          const y = rect ? rect.top : 400;
          this.particles.triggerCelebrationBurst(x, y, 28);
        }
        if (wishInput) wishInput.value = '';
        this.showToast(`✦ Hoa đăng mang lời chúc "${text}" đang bay lên trời đêm!`);
      });
    }

    // Interactive taps on wish lanterns in the panoramic stage
    const skyArea = this.doc.getElementById('lantern-sky-floating-area');
    if (skyArea) {
      skyArea.addEventListener('click', (e) => {
        const lanternEl = e.target && e.target.closest ? e.target.closest('.floating-sky-lantern') : null;
        if (!lanternEl) return;
        const textEl = lanternEl.querySelector ? lanternEl.querySelector('.lantern-wish-text') : null;
        const wishText = textEl ? textEl.textContent : 'Chúc Diểm Phúc luôn rạng ngời!';
        if (lanternEl.classList) {
          lanternEl.classList.remove('is-popping');
          if (typeof lanternEl.offsetWidth === 'number') void lanternEl.offsetWidth;
          lanternEl.classList.add('is-popping');
        }
        if (typeof this.particles.spawnTouchLantern === 'function') {
          this.particles.spawnTouchLantern(e.clientX, e.clientY, wishText);
        }
        if (typeof this.audio.playLanternGlowChime === 'function') {
          this.audio.playLanternGlowChime();
        }
        this.showToast(`✦ Thả hoa đăng: "${wishText}"`);
      });
    }
  }

  initInteractiveReasons() {
    const cards = this.doc.querySelectorAll ? this.doc.querySelectorAll('.reason-card') : [];
    cards.forEach((card) => {
      if (card.style) card.style.cursor = 'pointer';
      card.addEventListener('click', () => {
        if (card.classList) {
          card.classList.remove('is-popping');
          if (typeof card.offsetWidth === 'number') void card.offsetWidth;
          card.classList.add('is-popping');
        }
        if (typeof this.audio.playHeartPop === 'function') {
          this.audio.playHeartPop();
        }
        if (typeof this.particles.triggerCelebrationBurst === 'function') {
          const rect = card.getBoundingClientRect ? card.getBoundingClientRect() : null;
          const x = rect ? rect.left + rect.width / 2 : 200;
          const y = rect ? rect.top + rect.height / 2 : 300;
          this.particles.triggerCelebrationBurst(x, y, 16);
        }
        const title = card.querySelector ? card.querySelector('.reason-title')?.textContent : '';
        this.showToast(`✦ Nét đẹp của Emm: ${title || 'Nụ cười tỏa nắng'}`);
      });
    });
  }

  initBackgroundTap() {
    if (typeof window === 'undefined') return;

    const handleTap = (clientX, clientY, target) => {
      if (!target) return;
      const tagName = target.tagName ? target.tagName.toLowerCase() : '';
      if (
        tagName === 'button' ||
        tagName === 'a' ||
        tagName === 'input' ||
        (target.closest &&
          (target.closest('button') ||
            target.closest('a') ||
            target.closest('input') ||
            target.closest('#photo-card-deck') ||
            target.closest('#floating-music-pill') ||
            target.closest('#gift-curtain') ||
            target.closest('#envelope-box') ||
            target.closest('.lantern-interactive-toolbar') ||
            target.closest('#interactive-bouquet-svg')))
      ) {
        return;
      }
      if (typeof this.particles.spawnTouchLantern === 'function') {
        this.particles.spawnTouchLantern(clientX, clientY);
      }
      if (typeof this.audio.playLanternGlowChime === 'function') {
        this.audio.playLanternGlowChime();
      }
      if (typeof this.particles.triggerSparkleTrail === 'function') {
        this.particles.triggerSparkleTrail(clientX, clientY, 6);
      }
    };

    window.addEventListener('click', (e) => {
      handleTap(e.clientX, e.clientY, e.target);
    });

    let touchStartX = 0;
    let touchStartY = 0;
    window.addEventListener('touchstart', (e) => {
      if (e.touches && e.touches[0]) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      }
    }, { passive: true });

    window.addEventListener('touchend', (e) => {
      if (e.changedTouches && e.changedTouches[0]) {
        const dx = Math.abs(e.changedTouches[0].clientX - touchStartX);
        const dy = Math.abs(e.changedTouches[0].clientY - touchStartY);
        if (dx < 12 && dy < 12) {
          handleTap(e.changedTouches[0].clientX, e.changedTouches[0].clientY, e.target);
        }
      }
    }, { passive: true });
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
