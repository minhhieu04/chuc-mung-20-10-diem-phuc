import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  LEGACY_STORAGE_KEY,
  LEGACY_V2_STORAGE_KEY,
  LEGACY_V3_STORAGE_KEY,
  LEGACY_V4_STORAGE_KEY,
  STORAGE_KEY,
  USER_PROVIDED_PORTRAIT_URL,
  FALLBACK_PORTRAIT_URL,
  DEFAULT_CONFIG,
  FLOWER_BOUQUET_ITEMS,
  DEFAULT_WISH_LANTERNS,
  PHOTO_STACK_ITEMS,
  escapeHtml,
  isValidImageSrc,
  sanitizeText
} from '../src/data.js';
import { BirthdayStateStore } from '../src/state.js';
import {
  RomanticAudioEngine,
  ROMANTIC_PLAYLIST,
  HAPPY_BIRTHDAY_MELODY,
  STARLIGHT_WALTZ_MELODY,
  ROSE_WALTZ_MELODY,
  MOONLIGHT_SERENADE_MELODY,
  SPRING_FLOWER_MELODY
} from '../src/audio.js';
import {
  RomanticParticleEngine,
  LANTERN_WISH_POOL
} from '../src/particles.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '..');

class MockStorage {
  constructor({
    throwOnSet = false,
    initialRaw = null,
    legacyRaw = null,
    legacyV2Raw = null,
    legacyV3Raw = null,
    legacyV4Raw = null
  } = {}) {
    this.map = new Map();
    this.throwOnSet = throwOnSet;
    if (initialRaw !== null) {
      this.map.set(STORAGE_KEY, initialRaw);
    }
    if (legacyRaw !== null) {
      this.map.set(LEGACY_STORAGE_KEY, legacyRaw);
    }
    if (legacyV2Raw !== null) {
      this.map.set(LEGACY_V2_STORAGE_KEY, legacyV2Raw);
    }
    if (legacyV3Raw !== null) {
      this.map.set(LEGACY_V3_STORAGE_KEY, legacyV3Raw);
    }
    if (legacyV4Raw !== null) {
      this.map.set(LEGACY_V4_STORAGE_KEY, legacyV4Raw);
    }
  }
  getItem(key) {
    return this.map.has(key) ? this.map.get(key) : null;
  }
  setItem(key, val) {
    if (this.throwOnSet) {
      const err = new Error('QuotaExceededError');
      err.name = 'QuotaExceededError';
      throw err;
    }
    this.map.set(key, String(val));
  }
  removeItem(key) {
    this.map.delete(key);
  }
}

test('1. Default data ("Diểm Phúc" + "Emm" & "Ông chú Viettel"), Tulip bouquet items, pre-loaded portrait link, 8 full-text wishes & local fallback asset exist', () => {
  assert.equal(DEFAULT_CONFIG.recipientName, 'Diểm Phúc');
  assert.equal(DEFAULT_CONFIG.recipientShortName, 'Emm');
  assert.equal(DEFAULT_CONFIG.senderName, 'Ông chú Viettel');
  assert.equal(DEFAULT_CONFIG.heroPortraitUrl, USER_PROVIDED_PORTRAIT_URL);
  assert.equal(DEFAULT_CONFIG.heroPortraitFallbackUrl, FALLBACK_PORTRAIT_URL);
  assert.equal(FLOWER_BOUQUET_ITEMS.length, 5);
  assert.ok(FLOWER_BOUQUET_ITEMS.every((item) => item.name.includes('Tulip')));
  assert.equal(DEFAULT_WISH_LANTERNS.length, 8);

  const fallbackHeroPath = path.resolve(PROJECT_ROOT, FALLBACK_PORTRAIT_URL);
  assert.ok(fs.existsSync(fallbackHeroPath), `Missing fallback hero image at ${fallbackHeroPath}`);
  assert.ok(fs.statSync(fallbackHeroPath).size > 10000, 'Fallback hero image should be non-empty');
});

test('2. Security & input sanitization helpers handle XSS and invalid URLs', () => {
  assert.equal(
    escapeHtml('<script>alert("xss")</script> & \'quotes\''),
    '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt; &amp; &#39;quotes&#39;'
  );
  assert.equal(escapeHtml(null), '');
  assert.equal(escapeHtml(undefined), '');

  assert.equal(isValidImageSrc(USER_PROVIDED_PORTRAIT_URL), true);
  assert.equal(isValidImageSrc('./assets/images/hero-portrait.jpg'), true);
  assert.equal(isValidImageSrc('https://example.com/photo.jpg'), true);
  assert.equal(isValidImageSrc('data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD='), true);
  assert.equal(isValidImageSrc('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA'), true);

  assert.equal(isValidImageSrc('javascript:alert(1)'), false);
  assert.equal(isValidImageSrc('data:text/html;base64,PHNjcmlwdD4='), false);
  assert.equal(isValidImageSrc('./assets/"><script>alert(1)</script>'), false);
  assert.equal(isValidImageSrc('./../etc/passwd'), false);
  assert.equal(isValidImageSrc(''), false);
  assert.equal(isValidImageSrc('   '), false);
  assert.equal(isValidImageSrc(null), false);

  assert.equal(sanitizeText('  Xin chào  ', 'fallback', 20), 'Xin chào');
  assert.equal(sanitizeText('   ', 'fallback', 20), 'fallback');
  assert.equal(sanitizeText('1234567890', 'fallback', 5), '12345');
});

