/* Renders index.html from window.CV (assets/js/cv-data.js). No dependencies. */
(function () {
  'use strict';
  var CV = window.CV, h = window.h;
  if (!CV || !h) return;
  function $(id) { return document.getElementById(id); }

  /* ---------- inline icons (24x24, stroke) ---------- */
  var ICONS = {
    compass: '<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2.2 5.3-4.8 1.7 2.2-5.3z"/>',
    sparkles: '<path d="M12 3l1.8 4.7L18.5 9.5l-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8z"/><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z"/><path d="M5 16l.6 1.4L7 18l-1.4.6L5 20l-.6-1.4L3 18l1.4-.6z"/>',
    memory: '<rect x="4" y="6" width="16" height="12" rx="2"/><path d="M8 6V4m4 2V4m4 2V4M8 20v-2m4 2v-2m4 2v-2M8 10h8M8 14h5"/>',
    database: '<ellipse cx="12" cy="6" rx="7" ry="3"/><path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6"/><path d="M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6"/>',
    trophy: '<path d="M8 4h8v5a4 4 0 0 1-8 0z"/><path d="M8 6H5a3 3 0 0 0 3 4m8-4h3a3 3 0 0 1-3 4M12 13v3m-4 4h8m-6 0v-4h4v4"/>',
    rocket: '<path d="M5 15c-1.5 1.5-1.5 4-1.5 4s2.5 0 4-1.5"/><path d="M14 4c3 0 6 3 6 6-2 3-6 7-9 8l-5-5c1-3 5-7 8-9z"/><circle cx="14.5" cy="9.5" r="1.5"/><path d="m11 6-5 1 2 2m6 7 1 5 2-2"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
    linkedin: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>',
    download: '<path d="M12 3v12m0 0 4-4m-4 4-4-4M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"/>',
    external: '<path d="M14 4h6v6m0-6L10 14M20 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h5"/>',
    pin: '<path d="M12 21s-6-5.3-6-11a6 6 0 0 1 12 0c0 5.7-6 11-6 11z"/><circle cx="12" cy="10" r="2.5"/>'
  };
  function icon(name) {
    var s = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    s.setAttribute('viewBox', '0 0 24 24');
    s.setAttribute('aria-hidden', 'true');
    s.innerHTML = ICONS[name] || '';
    return s;
  }
  function extLink(attrs, children) {
    attrs.target = '_blank'; attrs.rel = 'noopener';
    return h('a', attrs, children.concat([h('span', { class: 'sr-only', text: ' (opens in a new tab)' })]));
  }
  function btn(opts) {
    var attrs = { class: 'btn' + (opts.primary ? ' btn--primary' : ''), href: opts.href, download: opts.download ? '' : null };
    var kids = [icon(opts.icon), h('span', { text: opts.label })];
    return opts.external ? extLink(attrs, kids) : h('a', attrs, kids);
  }

  /* ---------- hero ---------- */
  var status = $('status');
  if (CV.status && CV.status.open) {
    status.hidden = false;
    status.querySelector('.status__label').textContent = CV.status.label;
    var mode = status.querySelector('.status__mode');
    [CV.workMode, CV.timezone].forEach(function (part, i) {
      if (i) mode.appendChild(h('span', { class: 'status__dotsep', text: '·' }));
      mode.appendChild(h('span', { class: 'nowrap', text: part }));
    });
    mode.appendChild(h('span', { class: 'status__dotsep', text: '·' }));
    var loc = h('span', { class: 'nowrap' }, [icon('pin'), CV.location]);
    mode.appendChild(loc);
  }
  $('hero-name').textContent = CV.name;
  $('hero-headline').innerHTML = CV.headline.replace(/(Unity\s*\/\s*C#)/, '<span class="hl">$1</span>');
  // Tagline: "\n" = forced line break; " · " separates phrases that must not wrap internally.
  var tag = $('hero-tagline');
  CV.tagline.split('\n').forEach(function (line, i) {
    if (i) tag.appendChild(document.createElement('br'));
    line.split(' · ').forEach(function (part, j) {
      if (j) tag.appendChild(document.createTextNode(' · '));
      tag.appendChild(h('span', { class: 'nowrap', text: part }));
    });
  });

  var cta = $('hero-cta');
  cta.appendChild(btn({ primary: true, icon: 'mail', label: 'Email me', href: 'mailto:' + CV.contact.email }));
  cta.appendChild(btn({ icon: 'download', label: 'Download CV', href: 'Rafal_Wilkowski_CV.pdf', download: true }));
  if (CV.contact.linkedin) cta.appendChild(btn({ icon: 'linkedin', label: 'LinkedIn', href: CV.contact.linkedin, external: true }));

  var stats = $('stats');
  (CV.stats || []).forEach(function (s) {
    stats.appendChild(h('li', { class: 'stat' }, [
      h('div', { class: 'stat__value' }, [s.value, h('small', { text: s.suffix })]),
      h('div', { class: 'stat__label', text: s.label })
    ]));
  });

  /* ---------- about ---------- */
  var about = $('about-body');
  CV.summary.forEach(function (p) { about.appendChild(h('p', { text: p })); });

  /* ---------- highlights ---------- */
  var hl = $('highlights');
  CV.highlights.forEach(function (item) {
    hl.appendChild(h('article', { class: 'card reveal' }, [
      h('div', { class: 'card__icon' }, [icon(item.icon)]),
      h('h3', { text: item.title }),
      h('p', { text: item.text })
    ]));
  });

  /* ---------- experience ---------- */
  var exp = $('experience-list');
  CV.experience.forEach(function (job, i) {
    var company = job.url ? extLink({ href: job.url }, [job.company]) : h('span', { text: job.company });
    exp.appendChild(h('li', { class: 'job' + (i === 0 ? ' job--current' : '') }, [
      h('div', { class: 'job__top' }, [
        h('h3', { class: 'job__role', text: job.role }),
        h('span', { class: 'job__period', text: job.period })
      ]),
      h('div', { class: 'job__company' }, [company, job.meta ? h('span', { class: 'job__meta', text: ' · ' + job.meta }) : null]),
      job.intro ? h('p', { class: 'job__intro', text: job.intro }) : null,
      job.products ? h('ul', { class: 'products' }, job.products.map(function (pr) {
        return h('li', { class: 'product' }, [
          h('span', { class: 'product__name', text: pr.name }),
          h('span', { class: 'product__note', text: pr.note }),
          h('span', { class: 'product__links' }, pr.links.map(function (l) { return extLink({ href: l.url }, [l.label]); }))
        ]);
      })) : null
      // Bullets are intentionally not rendered on the site (the "What I own" cards carry them); the CV uses them.
    ]));
  });
  (CV.education || []).forEach(function (e) {
    exp.appendChild(h('li', { class: 'job job--edu' }, [
      h('div', { class: 'job__top' }, [
        h('h3', { class: 'job__role' }, [e.url ? extLink({ href: e.url }, [e.school]) : e.school]),
        h('span', { class: 'job__period', text: e.period })
      ]),
      h('div', { class: 'job__company', text: e.degree })
    ]));
  });

  /* ---------- skills ---------- */
  var skills = $('skills-list');
  CV.skills.forEach(function (g) {
    skills.appendChild(h('div', { class: 'skill-group' }, [
      h('h3', { text: g.group }),
      h('ul', { class: 'chips' }, g.items.map(function (t) { return h('li', { class: 'chip', text: t }); }))
    ]));
  });

  /* ---------- earlier projects (compact list) ---------- */
  var projects = $('projects-list');
  CV.projects.forEach(function (p) {
    projects.appendChild(h('li', { class: 'archive__row' }, [
      h('div', { class: 'archive__main' }, [
        h('span', { class: 'archive__title', text: p.title }),
        h('span', { class: 'archive__meta', text: p.platform })
      ]),
      h('div', { class: 'archive__role', text: p.role }),
      h('div', { class: 'archive__links' }, p.links.map(function (l) {
        return extLink({ href: l.url }, [l.label, icon('external')]);
      }))
    ]));
  });

  /* ---------- contact ---------- */
  $('contact-text').textContent = 'I am looking forward to meeting a new team and new games to work on, and I am happy to talk through how I approached any of the systems above, the decisions and stories behind them.';
  var actions = $('contact-actions');
  actions.appendChild(btn({ primary: true, icon: 'mail', label: 'Email me', href: 'mailto:' + CV.contact.email }));
  actions.appendChild(btn({ icon: 'download', label: 'Download CV (PDF)', href: 'Rafal_Wilkowski_CV.pdf', download: true }));
  if (CV.contact.linkedin) actions.appendChild(btn({ icon: 'linkedin', label: 'LinkedIn', href: CV.contact.linkedin, external: true }));
  actions.appendChild(h('div', { class: 'contact-card__email', text: CV.contact.email }));

  $('year').textContent = new Date().getFullYear();

  /* ---------- back to top (the sticky header is its own #top, so scroll explicitly) ---------- */
  $('back-to-top').addEventListener('click', function (e) {
    e.preventDefault();
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    if (history.replaceState) history.replaceState(null, '', location.pathname + location.search);
  });

  /* ---------- theme toggle ---------- */
  var root = document.documentElement;
  var toggle = $('theme-toggle');
  function syncTheme() {
    var dark = root.getAttribute('data-theme') === 'dark';
    toggle.setAttribute('aria-pressed', String(dark));
    toggle.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', getComputedStyle(root).getPropertyValue('--bg').trim() || '#0a0d12');
  }
  toggle.addEventListener('click', function () {
    var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
    syncTheme();
  });

  syncTheme();

  /* ---------- reveal (bento cards only, subtle) ---------- */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -5% 0px', threshold: 0.05 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------- active nav link ---------- */
  var links = document.querySelectorAll('.nav__links a');
  var sections = Array.prototype.map.call(links, function (a) { return document.querySelector(a.getAttribute('href')); });
  if ('IntersectionObserver' in window) {
    var ratios = new Map();
    var nav = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { ratios.set(e.target, e.isIntersecting ? e.intersectionRatio : 0); });
      var best = null, bestRatio = 0;
      sections.forEach(function (s) { var r = ratios.get(s) || 0; if (r > bestRatio) { bestRatio = r; best = s; } });
      links.forEach(function (a, i) { a.classList.toggle('is-active', sections[i] === best); });
    }, { rootMargin: '-30% 0px -50% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] });
    sections.forEach(function (s) { if (s) nav.observe(s); });
  }
})();
