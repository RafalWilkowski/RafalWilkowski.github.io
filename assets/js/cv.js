/* Renders cv.html (printable A4 CV) from window.CV. Add ?print to the URL to open the print dialog automatically. */
(function () {
  'use strict';
  var CV = window.CV, h = window.h;
  if (!CV || !h) return;
  function $(id) { return document.getElementById(id); }
  function bare(url) { try { url = decodeURIComponent(url); } catch (e) {} return url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, ''); }

  document.title = CV.name + ' - CV';
  $('cv-name').textContent = CV.name;
  $('cv-headline').innerHTML = CV.headline.replace(/(Unity\s*\/\s*C#)/, '<span class="hl">$1</span>');

  var photo = $('cv-photo');
  if (CV.cv && CV.cv.photo) photo.hidden = false; else photo.remove();

  // Small line icons, same stroke style as the site's hero.
  var ICONS = {
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
    linkedin: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
    pin: '<path d="M12 21s-6-5.3-6-11a6 6 0 0 1 12 0c0 5.7-6 11-6 11z"/><circle cx="12" cy="10" r="2.5"/>'
  };
  function icon(name) {
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 24 24'); svg.setAttribute('aria-hidden', 'true');
    svg.innerHTML = ICONS[name];
    return svg;
  }

  // Location line above the name, the open-to-work line under the headline (same label as the site's pill).
  if (CV.status && CV.status.open) {
    var looking = $('cv-looking');
    looking.hidden = false;
    looking.appendChild(h('b', { text: CV.status.label + ' as:' }));
    looking.appendChild(document.createTextNode(CV.status.lookingFor));
  }
  $('cv-meta').appendChild(icon('pin'));
  $('cv-meta').appendChild(document.createTextNode(CV.location + ' · ' + CV.timezone + ' (' + CV.timezoneNote + ')'));

  // Contact block on the right of the header band.
  var contact = $('cv-contact');
  function item(name, node) { contact.appendChild(h('li', {}, [icon(name), node])); }
  item('mail', h('a', { href: 'mailto:' + CV.contact.email, text: CV.contact.email }));
  if (CV.contact.linkedin) item('linkedin', h('a', { href: CV.contact.linkedin, text: bare(CV.contact.linkedin) }));
  if (CV.contact.website) item('globe', h('a', { href: CV.contact.website, text: bare(CV.contact.website) }));

  // Three key facts under the header, same data as the site's hero.
  var stats = $('cv-stats');
  (CV.stats || []).forEach(function (st) {
    stats.appendChild(h('li', { class: 'cv-stat' }, [
      h('div', { class: 'cv-stat__value' }, [st.value, h('small', { text: st.suffix })]),
      h('div', { class: 'cv-stat__label', text: st.label })
    ]));
  });

  var summary = $('cv-summary');
  CV.summary.forEach(function (p) { summary.appendChild(h('p', { text: p })); });

  var exp = $('cv-experience');
  // With a single job the period sits next to the section heading instead of in a date gutter.
  var single = CV.experience.length === 1;
  if (single) $('cv-experience-when').textContent = CV.experience[0].period;
  CV.experience.forEach(function (job) {
    exp.appendChild(h('article', { class: single ? 'cv-job cv-job--single' : 'cv-job' }, [
      single ? null : h('div', { class: 'cv-job__when', text: job.period }),
      h('div', { class: 'cv-job__body' }, [
        h('h3', { class: 'cv-job__role', text: job.role }),
        h('div', { class: 'cv-job__company' }, [job.company, job.meta ? h('span', { text: ' · ' + job.meta }) : null]),
        job.intro ? h('p', { class: 'cv-job__intro', text: job.intro }) : null,
        job.products ? h('p', { class: 'cv-job__products' }, [h('b', { text: 'Titles: ' }), job.products.map(function (pr) { return pr.name + ' (' + pr.note + ')'; }).join(' · ')]) : null,
        h('ul', { class: 'cv-job__bullets' }, job.bullets.map(function (b) { return typeof b === 'string' ? h('li', { text: b }) : h('li', {}, [h('b', { text: b.label + ': ' }), b.text]); }))
      ])
    ]));
  });

  if (CV.education && CV.education.length) {
    $('cv-education-section').hidden = false;
    var edu = $('cv-education');
    CV.education.forEach(function (e) {
      edu.appendChild(h('div', { class: 'cv-job cv-job--edu' }, [
        h('div', { class: 'cv-job__when', text: e.period }),
        h('div', { class: 'cv-job__body' }, [e.url ? h('a', { href: e.url }, [h('b', { text: e.school })]) : h('b', { text: e.school }), h('div', { class: 'cv-job__company', text: e.degree })])
      ]));
    });
  }

  var skills = $('cv-skills');
  CV.skills.forEach(function (g) {
    skills.appendChild(h('div', { class: 'cv-skill-group' }, [
      h('h3', { text: g.group }),
      h('p', { text: g.items.join(' · ') })
    ]));
  });

  var langs = $('cv-languages');
  CV.languages.forEach(function (l) {
    langs.appendChild(h('li', {}, [h('b', { text: l.name }), h('span', { text: l.level })]));
  });

  $('cv-gdpr').textContent = CV.gdprClause || '';

  if (/[?&]print\b/.test(location.search)) {
    var go = function () { setTimeout(function () { window.print(); }, 150); };
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(go); else window.addEventListener('load', go);
  }
})();
