/* ============================================================
   amazing911 — tiny progressive enhancements.
   The page is fully readable with JavaScript disabled.
   ============================================================ */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- footer year stays current without a build step ---- */
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  /* ---- count the 100% stat up once it scrolls into view ---- */
  var target = document.querySelector('[data-count="100"]');

  if (target && 'IntersectionObserver' in window && !reduceMotion) {
    var run = function () {
      var start = performance.now();
      var dur = 1100;

      var tick = function (now) {
        var t = Math.min((now - start) / dur, 1);
        var eased = 1 - Math.pow(1 - t, 3);      // easeOutCubic
        target.textContent = Math.round(eased * 100);
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { run(); io.disconnect(); }
      });
    }, { threshold: 0.5 });

    io.observe(target);
  } else if (target) {
    target.textContent = '100';
  }

  /* ---- reveal sections on scroll (pure CSS fallback stays visible) ---- */
  if ('IntersectionObserver' in window && !reduceMotion) {
    var cards = document.querySelectorAll('.card, .about, .contact-card');
    cards.forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(14px)';
      el.style.transition = 'opacity .6s ease, transform .6s ease';
    });

    var reveal = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.style.opacity = '1';
          e.target.style.transform = 'none';
          reveal.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    cards.forEach(function (el) { reveal.observe(el); });
  }
})();