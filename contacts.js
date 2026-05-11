/* ============================================================
   ВояжСервис — contacts.js
   Валидация формы обратной связи, маска телефона
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  const form       = document.getElementById('contactForm');
  const submitBtn  = document.getElementById('submitBtn');
  const successMsg = document.getElementById('successMessage');
  if (!form) return;

  /* ===== МАСКА ТЕЛЕФОНА ===== */
  const phoneInput = document.getElementById('phone');
  if (phoneInput) {
    phoneInput.addEventListener('input', e => {
      let raw = e.target.value.replace(/\D/g, '');
      if (raw.length && raw[0] === '8') raw = '7' + raw.slice(1);
      if (raw.length && raw[0] !== '7') raw = '7' + raw;
      raw = raw.slice(0, 11);

      let out = '';
      if (raw.length > 0)  out = '+7';
      if (raw.length > 1)  out += ' (' + raw.slice(1, 4);
      if (raw.length >= 4) out += ') ' + raw.slice(4, 7);
      if (raw.length >= 7) out += '-' + raw.slice(7, 9);
      if (raw.length >= 9) out += '-' + raw.slice(9, 11);

      e.target.value = out;
    });
  }

  /* ===== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ===== */
  const setError = (inp, msg) => {
    inp.classList.add('error'); inp.classList.remove('valid');
    const err = inp.closest('.form-group').querySelector('.form-error');
    if (err) { err.textContent = msg; err.classList.add('show'); }
  };

  const setValid = inp => {
    inp.classList.remove('error'); inp.classList.add('valid');
    const err = inp.closest('.form-group').querySelector('.form-error');
    if (err) err.classList.remove('show');
  };

  const clearState = inp => {
    inp.classList.remove('error', 'valid');
    const err = inp.closest('.form-group')?.querySelector('.form-error');
    if (err) err.classList.remove('show');
  };

  const isEmail = v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  const isPhone = v => v.replace(/\D/g, '').length === 11;

  /* ===== ВАЛИДАЦИЯ ОДНОГО ПОЛЯ ===== */
  function validateField(inp) {
    const v = inp.value.trim(), n = inp.name;
    if (!v)                               { setError(inp, 'Заполните это поле'); return false; }
    if (n === 'name'    && v.length < 2)  { setError(inp, 'Минимум 2 символа'); return false; }
    if (n === 'email'   && !isEmail(v))   { setError(inp, 'Введите корректный e-mail'); return false; }
    if (n === 'phone'   && !isPhone(v))   { setError(inp, 'Введите полный номер телефона'); return false; }
    if (n === 'message' && v.length < 10) { setError(inp, 'Минимум 10 символов'); return false; }
    setValid(inp); return true;
  }

  /* ===== ВАЛИДАЦИЯ В РЕАЛЬНОМ ВРЕМЕНИ ===== */
  form.querySelectorAll('.form-control').forEach(inp => {
    inp.addEventListener('blur',  () => validateField(inp));
    inp.addEventListener('input', () => { if (inp.classList.contains('error')) validateField(inp); });
  });

  /* ===== ОТПРАВКА ФОРМЫ ===== */
  form.addEventListener('submit', e => {
    e.preventDefault();
    let ok = true;
    form.querySelectorAll('.form-control[required]').forEach(inp => { if (!validateField(inp)) ok = false; });
    if (!ok) return;

    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner"></span> Отправка...';

    // Симуляция отправки (1.8 сек)
    setTimeout(() => {
      form.style.display    = 'none';
      successMsg.classList.add('show');
      submitBtn.disabled    = false;
    }, 1800);
  });

  /* ===== ПОВТОРНАЯ ОТПРАВКА ===== */
  const resetBtn = document.getElementById('resetBtn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      form.reset();
      form.style.display = 'block';
      successMsg.classList.remove('show');
      form.querySelectorAll('.form-control').forEach(clearState);
    });
  }
});
