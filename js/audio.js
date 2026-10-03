/**
 * SISTEMA DE SONIDO CON WEB AUDIO API
 * Genera tonos armónicos suaves sin necesidad de cargar ficheros externos.
 */
const AudioFx = {
  ctx: null,

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  },

  playTone(freq, type = 'sine', duration = 0.2, gainPeak = 0.15) {
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(gainPeak, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      console.warn("Audio play error:", e);
    }
  },

  correct() {
    this.playTone(523.25, 'triangle', 0.15, 0.2); // Do5
    setTimeout(() => this.playTone(659.25, 'triangle', 0.22, 0.2), 110); // Mi5
  },

  wrong() {
    this.playTone(220, 'sawtooth', 0.22, 0.1);
  },

  successRound() {
    const notas = [523.25, 659.25, 783.99, 1046.50]; // Do - Mi - Sol - Do agudo
    notas.forEach((freq, idx) => {
      setTimeout(() => this.playTone(freq, 'sine', 0.35, 0.22), idx * 110);
    });
  },

  star() {
    this.playTone(880, 'sine', 0.1, 0.15); // La5
    setTimeout(() => this.playTone(1174.66, 'sine', 0.2, 0.2), 80); // Re6
  },

  medalUnlock() {
    const fanfare = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98];
    fanfare.forEach((freq, idx) => {
      setTimeout(() => this.playTone(freq, 'triangle', 0.4, 0.25), idx * 100);
    });
  }
};
