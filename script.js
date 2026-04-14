/* ============================================================
   GRAN'S HOUSE TATTOOS — script.js
   ============================================================ */

(() => {
  'use strict';

  /* ---------- HAMBURGER / MOBILE NAV ---------- */
  const hamburger   = document.getElementById('hamburger');
  const mobileNav   = document.getElementById('mobile-nav');
  const closeMenu   = document.getElementById('close-menu');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  function openNav() {
    mobileNav.classList.add('is-open');
    hamburger.classList.add('is-active');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }
  function closeNav() {
    mobileNav.classList.remove('is-open');
    hamburger.classList.remove('is-active');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', () =>
    mobileNav.classList.contains('is-open') ? closeNav() : openNav()
  );
  closeMenu.addEventListener('click', closeNav);
  mobileLinks.forEach(link => link.addEventListener('click', closeNav));

  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && mobileNav.classList.contains('is-open')) closeNav();
  });

  /* ---------- SCROLL REVEAL ---------- */
  const revealEls = document.querySelectorAll(
    '.service-card, .about-text, .about-image-wrap, .contact-block, .insta-item, .section-title, .section-label, .section-intro'
  );

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // stagger siblings
        const siblings = [...entry.target.parentElement.querySelectorAll('.reveal')];
        const idx = siblings.indexOf(entry.target);
        entry.target.style.transitionDelay = `${idx * 60}ms`;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
  });

  /* ---------- ACTIVE NAV HIGHLIGHT ---------- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(l => l.removeAttribute('aria-current'));
        const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (active) active.setAttribute('aria-current', 'page');
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => navObserver.observe(s));

  /* ---------- BOOKING FORM ---------- */
  const form    = document.getElementById('booking-form');
  const success = document.getElementById('form-success');
  const submitBtn = document.getElementById('submit-booking');

  form.addEventListener('submit', async e => {
    e.preventDefault();
    
    // Validation
    const nameInput  = form.querySelector('#name');
    const emailInput = form.querySelector('#email');
    const name       = nameInput.value.trim();
    const email      = emailInput.value.trim();

    if (!name || !email) {
      shakeField(!name ? '#name' : '#email');
      return;
    }

    submitBtn.textContent = 'Sending…';
    submitBtn.disabled = true;

    // Prepare data
    const formData = new FormData(form);
    
    try {
      const response = await fetch("https://formspree.io/f/gran@tattoosatgranshouse.com", {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        success.classList.add('is-visible');
        form.reset();
        // Hide success message after 5 seconds
        setTimeout(() => success.classList.remove('is-visible'), 5000);
      } else {
        const data = await response.json();
        if (Object.hasOwn(data, 'errors')) {
          alert(data["errors"].map(error => error["message"]).join(", "));
        } else {
          alert("Oops! There was a problem submitting your form. Please try again.");
        }
      }
    } catch (error) {
      alert("Oops! There was a problem submitting your form. Please check your connection and try again.");
    } finally {
      submitBtn.textContent = 'Send Enquiry';
      submitBtn.disabled = false;
    }
  });

  function shakeField(selector) {
    const el = form.querySelector(selector);
    el.style.animation = 'none';
    el.getBoundingClientRect(); // force reflow
    el.style.animation = 'shake 0.4s ease';
    el.focus();
    el.addEventListener('animationend', () => { el.style.animation = ''; }, { once: true });
  }

  // Add shake keyframes via JS (so we don't need them in CSS)
  const shakeStyle = document.createElement('style');
  shakeStyle.textContent = `
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      20%       { transform: translateX(-8px); }
      40%       { transform: translateX(8px); }
      60%       { transform: translateX(-5px); }
      80%       { transform: translateX(5px); }
    }
  `;
  document.head.appendChild(shakeStyle);

  /* ---------- SMOOTH HEADER SHRINK ---------- */
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    header.style.boxShadow = y > 60 ? '0 4px 30px rgba(0,0,0,0.5)' : '0 8px 40px rgba(0,0,0,0.35)';

    /* Vertical Parallax for side elements */
    const heroTeapot = document.querySelector('.btg-teapot--hero');
    const soup       = document.querySelector('.btg-soup');
    const irnBru     = document.querySelector('.btg-irnbru');

    if (heroTeapot) heroTeapot.style.setProperty('--parallax-y', `${y * 0.12}px`);
    if (soup)       soup.style.setProperty('--parallax-y', `${(y - 1800) * 0.08}px`);
    if (irnBru)     irnBru.style.setProperty('--parallax-y', `${(y - 3600) * 0.1}px`);
  }, { passive: true });

})();


