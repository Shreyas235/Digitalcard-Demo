/* ============================================================
   CHIGURU — script.js
   Interactions: Counter animation, Scroll reveal, Parallax
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ── 1. ANIMATED COUNTER (Hero stats) ───────────────────────
  const statNums = document.querySelectorAll('.stat-num');

  const formatNum = (n, target) => {
    if (target >= 1000) return n.toLocaleString('en-IN');
    return n;
  };

  const animateCounter = (el) => {
    const target = parseInt(el.dataset.target, 10);
    const duration = target >= 1000 ? 2000 : 1000;
    const startTime = performance.now();

    const step = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out quart
      const eased = 1 - Math.pow(1 - progress, 4);
      const current = Math.round(eased * target);
      el.textContent = formatNum(current, target);
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = formatNum(target, target);
    };

    requestAnimationFrame(step);
  };

  // Use IntersectionObserver to trigger counters when hero is visible
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        statNums.forEach(el => animateCounter(el));
        statsObserver.disconnect();
      }
    });
  }, { threshold: 0.5 });

  const heroStats = document.querySelector('.hero-stats');
  if (heroStats) statsObserver.observe(heroStats);


  // ── 2. SCROLL REVEAL ───────────────────────────────────────
  const revealEls = [
    ...document.querySelectorAll('.service-card'),
    ...document.querySelectorAll('.contact-card'),
    ...document.querySelectorAll('.section-header'),
    ...document.querySelectorAll('.client-chip'),
  ];

  revealEls.forEach(el => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger delay based on sibling index
        const siblings = [...entry.target.parentElement.children];
        const idx = siblings.indexOf(entry.target);
        entry.target.style.transitionDelay = `${idx * 80}ms`;
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(el => revealObserver.observe(el));


  // ── 3. SMOOTH SECTION NAVIGATION (scroll hint) ─────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });


  // ── 4. SERVICE CARD — HOVER TILT EFFECT ────────────────────
  const cards = document.querySelectorAll('.service-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rotateX = ((y - cy) / cy) * -5;
      const rotateY = ((x - cx) / cx) * 5;
      card.style.transform = `translateY(-8px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      card.style.transformOrigin = 'center center';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transformOrigin = '';
    });
  });


  // ── 5. PARALLAX — Hero headline on scroll ──────────────────
  const heroHeadline = document.querySelector('.hero-headline');
  const heroBadge    = document.querySelector('.brand-badge');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (heroHeadline) {
      heroHeadline.style.transform = `translateY(${scrollY * 0.18}px)`;
      heroHeadline.style.opacity   = `${1 - scrollY * 0.002}`;
    }
    if (heroBadge) {
      heroBadge.style.transform = `translateY(${scrollY * 0.08}px)`;
    }
  }, { passive: true });


  // ── 6. CLIENTS TRACK — Pause on hover ──────────────────────
  const track = document.getElementById('clientsTrack');
  if (track) {
    track.addEventListener('mouseenter', () => {
      track.style.animationPlayState = 'paused';
    });
    track.addEventListener('mouseleave', () => {
      track.style.animationPlayState = 'running';
    });
  }


  // ── 7. CONTACT CARDS — Ripple on click ─────────────────────
  document.querySelectorAll('.contact-card').forEach(card => {
    card.addEventListener('click', function (e) {
      const ripple = document.createElement('span');
      const rect   = this.getBoundingClientRect();
      const size   = Math.max(rect.width, rect.height) * 1.5;
      ripple.style.cssText = `
        position: absolute;
        left: ${e.clientX - rect.left - size / 2}px;
        top:  ${e.clientY - rect.top  - size / 2}px;
        width: ${size}px; height: ${size}px;
        border-radius: 50%;
        background: rgba(26, 74, 14, 0.1);
        transform: scale(0);
        animation: rippleAnim 0.6s ease-out forwards;
        pointer-events: none;
      `;
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 700);
    });
  });

  // Inject ripple keyframes dynamically
  const styleSheet = document.createElement('style');
  styleSheet.textContent = `
    @keyframes rippleAnim {
      to { transform: scale(1); opacity: 0; }
    }
  `;
  document.head.appendChild(styleSheet);


  // ── 8. LOGO EMBLEM — Spin on click ─────────────────────────
  const emblem = document.querySelector('.logo-emblem');
  if (emblem) {
    emblem.style.cursor = 'pointer';
    emblem.addEventListener('click', () => {
      emblem.style.transition = 'transform 0.8s cubic-bezier(0.34,1.56,0.64,1)';
      emblem.style.transform = 'rotate(360deg) scale(1.1)';
      setTimeout(() => {
        emblem.style.transform = '';
        setTimeout(() => { emblem.style.transition = ''; }, 800);
      }, 800);
    });
  }


  console.log('🌿 Chiguru — script loaded successfully');
});