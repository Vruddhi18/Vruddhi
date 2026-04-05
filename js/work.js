// ================================================================
// /work — Script
// Custom cursor · Filter · Entrance animations
// ================================================================

// ── CUSTOM CURSOR ──────────────────────────────────────────────
(function () {
  const cursor   = document.getElementById('cursor');
  const follower = document.getElementById('cursor-follower');
  if (!cursor || !follower) return;

  let mx = -100, my = -100;
  let fx = -100, fy = -100;
  let raf;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top  = my + 'px';
  });

  function followTick() {
    fx += (mx - fx) * 0.12;
    fy += (my - fy) * 0.12;
    follower.style.left = fx + 'px';
    follower.style.top  = fy + 'px';
    raf = requestAnimationFrame(followTick);
  }
  followTick();

  // Hide on leave / show on enter
  document.addEventListener('mouseleave', () => {
    cursor.style.opacity   = '0';
    follower.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    cursor.style.opacity   = '1';
    follower.style.opacity = '1';
  });
})();

// ── FILTER ─────────────────────────────────────────────────────
(function () {
  const btns  = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.work-card');

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      cards.forEach(card => {
        const match = filter === 'all' || card.dataset.cat === filter;
        if (match) {
          card.classList.remove('hidden');
          // re-entrance pop
          if (typeof gsap !== 'undefined') {
            gsap.fromTo(card,
              { opacity: 0, y: 20, scale: .97 },
              { opacity: 1, y: 0,  scale: 1, duration: .4, ease: 'power3.out' }
            );
          }
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
})();

// ── ENTRANCE ANIMATIONS ────────────────────────────────────────
(function () {
  if (typeof gsap === 'undefined') return;

  // Hero text
  gsap.fromTo('.wh-eyebrow',
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: .6, ease: 'power3.out', delay: .1 }
  );
  gsap.fromTo('.wh-title',
    { opacity: 0, y: 40 },
    { opacity: 1, y: 0, duration: .75, ease: 'power3.out', delay: .2 }
  );
  gsap.fromTo('.wh-sub',
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: .6, ease: 'power3.out', delay: .35 }
  );
  gsap.fromTo('.wh-stats',
    { opacity: 0, y: 16 },
    { opacity: 1, y: 0, duration: .55, ease: 'power3.out', delay: .5 }
  );

  // Cards staggered
  gsap.fromTo('.work-card',
    { opacity: 0, y: 32 },
    {
      opacity: 1, y: 0,
      duration: .55, ease: 'power3.out',
      stagger: .08, delay: .55
    }
  );

  // Process steps
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        gsap.fromTo('.ps-step',
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: .5, ease: 'power3.out', stagger: .1 }
        );
        obs.disconnect();
      }
    });
  }, { threshold: .2 });

  const ps = document.querySelector('.process-section');
  if (ps) obs.observe(ps);

  // Footer
  const obs2 = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        gsap.fromTo('.wf-title',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: .7, ease: 'power3.out' }
        );
        obs2.disconnect();
      }
    });
  }, { threshold: .15 });

  const wf = document.querySelector('.work-footer');
  if (wf) obs2.observe(wf);
})();

// ── CARD HOVER TILT ────────────────────────────────────────────
(function () {
  const cards = document.querySelectorAll('.work-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width  - 0.5;  // -0.5 → 0.5
      const y = (e.clientY - r.top)  / r.height - 0.5;
      card.style.transform = `perspective(800px) rotateX(${-y * 5}deg) rotateY(${x * 5}deg) translateZ(4px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
})();

console.log('Work page ready ✦');