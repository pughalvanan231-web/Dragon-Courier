/**
 * POTION MIXER 2D GAME – CORE LOGIC (script.js)
 * Game ID: G0427
 * Genre: 2D Puzzle / Alchemy Game
 * Technologies: Vanilla JavaScript, Web Audio API, Canvas 2D VFX, LocalStorage
 */

// ============================================================================
// 1. DATA STRUCTURES: INGREDIENTS & RECIPES
// ============================================================================

const INGREDIENTS = {
  'red-mushroom': {
    id: 'red-mushroom',
    name: 'Red Mushroom',
    tag: 'Fungal Catalyst',
    color: '#ef4444',
    liquidColor: '#dc2626',
    glowColor: 'rgba(239, 68, 68, 0.45)',
    svg: `<svg viewBox="0 0 64 64" fill="none" class="ingredient-icon-svg" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="32" cy="52" rx="10" ry="5" fill="#fef08a" opacity="0.6"/>
      <path d="M26 34 L25 50 Q32 54 39 50 L38 34 Z" fill="#fef08a" stroke="#ca8a04" stroke-width="2"/>
      <path d="M12 36 C10 18, 54 18, 52 36 C45 40, 19 40, 12 36 Z" fill="#dc2626" stroke="#991b1b" stroke-width="2.5"/>
      <circle cx="24" cy="28" r="3.5" fill="#ffffff" opacity="0.9"/>
      <circle cx="40" cy="27" r="4" fill="#ffffff" opacity="0.9"/>
      <circle cx="32" cy="22" r="3" fill="#ffffff" opacity="0.9"/>
      <circle cx="18" cy="34" r="2" fill="#ffffff" opacity="0.8"/>
      <circle cx="46" cy="33" r="2.5" fill="#ffffff" opacity="0.8"/>
    </svg>`
  },
  'blue-crystal': {
    id: 'blue-crystal',
    name: 'Blue Crystal',
    tag: 'Arcane Focus',
    color: '#38bdf8',
    liquidColor: '#0284c7',
    glowColor: 'rgba(56, 189, 248, 0.5)',
    svg: `<svg viewBox="0 0 64 64" fill="none" class="ingredient-icon-svg" xmlns="http://www.w3.org/2000/svg">
      <polygon points="32,8 44,24 38,54 32,58 26,54 20,24" fill="#0284c7" stroke="#38bdf8" stroke-width="2"/>
      <polygon points="32,8 38,24 32,58 26,24" fill="#38bdf8" opacity="0.9"/>
      <polygon points="32,8 44,24 38,24" fill="#bae6fd" opacity="0.8"/>
      <polygon points="44,24 52,36 46,50 38,54" fill="#0369a1" stroke="#38bdf8" stroke-width="1.5"/>
      <polygon points="20,24 12,36 18,50 26,54" fill="#075985" stroke="#38bdf8" stroke-width="1.5"/>
      <circle cx="32" cy="20" r="1.5" fill="#ffffff"/>
    </svg>`
  },
  'moonwater': {
    id: 'moonwater',
    name: 'Moonwater',
    tag: 'Celestial Solvent',
    color: '#93c5fd',
    liquidColor: '#60a5fa',
    glowColor: 'rgba(147, 197, 253, 0.5)',
    svg: `<svg viewBox="0 0 64 64" fill="none" class="ingredient-icon-svg" xmlns="http://www.w3.org/2000/svg">
      <path d="M32 10 C32 10, 48 30, 48 42 C48 51, 40.8 56, 32 56 C23.2 56, 16 51, 16 42 C16 30, 32 10, 32 10 Z" fill="#60a5fa" stroke="#3b82f6" stroke-width="2.5"/>
      <!-- Crescent reflection inside drop -->
      <path d="M30 24 C36 26, 40 32, 38 40 C34 40, 26 34, 30 24 Z" fill="#bfdbfe" opacity="0.8"/>
      <circle cx="26" cy="46" r="3" fill="#ffffff" opacity="0.75"/>
      <circle cx="36" cy="48" r="1.8" fill="#ffffff" opacity="0.6"/>
    </svg>`
  },
  'fire-flower': {
    id: 'fire-flower',
    name: 'Fire Flower',
    tag: 'Solar Blossom',
    color: '#f97316',
    liquidColor: '#ea580c',
    glowColor: 'rgba(249, 115, 22, 0.5)',
    svg: `<svg viewBox="0 0 64 64" fill="none" class="ingredient-icon-svg" xmlns="http://www.w3.org/2000/svg">
      <path d="M32 38 Q32 56 30 58 Q34 56 32 38" stroke="#16a34a" stroke-width="3" stroke-linecap="round"/>
      <!-- Petals -->
      <path d="M32 12 C38 20, 44 22, 48 18 C46 26, 48 32, 42 36 C36 38, 28 38, 22 36 C16 32, 18 26, 16 18 C20 22, 26 20, 32 12 Z" fill="#ea580c" stroke="#c2410c" stroke-width="2"/>
      <path d="M32 16 C36 23, 40 25, 42 22 C41 28, 40 32, 32 34 C24 32, 23 28, 22 22 C24 25, 28 23, 32 16 Z" fill="#facc15"/>
      <circle cx="32" cy="27" r="4" fill="#ffffff"/>
    </svg>`
  },
  'dragon-scale': {
    id: 'dragon-scale',
    name: 'Dragon Scale',
    tag: 'Wyrm Armor',
    color: '#10b981',
    liquidColor: '#059669',
    glowColor: 'rgba(16, 185, 129, 0.5)',
    svg: `<svg viewBox="0 0 64 64" fill="none" class="ingredient-icon-svg" xmlns="http://www.w3.org/2000/svg">
      <path d="M32 10 C46 12, 52 26, 48 42 C44 54, 32 58, 32 58 C32 58, 20 54, 16 42 C12 26, 18 12, 32 10 Z" fill="#059669" stroke="#34d399" stroke-width="2.5"/>
      <!-- Scale texture ridges -->
      <path d="M32 18 L32 52" stroke="#6ee7b7" stroke-width="2" stroke-linecap="round"/>
      <path d="M24 26 C28 30, 36 30, 40 26" stroke="#34d399" stroke-width="2" fill="none"/>
      <path d="M22 36 C27 40, 37 40, 42 36" stroke="#34d399" stroke-width="2" fill="none"/>
      <path d="M24 45 C28 48, 36 48, 40 45" stroke="#34d399" stroke-width="1.8" fill="none"/>
    </svg>`
  },
  'golden-herb': {
    id: 'golden-herb',
    name: 'Golden Herb',
    tag: 'Purified Leaf',
    color: '#eab308',
    liquidColor: '#ca8a04',
    glowColor: 'rgba(234, 179, 8, 0.5)',
    svg: `<svg viewBox="0 0 64 64" fill="none" class="ingredient-icon-svg" xmlns="http://www.w3.org/2000/svg">
      <path d="M32 54 C32 40, 32 20, 32 10" stroke="#ca8a04" stroke-width="2.5" stroke-linecap="round"/>
      <!-- Golden leaves -->
      <path d="M32 20 C42 16, 48 24, 32 30 C16 24, 22 16, 32 20 Z" fill="#facc15" stroke="#eab308" stroke-width="1.8"/>
      <path d="M32 32 C46 28, 50 38, 32 42 C14 38, 18 28, 32 32 Z" fill="#facc15" stroke="#eab308" stroke-width="1.8"/>
      <!-- Sparkling sheen -->
      <circle cx="32" cy="12" r="2.5" fill="#fef08a"/>
      <path d="M28 24 L36 26" stroke="#fef9c3" stroke-width="1.5"/>
      <path d="M27 36 L37 38" stroke="#fef9c3" stroke-width="1.5"/>
    </svg>`
  },
  'shadow-berry': {
    id: 'shadow-berry',
    name: 'Shadow Berry',
    tag: 'Void Fruit',
    color: '#a855f7',
    liquidColor: '#7e22ce',
    glowColor: 'rgba(168, 85, 247, 0.5)',
    svg: `<svg viewBox="0 0 64 64" fill="none" class="ingredient-icon-svg" xmlns="http://www.w3.org/2000/svg">
      <!-- Stem -->
      <path d="M32 14 C32 18, 30 22, 28 26" stroke="#65a30d" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M32 18 Q38 16 42 20" stroke="#65a30d" stroke-width="2" stroke-linecap="round"/>
      <!-- Berries -->
      <circle cx="26" cy="38" r="11" fill="#581c87" stroke="#a855f7" stroke-width="2"/>
      <circle cx="39" cy="36" r="10" fill="#6b21a8" stroke="#c084fc" stroke-width="2"/>
      <circle cx="32" cy="46" r="9" fill="#3b0764" stroke="#9333ea" stroke-width="2"/>
      <!-- Sheen highlights -->
      <circle cx="23" cy="35" r="2.5" fill="#e9d5ff" opacity="0.8"/>
      <circle cx="41" cy="33" r="2.5" fill="#f3e8ff" opacity="0.8"/>
      <circle cx="30" cy="44" r="2" fill="#e9d5ff" opacity="0.8"/>
    </svg>`
  },
  'crystal-dust': {
    id: 'crystal-dust',
    name: 'Crystal Dust',
    tag: 'Shimmering Powder',
    color: '#e0e7ff',
    liquidColor: '#c7d2fe',
    glowColor: 'rgba(224, 231, 255, 0.6)',
    svg: `<svg viewBox="0 0 64 64" fill="none" class="ingredient-icon-svg" xmlns="http://www.w3.org/2000/svg">
      <!-- Pouch / Pile -->
      <path d="M16 48 Q32 36 48 48 Q40 56 24 56 Z" fill="#4338ca" stroke="#818cf8" stroke-width="2"/>
      <!-- Stardust Sparkles -->
      <polygon points="32,12 34,22 44,24 34,26 32,36 30,26 20,24 30,22" fill="#ffffff"/>
      <polygon points="18,26 19,32 25,33 19,34 18,40 17,34 11,33 17,32" fill="#c7d2fe"/>
      <polygon points="46,28 47,33 52,34 47,35 46,40 45,35 40,34 45,33" fill="#e0e7ff"/>
      <circle cx="32" cy="44" r="1.5" fill="#ffffff"/>
      <circle cx="25" cy="46" r="1.2" fill="#ffffff"/>
      <circle cx="39" cy="45" r="1.2" fill="#ffffff"/>
    </svg>`
  }
};

