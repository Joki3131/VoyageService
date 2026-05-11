/* ============================================================
   ВояжСервис — system.js
   Табы, прогресс-бары, аккордеон, анимация чисел
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ===== ПЕРЕКЛЮЧЕНИЕ ТАБОВ ===== */
  const tabBtns  = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b  => b.classList.remove('active'));
      tabPanes.forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const pane = document.getElementById(btn.dataset.tab);
      if (pane) pane.classList.add('active');
    });
  });

  /* ===== ПРОГРЕСС-БАРЫ (запуск при появлении в окне) ===== */
  document.querySelectorAll('.progress-fill[data-width]').forEach(fill => {
    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      obs.disconnect();
      setTimeout(() => { fill.style.width = fill.dataset.width + '%'; }, 180);
    }, { threshold: 0.5 });
    obs.observe(fill);
  });

  /* ===== АККОРДЕОН (FAQ) ===== */
  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      const item   = header.closest('.accordion-item');
      const body   = item.querySelector('.accordion-body');
      const isOpen = item.classList.contains('open');

      // Закрыть все
      document.querySelectorAll('.accordion-item').forEach(i => {
        i.classList.remove('open');
        i.querySelector('.accordion-body').style.maxHeight = '0';
      });

      // Открыть выбранный (если был закрыт)
      if (!isOpen) {
        item.classList.add('open');
        body.style.maxHeight = body.scrollHeight + 'px';
      }
    });
  });

  /* ===== АНИМАЦИЯ ЧИСЕЛ В ИНФО-БЛОКАХ ===== */
  document.querySelectorAll('.ib-number[data-target]').forEach(el => {
    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      obs.disconnect();
      const target = +el.dataset.target, suffix = el.dataset.suffix || '';
      let i = 0; const steps = 48;
      const t = setInterval(() => {
        i++;
        el.textContent = Math.round(target / steps * i).toLocaleString('ru') + suffix;
        if (i >= steps) { el.textContent = target.toLocaleString('ru') + suffix; clearInterval(t); }
      }, 1600 / steps);
    }, { threshold: 0.6 });
    obs.observe(el);
  });
});
