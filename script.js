// ================================================================
// PORTFOLIO SCRIPT
// Fullpage scroll  +  Lanyard drop entrance + physics drag  +  Lottie
// ================================================================

// ================================================================
// FULLPAGE SCROLL
// ================================================================

class FullPageScroll {
  constructor() {
    this.sections   = Array.from(document.querySelectorAll('.fullpage-section'));
    this.current    = 0;
    this.animating  = false;
    this.touchStart = 0;
    this.init();
  }

  init() {
    if (!this.sections.length) return;

    window.addEventListener('wheel', e => {
      e.preventDefault();
      if (this.animating) return;
      this.go(this.current + (e.deltaY > 0 ? 1 : -1));
    }, { passive: false });

    window.addEventListener('keydown', e => {
      if (this.animating) return;
      if (e.key === 'ArrowDown' || e.key === 'PageDown') { e.preventDefault(); this.go(this.current + 1); }
      if (e.key === 'ArrowUp'   || e.key === 'PageUp'  ) { e.preventDefault(); this.go(this.current - 1); }
    });

    window.addEventListener('touchstart', e => {
      this.touchStart = e.touches[0].clientY;
    }, { passive: true });

    window.addEventListener('touchend', e => {
      if (this.animating) return;
      const diff = this.touchStart - e.changedTouches[0].clientY;
      if (Math.abs(diff) > 50) this.go(this.current + (diff > 0 ? 1 : -1));
    }, { passive: true });
  }

  go(index) {
    if (index < 0 || index >= this.sections.length || index === this.current) return;
    this.animating = true;

    const leaving  = this.sections[this.current];
    const entering = this.sections[index];
    const dir      = index > this.current ? 1 : -1;

    entering.classList.add('active');
    gsap.set(entering, { y: dir * 100 + '%', opacity: 0 });

    const tl = gsap.timeline({
      onComplete: () => {
        leaving.classList.remove('active');
        gsap.set(leaving, { clearProps: 'all' });
        this.current   = index;
        this.animating = false;

        // Trigger stack entrance animation when entering section 2 (index 2)
      }
    });

    tl.to(leaving,  { y: dir * -100 + '%', opacity: 0, duration: 0.75, ease: 'power2.inOut' }, 0);
    tl.to(entering, { y: '0%', opacity: 1,              duration: 0.75, ease: 'power2.inOut' }, 0);

    gsap.to('#scroll-indicator', { opacity: index > 0 ? 0 : 1, duration: 0.4 });
  }
}

// ================================================================
// ================================================================

let stackAnimated = false;

function animateStackEntrance() {
  if (stackAnimated) return;
  stackAnimated = true;

  const icons = document.querySelectorAll('.sketch-item');
  gsap.fromTo(icons,
    { opacity: 0, y: 18, scale: 0.85 },
    {
      opacity: 1, y: 0, scale: 1,
      duration: 0.45,
      ease: 'back.out(1.5)',
      stagger: { each: 0.03, from: 'random' },
      delay: 0.1
    }
  );
}

// ================================================================
// LANYARD
// ─ Phase 1: entrance drop animation
// ─ Phase 2: free physics + pointer drag
// ================================================================

