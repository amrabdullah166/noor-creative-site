/* معرض الأعمال في الصفحة الرئيسية — يُبنى من data.js */
(function () {
  const grid = document.getElementById('workGrid');
  if (!grid || typeof SERVICES === 'undefined') return;
  grid.innerHTML = SERVICES.map(s => {
    const enc = u => /^https?:/.test(u) ? u : encodeURI(u);
    const first = s.works.find(w => workThumb(w) || workKind(w) === 'video');
    const cover = !first ? '' : workThumb(first)
      ? `<img src="${enc(workThumb(first))}" alt="${s.title}" loading="lazy">`
      : `<video src="${enc(first.src)}#t=0.6" muted playsinline preload="metadata"></video>`;
    const count = s.works.length;
    return `<a class="gal-card${cover ? ' has-cover' : ''}" href="service.html#${s.slug}" data-cursor="المعرض" data-tilt>
      <div class="gal-cover">
        ${cover ? cover : `<span class="gal-orb"></span><svg viewBox="0 0 24 24" aria-hidden="true">${s.icon}</svg>`}
      </div>
      <div class="gal-info">
        <span class="gal-n">${s.n}</span>
        <div><h3>${s.title}</h3><small>${count ? count + (count > 10 || count < 3 ? ' عمل' : ' أعمال') : 'تصفّح المعرض'}</small></div>
        <span class="gal-go">↖</span>
      </div>
    </a>`;
  }).join('');
})();