// 10 Progressively Challenging Levels strictly following the prompt definitions
const LEVELS = [
  {
    level: 1,
    name: 'Healing Potion',
    desc: 'A restorative crimson draught that mends wounds and revitalizes the soul.',
    targetColor: '#e11d48',
    liquidGradient: ['#f43f5e', '#e11d48', '#9f1239'],
    bottleShape: 'round',
    recipe: ['red-mushroom', 'moonwater', 'crystal-dust'],
    hint: 'Start with the Red Mushroom, dissolve in Moonwater, and bind with Crystal Dust.'
  },
  {
    level: 2,
    name: 'Mana Potion',
    desc: 'An azure essence that replenishes raw spiritual energy and magical focus.',
    targetColor: '#0284c7',
    liquidGradient: ['#38bdf8', '#0284c7', '#1e40af'],
    bottleShape: 'flask',
    recipe: ['blue-crystal', 'golden-herb', 'moonwater'],
    hint: 'Crush the Blue Crystal first, blend with Golden Herb, and stabilize with Moonwater.'
  },
  {
    level: 3,
    name: 'Fire Resistance Potion',
    desc: 'Grants immunity against scorching infernos, lava heat, and dragonfire.',
    targetColor: '#ea580c',
    liquidGradient: ['#fb923c', '#ea580c', '#c2410c'],
    bottleShape: 'diamond',
    recipe: ['fire-flower', 'dragon-scale', 'moonwater'],
    hint: 'Ignite with Fire Flower, temper using tough Dragon Scale, then cool with Moonwater.'
  },
  {
    level: 4,
    name: 'Strength Potion',
    desc: 'Surges the drinker muscles with raw titanic power and relentless stamina.',
    targetColor: '#b45309',
    liquidGradient: ['#f59e0b', '#d97706', '#92400e'],
    bottleShape: 'stout',
    recipe: ['red-mushroom', 'dragon-scale', 'golden-herb'],
    hint: 'Infuse Red Mushroom, reinforce with Dragon Scale, and empower with Golden Herb.'
  },
  {
    level: 5,
    name: 'Shadow Potion',
    desc: 'Envelops the user in midnight mists, allowing silent stealth through darkness.',
    targetColor: '#7c3aed',
    liquidGradient: ['#c084fc', '#7c3aed', '#4c1d95'],
    bottleShape: 'urn',
    recipe: ['shadow-berry', 'blue-crystal', 'crystal-dust'],
    hint: 'Extract the Shadow Berry, crystallize with Blue Crystal, and scatter Crystal Dust.'
  },
  {
    level: 6,
    name: 'Golden Luck Potion',
    desc: 'Bends the strings of serendipity, bringing rare treasures and favorable destiny.',
    targetColor: '#eab308',
    liquidGradient: ['#fef08a', '#eab308', '#a16207'],
    bottleShape: 'round',
    recipe: ['golden-herb', 'moonwater', 'crystal-dust'],
    hint: 'Harvest the Golden Herb, dilute into Moonwater, then bless with Crystal Dust.'
  },
  {
    level: 7,
    name: 'Dragon Breath Potion',
    desc: 'Enables the drinker to exhale searing blasts of mythical draconic fire.',
    targetColor: '#dc2626',
    liquidGradient: ['#f87171', '#dc2626', '#7f1d1d'],
    bottleShape: 'flask',
    recipe: ['fire-flower', 'dragon-scale', 'red-mushroom'],
    hint: 'Spark the Fire Flower, melt down the Dragon Scale, and react with Red Mushroom.'
  },
  {
    level: 8,
    name: 'Night Vision Potion',
    desc: 'Sharpens eyesight to pierce through absolute abyssal darkness with clarity.',
    targetColor: '#2563eb',
    liquidGradient: ['#60a5fa', '#2563eb', '#1e3a8a'],
    bottleShape: 'diamond',
    recipe: ['shadow-berry', 'moonwater', 'blue-crystal'],
    hint: 'Steep Shadow Berry into Moonwater, then focus the sight with Blue Crystal.'
  },
  {
    level: 9,
    name: 'Crystal Shield Potion',
    desc: 'Forms an impervious barrier of shimmering crystalline aegis around the bearer.',
    targetColor: '#06b6d4',
    liquidGradient: ['#67e8f9', '#06b6d4', '#0e7490'],
    bottleShape: 'stout',
    recipe: ['blue-crystal', 'dragon-scale', 'crystal-dust'],
    hint: 'Weave Blue Crystal together with Dragon Scale, and seal with Crystal Dust.'
  },
  {
    level: 10,
    name: 'Ultimate Elixir',
    desc: 'The magnum opus of alchemy! Grants immortality, total vitality, and divine insight.',
    targetColor: '#f43f5e',
    liquidGradient: ['#fb7185', '#a855f7', '#38bdf8'],
    bottleShape: 'urn',
    recipe: ['golden-herb', 'fire-flower', 'blue-crystal', 'crystal-dust'],
    hint: 'Order of 4 legendary elements: Golden Herb ➔ Fire Flower ➔ Blue Crystal ➔ Crystal Dust.'
  }
];

