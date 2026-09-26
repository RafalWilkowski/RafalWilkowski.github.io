/* Tiny DOM helper shared by site.js and cv.js. */
window.h = function (tag, attrs, children) {
  var el = document.createElement(tag);
  if (attrs) Object.keys(attrs).forEach(function (k) {
    var v = attrs[k];
    if (k === 'html') el.innerHTML = v;
    else if (k === 'text') el.textContent = v;
    else if (v !== null && v !== undefined && v !== false) el.setAttribute(k, v);
  });
  (children || []).forEach(function (c) {
    if (c === null || c === undefined || c === false) return;
    el.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
  });
  return el;
};
