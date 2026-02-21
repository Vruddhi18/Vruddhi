// ================================================================
// /play — Script
// Custom cursor · Cassette · Burn · Polaroid · Particles · Game · Easter Egg
// ================================================================

// ── CUSTOM CURSOR ──────────────────────────────────────────────
const cursor = document.getElementById('cursor');
const cursorEmoji = document.getElementById('cursor-emoji');

const emojiMap = {
  'toy-cassette':  '🎵',
  'toy-burn':      '🔥',
  'toy-polaroid':  '📷',
  'toy-cursor':    '✦',
  'toy-game':      '⌨️',
  'toy-matrix':    '⬛',
  'toy-terminal':  '$',
  'toy-glitch':    '▓',
  'toy-clock':     '◉',
  'toy-noise':     '〰',
  'toy-morse':     '•—',
};

let currentSection = null;

document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top  = e.clientY + 'px';

  // Detect which toy section we're in
  const el = document.elementFromPoint(e.clientX, e.clientY);
  if (el) {
    const section = el.closest('.toy-section, .play-hero, .play-footer');
    if (section && section.id !== currentSection) {
      currentSection = section.id;
      cursorEmoji.textContent = emojiMap[section.id] || '✦';
    }
  }
});

document.querySelectorAll('a, button, .tape, .polaroid').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('big'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('big'));
});

// ================================================================
// TOY 1: CASSETTE PLAYER
// ================================================================
(function () {
  const tapes    = document.querySelectorAll('.tape');
  const slot     = document.getElementById('player-slot');
  const slotText = document.getElementById('slot-text');
  const slotTape = document.getElementById('slot-tape');
  const reelL    = document.getElementById('reel-l');
  const reelR    = document.getElementById('reel-r');
  const led      = document.getElementById('player-led');
  const display  = document.getElementById('display-track');
  const timeEl   = document.getElementById('display-time');
  const playBtn  = document.getElementById('ctrl-play');
  const rewBtn   = document.getElementById('ctrl-rew');
  const ffBtn    = document.getElementById('ctrl-ff');
  const ejectBtn = document.getElementById('ctrl-eject');

  if (!slot) return;

  let insertedTape = null;
  let playing = false;
  let seconds = 0;
  let timer = null;

  // Drag from shelf
  let draggingTape = null;

  tapes.forEach(tape => {
    tape.addEventListener('dragstart', e => {
      draggingTape = tape;
      setTimeout(() => tape.style.opacity = '.4', 0);
    });
    tape.addEventListener('dragend', () => {
      tape.style.opacity = '1';
      draggingTape = null;
    });
  });

  slot.addEventListener('dragover', e => {
    e.preventDefault();
    slot.classList.add('drag-over');
  });
  slot.addEventListener('dragleave', () => slot.classList.remove('drag-over'));

  slot.addEventListener('drop', e => {
    e.preventDefault();
    slot.classList.remove('drag-over');
    if (!draggingTape) return;
    insertTape(draggingTape);
  });

  // Also allow clicking a tape to insert
  tapes.forEach(tape => {
    tape.addEventListener('click', () => insertTape(tape));
  });

  function insertTape(tape) {
    if (insertedTape) eject();

    insertedTape = tape;
    const color = tape.dataset.color;
    const title = tape.dataset.title;

    slotText.style.display = 'none';
    slotTape.classList.remove('hidden');
    slotTape.style.background = color;

    display.textContent = title.toUpperCase();
    led.classList.add('active');
    seconds = 0;
    updateTime();

    // GSAP bounce in
    if (typeof gsap !== 'undefined') {
      gsap.fromTo(slotTape, { scaleY: 0, transformOrigin: 'top' }, { scaleY: 1, duration: .3, ease: 'back.out(2)' });
    }

    // Auto-play
    startPlay();
  }

  function startPlay() {
    if (playing) return;
    if (!insertedTape) return;
    playing = true;
    playBtn.textContent = '⏸';
    reelL.classList.add('spinning');
    reelR.classList.add('spinning');
    timer = setInterval(() => { seconds++; updateTime(); }, 1000);
  }

  function stopPlay() {
    playing = false;
    playBtn.textContent = '▶';
    reelL.classList.remove('spinning');
    reelR.classList.remove('spinning');
    clearInterval(timer);
  }

  function eject() {
    stopPlay();
    insertedTape = null;
    slotTape.classList.add('hidden');
    slotText.style.display = '';
    display.textContent = '— NO TAPE —';
    led.classList.remove('active');
    seconds = 0;
    updateTime();

    if (typeof gsap !== 'undefined') {
      gsap.fromTo(slotText, { opacity: 0 }, { opacity: 1, duration: .4 });
    }
  }

  function updateTime() {
    const m = Math.floor(seconds / 60);
    const s = String(seconds % 60).padStart(2, '0');
    timeEl.textContent = `${m}:${s}`;
  }

  playBtn.addEventListener('click', () => {
    if (!insertedTape) return;
    playing ? stopPlay() : startPlay();
  });

  rewBtn.addEventListener('click', () => {
    if (!insertedTape) return;
    seconds = Math.max(0, seconds - 10);
    updateTime();
    reelL.style.animationDuration = '.3s';
    setTimeout(() => reelL.style.animationDuration = '.8s', 600);
  });

  ffBtn.addEventListener('click', () => {
    if (!insertedTape) return;
    seconds += 10;
    updateTime();
    reelR.style.animationDuration = '.2s';
    setTimeout(() => reelR.style.animationDuration = '.8s', 600);
  });

  ejectBtn.addEventListener('click', eject);
})();