// ============================================================================
// 2. AUDIO SYNTHESIZER (WEB AUDIO API)
// ============================================================================

class SoundFX {
  constructor() {
    this.ctx = null;
    this.enabled = true;
    this.initFromStorage();
  }

  initFromStorage() {
    const saved = localStorage.getItem('potion_mixer_sound_enabled');
    if (saved !== null) {
      this.enabled = saved === 'true';
    }
  }

  toggle() {
    this.enabled = !this.enabled;
    localStorage.setItem('potion_mixer_sound_enabled', this.enabled);
    if (this.enabled) {
      this.playTone(523.25, 0.1, 'sine');
    }
    return this.enabled;
  }

  ensureContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playTone(freq, duration, type = 'sine', gainVal = 0.15) {
    if (!this.enabled) return;
    try {
      this.ensureContext();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      console.warn('Audio playback error', e);
    }
  }

  playClick() {
    this.playTone(600, 0.08, 'triangle', 0.12);
  }

  playAdd() {
    if (!this.enabled) return;
    try {
      this.ensureContext();
      if (!this.ctx) return;
      // Bubble / drop sound: frequency sweeping up quickly
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(280, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(750, this.ctx.currentTime + 0.15);

      gain.gain.setValueAtTime(0.18, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.18);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.18);
    } catch (e) {}
  }

  playUndo() {
    this.playTone(320, 0.12, 'sawtooth', 0.08);
  }

  playClear() {
    if (!this.enabled) return;
    try {
      this.ensureContext();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(450, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(150, this.ctx.currentTime + 0.2);

      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.2);
    } catch (e) {}
  }

  playBrewing() {
    if (!this.enabled) return;
    try {
      this.ensureContext();
      if (!this.ctx) return;
      // Swirling bubbling chord
      const freqs = [220, 330, 440, 550];
      freqs.forEach((f, i) => {
        setTimeout(() => {
          this.playTone(f * 1.2, 0.25, 'sine', 0.1);
        }, i * 90);
      });
    } catch (e) {}
  }