test('3. BirthdayStateStore purges legacy v1/v2/v3/v4 storage, defaults to "Diểm Phúc" + "Emm", and supports config updates', () => {
  const storage = new MockStorage({
    legacyRaw: JSON.stringify({
      config: { recipientName: 'Phạm Diểm Phúc' }
    }),
    legacyV2Raw: JSON.stringify({
      config: { recipientName: 'Diểm Phúc', senderName: 'Người Gửi Cũ' }
    }),
    legacyV3Raw: JSON.stringify({
      config: { recipientName: 'Diểm Phúc', senderName: 'Ông chú Viettel' }
    }),
    legacyV4Raw: JSON.stringify({
      config: { recipientName: 'Emmm', recipientShortName: 'Emmm' }
    })
  });
  const store = new BirthdayStateStore(storage);

  assert.equal(storage.getItem(LEGACY_STORAGE_KEY), null);
  assert.equal(storage.getItem(LEGACY_V2_STORAGE_KEY), null);
  assert.equal(storage.getItem(LEGACY_V3_STORAGE_KEY), null);
  assert.equal(storage.getItem(LEGACY_V4_STORAGE_KEY), null);
  assert.equal(store.getState().config.recipientName, 'Diểm Phúc');
  assert.equal(store.getState().config.recipientShortName, 'Emm');
  assert.equal(store.getState().config.senderName, 'Ông chú Viettel');
  assert.equal(store.getState().config.heroPortraitUrl, USER_PROVIDED_PORTRAIT_URL);

  store.updateConfig({
    recipientName: 'Em Yêu',
    senderName: 'Chú Viettel Thân Thương'
  });
  const state1 = store.getState();
  assert.equal(state1.config.recipientName, 'Em Yêu');
  assert.equal(state1.config.senderName, 'Chú Viettel Thân Thương');
  assert.ok(
    state1.config.birthdayTagline.includes('Em Yêu'),
    'birthdayTagline must also update when recipientName changes'
  );
  assert.ok(state1.config.letterGreeting.includes('Em Yêu'));
  assert.ok(state1.config.letterSignature.includes('Chú Viettel Thân Thương'));
  assert.ok(state1.wishLanterns[0].text.includes('Em Yêu'));

  // Standalone recipientShortName update without recipientName must also replace short names across fields
  store.updateConfig({
    recipientShortName: 'Bé Phúc'
  });
  const stateShort = store.getState();
  assert.equal(stateShort.config.recipientShortName, 'Bé Phúc');
  assert.ok(
    stateShort.config.birthdaySubtitle.includes('Bé Phúc'),
    'Standalone recipientShortName update must replace short name in birthdaySubtitle'
  );
  assert.ok(
    stateShort.config.letterParagraphs.some((p) => p.includes('Bé Phúc')),
    'Standalone recipientShortName update must replace short name in letterParagraphs'
  );
  assert.ok(
    stateShort.wishLanterns.some((w) => w.text.includes('Bé Phúc')),
    'Standalone recipientShortName update must replace short name in wishLanterns'
  );

  const storeRehydrated = new BirthdayStateStore(storage);
  assert.equal(storeRehydrated.getState().config.recipientName, 'Em Yêu');
  assert.equal(storeRehydrated.getState().config.recipientShortName, 'Bé Phúc');

  storeRehydrated.resetToDefaults();
  assert.equal(storeRehydrated.getState().config.recipientName, 'Diểm Phúc');
  assert.equal(storeRehydrated.getState().config.recipientShortName, 'Emm');
  assert.equal(storeRehydrated.getState().config.senderName, 'Ông chú Viettel');
});

test('4. BirthdayStateStore gracefully handles corrupt JSON and QuotaExceededError', () => {
  const corruptStorage = new MockStorage({ initialRaw: '{not-valid-json' });
  const storeFromCorrupt = new BirthdayStateStore(corruptStorage);
  assert.equal(storeFromCorrupt.getState().config.recipientName, 'Diểm Phúc');
  assert.ok(storeFromCorrupt.storageWarning);

  const fullStorage = new MockStorage({ throwOnSet: true });
  const storeWithQuotaError = new BirthdayStateStore(fullStorage);
  storeWithQuotaError.updateConfig({ theme: 'sakura' });
  assert.equal(storeWithQuotaError.getState().config.theme, 'sakura');
  assert.ok(storeWithQuotaError.storageWarning);
});

test('5. Candle & Lantern state helpers remain functional in state store', () => {
  const store = new BirthdayStateStore(null);
  assert.equal(store.getState().allCandlesBlown, false);
  assert.equal(store.blowCandle(0), true);
  assert.equal(store.blowCandle(0), false);
  const extinguished = store.blowAllCandles();
  assert.deepEqual(extinguished, [1, 2]);
  assert.equal(store.getState().allCandlesBlown, true);
  store.relightCandles();
  assert.equal(store.getState().allCandlesBlown, false);

  const initialCount = store.getState().wishLanterns.length;
  assert.equal(store.addWishLantern('   '), null);
  const created = store.addWishLantern('Chúc Diểm Phúc ngày 20/10 vạn sự như ý!', 'Ông chú Viettel');
  assert.ok(created);
  assert.equal(store.getState().wishLanterns.length, initialCount + 1);
});

test('6. Upbeat RomanticAudioEngine 5-song playlist & RomanticParticleEngine Tulip particles / reduced motion / theme contrast', () => {
  const audio = new RomanticAudioEngine();
  assert.equal(ROMANTIC_PLAYLIST.length, 5);
  assert.ok(HAPPY_BIRTHDAY_MELODY.length >= 18);
  assert.ok(STARLIGHT_WALTZ_MELODY.length >= 18);
  assert.ok(ROSE_WALTZ_MELODY.length >= 18);
  assert.ok(MOONLIGHT_SERENADE_MELODY.length >= 18);
  assert.ok(SPRING_FLOWER_MELODY.length >= 16);

  // Verify upbeat, lively note durations (all notes <= 0.45s so music is cheerful, never sleepy)
  for (const track of ROMANTIC_PLAYLIST) {
    const avgDuration =
      track.notes.reduce((acc, n) => acc + n.duration, 0) / track.notes.length;
    assert.ok(
      avgDuration < 0.28,
      `Track ${track.title} should have an upbeat average note duration < 0.28s (got ${avgDuration})`
    );
  }

  assert.equal(audio.isPlaying, false);
  audio.startMusic('birthday');
  assert.equal(audio.isPlaying, true);

  // Cycle through all 5 upbeat melodies with nextMelody()
  const seenKeys = new Set([audio.melodyKey]);
  for (let i = 0; i < 4; i++) {
    const nextTrack = audio.nextMelody();
    seenKeys.add(nextTrack.key);
  }
  assert.equal(seenKeys.size, 5, 'nextMelody() should cycle through all 5 upbeat tracks');

  audio.stopMusic();
  assert.equal(audio.isPlaying, false);

  let lastFillStyle = '';
  let fillCalls = 0;
  const mockCanvas = {
    width: 1280,
    height: 800,
    getContext: () => ({
      setTransform: () => {},
      clearRect: () => {},
      save: () => {},
      restore: () => {},
      beginPath: () => {},
      arc: () => {},
      fill: () => {
        fillCalls += 1;
      },
      stroke: () => {},
      moveTo: () => {},
      lineTo: () => {},
      bezierCurveTo: () => {},
      translate: () => {},
      rotate: () => {},
      scale: () => {},
      fillText: function () {
        lastFillStyle = this.fillStyle;
      },
      createLinearGradient: () => ({ addColorStop: () => {} }),
      createRadialGradient: () => ({ addColorStop: () => {} })
    })
  };

  const particles = new RomanticParticleEngine(mockCanvas, {
    reducedMotion: false,
    theme: 'sakura'
  });
  particles.init();
  assert.equal(typeof particles.drawTulipFlower, 'function', 'Should support drawTulipFlower on canvas');
  const showerCount = particles.triggerFlowerShower(30);
  assert.equal(showerCount, 30);
  assert.ok(
    particles.burstParticles.some((p) => p.shape === 'tulip'),
    'Flower shower should include blooming tulip particles'
  );
  const fullWish =
    'Chúc Diểm Phúc ngày 20/10 luôn rạng rỡ như đóa hoa Tulip ban mai, bình an và ngập tràn tiếng cười!';
  const lantern = particles.spawnCanvasLantern(fullWish, 'Ông chú Viettel');
  assert.ok(lantern);
  assert.equal(lantern.label, fullWish, 'Canvas lantern must not truncate wish text');
  particles.draw();
  assert.equal(lastFillStyle, '#240D1B', 'Canvas lantern text in sakura light theme must be dark high-contrast #240D1B');

  // Verify reduced-motion resize re-renders static frame instead of leaving canvas blank
  particles.setReducedMotion(true);
  fillCalls = 0;
  particles.resize();
  assert.ok(fillCalls > 0, 'Resizing canvas while in reducedMotion mode must re-render static frame');
  particles.destroy();
});