// ================================================================
// TOY 2: BURN YOUR WORRIES
// ================================================================
(function () {
  const input     = document.getElementById('burn-input');
  const countEl   = document.getElementById('char-count');
  const paper     = document.getElementById('burn-paper');
  const overlay   = document.getElementById('burn-overlay');
  const burnBtn   = document.getElementById('burn-btn');
  const resetBtn  = document.getElementById('burn-reset');
  const wrap      = document.getElementById('paper-wrap');
  const canvas    = document.getElementById('ember-canvas');

  if (!input) return;

  // Char count
  input.addEventListener('input', () => {
    countEl.textContent = `${input.value.length} / 120`;
  });

  burnBtn.addEventListener('click', () => {
    if (!input.value.trim()) {
      // Shake to prompt
      if (typeof gsap !== 'undefined') {
        gsap.to(paper, { x: -8, duration: .06, repeat: 6, yoyo: true, onComplete: () => gsap.set(paper, { x: 0 }) });
      }
      return;
    }

    input.disabled = true;
    burnBtn.disabled = true;
    runBurn();
  });

  resetBtn.addEventListener('click', () => {
    input.value = '';
    input.disabled = false;
    countEl.textContent = '0 / 120';
    overlay.style.height = '0';
    burnBtn.disabled = false;
    resetBtn.style.display = 'none';
    wrap.style.opacity = '1';
    wrap.style.transform = '';
    clearEmbers();
  });

  function runBurn() {
    const section = document.getElementById('toy-burn');
    spawnEmbers(section, canvas);

    let progress = 0;
    const interval = setInterval(() => {
      progress += 2;
      overlay.style.height = progress + '%';

      if (progress >= 100) {
        clearInterval(interval);
        if (typeof gsap !== 'undefined') {
          gsap.to(wrap, {
            opacity: 0, scaleY: 0, transformOrigin: 'bottom',
            duration: .5, ease: 'power3.in',
            onComplete: () => {
              resetBtn.style.display = 'inline-flex';
            }
          });
        }
      }
    }, 40);
  }

  // Ember particle system
  let embers = [];
  let emberRaf;

  function spawnEmbers(section, canvas) {
    const rect = section.getBoundingClientRect();
    canvas.width  = section.offsetWidth;
    canvas.height = section.offsetHeight;
    const ctx = canvas.getContext('2d');

    function createEmber() {
      const x = section.offsetWidth * (.3 + Math.random() * .4);
      const y = section.offsetHeight * .55 + Math.random() * 50;
      return {
        x, y,
        vx: (Math.random() - .5) * 2,
        vy: -(2 + Math.random() * 4),
        life: 1,
        decay: .008 + Math.random() * .012,
        size: 2 + Math.random() * 4,
        color: Math.random() > .5 ? '#ff7733' : '#ffd700'
      };
    }

    let spawnCount = 0;
    const spawnInterval = setInterval(() => {
      for (let i = 0; i < 3; i++) embers.push(createEmber());
      spawnCount++;
      if (spawnCount > 80) clearInterval(spawnInterval);
    }, 60);

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      embers = embers.filter(e => e.life > 0);

      embers.forEach(e => {
        e.x += e.vx + (Math.random() - .5) * .5;
        e.y += e.vy;
        e.vy *= .98;
        e.life -= e.decay;

        ctx.save();
        ctx.globalAlpha = e.life;
        ctx.fillStyle = e.color;
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.size * e.life, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      if (embers.length > 0 || spawnCount <= 80) {
        emberRaf = requestAnimationFrame(draw);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
    draw();
  }

  function clearEmbers() {
    embers = [];
    cancelAnimationFrame(emberRaf);
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }
})();

// ================================================================
// TOY 3: POLAROID CAMERA
// ================================================================
(function () {
  const shutter   = document.getElementById('cam-shutter');
  const aperture  = document.getElementById('cam-aperture');
  const flash     = document.getElementById('cam-flash');
  const tray      = document.getElementById('pol-tray');
  const hint      = document.getElementById('shake-hint');

  if (!shutter) return;

  const subjects = [
    { emoji: '🌿', color: '#e8f4ef' },
    { emoji: '✨', color: '#fdf8e1' },
    { emoji: '🎨', color: '#fce7f3' },
    { emoji: '🌊', color: '#e0f2fe' },
    { emoji: '🔥', color: '#fff3e0' },
    { emoji: '🌙', color: '#ede9fe' },
    { emoji: '🎵', color: '#f0fdf4' },
    { emoji: '⚡', color: '#fefce8' },
  ];

  let shotCount = 0;

  shutter.addEventListener('click', () => {
    if (shotCount >= 8) {
      shutter.textContent = '';
      shutter.style.background = '#555';
      return;
    }

    // Flash
    flash.classList.remove('flash');
    void flash.offsetWidth;
    flash.classList.add('flash');

    // Aperture snap
    aperture.classList.remove('snap');
    void aperture.offsetWidth;
    aperture.classList.add('snap');

    // Camera shake
    if (typeof gsap !== 'undefined') {
      gsap.to('#pol-camera', { x: -5, duration: .04, repeat: 3, yoyo: true, onComplete: () => gsap.set('#pol-camera', { x: 0 }) });
    }

    // Eject polaroid
    setTimeout(() => ejectPolaroid(subjects[shotCount % subjects.length], shotCount), 200);
    shotCount++;

    if (shotCount === 1) hint.style.display = 'block';
  });

  function ejectPolaroid(subject, index) {
    const rot = (Math.random() * 14) - 7;
    const pol = document.createElement('div');
    pol.className = 'polaroid';
    pol.style.setProperty('--rot', rot + 'deg');

    pol.innerHTML = `
      <div class="polaroid-img developing" style="background:${subject.color}">
        <span style="opacity:0;font-size:2rem;transition:opacity 2s ease" class="pol-emoji">${subject.emoji}</span>
      </div>
      <div class="polaroid-label">shot #${String(index + 1).padStart(2, '0')}</div>
    `;

    tray.appendChild(pol);

    // Animate in
    if (typeof gsap !== 'undefined') {
      gsap.fromTo(pol,
        { opacity: 0, y: -30, rotation: rot - 10 },
        { opacity: 1, y: 0,   rotation: rot, duration: .4, ease: 'back.out(1.5)' }
      );
    }

    // Develop after delay (reveal emoji)
    setTimeout(() => {
      const emojiEl = pol.querySelector('.pol-emoji');
      if (emojiEl) emojiEl.style.opacity = '1';
    }, 2500);

    // Shake to develop faster
    let shakeCount = 0;
    pol.addEventListener('mousemove', () => {
      if (shakeCount < 10) {
        shakeCount++;
        if (shakeCount >= 5) {
          const emojiEl = pol.querySelector('.pol-emoji');
          if (emojiEl) emojiEl.style.opacity = '1';
          const imgEl = pol.querySelector('.polaroid-img');
          if (imgEl) imgEl.classList.remove('developing');
        }
      }
    });
  }
})();

// ================================================================
// TOY 4: PARTICLE CANVAS
// ================================================================
(function () {
  const canvas  = document.getElementById('particle-canvas');
  const hint    = document.getElementById('canvas-hint');
  const clearBtn = document.getElementById('clear-canvas');
  const modeBtns = document.querySelectorAll('.pctr-btn[data-mode]');

  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let mode = 'trail';
  let particles = [];
  let mx = -1000, my = -1000;
  let isInside = false;
  let hinted = false;

  function resize() {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const colors = ['#EEF36A', '#192BC2', '#FF7733', '#00A86B', '#FAFAFF', '#ff6b9d', '#a855f7'];

  function spawnParticle(x, y, burst = false) {
    const count = burst ? 20 : 1;
    for (let i = 0; i < count; i++) {
      const angle = burst ? (Math.random() * Math.PI * 2) : 0;
      const speed = burst ? (2 + Math.random() * 6) : 0;
      particles.push({
        x, y,
        vx: burst ? Math.cos(angle) * speed : (Math.random() - .5) * 1.5,
        vy: burst ? Math.sin(angle) * speed : (Math.random() - .5) * 1.5,
        life: 1,
        decay: burst ? .015 + Math.random() * .02 : .008 + Math.random() * .008,
        size: burst ? 2 + Math.random() * 5 : 3 + Math.random() * 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        angle: 0,
        angularV: (Math.random() - .5) * .2,
        orbitAngle: Math.random() * Math.PI * 2,
        orbitR: 30 + Math.random() * 60,
        orbitSpeed: (.02 + Math.random() * .04) * (Math.random() > .5 ? 1 : -1),
      });
    }
  }

  canvas.addEventListener('mouseenter', () => { isInside = true; if (!hinted) { hint.classList.add('hidden'); hinted = true; } });
  canvas.addEventListener('mouseleave', () => { isInside = false; });
  canvas.addEventListener('mousemove', e => {
    const r = canvas.getBoundingClientRect();
    mx = e.clientX - r.left;
    my = e.clientY - r.top;
    if (mode === 'trail') spawnParticle(mx, my);
  });
  canvas.addEventListener('click', e => {
    const r = canvas.getBoundingClientRect();
    spawnParticle(e.clientX - r.left, e.clientY - r.top, true);
  });

  modeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      modeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      mode = btn.dataset.mode;
    });
  });

  clearBtn.addEventListener('click', () => { particles = []; ctx.clearRect(0, 0, canvas.width, canvas.height); });

  let lastTime = 0;
  function animate(ts) {
    ctx.fillStyle = 'rgba(10,10,18,.18)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Spawn for orbit mode
    if (mode === 'orbit' && isInside) spawnParticle(mx, my);

    particles = particles.filter(p => p.life > 0);
    particles.forEach(p => {
      if (mode === 'orbit') {
        p.orbitAngle += p.orbitSpeed;
        p.x = mx + Math.cos(p.orbitAngle) * p.orbitR;
        p.y = my + Math.sin(p.orbitAngle) * p.orbitR;
        p.orbitR *= .995;
      } else {
        p.vy += .04; // gravity
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= .98;
        p.vy *= .98;
      }
      p.life -= p.decay;
      p.angle += p.angularV;

      ctx.save();
      ctx.globalAlpha = p.life;
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size * p.life + 1, p.size * p.life + 1);
      ctx.restore();
    });

    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
})();