  playSuccess() {
    if (!this.enabled) return;
    try {
      this.ensureContext();
      if (!this.ctx) return;
      // Joyful arpeggio: C5 -> E5 -> G5 -> C6
      const notes = [523.25, 659.25, 783.99, 1046.5];
      notes.forEach((freq, idx) => {
        setTimeout(() => {
          this.playTone(freq, 0.35, 'triangle', 0.2);
        }, idx * 110);
      });
    } catch (e) {}
  }

  playFailure() {
    if (!this.enabled) return;
    try {
      this.ensureContext();
      if (!this.ctx) return;
      // Dissonant fizzle
      const notes = [260, 245, 230];
      notes.forEach((freq, idx) => {
        setTimeout(() => {
          this.playTone(freq, 0.2, 'sawtooth', 0.12);
        }, idx * 120);
      });
    } catch (e) {}
  }

  playHint() {
    if (!this.enabled) return;
    try {
      this.ensureContext();
      if (!this.ctx) return;
      const notes = [880, 1174.66];
      notes.forEach((freq, idx) => {
        setTimeout(() => {
          this.playTone(freq, 0.25, 'sine', 0.14);
        }, idx * 90);
      });
    } catch (e) {}
  }

  playGrandVictory() {
    if (!this.enabled) return;
    try {
      this.ensureContext();
      if (!this.ctx) return;
      const fanfare = [523.25, 659.25, 783.99, 1046.5, 1318.51];
      fanfare.forEach((freq, idx) => {
        setTimeout(() => {
          this.playTone(freq, 0.5, 'sine', 0.22);
        }, idx * 140);
      });
    } catch (e) {}
  }
}

const audio = new SoundFX();

// ============================================================================
// 3. CANVAS PARTICLE SYSTEM (AMBIENT & VFX)
// ============================================================================

class ParticleSystem {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.bursts = [];
    this.resize();

    window.addEventListener('resize', () => this.resize());
    this.initAmbientParticles(45);
    this.loop();
  }

  resize() {
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
  }

  initAmbientParticles(count) {
    this.particles = [];
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        r: Math.random() * 2.5 + 0.8,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -Math.random() * 0.6 - 0.2,
        color: ['#c084fc', '#38bdf8', '#f472b6', '#a78bfa', '#fef08a'][Math.floor(Math.random() * 5)],
        alpha: Math.random() * 0.6 + 0.2,
        pulseSpeed: Math.random() * 0.02 + 0.01
      });
    }
  }

  burst(x, y, count = 35, colors = ['#f59e0b', '#10b981', '#38bdf8', '#ffffff']) {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 5 + 1.5;
      this.bursts.push({
        x: x || this.width / 2,
        y: y || this.height / 2,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1.5,
        r: Math.random() * 4 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 1.0,
        decay: Math.random() * 0.025 + 0.015,
        gravity: 0.12
      });
    }
  }

  smokePuff(x, y, count = 25) {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 3 + 0.5;
      this.bursts.push({
        x: x || this.width / 2,
        y: y || this.height / 2,
        vx: Math.cos(angle) * speed,
        vy: -Math.random() * 2.5 - 0.5,
        r: Math.random() * 8 + 4,
        color: ['#475569', '#334155', '#1e293b', '#64748b'][Math.floor(Math.random() * 4)],
        life: 1.0,
        decay: Math.random() * 0.03 + 0.02,
        gravity: -0.04
      });
    }
  }

  loop() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    // Render ambient floating particles
    for (const p of this.particles) {
      p.x += p.vx;
      p.y += p.vy;
      p.alpha += Math.sin(Date.now() * p.pulseSpeed) * 0.01;

      if (p.y < -10) {
        p.y = this.height + 10;
        p.x = Math.random() * this.width;
      }
      if (p.x < -10) p.x = this.width + 10;
      if (p.x > this.width + 10) p.x = -10;

      this.ctx.save();
      this.ctx.globalAlpha = Math.max(0.1, Math.min(0.85, p.alpha));
      this.ctx.fillStyle = p.color;
      this.ctx.shadowBlur = 10;
      this.ctx.shadowColor = p.color;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    }

    // Render transient bursts (sparkles / smoke)
    for (let i = this.bursts.length - 1; i >= 0; i--) {
      const b = this.bursts[i];
      b.x += b.vx;
      b.y += b.vy;
      b.vy += b.gravity;
      b.life -= b.decay;

      if (b.life <= 0) {
        this.bursts.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.globalAlpha = b.life;
      this.ctx.fillStyle = b.color;
      this.ctx.shadowBlur = 12;
      this.ctx.shadowColor = b.color;
      this.ctx.beginPath();
      this.ctx.arc(b.x, b.y, b.r * b.life, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    }

    requestAnimationFrame(() => this.loop());
  }
}

// ============================================================================
// 4. POTION BOTTLE SVG GENERATOR
// ============================================================================

