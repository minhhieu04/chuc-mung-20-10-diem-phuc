import {
  LEGACY_STORAGE_KEY,
  LEGACY_V2_STORAGE_KEY,
  LEGACY_V3_STORAGE_KEY,
  LEGACY_V4_STORAGE_KEY,
  STORAGE_KEY,
  DEFAULT_CONFIG,
  DEFAULT_GALLERY_MOMENTS,
  DEFAULT_WISH_LANTERNS,
  FLOWER_BOUQUET_ITEMS,
  isValidImageSrc,
  sanitizeText
} from './data.js';

/**
 * Creates a fresh default state object.
 */
export function createInitialState() {
  return {
    config: {
      ...DEFAULT_CONFIG,
      letterParagraphs: [...DEFAULT_CONFIG.letterParagraphs]
    },
    galleryMoments: DEFAULT_GALLERY_MOMENTS.map((m) => ({ ...m })),
    wishLanterns: DEFAULT_WISH_LANTERNS.map((w) => ({ ...w })),
    candles: [
      { id: 0, label: 'Quá khứ dịu ngọt', lit: true, flameIntensity: 1.0 },
      { id: 1, label: 'Hiện tại rạng rỡ', lit: true, flameIntensity: 1.0 },
      { id: 2, label: 'Tương lai hạnh phúc', lit: true, flameIntensity: 1.0 }
    ],
    selectedFlowerId: FLOWER_BOUQUET_ITEMS[0].id,
    bloomedFlowers: FLOWER_BOUQUET_ITEMS.map((f) => f.id),
    activeLanternId: DEFAULT_WISH_LANTERNS[0].id,
    allCandlesBlown: false,
    envelopeOpened: false,
    giftUnwrapped: false,
    musicPlaying: false,
    currentMelody: 'birthday', // 'birthday' | 'starlight' | 'rose_waltz' | 'moonlight' | 'spring_flower'
    micListening: false
  };
}

/**
 * State manager with resilient storage persistence and subscriber notifications.
 */
export class BirthdayStateStore {
  /**
   * @param {Storage | null} [storage]
   */
  constructor(
    storage = typeof globalThis !== 'undefined' && globalThis.localStorage
      ? globalThis.localStorage
      : null
  ) {
    this.storage = storage;
    this.state = createInitialState();
    this.listeners = new Set();
    this.storageWarning = null;
    this.loadFromStorage();
  }

  getState() {
    return this.state;
  }