// ================================================================
// TOY 5: TYPE TAPPER GAME
// ================================================================
(function () {
  const arena     = document.getElementById('game-arena');
  const input     = document.getElementById('game-input');
  const startBtn  = document.getElementById('game-start-btn');
  const restartBtn = document.getElementById('game-restart-btn');
  const startScreen = document.getElementById('game-start');
  const overScreen  = document.getElementById('game-over');
  const scoreEl   = document.getElementById('game-score');
  const bestEl    = document.getElementById('game-best');
  const livesEl   = document.getElementById('game-lives');
  const goScore   = document.getElementById('go-score');

  if (!arena) return;

  const words = [
    'kerning','leading','grid','gestalt','color','type','serif',
    'bezier','vector','layout','margin','glyph','weight','italic',
    'contrast','texture','balance','rhythm','hue','saturation',
    'figma','prototype','wireframe','pixel','canvas','artboard',
    'palette','gradient','opacity','blend','layer','mask','clip'
  ];

  let score = 0, lives = 3, best = 0;
  let gameActive = false;
  let fallingWords = [];
  let spawnInterval, gameLoop;
  const heartMap = [0, '❤️', '❤️❤️', '❤️❤️❤️'];

  function startGame() {
    score = 0; lives = 3; fallingWords = [];
    gameActive = true;
    scoreEl.textContent = '0';
    livesEl.textContent = '❤️❤️❤️';
    startScreen.style.display = 'none';
    overScreen.classList.add('hidden');
    input.focus();

    // Clear old words
    arena.querySelectorAll('.falling-word').forEach(w => w.remove());

    spawnInterval = setInterval(spawnWord, 1500);
    gameLoop = setInterval(tickWords, 50);
  }

  function spawnWord() {
    if (!gameActive) return;
    const word = words[Math.floor(Math.random() * words.length)];
    const el = document.createElement('div');
    el.className = 'falling-word';
    el.textContent = word;

    const maxLeft = arena.offsetWidth - 160;
    const left = 20 + Math.random() * maxLeft;
    el.style.left = left + 'px';
    el.style.top  = '4px';

    arena.appendChild(el);
    fallingWords.push({ el, word, y: 4, speed: 0.7 + score * .02 });
  }

  function tickWords() {
    if (!gameActive) return;
    const arenaH = arena.offsetHeight - 50;

    fallingWords = fallingWords.filter(fw => {
      fw.y += fw.speed;
      fw.el.style.top = fw.y + 'px';

      if (fw.y > arenaH) {
        fw.el.remove();
        loseLife();
        return false;
      }
      return true;
    });
  }

  function loseLife() {
    lives--;
    livesEl.textContent = heartMap[lives] || '';
    if (typeof gsap !== 'undefined') {
      gsap.fromTo(arena, { x: -10 }, { x: 0, duration: .3, ease: 'elastic.out(3,0.3)' });
    }
    if (lives <= 0) endGame();
  }

  function endGame() {
    gameActive = false;
    clearInterval(spawnInterval);
    clearInterval(gameLoop);
    if (score > best) { best = score; bestEl.textContent = best; }
    goScore.textContent = `You scored ${score} point${score !== 1 ? 's' : ''}`;
    overScreen.classList.remove('hidden');
    fallingWords.forEach(fw => fw.el.remove());
    fallingWords = [];
  }

  input.addEventListener('input', () => {
    const val = input.value.trim().toLowerCase();

    const match = fallingWords.find(fw => fw.word === val);
    if (match) {
      match.el.classList.add('matched');
      setTimeout(() => match.el.remove(), 350);
      fallingWords = fallingWords.filter(fw => fw !== match);
      score++;
      scoreEl.textContent = score;
      input.value = '';
    }
  });

  startBtn.addEventListener('click', startGame);
  restartBtn.addEventListener('click', startGame);
})();

