/* ============================================================
   CHIGURU — script.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ── 1. ANIMATED COUNTER ────────────────────────────────────
  const statNums = document.querySelectorAll('.stat-num');
  const formatNum = (n, target) => target >= 1000 ? n.toLocaleString('en-IN') : n;

  const animateCounter = (el) => {
    const target = parseInt(el.dataset.target, 10);
    const duration = target >= 1000 ? 2000 : 1000;
    const startTime = performance.now();
    const step = (currentTime) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      el.textContent = formatNum(Math.round(eased * target), target);
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = formatNum(target, target);
    };
    requestAnimationFrame(step);
  };

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
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const idx = [...entry.target.parentElement.children].indexOf(entry.target);
        entry.target.style.transitionDelay = `${idx * 80}ms`;
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(el => revealObserver.observe(el));


  // ── 3. SERVICE CARD TILT ───────────────────────────────────
  document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const rotateX = ((e.clientY - rect.top  - rect.height / 2) / (rect.height / 2)) * -5;
      const rotateY = ((e.clientX - rect.left - rect.width  / 2) / (rect.width  / 2)) *  5;
      card.style.transform = `translateY(-8px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });


  // ── 4. CLIENTS TRACK PAUSE ON HOVER ────────────────────────
  const track = document.getElementById('clientsTrack');
  if (track) {
    track.addEventListener('mouseenter', () => track.style.animationPlayState = 'paused');
    track.addEventListener('mouseleave', () => track.style.animationPlayState = 'running');
  }


  // ── 5. CONTACT CARD RIPPLE ─────────────────────────────────
  const rippleStyle = document.createElement('style');
  rippleStyle.textContent = `@keyframes rippleAnim { to { transform: scale(1); opacity: 0; } }`;
  document.head.appendChild(rippleStyle);

  document.querySelectorAll('.contact-card').forEach(card => {
    card.addEventListener('click', function (e) {
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 1.5;
      const ripple = document.createElement('span');
      ripple.style.cssText = `
        position:absolute; border-radius:50%; pointer-events:none;
        left:${e.clientX - rect.left - size / 2}px;
        top:${e.clientY - rect.top - size / 2}px;
        width:${size}px; height:${size}px;
        background:rgba(26,74,14,0.1);
        transform:scale(0);
        animation:rippleAnim 0.6s ease-out forwards;
      `;
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 700);
    });
  });

});