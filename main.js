/* ============================================================
   ВояжСервис — main.js
   Навбар, анимации при скролле, счётчики статистики
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ===== НАВБАР: скролл + мобильное меню ===== */
  const navbar    = document.querySelector('.navbar');
  const navToggle = document.getElementById('navToggle');
  const navLinks  = document.getElementById('navLinks');

  // Подсветка активной страницы
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(l => {
    if (l.getAttribute('href') === page) l.classList.add('active');
  });

  // Прозрачный → тёмный при скролле
  if (navbar) {
    const onScroll = () => {
      if (window.scrollY > 60) navbar.classList.add('scrolled');
      else if (navbar.classList.contains('transparent')) navbar.classList.remove('scrolled');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Открытие/закрытие мобильного меню
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('open');
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('.nav-link').forEach(l =>
      l.addEventListener('click', () => {
        navToggle.classList.remove('open');
        navLinks.classList.remove('open');
      })
    );
  }

  /* ===== АНИМАЦИИ ПРИ ПРОКРУТКЕ (IntersectionObserver) ===== */
  const animated = document.querySelectorAll('.fade-up, .fade-in');
  if (animated.length) {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    animated.forEach(el => obs.observe(el));
  }

  /* ===== СЧЁТЧИКИ СТАТИСТИКИ ===== */
  document.querySelectorAll('.stat-number[data-target]').forEach(el => {
    const cObs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      cObs.disconnect();
      const target = +el.dataset.target, suffix = el.dataset.suffix || '';
      let i = 0; const steps = 55;
      const t = setInterval(() => {
        i++;
        el.textContent = Math.round(target / steps * i).toLocaleString('ru') + suffix;
        if (i >= steps) { el.textContent = target.toLocaleString('ru') + suffix; clearInterval(t); }
      }, 2000 / steps);
    }, { threshold: 0.6 });
    cObs.observe(el);
  });

  /* ===== ПАРАЛЛАКС HERO ===== */
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg) {
    window.addEventListener('scroll', () => {
      heroBg.style.transform = `translateY(${window.pageYOffset * 0.32}px)`;
    }, { passive: true });
  }

  /* ===== ПЛАВНЫЙ СКРОЛЛ ПО ЯКОРЯМ ===== */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const t = document.querySelector(a.getAttribute('href'));
      if (t) { e.preventDefault(); window.scrollTo({ top: t.getBoundingClientRect().top + pageYOffset - 90, behavior: 'smooth' }); }
    });
  });
});