// ================================================================
// KONAMI CODE EASTER EGG
// ================================================================
(function () {
  const code = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
  let pos = 0;
  const egg   = document.getElementById('easter-egg');
  const close = document.getElementById('ee-close');
  const hint  = document.getElementById('konami-hint');

  document.addEventListener('keydown', e => {
    if (e.key === code[pos]) {
      pos++;
      // Light up each character as you go
      if (hint) {
        hint.classList.add('active');
        setTimeout(() => hint.classList.remove('active'), 400);
      }
      if (pos === code.length) {
        egg.classList.remove('hidden');
        pos = 0;
      }
    } else {
      pos = 0;
    }
  });

  if (close) close.addEventListener('click', () => egg.classList.add('hidden'));
})();

// ================================================================
// ENTRANCE ANIMATIONS
// ================================================================
(function () {
  if (typeof gsap === 'undefined') return;

  gsap.fromTo('.ph-title',
    { opacity: 0, y: 60 },
    { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: .2 }
  );
  gsap.fromTo('.ph-sub',
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: .7, ease: 'power3.out', delay: .4 }
  );

  // Reveal toys as they scroll in
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const section = entry.target;
        gsap.fromTo(section.querySelectorAll('.toy-title, .toy-desc, .toy-label'),
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: .55, ease: 'power3.out', stagger: .08 }
        );
        obs.unobserve(section);
      }
    });
  }, { threshold: .15 });

  document.querySelectorAll('.toy-section').forEach(s => obs.observe(s));
})();

console.log('Playground ready ✦ (psst — try the konami code)');

// ================================================================
// TOY 6: MATRIX CODE RAIN
// ================================================================
(function () {
  const canvas  = document.getElementById('matrix-canvas');
  const streamsEl = document.getElementById('mx-streams');
  const charsEl   = document.getElementById('mx-chars');
  const clearBtn  = document.getElementById('mx-clear');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const CHARS = 'アイウエオカキクケコサシスセソタチツテトナニヌネノ01アイウエオカキクケコ#$%&ABCDEF0123456789<>[]{}';

  const PALETTES = {
    green:  { head: '#aaffaa', trail: '#00ff41', bg: 'rgba(0,0,0,0.05)' },
    blue:   { head: '#aaddff', trail: '#0099ff', bg: 'rgba(0,5,20,0.05)' },
    yellow: { head: '#ffffaa', trail: '#ffdd00', bg: 'rgba(0,0,0,0.05)' },
    red:    { head: '#ffaaaa', trail: '#ff2200', bg: 'rgba(0,0,0,0.05)' },
  };

  let palette = PALETTES.green;
  let cols = [], fontSize = 14, mouseX = -1, mouseY = -1;
  let charsPerSec = 0, charsTick = 0, lastSecond = Date.now();

  function resize() {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const numCols = Math.floor(canvas.width / fontSize);
    // Keep existing cols, just grow/shrink
    while (cols.length < numCols) cols.push({ y: Math.random() * -canvas.height, speed: 1 + Math.random() * 3 });
    cols.length = numCols;
  }

  function reset() { cols = []; resize(); }

  resize();
  window.addEventListener('resize', resize);

  canvas.addEventListener('mousemove', e => {
    const r = canvas.getBoundingClientRect();
    mouseX = e.clientX - r.left;
    mouseY = e.clientY - r.top;
  });
  canvas.addEventListener('mouseleave', () => { mouseX = -1; mouseY = -1; });
  canvas.addEventListener('click', e => {
    const r = canvas.getBoundingClientRect();
    const cx = e.clientX - r.left;
    // Spawn burst of new streams around click
    const startCol = Math.max(0, Math.floor(cx / fontSize) - 3);
    const endCol   = Math.min(cols.length - 1, Math.floor(cx / fontSize) + 3);
    for (let i = startCol; i <= endCol; i++) {
      cols[i] = { y: 0, speed: 2 + Math.random() * 4 };
    }
  });

  if (clearBtn) clearBtn.addEventListener('click', reset);

  document.querySelectorAll('[data-mx-color]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-mx-color]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      palette = PALETTES[btn.dataset.mxColor];
    });
  });

  let activeCount = 0;
  function draw() {
    ctx.fillStyle = palette.bg;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = fontSize + 'px "Space Mono", monospace';
    activeCount = 0;

    cols.forEach((col, i) => {
      const x = i * fontSize;

      // Cursor repels nearby columns
      if (mouseX >= 0) {
        const dist = Math.abs(x - mouseX);
        if (dist < 60) { col.y -= col.speed * 0.5; }
      }

      const ch = CHARS[Math.floor(Math.random() * CHARS.length)];
      // Head char brighter
      ctx.fillStyle = palette.head;
      ctx.fillText(ch, x, col.y);

      // Body trail
      ctx.fillStyle = palette.trail;
      ctx.fillText(CHARS[Math.floor(Math.random() * CHARS.length)], x, col.y - fontSize);

      col.y += col.speed;
      charsTick++;

      if (col.y > canvas.height && Math.random() > 0.975) {
        col.y = 0;
        col.speed = 1 + Math.random() * 3;
      }

      if (col.y > 0 && col.y < canvas.height) activeCount++;
    });

    // Update stats
    const now = Date.now();
    if (now - lastSecond >= 1000) {
      charsPerSec = charsTick;
      charsTick = 0;
      lastSecond = now;
      if (streamsEl) streamsEl.textContent = `streams: ${activeCount}`;
      if (charsEl)   charsEl.textContent   = `chars/s: ${charsPerSec}`;
    }

    requestAnimationFrame(draw);
  }
  draw();
})();

