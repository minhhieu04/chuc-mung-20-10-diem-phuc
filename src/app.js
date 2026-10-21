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
    this.initInteractiveHeroHeading();
    this.initCardSwipeDeck();
    this.initInteractiveTulips();
    this.initInteractiveLanterns();
    this.initInteractiveReasons();
    this.initScrollRevealAnimations();
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
    if (this.isDeckStickerMode && imgEl.id === 'hero-portrait-img') return;
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
    if (this._heroTypewriterReady && this._lastReducedMotion !== Boolean(config.reducedMotion)) {
      this._lastReducedMotion = Boolean(config.reducedMotion);
      this.startHeroTypewriter();
    }

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
          ? this.audio.currentSongTitle || 'Emm là đóa hoa đẹp nhấttt'
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
      if (node.classList && node.classList.contains('hero-name-gradient')) {
        const str = String(text || '');
        if (
          this._lastHeroNameText === str &&
          typeof node.innerHTML === 'string' &&
          node.innerHTML.includes('hero-type-char')
        ) {
          return;
        }
        this._lastHeroNameText = str;
        node.textContent = str;
        if (typeof node.setAttribute === 'function') {
          node.setAttribute('data-typewriter-segmented', 'true');
        }
        let charIdx = 0;
        const words = str.split(' ');
        node.innerHTML = words
          .map((word) => {
            const charsHtml = Array.from(word)
              .map((ch) => {
                const idx = charIdx++;
                return `<span class="hero-char hero-type-char" data-char-index="${idx}" style="--char-idx:${idx}">${escapeHtml(ch)}</span>`;
              })
              .join('');
            return `<span class="hero-char-word">${charsHtml}</span>`;
          })
          .join('<span class="hero-char-space"> </span>');
        if (this._heroTypewriterReady) {
          this.startHeroTypewriter();
        }
        return;
      }
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

    container.innerHTML = REASONS_LIST.map((r, idx) => {
      const title = this.localizeRecipientText(r.title, config);
      const detail = this.localizeRecipientText(r.detail, config);
      const cascadeDelay = (idx * 0.11).toFixed(2);
      return `
      <article class="reason-card" style="--cascade-delay: ${cascadeDelay}s;">
        <div class="reason-number" aria-hidden="true">${escapeHtml(r.number)}</div>
        <div>
          <h3 class="reason-title">${escapeHtml(title)}</h3>
          <p class="reason-detail">${escapeHtml(detail)}</p>
        </div>
      </article>
    `;
    }).join('');
    this.initInteractiveReasons();
    this.initScrollRevealAnimations();
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

    // Note: #hero-portrait-3d no longer uses mousemove 3D tilt so swipe deck transforms stay 100% stable

    // Stage 0: Unwrap Gift Curtain Button
    const unwrapBtn = this.doc.getElementById('btn-unwrap-gift');
    const giftCurtain = this.doc.getElementById('gift-curtain');
    if (unwrapBtn) {
      unwrapBtn.addEventListener('click', () => {
        if (typeof unwrapBtn.blur === 'function') unwrapBtn.blur();
        this.store.setGiftUnwrapped(true);
        if (this.doc.documentElement && typeof this.doc.documentElement.setAttribute === 'function') {
          this.doc.documentElement.setAttribute('data-unwrapped-entry', 'true');
        }
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
        this.startHeroTypewriter({ initialDelay: 360 });
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
        this.startHeroTypewriter();
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

    const celebrateLetterBtn = this.doc.getElementById('btn-letter-celebrate');
    if (celebrateLetterBtn) {
      celebrateLetterBtn.addEventListener('click', (e) => {
        if (e && typeof e.stopPropagation === 'function') e.stopPropagation();
        this.audio.playCelebrationChord();
        if (typeof this.particles.launchFireworkShow === 'function') {
          this.particles.launchFireworkShow();
        }
        if (typeof this.particles.triggerFlowerShower === 'function') {
          this.particles.triggerFlowerShower(56);
        }
        if (typeof this.particles.launchLanternWave === 'function') {
          this.particles.launchLanternWave();
        } else if (typeof this.particles.spawnCanvasLantern === 'function') {
          this.particles.spawnCanvasLantern('Chúc Diểm Phúc 20/10 luôn rạng rỡ!', '');
        }
      });
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
        this.audio.toggleMusic();
        if (typeof this.store.setMusicState === 'function') {
          this.store.setMusicState(this.audio.isPlaying, this.audio.melodyKey);
        } else {
          this.renderAll();
        }
      });
    }
    const switchMp3Btn = this.doc.getElementById('btn-switch-mp3');
    if (switchMp3Btn) {
      switchMp3Btn.addEventListener('click', (e) => {
        if (e && typeof e.stopPropagation === 'function') e.stopPropagation();
        if (typeof this.audio.nextMp3Track === 'function') {
          this.audio.nextMp3Track();
        }
        if (typeof this.store.setMusicState === 'function') {
          this.store.setMusicState(this.audio.isPlaying, this.audio.melodyKey);
        } else {
          this.renderAll();
        }
      });
    }
    const miniTrackInfo = this.doc.getElementById('mini-track-info');
    if (miniTrackInfo) {
      miniTrackInfo.addEventListener('click', () => {
        if (typeof this.audio.nextMp3Track === 'function') {
          this.audio.nextMp3Track();
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
        }
        this.renderAll();
      });
    }
  }

  prepareHeroTypewriterChars() {
    const heading = this.doc.getElementById('hero-interactive-heading');
    if (!heading || !heading.querySelectorAll) return;
    const dateWord = heading.querySelector ? heading.querySelector('.hero-word-date') : null;
    const words = heading.querySelectorAll('.hero-word');
    words.forEach((wordEl) => {
      if (wordEl.getAttribute && wordEl.getAttribute('data-typewriter-ready') === 'true') return;
      const rawText = (wordEl.textContent || '').trim();
      if (!rawText) return;
      if (wordEl.setAttribute) wordEl.setAttribute('data-typewriter-ready', 'true');
      const isDateWord =
        wordEl === dateWord ||
        Boolean(wordEl.classList && wordEl.classList.contains('hero-word-date'));
      const charClass = isDateWord ? 'hero-type-char hero-date-char' : 'hero-type-char';
      wordEl.innerHTML = Array.from(rawText)
        .map((ch) => `<span class="${charClass}">${escapeHtml(ch)}</span>`)
        .join('');
    });
  }

  startHeroTypewriter(options = {}) {
    const heading = this.doc.getElementById('hero-interactive-heading');
    if (!heading) return;

    this.prepareHeroTypewriterChars();

    if (this._heroTypewriterTimer) {
      clearTimeout(this._heroTypewriterTimer);
      this._heroTypewriterTimer = null;
    }
    if (this._heroTypewriterLoopTimer) {
      clearTimeout(this._heroTypewriterLoopTimer);
      this._heroTypewriterLoopTimer = null;
    }

    const allChars = Array.from(
      heading.querySelectorAll ? heading.querySelectorAll('.hero-type-char') : []
    );
    const dateWord = heading.querySelector ? heading.querySelector('.hero-word-date') : null;
    const sparkles = heading.querySelector ? heading.querySelector('.hero-name-sparkles') : null;

    if (allChars.length === 0) return;

    if (this.store.getState().config.reducedMotion) {
      if (heading.classList) heading.classList.remove('is-typewriting');
      allChars.forEach((c) => {
        if (c.classList) {
          c.classList.add('is-char-typed');
          c.classList.remove('is-char-cursor');
        }
      });
      if (dateWord && dateWord.classList) dateWord.classList.add('is-word-active');
      if (sparkles && sparkles.classList) sparkles.classList.add('is-sparkles-visible');
      return;
    }

    if (heading.classList) {
      heading.classList.add('is-typewriting');
    }
    allChars.forEach((c) => {
      if (c.classList) {
        c.classList.remove('is-char-typed', 'is-char-cursor');
      }
    });
    if (dateWord && dateWord.classList) {
      dateWord.classList.remove('is-word-active');
    }
    if (sparkles && sparkles.classList) {
      sparkles.classList.remove('is-sparkles-visible');
    }

    const initialDelay =
      options && typeof options.initialDelay === 'number' && options.initialDelay > 0
        ? options.initialDelay
        : 0;

    const typeStep = (idx) => {
      if (idx >= allChars.length) {
        if (sparkles && sparkles.classList) {
          sparkles.classList.add('is-sparkles-visible');
        }
        this._heroTypewriterLoopTimer = setTimeout(() => {
          this._heroTypewriterLoopTimer = null;
          this.startHeroTypewriter();
        }, 4200);
        if (
          this._heroTypewriterLoopTimer &&
          typeof this._heroTypewriterLoopTimer.unref === 'function'
        ) {
          this._heroTypewriterLoopTimer.unref();
        }
        return;
      }

      if (idx > 0 && allChars[idx - 1] && allChars[idx - 1].classList) {
        allChars[idx - 1].classList.remove('is-char-cursor');
      }

      const currentChar = allChars[idx];
      if (currentChar && currentChar.classList) {
        currentChar.classList.add('is-char-typed', 'is-char-cursor');
      }

      if (
        dateWord &&
        dateWord.classList &&
        !dateWord.classList.contains('is-word-active') &&
        ((currentChar && currentChar.classList && currentChar.classList.contains('hero-date-char')) ||
          (dateWord.contains && dateWord.contains(currentChar)) ||
          (currentChar && currentChar.closest && currentChar.closest('.hero-word-date')))
      ) {
        dateWord.classList.add('is-word-active');
      }

      const isCurrentNameChar = Boolean(
        currentChar && currentChar.classList && currentChar.classList.contains('hero-char')
      );
      const nextChar = allChars[idx + 1];
      const isNextNameChar = Boolean(
        nextChar && nextChar.classList && nextChar.classList.contains('hero-char')
      );

      let delay = isCurrentNameChar ? 82 : 60;
      if (!isCurrentNameChar && isNextNameChar) {
        delay = 175;
      }
      if (idx === 0 && initialDelay > delay) {
        delay = initialDelay;
      }

      this._heroTypewriterTimer = setTimeout(() => {
        this._heroTypewriterTimer = null;
        typeStep(idx + 1);
      }, delay);
      if (this._heroTypewriterTimer && typeof this._heroTypewriterTimer.unref === 'function') {
        this._heroTypewriterTimer.unref();
      }
    };

    typeStep(0);
  }

  initInteractiveHeroHeading() {
    const heading = this.doc.getElementById('hero-interactive-heading');
    if (!heading || typeof heading.addEventListener !== 'function') return;

    this._heroTypewriterReady = true;
    this._lastReducedMotion = Boolean(this.store.getState().config.reducedMotion);
    this.startHeroTypewriter();

    const clearHoverStates = () => {
      const chars = heading.querySelectorAll ? heading.querySelectorAll('.hero-char') : [];
      chars.forEach((c) => {
        if (c.classList) c.classList.remove('is-char-hovered', 'is-char-neighbor');
      });
      const words = heading.querySelectorAll ? heading.querySelectorAll('.hero-word') : [];
      words.forEach((w) => {
        if (w.classList) w.classList.remove('is-word-hovered');
      });
    };

    const applyMagneticWave = (target) => {
      if (!target || !target.closest) return;
      const charEl = target.closest('.hero-char');
      const wordEl = target.closest('.hero-word');
      clearHoverStates();
      if (charEl) {
        const chars = Array.from(
          heading.querySelectorAll ? heading.querySelectorAll('.hero-char') : []
        );
        const idx = chars.indexOf(charEl);
        if (idx !== -1) {
          charEl.classList.add('is-char-hovered');
          if (chars[idx - 1] && chars[idx - 1].classList) {
            chars[idx - 1].classList.add('is-char-neighbor');
          }
          if (chars[idx + 1] && chars[idx + 1].classList) {
            chars[idx + 1].classList.add('is-char-neighbor');
          }
        }
      } else if (wordEl && wordEl.classList) {
        wordEl.classList.add('is-word-hovered');
      }
    };

    heading.addEventListener('pointerover', (e) => {
      applyMagneticWave(e.target);
    });

    heading.addEventListener('pointerleave', () => {
      clearHoverStates();
    });

    heading.addEventListener(
      'touchmove',
      (e) => {
        if (!e.touches || !e.touches[0] || typeof this.doc.elementFromPoint !== 'function') return;
        const touch = e.touches[0];
        const el = this.doc.elementFromPoint(touch.clientX, touch.clientY);
        if (el && heading.contains && heading.contains(el)) {
          applyMagneticWave(el);
        }
      },
      { passive: true }
    );

    heading.addEventListener('touchend', () => {
      setTimeout(clearHoverStates, 320);
    }, { passive: true });

    const triggerHeadingTypewriterReplay = (clientX, clientY) => {
      this.startHeroTypewriter();
      this.spawnHeadingParticles(clientX, clientY);

      if (typeof this.audio.playFlowerBloomChime === 'function') {
        this.audio.playFlowerBloomChime();
      } else {
        this.audio.playSparkleChime();
      }
      if (typeof this.particles.triggerFlowerShower === 'function') {
        this.particles.triggerFlowerShower(18);
      }
    };

    heading.addEventListener('click', (e) => {
      if (e && typeof e.stopPropagation === 'function') e.stopPropagation();
      triggerHeadingTypewriterReplay(e ? e.clientX : 0, e ? e.clientY : 0);
    });

    heading.addEventListener('keydown', (e) => {
      if (e && (e.key === 'Enter' || e.key === ' ')) {
        if (typeof e.preventDefault === 'function') e.preventDefault();
        triggerHeadingTypewriterReplay(0, 0);
      }
    });
  }

  spawnHeadingParticles(clientX, clientY) {
    const heading = this.doc.getElementById('hero-interactive-heading');
    if (!heading || !this.doc.createElement) return;
    const rect = heading.getBoundingClientRect
      ? heading.getBoundingClientRect()
      : { left: 0, top: 0, width: 320, height: 110 };
    const baseX =
      typeof clientX === 'number' && clientX > 0
        ? clientX - rect.left
        : (rect.width || 320) * 0.5;
    const baseY =
      typeof clientY === 'number' && clientY > 0
        ? clientY - rect.top
        : (rect.height || 110) * 0.5;

    const symbols = ['♥', '✦', '✿', '♥', '✦'];
    const colors = ['#FB7185', '#FDE047', '#F43F5E', '#F9A8D4', '#FBBF24'];

    symbols.forEach((sym, i) => {
      const span = this.doc.createElement('span');
      span.className = 'floating-heading-particle';
      span.setAttribute('aria-hidden', 'true');
      span.textContent = sym;
      const angle = ((i - 2) * 28 * Math.PI) / 180;
      const dist = 34 + (i % 2) * 16;
      const tx = Math.round(Math.sin(angle) * dist);
      const ty = Math.round(-Math.cos(angle) * dist - 14);
      const rot = Math.round((i - 2) * 15);
      span.style.left = `${baseX}px`;
      span.style.top = `${baseY}px`;
      span.style.color = colors[i % colors.length];
      span.style.setProperty('--tx', `${tx}px`);
      span.style.setProperty('--ty', `${ty}px`);
      span.style.setProperty('--rot', `${rot}deg`);
      heading.appendChild(span);
      setTimeout(() => {
        if (span.parentNode && typeof span.parentNode.removeChild === 'function') {
          span.parentNode.removeChild(span);
        }
      }, 950);
    });
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
    let lastSwipeEndedAt = 0;
    let pendingCleanupFn = null;

    const flushPendingCleanup = () => {
      if (typeof pendingCleanupFn === 'function') {
        const fn = pendingCleanupFn;
        pendingCleanupFn = null;
        fn(true);
      }
    };

    const updateDeckView = (direction = 0, fromSwipe = false, skipCardIdx = -1) => {
      const total = this.cardItems.length;
      this.cardItems.forEach((card, idx) => {
        if (idx !== skipCardIdx && card.style) {
          card.style.transition = '';
          card.style.transform = '';
          card.style.opacity = '';
          card.style.zIndex = '';
          card.style.pointerEvents = '';
        }
        card.classList.remove(
          'is-active',
          'is-stacked-1',
          'is-stacked-2',
          'is-stacked-hidden',
          'is-card-gliding'
        );
        const diff = (idx - this.activeCardIndex + total) % total;
        if (diff === 0) {
          card.classList.add('is-active');
          if (direction !== 0 && !fromSwipe) {
            card.classList.add('is-card-gliding');
          }
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
            if (idx === this.activeCardIndex) return;
            this.goToCard(idx, idx > this.activeCardIndex ? 1 : -1, false);
          });
          dotsContainer.appendChild(dot);
        }
      });
    }

    this.goToCard = (index, dir = 0, fromSwipe = false, skipCardIdx = -1) => {
      if (skipCardIdx === -1) {
        flushPendingCleanup();
      }
      const total = this.cardItems.length;
      this.activeCardIndex = (index + total) % total;
      updateDeckView(dir, fromSwipe, skipCardIdx);
    };

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        this.goToCard(this.activeCardIndex - 1, -1, false);
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        this.goToCard(this.activeCardIndex + 1, 1, false);
      });
    }

    // Direct click/tap on cards (stacked cards rotate, active card spawns hearts, art toggle button switches view)
    this.cardItems.forEach((card, idx) => {
      const artBtn = card.querySelector ? card.querySelector('.card-art-toggle-btn') : null;
      if (artBtn && typeof artBtn.addEventListener === 'function') {
        artBtn.addEventListener('click', (e) => {
          if (e && typeof e.stopPropagation === 'function') e.stopPropagation();
          this.toggleCardArtMode(card);
        });
      }

      card.addEventListener('click', (e) => {
        if (e && e.target && e.target.closest && e.target.closest('.card-art-toggle-btn')) return;
        if (isDragging || Date.now() - lastSwipeEndedAt < 260) return;
        const total = this.cardItems.length;
        const diff = (idx - this.activeCardIndex + total) % total;
        if (diff === 1) {
          this.goToCard(this.activeCardIndex + 1, 1, false);
        } else if (diff === 2) {
          this.goToCard(this.activeCardIndex + 2, 1, false);
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
    let activeInputMode = '';

    const resetNonActivePreviewStyles = (excludeIdx = -1) => {
      this.cardItems.forEach((card, idx) => {
        if (idx === this.activeCardIndex || idx === excludeIdx || !card.style) return;
        card.style.transition = '';
        card.style.transform = '';
        card.style.opacity = '';
        card.style.zIndex = '';
        card.style.pointerEvents = '';
      });
    };

    const onDragStart = (x, y, mode = '') => {
      flushPendingCleanup();
      startX = x;
      startY = y;
      currentDeltaX = 0;
      currentDeltaY = 0;
      isDragging = true;
      isDirectionLocked = false;
      isHorizontalSwipe = false;
      activeInputMode = mode;
    };

    const onDragMove = (x, y, e) => {
      if (!isDragging) return;
      currentDeltaX = x - startX;
      currentDeltaY = y - startY;

      if (!isDirectionLocked) {
        if (Math.abs(currentDeltaY) > Math.abs(currentDeltaX) && Math.abs(currentDeltaY) > 8) {
          isDragging = false;
          activeInputMode = '';
          return;
        }
        if (Math.abs(currentDeltaX) > 6) {
          isDirectionLocked = true;
          isHorizontalSwipe = true;
        }
      }

      if (isHorizontalSwipe) {
        if (e && e.cancelable && typeof e.preventDefault === 'function') {
          e.preventDefault();
        }
        const total = this.cardItems.length;
        const activeCard = this.cardItems[this.activeCardIndex];
        if (activeCard && activeCard.style && !this.store.getState().config.reducedMotion) {
          const clampedX = Math.max(-260, Math.min(260, currentDeltaX));
          const rot = Math.max(-10, Math.min(10, clampedX * 0.05));
          activeCard.style.transition = 'none';
          activeCard.style.zIndex = '12';
          activeCard.style.transform = `translate3d(${(clampedX * 0.88).toFixed(1)}px, ${(Math.abs(clampedX) * 0.03).toFixed(1)}px, 0) rotate(${rot.toFixed(2)}deg)`;

          if (total > 1) {
            const dir = currentDeltaX > 0 ? -1 : 1;
            const previewIdx = (this.activeCardIndex + dir + total) % total;
            resetNonActivePreviewStyles(previewIdx);
            const previewCard = this.cardItems[previewIdx];
            if (previewCard && previewCard.style) {
              const progress = Math.min(1, Math.abs(clampedX) / 130);
              const scale = (0.95 + 0.05 * progress).toFixed(4);
              const liftY = (10 * (1 - progress)).toFixed(2);
              previewCard.style.transition = 'none';
              previewCard.style.zIndex = '9';
              previewCard.style.opacity = '1';
              previewCard.style.transform = `translate3d(0, ${liftY}px, 0) scale(${scale})`;
            }
          }
        }
      }
    };

    const onDragEnd = () => {
      if (!isDragging) return;
      isDragging = false;
      activeInputMode = '';
      const total = this.cardItems.length;
      const outgoingIdx = this.activeCardIndex;
      const outgoingCard = this.cardItems[outgoingIdx];
      if (!outgoingCard) return;

      if (Math.abs(currentDeltaX) > 36 && isHorizontalSwipe && total > 1) {
        lastSwipeEndedAt = Date.now();
        const dir = currentDeltaX > 0 ? -1 : 1;
        const targetIdx = (outgoingIdx + dir + total) % total;
        const flyX = currentDeltaX > 0 ? '105%' : '-105%';
        const flyRot = currentDeltaX > 0 ? '10deg' : '-10deg';

        this.goToCard(targetIdx, dir, true, outgoingIdx);

        if (outgoingCard.style && !this.store.getState().config.reducedMotion) {
          outgoingCard.style.pointerEvents = 'none';
          outgoingCard.style.zIndex = '12';
          outgoingCard.style.transition = 'transform 0.22s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.22s ease-out';
          outgoingCard.style.transform = `translate3d(${flyX}, 6px, 0) rotate(${flyRot})`;
          outgoingCard.style.opacity = '0';

          let timerId = null;
          const cleanup = (flushedEarly = false) => {
            if (timerId) {
              clearTimeout(timerId);
              timerId = null;
            }
            if (outgoingCard.style) {
              outgoingCard.style.transition = 'none';
              outgoingCard.style.transform = '';
              outgoingCard.style.zIndex = '';
              outgoingCard.style.pointerEvents = '';
              if (flushedEarly) {
                outgoingCard.style.opacity = '';
              }
              if (typeof outgoingCard.offsetWidth === 'number') {
                void outgoingCard.offsetWidth;
              }
              outgoingCard.style.transition = '';
              if (!flushedEarly) {
                outgoingCard.style.opacity = '';
              }
            }
            if (pendingCleanupFn === cleanup) {
              pendingCleanupFn = null;
            }
          };
          pendingCleanupFn = cleanup;
          timerId = setTimeout(() => cleanup(false), 225);
          if (timerId && typeof timerId.unref === 'function') {
            timerId.unref();
          }
        }
      } else {
        if (isHorizontalSwipe) {
          lastSwipeEndedAt = Date.now();
        }
        resetNonActivePreviewStyles(-1);
        if (outgoingCard.style) {
          outgoingCard.style.transition = 'transform 0.22s cubic-bezier(0.22, 1, 0.36, 1)';
          outgoingCard.style.transform = 'translate3d(0, 0, 0) rotate(0deg)';
          let resetTimer = null;
          const cancelCleanup = () => {
            if (resetTimer) {
              clearTimeout(resetTimer);
              resetTimer = null;
            }
            if (outgoingCard.style) {
              outgoingCard.style.transition = 'none';
              outgoingCard.style.transform = '';
              outgoingCard.style.zIndex = '';
              if (typeof outgoingCard.offsetWidth === 'number') {
                void outgoingCard.offsetWidth;
              }
              outgoingCard.style.transition = '';
            }
            if (pendingCleanupFn === cancelCleanup) {
              pendingCleanupFn = null;
            }
          };
          pendingCleanupFn = cancelCleanup;
          resetTimer = setTimeout(cancelCleanup, 230);
          if (resetTimer && typeof resetTimer.unref === 'function') {
            resetTimer.unref();
          }
        }
      }
      currentDeltaX = 0;
      currentDeltaY = 0;
    };

    deck.addEventListener('touchstart', (e) => {
      if (e && e.target && e.target.closest && e.target.closest('.card-art-toggle-btn')) return;
      if (e.touches && e.touches[0]) onDragStart(e.touches[0].clientX, e.touches[0].clientY, 'touch');
    }, { passive: true });

    deck.addEventListener('touchmove', (e) => {
      if (activeInputMode !== 'touch') return;
      if (e.touches && e.touches[0]) onDragMove(e.touches[0].clientX, e.touches[0].clientY, e);
    }, { passive: false });

    deck.addEventListener('touchend', () => {
      if (activeInputMode === 'touch') onDragEnd();
    }, { passive: true });
    deck.addEventListener('touchcancel', () => {
      if (activeInputMode === 'touch') onDragEnd();
    }, { passive: true });

    deck.addEventListener('pointerdown', (e) => {
      if (e && e.target && e.target.closest && e.target.closest('.card-art-toggle-btn')) return;
      if (e.pointerType === 'touch' || (typeof e.button === 'number' && e.button !== 0)) return;
      if (typeof deck.setPointerCapture === 'function' && typeof e.pointerId === 'number') {
        try {
          deck.setPointerCapture(e.pointerId);
        } catch {
          // ignore pointer capture errors on synthetic events
        }
      }
      onDragStart(e.clientX, e.clientY, 'pointer');
    });

    deck.addEventListener('pointermove', (e) => {
      if (e.pointerType === 'touch' || activeInputMode !== 'pointer' || !isDragging) return;
      onDragMove(e.clientX, e.clientY, e);
    });

    deck.addEventListener('pointerup', (e) => {
      if (e.pointerType === 'touch' || activeInputMode !== 'pointer' || !isDragging) return;
      onDragEnd();
    });

    deck.addEventListener('pointercancel', (e) => {
      if (e.pointerType === 'touch' || activeInputMode !== 'pointer' || !isDragging) return;
      onDragEnd();
    });

    deck.addEventListener('mousedown', (e) => {
      if (e && e.target && e.target.closest && e.target.closest('.card-art-toggle-btn')) return;
      if (isDragging || e.button !== 0) return;
      if (typeof e.preventDefault === 'function') e.preventDefault();
      onDragStart(e.clientX, e.clientY, 'mouse');
    });

    if (typeof window !== 'undefined') {
      window.addEventListener('mousemove', (e) => {
        if (isDragging && activeInputMode === 'mouse') onDragMove(e.clientX, e.clientY, e);
      });
      window.addEventListener('mouseup', () => {
        if (isDragging && activeInputMode === 'mouse') onDragEnd();
      });
    }

    updateDeckView(0, true);
  }

  toggleCardArtMode(cardOrIndex, forceState) {
    const card =
      typeof cardOrIndex === 'number'
        ? this.cardItems && this.cardItems[cardOrIndex]
        : cardOrIndex;
    if (!card || !card.classList) return false;
    const nextArtMode =
      forceState !== undefined
        ? Boolean(forceState)
        : !card.classList.contains('is-art-mode');
    card.classList.toggle('is-art-mode', nextArtMode);
    const btn = card.querySelector ? card.querySelector('.card-art-toggle-btn') : null;
    if (btn) {
      if (btn.classList) btn.classList.toggle('is-active', nextArtMode);
      if (typeof btn.setAttribute === 'function') {
        btn.setAttribute('aria-pressed', String(nextArtMode));
        btn.setAttribute(
          'aria-label',
          nextArtMode ? 'Chuyển về xem ảnh gốc' : 'Chuyển sang xem tranh vẽ'
        );
      }
      const labelEl = btn.querySelector ? btn.querySelector('.art-toggle-label') : null;
      if (labelEl) {
        labelEl.textContent = nextArtMode ? 'Xem ảnh gốc' : 'Xem tranh vẽ';
      }
    }
    if (typeof this.audio.playSparkleChime === 'function') {
      this.audio.playSparkleChime();
    }
    return nextArtMode;
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

    nodes.forEach((node) => {
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
      });
    });

    // Custom wish form submit
    const wishForm = this.doc.getElementById('form-custom-wish');
    const wishInput = this.doc.getElementById('input-custom-wish');
    if (wishForm) {
      wishForm.addEventListener('submit', (e) => {
        if (e && typeof e.preventDefault === 'function') e.preventDefault();
        const text = wishInput && wishInput.value ? wishInput.value.trim() : '';
        if (!text) return;
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
      });
    });
  }

  initScrollRevealAnimations() {
    if (typeof IntersectionObserver !== 'function' || !this.doc.querySelectorAll) return;
    if (!this._scrollRevealObserver) {
      this._scrollRevealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.target && entry.target.classList) {
              entry.target.classList.add('is-scroll-revealed');
              this._scrollRevealObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.14, rootMargin: '0px 0px -32px 0px' }
      );
    }
    const targets = this.doc.querySelectorAll(
      '.section-header, .bouquet-visual-card, .reason-card, .envelope-box'
    );
    targets.forEach((el) => {
      if (el && el.classList && !el.classList.contains('is-scroll-revealed')) {
        this._scrollRevealObserver.observe(el);
      }
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
            target.closest('#hero-interactive-heading') ||
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

  showToast() {
    const toast = this.doc.getElementById('live-toast');
    if (!toast) return;
    toast.textContent = '';
    if (toast.style) {
      toast.style.opacity = '0';
      toast.style.display = 'none';
    }
    if (toast.classList && typeof toast.classList.remove === 'function') {
      toast.classList.remove('is-visible');
    }
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