test('7. Landing Page HTML & CSS compliance: "Diểm Phúc" + "Emm" woven naturally, Tulip Bouquet SVG, full-text infinite lanterns, Light theme & Mobile UX', () => {
  const htmlContent = fs.readFileSync(path.resolve(PROJECT_ROOT, 'index.html'), 'utf8');
  assert.ok(htmlContent.includes('Diểm Phúc'), 'index.html must feature recipient name "Diểm Phúc"');
  assert.ok(htmlContent.includes('Emm'), 'index.html must also use "Emm" to avoid repeating "Diểm Phúc"');
  assert.ok(htmlContent.includes('Ông chú Viettel'));
  assert.ok(htmlContent.includes('20/10'));
  assert.ok(htmlContent.includes('Tulip'));
  assert.ok(htmlContent.includes(USER_PROVIDED_PORTRAIT_URL));

  // Verify required landing page elements exist
  assert.ok(htmlContent.includes('id="romantic-canvas"'));
  assert.ok(htmlContent.includes('id="gift-avatar-img"'));
  assert.ok(htmlContent.includes('id="nav-avatar-img"'));
  assert.ok(htmlContent.includes('id="hero-portrait-img"'));
  assert.ok(htmlContent.includes('id="btn-toggle-music"'));
  assert.ok(htmlContent.includes('id="btn-toggle-theme"'));
  assert.ok(htmlContent.includes('id="flower-bouquet"'));
  assert.ok(htmlContent.includes('id="interactive-bouquet-svg"'));
  assert.ok(htmlContent.includes('class="bouquet-poetic-caption"'));
  assert.ok(htmlContent.includes('id="btn-replay-bloom"'));
  assert.ok(htmlContent.includes('id="lantern-sky-floating-area"'));
  assert.ok(htmlContent.includes('id="letter-parchment"'));

  // Verify removed clutter: NO #memories gallery, NO #lightbox-modal, NO #flower-cards-grid, NO #active-flower-blessing, NO #flower-legend-chips, NO .flower-blessing-meta, NO #music-playlist-bar, NO #btn-switch-melody, NO #lantern-sky-stage
  assert.equal(
    htmlContent.includes('id="btn-switch-melody"'),
    false,
    '"Đổi nhạc" button (#btn-switch-melody) must be removed for single Mot ngay buon MP3 experience'
  );
  assert.equal(
    htmlContent.includes('id="lantern-sky-stage"'),
    false,
    'Boxed #lantern-sky-stage must be removed in favor of continuous background floating lanterns'
  );
  assert.equal(
    htmlContent.includes('id="sky-lanterns"'),
    false,
    'Boxed sky lanterns section (#sky-lanterns) must be removed'
  );
  assert.equal(
    htmlContent.includes('class="floating-floral-badge"'),
    false,
    'Floating badges overlapping photo controls must be removed'
  );
  assert.equal(
    htmlContent.includes('id="memories"'),
    false,
    '"Những Khoảnh Khắc Diệu Kỳ" (#memories) section must be removed'
  );
  assert.equal(
    htmlContent.includes('id="lightbox-modal"'),
    false,
    'Gallery lightbox modal must be removed'
  );
  assert.equal(
    htmlContent.includes('id="flower-cards-grid"'),
    false,
    'Flower selection cards (#flower-cards-grid) must be removed'
  );
  assert.equal(
    htmlContent.includes('id="active-flower-blessing"'),
    false,
    'Individual flower meaning box (#active-flower-blessing) must be removed'
  );
  assert.equal(
    htmlContent.includes('id="flower-legend-chips"'),
    false,
    'Individual flower selection chips (#flower-legend-chips) must be removed'
  );
  assert.equal(
    htmlContent.includes('flower-blessing-meta'),
    false,
    'Individual flower meaning metadata (.flower-blessing-meta) must be removed'
  );
  assert.equal(
    htmlContent.includes('id="flower-blessing-title"'),
    false,
    'Individual flower title (#flower-blessing-title) must be removed'
  );
  assert.equal(
    htmlContent.includes('id="flower-blessing-meaning"'),
    false,
    'Individual flower meaning (#flower-blessing-meaning) must be removed'
  );
  assert.equal(
    htmlContent.includes('id="music-playlist-bar"'),
    false,
    '5-song playlist selection bar (#music-playlist-bar) must be removed'
  );

  // Verify Haute-Couture Tulip Bouquet SVG gradients, 3-tipped cupped petals, florist gift tag & lower stems exist
  assert.ok(htmlContent.includes('id="grad-tulip-pink-side"'));
  assert.ok(htmlContent.includes('id="grad-tulip-peach-side"'));
  assert.ok(htmlContent.includes('id="grad-tulip-cream-side"'));
  assert.ok(htmlContent.includes('id="grad-tulip-ruby-side"'));
  assert.ok(htmlContent.includes('id="grad-tulip-lilac-side"'));
  assert.ok(htmlContent.includes('id="grad-tulip-inner-glow"'));
  assert.ok(htmlContent.includes('class="petal-ring petal-ring-inner"'));
  assert.ok(htmlContent.includes('class="tulip-petal-left"'));
  assert.ok(htmlContent.includes('class="tulip-petal-right"'));
  assert.ok(htmlContent.includes('class="petal-ring petal-ring-mid"'));
  assert.ok(htmlContent.includes('HAPPY 20/10'));
  assert.ok(htmlContent.includes('id="grad-wrap-linen-back"'));
  assert.ok(htmlContent.includes('class="bouquet-lower-stems"'));

  // Verify both "Diểm Phúc" and "Emm" are balanced across the 8 lantern wishes and 4 letter paragraphs
  const diemPhucLanternCount = DEFAULT_WISH_LANTERNS.filter((w) => w.text.includes('Diểm Phúc')).length;
  const emmLanternCount = DEFAULT_WISH_LANTERNS.filter((w) => w.text.includes('Emm')).length;
  assert.ok(
    diemPhucLanternCount >= 2 && diemPhucLanternCount <= 4,
    `DEFAULT_WISH_LANTERNS should mention "Diểm Phúc" in 2-4 wishes (found ${diemPhucLanternCount})`
  );
  assert.ok(
    emmLanternCount >= 4 && emmLanternCount <= 6,
    `DEFAULT_WISH_LANTERNS should intersperse "Emm" in 4-6 wishes to avoid repetition (found ${emmLanternCount})`
  );
  assert.ok(
    DEFAULT_CONFIG.letterParagraphs.some((p) => p.includes('Diểm Phúc')) &&
      DEFAULT_CONFIG.letterParagraphs.some((p) => p.includes('Emm')),
    'Letter paragraphs must weave both "Diểm Phúc" and "Emm" naturally'
  );

  // Verify no bottom spotlight bar occluding floating lanterns in #lantern-sky-stage
  assert.equal(
    htmlContent.includes('class="sky-stage-bottom-bar"'),
    false,
    'Redundant .sky-stage-bottom-bar must be removed so floating lanterns are never cut off'
  );

  const cssContent = fs.readFileSync(path.resolve(PROJECT_ROOT, 'src/styles.css'), 'utf8');
  assert.ok(cssContent.includes('@keyframes lanternStreamContinuous'));
  assert.ok(cssContent.includes('@keyframes tulipPetalLeftOpen'));
  assert.ok(cssContent.includes('@keyframes tulipPetalRightOpen'));
  assert.ok(cssContent.includes('@media (max-width: 768px)'));
  assert.ok(cssContent.includes('@media (max-width: 390px)'));
  assert.ok(cssContent.includes('flex: 1 1 auto;'), 'Mobile navbar pill buttons should use proportional flex-basis auto');
  assert.equal(
    cssContent.includes('.lantern-stream-track:hover'),
    false,
    'Lantern stream track must not freeze on general sky hover'
  );
  assert.ok(cssContent.includes('[data-theme="sakura"] .lantern-sky-stage'));
  assert.ok(cssContent.includes('[data-theme="sakura"] .lantern-wish-ribbon'));
  assert.ok(cssContent.includes('[data-theme="sakura"] .bouquet-visual-card'));
  assert.ok(cssContent.includes('animation-delay: 0s !important;'));
});

