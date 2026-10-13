/* صفحة معرض الخدمة — تقرأ الخدمة من الرابط: service.html#brand */
(function () {
  const $ = s => document.querySelector(s);
  const bySlug = Object.fromEntries(SERVICES.map(s => [s.slug, s]));
  const msg = s => `مرحبًا نور كرييتف،\nبدي أطلب خدمة: ${s.title}\nممكن تفاصيل أكثر عن الأسعار وطريقة الشغل؟`;
  let cur = null, items = [], idx = 0;

  // tabs
  $('#spTabs').innerHTML = SERVICES.map(s =>
    `<a href="#${s.slug}" data-slug="${s.slug}"><svg viewBox="0 0 24 24" aria-hidden="true">${s.icon}</svg><span>${s.title}</span></a>`).join('');

  function render(slug, scroll) {
    const s = bySlug[slug] || SERVICES[0];
    cur = s;
    document.title = `${s.title} — NOOR CREATIVE`;
    $('#crumbNow').textContent = s.title;
    $('#spEn').textContent = `${s.n} — ${s.en}`;
    $('#spTitle').textContent = s.title;
    $('#spLong').textContent = s.long;
    $('#spIcon').innerHTML = s.icon;
    $('#spNum').textContent = s.n;
    $('#spInc').innerHTML = s.inc.map(t => `<li><i></i>${t}</li>`).join('');
    $('#galName').textContent = s.title;
    const link = waLink(msg(s));
    ['#spWa', '#navWa', '#emptyWa', '#waFloat', '#wa1'].forEach(q => $(q).href = link);
    $('#wa2').href = waLink(msg(s), 1);
    document.querySelectorAll('#spTabs a').forEach(a => a.classList.toggle('on', a.dataset.slug === s.slug));
    const on = document.querySelector('#spTabs a.on'); on && on.scrollIntoView({ inline: 'center', block: 'nearest' });

    items = s.works;
    const n = items.length;
    $('#galCount').textContent = n ? `${n} ${n > 10 || n < 3 ? 'عمل' : 'أعمال'}` : '';
    $('#empty').hidden = !!n;
    const FB = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 8h3V4h-3c-2.8 0-4.5 1.9-4.5 4.6V11H7v4h2.5v8h4v-8H17l.6-4h-4.1V8.9c0-.6.3-.9.5-.9Z"/></svg>';
    const YT = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12a31 31 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.8 31 31 0 0 0-.5-4.8ZM9.7 15.1V8.9L15.5 12Z"/></svg>';
    $('#masonry').innerHTML = items.map((w, i) => {
      const k = workKind(w), th = workThumb(w), vert = workVertical(w);
      let media;
      if (k === 'video') media = `<video src="${encodeURI(w.src)}#t=0.6" ${w.poster ? `poster="${encodeURI(w.poster)}"` : ''} muted loop playsinline preload="metadata"></video><span class="wi-play"></span>`;
      else if (k === 'image') media = `<img src="${encodeURI(w.src)}" alt="${w.title || ''}" loading="lazy">`;
      else media = (th
        ? `<img src="${/^https?:/.test(th) ? th : encodeURI(th)}" alt="${w.title || ''}" loading="lazy" class="${vert ? 'v' : ''}">`
        : `<span class="wi-ph${vert ? ' v' : ''}"><i class="wi-ph-orb"></i><img src="img/mark.png" alt=""></span>`)
        + `<span class="wi-play"></span><span class="wi-src ${k}">${k === 'facebook' ? FB : YT}</span>`;
      return `
      <button class="work-item" data-i="${i}" aria-label="عرض ${w.title || 'العمل'}">
        ${media}
        <span class="wi-info"><b>${w.title || ''}</b>${w.client ? `<small>${w.client}</small>` : ''}</span>
      </button>`;
    }).join('');
    document.querySelectorAll('.work-item video').forEach(v => {
      v.parentElement.addEventListener('pointerenter', () => v.play().catch(() => {}));
      v.parentElement.addEventListener('pointerleave', () => v.pause());
    });
    document.body.classList.remove('sp-in'); void document.body.offsetWidth; document.body.classList.add('sp-in');
    if (scroll) scrollTo({ top: 0, behavior: 'smooth' });
  }

  const slugFromHash = () => (location.hash || '').replace('#', '');
  addEventListener('hashchange', () => { const h = slugFromHash(); if (bySlug[h]) render(h, true); });
  render(bySlug[slugFromHash()] ? slugFromHash() : SERVICES[0].slug);

  // gallery anchor shouldn't change service
  document.querySelector('a[href="#gallery"]').addEventListener('click', e => { e.preventDefault(); $('#gallery').scrollIntoView({ behavior: 'smooth' }); });

  // lightbox
  const lb = $('#lb');
  function show(i) {
    idx = (i + items.length) % items.length; const w = items[idx];
    const k = workKind(w);
    $('#lbMedia').innerHTML = k === 'video'
      ? `<video src="${encodeURI(w.src)}" ${w.poster ? `poster="${encodeURI(w.poster)}"` : ''} controls autoplay playsinline></video>`
      : k === 'image' ? `<img src="${encodeURI(w.src)}" alt="${w.title || ''}">`
      : `<iframe class="lb-embed${workVertical(w) ? ' v' : ''}" src="${workEmbed(w)}" title="${w.title || 'فيديو'}" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share; fullscreen" allowfullscreen loading="lazy"></iframe>`;
    $('#lbCap').innerHTML = `<b>${w.title || ''}</b>${w.client ? ` · ${w.client}` : ''}`;
  }
  $('#masonry').addEventListener('click', e => {
    const b = e.target.closest('.work-item'); if (!b) return;
    show(+b.dataset.i); lb.hidden = false; document.body.style.overflow = 'hidden'; $('#lbX').focus();
  });
  const close = () => { lb.hidden = true; $('#lbMedia').innerHTML = ''; document.body.style.overflow = ''; };
  $('#lbX').onclick = close;
  $('#lbPrev').onclick = () => show(idx - 1);
  $('#lbNext').onclick = () => show(idx + 1);
  lb.addEventListener('click', e => { if (e.target === lb) close(); });
  addEventListener('keydown', e => {
    if (lb.hidden) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(idx + 1);
    if (e.key === 'ArrowRight') show(idx - 1);
  });

  // nav solid always on this page; brand glow on scroll
  addEventListener('scroll', () => $('#nav').classList.toggle('lift', scrollY > 30), { passive: true });
})();