// ================================================================
// TOY 7: TERMINAL
// ================================================================
(function () {
  const input  = document.getElementById('terminal-input');
  const body   = document.getElementById('terminal-body');
  if (!input || !body) return;

  const history = [];
  let histIdx = -1;

  const COMMANDS = {
    help: () => [
      '┌─ Available commands ────────────────────┐',
      '│  about      →  who is vruddhi?          │',
      '│  skills     →  what can she do?         │',
      '│  projects   →  what has she built?      │',
      '│  contact    →  how to reach her         │',
      '│  vibe       →  current mood             │',
      '│  sudo hire  →  make an offer            │',
      '│  cat poem   →  something nice           │',
      '│  ls         →  list everything          │',
      '│  clear      →  wipe the slate           │',
      '└─────────────────────────────────────────┘',
    ],
    about: () => [
      '> Vruddhi Shah',
      '> Creative designer & AI builder',
      '> Currently: making things that feel alive',
      '> Location: 🇮🇳 India',
      '> Status: open to collabs & full-time roles',
    ],
    skills: () => [
      '> [████████░░] UI/UX Design        80%',
      '> [███████░░░] Brand Identity      70%',
      '> [██████░░░░] Python / ML         60%',
      '> [█████░░░░░] React / Frontend    50%',
      '> [████████░░] Creative Direction  80%',
      '> [██████████] Curiosity          100%',
    ],
    projects: () => [
      '> 01. Agentic Research Tool  — Python, Smolagents',
      '> 02. Layered Identity System — Figma, Illustrator',
      '> 03. Interactive Portfolio  — GSAP, HTML/CSS/JS',
      '> 04. Type Tapper Game       — Vanilla JS',
      '> run "open <n>" to learn more (coming soon)',
    ],
    contact: () => [
      '> Email:    hello@vruddhi.dev',
      '> LinkedIn: linkedin.com/in/vruddhi',
      '> GitHub:   github.com/vruddhi',
      '> Dribbble: dribbble.com/vruddhi',
    ],
    vibe: () => {
      const vibes = [
        '> Currently listening to: lo-fi beats at 2am',
        '> Energy level: ████░░░░░░ 40% — need coffee',
        '> Mode: deep work, do not disturb',
        '> Feeling: chaotically inspired',
        '> Status: somewhere between "it works" and "why"',
      ];
      return vibes;
    },
    ls: () => [
      '> drwxr-xr-x  projects/',
      '> drwxr-xr-x  work/',
      '> drwxr-xr-x  play/',
      '> -rw-r--r--  resume.pdf',
      '> -rw-r--r--  vibe.json',
      '> -r--------  secrets.txt  (access denied)',
    ],
    'cat poem': () => [
      '> ───────────────────────────',
      '> pixels stack like bricks of light',
      '> the cursor blinks its patient morse',
      '> design is just a way of saying',
      '> I thought about you first',
      '> ───────────────────────────',
    ],
    'sudo hire': () => [
      '> [sudo] password for recruiter: ••••••••',
      '> Verifying credentials...',
      '> Access granted. Welcome.',
      '> Initiating hire sequence...',
      '> → Sending offer letter to: hello@vruddhi.dev',
      '> ✓ Done. Great choice.',
    ],
    clear: () => { body.innerHTML = ''; return []; },
    'cat secrets.txt': () => ['> Permission denied. Nice try though.'],
    pwd: () => ['> /home/vruddhi/portfolio/play'],
    whoami: () => ['> vruddhi — designer, builder, curious human'],
    date: () => [`> ${new Date().toString()}`],
    matrix: () => {
      document.getElementById('toy-matrix').scrollIntoView({ behavior: 'smooth' });
      return ['> Jumping to Code Rain...'];
    },
  };

  function addLine(text, className = '') {
    const div = document.createElement('div');
    div.className = 't-line ' + className;
    div.innerHTML = text;
    body.appendChild(div);
    body.parentElement.scrollTop = body.parentElement.scrollHeight;
  }

  function typeLines(lines, delay = 60) {
    lines.forEach((line, i) => {
      setTimeout(() => {
        addLine('<span class="t-output t-code">' + line + '</span>');
      }, i * delay);
    });
  }

  function run(cmd) {
    addLine(`<span class="t-prompt-inline">vruddhi@portfolio ~ %</span> <span class="t-cmd">${cmd}</span>`);

    const fn = COMMANDS[cmd.toLowerCase().trim()];
    if (fn) {
      const out = fn();
      if (out && out.length) typeLines(out);
    } else if (cmd.trim() === '') {
      // nothing
    } else {
      addLine(`<span class="t-output t-err">zsh: command not found: ${cmd} (try "help")</span>`);
    }
  }

  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      const cmd = input.value.trim();
      history.unshift(cmd);
      histIdx = -1;
      run(cmd);
      input.value = '';
    }
    if (e.key === 'ArrowUp') {
      histIdx = Math.min(histIdx + 1, history.length - 1);
      input.value = history[histIdx] || '';
    }
    if (e.key === 'ArrowDown') {
      histIdx = Math.max(histIdx - 1, -1);
      input.value = histIdx < 0 ? '' : history[histIdx];
    }
    if (e.key === 'Tab') {
      e.preventDefault();
      const val = input.value.toLowerCase();
      const match = Object.keys(COMMANDS).find(k => k.startsWith(val));
      if (match) input.value = match;
    }
  });

  // Click terminal body = focus input
  document.getElementById('terminal-wrap').addEventListener('click', () => input.focus());
})();

