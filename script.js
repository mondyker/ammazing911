/* ============================================================
   amazing911 — small progressive enhancements.
   The page is fully readable with JavaScript disabled.
   ============================================================ */
(function () {
  'use strict';

  /* ---- footer year stays current without a build step ---- */
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- fade sections in as they enter the viewport ---- */
  if ('IntersectionObserver' in window && !reduceMotion) {
    var targets = document.querySelectorAll('.row, .prose, .panel');

    targets.forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(12px)';
      el.style.transition = 'opacity .5s ease, transform .5s ease';
    });

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.style.opacity = '1';
          e.target.style.transform = 'none';
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

    targets.forEach(function (el) { io.observe(el); });
  }
})();