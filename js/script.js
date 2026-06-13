/* ============================================================
   ChillCraft Press — Scripts
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ============================================================
     NAV SCROLL EFFECT
     ============================================================ */
  const nav = document.querySelector('.nav');
  const scrollThreshold = 60;

  function handleNavScroll() {
    if (window.scrollY > scrollThreshold) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll(); // initial check

  /* ============================================================
     MOBILE MENU TOGGLE
     ============================================================ */
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const isOpen = navLinks.classList.contains('open');
      navToggle.setAttribute('aria-expanded', isOpen);
      navToggle.innerHTML = isOpen
        ? '<i class="fas fa-times"></i>'
        : '<i class="fas fa-bars"></i>';
    });

    // Close menu on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.innerHTML = '<i class="fas fa-bars"></i>';
      });
    });
  }

  /* ============================================================
     SCROLL ANIMATIONS (Intersection Observer)
     ============================================================ */
  const fadeElements = document.querySelectorAll('.fade-in');

  if (fadeElements.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Optionally unobserve after animation to save performance
          // observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    });

    fadeElements.forEach(el => observer.observe(el));
  }

  /* ============================================================
     SMOOTH SCROLL FOR ANCHOR LINKS
     ============================================================ */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const offset = 80; // nav height
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  /* ============================================================
     PARALLAX BADGE / COUNTER ANIMATION
     ============================================================ */
  // Animate stat numbers on scroll
  const statNumbers = document.querySelectorAll('.hero-stat-number');

  function animateValue(el, target) {
    let current = 0;
    const increment = Math.ceil(target / 60);
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = current + (target === 100 ? '%' : '');
    }, 20);
  }

  // Start counter animation when stats section is visible
  const heroStats = document.querySelector('.hero-stats');
  if (heroStats) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const statValues = [100, 48, 99];
          const statEls = heroStats.querySelectorAll('.hero-stat-number');
          statEls.forEach((el, i) => {
            const text = el.textContent.trim();
            const target = parseInt(text) || statValues[i];
            el.textContent = '0';
            animateValue(el, target);
          });
          statsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    statsObserver.observe(heroStats);
  }

  console.log('ChillCraft Press — site initialized.');
});