test('8. BirthdayAppController renders full-text continuous sky lanterns without truncation, replays Tulip bouquet bloom, and switches upbeat tracks', async () => {
  const { BirthdayAppController } = await import('../src/app.js');

  const elementsById = new Map();
  const makeEl = (id = '') => {
    const attrs = new Map();
    const classes = new Set();
    const listeners = new Map();
    let childLabel = null;
    const el = {
      id,
      textContent: '',
      innerHTML: '',
      value: '',
      style: {},
      complete: false,
      naturalWidth: 0,
      classList: {
        add: (c) => classes.add(c),
        remove: (c) => classes.delete(c),
        toggle: (c, force) => {
          if (force === undefined) classes.has(c) ? classes.delete(c) : classes.add(c);
          else force ? classes.add(c) : classes.delete(c);
        },
        contains: (c) => classes.has(c)
      },
      setAttribute: (k, v) => attrs.set(k, String(v)),
      getAttribute: (k) => (attrs.has(k) ? attrs.get(k) : null),
      removeAttribute: (k) => attrs.delete(k),
      getBoundingClientRect: () => ({ left: 100, top: 100, width: 300, height: 300 }),
      addEventListener: (evt, fn) => {
        if (!listeners.has(evt)) listeners.set(evt, []);
        listeners.get(evt).push(fn);
      },
      trigger: (evt, payload = {}) => {
        for (const fn of listeners.get(evt) || []) fn(payload);
      },
      querySelector: () => {
        if (!childLabel) childLabel = makeEl();
        return childLabel;
      },
      querySelectorAll: () => []
    };
    if (id) elementsById.set(id, el);
    return el;
  };

  [
    'romantic-canvas',
    'gift-curtain',
    'gift-avatar-img',
    'nav-avatar-img',
    'hero-portrait-img',
    'btn-toggle-theme',
    'btn-toggle-motion',
    'btn-toggle-music',
    'btn-switch-melody',
    'interactive-bouquet-svg',
    'flower-blessing-wish',
    'btn-replay-bloom',
    'reasons-grid',
    'lantern-sky-floating-area',
    'lantern-spotlight-text',
    'letter-parchment',
    'btn-open-envelope',
    'letter-greeting',
    'letter-body',
    'letter-signature',
    'live-toast'
  ].forEach((id) => makeEl(id));

  const mockDoc = {
    title: '',
    documentElement: makeEl('html'),
    getElementById: (id) => elementsById.get(id) || null,
    querySelectorAll: () => [],
    addEventListener: () => {}
  };

  const store = new BirthdayStateStore(null);
  const controller = new BirthdayAppController(mockDoc, store);
  controller.init();

  assert.equal(mockDoc.documentElement.getAttribute('data-theme'), 'midnight');
  assert.equal(
    elementsById.get('btn-toggle-theme').querySelector('.btn-label-text').textContent,
    'Giao Diện Sáng'
  );
  assert.equal(mockDoc.title, 'Chúc Mừng Ngày 20/10 Diểm Phúc — Món Quà Nhỏ');
  assert.equal(elementsById.get('hero-portrait-img').getAttribute('src'), USER_PROVIDED_PORTRAIT_URL);

  // Verify hero image fallback on error survives subsequent renders
  elementsById.get('hero-portrait-img').trigger('error');
  assert.equal(elementsById.get('hero-portrait-img').getAttribute('src'), FALLBACK_PORTRAIT_URL);
  store.updateConfig({ theme: 'sakura' });
  assert.equal(elementsById.get('hero-portrait-img').getAttribute('src'), FALLBACK_PORTRAIT_URL);
  assert.equal(mockDoc.documentElement.getAttribute('data-theme'), 'sakura');
  assert.equal(
    elementsById.get('btn-toggle-theme').querySelector('.btn-label-text').textContent,
    'Giao Diện Tối'
  );

  // Verify all 8 wishes are rendered in FULL inside #lantern-sky-floating-area without any '...' truncation
  const skyHtml = elementsById.get('lantern-sky-floating-area').innerHTML;
  assert.ok(skyHtml.includes('lantern-stream-track'), 'Must render continuous stream track');
  assert.ok(skyHtml.includes('lantern-stream-cycle'), 'Must render seamless loop cycles');
  assert.ok(skyHtml.includes('lantern-cord'), 'Must render suspension cord connecting lantern to wish card');
  for (const w of DEFAULT_WISH_LANTERNS) {
    assert.ok(
      skyHtml.includes(w.text),
      `Floating sky lantern must include full untruncated text: "${w.text}"`
    );
  }

  // Verify single poetic bouquet caption weaves both "Diểm Phúc" and "Emm"
  const poeticWish = elementsById.get('flower-blessing-wish').textContent;
  assert.ok(poeticWish.includes('Diểm Phúc'), 'Poetic caption should mention Diểm Phúc');
  assert.ok(poeticWish.includes('Emm'), 'Poetic caption should also mention Emm');

  // Verify clicking #btn-replay-bloom replays the bouquet bloom animation and triggers toast
  elementsById.get('btn-replay-bloom').trigger('click');
  assert.equal(elementsById.get('interactive-bouquet-svg').classList.contains('is-blooming'), true);
  assert.ok(elementsById.get('live-toast').textContent.includes('Tulip'));

  // Verify clicking #btn-switch-melody switches to the next cheerful track and starts playing
  elementsById.get('btn-switch-melody').trigger('click');
  assert.equal(controller.audio.isPlaying, true);
  assert.equal(controller.audio.melodyKey, 'starlight');
  controller.audio.stopMusic();
});

