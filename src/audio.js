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
export const HAPPY_BIRTHDAY_MELODY = [
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
export const STARLIGHT_WALTZ_MELODY = [
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
export const ROSE_WALTZ_MELODY = [
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
export const MOONLIGHT_SERENADE_MELODY = [
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
export const SPRING_FLOWER_MELODY = [
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
export const ROMANTIC_PLAYLIST = [
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

export class RomanticAudioEngine {
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
    if (this.isPlaying) {
      if (this.timerId) clearTimeout(this.timerId);
      if (this.audioElement && typeof this.audioElement.pause === 'function') {
        try {
          this.audioElement.pause();
        } catch {}
      }
      this.scheduleNextNote();
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