function generatePotionBottleSVG(shape, liquidGradient, targetColor) {
  const gId = 'pot-grad-' + Math.random().toString(36).substring(2, 9);
  const gradStops = `
    <stop offset="0%" stop-color="${liquidGradient[0]}" />
    <stop offset="50%" stop-color="${liquidGradient[1]}" />
    <stop offset="100%" stop-color="${liquidGradient[2]}" />
  `;

  let bottlePath = '';
  let liquidPath = '';
  let corkPath = '';

  switch (shape) {
    case 'flask':
      // Erlenmeyer / Triangle flask
      bottlePath = `<path d="M42 22 L42 36 L16 88 C12 96, 20 106, 30 106 L70 106 C80 106, 88 96, 84 88 L58 36 L58 22 Z" fill="none" stroke="#94a3b8" stroke-width="3"/>`;
      liquidPath = `<path d="M44 48 L22 92 C19 98, 24 104, 32 104 L68 104 C76 104, 81 98, 78 92 L56 48 Z" fill="url(#${gId})"/>`;
      corkPath = `<rect x="43" y="14" width="14" height="8" rx="2" fill="#b45309" stroke="#78350f" stroke-width="1.5"/>`;
      break;

    case 'diamond':
      // Diamond shaped bottle
      bottlePath = `<path d="M43 22 L43 32 L20 62 L50 104 L80 62 L57 32 L57 22 Z" fill="none" stroke="#94a3b8" stroke-width="3"/>`;
      liquidPath = `<path d="M45 42 L24 62 L50 100 L76 62 L55 42 Z" fill="url(#${gId})"/>`;
      corkPath = `<circle cx="50" cy="16" r="6" fill="#38bdf8" stroke="#0284c7" stroke-width="1.5"/>`;
      break;

    case 'stout':
      // Heavy square / apothecary decanter
      bottlePath = `<path d="M41 20 L41 32 C35 32, 22 40, 22 50 L22 98 C22 104, 28 106, 34 106 L66 106 C72 106, 78 104, 78 98 L78 50 C78 40, 65 32, 59 32 L59 20 Z" fill="none" stroke="#94a3b8" stroke-width="3"/>`;
      liquidPath = `<path d="M25 54 L25 98 C25 102, 29 104, 34 104 L66 104 C71 104, 75 102, 75 98 L75 54 Q50 50 25 54 Z" fill="url(#${gId})"/>`;
      corkPath = `<polygon points="43,20 57,20 54,12 46,12" fill="#d97706" stroke="#92400e" stroke-width="1.5"/>`;
      break;

    case 'urn':
      // Ornate amphora with side ring handles
      bottlePath = `
        <path d="M43 20 L43 30 C30 38, 20 55, 20 75 C20 95, 32 106, 50 106 C68 106, 80 95, 80 75 C80 55, 70 38, 57 30 L57 20 Z" fill="none" stroke="#94a3b8" stroke-width="3"/>
        <path d="M20 50 Q10 60 20 72" fill="none" stroke="#64748b" stroke-width="2.5"/>
        <path d="M80 50 Q90 60 80 72" fill="none" stroke="#64748b" stroke-width="2.5"/>
      `;
      liquidPath = `<path d="M23 60 C23 85, 32 103, 50 103 C68 103, 77 85, 77 60 Q50 54 23 60 Z" fill="url(#${gId})"/>`;
      corkPath = `<circle cx="50" cy="14" r="7" fill="#fbbf24" stroke="#d97706" stroke-width="1.5"/>`;
      break;

    case 'round':
    default:
      // Classic spherical round bottom flask
      bottlePath = `<path d="M44 20 L44 38 C32 46, 22 62, 22 78 C22 96, 35 106, 50 106 C65 106, 78 96, 78 78 C78 62, 68 46, 56 38 L56 20 Z" fill="none" stroke="#94a3b8" stroke-width="3"/>`;
      liquidPath = `<path d="M25 64 C25 88, 36 103, 50 103 C64 103, 75 88, 75 64 Q50 58 25 64 Z" fill="url(#${gId})"/>`;
      corkPath = `<rect x="44" y="13" width="12" height="8" rx="2" fill="#b45309" stroke="#78350f" stroke-width="1.5"/>`;
      break;
  }

  return `
    <svg viewBox="0 0 100 120" fill="none" class="bottle-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="${gId}" x1="0%" y1="0%" x2="0%" y2="100%">
          ${gradStops}
        </linearGradient>
      </defs>
      <!-- Glass Shadow Backing -->
      <path d="M45 22 L55 22" stroke="#cbd5e1" stroke-width="4" stroke-linecap="round"/>
      ${corkPath}
      ${liquidPath}
      ${bottlePath}
      <!-- Glass Specular Highlight -->
      <path d="M30 60 C28 72, 33 88, 42 96" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" opacity="0.6"/>
      <circle cx="36" cy="52" r="2" fill="#ffffff" opacity="0.8"/>
    </svg>
  `;
}

// ============================================================================
// 5. GAME CONTROLLER & STATE
// ============================================================================

class PotionMixerGame {
  constructor() {
    this.currentLevelIndex = 0;
    this.currentRecipe = [];
    this.score = 0;
    this.bestScore = 0;
    this.hintUsedThisLevel = false;
    this.levelCompleted = false;
    this.isBrewing = false;

    this.particles = new ParticleSystem('ambient-canvas');

    this.loadState();
    this.bindDOM();
    this.renderShelf();
    this.updateAudioButtonsUI();
  }

  loadState() {
    const savedBest = localStorage.getItem('potion_mixer_best_score');
    this.bestScore = savedBest ? parseInt(savedBest, 10) : 0;
  }

  saveBestScore() {
    if (this.score > this.bestScore) {
      this.bestScore = this.score;
      localStorage.setItem('potion_mixer_best_score', this.bestScore.toString());
    }
  }