test('9. dist/bundle.js is generated, syntactically valid, and free of leftover import/export keywords', () => {
  const bundlePath = path.resolve(PROJECT_ROOT, 'dist/bundle.js');
  assert.ok(fs.existsSync(bundlePath), 'dist/bundle.js should exist');
  const code = fs.readFileSync(bundlePath, 'utf8');
  assert.ok(code.length > 15000, 'dist/bundle.js should contain full application code');
  assert.equal(/^\s*import\s+/m.test(code), false, 'Should have no top-level import statements');
  assert.equal(/^\s*export\s+/m.test(code), false, 'Should have no top-level export statements');
  assert.doesNotThrow(() => new Function(code));
});

test('10. Mot ngay buon - Kieu Chi MP3 audio, swipeable 3D photo card deck, ambient background sky lanterns & interactive micro-touches', () => {
  // 1. Verify PHOTO_STACK_ITEMS structure & first photo is 7924A3EF-9FF8-4DCE-9295-230FC520A5E9_1_105_c.jpeg
  assert.ok(Array.isArray(PHOTO_STACK_ITEMS), 'PHOTO_STACK_ITEMS must be an array');
  assert.equal(PHOTO_STACK_ITEMS.length, 5, 'Should have 5 curated unique photos of Diểm Phúc (duplicate removed)');
  const uniqueSrcs = new Set(PHOTO_STACK_ITEMS.map((item) => item.src));
  assert.equal(uniqueSrcs.size, 5, 'All photo sources must be unique without duplicate images');
  assert.ok(
    PHOTO_STACK_ITEMS[0].src.includes('7924A3EF-9FF8-4DCE-9295-230FC520A5E9_1_105_c.jpeg'),
    'First photo must be 7924A3EF-9FF8-4DCE-9295-230FC520A5E9_1_105_c.jpeg'
  );

  // 2. Verify all local image assets exist and are non-empty
  for (const item of PHOTO_STACK_ITEMS) {
    const fullPath = path.resolve(PROJECT_ROOT, item.src);
    assert.ok(fs.existsSync(fullPath), `Photo file should exist on disk: ${fullPath}`);
    assert.ok(fs.statSync(fullPath).size > 5000, `Photo file should be non-empty: ${fullPath}`);
  }

  // 3. Verify real MP3 audio asset exists and is over 1MB
  const mp3Path = path.resolve(PROJECT_ROOT, 'assets/audio/mot-ngay-buon-kieu-chi.mp3');
  assert.ok(fs.existsSync(mp3Path), `MP3 audio should exist at ${mp3Path}`);
  assert.ok(fs.statSync(mp3Path).size > 1000000, 'MP3 audio should be full audio file > 1MB');

  // 4. Verify index.html contains swipeable deck, floating music pill, and audio tag
  const htmlContent = fs.readFileSync(path.resolve(PROJECT_ROOT, 'index.html'), 'utf8');
  assert.ok(htmlContent.includes('id="photo-card-deck"'), 'index.html must have #photo-card-deck');
  assert.ok(htmlContent.includes('id="btn-card-prev"'), 'index.html must have #btn-card-prev');
  assert.ok(htmlContent.includes('id="btn-card-next"'), 'index.html must have #btn-card-next');
  assert.ok(htmlContent.includes('id="card-counter"'), 'index.html must have #card-counter');
  assert.ok(htmlContent.includes('id="card-dots"'), 'index.html must have #card-dots');
  assert.ok(htmlContent.includes('ambient-photo-backdrop'), 'index.html must have ambient floating photo backdrop');
  assert.ok(htmlContent.includes('id="floating-music-pill"'), 'index.html must have #floating-music-pill');
  assert.ok(htmlContent.includes('id="mini-play-btn"'), 'index.html must have #mini-play-btn');
  assert.equal(htmlContent.includes('id="mini-next-btn"'), false, 'mini-next-btn must be removed for single-track MP3 player');
  assert.ok(htmlContent.includes('id="bg-audio-player"'), 'index.html must have #bg-audio-player');
  assert.ok(htmlContent.includes('mot-ngay-buon-kieu-chi.mp3'), 'Audio player must load mot-ngay-buon-kieu-chi.mp3');
  assert.ok(htmlContent.includes('id="lantern-sky-floating-area"'), 'index.html must have #lantern-sky-floating-area');

  // 5. Verify audio engine audio element support & micro-sound methods
  const audio = new RomanticAudioEngine();
  assert.equal(typeof audio.setAudioElement, 'function');
  assert.equal(typeof audio.playSwipeSwoosh, 'function');
  assert.equal(typeof audio.playLanternGlowChime, 'function');
  assert.equal(audio.currentSongTitle, 'Một ngày buồn — Kiều Chi');

  let played = false;
  const mockAudioEl = {
    volume: 1,
    play: async () => {
      played = true;
    },
    pause: () => {
      played = false;
    }
  };
  audio.setAudioElement(mockAudioEl);
  audio.startMusic();
  assert.equal(played, true, 'AudioElement should play when startMusic is invoked');
  audio.stopMusic();
  assert.equal(played, false, 'AudioElement should pause when stopMusic is invoked');

  // 6. Verify particle engine ambient background sky lanterns & touch spawning
  const mockCanvas = {
    width: 1280,
    height: 800,
    getContext: () => ({
      setTransform: () => {},
      clearRect: () => {},
      save: () => {},
      restore: () => {},
      beginPath: () => {},
      arc: () => {},
      fill: () => {},
      stroke: () => {},
      moveTo: () => {},
      lineTo: () => {},
      bezierCurveTo: () => {},
      translate: () => {},
      rotate: () => {},
      scale: () => {},
      fillText: () => {},
      createLinearGradient: () => ({ addColorStop: () => {} }),
      createRadialGradient: () => ({ addColorStop: () => {} })
    })
  };
  const particles = new RomanticParticleEngine(mockCanvas);
  particles.init();
  assert.ok(particles.skyLanterns.length >= 6, 'Should seed at least 6 ambient background sky lanterns');
  const touchLantern = particles.spawnTouchLantern(200, 300, 'Điều ước Diểm Phúc');
  assert.ok(touchLantern, 'Should spawn touch lantern at coordinates');
  assert.equal(touchLantern.x, 200);
  assert.equal(touchLantern.y, 300);
  particles.destroy();

  // 7. Verify styles.css contains styling for new interactive components
  const cssContent = fs.readFileSync(path.resolve(PROJECT_ROOT, 'src/styles.css'), 'utf8');
  assert.ok(cssContent.includes('.photo-card-deck'));
  assert.ok(cssContent.includes('.photo-card-item.is-active'));
  assert.ok(cssContent.includes('.floating-music-pill'));
  assert.ok(cssContent.includes('.bouquet-flower-node:hover'));
  assert.ok(cssContent.includes('.wish-chip-btn'));
});