// ================================================================
// TOY 8: GLITCH TEXT GENERATOR
// ================================================================
(function () {
  const textEl    = document.getElementById('glitch-text');
  const inputEl   = document.getElementById('glitch-input');
  const sliderEl  = document.getElementById('glitch-intensity');
  const presets   = document.querySelectorAll('.gp-btn');
  if (!textEl) return;

  const GLITCH_CHARS = '!<>-_\\/[]{}—=+*^?#░▒▓|@$%&Ш̈Ä̈Ü̈ÆØ∆∑∏∂∫≈÷×';
  let intensity = 40;
  let glitchInterval;
  let currentText = 'VRUDDHI';

  function startGlitch() {
    clearInterval(glitchInterval);
    const freq = Math.max(30, 200 - intensity * 1.8);
    glitchInterval = setInterval(() => applyGlitch(), freq);
  }

  function applyGlitch() {
    if (intensity === 0) { textEl.textContent = currentText; return; }

    const numCorrupt = Math.floor(intensity / 10);
    let arr = currentText.split('');

    for (let i = 0; i < numCorrupt; i++) {
      const pos = Math.floor(Math.random() * arr.length);
      arr[pos] = GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
    }

    textEl.textContent = arr.join('');
    textEl.dataset.text = arr.join('');

    // Occasional CSS glitch shift
    if (Math.random() < intensity / 200) {
      const shift = (Math.random() * 10 - 5).toFixed(1);
      textEl.style.textShadow = `${shift}px 0 #ff0000, -${shift}px 0 #00ffff`;
      textEl.style.letterSpacing = (Math.random() * 0.3).toFixed(2) + 'em';
      setTimeout(() => {
        textEl.style.textShadow = '';
        textEl.style.letterSpacing = '';
      }, 80);
    }

    // RGB split on high intensity
    if (intensity > 70 && Math.random() < .3) {
      textEl.style.transform = `translateX(${(Math.random()*6-3).toFixed(1)}px)`;
      setTimeout(() => textEl.style.transform = '', 60);
    }
  }

  function updateText(val) {
    currentText = val.toUpperCase() || 'VRUDDHI';
    textEl.dataset.text = currentText;
  }

  inputEl.addEventListener('input', () => updateText(inputEl.value));

  sliderEl.addEventListener('input', () => {
    intensity = +sliderEl.value;
    startGlitch();
  });

  presets.forEach(btn => {
    btn.addEventListener('click', () => {
      inputEl.value = btn.dataset.word;
      updateText(btn.dataset.word);
    });
  });

  startGlitch();
})();

