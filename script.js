/* TANJA Web V2 — script.js
   Progressive enhancement only. The page is fully readable in English with JavaScript off.
   Jobs: (1) language switch + remembered choice, (2) mobile menu, (3) header over the hero,
         (4) current-section marker, (5) keep placeholder links from jumping to the top.
   No libraries, no network requests. */
(function () {
  'use strict';

  var STORAGE_KEY = 'tanja-lang';           // same key as the inline boot script in index.html <head>
  var LANGS = ['en', 'sw', 'ja'];
  var root = document.documentElement;

  /* ---------- storage (may be blocked: private mode, blocked site data) ---------- */
  function readLang() {
    try {
      var v = window.localStorage.getItem(STORAGE_KEY);
      return LANGS.indexOf(v) > -1 ? v : null;
    } catch (e) { return null; }
  }
  function writeLang(lang) {
    try { window.localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* choice just isn't remembered */ }
  }

  /* ---------- 1. language ---------- */
  var switchers = [].slice.call(document.querySelectorAll('[data-set-lang]'));
  var titleEl = document.querySelector('title');
  var descEl = document.querySelector('meta[name="description"]');
  var altEls = [].slice.call(document.querySelectorAll('[data-alt-sw]'));

  // Keep the English originals so we can switch back.
  var original = {
    title: titleEl ? titleEl.textContent : '',
    desc: descEl ? descEl.getAttribute('content') : ''
  };
  altEls.forEach(function (el) { el.setAttribute('data-alt-en', el.getAttribute('alt') || ''); });

  function applyLang(lang, persist) {
    if (LANGS.indexOf(lang) < 0) lang = 'en';
    root.setAttribute('data-lang', lang);
    root.setAttribute('lang', lang);

    switchers.forEach(function (btn) {
      btn.setAttribute('aria-pressed', btn.getAttribute('data-set-lang') === lang ? 'true' : 'false');
    });

    if (titleEl) titleEl.textContent = lang === 'en' ? original.title : (titleEl.getAttribute('data-' + lang) || original.title);
    if (descEl) descEl.setAttribute('content', lang === 'en' ? original.desc : (descEl.getAttribute('data-' + lang) || original.desc));
    altEls.forEach(function (el) {
      el.setAttribute('alt', el.getAttribute('data-alt-' + lang) || el.getAttribute('data-alt-en'));
    });

    if (persist) writeLang(lang);
  }

  switchers.forEach(function (btn) {
    btn.addEventListener('click', function () { applyLang(btn.getAttribute('data-set-lang'), true); });
  });

  // English is the default; a saved SW/JP choice was already applied by the boot script — sync titles/alts/buttons to it.
  applyLang(readLang() || 'en', false);

  /* ---------- 2. mobile menu ---------- */
  var header = document.querySelector('[data-header]');
  var menuBtn = document.querySelector('.menu-btn');
  var nav = document.getElementById('site-nav');
  var main = document.getElementById('main');
  var mqDesktop = window.matchMedia('(min-width: 60em)');

  function setMenu(open, returnFocus) {
    if (!header || !menuBtn) return;
    header.classList.toggle('is-menu-open', open);
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    document.body.classList.toggle('menu-open', open);
    if (main) { if (open) main.setAttribute('inert', ''); else main.removeAttribute('inert'); }
    if (open) {
      var first = nav && nav.querySelector('a');
      if (first) first.focus();
    } else if (returnFocus) {
      menuBtn.focus();
    }
  }

  if (menuBtn && nav) {
    menuBtn.addEventListener('click', function () {
      setMenu(menuBtn.getAttribute('aria-expanded') !== 'true', true);
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setMenu(false, false);          // anchor navigation closes the sheet
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menuBtn.getAttribute('aria-expanded') === 'true') setMenu(false, true);
    });
    var onBreakpoint = function () { if (mqDesktop.matches) setMenu(false, false); };
    if (mqDesktop.addEventListener) mqDesktop.addEventListener('change', onBreakpoint);
    else if (mqDesktop.addListener) mqDesktop.addListener(onBreakpoint);
  }

  /* ---------- 3. header: transparent over the hero, solid after it ---------- */
  var hero = document.getElementById('home');
  if (header && hero && 'IntersectionObserver' in window) {
    var headerH = header.getBoundingClientRect().height || 72;
    new IntersectionObserver(function (entries) {
      header.classList.toggle('is-solid', !entries[0].isIntersecting);
    }, { rootMargin: '-' + Math.round(headerH) + 'px 0px 0px 0px', threshold: 0 }).observe(hero);
  } else if (header) {
    header.classList.add('is-solid');                              // no IntersectionObserver: stay readable
  }

  /* ---------- 4. current-section marker ---------- */
  var links = [].slice.call(document.querySelectorAll('.site-nav a[href^="#"]'));
  var targets = links.map(function (a) { return document.querySelector(a.getAttribute('href')); });
  if ('IntersectionObserver' in window && links.length) {
    var visible = {};
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { visible[en.target.id] = en.isIntersecting ? en.intersectionRatio : 0; });
      var best = null, bestRatio = 0;
      targets.forEach(function (t) {
        if (t && (visible[t.id] || 0) > bestRatio) { best = t.id; bestRatio = visible[t.id]; }
      });
      links.forEach(function (a) {
        if (best && a.getAttribute('href') === '#' + best) a.setAttribute('aria-current', 'true');
        else a.removeAttribute('aria-current');
      });
    }, { rootMargin: '-25% 0px -55% 0px', threshold: [0, 0.01, 0.25, 0.5, 1] });
    targets.forEach(function (t) { if (t) spy.observe(t); });
  }

  /* ---------- 5. placeholder links (href="#") must not scroll the page to the top ---------- */
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[data-placeholder-link]');
    if (a) e.preventDefault();
  });

  /* Everything above is wired: CSS may now switch to the enhanced header and menu. */
  root.classList.add('js-ready');
})();