test('11. Verification of MP3 cycling recovery, realistic background sky lantern wish pool, custom wish form, and card/reason micro-interactions', () => {
  // 1. Verify LANTERN_WISH_POOL exists, has >= 10 romantic wishes, and all ambient lanterns get wishes
  assert.ok(Array.isArray(LANTERN_WISH_POOL));
  assert.ok(LANTERN_WISH_POOL.length >= 10);
  assert.ok(LANTERN_WISH_POOL.some((w) => w.includes('Diểm Phúc')));

  const mockCanvas = {
    width: 1280,
    height: 800,
    getContext: () => ({
      setTransform: () => {},
      clearRect: () => {},
      save: () => {},
      restore: () => {},
      beginPath: () => {},
      arc: () => {},
      fill: () => {},
      stroke: () => {},
      moveTo: () => {},
      lineTo: () => {},
      bezierCurveTo: () => {},
      translate: () => {},
      rotate: () => {},
      scale: () => {},
      fillText: () => {},
      createLinearGradient: () => ({ addColorStop: () => {} }),
      createRadialGradient: () => ({ addColorStop: () => {} })
    })
  };
  const particles = new RomanticParticleEngine(mockCanvas);
  particles.init();
  assert.ok(particles.skyLanterns.every((l) => Boolean(l.label)), 'All ambient background sky lanterns must have a wish label');
  const defaultTouchLantern = particles.spawnTouchLantern(100, 200);
  assert.ok(defaultTouchLantern.label.length > 0, 'Touch lantern without argument must pick a romantic wish from pool');
  particles.destroy();

  // 2. Audio Engine: Verify MP3 playback resumes when cycling back from other melodies
  const audio = new RomanticAudioEngine();
  let playCalls = 0;
  let pauseCalls = 0;
  audio.setAudioElement({
    volume: 1,
    play: async () => { playCalls++; },
    pause: () => { pauseCalls++; }
  });
  audio.startMusic();
  assert.equal(audio.isPlaying, true);
  assert.equal(audio.isMp3Mode, true);
  assert.equal(playCalls, 1);

  // Switch to starlight (synth)
  audio.switchMelody('starlight');
  assert.equal(audio.isMp3Mode, false);
  assert.equal(pauseCalls, 1);

  // Switch back to birthday (MP3)
  audio.switchMelody('birthday');
  assert.equal(audio.isMp3Mode, true);
  assert.equal(playCalls, 2, 'AudioElement.play() must be re-invoked when switching back to birthday MP3 track');

  // Verify playHeartPop exists and runs safely
  assert.equal(typeof audio.playHeartPop, 'function');
  assert.doesNotThrow(() => audio.playHeartPop());
  audio.stopMusic();

  // 3. Verify HTML & CSS support continuous background sky lanterns & micro-interactions
  const htmlContent = fs.readFileSync(path.resolve(PROJECT_ROOT, 'index.html'), 'utf8');
  assert.equal(htmlContent.includes('id="form-custom-wish"'), false, 'Boxed #form-custom-wish must be removed');
  assert.equal(htmlContent.includes('id="sky-lanterns"'), false, 'Boxed #sky-lanterns section must be removed');
  assert.ok(htmlContent.includes('id="lantern-sky-floating-area"'), 'index.html must have #lantern-sky-floating-area for ambient continuous sky lanterns');

  const cssContent = fs.readFileSync(path.resolve(PROJECT_ROOT, 'src/styles.css'), 'utf8');
  assert.ok(cssContent.includes('.ambient-fullscreen-lanterns') || cssContent.includes('#lantern-sky-floating-area'));
  assert.ok(cssContent.includes('.floating-card-heart'));
  assert.ok(cssContent.includes('.reason-card.is-popping'));
  assert.ok(cssContent.includes('.floating-sky-lantern:hover'));
});

