// ================================================================
// /case-study — Script
// Custom cursor · Data Injection · GSAP Animations
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

  document.addEventListener('mouseleave', () => {
    cursor.style.opacity   = '0';
    follower.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    cursor.style.opacity   = '1';
    follower.style.opacity = '1';
  });
})();

// ── DATA INJECTION & RENDERING  ────────────────────────────────
(function () {
  const urlParams = new URLSearchParams(window.location.search);
  const projectId = urlParams.get('id');
  
  const contentWrapper = document.getElementById('case-study-content');
  const errorScreen = document.getElementById('error-screen');
  
  if (!projectId || typeof caseStudies === 'undefined' || !caseStudies[projectId]) {
    if (errorScreen) errorScreen.style.display = 'block';
    return;
  }
  
  contentWrapper.style.display = 'block';
  const data = caseStudies[projectId];
  
  // Title & Meta
  document.title = `${data.title} — Vruddhi Shah`;
  document.getElementById('cs-title').textContent = data.title;
  document.getElementById('cs-header-title').textContent = data.title;
  document.getElementById('cs-category').textContent = data.category;
  document.getElementById('cs-year').textContent = data.year;
  
  document.getElementById('cs-role').innerHTML = data.role.replace(/, /g, '<br>');
  document.getElementById('cs-timeline').textContent = data.timeline;
  
  // Live Link
  const actionBtn = document.getElementById('cs-action-btn');
  if (data.liveLink) {
    actionBtn.href = data.liveLink;
    actionBtn.style.display = 'inline-flex';
  } else {
    actionBtn.style.display = 'none';
  }

  // Tech Stack
  const techStackContainer = document.getElementById('cs-tech-stack');
  techStackContainer.innerHTML = '';
  if (data.techStack && data.techStack.length > 0) {
    data.techStack.forEach(tech => {
      const span = document.createElement('span');
      span.className = 'cs-tech-tag';
      span.textContent = tech;
      techStackContainer.appendChild(span);
    });
  } else {
    techStackContainer.innerHTML = '<span class="cs-tech-tag">N/A</span>';
  }

  // Text Sections mapping
  const renderTextSection = (id, content) => {
    const el = document.getElementById(`cs-${id}`);
    const block = document.getElementById(`block-${id}`);
    if (content) {
      el.innerHTML = content.replace(/\\n/g, '<br><br>');
      block.style.display = 'block';
    } else {
      block.style.display = 'none';
    }
  };

  renderTextSection('problem', data.problemStatement);
  renderTextSection('process', data.process);
  renderTextSection('challenges', data.challenges);
  
  // Hero Colors
  const hero = document.getElementById('cs-hero');
  hero.style.backgroundColor = data.heroColor;
  if (data.textColor === 'light') {
    hero.style.color = '#FAFAFF';
    hero.classList.add('light-text');
  } else {
    hero.style.color = '#080705';
    hero.classList.add('dark-text');
  }
  
  // Video Rendering
  const videoBlock = document.getElementById('block-video');
  const videoEl = document.getElementById('cs-video');
  if (data.video) {
    videoEl.src = data.video;
    videoBlock.style.display = 'block';
  } else {
    videoBlock.style.display = 'none';
  }

  // Gallery Rendering
  const galleryBlock = document.getElementById('block-gallery');
  const galleryGrid = document.getElementById('cs-gallery-grid');
  galleryGrid.innerHTML = ''; // reset
  if (data.gallery && data.gallery.length > 0) {
    galleryBlock.style.display = 'block';
    
    // Adjust grid based on image count
    if(data.gallery.length === 1) {
       galleryGrid.style.gridTemplateColumns = '1fr';
    } else {
       galleryGrid.style.gridTemplateColumns = '1fr 1fr';
    }

    data.gallery.forEach((imgSrc, i) => {
      const img = document.createElement('img');
      img.src = imgSrc;
      img.alt = `${data.title} Gallery Image ${i+1}`;
      galleryGrid.appendChild(img);
    });
  } else {
    galleryBlock.style.display = 'none';
  }

  // Next Project Mapping
  const keys = Object.keys(caseStudies);
  const currentIndex = keys.indexOf(projectId);
  const nextIndex = (currentIndex + 1) % keys.length;
  const nextProject = caseStudies[keys[nextIndex]];
  
  const nextLink = document.getElementById('cs-next-link');
  if (nextLink) {
    nextLink.href = `case-study.html?id=${keys[nextIndex]}`;
    document.getElementById('cs-next-title').innerHTML = `${nextProject.title} <span style="color:var(--muted)">→</span>`;
  }

  initAnimations();
})();

// ── ENTRANCE ANIMATIONS ────────────────────────────────────────
function initAnimations() {
  if (typeof gsap === 'undefined') return;

  // Initial
  gsap.fromTo('.back-link, .header-title, .hn-link, .hn-cta',
    { opacity: 0, y: -10 },
    { opacity: 1, y: 0, duration: 0.6, stagger: 0.05, ease: 'power3.out' }
  );

  gsap.fromTo('.cs-meta-top',
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.8, delay: 0.1, ease: 'power3.out' }
  );

  gsap.fromTo('#cs-title',
    { opacity: 0, y: 40 },
    { opacity: 1, y: 0, duration: 1, delay: 0.2, ease: 'power4.out' }
  );

  gsap.fromTo('.cs-info-col',
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.7, delay: 0.4, stagger: 0.1, ease: 'power3.out' }
  );

  // Scroll Intersections
  const initScrollObserve = (selector, animObjFrom, animObjTo) => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          gsap.fromTo(entry.target, animObjFrom, { ...animObjTo, duration: 0.8, ease: 'power3.out' });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    document.querySelectorAll(selector).forEach(el => observer.observe(el));
  };

  initScrollObserve('.cs-text-block', { opacity: 0, y: 30 }, { opacity: 1, y: 0 });
  initScrollObserve('.cs-media-full', { opacity: 0, scale: 0.96 }, { opacity: 1, scale: 1 });
  initScrollObserve('#cs-gallery-grid img', { opacity: 0, y: 40 }, { opacity: 1, y: 0 });
  
  // Footer
  const footerObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        gsap.fromTo('.wf-title', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' });
        footerObs.disconnect();
      }
    });
  }, { threshold: 0.2 });

  const wf = document.querySelector('.work-footer');
  if (wf) footerObs.observe(wf);
}
