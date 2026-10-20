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

export const LANTERN_WISH_POOL = [
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

export class RomanticParticleEngine {
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
  }
}
