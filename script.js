/* =============================================
   Mise — script.js
   Light interactivity: nav, scroll effects,
   mobile menu, form, scroll-reveal
   ============================================= */

(function () {
  'use strict';

  /* ---------- Constants ---------- */
  // Vertical offset (px) for each hamburger span when animating to an X
  var HAMBURGER_OFFSET = 7;

  /* ---------- Nav scroll effect ---------- */
  const navWrapper = document.getElementById('nav');

  function onScroll() {
    if (window.scrollY > 10) {
      navWrapper.classList.add('scrolled');
    } else {
      navWrapper.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile hamburger ---------- */
  const hamburger = document.getElementById('hamburger');
  const navLinks   = document.getElementById('navLinks');

  hamburger.addEventListener('click', function () {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen);
    hamburger.classList.toggle('is-open', isOpen);

    // Animate hamburger spans into X
    const spans = hamburger.querySelectorAll('span');
    if (isOpen) {
      spans[0].style.transform = 'translateY(' + HAMBURGER_OFFSET + 'px) rotate(45deg)';
      spans[1].style.opacity   = '0';
      spans[2].style.transform = 'translateY(-' + HAMBURGER_OFFSET + 'px) rotate(-45deg)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity   = '';
      spans[2].style.transform = '';
    }
  });

  // Close menu when a link is clicked
  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      const spans = hamburger.querySelectorAll('span');
      spans[0].style.transform = '';
      spans[1].style.opacity   = '';
      spans[2].style.transform = '';
    });
  });

  /* ---------- Scroll reveal ---------- */
  const revealEls = [];

  function initReveal() {
    // Add .reveal class to key section elements
    const selectors = [
      '.feature-card',
      '.flow__column',
      '.stat-card',
      '.result-metric',
      '.testimonial',
      '.pricing-card',
      '.problem__text',
      '.problem__stats',
    ];

    selectors.forEach(function (sel) {
      document.querySelectorAll(sel).forEach(function (el) {
        el.classList.add('reveal');
        revealEls.push(el);
      });
    });
  }

  function checkReveal() {
    const windowBottom = window.scrollY + window.innerHeight;
    revealEls.forEach(function (el) {
      if (!el.classList.contains('visible')) {
        const elTop = el.getBoundingClientRect().top + window.scrollY;
        if (windowBottom > elTop + 60) {
          el.classList.add('visible');
        }
      }
    });
  }

  initReveal();
  window.addEventListener('scroll', checkReveal, { passive: true });
  // Run once on load to reveal items already in view
  checkReveal();

  /* ---------- CTA Form ---------- */
  const ctaForm = document.getElementById('ctaForm');

  if (ctaForm) {
    ctaForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const nameInput  = ctaForm.querySelector('input[name="name"]');
      const emailInput = ctaForm.querySelector('input[name="email"]');

      // Very basic client-side validation
      let valid = true;

      [nameInput, emailInput].forEach(function (input) {
        input.style.borderColor = '';
        input.style.boxShadow   = '';
        if (!input.value.trim()) {
          input.style.borderColor = '#DC2626';
          input.style.boxShadow   = '0 0 0 3px rgba(220,38,38,.15)';
          valid = false;
        }
      });

      // RFC 5321 / HTML5-compatible email pattern: handles plus signs,
      // multiple dots in local part/domain, and quoted strings.
      var emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
      if (emailInput.value && !emailPattern.test(emailInput.value)) {
        emailInput.style.borderColor = '#DC2626';
        emailInput.style.boxShadow   = '0 0 0 3px rgba(220,38,38,.15)';
        valid = false;
      }

      if (!valid) return;

      // Show success state
      const submitBtn = ctaForm.querySelector('button[type="submit"]');
      submitBtn.textContent = '✓ You\'re on the list!';
      submitBtn.style.background = '#1A9462';
      submitBtn.style.borderColor = '#1A9462';
      submitBtn.disabled = true;

      // Disable inputs
      ctaForm.querySelectorAll('input, select').forEach(function (el) {
        el.disabled = true;
      });
    });
  }

  /* ---------- Smooth scroll for anchor links ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      const navHeight = navWrapper ? navWrapper.offsetHeight : 0;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });

})();
