/**
 * Auto-generated browser bundle for 20/10 Experience (Diểm Phúc).
 * Compatible with both file:// (direct Finder double-click) and http(s):// servers.
 */
(function () {
  'use strict';
// --- src/data.js ---
/**
 * Default data, cheerful 20/10 landing page content, and validation helpers
 * for Diểm Phúc's 20/10 (Vietnamese Women's Day) Tulip gift landing page.
 */
const LEGACY_STORAGE_KEY = 'pdp_womens_day_20_10_v1';
const LEGACY_V2_STORAGE_KEY = 'dp_womens_day_20_10_v2';
const LEGACY_V3_STORAGE_KEY = 'dp_womens_day_20_10_v3_gift';
const LEGACY_V4_STORAGE_KEY = 'dp_womens_day_20_10_v4_landing';
const STORAGE_KEY = 'dp_womens_day_20_10_v5_tulip';
const USER_PROVIDED_PORTRAIT_URL =
  'https://photos.fife.usercontent.google.com/pw/AP1GczPmSQT5pcpBvdJ4J-gw2fLlNbn7BO6ozp5ha3M0laIXpd1ctXz_E4HjGA=w768-h1024-s-no-gm?authuser=0';
const FALLBACK_PORTRAIT_URL = './assets/images/hero-portrait.jpg';
const DEFAULT_CONFIG = {
  recipientName: 'Diểm Phúc',
  recipientShortName: 'Emm',
  senderName: 'Ông chú Viettel',
  birthdayTagline:
    'Chúc mừng ngày Phụ nữ Việt Nam 20/10 — Gửi ngàn điều ngọt ngào nhất đến Diểm Phúc',
  birthdaySubtitle:
    'Giữa muôn ngàn đóa hoa Tulip tháng Mười, điều rạng rỡ và dịu dàng nhất vẫn luôn là nụ cười tỏa nắng của Emm. Chúc một ngày lễ 20/10 thật trọn vẹn, bình yên và ngập tràn niềm vui!',
  heroPortraitUrl: USER_PROVIDED_PORTRAIT_URL,
  heroPortraitFallbackUrl: FALLBACK_PORTRAIT_URL,
  heroPortraitCaption: 'Nụ cười dịu dàng của Emm tỏa sáng ngày 20/10',
  theme: 'midnight', // 'midnight' | 'sakura'
  reducedMotion: false,
  letterGreeting: 'Gửi Diểm Phúc nhân ngày Phụ nữ Việt Nam 20/10,',
  letterParagraphs: [
    'Hôm nay là ngày 20/10 — dịp đặc biệt để tôn vinh những người phụ nữ tuyệt vời. Nhân ngày vui này, Ông chú Viettel gửi tặng Diểm Phúc một góc nhỏ bình yên cùng bó hoa Tulip tươi thắm đang bung nở.',
    'Cảm ơn Emm vì đã luôn mang đến cho cuộc sống những gam màu ấm áp, dịu dàng và trong trẻo. Mỗi khi nhìn thấy nụ cười rạng rỡ ấy, mọi mệt mỏi dường như đều tan biến, nhường chỗ cho cảm giác an nhiên đến lạ kỳ.',
    'Nhân ngày Phụ nữ Việt Nam 20/10, chúc Emm luôn tỏa sáng như đóa hoa Tulip dưới nắng mai, luôn giữ trọn sự hồn nhiên, yêu đời và hạnh phúc trên mọi hành trình phía trước.',
    'Chúc Diểm Phúc một ngày 20/10 thật ngọt ngào và trọn vẹn nhé. Mong mọi điều ước đẹp đẽ nhất của Emm hôm nay đều hóa thành hiện thực!'
  ],
  letterSignature: 'Gửi ngàn lời chúc tốt đẹp nhất ngày 20/10 — Ông chú Viettel'
};
const FLOWER_BOUQUET_ITEMS = [
  {
    id: 'flower-tulip-pink',
    name: 'Tulip Hồng Phấn Angelique',
    badge: 'ĐÓA TULIP CHỦ ĐẠO 20/10',
    meaning: 'Sự trân trọng, yêu thương & dịu dàng',
    color: '#F46B8E',
    wish: 'Mỗi cánh hoa Tulip hồng phấn bung nở là một lời chúc Diểm Phúc luôn được yêu thương, trân trọng và nâng niu mỗi ngày.'
  },
  {
    id: 'flower-tulip-apricot',
    name: 'Tulip Cam Đào Champagne',
    badge: 'NỤ CƯỜI TỎA NẮNG',
    meaning: 'Năng lượng ấm áp & niềm vui rạng rỡ',
    color: '#F4978E',
    wish: 'Dành tặng nét dịu dàng rất riêng của Emm — chỉ cần mỉm cười cũng làm bừng sáng cả một ngày dài.'
  },
  {
    id: 'flower-tulip-cream',
    name: 'Tulip Trắng Kem Tinh Khôi',
    badge: 'THANH XUÂN TRONG TRẺO',
    meaning: 'Vẻ đẹp thuần khiết & khởi đầu may mắn',
    color: '#FDE2E8',
    wish: 'Chúc thanh xuân của Emm luôn rực rỡ, nhẹ nhàng và ngập tràn những khoảnh khắc diệu kỳ.'
  },
  {
    id: 'flower-tulip-ruby',
    name: 'Tulip Hồng Nhung Rực Rỡ',
    badge: 'SẮC HOA THÁNG MƯỜI',
    meaning: 'Sự ngưỡng mộ chân thành & hạnh phúc',
    color: '#E04D75',
    wish: 'Mong nụ cười tỏa nắng của Diểm Phúc luôn nở trên môi, luôn hướng về những điều tích cực và bình an nhất.'
  },
  {
    id: 'flower-tulip-lilac',
    name: 'Tulip Ánh Tím Pastel',
    badge: 'LỜI CHÚC BÌNH YÊN',
    meaning: 'Sự duyên dáng, lãng mạn & lời chúc trọn vẹn',
    color: '#D882B6',
    wish: 'Chúc mỗi bước đường phía trước của Emm đều trải đầy hoa Tulip thơm ngát, may mắn và ngọt ngào.'
  }
];
const DEFAULT_GALLERY_MOMENTS = [];
const PHOTO_STACK_ITEMS = [
  {
    id: 'photo-1',
    src: './assets/images/7924A3EF-9FF8-4DCE-9295-230FC520A5E9_1_105_c.jpeg',
    fallbackSrc: './assets/images/hero-portrait.jpg',
    title: 'Diểm Phúc',
    caption: 'Nụ cười dịu dàng của Emm tỏa sáng ngày 20/10',
    tag: '✦ Nụ Cười Tỏa Nắng'
  },
  {
    id: 'photo-2',
    src: './assets/images/IMG_5937.JPG',
    fallbackSrc: './assets/images/hero-portrait.jpg',
    title: 'Rạng Rỡ & Duyên Dáng',
    caption: 'Chỉ cần một nụ cười nhẹ nhàng cũng đủ làm bừng sáng cả không gian',
    tag: '✦ Rạng Ngời'
  },
  {
    id: 'photo-3',
    src: './assets/images/IMG_2652.JPG',
    fallbackSrc: './assets/images/hero-portrait.jpg',
    title: 'Trong Trẻo & Đáng Yêu',
    caption: 'Nét dịu dàng, trong sáng tựa như những đóa hoa Tulip sớm mai',
    tag: '✦ Dịu Dàng'
  },
  {
    id: 'photo-4',
    src: './assets/images/IMG_7101.JPG',
    fallbackSrc: './assets/images/hero-portrait.jpg',
    title: 'Thanh Xuân Rực Rỡ',
    caption: 'Mỗi khoảnh khắc của Emm đều mang lại nguồn năng lượng ấm áp và tích cực',
    tag: '✦ Tinh Khôi'
  },
  {
    id: 'photo-5',
    src: './assets/images/IMG_1660.jpg',
    fallbackSrc: './assets/images/hero-portrait.jpg',
    title: 'Bình Yên & Tươi Vui',
    caption: 'Chúc Emm luôn giữ mãi sự hồn nhiên, yêu đời và hạnh phúc mỗi ngày',
    tag: '✦ Hạnh Phúc'
  }
];
const REASONS_LIST = [
  {
    id: 'reason-1',
    number: '01',
    title: 'Nụ cười tỏa nắng',
    detail:
      'Chỉ một ánh nhìn hay nụ cười nhẹ nhàng của Emm cũng đủ khiến một ngày bình thường trở nên rực rỡ, tươi vui và ấm áp hơn.'
  },
  {
    id: 'reason-2',
    number: '02',
    title: 'Sự dịu dàng & tinh tế',
    detail:
      'Cách Diểm Phúc quan tâm, lắng nghe và sẻ chia với thế giới xung quanh luôn mang một nét dịu dàng rất riêng không trộn lẫn.'
  },
  {
    id: 'reason-3',
    number: '03',
    title: 'Nguồn năng lượng tích cực',
    detail:
      'Sự hồn nhiên, yêu đời của Emm luôn lan tỏa niềm vui và tiếp thêm cảm hứng tươi mới cho mọi người xung quanh.'
  },
  {
    id: 'reason-4',
    number: '04',
    title: 'Vẻ đẹp trong trẻo',
    detail:
      'Tựa như đóa hoa Tulip dưới nắng ban mai, chính tâm hồn trong sáng và chân thành của Emm là điều đáng trân quý nhất.'
  }
];
const DEFAULT_WISH_LANTERNS = [
  {
    id: 'lantern-1',
    text: 'Chúc Diểm Phúc ngày 20/10 luôn rạng rỡ như đóa hoa Tulip ban mai, bình an và ngập tràn tiếng cười!',
    author: '',
    createdAt: '2026-10-20T00:00:00.000Z'
  },
  {
    id: 'lantern-2',
    text: 'Mong mọi dự định và ước mơ phía trước của Emm đều thuận buồm xuôi gió, mỗi ngày trôi qua đều là một ngày vui.',
    author: '',
    createdAt: '2026-10-20T00:01:00.000Z'
  },
  {
    id: 'lantern-3',
    text: 'Chúc Emm một mùa lễ 20/10 thật ngọt ngào, luôn giữ mãi nét hồn nhiên, xinh đẹp và hạnh phúc mỗi ngày.',
    author: '',
    createdAt: '2026-10-20T00:02:00.000Z'
  },
  {
    id: 'lantern-4',
    text: 'Gửi ngàn lời chúc tốt đẹp nhất đến Diểm Phúc — mong bình yên, may mắn và niềm vui luôn đồng hành trên mọi chặng đường.',
    author: '',
    createdAt: '2026-10-20T00:03:00.000Z'
  },
  {
    id: 'lantern-5',
    text: 'Chúc Emm luôn được yêu thương, trân trọng và nâng niu như những đóa hoa Tulip tươi thắm nhất ngày 20/10.',
    author: '',
    createdAt: '2026-10-20T00:04:00.000Z'
  },
  {
    id: 'lantern-6',
    text: 'Mong rằng hôm nay và cả những ngày sau, nụ cười tỏa nắng của Emm sẽ luôn nở trên môi thật rạng ngời.',
    author: '',
    createdAt: '2026-10-20T00:05:00.000Z'
  },
  {
    id: 'lantern-7',
    text: 'Chúc mọi điều ước đẹp đẽ nhất mà Diểm Phúc ấp ủ trong lòng đều sớm nở hoa và trở thành hiện thực!',
    author: '',
    createdAt: '2026-10-20T00:06:00.000Z'
  },
  {
    id: 'lantern-8',
    text: 'Cảm ơn Emm vì đã luôn mang đến nguồn năng lượng dịu dàng và ấm áp. Chúc mừng ngày Phụ nữ Việt Nam 20/10!',
    author: '',
    createdAt: '2026-10-20T00:07:00.000Z'
  }
];
const PRESET_WISH_SUGGESTIONS = [
  'Chúc Diểm Phúc ngày 20/10 luôn xinh đẹp, rạng ngời và hạnh phúc trọn vẹn!',
  'Mong ngày lễ 20/10 mang đến cho Emm thật nhiều niềm vui, hoa Tulip thơm ngát và những điều ngọt ngào nhất!',
  'Chúc mọi điều ước đẹp đẽ nhất hôm nay của Emm đều trở thành sự thật!',
  'Mong mỗi ngày trôi qua của Diểm Phúc đều rực rỡ và dịu ngọt như bó hoa Tulip ngày 20/10!'
];

/**
 * Escapes HTML special characters to prevent XSS when rendering user-provided text.
 * @param {unknown} input
 * @returns {string}
 */
function escapeHtml(input) {
  if (input === null || input === undefined) return '';
  return String(input)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Validates whether a URL/DataURL is safe to use as an image source.
 * Allows relative paths (./assets/...), https://, http://, and data:image/* base64 URLs.
 * Rejects javascript:, data:text/html, etc.
 * @param {unknown} url
 * @returns {string | boolean}
 */
function isValidImageSrc(url) {
  if (typeof url !== 'string') return false;
  const trimmed = url.trim();
  if (!trimmed) return false;
  if (
    /^(\.\/|\/?assets\/)[^\s<>"']+$/i.test(trimmed) &&
    !trimmed.includes('..')
  ) {
    return true;
  }
  if (/^https?:\/\/[^\s<>"']+$/i.test(trimmed)) {
    return true;
  }
  if (/^data:image\/(jpeg|jpg|png|webp|gif|avif);base64,[a-z0-9+/=\s]+$/i.test(trimmed)) {
    return true;
  }
  return false;
}

/**
 * Normalizes and clamps text input with a fallback and max length.
 * @param {unknown} value
 * @param {string} fallback
 * @param {number} maxLength
 * @returns {string}
 */
function sanitizeText(value, fallback = '', maxLength = 500) {
  if (typeof value !== 'string') return fallback;
  const cleaned = value.trim();
  if (!cleaned) return fallback;
  return cleaned.slice(0, maxLength);
}


// --- src/state.js ---

/**
 * Creates a fresh default state object.
 */
function createInitialState() {
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
class BirthdayStateStore {
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


// --- src/audio.js ---
/**
 * Web Audio API Cheerful & Upbeat Multi-Song Synthesizer.
 * Zero external audio file dependencies — works 100% offline and never 404s.
 */

const NOTE_FREQUENCIES = {
  C3: 130.81,
  D3: 146.83,
  E3: 164.81,
  F3: 174.61,
  G3: 196.0,
  A3: 220.0,
  B3: 246.94,
  C4: 261.63,
  Cs4: 277.18,
  D4: 293.66,
  Eb4: 311.13,
  E4: 329.63,
  F4: 349.23,
  Fs4: 369.99,
  G4: 392.0,
  Ab4: 415.3,
  A4: 440.0,
  Bb4: 466.16,
  B4: 493.88,
  C5: 523.25,
  Cs5: 554.37,
  D5: 587.33,
  Eb5: 622.25,
  E5: 659.25,
  F5: 698.46,
  Fs5: 739.99,
  G5: 783.99,
  Ab5: 830.61,
  A5: 880.0,
  Bb5: 932.33,
  B5: 987.77,
  C6: 1046.5,
  D6: 1174.66,
  E6: 1318.51
};

/**
 * Song 1: Upbeat Sunshine Pop Bounce ("Nắng Ban Mai 20/10")
 * Cheerful, bouncy C-Major melody with lively eighth-note groove.
 */
const HAPPY_BIRTHDAY_MELODY = [
  { note: 'G5', harmony: 'E5', bass: 'C4', duration: 0.22 },
  { note: 'A5', harmony: 'C5', bass: 'G4', duration: 0.22 },
  { note: 'G5', harmony: 'E5', bass: 'E4', duration: 0.22 },
  { note: 'E5', harmony: 'C5', bass: 'G4', duration: 0.22 },
  { note: 'C6', harmony: 'E5', bass: 'A3', duration: 0.30 },
  { note: 'A5', harmony: 'C5', bass: 'E4', duration: 0.22 },
  { note: 'G5', harmony: 'E5', bass: 'C4', duration: 0.34 },

  { note: 'E5', harmony: 'C5', bass: 'F3', duration: 0.22 },
  { note: 'G5', harmony: 'D5', bass: 'C4', duration: 0.22 },
  { note: 'A5', harmony: 'F5', bass: 'F4', duration: 0.24 },
  { note: 'G5', harmony: 'E5', bass: 'C4', duration: 0.22 },
  { note: 'E5', harmony: 'C5', bass: 'G3', duration: 0.22 },
  { note: 'D5', harmony: 'B4', bass: 'D4', duration: 0.38 },

  { note: 'G5', harmony: 'E5', bass: 'C4', duration: 0.22 },
  { note: 'A5', harmony: 'F5', bass: 'G4', duration: 0.22 },
  { note: 'B5', harmony: 'G5', bass: 'E4', duration: 0.24 },
  { note: 'C6', harmony: 'E5', bass: 'A3', duration: 0.30 },
  { note: 'D6', harmony: 'G5', bass: 'F4', duration: 0.26 },
  { note: 'B5', harmony: 'G5', bass: 'G4', duration: 0.24 },
  { note: 'C6', harmony: 'E5', bass: 'C4', duration: 0.24 },
  { note: 'G5', harmony: 'E5', bass: 'G4', duration: 0.22 },
  { note: 'E5', harmony: 'C5', bass: 'E4', duration: 0.22 },
  { note: 'D5', harmony: 'B4', bass: 'G3', duration: 0.24 },
  { note: 'C5', harmony: 'E5', bass: 'C4', duration: 0.45 }
];

/**
 * Song 2: Joyful Springtime Dance ("Nụ Cười Tỏa Nắng")
 * Bright G-Major / C-Major celebratory pop rhythm.
 */
const STARLIGHT_WALTZ_MELODY = [
  { note: 'D5', harmony: 'B4', bass: 'G3', duration: 0.20 },
  { note: 'G5', harmony: 'D5', bass: 'D4', duration: 0.22 },
  { note: 'A5', harmony: 'Fs5', bass: 'G4', duration: 0.22 },
  { note: 'B5', harmony: 'G5', bass: 'D4', duration: 0.28 },
  { note: 'A5', harmony: 'Fs5', bass: 'D4', duration: 0.20 },
  { note: 'G5', harmony: 'E5', bass: 'B3', duration: 0.26 },
  { note: 'E5', harmony: 'C5', bass: 'C4', duration: 0.28 },

  { note: 'D5', harmony: 'B4', bass: 'G3', duration: 0.20 },
  { note: 'G5', harmony: 'D5', bass: 'B3', duration: 0.22 },
  { note: 'A5', harmony: 'E5', bass: 'C4', duration: 0.22 },
  { note: 'B5', harmony: 'G5', bass: 'E4', duration: 0.24 },
  { note: 'A5', harmony: 'Fs5', bass: 'D4', duration: 0.36 },

  { note: 'B5', harmony: 'G5', bass: 'G3', duration: 0.22 },
  { note: 'D6', harmony: 'B5', bass: 'D4', duration: 0.26 },
  { note: 'B5', harmony: 'G5', bass: 'G4', duration: 0.22 },
  { note: 'A5', harmony: 'E5', bass: 'C4', duration: 0.22 },
  { note: 'G5', harmony: 'D5', bass: 'B3', duration: 0.22 },
  { note: 'E5', harmony: 'C5', bass: 'A3', duration: 0.22 },
  { note: 'A5', harmony: 'Fs5', bass: 'D4', duration: 0.24 },
  { note: 'G5', harmony: 'B5', bass: 'G3', duration: 0.44 }
];

/**
 * Song 3: Upbeat Café Acoustic Swing ("Khúc Ca Yêu Đời")
 */
const ROSE_WALTZ_MELODY = [
  { note: 'E5', harmony: 'C5', bass: 'C4', duration: 0.22 },
  { note: 'G5', harmony: 'E5', bass: 'G4', duration: 0.22 },
  { note: 'C6', harmony: 'G5', bass: 'E4', duration: 0.26 },
  { note: 'B5', harmony: 'G5', bass: 'G4', duration: 0.20 },
  { note: 'A5', harmony: 'F5', bass: 'F4', duration: 0.24 },
  { note: 'G5', harmony: 'E5', bass: 'C4', duration: 0.24 },
  { note: 'E5', harmony: 'C5', bass: 'G3', duration: 0.28 },

  { note: 'F5', harmony: 'D5', bass: 'D4', duration: 0.22 },
  { note: 'A5', harmony: 'F5', bass: 'A4', duration: 0.22 },
  { note: 'G5', harmony: 'E5', bass: 'E4', duration: 0.24 },
  { note: 'E5', harmony: 'C5', bass: 'C4', duration: 0.22 },
  { note: 'D5', harmony: 'B4', bass: 'G3', duration: 0.34 },

  { note: 'E5', harmony: 'C5', bass: 'C4', duration: 0.20 },
  { note: 'G5', harmony: 'E5', bass: 'E4', duration: 0.20 },
  { note: 'A5', harmony: 'F5', bass: 'F4', duration: 0.22 },
  { note: 'B5', harmony: 'G5', bass: 'G4', duration: 0.22 },
  { note: 'C6', harmony: 'A5', bass: 'A4', duration: 0.26 },
  { note: 'G5', harmony: 'E5', bass: 'E4', duration: 0.22 },
  { note: 'A5', harmony: 'F5', bass: 'D4', duration: 0.22 },
  { note: 'B5', harmony: 'G5', bass: 'G3', duration: 0.22 },
  { note: 'C6', harmony: 'E5', bass: 'C4', duration: 0.44 }
];

/**
 * Song 4: Happy Pentatonic Whistle Groove ("Rạng Rỡ Tháng Mười")
 */
const MOONLIGHT_SERENADE_MELODY = [
  { note: 'C5', harmony: 'G4', bass: 'C4', duration: 0.20 },
  { note: 'D5', harmony: 'A4', bass: 'G3', duration: 0.20 },
  { note: 'E5', harmony: 'C5', bass: 'C4', duration: 0.24 },
  { note: 'G5', harmony: 'E5', bass: 'E4', duration: 0.24 },
  { note: 'A5', harmony: 'E5', bass: 'A3', duration: 0.28 },
  { note: 'C6', harmony: 'G5', bass: 'E4', duration: 0.28 },
  { note: 'A5', harmony: 'F5', bass: 'F3', duration: 0.22 },
  { note: 'G5', harmony: 'E5', bass: 'C4', duration: 0.32 },

  { note: 'E5', harmony: 'C5', bass: 'F4', duration: 0.22 },
  { note: 'G5', harmony: 'D5', bass: 'G4', duration: 0.22 },
  { note: 'A5', harmony: 'E5', bass: 'A4', duration: 0.24 },
  { note: 'G5', harmony: 'D5', bass: 'E4', duration: 0.22 },
  { note: 'E5', harmony: 'C5', bass: 'C4', duration: 0.22 },
  { note: 'D5', harmony: 'B4', bass: 'G3', duration: 0.32 },

  { note: 'E5', harmony: 'C5', bass: 'C4', duration: 0.22 },
  { note: 'G5', harmony: 'E5', bass: 'G4', duration: 0.22 },
  { note: 'A5', harmony: 'F5', bass: 'F4', duration: 0.24 },
  { note: 'C6', harmony: 'G5', bass: 'E4', duration: 0.26 },
  { note: 'D6', harmony: 'B5', bass: 'G4', duration: 0.24 },
  { note: 'C6', harmony: 'E5', bass: 'C4', duration: 0.44 }
];

/**
 * Song 5: Festive Celebration Fanfare ("Vũ Điệu Hoa Nở")
 */
const SPRING_FLOWER_MELODY = [
  { note: 'G5', harmony: 'E5', bass: 'C4', duration: 0.20 },
  { note: 'E5', harmony: 'C5', bass: 'G4', duration: 0.20 },
  { note: 'G5', harmony: 'E5', bass: 'C4', duration: 0.22 },
  { note: 'C6', harmony: 'G5', bass: 'E4', duration: 0.30 },
  { note: 'B5', harmony: 'G5', bass: 'G4', duration: 0.22 },
  { note: 'A5', harmony: 'F5', bass: 'F4', duration: 0.24 },
  { note: 'G5', harmony: 'E5', bass: 'C4', duration: 0.30 },

  { note: 'F5', harmony: 'D5', bass: 'D4', duration: 0.20 },
  { note: 'G5', harmony: 'E5', bass: 'G4', duration: 0.20 },
  { note: 'A5', harmony: 'F5', bass: 'F4', duration: 0.24 },
  { note: 'G5', harmony: 'E5', bass: 'E4', duration: 0.22 },
  { note: 'E5', harmony: 'C5', bass: 'A3', duration: 0.22 },
  { note: 'D5', harmony: 'B4', bass: 'G3', duration: 0.32 },

  { note: 'E5', harmony: 'C5', bass: 'C4', duration: 0.20 },
  { note: 'G5', harmony: 'E5', bass: 'E4', duration: 0.20 },
  { note: 'A5', harmony: 'F5', bass: 'F4', duration: 0.22 },
  { note: 'B5', harmony: 'G5', bass: 'G4', duration: 0.22 },
  { note: 'C6', harmony: 'E5', bass: 'C4', duration: 0.44 }
];

/**
 * Full 5-track upbeat playlist for 20/10 landing page
 */
const ROMANTIC_PLAYLIST = [
  {
    key: 'birthday',
    title: 'Nắng Ban Mai 20/10',
    subtitle: 'Upbeat Sunshine Pop',
    badge: 'Bài 1/5',
    notes: HAPPY_BIRTHDAY_MELODY
  },
  {
    key: 'starlight',
    title: 'Nụ Cười Tỏa Nắng',
    subtitle: 'Joyful Spring Dance',
    badge: 'Bài 2/5',
    notes: STARLIGHT_WALTZ_MELODY
  },
  {
    key: 'rose_waltz',
    title: 'Khúc Ca Yêu Đời',
    subtitle: 'Acoustic Swing',
    badge: 'Bài 3/5',
    notes: ROSE_WALTZ_MELODY
  },
  {
    key: 'moonlight',
    title: 'Rạng Rỡ Tháng Mười',
    subtitle: 'Happy Pop Groove',
    badge: 'Bài 4/5',
    notes: MOONLIGHT_SERENADE_MELODY
  },
  {
    key: 'spring_flower',
    title: 'Vũ Điệu Hoa Nở',
    subtitle: 'Festive Blossom',
    badge: 'Bài 5/5',
    notes: SPRING_FLOWER_MELODY
  }
];
class RomanticAudioEngine {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.melodyKey = 'birthday';
    this.noteIndex = 0;
    this.timerId = null;
    this.micStream = null;
    this.micAnalyser = null;
    this.micRafId = null;
    this.micAmbientFloor = 55;
    this.micSmoothedLevel = 0;
    this.micCalibrating = false;
    this.masterVolume = 0.24;
    this.audioElement = null;
    this.audioSource = './assets/audio/mot-ngay-buon-kieu-chi.mp3';
    this.currentSongTitle = 'Một ngày buồn — Kiều Chi';
    this.isMp3Mode = true;
  }

  setAudioElement(el) {
    if (!el) return;
    this.audioElement = el;
    try {
      el.volume = 0.65;
    } catch {}
  }

  getPlaylist() {
    return ROMANTIC_PLAYLIST;
  }

  getCurrentTrack() {
    return ROMANTIC_PLAYLIST.find((t) => t.key === this.melodyKey) || ROMANTIC_PLAYLIST[0];
  }

  ensureContext() {
    if (this.ctx) {
      if (this.ctx.state === 'suspended' && typeof this.ctx.resume === 'function') {
        this.ctx.resume().catch(() => {});
      }
      return this.ctx;
    }
    const AudioCtx =
      typeof globalThis !== 'undefined' &&
      (globalThis.AudioContext || globalThis.webkitAudioContext);
    if (!AudioCtx) return null;
    try {
      this.ctx = new AudioCtx();
      return this.ctx;
    } catch {
      return null;
    }
  }

  /**
   * Plays a crisp, cheerful celesta / acoustic-bell note with bright overtones and punchy envelope.
   * @param {number} freq
   * @param {number} durationSec
   * @param {number} [volumeScale=1]
   */
  playMusicBoxTone(freq, durationSec = 0.28, volumeScale = 1) {
    const ctx = this.ensureContext();
    if (!ctx || !freq) return;

    const now = ctx.currentTime;
    const oscMain = ctx.createOscillator();
    const oscOvertone = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscMain.type = 'triangle';
    oscMain.frequency.setValueAtTime(freq, now);

    // Bright sparkle harmonic chime (2x frequency)
    oscOvertone.type = 'sine';
    oscOvertone.frequency.setValueAtTime(freq * 2, now);

    const overtoneGain = ctx.createGain();
    overtoneGain.gain.setValueAtTime(0.18, now);

    const micDuckFactor = this.micAnalyser ? 0.25 : 1;
    const peakGain = Math.max(0.001, this.masterVolume * volumeScale * micDuckFactor);
    gainNode.gain.setValueAtTime(0.0001, now);
    gainNode.gain.exponentialRampToValueAtTime(peakGain, now + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.0008, now + durationSec * 1.18);

    oscMain.connect(gainNode);
    oscOvertone.connect(overtoneGain);
    overtoneGain.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscMain.start(now);
    oscOvertone.start(now);
    oscMain.stop(now + durationSec * 1.22);
    oscOvertone.stop(now + durationSec * 1.22);
  }

  /**
   * Starts playing the selected background melody loop or MP3 track.
   * @param {string} [melodyKey]
   */
  startMusic(melodyKey) {
    if (melodyKey && ROMANTIC_PLAYLIST.some((t) => t.key === melodyKey)) {
      this.melodyKey = melodyKey;
      if (melodyKey !== 'birthday') {
        this.isMp3Mode = false;
        if (this.audioElement && typeof this.audioElement.pause === 'function') {
          try {
            this.audioElement.pause();
          } catch {}
        }
      } else {
        this.isMp3Mode = true;
      }
    } else if (!melodyKey) {
      if (this.melodyKey === 'birthday') {
        this.isMp3Mode = true;
      }
    }
    if (this.isPlaying) return true;
    this.isPlaying = true;

    if (this.isMp3Mode && this.audioElement && typeof this.audioElement.play === 'function') {
      const playPromise = this.audioElement.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          this.noteIndex = 0;
          this.scheduleNextNote();
        });
      }
      return true;
    }

    this.noteIndex = 0;
    this.scheduleNextNote();
    return true;
  }

  stopMusic() {
    this.isPlaying = false;
    if (this.audioElement && typeof this.audioElement.pause === 'function') {
      try {
        this.audioElement.pause();
      } catch {}
    }
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  toggleMusic() {
    if (this.isPlaying) {
      this.stopMusic();
      return false;
    }
    this.startMusic();
    return true;
  }

  /**
   * Switches to a specific melody track by key.
   * @param {string} melodyKey
   */
  switchMelody(melodyKey) {
    if (!ROMANTIC_PLAYLIST.some((t) => t.key === melodyKey)) return false;
    this.melodyKey = melodyKey;
    this.noteIndex = 0;

    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }

    if (melodyKey === 'birthday') {
      this.isMp3Mode = true;
      if (this.isPlaying && this.audioElement && typeof this.audioElement.play === 'function') {
        const p = this.audioElement.play();
        if (p !== undefined) {
          p.catch(() => {
            this.scheduleNextNote();
          });
        }
      }
    } else {
      this.isMp3Mode = false;
      if (this.audioElement && typeof this.audioElement.pause === 'function') {
        try {
          this.audioElement.pause();
        } catch {}
      }
      if (this.isPlaying) {
        this.scheduleNextNote();
      }
    }
    return true;
  }

  /**
   * Advances to the next track in the upbeat playlist.
   */
  nextMelody() {
    const idx = ROMANTIC_PLAYLIST.findIndex((t) => t.key === this.melodyKey);
    const nextTrack = ROMANTIC_PLAYLIST[(idx + 1) % ROMANTIC_PLAYLIST.length];
    this.switchMelody(nextTrack.key);
    return nextTrack;
  }

  playSwipeSwoosh() {
    const ctx = this.ensureContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(680, now + 0.12);
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.14);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.15);
    } catch {}
  }

  playHeartPop() {
    const ctx = this.ensureContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.1);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.13);
    } catch {}
  }

  playLanternGlowChime() {
    const notes = ['G4', 'C5', 'E5', 'G5'];
    notes.forEach((n, idx) => {
      setTimeout(() => {
        this.playMusicBoxTone(NOTE_FREQUENCIES[n], 0.42, 0.62);
      }, idx * 60);
    });
  }

  scheduleNextNote() {
    if (!this.isPlaying) return;
    const track = this.getCurrentTrack();
    const sequence = track.notes;
    const currentIdx = this.noteIndex % sequence.length;
    const item = sequence[currentIdx];
    this.noteIndex = (currentIdx + 1) % sequence.length;

    const mainFreq = NOTE_FREQUENCIES[item.note];
    if (mainFreq) {
      this.playMusicBoxTone(mainFreq, item.duration * 1.15, 0.92);
    }
    if (item.harmony && NOTE_FREQUENCIES[item.harmony]) {
      this.playMusicBoxTone(NOTE_FREQUENCIES[item.harmony], item.duration * 1.05, 0.28);
    }
    if (item.bass && NOTE_FREQUENCIES[item.bass] && (currentIdx % 2 === 0 || item.duration >= 0.26)) {
      this.playMusicBoxTone(NOTE_FREQUENCIES[item.bass], item.duration * 1.35, 0.34);
    }

    // Cheerful, bouncy ~130 BPM tempo (clean articulation without note mud)
    const delayMs = Math.round(item.duration * 960);
    this.timerId = setTimeout(() => this.scheduleNextNote(), delayMs);
  }

  /**
   * Plays a joyful harp glissando for special interactions.
   */
  playCelebrationChord() {
    const notes = ['C4', 'E4', 'G4', 'B4', 'C5', 'E5', 'G5', 'C6'];
    notes.forEach((n, idx) => {
      setTimeout(() => {
        this.playMusicBoxTone(NOTE_FREQUENCIES[n], 0.55, 0.68);
      }, idx * 55);
    });
  }

  /**
   * Plays a gentle sparkle chime.
   */
  playSparkleChime() {
    const notes = ['E5', 'G5', 'A5', 'C6'];
    notes.forEach((n, idx) => {
      setTimeout(() => {
        this.playMusicBoxTone(NOTE_FREQUENCIES[n], 0.38, 0.55);
      }, idx * 48);
    });
  }

  /**
   * Plays a bright floral harp arpeggio when blooming the bouquet.
   */
  playFlowerBloomChime() {
    const notes = ['F4', 'A4', 'C5', 'E5', 'A5', 'C6'];
    notes.forEach((n, idx) => {
      setTimeout(() => {
        this.playMusicBoxTone(NOTE_FREQUENCIES[n], 0.45, 0.58);
      }, idx * 52);
    });
  }

  /**
   * Calibrated microphone blow detector.
   * @param {(level: number, meta?: { calibrating: boolean }) => void} onBlowLevel
   * @param {(err: Error) => void} [onError]
   */
  async startMicrophoneBlowDetector(onBlowLevel, onError) {
    this.stopMicrophoneBlowDetector();
    if (
      typeof navigator === 'undefined' ||
      !navigator.mediaDevices ||
      typeof navigator.mediaDevices.getUserMedia !== 'function'
    ) {
      const err = new Error('Trình duyệt không hỗ trợ truy cập Micro.');
      if (onError) onError(err);
      return false;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: false,
          autoGainControl: false
        }
      });
      const ctx = this.ensureContext();
      if (!ctx) {
        stream.getTracks().forEach((t) => t.stop());
        throw new Error('Không thể khởi tạo bộ xử lý âm thanh.');
      }

      this.micStream = stream;
      const source = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 256;
      analyser.smoothingTimeConstant = 0.65;
      source.connect(analyser);
      this.micAnalyser = analyser;

      const freqData = new Uint8Array(analyser.frequencyBinCount);
      const timeData = new Uint8Array(analyser.fftSize || 256);
      let frameCount = 0;
      const calibrationFrames = 28;
      let calibrationSum = 0;
      let activeCalibrationFrames = 0;
      let calibrationPeak = 55;
      this.micAmbientFloor = 65;
      this.micSmoothedLevel = 0;
      this.micCalibrating = true;

      const sampleLoop = () => {
        if (!this.micAnalyser) return;
        this.micAnalyser.getByteFrequencyData(freqData);
        const hasTimeDomain = typeof this.micAnalyser.getByteTimeDomainData === 'function';
        if (hasTimeDomain) {
          this.micAnalyser.getByteTimeDomainData(timeData);
        }

        let sum = 0;
        const startBin = Math.min(2, freqData.length - 1);
        const endBin = Math.min(22, freqData.length);
        const binCount = Math.max(1, endBin - startBin);
        for (let i = startBin; i < endBin; i++) {
          sum += freqData[i];
        }
        const avg = sum / binCount;

        let rms = 0.15;
        if (hasTimeDomain) {
          let sqSum = 0;
          let nonZeroSamples = 0;
          for (let i = 0; i < timeData.length; i++) {
            const sample = timeData[i];
            if (sample !== 0) nonZeroSamples++;
            const centered = (sample - 128) / 128;
            sqSum += centered * centered;
          }
          rms = nonZeroSamples === 0 ? 0 : Math.sqrt(sqSum / timeData.length);
        }

        frameCount++;
        if (frameCount <= calibrationFrames) {
          if (avg > 2) {
            calibrationSum += avg;
            activeCalibrationFrames++;
            calibrationPeak = Math.max(calibrationPeak, Math.min(120, avg));
          }
          const baselineMean =
            activeCalibrationFrames > 0 ? calibrationSum / activeCalibrationFrames : 65;
          this.micAmbientFloor = Math.min(
            135,
            Math.max(52, baselineMean * 0.72 + calibrationPeak * 0.28)
          );
          this.micCalibrating = true;
          onBlowLevel(0, { calibrating: true });
        } else {
          this.micCalibrating = false;
          if (avg > 2 && avg < this.micAmbientFloor) {
            this.micAmbientFloor = Math.max(50, this.micAmbientFloor * 0.88 + avg * 0.12);
          }

          const dynamicThreshold = Math.max(96, this.micAmbientFloor + 44);
          let rawLevel = 0;
          if (avg > dynamicThreshold && rms > 0.065) {
            rawLevel = Math.min(1, Math.max(0, (avg - dynamicThreshold) / 98));
          }
          this.micSmoothedLevel = this.micSmoothedLevel * 0.62 + rawLevel * 0.38;
          if (this.micSmoothedLevel < 0.04) this.micSmoothedLevel = 0;
          onBlowLevel(this.micSmoothedLevel, { calibrating: false });
        }

        if (this.micAnalyser && typeof requestAnimationFrame === 'function') {
          this.micRafId = requestAnimationFrame(sampleLoop);
        }
      };
      if (typeof requestAnimationFrame === 'function') {
        this.micRafId = requestAnimationFrame(sampleLoop);
      }
      return true;
    } catch (err) {
      if (onError) onError(err instanceof Error ? err : new Error(String(err)));
      return false;
    }
  }

  stopMicrophoneBlowDetector() {
    if (this.micRafId) {
      cancelAnimationFrame(this.micRafId);
      this.micRafId = null;
    }
    this.micAnalyser = null;
    this.micCalibrating = false;
    this.micSmoothedLevel = 0;
    if (this.micStream) {
      this.micStream.getTracks().forEach((track) => track.stop());
      this.micStream = null;
    }
  }
}


