/* ============================================================
   ВояжСервис — services.js
   Фильтрация и сортировка карточек туров
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  const filterBtns  = document.querySelectorAll('.filter-btn');
  const cards       = document.querySelectorAll('.service-card');
  const sortSelect  = document.getElementById('sortSelect');
  const grid        = document.querySelector('.services-grid');

  /* ===== ФИЛЬТРАЦИЯ ===== */
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;

      cards.forEach((card, i) => {
        const match = filter === 'all' || card.dataset.category === filter;
        if (match) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          card.style.transform = 'translateY(12px)';
          setTimeout(() => {
            card.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
            card.style.opacity    = '1';
            card.style.transform  = 'translateY(0)';
          }, i * 55);
        } else {
          card.style.transition = 'opacity 0.25s ease';
          card.style.opacity    = '0';
          setTimeout(() => { card.style.display = 'none'; }, 260);
        }
      });
    });
  });

  /* ===== СОРТИРОВКА ===== */
  if (sortSelect && grid) {
    sortSelect.addEventListener('change', () => {
      const by  = sortSelect.value;
      const arr = Array.from(cards).filter(c => c.style.display !== 'none');

      arr.sort((a, b) => {
        if (by === 'price-asc')  return +a.dataset.price    - +b.dataset.price;
        if (by === 'price-desc') return +b.dataset.price    - +a.dataset.price;
        if (by === 'days-asc')   return +a.dataset.duration - +b.dataset.duration;
        if (by === 'name-asc')   return a.dataset.name.localeCompare(b.dataset.name, 'ru');
        return 0;
      });

      arr.forEach(c => grid.appendChild(c));
    });
  }

  /* ===== КНОПКА «ПОДРОБНЕЕ» — раскрыть детали ===== */
  document.querySelectorAll('.btn-details').forEach(btn => {
    btn.addEventListener('click', () => {
      const details = btn.closest('.service-card').querySelector('.tour-extra-details');
      if (!details) return;
      const open = details.style.maxHeight && details.style.maxHeight !== '0px';
      details.style.maxHeight = open ? '0px' : details.scrollHeight + 'px';
      btn.textContent = open ? 'Подробнее ↓' : 'Свернуть ↑';
    });
  });
});
