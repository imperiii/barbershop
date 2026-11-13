(function () {
  'use strict';
  const body = document.body;

  // 1. Прибираємо чорний екран завантаження (Loader)
  window.addEventListener('load', () => {
    setTimeout(() => {
      const loader = document.getElementById('loader');
      if(loader) loader.classList.add('is-hidden');
      body.classList.remove('is-loading');
    }, 1000);
  });

  // 2. Ефект шапки при скролі
  const header = document.getElementById('header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('is-scrolled', window.scrollY > 30);
    }, { passive: true });
  }

  // 3. Мобільне меню (Бургер)
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('is-open');
      hamburger.setAttribute('aria-expanded', isOpen);
      body.classList.toggle('no-scroll', isOpen);
    });
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('is-open');
        body.classList.remove('no-scroll');
      });
    });
  }

  // 4. Плавна поява елементів при скролі
  const revealEls = document.querySelectorAll('[data-reveal]');
  if (revealEls.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    revealEls.forEach(el => observer.observe(el));
  }

  // 5. Відправка форми бронювання
  const form = document.getElementById('bookingForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;
      form.querySelectorAll('[required]').forEach(input => {
        if (!input.value.trim()) {
          input.setAttribute('aria-invalid', 'true');
          valid = false;
        } else {
          input.removeAttribute('aria-invalid');
        }
      });
      if (valid) {
        form.querySelectorAll('.field').forEach(f => f.style.display = 'none');
        const success = document.getElementById('bookingSuccess');
        if (success) success.hidden = false;
      }
    });
  }

  // 6. Відкриття вікна бронювання (якщо є кнопки)
  const bookingBtns = document.querySelectorAll('[data-open-booking]');
  bookingBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Плавний скрол до форми бронювання
      const bookingSection = document.getElementById('booking');
      if (bookingSection) {
        bookingSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

})();