function initLanyard() {
  const root  = document.getElementById('lanyard-root');
  const badge = document.getElementById('badge-card');
  const svg   = document.getElementById('lanyard-svg');
  const rope  = document.getElementById('rope-path');
  const clipRect = document.getElementById('clip-rect');
  const clipHole = document.getElementById('clip-hole');

  if (!root || !badge || !svg || !rope) return;

  const REST_LEN  = 110;
  const GRAVITY   = 0.55;
  const DAMPING   = 0.86;
  const STIFFNESS = 0.065;

  const W = () => root.offsetWidth;
  const H = () => root.offsetHeight;
  const AX = () => W() / 2;
  const AY = 22;

  let BADGE_H = 0;
  let BADGE_W = 0;
  let bx, by;
  let vx = 0, vy = 0;
  let physicsRunning = false;
  let dragging  = false;
  let dragOffX  = 0, dragOffY = 0;
  let prevBx    = 0, prevBy  = 0;

  function updateClip() {
    const ax = AX();
    if (clipRect) {
      clipRect.setAttribute('x',  ax - 18);
      clipRect.setAttribute('y',  AY - 9);
    }
    if (clipHole) {
      clipHole.setAttribute('cx', ax);
      clipHole.setAttribute('cy', AY);
    }
  }

  function drawRope(x, y) {
    const ax = AX();
    const ay = AY;
    const tx = x;
    const ty = y - BADGE_H / 2 + 12;
    const dx  = tx - ax;
    const sag = Math.min(Math.abs(dx) * 0.35 + 20, 60);
    const cx  = (ax + tx) / 2;
    const cy  = (ay + ty) / 2 + sag;
    rope.setAttribute('d', `M ${ax} ${ay} Q ${cx} ${cy} ${tx} ${ty}`);
  }

  function placeBadge(x, y, angleDeg) {
    badge.style.left      = x + 'px';
    badge.style.top       = y + 'px';
    badge.style.transform = `translate(-50%,-50%) rotate(${angleDeg}deg)`;
  }

  function runEntrance() {
    BADGE_H = badge.offsetHeight || 290;
    BADGE_W = badge.offsetWidth  || 240;
    const ax = AX();
    let ex = ax;
    let ey = -BADGE_H;
    badge.style.opacity = '1';
    updateClip();
    drawRope(ex, ey);
    placeBadge(ex, ey, 0);

    const proxy = { x: ex, y: ey, angle: 0 };
    const tl = gsap.timeline({ onComplete: handOffToPhysics });

    tl.to(proxy, {
      y: AY + REST_LEN + BADGE_H / 2,
      duration: 0.55, ease: 'power2.in',
      onUpdate: () => { drawRope(proxy.x, proxy.y); placeBadge(proxy.x, proxy.y, proxy.angle); }
    });
    tl.to(proxy, {
      x: ax - W() * 0.28, angle: -22,
      duration: 0.5, ease: 'power1.out',
      onUpdate: () => { drawRope(proxy.x, proxy.y); placeBadge(proxy.x, proxy.y, proxy.angle); }
    });
    tl.to(proxy, {
      x: ax + W() * 0.08, angle: 8,
      duration: 0.6, ease: 'power2.inOut',
      onUpdate: () => { drawRope(proxy.x, proxy.y); placeBadge(proxy.x, proxy.y, proxy.angle); }
    });
    tl.to(proxy, {
      x: ax + W() * 0.04, angle: 2,
      duration: 0.4, ease: 'power1.inOut',
      onUpdate: () => { drawRope(proxy.x, proxy.y); placeBadge(proxy.x, proxy.y, proxy.angle); }
    });
    tl.to(proxy, {
      x: ax + W() * 0.02, angle: 0,
      duration: 0.35, ease: 'power1.inOut',
      onUpdate: () => { drawRope(proxy.x, proxy.y); placeBadge(proxy.x, proxy.y, proxy.angle); },
      onComplete: () => { bx = proxy.x; by = proxy.y; }
    });
  }

  function handOffToPhysics() {
    vx = 0.8; vy = 0;
    physicsRunning = true;
    physicsTick();
  }

  function physicsTick() {
    if (!physicsRunning) return;
    if (!dragging) {
      const ax = AX();
      const ay = AY;
      const restX = ax;
      const restY = ay + REST_LEN + BADGE_H / 2;
      const dx = bx - restX;
      const dy = by - restY;
      vx += -dx * STIFFNESS;
      vy += -dy * STIFFNESS;
      vy += GRAVITY;
      vx *= DAMPING;
      vy *= DAMPING;
      bx += vx;
      by += vy;
    }
    const tilt = Math.max(-20, Math.min(20, vx * 2.2));
    drawRope(bx, by);
    placeBadge(bx, by, tilt);
    requestAnimationFrame(physicsTick);
  }

  badge.addEventListener('pointerdown', e => {
    e.preventDefault();
    badge.setPointerCapture(e.pointerId);
    dragging = true;
    badge.style.cursor = 'grabbing';
    const r = root.getBoundingClientRect();
    dragOffX = bx - (e.clientX - r.left);
    dragOffY = by - (e.clientY - r.top);
    prevBx = bx;
    prevBy = by;
  });

  document.addEventListener('pointermove', e => {
    if (!dragging) return;
    const r = root.getBoundingClientRect();
    prevBx = bx; prevBy = by;
    bx = (e.clientX - r.left) + dragOffX;
    by = (e.clientY - r.top)  + dragOffY;
  });

  document.addEventListener('pointerup', () => {
    if (!dragging) return;
    dragging = false;
    badge.style.cursor = 'grab';
    vx = (bx - prevBx) * 0.75;
    vy = (by - prevBy) * 0.75;
  });

  window.addEventListener('resize', () => {
    updateClip();
    if (!dragging) bx = AX() + W() * 0.02;
  });

  updateClip();
  setTimeout(() => {
    BADGE_H = badge.offsetHeight || 290;
    BADGE_W = badge.offsetWidth  || 240;
    bx = AX();
    by = -BADGE_H;
    runEntrance();
  }, 350);
}

// ================================================================
// ENTRANCE — hero text slides up
// ================================================================

function playEntrance() {
  gsap.to('.hero-left', {
    opacity: 1, y: 0,
    duration: 0.85, ease: 'power3.out', delay: 0.2
  });
}

// ================================================================
// LOTTIE
// ================================================================

function initLottie() {
  const el = document.getElementById('lottie-container');
  if (!el || typeof lottie === 'undefined') return;
  lottie.loadAnimation({
    container: el,
    renderer:  'svg',
    loop:      true,
    autoplay:  true,
    path:      'girl_working_on_laptop_lottie_animation.json'
  });
}

// ================================================================
// BOOT
// ================================================================

document.addEventListener('DOMContentLoaded', () => {
  if (typeof gsap === 'undefined') { console.error('GSAP missing'); return; }
  new FullPageScroll();
  initLanyard();
  initLottie();
  playEntrance();
  console.log('Portfolio ready 🚀');
});