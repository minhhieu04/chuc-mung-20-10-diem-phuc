/**
 * Default data, cheerful 20/10 landing page content, and validation helpers
 * for Diểm Phúc's 20/10 (Vietnamese Women's Day) Tulip gift landing page.
 */

export const LEGACY_STORAGE_KEY = 'pdp_womens_day_20_10_v1';
export const LEGACY_V2_STORAGE_KEY = 'dp_womens_day_20_10_v2';
export const LEGACY_V3_STORAGE_KEY = 'dp_womens_day_20_10_v3_gift';
export const LEGACY_V4_STORAGE_KEY = 'dp_womens_day_20_10_v4_landing';
export const STORAGE_KEY = 'dp_womens_day_20_10_v5_tulip';

export const USER_PROVIDED_PORTRAIT_URL =
  'https://photos.fife.usercontent.google.com/pw/AP1GczPmSQT5pcpBvdJ4J-gw2fLlNbn7BO6ozp5ha3M0laIXpd1ctXz_E4HjGA=w768-h1024-s-no-gm?authuser=0';

export const FALLBACK_PORTRAIT_URL = './assets/images/hero-portrait.jpg';

export const DEFAULT_CONFIG = {
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

export const FLOWER_BOUQUET_ITEMS = [
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

export const DEFAULT_GALLERY_MOMENTS = [];

export const PHOTO_STACK_ITEMS = [
  {
    id: 'photo-1',
    src: './assets/images/7924A3EF-9FF8-4DCE-9295-230FC520A5E9_1_105_c.jpeg',
    fallbackSrc: './assets/images/hero-portrait.jpg',
    title: 'Diểm Phúc',
    caption: 'Nụ cười dịu dàng của Emm tỏa sáng ngày 20/10',
    tag: '🌷 Nụ Cười Tỏa Nắng'
  },
  {
    id: 'photo-2',
    src: './assets/images/IMG_5937.JPG',
    fallbackSrc: './assets/images/hero-portrait.jpg',
    title: 'Rạng Rỡ & Duyên Dáng',
    caption: 'Chỉ cần một nụ cười nhẹ nhàng cũng đủ làm bừng sáng cả không gian',
    tag: '✨ Rạng Ngời'
  },
  {
    id: 'photo-3',
    src: './assets/images/IMG_2652.JPG',
    fallbackSrc: './assets/images/hero-portrait.jpg',
    title: 'Trong Trẻo & Đáng Yêu',
    caption: 'Nét dịu dàng, trong sáng tựa như những đóa hoa Tulip sớm mai',
    tag: '🌸 Dịu Dàng'
  },
  {
    id: 'photo-4',
    src: './assets/images/IMG_7101.JPG',
    fallbackSrc: './assets/images/hero-portrait.jpg',
    title: 'Thanh Xuân Rực Rỡ',
    caption: 'Mỗi khoảnh khắc của Emm đều mang lại nguồn năng lượng ấm áp và tích cực',
    tag: '💫 Tinh Khôi'
  },
  {
    id: 'photo-5',
    src: './assets/images/IMG_1660.jpg',
    fallbackSrc: './assets/images/hero-portrait.jpg',
    title: 'Bình Yên & Tươi Vui',
    caption: 'Chúc Emm luôn giữ mãi sự hồn nhiên, yêu đời và hạnh phúc mỗi ngày',
    tag: '☀️ Hạnh Phúc'
  },
  {
    id: 'photo-6',
    src: './assets/images/user-uploaded-diem-phuc.jpg',
    fallbackSrc: './assets/images/hero-portrait.jpg',
    title: 'Khoảnh Khắc Ngọt Ngào',
    caption: 'Món quà 20/10 chuẩn bị trọn vẹn sự trân trọng gửi tặng Diểm Phúc',
    tag: '💖 Yêu Thương'
  }
];

export const REASONS_LIST = [
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

export const DEFAULT_WISH_LANTERNS = [
  {
    id: 'lantern-1',
    text: 'Chúc Diểm Phúc ngày 20/10 luôn rạng rỡ như đóa hoa Tulip ban mai, bình an và ngập tràn tiếng cười!',
    author: 'Ông chú Viettel',
    createdAt: '2026-10-20T00:00:00.000Z'
  },
  {
    id: 'lantern-2',
    text: 'Mong mọi dự định và ước mơ phía trước của Emm đều thuận buồm xuôi gió, mỗi ngày trôi qua đều là một ngày vui.',
    author: 'Ông chú Viettel',
    createdAt: '2026-10-20T00:01:00.000Z'
  },
  {
    id: 'lantern-3',
    text: 'Chúc Emm một mùa lễ 20/10 thật ngọt ngào, luôn giữ mãi nét hồn nhiên, xinh đẹp và hạnh phúc mỗi ngày.',
    author: 'Ông chú Viettel',
    createdAt: '2026-10-20T00:02:00.000Z'
  },
  {
    id: 'lantern-4',
    text: 'Gửi ngàn lời chúc tốt đẹp nhất đến Diểm Phúc — mong bình yên, may mắn và niềm vui luôn đồng hành trên mọi chặng đường.',
    author: 'Ông chú Viettel',
    createdAt: '2026-10-20T00:03:00.000Z'
  },
  {
    id: 'lantern-5',
    text: 'Chúc Emm luôn được yêu thương, trân trọng và nâng niu như những đóa hoa Tulip tươi thắm nhất ngày 20/10.',
    author: 'Ông chú Viettel',
    createdAt: '2026-10-20T00:04:00.000Z'
  },
  {
    id: 'lantern-6',
    text: 'Mong rằng hôm nay và cả những ngày sau, nụ cười tỏa nắng của Emm sẽ luôn nở trên môi thật rạng ngời.',
    author: 'Ông chú Viettel',
    createdAt: '2026-10-20T00:05:00.000Z'
  },
  {
    id: 'lantern-7',
    text: 'Chúc mọi điều ước đẹp đẽ nhất mà Diểm Phúc ấp ủ trong lòng đều sớm nở hoa và trở thành hiện thực!',
    author: 'Ông chú Viettel',
    createdAt: '2026-10-20T00:06:00.000Z'
  },
  {
    id: 'lantern-8',
    text: 'Cảm ơn Emm vì đã luôn mang đến nguồn năng lượng dịu dàng và ấm áp. Chúc mừng ngày Phụ nữ Việt Nam 20/10!',
    author: 'Ông chú Viettel',
    createdAt: '2026-10-20T00:07:00.000Z'
  }
];

export const PRESET_WISH_SUGGESTIONS = [
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
export function escapeHtml(input) {
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
export function isValidImageSrc(url) {
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
export function sanitizeText(value, fallback = '', maxLength = 500) {
  if (typeof value !== 'string') return fallback;
  const cleaned = value.trim();
  if (!cleaned) return fallback;
  return cleaned.slice(0, maxLength);
}