  bindDOM() {
    // Screens
    this.screenMenu = document.getElementById('screen-menu');
    this.screenGameplay = document.getElementById('screen-gameplay');

    // Modals
    this.modalHowToPlay = document.getElementById('modal-how-to-play');
    this.modalLevelSuccess = document.getElementById('modal-level-success');
    this.modalGameComplete = document.getElementById('modal-game-complete');

    // Menu Buttons
    document.getElementById('btn-play-game').addEventListener('click', () => {
      audio.playClick();
      this.startGame();
    });

    document.getElementById('btn-how-to-play').addEventListener('click', () => {
      audio.playClick();
      this.openHowToPlay();
    });

    document.getElementById('btn-close-how-to-play').addEventListener('click', () => {
      audio.playClick();
      this.closeHowToPlay();
    });
    document.getElementById('btn-close-how-to-play-footer').addEventListener('click', () => {
      audio.playClick();
      this.closeHowToPlay();
    });

    // Sound toggle buttons
    const handleSoundToggle = () => {
      const isEnabled = audio.toggle();
      this.updateAudioButtonsUI(isEnabled);
    };

    document.getElementById('global-sound-btn').addEventListener('click', handleSoundToggle);
    document.getElementById('btn-menu-sound').addEventListener('click', handleSoundToggle);

    // Gameplay Navigation
    document.getElementById('btn-return-menu').addEventListener('click', () => {
      audio.playClick();
      this.returnToMenu();
    });

    document.getElementById('btn-restart-level').addEventListener('click', () => {
      audio.playClear();
      this.restartLevel();
    });

    // Cauldron Actions
    document.getElementById('btn-undo-ingredient').addEventListener('click', () => {
      this.undoLastIngredient();
    });

    document.getElementById('btn-clear-recipe').addEventListener('click', () => {
      this.clearRecipe();
    });

    document.getElementById('btn-brew-potion').addEventListener('click', () => {
      this.brewPotion();
    });

    document.getElementById('btn-request-hint').addEventListener('click', () => {
      this.useHint();
    });

    // Victory Modals Actions
    document.getElementById('btn-next-level').addEventListener('click', () => {
      audio.playClick();
      this.advanceToNextLevel();
    });

    document.getElementById('btn-play-again').addEventListener('click', () => {
      audio.playClick();
      this.modalGameComplete.classList.add('hidden');
      this.startGame();
    });

    document.getElementById('btn-complete-menu').addEventListener('click', () => {
      audio.playClick();
      this.modalGameComplete.classList.add('hidden');
      this.returnToMenu();
    });

    // Update Initial UI
    document.getElementById('menu-best-score').textContent = this.bestScore;
  }

  updateAudioButtonsUI(enabled = audio.enabled) {
    const text = enabled ? 'Sound: ON' : 'Sound: OFF';
    const icon = enabled ? '🔊' : '🔇';

    const globalBtn = document.getElementById('global-sound-btn');
    if (globalBtn) {
      globalBtn.querySelector('.sound-icon').textContent = icon;
      globalBtn.querySelector('.sound-text').textContent = text;
    }

    const menuIcon = document.getElementById('menu-sound-icon');
    const menuText = document.getElementById('menu-sound-text');
    if (menuIcon && menuText) {
      menuIcon.textContent = icon;
      menuText.textContent = text;
    }
  }

  // --------------------------------------------------------------------------
  // SCREEN NAVIGATION
  // --------------------------------------------------------------------------

  showScreen(screen) {
    this.screenMenu.classList.remove('active');
    this.screenGameplay.classList.remove('active');

    screen.classList.add('active');
  }

  startGame() {
    this.currentLevelIndex = 0;
    this.score = 0;
    this.showScreen(this.screenGameplay);
    this.loadLevel(this.currentLevelIndex);
  }

  returnToMenu() {
    this.saveBestScore();
    document.getElementById('menu-best-score').textContent = this.bestScore;
    this.showScreen(this.screenMenu);
  }

  openHowToPlay() {
    this.modalHowToPlay.classList.remove('hidden');
  }

  closeHowToPlay() {
    this.modalHowToPlay.classList.add('hidden');
  }

  // --------------------------------------------------------------------------
  // LEVEL SETUP & RENDERING
  // --------------------------------------------------------------------------

  loadLevel(index) {
    if (index >= LEVELS.length) {
      this.handleGameComplete();
      return;
    }

    this.currentLevelIndex = index;
    this.currentRecipe = [];
    this.hintUsedThisLevel = false;
    this.levelCompleted = false;
    this.isBrewing = false;

    const level = LEVELS[index];

    // HUD Updates
    document.getElementById('hud-level-badge').textContent = `Level ${level.level} / ${LEVELS.length}`;
    document.getElementById('hud-target-name').textContent = level.name;
    document.getElementById('hud-current-score').textContent = this.score;

    // Target Panel Updates
    document.getElementById('target-potion-name').textContent = level.name;
    document.getElementById('target-potion-desc').textContent = level.desc;
    document.getElementById('target-ingredient-count').textContent = `Requires ${level.recipe.length} Ingredients`;

    // Render Target Bottle SVG
    const bottleContainer = document.getElementById('target-bottle-svg-wrap');
    bottleContainer.innerHTML = generatePotionBottleSVG(level.bottleShape, level.liquidGradient, level.targetColor);

    const bottleAura = document.getElementById('target-bottle-aura');
    bottleAura.style.background = `radial-gradient(circle, ${level.targetColor} 0%, transparent 70%)`;

    // Reset Hint
    const hintBadge = document.getElementById('hint-status-badge');
    const hintText = document.getElementById('hint-text');
    const hintBtn = document.getElementById('btn-request-hint');

    hintBadge.textContent = '-30 pts if used';
    hintBadge.style.color = '#fda4af';
    hintText.textContent = 'Stuck? Ask the Ancient Grimoire for a recipe revelation.';
    hintBtn.disabled = false;

    // Reset Cauldron & Slots
    this.updateCauldronDisplay();
    this.updateRecipeSlots();
    this.setMessage('Select ingredients from the shelf below to begin your concoction.', 'info', '🔮');
  }

  restartLevel() {
    this.currentRecipe = [];
    this.hintUsedThisLevel = false;
    this.levelCompleted = false;
    this.isBrewing = false;

    const level = LEVELS[this.currentLevelIndex];
    const hintBadge = document.getElementById('hint-status-badge');
    const hintText = document.getElementById('hint-text');
    const hintBtn = document.getElementById('btn-request-hint');

    hintBadge.textContent = '-30 pts if used';
    hintText.textContent = 'Stuck? Ask the Ancient Grimoire for a recipe revelation.';
    hintBtn.disabled = false;

    this.updateCauldronDisplay();
    this.updateRecipeSlots();
    this.setMessage(`Level ${level.level} reset. Select your ingredients.`, 'info', '🔄');
  }