  /**
   * Subscribe to state changes.
   * @param {(state: ReturnType<typeof createInitialState>) => void} listener
   * @returns {() => void} unsubscribe function
   */
  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    for (const listener of this.listeners) {
      listener(this.state);
    }
  }

  loadFromStorage() {
    if (!this.storage) return;
    try {
      // Purge legacy v1, v2, v3 & v4 storage keys so stale data never overrides current landing page defaults
      if (typeof this.storage.removeItem === 'function') {
        try {
          this.storage.removeItem(LEGACY_STORAGE_KEY);
          this.storage.removeItem(LEGACY_V2_STORAGE_KEY);
          this.storage.removeItem(LEGACY_V3_STORAGE_KEY);
          this.storage.removeItem(LEGACY_V4_STORAGE_KEY);
        } catch {
          // ignore
        }
      }

      const raw = this.storage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== 'object') return;

      if (parsed.config && typeof parsed.config === 'object') {
        const c = parsed.config;
        const rawRecipient = sanitizeText(
          c.recipientName,
          DEFAULT_CONFIG.recipientName,
          80
        ).replace(/^Phạm\s+/i, '');
        this.state.config.recipientName = rawRecipient || DEFAULT_CONFIG.recipientName;
        this.state.config.recipientShortName = sanitizeText(
          c.recipientShortName ? String(c.recipientShortName).replace(/^Phạm\s+/i, '') : '',
          this.deriveShortName(this.state.config.recipientName),
          40
        );
        const rawSender = sanitizeText(
          c.senderName,
          DEFAULT_CONFIG.senderName,
          60
        );
        this.state.config.senderName = rawSender || DEFAULT_CONFIG.senderName;
        this.state.config.birthdayTagline = sanitizeText(
          c.birthdayTagline,
          DEFAULT_CONFIG.birthdayTagline,
          200
        );
        this.state.config.birthdaySubtitle = sanitizeText(
          c.birthdaySubtitle,
          DEFAULT_CONFIG.birthdaySubtitle,
          300
        );
        if (isValidImageSrc(c.heroPortraitUrl)) {
          this.state.config.heroPortraitUrl = c.heroPortraitUrl.trim();
        }
        this.state.config.heroPortraitCaption = sanitizeText(
          c.heroPortraitCaption,
          DEFAULT_CONFIG.heroPortraitCaption,
          140
        );
        if (c.theme === 'midnight' || c.theme === 'sakura') {
          this.state.config.theme = c.theme;
        }
        if (typeof c.reducedMotion === 'boolean') {
          this.state.config.reducedMotion = c.reducedMotion;
        }
        this.state.config.letterGreeting = sanitizeText(
          c.letterGreeting,
          DEFAULT_CONFIG.letterGreeting,
          150
        );
        if (Array.isArray(c.letterParagraphs) && c.letterParagraphs.length > 0) {
          const validParagraphs = c.letterParagraphs
            .map((p) => sanitizeText(p, '', 1000))
            .filter(Boolean)
            .slice(0, 10);
          if (validParagraphs.length > 0) {
            this.state.config.letterParagraphs = validParagraphs;
          }
        }
        this.state.config.letterSignature = sanitizeText(
          c.letterSignature,
          DEFAULT_CONFIG.letterSignature,
          120
        );
      }

      if (Array.isArray(parsed.wishLanterns) && parsed.wishLanterns.length > 0) {
        const sanitizedWishes = parsed.wishLanterns
          .filter((w) => w && typeof w.text === 'string' && w.text.trim().length > 0)
          .slice(0, 50)
          .map((w, idx) => ({
            id: sanitizeText(w.id, `lantern-${idx}`, 40),
            text: sanitizeText(w.text, '', 320),
            author: sanitizeText(w.author, this.state.config.senderName, 50),
            createdAt: sanitizeText(w.createdAt, new Date().toISOString(), 40)
          }));
        if (sanitizedWishes.length > 0) {
          this.state.wishLanterns = sanitizedWishes;
          this.state.activeLanternId = sanitizedWishes[0].id;
        }
      }
    } catch {
      // Corrupt JSON or inaccessible storage — fall back to clean defaults
      this.storageWarning = 'Không thể đọc dữ liệu lưu trữ cục bộ, sử dụng mặc định.';
    }
  }

  saveToStorage() {
    if (!this.storage) return true;
    try {
      const payload = JSON.stringify({
        config: this.state.config,
        wishLanterns: this.state.wishLanterns
      });
      this.storage.setItem(STORAGE_KEY, payload);
      this.storageWarning = null;
      return true;
    } catch {
      this.storageWarning =
        'Bộ nhớ trình duyệt đã đầy; thay đổi vẫn được hiển thị trong phiên hiện tại.';
      return false;
    }
  }

  deriveShortName(fullName) {
    const cleaned = sanitizeText(fullName, DEFAULT_CONFIG.recipientName, 80);
    if (cleaned.toLowerCase() === DEFAULT_CONFIG.recipientName.toLowerCase()) {
      return DEFAULT_CONFIG.recipientShortName;
    }
    const parts = cleaned.split(/\s+/).filter(Boolean);
    if (parts.length >= 2) {
      return parts.slice(-2).join(' ');
    }
    return cleaned;
  }

  /**
   * Helper to replace full name and short name occurrences in a string
   * in a single non-overlapping pass so existing or newly-inserted names
   * are never double-replaced.
   * @param {string} text
   * @param {string} oldFull
   * @param {string} newFull
   * @param {string} oldShort
   * @param {string} newShort
   */
  replaceRecipientNames(text, oldFull, newFull, oldShort, newShort) {
    if (typeof text !== 'string') return text;
    const replaceShort = (seg) => {
      if (!oldShort || !newShort || oldShort === newShort) return seg;
      if (newShort.includes(oldShort)) {
        return seg
          .split(newShort)
          .map((part) => part.replaceAll(oldShort, newShort))
          .join(newShort);
      }
      return seg.replaceAll(oldShort, newShort);
    };

    if (!oldFull || !newFull || oldFull === newFull) {
      return replaceShort(text);
    }

    const replaceFullAndShort = (chunk) =>
      chunk
        .split(oldFull)
        .map((seg) => replaceShort(seg))
        .join(newFull);

    if (newFull.includes(oldFull) || (oldShort && newFull.includes(oldShort))) {
      return text
        .split(newFull)
        .map((chunk) => replaceFullAndShort(chunk))
        .join(newFull);
    }

    return replaceFullAndShort(text);
  }

  /**
   * Updates recipient/sender/letter customization fields.
   * @param {Partial<typeof DEFAULT_CONFIG>} partial
   */
  updateConfig(partial) {
    if (!partial || typeof partial !== 'object') return;
    const next = { ...this.state.config };
    const oldName = next.recipientName;
    const oldShortName = next.recipientShortName;
    const oldSender = next.senderName;

    if (partial.birthdayTagline !== undefined) {
      next.birthdayTagline = sanitizeText(
        partial.birthdayTagline,
        DEFAULT_CONFIG.birthdayTagline,
        200
      );
    }

    if (partial.birthdaySubtitle !== undefined) {
      next.birthdaySubtitle = sanitizeText(
        partial.birthdaySubtitle,
        DEFAULT_CONFIG.birthdaySubtitle,
        300
      );
    }

    if (partial.heroPortraitUrl !== undefined && isValidImageSrc(partial.heroPortraitUrl)) {
      next.heroPortraitUrl = partial.heroPortraitUrl.trim();
    }

    if (partial.heroPortraitCaption !== undefined) {
      next.heroPortraitCaption = sanitizeText(
        partial.heroPortraitCaption,
        DEFAULT_CONFIG.heroPortraitCaption,
        140
      );
    }

    if (partial.theme === 'midnight' || partial.theme === 'sakura') {
      next.theme = partial.theme;
    }

    if (typeof partial.reducedMotion === 'boolean') {
      next.reducedMotion = partial.reducedMotion;
    }

    if (partial.letterGreeting !== undefined) {
      next.letterGreeting = sanitizeText(
        partial.letterGreeting,
        DEFAULT_CONFIG.letterGreeting,
        150
      );
    }

    if (Array.isArray(partial.letterParagraphs)) {
      const cleaned = partial.letterParagraphs
        .map((p) => sanitizeText(p, '', 1000))
        .filter(Boolean)
        .slice(0, 10);
      if (cleaned.length > 0) {
        next.letterParagraphs = cleaned;
      }
    }

    if (partial.letterSignature !== undefined) {
      next.letterSignature = sanitizeText(
        partial.letterSignature,
        DEFAULT_CONFIG.letterSignature,
        120
      );
    }

    if (partial.recipientName !== undefined) {
      next.recipientName = sanitizeText(partial.recipientName, DEFAULT_CONFIG.recipientName, 80);
      next.recipientShortName =
        partial.recipientShortName !== undefined
          ? sanitizeText(partial.recipientShortName, this.deriveShortName(next.recipientName), 40)
          : this.deriveShortName(next.recipientName);
    } else if (partial.recipientShortName !== undefined) {
      next.recipientShortName = sanitizeText(
        partial.recipientShortName,
        DEFAULT_CONFIG.recipientShortName,
        40
      );
    }

    if (
      (oldName && oldName !== next.recipientName) ||
      (oldShortName && oldShortName !== next.recipientShortName)
    ) {
      next.birthdayTagline = this.replaceRecipientNames(
        next.birthdayTagline,
        oldName,
        next.recipientName,
        oldShortName,
        next.recipientShortName
      );
      next.letterGreeting = this.replaceRecipientNames(
        next.letterGreeting,
        oldName,
        next.recipientName,
        oldShortName,
        next.recipientShortName
      );
      next.birthdaySubtitle = this.replaceRecipientNames(
        next.birthdaySubtitle,
        oldName,
        next.recipientName,
        oldShortName,
        next.recipientShortName
      );
      next.heroPortraitCaption = this.replaceRecipientNames(
        next.heroPortraitCaption,
        oldName,
        next.recipientName,
        oldShortName,
        next.recipientShortName
      );
      next.letterParagraphs = next.letterParagraphs.map((p) =>
        this.replaceRecipientNames(
          p,
          oldName,
          next.recipientName,
          oldShortName,
          next.recipientShortName
        )
      );
      this.state.wishLanterns = this.state.wishLanterns.map((w) => ({
        ...w,
        text: this.replaceRecipientNames(
          w.text,
          oldName,
          next.recipientName,
          oldShortName,
          next.recipientShortName
        )
      }));
    }

    if (partial.senderName !== undefined) {
      next.senderName = sanitizeText(partial.senderName, DEFAULT_CONFIG.senderName, 60);
      if (oldSender && oldSender !== next.senderName) {
        next.letterSignature = this.replaceRecipientNames(
          next.letterSignature,
          oldSender,
          next.senderName,
          '',
          ''
        );
        this.state.wishLanterns = this.state.wishLanterns.map((w) => ({
          ...w,
          author: w.author === oldSender ? next.senderName : w.author
        }));
      }
    }

    this.state.config = next;
    this.saveToStorage();
    this.notify();
  }

  /**
   * Selects a flower in the 20/10 bouquet.
   * @param {string} flowerId
   */
  selectFlower(flowerId) {
    const found = FLOWER_BOUQUET_ITEMS.find((f) => f.id === flowerId);
    if (!found) return null;
    this.state.selectedFlowerId = found.id;
    if (!this.state.bloomedFlowers.includes(found.id)) {
      this.state.bloomedFlowers = [...this.state.bloomedFlowers, found.id];
    }
    this.notify();
    return found;
  }

  /**
   * Selects a floating sky lantern to spotlight its wish.
   * @param {string} lanternId
   */
  selectLantern(lanternId) {
    const found = this.state.wishLanterns.find((w) => w.id === lanternId);
    if (!found) return null;
    this.state.activeLanternId = found.id;
    this.notify();
    return found;
  }

  /**
   * Resets all texts and wishes back to default copy.
   */
  resetToDefaults() {
    const fresh = createInitialState();
    fresh.giftUnwrapped = this.state.giftUnwrapped;
    fresh.musicPlaying = this.state.musicPlaying;
    fresh.envelopeOpened = this.state.envelopeOpened;
    fresh.currentMelody = this.state.currentMelody;
    this.state = fresh;
    if (this.storage) {
      try {
        this.storage.removeItem(STORAGE_KEY);
        this.storage.removeItem(LEGACY_STORAGE_KEY);
        this.storage.removeItem(LEGACY_V2_STORAGE_KEY);
        this.storage.removeItem(LEGACY_V3_STORAGE_KEY);
        this.storage.removeItem(LEGACY_V4_STORAGE_KEY);
      } catch {
        // ignore
      }
    }
    this.notify();
  }

  /**
   * Blows out a specific candle by id or index.
   * @param {number} candleId
   * @returns {boolean} true if candle was newly blown out
   */
  blowCandle(candleId) {
    const candle = this.state.candles.find((c) => c.id === candleId);
    if (!candle || !candle.lit) return false;
    candle.lit = false;
    candle.flameIntensity = 0;
    this.state.allCandlesBlown = this.state.candles.every((c) => !c.lit);
    this.notify();
    return true;
  }

  /**
   * Applies breath wind energy (0..1) from microphone or hold gesture.
   * @param {number} windForce 0.0 to 1.0
   * @returns {number[]} IDs of candles extinguished in this step
   */
  applyBreathForce(windForce) {
    const clamped = Math.max(0, Math.min(1, Number(windForce) || 0));
    if (clamped <= 0.15) return [];

    const sensitivityByCandle = [1.14, 1.0, 0.92];
    const extinguishedIds = [];
    for (let i = 0; i < this.state.candles.length; i++) {
      const candle = this.state.candles[i];
      if (!candle.lit) continue;
      const factor = sensitivityByCandle[i] || 1.0;
      candle.flameIntensity = Math.max(0, candle.flameIntensity - clamped * 0.42 * factor);
      if (candle.flameIntensity <= 0.05) {
        candle.lit = false;
        candle.flameIntensity = 0;
        extinguishedIds.push(candle.id);
      }
    }

    this.state.allCandlesBlown = this.state.candles.every((c) => !c.lit);
    this.notify();
    return extinguishedIds;
  }

  /**
   * Blows out all remaining lit candles immediately.
   * @returns {number[]} IDs of candles extinguished
   */
  blowAllCandles() {
    const extinguishedIds = [];
    for (const candle of this.state.candles) {
      if (candle.lit) {
        candle.lit = false;
        candle.flameIntensity = 0;
        extinguishedIds.push(candle.id);
      }
    }
    this.state.allCandlesBlown = true;
    this.notify();
    return extinguishedIds;
  }

  /**
   * Relights all wish candles.
   */
  relightCandles() {
    for (const candle of this.state.candles) {
      candle.lit = true;
      candle.flameIntensity = 1.0;
    }
    this.state.allCandlesBlown = false;
    this.notify();
  }

  /**
   * Adds a new sky lantern wish.
   * @param {string} wishText
   * @param {string} [author]
   * @returns {{ id: string, text: string, author: string, createdAt: string } | null}
   */
  addWishLantern(wishText, author) {
    const cleanedText = sanitizeText(wishText, '', 320);
    if (!cleanedText) return null;
    const cleanedAuthor = sanitizeText(author, this.state.config.senderName, 50);

    const newLantern = {
      id: `lantern-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      text: cleanedText,
      author: cleanedAuthor,
      createdAt: new Date().toISOString()
    };

    this.state.wishLanterns = [newLantern, ...this.state.wishLanterns].slice(0, 50);
    this.state.activeLanternId = newLantern.id;
    this.saveToStorage();
    this.notify();
    return newLantern;
  }

  setEnvelopeOpened(opened) {
    this.state.envelopeOpened = Boolean(opened);
    this.notify();
  }

  setGiftUnwrapped(unwrapped) {
    this.state.giftUnwrapped = Boolean(unwrapped);
    this.notify();
  }

  setMusicState(isPlaying, melodyKey) {
    if (typeof isPlaying === 'boolean') {
      this.state.musicPlaying = isPlaying;
    }
    if (typeof melodyKey === 'string' && melodyKey) {
      this.state.currentMelody = melodyKey;
    }
    this.notify();
  }
}
