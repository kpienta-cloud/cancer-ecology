/* CEC portal — theme toggle, mobile nav, scroll reveal */
(function () {
  const root = document.documentElement;

  // Theme
  function readTheme() {
    return root.getAttribute('data-theme');
  }
  function setTheme(t) {
    root.setAttribute('data-theme', t);
    const btns = document.querySelectorAll('[data-theme-toggle]');
    btns.forEach((btn) => {
      btn.setAttribute('aria-label', 'Switch to ' + (t === 'dark' ? 'light' : 'dark') + ' mode');
      btn.innerHTML = t === 'dark' ? sunSvg() : moonSvg();
    });
  }
  function sunSvg() {
    return '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="12" cy="12" r="4.2"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>';
  }
  function moonSvg() {
    return '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  }
  const sysDark = matchMedia('(prefers-color-scheme: dark)').matches;
  const initial = sysDark ? 'dark' : 'light';
  setTheme(initial);
  document.addEventListener('click', (e) => {
    const t = e.target.closest('[data-theme-toggle]');
    if (!t) return;
    setTheme(readTheme() === 'dark' ? 'light' : 'dark');
  });

  // Mobile nav toggle
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-mobile-toggle]');
    if (btn) {
      const nav = document.querySelector('.site-nav');
      if (nav) nav.classList.toggle('is-open');
      return;
    }
    const link = e.target.closest('.site-nav a');
    if (link) {
      const nav = document.querySelector('.site-nav');
      if (nav) nav.classList.remove('is-open');
    }
  });

  // Scroll reveal
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.05, rootMargin: '0px 0px 0px 0px' });
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
    // Safety fallback — if reduced motion or if IO doesn't trigger (e.g. headless full-page captures),
    // ensure everything becomes visible after a generous delay so content never stays hidden.
    setTimeout(() => {
      document.querySelectorAll('.reveal:not(.is-visible)').forEach((el) => el.classList.add('is-visible'));
    }, 1200);
  } else {
    document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible'));
  }

  // Layer card hover — connection lines emphasized via class on framework
  const layers = document.querySelector('.layers');
  if (layers) {
    layers.querySelectorAll('.layer-card').forEach((card) => {
      card.addEventListener('mouseenter', () => layers.setAttribute('data-active', card.dataset.layer || ''));
      card.addEventListener('mouseleave', () => layers.removeAttribute('data-active'));
    });
  }
})();