test('12. Verification of Heart Favicon assets, refined subtle lanterns without author/OS emojis, and multi-browser support', () => {
  // 1. Verify physical favicon files exist and are non-empty
  const faviconSvgPath = path.resolve(PROJECT_ROOT, 'assets/images/favicon-heart.svg');
  const faviconPng32Path = path.resolve(PROJECT_ROOT, 'assets/images/favicon-32x32.png');
  const faviconPng16Path = path.resolve(PROJECT_ROOT, 'assets/images/favicon-16x16.png');
  const faviconIcoPath = path.resolve(PROJECT_ROOT, 'favicon.ico');

  assert.ok(fs.existsSync(faviconSvgPath), 'favicon-heart.svg must exist');
  assert.ok(fs.statSync(faviconSvgPath).size > 100, 'favicon-heart.svg must not be empty');
  assert.ok(fs.existsSync(faviconPng32Path), 'favicon-32x32.png must exist');
  assert.ok(fs.existsSync(faviconPng16Path), 'favicon-16x16.png must exist');
  assert.ok(fs.existsSync(faviconIcoPath), 'favicon.ico must exist at root');

  // 2. Verify index.html head has heart favicon links
  const htmlContent = fs.readFileSync(path.resolve(PROJECT_ROOT, 'index.html'), 'utf8');
  assert.ok(htmlContent.includes('rel="icon" type="image/svg+xml" href="./assets/images/favicon-heart.svg"'));
  assert.ok(htmlContent.includes('href="./assets/images/favicon-32x32.png"'));
  assert.ok(htmlContent.includes('href="./favicon.ico"'));
  assert.ok(htmlContent.includes('rel="apple-touch-icon" href="./assets/images/favicon-heart.svg"'));

  // 3. Verify no raw OS emojis in index.html card hint or lantern wish pool
  assert.equal(htmlContent.includes('👈'), false, 'Default OS emoji 👈 must be removed');
  assert.equal(htmlContent.includes('👉'), false, 'Default OS emoji 👉 must be removed');

  // 4. Verify LANTERN_WISH_POOL has zero OS emojis and zero author names
  assert.ok(LANTERN_WISH_POOL.every((w) => !/[\p{Extended_Pictographic}]/u.test(w)), 'LANTERN_WISH_POOL must not contain OS emojis');
  assert.ok(LANTERN_WISH_POOL.every((w) => !w.includes('Viettel')), 'LANTERN_WISH_POOL must not contain Viettel author');

  // 5. Verify DEFAULT_WISH_LANTERNS author is blanked out
  assert.ok(DEFAULT_WISH_LANTERNS.every((w) => !w.author || w.author === ''), 'Floating lanterns must not display author');

  // 6. Verify particle engine spawn lantern produces soft subtle floating lanterns
  const mockCanvas = {
    width: 1200,
    height: 800,
    getContext: () => ({
      setTransform: () => {},
      clearRect: () => {},
      save: () => {},
      restore: () => {},
      beginPath: () => {},
      arc: () => {},
      fill: () => {},
      stroke: () => {},
      moveTo: () => {},
      lineTo: () => {},
      bezierCurveTo: () => {},
      translate: () => {},
      rotate: () => {},
      scale: () => {},
      fillText: () => {},
      createLinearGradient: () => ({ addColorStop: () => {} }),
      createRadialGradient: () => ({ addColorStop: () => {} })
    })
  };
  const particles = new RomanticParticleEngine(mockCanvas);
  particles.init();
  const spawned = particles.spawnTouchLantern(200, 300);
  assert.ok(spawned.alpha <= 0.70, 'Spawned lantern alpha must be subtle (<= 0.70)');
  assert.ok(spawned.size <= 24, 'Spawned lantern size must be delicate and small (<= 24px)');
  particles.destroy();
});

test('13. User Experience Refinement: Link preview metadata, "Gửi tặng em bó hoa" action, and removal of stats & heart suffix', () => {
  const htmlContent = fs.readFileSync(path.resolve(PROJECT_ROOT, 'index.html'), 'utf8');

  // 1. Verify title without "Từ Trái Tim"
  assert.ok(htmlContent.includes('<title>Chúc Mừng Ngày 20/10 Diểm Phúc — Món Quà Nhỏ</title>'));
  assert.equal(htmlContent.includes('Món Quà Nhỏ Từ Trái Tim'), false, 'Title must not include "Từ Trái Tim"');

  // 2. Verify meta description & OpenGraph tags: "Page chúc Diểm Phúc"
  assert.ok(htmlContent.includes('<meta name="description" content="Page chúc Diểm Phúc" />'));
  assert.ok(htmlContent.includes('<meta property="og:title" content="Chúc Mừng Ngày 20/10 Diểm Phúc — Món Quà Nhỏ" />'));
  assert.ok(htmlContent.includes('<meta property="og:description" content="Page chúc Diểm Phúc" />'));
  assert.ok(htmlContent.includes('<meta name="twitter:description" content="Page chúc Diểm Phúc" />'));
  assert.equal(htmlContent.includes('Landing page chúc mừng Ngày Phụ nữ'), false, 'Old verbose description must be removed');

  // 3. Verify action button text "Gửi tặng em bó hoa"
  assert.ok(htmlContent.includes('<span>Gửi tặng em bó hoa</span>'));
  assert.equal(htmlContent.includes('<span>Ngắm Bó Hoa Tulip</span>'), false, 'Old action "Ngắm Bó Hoa Tulip" must be replaced');

  // 4. Verify unwrap button without "Ngắm Hoa Tulip Nở"
  assert.equal(htmlContent.includes('Ngắm Hoa Tulip Nở'), false, 'Curtain button must not contain "Ngắm Hoa Tulip Nở"');

  // 5. Verify removal of redundant hero-stats-grid
  assert.equal(htmlContent.includes('class="hero-stats-grid"'), false, 'Redundant hero-stats-grid (20/10, Tulip, ∞) must be removed');

  // 6. Verify floral wreath encircling avatar
  assert.ok(htmlContent.includes('class="gift-avatar-container"'), 'index.html must have gift-avatar-container');
  assert.ok(htmlContent.includes('class="gift-avatar-wreath"'), 'index.html must have floral wreath encircling avatar');
});