// --- src/particles.js ---
/**
 * Multi-layer HTML5 Canvas 2D Romantic Floral, Starlight & Celebration Engine
 * - Twinkling starfield + shooting stars
 * - Multi-petal blooming flowers (5-petal Sakura, Roses, swaying petals) + golden fireflies
 * - Interactive cursor floral & stardust trail
 * - Celebration fireworks, flower showers & heart confetti bursts
 * - Rising glowing sky lanterns with wish labels
 * Respects prefers-reduced-motion.
 */

const CELEBRATION_COLORS = [
  '#FF4D79', // Velvet Rose
  '#FF6B9D', // Rose Pink
  '#FFD166', // Champagne Gold
  '#FF8FA3', // Sakura Blush
  '#C77DFF', // Starlight Violet
  '#FFF0F5', // Pearl White
  '#F4A261'  // Warm Amber
];

const FLOWER_PALETTE = [
  { outer: '#FF75A0', inner: '#FFE5EC', core: '#FFD166' },
  { outer: '#FF4D79', inner: '#FF8FA3', core: '#FFF3B0' },
  { outer: '#FFB3C6', inner: '#FFF0F5', core: '#FFD166' },
  { outer: '#E06C9F', inner: '#FDE2E8', core: '#FFE066' }
];
const LANTERN_WISH_POOL = [
  'Diểm Phúc 20/10',
  'Dịu dàng & Tinh tế',
  'Bình yên & Rạng rỡ',
  'Vạn sự như ý',
  'Nụ cười tỏa nắng',
  'Bình an & Hạnh phúc',
  'Emm luôn rạng ngời',
  'Thanh xuân rực rỡ',
  'Yêu đời & Lạc quan',
  'Ngọt ngào & An nhiên',
  'Hạnh phúc đong đầy',
  'Yêu thương trọn vẹn'
];
class RomanticParticleEngine {
  /**
   * @param {HTMLCanvasElement | null} canvas
   * @param {{ reducedMotion?: boolean, theme?: 'midnight' | 'sakura' }} [options]
   */
  constructor(canvas, options = {}) {
    this.canvas = canvas;
    this.ctx = canvas && typeof canvas.getContext === 'function' ? canvas.getContext('2d') : null;
    this.reducedMotion = Boolean(options.reducedMotion);
    this.theme = options.theme || 'midnight';

    this.width = 1280;
    this.height = 800;
    this.dpr = 1;
    this.running = false;
    this.rafId = null;
    this.tickCount = 0;

    this.stars = [];
    this.sakuraPetals = [];
    this.fireflies = [];
    this.butterflies = [];
    this.shockwaves = [];
    this.burstParticles = [];
    this.shootingStars = [];
    this.skyLanterns = [];

    this.pointer = { x: -1000, y: -1000, active: false };
    this.handleResize = this.resize.bind(this);
  }