  // --------------------------------------------------------------------------
  // INGREDIENT SHELF & SELECTION
  // --------------------------------------------------------------------------

  renderShelf() {
    const grid = document.getElementById('ingredients-shelf-grid');
    grid.innerHTML = '';

    Object.values(INGREDIENTS).forEach(ing => {
      const card = document.createElement('button');
      card.className = 'ingredient-card';
      card.setAttribute('type', 'button');
      card.setAttribute('aria-label', `Add ${ing.name}`);
      card.style.setProperty('--card-glow', ing.glowColor);

      card.innerHTML = `
        <div class="ingredient-icon-wrap">
          ${ing.svg}
        </div>
        <span class="ingredient-name">${ing.name}</span>
        <span class="ingredient-tag">${ing.tag}</span>
        <span class="ingredient-add-badge">+</span>
      `;

      card.addEventListener('click', () => {
        this.addIngredient(ing.id);
      });

      grid.appendChild(card);
    });
  }

  addIngredient(ingredientId) {
    if (this.isBrewing || this.levelCompleted) return;

    const level = LEVELS[this.currentLevelIndex];
    const maxCapacity = Math.max(4, level.recipe.length + 1);

    if (this.currentRecipe.length >= maxCapacity) {
      audio.playTone(200, 0.1, 'sawtooth');
      this.setMessage(`The cauldron is full! Remove an ingredient or brew now.`, 'error', '⚠️');
      return;
    }

    this.currentRecipe.push(ingredientId);
    audio.playAdd();

    // Trigger visual splash bubble on cauldron
    this.triggerCauldronSplash(INGREDIENTS[ingredientId].liquidColor);
    this.updateRecipeSlots();
    this.updateCauldronDisplay();
    this.setMessage(`Added ${INGREDIENTS[ingredientId].name} into the cauldron.`, 'info', '✨');
  }

  undoLastIngredient() {
    if (this.isBrewing || this.levelCompleted) return;

    if (this.currentRecipe.length === 0) {
      this.setMessage('No ingredients in the cauldron to undo.', 'info', 'ℹ️');
      return;
    }

    const removedId = this.currentRecipe.pop();
    audio.playUndo();
    this.updateRecipeSlots();
    this.updateCauldronDisplay();
    this.setMessage(`Removed ${INGREDIENTS[removedId].name}.`, 'info', '↩');
  }

  clearRecipe() {
    if (this.isBrewing || this.levelCompleted) return;

    if (this.currentRecipe.length === 0) {
      this.setMessage('The cauldron is already empty.', 'info', 'ℹ️');
      return;
    }

    this.currentRecipe = [];
    audio.playClear();
    this.updateRecipeSlots();
    this.updateCauldronDisplay();
    this.setMessage('Cleared the cauldron. Ready for a new combination!', 'info', '🗑️');
  }

  // --------------------------------------------------------------------------
  // CAULDRON & RECIPE SLOTS UI
  // --------------------------------------------------------------------------

  updateRecipeSlots() {
    const container = document.getElementById('recipe-slots-container');
    const level = LEVELS[this.currentLevelIndex];
    const totalSlots = Math.max(4, level.recipe.length);

    document.getElementById('slots-count-text').textContent = 
      `${this.currentRecipe.length} / ${totalSlots} added`;

    container.innerHTML = '';

    for (let i = 0; i < totalSlots; i++) {
      const slot = document.createElement('div');
      slot.className = 'recipe-slot';

      if (i < this.currentRecipe.length) {
        const ingId = this.currentRecipe[i];
        const ing = INGREDIENTS[ingId];

        slot.classList.add('filled');
        slot.innerHTML = `
          <span class="slot-step-num">${i + 1}</span>
          <div class="slot-icon">${ing.svg}</div>
          <button class="slot-remove-btn" title="Remove this ingredient" aria-label="Remove ${ing.name}">✕</button>
        `;

        slot.querySelector('.slot-remove-btn').addEventListener('click', (e) => {
          e.stopPropagation();
          this.removeIngredientAtIndex(i);
        });
      } else {
        slot.innerHTML = `
          <span class="slot-step-num" style="opacity:0.35;">${i + 1}</span>
        `;
      }

      container.appendChild(slot);
    }
  }

  removeIngredientAtIndex(index) {
    if (this.isBrewing || this.levelCompleted) return;
    if (index >= 0 && index < this.currentRecipe.length) {
      const removedId = this.currentRecipe.splice(index, 1)[0];
      audio.playUndo();
      this.updateRecipeSlots();
      this.updateCauldronDisplay();
      this.setMessage(`Extracted ${INGREDIENTS[removedId].name}.`, 'info', '↩');
    }
  }

  updateCauldronDisplay() {
    const stop1 = document.getElementById('liquid-stop-1');
    const stop2 = document.getElementById('liquid-stop-2');
    const stop3 = document.getElementById('liquid-stop-3');

    if (this.currentRecipe.length === 0) {
      // Default mystical purple/indigo liquid
      stop1.setAttribute('stop-color', '#4338ca');
      stop2.setAttribute('stop-color', '#6366f1');
      stop3.setAttribute('stop-color', '#8b5cf6');
    } else {
      // Dynamic color blending based on selected ingredients
      const lastIng = INGREDIENTS[this.currentRecipe[this.currentRecipe.length - 1]];
      const firstIng = INGREDIENTS[this.currentRecipe[0]];

      stop1.setAttribute('stop-color', firstIng.liquidColor);
      stop2.setAttribute('stop-color', lastIng.liquidColor);
      stop3.setAttribute('stop-color', lastIng.color);
    }
  }

  triggerCauldronSplash(color) {
    const rect = document.getElementById('cauldron-interactive').getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height * 0.45;
    this.particles.burst(cx, cy, 14, [color, '#ffffff', '#c084fc']);
  }

  // --------------------------------------------------------------------------
  // HINT SYSTEM
  // --------------------------------------------------------------------------