// ================================================================
// TOY 9: SMOG CLOCK
// ================================================================
(function () {
  const canvas   = document.getElementById('clock-canvas');
  const digitalEl = document.getElementById('clock-digital');
  const dateEl    = document.getElementById('clock-date');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let tz = 'local';
  let smogParticles = [];

  function getTime() {
    const now = new Date();
    if (tz === 'local') return now;
    const offsets = { UTC: 0, IST: 5.5, PST: -8 };
    const offset = offsets[tz] ?? 0;
    const utc = now.getTime() + now.getTimezoneOffset() * 60000;
    return new Date(utc + offset * 3600000);
  }

  function resize() {
    const size = Math.min(canvas.offsetWidth, canvas.offsetHeight, 340);
    canvas.width = canvas.height = size;
  }
  resize();
  window.addEventListener('resize', resize);

  // Init smog particles
  function initSmog() {
    smogParticles = [];
    for (let i = 0; i < 80; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = 60 + Math.random() * 80;
      smogParticles.push({
        x: Math.cos(angle) * r, y: Math.sin(angle) * r,
        r, angle,
        speed: (.001 + Math.random() * .004) * (Math.random() > .5 ? 1 : -1),
        size: 8 + Math.random() * 22,
        opacity: .03 + Math.random() * .07,
        drift: Math.random() * .002 - .001,
      });
    }
  }
  initSmog();

  function draw() {
    const W = canvas.width, H = canvas.height;
    const cx = W / 2, cy = H / 2;
    ctx.clearRect(0, 0, W, H);

    const t = getTime();
    const h = t.getHours() % 12;
    const m = t.getMinutes();
    const s = t.getSeconds();
    const ms = t.getMilliseconds();

    const secAngle  = ((s + ms / 1000) / 60) * Math.PI * 2 - Math.PI / 2;
    const minAngle  = ((m + s / 60) / 60) * Math.PI * 2 - Math.PI / 2;
    const hourAngle = ((h + m / 60) / 12) * Math.PI * 2 - Math.PI / 2;

    const radius = W * .38;

    // ── Smog layer
    smogParticles.forEach(p => {
      p.angle += p.speed + p.drift * Math.sin(s * .1);
      p.x = Math.cos(p.angle) * p.r;
      p.y = Math.sin(p.angle) * p.r;
      const grad = ctx.createRadialGradient(cx + p.x, cy + p.y, 0, cx + p.x, cy + p.y, p.size);
      grad.addColorStop(0, `rgba(150,180,130,${p.opacity * 1.5})`);
      grad.addColorStop(1, `rgba(100,140,90,0)`);
      ctx.beginPath();
      ctx.arc(cx + p.x, cy + p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();
    });

    // ── Concentric rings
    [.95, .78, .6].forEach((scale, i) => {
      const pulse = 1 + Math.sin(s * .3 + i) * .005;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * scale * pulse, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(100,160,80,${.08 + i * .04})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    });

    // ── Second arc (full ring)
    ctx.beginPath();
    ctx.arc(cx, cy, radius * .95, -Math.PI / 2, secAngle);
    ctx.strokeStyle = '#00ff41';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.stroke();

    // ── Hour hand
    drawHand(ctx, cx, cy, hourAngle, radius * .5, 5, 'rgba(200,220,160,.9)');
    // ── Minute hand
    drawHand(ctx, cx, cy, minAngle, radius * .72, 3, 'rgba(160,200,120,.8)');
    // ── Second hand
    drawHand(ctx, cx, cy, secAngle, radius * .82, 1.5, '#00ff41');

    // ── Center dot
    ctx.beginPath();
    ctx.arc(cx, cy, 6, 0, Math.PI * 2);
    ctx.fillStyle = '#00ff41';
    ctx.fill();
    ctx.beginPath();
    ctx.arc(cx, cy, 3, 0, Math.PI * 2);
    ctx.fillStyle = '#001a00';
    ctx.fill();

    // ── Digital + date
    const hh = String(t.getHours()).padStart(2,'0');
    const mm = String(m).padStart(2,'0');
    const ss = String(s).padStart(2,'0');
    if (digitalEl) digitalEl.textContent = `${hh}:${mm}:${ss}`;
    if (dateEl) dateEl.textContent = t.toDateString() + ' · ' + tz;

    requestAnimationFrame(draw);
  }

  function drawHand(ctx, cx, cy, angle, length, width, color) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(angle);
    ctx.beginPath();
    ctx.moveTo(-length * .15, 0);
    ctx.lineTo(length, 0);
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.lineCap = 'round';
    ctx.stroke();
    ctx.restore();
  }

  document.querySelectorAll('[data-tz]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-tz]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      tz = btn.dataset.tz;
    });
  });

  draw();
})();

// ================================================================
// TOY 10: FLOW FIELD
// ================================================================
(function () {
  const canvas = document.getElementById('noise-canvas');
  const resetBtn = document.getElementById('noise-reset');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let mode = 'calm';
  let particles = [];
  let t = 0;
  let mouseX = canvas.width / 2, mouseY = canvas.height / 2;
  let mouseInside = false;

  function resize() {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    initParticles();
  }

  function initParticles() {
    particles = [];
    const count = Math.min(800, Math.floor(canvas.width * canvas.height / 900));
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: 0, vy: 0,
        life: Math.random(),
        maxLife: .4 + Math.random() * .6,
        hue: 180 + Math.random() * 60,
      });
    }
  }

  resize();
  window.addEventListener('resize', resize);
  if (resetBtn) resetBtn.addEventListener('click', () => { ctx.clearRect(0, 0, canvas.width, canvas.height); initParticles(); });

  canvas.addEventListener('mousemove', e => {
    const r = canvas.getBoundingClientRect();
    mouseX = e.clientX - r.left;
    mouseY = e.clientY - r.top;
    mouseInside = true;
  });
  canvas.addEventListener('mouseleave', () => mouseInside = false);

  document.querySelectorAll('[data-flow]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-flow]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      mode = btn.dataset.flow;
    });
  });

  // Simple pseudo-noise: sin/cos field
  function field(x, y) {
    const nx = x / canvas.width, ny = y / canvas.height;
    let angle;
    if (mode === 'calm') {
      angle = Math.sin(nx * 4 + t) * Math.cos(ny * 4 + t) * Math.PI * 2;
    } else if (mode === 'turbulent') {
      angle = Math.sin(nx * 8 + t * 1.5) * Math.cos(ny * 6 - t) * Math.PI * 3 + Math.sin(nx * ny * 12 + t);
    } else { // vortex
      const dx = nx - .5, dy = ny - .5;
      angle = Math.atan2(dy, dx) + Math.PI / 2 + Math.sqrt(dx*dx+dy*dy) * 4 * Math.sin(t);
    }

    // Mouse repulsion
    if (mouseInside) {
      const dx = x - mouseX, dy = y - mouseY;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if (dist < 100) {
        const repel = (100 - dist) / 100;
        angle += repel * Math.PI;
      }
    }
    return angle;
  }

  function draw() {
    t += 0.008;
    ctx.fillStyle = 'rgba(8,7,5,0.04)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
      const angle = field(p.x, p.y);
      const speed = mode === 'turbulent' ? 2.5 : 1.5;
      p.vx = p.vx * .85 + Math.cos(angle) * speed * .15;
      p.vy = p.vy * .85 + Math.sin(angle) * speed * .15;
      p.x += p.vx;
      p.y += p.vy;
      p.life -= .003;

      if (p.x < 0 || p.x > canvas.width || p.y < 0 || p.y > canvas.height || p.life < 0) {
        p.x = Math.random() * canvas.width;
        p.y = Math.random() * canvas.height;
        p.vx = p.vy = 0;
        p.life = p.maxLife;
      }

      const alpha = Math.min(p.life, .6);
      ctx.fillStyle = `hsla(${p.hue + t * 10},70%,60%,${alpha})`;
      ctx.fillRect(p.x, p.y, 1.5, 1.5);
    });

    requestAnimationFrame(draw);
  }
  draw();
})();