  init() {
    this.resize();
    this.seedAmbientParticles();
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', this.handleResize, { passive: true });
    }
    if (this.reducedMotion) {
      this.renderStaticFrame();
    } else {
      this.start();
    }
  }

  destroy() {
    this.stop();
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.handleResize);
    }
  }

  setReducedMotion(reduced) {
    this.reducedMotion = Boolean(reduced);
    if (this.reducedMotion) {
      this.stop();
      this.burstParticles = [];
      this.shootingStars = [];
      this.renderStaticFrame();
    } else {
      this.start();
    }
  }

  setTheme(theme) {
    this.theme = theme === 'sakura' ? 'sakura' : 'midnight';
    if (this.reducedMotion) {
      this.renderStaticFrame();
    }
  }

  resize() {
    if (!this.canvas) return;
    const w =
      typeof window !== 'undefined' ? window.innerWidth : this.canvas.width || 1280;
    const h =
      typeof window !== 'undefined' ? window.innerHeight : this.canvas.height || 800;
    this.dpr =
      typeof window !== 'undefined' ? Math.min(window.devicePixelRatio || 1, 2) : 1;
    this.width = Math.max(320, w);
    this.height = Math.max(480, h);

    this.canvas.width = Math.floor(this.width * this.dpr);
    this.canvas.height = Math.floor(this.height * this.dpr);
    if (this.ctx && typeof this.ctx.setTransform === 'function') {
      this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    }
    if (this.stars.length === 0) {
      this.seedAmbientParticles();
    }
    if (this.reducedMotion) {
      this.renderStaticFrame();
    }
  }

  seedAmbientParticles() {
    const isMobile = this.width < 768;
    const starCount = isMobile ? 60 : 120;
    const petalCount = isMobile ? 24 : 44;
    const fireflyCount = isMobile ? 16 : 30;

    this.stars = Array.from({ length: starCount }, () => ({
      x: Math.random() * this.width,
      y: Math.random() * this.height,
      radius: Math.random() * 1.65 + 0.4,
      baseAlpha: Math.random() * 0.55 + 0.25,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.025 + 0.008,
      tint: Math.random() > 0.7 ? '#FFD166' : Math.random() > 0.4 ? '#FFE5EC' : '#E0E7FF'
    }));

    this.sakuraPetals = Array.from({ length: petalCount }, (_, idx) =>
      this.createSakuraPetal(true, idx)
    );

    this.fireflies = Array.from({ length: fireflyCount }, () => ({
      x: Math.random() * this.width,
      y: Math.random() * this.height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: -(Math.random() * 0.45 + 0.15),
      radius: Math.random() * 2.4 + 1.2,
      phase: Math.random() * Math.PI * 2,
      color: Math.random() > 0.45 ? '#FFD166' : '#FF8FA3'
    }));

    const lanternCount = isMobile ? 8 : 12;
    this.skyLanterns = Array.from({ length: lanternCount }, (_, i) => ({
      x: Math.random() * this.width,
      y: Math.random() * this.height,
      vx: (Math.random() - 0.5) * 0.28,
      vy: -(Math.random() * 0.45 + 0.32),
      size: Math.random() * 6 + 16,
      swayPhase: Math.random() * Math.PI * 2,
      flickerPhase: Math.random() * Math.PI * 2,
      alpha: Math.random() * 0.22 + 0.36,
      label: LANTERN_WISH_POOL[i % LANTERN_WISH_POOL.length],
      author: '',
      isAmbient: true
    }));

    const butterflyPalettes = [
      { upper: '#FF6B9D', lower: '#FFD166', glow: 'rgba(255, 107, 157, 0.35)' },
      { upper: '#C77DFF', lower: '#FF8FA3', glow: 'rgba(199, 125, 255, 0.35)' },
      { upper: '#38BDF8', lower: '#F472B6', glow: 'rgba(56, 189, 248, 0.32)' },
      { upper: '#FFD166', lower: '#FB7185', glow: 'rgba(255, 209, 102, 0.35)' }
    ];
    const butterflyCount = isMobile ? 5 : 8;
    this.butterflies = Array.from({ length: butterflyCount }, (_, i) => {
      const pal = butterflyPalettes[i % butterflyPalettes.length];
      return {
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vx: (Math.random() - 0.5) * 0.9 + (i % 2 === 0 ? 0.45 : -0.45),
        vy: -(Math.random() * 0.5 + 0.25),
        size: Math.random() * 5 + 10,
        wingPhase: Math.random() * Math.PI * 2,
        wingSpeed: Math.random() * 0.14 + 0.14,
        swayPhase: Math.random() * Math.PI * 2,
        alpha: Math.random() * 0.28 + 0.58,
        upperColor: pal.upper,
        lowerColor: pal.lower,
        glowColor: pal.glow
      };
    });
  }

  createSakuraPetal(randomY = false, indexHint = 0) {
    const palette = FLOWER_PALETTE[indexHint % FLOWER_PALETTE.length];
    const roll = Math.random();
    const flowerType = roll > 0.45 ? 'tulip' : roll > 0.2 ? 'sakura5' : 'petal';
    return {
      x: Math.random() * this.width,
      y: randomY ? Math.random() * this.height : -24 - Math.random() * 40,
      size:
        flowerType === 'tulip'
          ? Math.random() * 6 + 9.5
          : flowerType === 'sakura5'
            ? Math.random() * 5.5 + 8
            : Math.random() * 6 + 5.5,
      vx: Math.random() * 0.65 - 0.2,
      vy: Math.random() * 0.8 + 0.45,
      angle: (Math.random() - 0.5) * 0.5,
      spin: (Math.random() - 0.5) * 0.016,
      swayPhase: Math.random() * Math.PI * 2,
      swaySpeed: Math.random() * 0.022 + 0.01,
      opacity: Math.random() * 0.4 + 0.5,
      bloomProgress: randomY ? Math.random() * 0.55 + 0.45 : 0.14,
      bloomSpeed: Math.random() * 0.016 + 0.01,
      flowerType,
      palette
    };
  }

  start() {
    if (this.running || this.reducedMotion || !this.ctx) return;
    this.running = true;
    const loop = () => {
      if (!this.running) return;
      this.update();
      this.draw();
      if (typeof requestAnimationFrame === 'function') {
        this.rafId = requestAnimationFrame(loop);
      }
    };
    if (typeof requestAnimationFrame === 'function') {
      this.rafId = requestAnimationFrame(loop);
    }
  }

  stop() {
    this.running = false;
    if (this.rafId && typeof cancelAnimationFrame === 'function') {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  /**
   * Spawns subtle floral & stardust trail along cursor movement.
   * @param {number} x
   * @param {number} y
   */
  onPointerMove(x, y) {
    this.pointer.x = x;
    this.pointer.y = y;
    this.pointer.active = true;
    if (this.reducedMotion) return;

    if (this.burstParticles.length < 260 && Math.random() > 0.3) {
      const shapes = ['tulip', 'flower', 'heart', 'star'];
      this.burstParticles.push({
        x: x + (Math.random() - 0.5) * 16,
        y: y + (Math.random() - 0.5) * 16,
        vx: (Math.random() - 0.5) * 1.15,
        vy: (Math.random() - 0.7) * 1.25,
        size: Math.random() * 4.2 + 2.5,
        alpha: 0.88,
        decay: 0.022,
        gravity: 0.012,
        rotation: (Math.random() - 0.5) * 0.5,
        spin: (Math.random() - 0.5) * 0.04,
        bloomProgress: 0.25,
        bloomSpeed: 0.045,
        color: CELEBRATION_COLORS[Math.floor(Math.random() * CELEBRATION_COLORS.length)],
        shape: shapes[Math.floor(Math.random() * shapes.length)]
      });
    }
  }

  /**
   * Triggers a celebratory burst of tulips, flowers, hearts, and golden sparks at (x, y).
   * @param {number} [x]
   * @param {number} [y]
   * @param {number} [count=55]
   */
  triggerCelebrationBurst(x = this.width / 2, y = this.height / 2, count = 55) {
    if (this.reducedMotion) return 0;
    this.triggerShockwave(x, y);
    const safeCount = Math.min(140, Math.max(8, count));
    for (let i = 0; i < safeCount; i++) {
      const angle = (Math.PI * 2 * i) / safeCount + (Math.random() - 0.5) * 0.25;
      const speed = Math.random() * 6.5 + 1.8;
      const shape = i % 4 === 0 ? 'tulip' : i % 4 === 1 ? 'flower' : i % 4 === 2 ? 'heart' : 'star';
      this.burstParticles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1.5,
        size: Math.random() * 7 + 4.5,
        alpha: 1,
        decay: Math.random() * 0.011 + 0.008,
        gravity: 0.075,
        rotation: (Math.random() - 0.5) * 0.6,
        spin: (Math.random() - 0.5) * 0.05,
        bloomProgress: 0.2,
        bloomSpeed: 0.04,
        color: CELEBRATION_COLORS[i % CELEBRATION_COLORS.length],
        shape
      });
    }
    return safeCount;
  }

  /**
   * Triggers expanding prismatic light shockwave rings at (x, y).
   * @param {number} [x]
   * @param {number} [y]
   */
  triggerShockwave(x = this.width / 2, y = this.height / 2) {
    if (this.reducedMotion) return;
    const colors = ['#FFD166', '#FF4D79', '#C77DFF'];
    colors.forEach((color, idx) => {
      this.shockwaves.push({
        x,
        y,
        radius: 12 + idx * 14,
        maxRadius: 210 + idx * 55,
        speed: 5.2 - idx * 0.6,
        alpha: 0.72 - idx * 0.14,
        color
      });
    });
  }

  /**
   * Triggers a lush full-screen 20/10 Blooming Tulip Shower across the viewport.
   * Each tulip starts as a bud and unfurls into full bloom as it floats down.
   * @param {number} [count=60]
   * @param {string} [accentColor]
   */
  triggerFlowerShower(count = 60, accentColor) {
    if (this.reducedMotion) return 0;
    const safeCount = Math.min(130, Math.max(12, count));
    for (let i = 0; i < safeCount; i++) {
      const mod = i % 5;
      const shape = mod <= 2 ? 'tulip' : mod === 3 ? 'flower' : 'heart';
      const color =
        accentColor && i % 2 === 0
          ? accentColor
          : CELEBRATION_COLORS[i % CELEBRATION_COLORS.length];
      this.burstParticles.push({
        x: Math.random() * this.width,
        y: -15 - Math.random() * (this.height * 0.35),
        vx: (Math.random() - 0.5) * 2.0,
        vy: Math.random() * 2.1 + 1.0,
        size: Math.random() * 9.5 + 7.5,
        alpha: 0.98,
        decay: Math.random() * 0.0042 + 0.0032,
        gravity: 0.016,
        rotation: (Math.random() - 0.5) * 0.45,
        spin: (Math.random() - 0.5) * 0.025,
        bloomProgress: 0.15,
        bloomSpeed: Math.random() * 0.028 + 0.018,
        color,
        shape
      });
    }
    return safeCount;
  }

  /**
   * Launches a multi-burst firework & flower celebration across the upper sky.
   */
  launchFireworkShow() {
    if (this.reducedMotion) return;
    const positions = [
      { x: this.width * 0.25, y: this.height * 0.28, delay: 0 },
      { x: this.width * 0.75, y: this.height * 0.26, delay: 250 },
      { x: this.width * 0.5, y: this.height * 0.2, delay: 500 },
      { x: this.width * 0.35, y: this.height * 0.34, delay: 780 },
      { x: this.width * 0.65, y: this.height * 0.32, delay: 1050 }
    ];
    positions.forEach((pos) => {
      setTimeout(() => {
        this.triggerCelebrationBurst(pos.x, pos.y, 48);
      }, pos.delay);
    });
  }

  /**
   * Spawns a rising glowing sky lantern on canvas with optional wish label.
   * @param {string} [label]
   * @param {string} [author]
   */
  spawnCanvasLantern(label = '', author = '') {
    if (this.reducedMotion) return null;
    const finalLabel = label || LANTERN_WISH_POOL[Math.floor(Math.random() * LANTERN_WISH_POOL.length)];
    const lantern = {
      x: this.width * (0.12 + Math.random() * 0.76),
      y: this.height * (0.72 + Math.random() * 0.24),
      vx: (Math.random() - 0.5) * 0.32,
      vy: -(Math.random() * 0.85 + 0.72),
      size: Math.random() * 5 + 16,
      swayPhase: Math.random() * Math.PI * 2,
      flickerPhase: Math.random() * Math.PI * 2,
      alpha: 0.62,
      label: String(finalLabel),
      author: author ? String(author) : ''
    };
    this.skyLanterns.push(lantern);
    if (this.skyLanterns.length > 28) {
      this.skyLanterns.shift();
    }
    return lantern;
  }

  /**
   * Spawns a glowing wish lantern directly at the touch/click coordinates.
   * @param {number} x
   * @param {number} y
   * @param {string} [label]
   */
  spawnTouchLantern(x, y, label = '') {
    if (this.reducedMotion) return null;
    const finalLabel = label || LANTERN_WISH_POOL[Math.floor(Math.random() * LANTERN_WISH_POOL.length)];
    const lantern = {
      x: typeof x === 'number' ? x : this.width * 0.5,
      y: typeof y === 'number' ? y : this.height * 0.8,
      vx: (Math.random() - 0.5) * 0.35,
      vy: -(Math.random() * 0.75 + 0.65),
      size: Math.random() * 5 + 16,
      swayPhase: Math.random() * Math.PI * 2,
      flickerPhase: Math.random() * Math.PI * 2,
      alpha: 0.62,
      label: String(finalLabel),
      author: ''
    };
    this.skyLanterns.push(lantern);
    if (this.skyLanterns.length > 32) {
      this.skyLanterns.shift();
    }
    return lantern;
  }

  /**
   * Releases a wave of multiple sky lanterns across the sky.
   * @param {Array<{ text?: string, author?: string }>} [wishes]
   */
  launchLanternWave(wishes = []) {
    if (this.reducedMotion) return 0;
    const count = 5;
    for (let i = 0; i < count; i++) {
      const w = wishes[i % Math.max(1, wishes.length)] || {};
      setTimeout(() => {
        this.spawnCanvasLantern(
          w.text || 'Chúc Diểm Phúc 20/10 hạnh phúc!',
          ''
        );
      }, i * 220);
    }
    return count;
  }

  update() {
    this.tickCount++;

    // Twinkle stars
    for (const s of this.stars) {
      s.phase += s.speed;
    }

    // Occasional shooting star in midnight mode
    if (
      this.theme === 'midnight' &&
      this.shootingStars.length < 3 &&
      Math.random() < 0.009
    ) {
      this.shootingStars.push({
        x: Math.random() * this.width * 0.8 + this.width * 0.1,
        y: Math.random() * this.height * 0.35,
        vx: -(Math.random() * 5 + 6),
        vy: Math.random() * 3 + 3.2,
        length: Math.random() * 70 + 55,
        alpha: 1
      });
    }

    for (let i = this.shootingStars.length - 1; i >= 0; i--) {
      const st = this.shootingStars[i];
      st.x += st.vx;
      st.y += st.vy;
      st.alpha -= 0.022;
      if (st.alpha <= 0 || st.x < -100 || st.y > this.height + 100) {
        this.shootingStars.splice(i, 1);
      }
    }

    // Update Sakura & Rose Flowers (including smooth bud-to-bloom progression)
    for (let i = 0; i < this.sakuraPetals.length; i++) {
      const p = this.sakuraPetals[i];
      p.swayPhase += p.swaySpeed;
      p.x += p.vx + Math.sin(p.swayPhase) * 0.5;
      p.y += p.vy;
      p.angle += p.spin;
      if (typeof p.bloomProgress === 'number' && p.bloomProgress < 1) {
        p.bloomProgress = Math.min(1, p.bloomProgress + (p.bloomSpeed || 0.015));
      }

      if (p.y > this.height + 30 || p.x < -50 || p.x > this.width + 50) {
        this.sakuraPetals[i] = this.createSakuraPetal(false, i);
      }
    }

    // Update Fireflies
    for (const f of this.fireflies) {
      f.phase += 0.035;
      f.x += f.vx + Math.cos(f.phase) * 0.25;
      f.y += f.vy;
      if (f.y < -20) {
        f.y = this.height + 15;
        f.x = Math.random() * this.width;
      }
      if (f.x < -20) f.x = this.width + 15;
      if (f.x > this.width + 20) f.x = -15;
    }

    // Update Sky Lanterns
    for (let i = this.skyLanterns.length - 1; i >= 0; i--) {
      const l = this.skyLanterns[i];
      l.swayPhase += 0.018;
      l.flickerPhase = (l.flickerPhase || 0) + 0.06;
      l.x += l.vx + Math.sin(l.swayPhase) * 0.38;
      l.y += l.vy;
      if (l.y < -120) {
        if (l.isAmbient) {
          l.y = this.height + 40 + Math.random() * 80;
          l.x = Math.random() * this.width;
          l.swayPhase = Math.random() * Math.PI * 2;
          l.flickerPhase = Math.random() * Math.PI * 2;
          l.size = Math.random() * 6 + 16;
          l.alpha = Math.random() * 0.22 + 0.36;
          l.label = LANTERN_WISH_POOL[Math.floor(Math.random() * LANTERN_WISH_POOL.length)];
        } else {
          this.skyLanterns.splice(i, 1);
        }
      }
    }

    // Update Burst Particles (fireworks, blooming flowers, hearts, sparkles)
    for (let i = this.burstParticles.length - 1; i >= 0; i--) {
      const b = this.burstParticles[i];
      b.x += b.vx;
      b.y += b.vy;
      b.vy += b.gravity;
      b.vx *= 0.986;
      if (b.rotation !== undefined && b.spin !== undefined) {
        b.rotation += b.spin;
      }
      if (typeof b.bloomProgress === 'number' && b.bloomProgress < 1) {
        b.bloomProgress = Math.min(1, b.bloomProgress + (b.bloomSpeed || 0.025));
      }
      b.alpha -= b.decay;
      if (b.alpha <= 0 || b.y > this.height + 60) {
        this.burstParticles.splice(i, 1);
      }
    }

    // Update Fluttering Butterflies
    for (const bf of this.butterflies) {
      bf.wingPhase += bf.wingSpeed;
      bf.swayPhase += 0.025;
      bf.x += bf.vx + Math.sin(bf.swayPhase) * 0.55;
      bf.y += bf.vy + Math.cos(bf.swayPhase * 0.8) * 0.25;
      if (bf.y < -40) {
        bf.y = this.height + 30;
        bf.x = Math.random() * this.width;
      }
      if (bf.x < -40) bf.x = this.width + 30;
      if (bf.x > this.width + 40) bf.x = -30;
    }

    // Update Shockwaves
    for (let i = this.shockwaves.length - 1; i >= 0; i--) {
      const sw = this.shockwaves[i];
      sw.radius += sw.speed;
      sw.alpha *= 0.94;
      if (sw.alpha <= 0.02 || sw.radius >= sw.maxRadius) {
        this.shockwaves.splice(i, 1);
      }
    }
  }

  renderStaticFrame() {
    if (!this.ctx) return;
    this.ctx.clearRect(0, 0, this.width, this.height);
    for (const s of this.stars) {
      this.ctx.save();
      this.ctx.globalAlpha = s.baseAlpha;
      this.ctx.fillStyle = this.theme === 'sakura' ? '#E87A9F' : s.tint;
      this.ctx.beginPath();
      this.ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    }
    // Render static ambient blossoms so flowers remain visible even in reduced-motion mode
    const staticBlooms = this.sakuraPetals.slice(0, 14);
    for (const p of staticBlooms) {
      this.ctx.save();
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate(p.angle);
      this.ctx.globalAlpha = p.opacity * 0.85;
      const pal = p.palette || FLOWER_PALETTE[0];
      if (p.flowerType === 'tulip' || p.flowerType === 'rose') {
        this.drawTulipFlower(this.ctx, p.size, pal.outer, pal.inner, pal.core, 1);
      } else {
        this.drawFivePetalFlower(this.ctx, p.size, pal.outer, pal.core, 1);
      }
      this.ctx.restore();
    }
  }

  /**
   * Draws a cupped 3-petal blooming Tulip blossom at origin (0,0) with smooth bloom progression.
   */
  drawTulipFlower(ctx, size, outerColor, innerColor, coreColor, bloomProgress = 1) {
    const bloom = Math.max(0.25, Math.min(1, bloomProgress));
    const s = size * (0.48 + 0.52 * bloom);
    const spread = 0.25 + 0.75 * bloom;

    // Short botanical green stem & calyx at base
    ctx.strokeStyle = '#588B68';
    ctx.lineWidth = Math.max(1.2, s * 0.14);
    ctx.beginPath();
    ctx.moveTo(0, s * 0.42);
    ctx.lineTo(0, s * 0.95);
    ctx.stroke();

    // Warm golden inner glow inside upper cup
    ctx.fillStyle = coreColor || '#FFD166';
    ctx.beginPath();
    ctx.arc(0, -s * 0.42, Math.max(1.1, s * 0.22), 0, Math.PI * 2);
    ctx.fill();

    // Left & Right outer cupped tulip petals
    ctx.fillStyle = outerColor;
    ctx.beginPath();
    ctx.moveTo(0, s * 0.45);
    ctx.bezierCurveTo(
      -s * 0.88 * spread,
      s * 0.35,
      -s * 0.95 * spread,
      -s * 0.45,
      -s * 0.48 * spread,
      -s * 0.9
    );
    ctx.bezierCurveTo(
      -s * 0.18 * spread,
      -s * 0.62,
      -s * 0.08,
      -s * 0.1,
      0,
      s * 0.45
    );
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(0, s * 0.45);
    ctx.bezierCurveTo(
      s * 0.88 * spread,
      s * 0.35,
      s * 0.95 * spread,
      -s * 0.45,
      s * 0.48 * spread,
      -s * 0.9
    );
    ctx.bezierCurveTo(
      s * 0.18 * spread,
      -s * 0.62,
      s * 0.08,
      -s * 0.1,
      0,
      s * 0.45
    );
    ctx.fill();

    // Center overlapping cupped tulip petal
    ctx.fillStyle = innerColor || outerColor;
    ctx.beginPath();
    ctx.moveTo(0, s * 0.46);
    ctx.bezierCurveTo(-s * 0.54, s * 0.3, -s * 0.5, -s * 0.54, 0, -s * 0.98);
    ctx.bezierCurveTo(s * 0.5, -s * 0.54, s * 0.54, s * 0.3, 0, s * 0.46);
    ctx.fill();
  }

  /**
   * Draws a 5-petal blooming sakura / spring blossom at origin (0,0) with bloom progression.
   */
  drawFivePetalFlower(ctx, size, outerColor, coreColor, bloomProgress = 1) {
    const bloom = Math.max(0.2, Math.min(1, bloomProgress));
    const effectiveSize = size * (0.35 + 0.65 * bloom);
    ctx.fillStyle = outerColor;
    for (let k = 0; k < 5; k++) {
      ctx.save();
      ctx.rotate((Math.PI * 2 * k) / 5 + (1 - bloom) * 0.35);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(
        -effectiveSize * 0.45 * bloom,
        -effectiveSize * 0.4,
        -effectiveSize * 0.52 * bloom,
        -effectiveSize * 1.05,
        0,
        -effectiveSize * 0.92
      );
      ctx.bezierCurveTo(
        effectiveSize * 0.52 * bloom,
        -effectiveSize * 1.05,
        effectiveSize * 0.45 * bloom,
        -effectiveSize * 0.4,
        0,
        0
      );
      ctx.fill();
      ctx.restore();
    }
    ctx.fillStyle = coreColor || '#FFD166';
    ctx.beginPath();
    ctx.arc(0, 0, Math.max(1.2, effectiveSize * 0.22), 0, Math.PI * 2);
    ctx.fill();
  }

  /**
   * Draws a layered blooming rosebud at origin (0,0) that unfurls with bloomProgress.
   */
  drawLayeredRose(ctx, size, outerColor, innerColor, coreColor, bloomProgress = 1) {
    const bloom = Math.max(0.2, Math.min(1, bloomProgress));
    const effectiveSize = size * (0.38 + 0.62 * bloom);
    ctx.fillStyle = outerColor;
    for (let k = 0; k < 6; k++) {
      ctx.save();
      ctx.rotate((Math.PI * 2 * k) / 6 + (1 - bloom) * 0.4);
      ctx.beginPath();
      ctx.arc(0, -effectiveSize * 0.36 * bloom, effectiveSize * 0.46, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
    ctx.fillStyle = innerColor || '#FFE5EC';
    for (let k = 0; k < 4; k++) {
      ctx.save();
      ctx.rotate((Math.PI * 2 * k) / 4 + 0.4 - (1 - bloom) * 0.3);
      ctx.beginPath();
      ctx.arc(0, -effectiveSize * 0.18 * bloom, effectiveSize * 0.3, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
    ctx.fillStyle = coreColor || '#FFD166';
    ctx.beginPath();
    ctx.arc(0, 0, Math.max(1.1, effectiveSize * 0.16), 0, Math.PI * 2);
    ctx.fill();
  }

  draw() {
    if (!this.ctx) return;
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.width, this.height);

    // 1. Stars
    for (const s of this.stars) {
      const twinkle = s.baseAlpha + Math.sin(s.phase) * 0.25;
      ctx.save();
      ctx.globalAlpha = Math.max(0.08, Math.min(0.95, twinkle));
      ctx.fillStyle = this.theme === 'sakura' ? '#E06C9F' : s.tint;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    // 2. Shooting stars
    for (const st of this.shootingStars) {
      ctx.save();
      ctx.globalAlpha = Math.max(0, st.alpha);
      const grad = ctx.createLinearGradient(
        st.x,
        st.y,
        st.x - st.vx * 10,
        st.y - st.vy * 10
      );
      grad.addColorStop(0, '#FFF5F7');
      grad.addColorStop(0.4, '#FFD166');
      grad.addColorStop(1, 'rgba(255, 209, 102, 0)');
      ctx.strokeStyle = grad;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(st.x, st.y);
      ctx.lineTo(st.x - st.vx * 9, st.y - st.vy * 9);
      ctx.stroke();
      ctx.restore();
    }

    // 3. Fireflies
    for (const f of this.fireflies) {
      const glowAlpha = 0.35 + (Math.sin(f.phase) + 1) * 0.28;
      ctx.save();
      ctx.globalAlpha = glowAlpha;
      const grad = ctx.createRadialGradient(f.x, f.y, 0.2, f.x, f.y, f.radius * 3.5);
      grad.addColorStop(0, f.color);
      grad.addColorStop(1, 'rgba(255, 209, 102, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(f.x, f.y, f.radius * 3.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    // 4. Multi-Flower Ambient Blooms (Tulips, 5-Petal Sakura & Petals)
    for (const p of this.sakuraPetals) {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);
      ctx.globalAlpha = p.opacity;

      const pal = p.palette || FLOWER_PALETTE[0];
      if (p.flowerType === 'tulip') {
        this.drawTulipFlower(ctx, p.size, pal.outer, pal.inner, pal.core, p.bloomProgress ?? 1);
      } else if (p.flowerType === 'sakura5') {
        this.drawFivePetalFlower(ctx, p.size, pal.outer, pal.core, p.bloomProgress ?? 1);
      } else if (p.flowerType === 'rose') {
        this.drawLayeredRose(ctx, p.size, pal.outer, pal.inner, pal.core, p.bloomProgress ?? 1);
      } else {
        ctx.fillStyle = this.theme === 'sakura' ? '#FF8FA3' : pal.outer;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(-p.size * 0.6, -p.size * 0.5, -p.size, p.size * 0.3, 0, p.size);
        ctx.bezierCurveTo(p.size, p.size * 0.3, p.size * 0.6, -p.size * 0.5, 0, 0);
        ctx.fill();
      }
      ctx.restore();
    }

    // 5. Rising Sky Lanterns with Wish Labels
    for (const l of this.skyLanterns) {
      ctx.save();
      ctx.translate(l.x, l.y);
      ctx.globalAlpha = Math.max(0, Math.min(1, l.alpha));

      const flicker = 1 + Math.sin(l.flickerPhase || 0) * 0.08;

      // Outer warm golden-peach aura
      if (typeof ctx.createRadialGradient === 'function') {
        const halo = ctx.createRadialGradient(0, 0, 1, 0, 0, l.size * 2.2 * flicker);
        if (halo && halo.addColorStop) {
          halo.addColorStop(0, 'rgba(255, 225, 140, 0.45)');
          halo.addColorStop(0.5, 'rgba(255, 170, 100, 0.16)');
          halo.addColorStop(1, 'rgba(255, 120, 120, 0)');
        }
        ctx.fillStyle = halo;
        ctx.beginPath();
        ctx.arc(0, 0, l.size * 2.2 * flicker, 0, Math.PI * 2);
        ctx.fill();
      }

      // Top suspension crown
      if (typeof ctx.fillRect === 'function') {
        ctx.fillStyle = 'rgba(255, 230, 160, 0.85)';
        ctx.fillRect(-l.size * 0.16, -l.size * 0.72, l.size * 0.32, l.size * 0.1);
      }

      // Lantern dome & tapered body with gradient
      let bodyFill = '#FFAE33';
      if (typeof ctx.createLinearGradient === 'function') {
        const bodyGrad = ctx.createLinearGradient(0, -l.size * 0.65, 0, l.size * 0.55);
        if (bodyGrad && bodyGrad.addColorStop) {
          bodyGrad.addColorStop(0, '#FFA876');
          bodyGrad.addColorStop(0.48, '#FFCD56');
          bodyGrad.addColorStop(1, '#FFF5C0');
          bodyFill = bodyGrad;
        }
      }
      ctx.fillStyle = bodyFill;
      ctx.beginPath();
      ctx.moveTo(-l.size * 0.34, -l.size * 0.62);
      ctx.bezierCurveTo(
        -l.size * 0.62,
        -l.size * 0.35,
        -l.size * 0.54,
        l.size * 0.25,
        -l.size * 0.30,
        l.size * 0.55
      );
      ctx.lineTo(l.size * 0.30, l.size * 0.55);
      ctx.bezierCurveTo(
        l.size * 0.54,
        l.size * 0.25,
        l.size * 0.62,
        -l.size * 0.35,
        l.size * 0.34,
        -l.size * 0.62
      );
      if (typeof ctx.closePath === 'function') ctx.closePath();
      ctx.fill();

      // Soft internal paper creases
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.32)';
      ctx.beginPath();
      ctx.moveTo(0, -l.size * 0.62);
      ctx.lineTo(0, l.size * 0.55);
      ctx.stroke();

      // Golden bottom rim
      if (typeof ctx.fillRect === 'function') {
        ctx.fillStyle = '#C27803';
        ctx.fillRect(-l.size * 0.32, l.size * 0.52, l.size * 0.64, l.size * 0.08);
      }

      // Inner candlelight flame (vivid golden-white)
      ctx.fillStyle = '#FFF3B0';
      ctx.beginPath();
      ctx.arc(0, l.size * 0.25, l.size * 0.22, 0, Math.PI * 2);
      ctx.fill();

      // Hanging cord
      ctx.strokeStyle = 'rgba(246, 189, 96, 0.75)';
      ctx.beginPath();
      ctx.moveTo(0, l.size * 0.6);
      ctx.lineTo(0, l.size * 0.85);
      ctx.stroke();

      // Wish label text beneath lantern inside a translucent glowing ribbon badge
      if (l.label && typeof ctx.fillText === 'function') {
        const textStr = String(l.label);
        ctx.font = '600 10.5px "Plus Jakarta Sans", sans-serif';
        const textWidth = ctx.measureText ? ctx.measureText(textStr).width : textStr.length * 6;
        const iconSize = 8;
        const padX = 7;
        const badgeW = textWidth + padX * 2 + iconSize + 3;
        const badgeH = 17;
        const badgeY = l.size * 0.88;

        // Ribbon tag pill
        ctx.fillStyle = this.theme === 'sakura' ? 'rgba(255, 240, 245, 0.90)' : 'rgba(25, 14, 38, 0.70)';
        ctx.strokeStyle = 'rgba(246, 189, 96, 0.55)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        const rx = -badgeW / 2;
        const ry = badgeY;
        if (typeof ctx.roundRect === 'function') {
          ctx.roundRect(rx, ry, badgeW, badgeH, 5);
        } else if (typeof ctx.rect === 'function') {
          ctx.rect(rx, ry, badgeW, badgeH);
        }
        ctx.fill();
        ctx.stroke();

        // Refined 4-point golden star sparkle vector (replaces OS emoji)
        const iconX = rx + padX + iconSize * 0.5;
        const iconY = ry + badgeH * 0.5;
        ctx.fillStyle = '#FFD166';
        if (typeof ctx.quadraticCurveTo === 'function') {
          ctx.beginPath();
          ctx.moveTo(iconX, iconY - 3.8);
          ctx.quadraticCurveTo(iconX, iconY, iconX + 3.8, iconY);
          ctx.quadraticCurveTo(iconX, iconY, iconX, iconY + 3.8);
          ctx.quadraticCurveTo(iconX, iconY, iconX - 3.8, iconY);
          ctx.quadraticCurveTo(iconX, iconY, iconX, iconY - 3.8);
          ctx.fill();
        } else if (typeof ctx.lineTo === 'function') {
          ctx.beginPath();
          ctx.moveTo(iconX, iconY - 4);
          ctx.lineTo(iconX + 1.2, iconY - 1.2);
          ctx.lineTo(iconX + 4, iconY);
          ctx.lineTo(iconX + 1.2, iconY + 1.2);
          ctx.lineTo(iconX, iconY + 4);
          ctx.lineTo(iconX - 1.2, iconY + 1.2);
          ctx.lineTo(iconX - 4, iconY);
          ctx.lineTo(iconX - 1.2, iconY - 1.2);
          if (typeof ctx.closePath === 'function') ctx.closePath();
          ctx.fill();
        }

        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = this.theme === 'sakura' ? '#240D1B' : '#FFF5F8';
        ctx.fillText(textStr, rx + padX + iconSize + 3, ry + badgeH * 0.5);
      }
      ctx.restore();
    }

    // 6. Celebration Burst Particles (Tulips, Flowers, Roses, Hearts & 4-Point Stars)
    for (const b of this.burstParticles) {
      ctx.save();
      ctx.translate(b.x, b.y);
      if (b.rotation) {
        ctx.rotate(b.rotation);
      }
      ctx.globalAlpha = Math.max(0, b.alpha);
      ctx.fillStyle = b.color;

      if (b.shape === 'tulip') {
        this.drawTulipFlower(
          ctx,
          b.size * 0.72,
          b.color,
          '#FFE5EC',
          '#FFD166',
          b.bloomProgress ?? 1
        );
      } else if (b.shape === 'flower') {
        this.drawFivePetalFlower(ctx, b.size * 0.72, b.color, '#FFD166', b.bloomProgress ?? 1);
      } else if (b.shape === 'rose') {
        this.drawLayeredRose(
          ctx,
          b.size * 0.68,
          b.color,
          '#FFE5EC',
          '#FFD166',
          b.bloomProgress ?? 1
        );
      } else if (b.shape === 'heart') {
        const s = b.size * 0.6;
        ctx.beginPath();
        ctx.moveTo(0, s * 0.4);
        ctx.bezierCurveTo(-s, -s * 0.5, -s * 1.8, s * 0.4, 0, s * 1.6);
        ctx.bezierCurveTo(s * 1.8, s * 0.4, s, -s * 0.5, 0, s * 0.4);
        ctx.fill();
      } else {
        const r = b.size * 0.72;
        const inner = r * 0.34;
        ctx.beginPath();
        ctx.moveTo(0, -r);
        ctx.lineTo(inner, -inner);
        ctx.lineTo(r, 0);
        ctx.lineTo(inner, inner);
        ctx.lineTo(0, r);
        ctx.lineTo(-inner, inner);
        ctx.lineTo(-r, 0);
        ctx.lineTo(-inner, -inner);
        ctx.lineTo(0, -r);
        ctx.fill();
      }
      ctx.restore();
    }

    // 7. Iridescent Fluttering Butterflies
    for (const bf of this.butterflies) {
      ctx.save();
      ctx.translate(bf.x, bf.y);
      const heading = Math.atan2(bf.vy, bf.vx) + Math.PI * 0.5;
      ctx.rotate(heading * 0.25);
      ctx.globalAlpha = Math.max(0, Math.min(1, bf.alpha));

      const wingSpread = 0.28 + Math.abs(Math.sin(bf.wingPhase)) * 0.72;
      const s = bf.size;

      // Upper wings
      ctx.save();
      ctx.scale(wingSpread, 1);
      ctx.fillStyle = bf.upperColor;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-s * 1.25, -s * 1.15, -s * 1.35, s * 0.15, 0, s * 0.1);
      ctx.bezierCurveTo(s * 1.35, s * 0.15, s * 1.25, -s * 1.15, 0, 0);
      ctx.fill();

      // Lower wings
      ctx.fillStyle = bf.lowerColor;
      ctx.beginPath();
      ctx.moveTo(0, s * 0.08);
      ctx.bezierCurveTo(-s * 0.95, s * 0.2, -s * 0.85, s * 1.05, 0, s * 0.52);
      ctx.bezierCurveTo(s * 0.85, s * 1.05, s * 0.95, s * 0.2, 0, s * 0.08);
      ctx.fill();
      ctx.restore();

      // Glowing butterfly body
      ctx.fillStyle = '#FFFBEB';
      ctx.beginPath();
      ctx.arc(0, 0, Math.max(1.1, s * 0.12), 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    // 8. Expanding Prismatic Shockwave Rings
    for (const sw of this.shockwaves) {
      ctx.save();
      ctx.globalAlpha = Math.max(0, sw.alpha);
      ctx.strokeStyle = sw.color;
      ctx.lineWidth = 2.2;
      ctx.beginPath();
      ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }
  }
}


// --- src/app.js ---




/**
 * Compresses an uploaded image File into a bounded data:image/jpeg base64 URL.
 * @param {File} file
 * @param {number} [maxDimension=960]
 * @param {number} [quality=0.82]
 * @returns {Promise<string>}
 */
function compressImageFile(file, maxDimension = 960, quality = 0.82) {
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
class BirthdayAppController {
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
    this.envelopeStage = 'peeking';
    const innerLetter = this.doc.getElementById('envelope-inner-letter');
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
    const envelopeScene = this.doc.getElementById('envelope-3d-scene');
    const innerLetter = this.doc.getElementById('envelope-inner-letter');

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
      envelopeScene.classList.remove('is-extracting');
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
   * Closes the stationery letter and folds the envelope back to its initial closed state.
   */
  closeEnvelopeAndLetter() {
    const envelopeScene = this.doc.getElementById('envelope-3d-scene');
    const innerLetter = this.doc.getElementById('envelope-inner-letter');
    if (envelopeScene && envelopeScene.classList) {
      envelopeScene.classList.remove('is-extracting', 'is-peeking', 'is-open', 'is-extracted');
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
    this.audio.playSparkleChime();
    this.showToast('✦ Đã cất lá thư vào trong phong bì');
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

})();