test('14. Interactive 2-Step 3D Envelope & Stationery Sheet Extraction, Tulip Hover Fix, and Card Counter Cleanup', async () => {
  const { BirthdayAppController } = await import('../src/app.js');
  const htmlContent = fs.readFileSync(path.resolve(PROJECT_ROOT, 'index.html'), 'utf8');
  const cssContent = fs.readFileSync(path.resolve(PROJECT_ROOT, 'src/styles.css'), 'utf8');

  // 1. Verify multi-petal Sakura & Camellia Rose wreath and prismatic aurora halo
  assert.ok(htmlContent.includes('id="sakura-blossom"'), 'Wreath must include multi-petal #sakura-blossom symbol');
  assert.ok(htmlContent.includes('id="camellia-rose"'), 'Wreath must include multi-layered #camellia-rose symbol');
  assert.ok(htmlContent.includes('class="gift-avatar-aurora-glow"'), 'Avatar must have prismatic aurora glow');
  assert.ok(htmlContent.includes('class="wreath-celestial-orbit"'), 'Avatar wreath must have rotating celestial orbit');
  assert.equal(htmlContent.includes('#A3E635'), false, 'Old neon lime green leaf color must be removed');

  // 2. Verify Tulip hover jitter fix (local origin 0px -36px and hit-area ellipse) & Card counter text removal
  assert.ok(cssContent.includes('transform-origin: 0px -36px;'), 'Tulip node must scale around local center 0px -36px to prevent hover jitter');
  assert.ok(htmlContent.includes('class="tulip-hit-area"'), 'Each tulip must include an invisible hit-area ellipse for smooth hover');
  assert.equal(htmlContent.includes('1 / 5 • Diểm Phúc'), false, '"1 / 5 • Diểm Phúc" counter text must be removed');

  // 3. Verify 3D Interactive Envelope & Stationery Sheet DOM elements
  assert.ok(htmlContent.includes('id="aurora-sky-layer"'), 'Page must include multi-color aurora backdrop');
  assert.ok(htmlContent.includes('id="envelope-3d-scene"'), 'Love letter section must have #envelope-3d-scene');
  assert.ok(htmlContent.includes('id="interactive-envelope"'), 'Love letter section must have #interactive-envelope');
  assert.ok(htmlContent.includes('id="envelope-inner-letter"'), 'Love letter section must have sliding #envelope-inner-letter');
  assert.ok(htmlContent.includes('id="envelope-top-flap"'), 'Love letter section must have 3D #envelope-top-flap');
  assert.ok(htmlContent.includes('id="btn-close-envelope"'), 'Love letter section must have #btn-close-envelope to fold letter back');
  assert.ok(htmlContent.includes('class="letter-parchment stationery-sheet-expanded"'), 'Full letter must use the exact stationery sheet template');

  // 4. Verify 2-Step Envelope Choreography: Closed -> Peeking (Step 1) -> Extracted Full Stationery Sheet (Step 2)
  const store = new BirthdayStateStore(null);
  assert.equal(store.getState().envelopeOpened, false, 'Envelope must start closed');

  const elementsById = new Map();
  const makeEl = (id) => {
    const classes = new Set();
    const attrs = new Map();
    const listeners = new Map();
    const children = new Map();
    const el = {
      id,
      textContent: '',
      innerHTML: '',
      style: {},
      classList: {
        add: (...c) => c.forEach((x) => classes.add(x)),
        remove: (...c) => c.forEach((x) => classes.delete(x)),
        toggle: (c, force) => {
          const next = force !== undefined ? Boolean(force) : !classes.has(c);
          if (next) classes.add(c);
          else classes.delete(c);
          return next;
        },
        contains: (c) => classes.has(c)
      },
      setAttribute: (k, v) => attrs.set(k, String(v)),
      getAttribute: (k) => (attrs.has(k) ? attrs.get(k) : null),
      addEventListener: (evt, fn) => {
        if (!listeners.has(evt)) listeners.set(evt, []);
        listeners.get(evt).push(fn);
      },
      trigger: (evt, payload = {}) => {
        (listeners.get(evt) || []).forEach((fn) => fn(payload));
      },
      querySelector: (sel) => children.get(sel) || { textContent: '' },
      getBoundingClientRect: () => ({ width: 320, height: 220, left: 0, top: 0 })
    };
    if (id === 'btn-open-envelope') {
      const labelNode = { textContent: '' };
      children.set('.seal-btn-text', labelNode);
    }
    elementsById.set(id, el);
    return el;
  };

  [
    'romantic-canvas',
    'gift-curtain',
    'gift-avatar-img',
    'nav-avatar-img',
    'hero-portrait-img',
    'btn-toggle-theme',
    'btn-toggle-motion',
    'btn-toggle-music',
    'interactive-bouquet-svg',
    'flower-blessing-wish',
    'btn-replay-bloom',
    'reasons-grid',
    'lantern-sky-floating-area',
    'envelope-box',
    'envelope-3d-scene',
    'interactive-envelope',
    'envelope-top-flap',
    'envelope-inner-letter',
    'letter-parchment',
    'btn-open-envelope',
    'btn-close-envelope',
    'letter-greeting',
    'letter-body',
    'letter-signature',
    'live-toast'
  ].forEach((id) => makeEl(id));

  const mockDoc = {
    title: '',
    documentElement: makeEl('html'),
    getElementById: (id) => elementsById.get(id) || null,
    querySelectorAll: () => [],
    addEventListener: () => {}
  };

  const controller = new BirthdayAppController(mockDoc, store);
  controller.init();

  // Stage 0: Initially closed
  assert.equal(controller.envelopeStage, 'closed');
  assert.equal(elementsById.get('letter-parchment').classList.contains('is-open'), false);
  assert.equal(elementsById.get('envelope-3d-scene').classList.contains('is-open'), false);

  // Stage 1: Click interactive envelope -> opens flap and peeks letter sheet out (full letter not yet expanded)
  elementsById.get('interactive-envelope').trigger('click');
  assert.equal(controller.envelopeStage, 'peeking');
  assert.equal(store.getState().envelopeOpened, false);
  assert.equal(elementsById.get('envelope-3d-scene').classList.contains('is-peeking'), true);
  assert.equal(elementsById.get('envelope-top-flap').classList.contains('is-open'), true);
  assert.equal(elementsById.get('envelope-inner-letter').classList.contains('is-peeking'), true);
  assert.equal(elementsById.get('letter-parchment').classList.contains('is-open'), false);

  // Stage 2: Click (or pull) peeking letter sheet -> sheet jumps out and expands into full stationery letter
  elementsById.get('envelope-inner-letter').trigger('click');
  assert.equal(controller.envelopeStage, 'open');
  assert.equal(store.getState().envelopeOpened, true);
  assert.equal(elementsById.get('envelope-inner-letter').classList.contains('is-jumping-out'), true);
  assert.equal(elementsById.get('envelope-3d-scene').classList.contains('is-extracted'), true);
  assert.equal(elementsById.get('letter-parchment').classList.contains('is-open'), true);

  // Click close envelope button -> folds letter back inside and resets to closed
  elementsById.get('btn-close-envelope').trigger('click');
  assert.equal(controller.envelopeStage, 'closed');
  assert.equal(store.getState().envelopeOpened, false);
  assert.equal(elementsById.get('letter-parchment').classList.contains('is-open'), false);
});