// ================================================================
// TOY 11: MORSE CODE SIGNAL
// ================================================================
(function () {
  const inputEl    = document.getElementById('morse-input');
  const outputEl   = document.getElementById('morse-output');
  const transmitBtn = document.getElementById('morse-transmit');
  const keyEl      = document.getElementById('morse-key');
  const decodedEl  = document.getElementById('morse-decoded');
  const mCanvas    = document.getElementById('morse-canvas');
  if (!inputEl || !mCanvas) return;

  const ctx = mCanvas.getContext('2d');

  const MORSE = {
    A:'.-', B:'-...', C:'-.-.', D:'-..', E:'.', F:'..-.', G:'--.', H:'....',
    I:'..', J:'.---', K:'-.-', L:'.-..', M:'--', N:'-.',  O:'---', P:'.--.',
    Q:'--.-', R:'.-.', S:'...', T:'-', U:'..-', V:'...-', W:'.--', X:'-..-',
    Y:'-.--', Z:'--..', '0':'-----', '1':'.----', '2':'..---', '3':'...--',
    '4':'....-', '5':'.....', '6':'-....', '7':'--...', '8':'---..',
    '9':'----.', ' ': '/'
  };

  const MORSE_REV = Object.fromEntries(Object.entries(MORSE).map(([k,v])=>[v,k]));

  function textToMorse(text) {
    return text.toUpperCase().split('').map(c => MORSE[c] || '').join(' ');
  }

  inputEl.addEventListener('input', () => {
    outputEl.textContent = textToMorse(inputEl.value);
  });

  // Signal wave drawing
  let signalPoints = [];
  let signalX = 0;

  function resizeMorseCanvas() {
    mCanvas.width  = mCanvas.offsetWidth;
    mCanvas.height = mCanvas.offsetHeight || 60;
  }
  resizeMorseCanvas();

  function addSignalPoint(high) {
    signalPoints.push({ x: signalX, high });
    signalX += 3;
    if (signalX > mCanvas.width) {
      signalPoints = signalPoints.filter(p => p.x > signalX - mCanvas.width);
      signalPoints.forEach(p => p.x -= 3);
      signalX = mCanvas.width;
    }
    drawSignal();
  }

  function drawSignal() {
    const W = mCanvas.width, H = mCanvas.height;
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#0a0e08';
    ctx.fillRect(0, 0, W, H);

    if (signalPoints.length < 2) return;
    ctx.beginPath();
    ctx.strokeStyle = '#00ff41';
    ctx.lineWidth = 2;
    const mid = H / 2;

    signalPoints.forEach((p, i) => {
      const y = p.high ? mid - 18 : mid + 18;
      if (i === 0) ctx.moveTo(p.x, y);
      else {
        const prev = signalPoints[i - 1];
        const py = prev.high ? mid - 18 : mid + 18;
        if (prev.high !== p.high) {
          ctx.lineTo(prev.x, py);
          ctx.lineTo(p.x, py);
        }
        ctx.lineTo(p.x, y);
      }
    });
    ctx.stroke();
  }

  // Transmit animation
  let transmitting = false;
  async function transmit(morseStr) {
    if (transmitting) return;
    transmitting = true;
    transmitBtn.disabled = true;

    const DOT = 80, DASH = 240, GAP = 80, LETTER_GAP = 240, WORD_GAP = 480;
    const symbols = morseStr.split('');

    for (let sym of symbols) {
      if (sym === '.') {
        keyEl.classList.add('pressed');
        for (let i=0;i<8;i++) { addSignalPoint(true); await sleep(DOT/8); }
        keyEl.classList.remove('pressed');
        for (let i=0;i<4;i++) { addSignalPoint(false); await sleep(GAP/4); }
      } else if (sym === '-') {
        keyEl.classList.add('pressed');
        for (let i=0;i<24;i++) { addSignalPoint(true); await sleep(DASH/24); }
        keyEl.classList.remove('pressed');
        for (let i=0;i<4;i++) { addSignalPoint(false); await sleep(GAP/4); }
      } else if (sym === ' ') {
        for (let i=0;i<12;i++) { addSignalPoint(false); await sleep(LETTER_GAP/12); }
      } else if (sym === '/') {
        for (let i=0;i<20;i++) { addSignalPoint(false); await sleep(WORD_GAP/20); }
      }
    }

    transmitting = false;
    transmitBtn.disabled = false;
  }

  transmitBtn.addEventListener('click', () => {
    const morse = textToMorse(inputEl.value);
    transmit(morse);
  });

  // Manual tap key
  let tapStart = 0, tapBuffer = [];
  let tapTimeout;

  keyEl.addEventListener('pointerdown', () => {
    tapStart = Date.now();
    keyEl.classList.add('pressed');
    addSignalPoint(true);
  });

  keyEl.addEventListener('pointerup', () => {
    const dur = Date.now() - tapStart;
    keyEl.classList.remove('pressed');
    addSignalPoint(false);

    tapBuffer.push(dur < 200 ? '.' : '-');
    clearTimeout(tapTimeout);
    tapTimeout = setTimeout(() => {
      const sym = tapBuffer.join('');
      const ch = MORSE_REV[sym] || '?';
      decodedEl.textContent = (decodedEl.textContent === '—' ? '' : decodedEl.textContent) + ch;
      tapBuffer = [];
    }, 500);
  });

  function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

  // Initial signal
  for (let i=0;i<30;i++) addSignalPoint(false);
})();