  useHint() {
    if (this.isBrewing || this.levelCompleted) return;

    const level = LEVELS[this.currentLevelIndex];
    this.hintUsedThisLevel = true;
    audio.playHint();

    const hintBadge = document.getElementById('hint-status-badge');
    const hintText = document.getElementById('hint-text');
    const hintBtn = document.getElementById('btn-request-hint');

    hintBadge.textContent = 'Active (70 pts max)';
    hintBadge.style.color = '#facc15';
    hintText.innerHTML = `🔮 <strong>Grimoire Clue:</strong> ${level.hint}`;
    hintBtn.disabled = true;

    this.setMessage('Hint revealed! Level completion will award 70 points.', 'info', '💡');
  }

  // --------------------------------------------------------------------------
  // BREW VALIDATION & LEVEL TRANSITIONS
  // --------------------------------------------------------------------------

  brewPotion() {
    if (this.isBrewing || this.levelCompleted) return;

    // Check empty recipe
    if (this.currentRecipe.length === 0) {
      audio.playTone(220, 0.15, 'triangle');
      this.setMessage('The cauldron is empty! Select ingredients before brewing.', 'error', '⚠️');
      return;
    }

    this.isBrewing = true;
    audio.playBrewing();

    const cauldronElem = document.getElementById('cauldron-interactive');
    cauldronElem.classList.add('shake');
    this.setMessage('Stirring the cauldron and channeling mystical flames...', 'info', '🔥');

    setTimeout(() => {
      cauldronElem.classList.remove('shake');
      this.evaluateBrew();
    }, 700);
  }

  evaluateBrew() {
    const level = LEVELS[this.currentLevelIndex];
    const cauldronElem = document.getElementById('cauldron-interactive');
    const rect = cauldronElem.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height * 0.45;

    // Compare selected recipe with required recipe
    const isCorrectLength = this.currentRecipe.length === level.recipe.length;
    const isCorrectSequence = isCorrectLength && this.currentRecipe.every((id, idx) => id === level.recipe[idx]);

    if (isCorrectSequence) {
      // SUCCESS!
      this.levelCompleted = true;
      this.isBrewing = false;

      // Calculate score (100 if no hint, 70 if hint used)
      const pointsAwarded = this.hintUsedThisLevel ? 70 : 100;
      this.score += pointsAwarded;
      this.saveBestScore();

      document.getElementById('hud-current-score').textContent = this.score;

      // Audio & VFX
      audio.playSuccess();
      cauldronElem.classList.add('glow-win');
      setTimeout(() => cauldronElem.classList.remove('glow-win'), 1200);

      this.particles.burst(cx, cy, 60, [level.targetColor, '#ffffff', '#fbbf24', '#34d399']);
      this.setMessage(`Splendid! Created ${level.name} perfectly! (+${pointsAwarded} pts)`, 'success', '✨');

      // Show Victory Modal after short celebratory pause
      setTimeout(() => {
        this.showLevelSuccessModal(level, pointsAwarded);
      }, 900);

    } else {
      // FAILURE
      this.isBrewing = false;
      audio.playFailure();
      cauldronElem.classList.add('fizzle-fail');
      setTimeout(() => cauldronElem.classList.remove('fizzle-fail'), 900);

      // Smoke burst
      this.particles.smokePuff(cx, cy, 35);

      // Constructive feedback
      let feedback = 'The mixture fizzled into dark murky sludge!';
      if (this.currentRecipe.length < level.recipe.length) {
        feedback = 'The concoction is incomplete! More ingredients are required.';
      } else if (this.currentRecipe.length > level.recipe.length) {
        feedback = 'Too many ingredients! The cauldron boiled over.';
      } else {
        feedback = 'Incorrect ingredient combination or infusion sequence!';
      }

      this.setMessage(`${feedback} Try adjusting your recipe.`, 'error', '💨');
    }
  }

  showLevelSuccessModal(level, points) {
    const modal = document.getElementById('modal-level-success');
    document.getElementById('victory-title').textContent = 
      this.currentLevelIndex === LEVELS.length - 1 ? 'Final Brew Mastered!' : 'Potion Mastered!';
    document.getElementById('victory-potion-name').textContent = level.name;
    document.getElementById('victory-awarded-points').textContent = `+${points}`;

    const preview = document.getElementById('victory-potion-bottle');
    preview.innerHTML = generatePotionBottleSVG(level.bottleShape, level.liquidGradient, level.targetColor);

    modal.classList.remove('hidden');
  }

  advanceToNextLevel() {
    this.modalLevelSuccess.classList.add('hidden');
    if (this.currentLevelIndex + 1 >= LEVELS.length) {
      this.handleGameComplete();
    } else {
      this.loadLevel(this.currentLevelIndex + 1);
    }
  }

  handleGameComplete() {
    this.saveBestScore();
    audio.playGrandVictory();

    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    this.particles.burst(cx, cy, 100, ['#fbbf24', '#f43f5e', '#38bdf8', '#ffffff', '#10b981']);

    document.getElementById('final-completed-levels').textContent = `${LEVELS.length} / ${LEVELS.length}`;
    document.getElementById('final-total-score').textContent = this.score;
    document.getElementById('final-best-score').textContent = this.bestScore;

    this.modalGameComplete.classList.remove('hidden');
  }

  // --------------------------------------------------------------------------
  // LIVE FEEDBACK MESSAGE BOX
  // --------------------------------------------------------------------------

  setMessage(text, type = 'info', icon = '🔮') {
    const box = document.getElementById('cauldron-message-box');
    const textElem = document.getElementById('cauldron-message-text');
    const iconElem = document.getElementById('cauldron-message-icon');

    box.className = `cauldron-status-box ${type}`;
    textElem.textContent = text;
    iconElem.textContent = icon;
  }
}

// Initialize on DOM load
window.addEventListener('DOMContentLoaded', () => {
  window.potionGame = new PotionMixerGame();
});
