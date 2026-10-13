/* مساعد نور — واجهة الشات (تتصل بـ /api/chat على Netlify) */
(function () {
  const API = '/api/chat';
  const KEY = 'noor-chat-v1';
  const WA_NUM = '962791958573';
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isPhone = () => matchMedia('(max-width: 760px)').matches;

  const GREETING = 'أهلًا وسهلًا في **نور كريتف**! 👋✨\nأنا مساعد نور الذكي، موجود أساعدك تتعرف على خدماتنا وتلاقي الحل المناسب لمشروعك.\nكيف بقدر أساعدك اليوم؟';
  const CHIPS = [
    'شو هي نور كريتف؟',
    'بتعملوا فيديوهات بالذكاء الاصطناعي؟',
    'عندي مشروع جديد ومش عارف من وين أبدأ',
    'بدي موقع لمشروعي',
    'شو الفرق بين الموشن وفيديو AI؟'
  ];

  const ico = {
    spark: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5l1.9 5.6 5.6 1.9-5.6 1.9L12 17.5l-1.9-5.6L4.5 10l5.6-1.9z"/><path d="M19 15l.8 2.2 2.2.8-2.2.8L19 21l-.8-2.2-2.2-.8 2.2-.8z"/></svg>',
    close: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    send: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 12H5m6-7-7 7 7 7"/></svg>',
    stop: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="7" y="7" width="10" height="10" rx="2"/></svg>',
    reset: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12a8 8 0 1 0 2.4-5.7M4 4v4.5h4.5"/></svg>',
    wa: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.9 11.9 0 0 0 4.6 4c1.7.7 2.4.8 3.2.7.5-.1 1.5-.6 1.8-1.2.2-.6.2-1.1.1-1.2l-.4-.2Z"/></svg>'
  };

  /* ---------- markup ---------- */
  const root = document.createElement('div');
  root.className = 'nc';
  root.innerHTML = `
    <button class="nc-launch" type="button" aria-label="افتح مساعد نور" aria-expanded="false" aria-controls="ncPanel">
      <span class="nc-orb">${ico.spark}</span><span class="nc-launch-txt">اسأل نور</span>
    </button>
    <div class="nc-teaser" hidden><button class="nc-teaser-x" type="button" aria-label="إخفاء">${ico.close}</button><b>أهلًا بك 👋</b> عندك سؤال عن خدماتنا؟ اسألني.</div>
    <section class="nc-panel" id="ncPanel" role="dialog" aria-modal="false" aria-label="مساعد نور الذكي" data-lenis-prevent hidden>
      <header class="nc-head">
        <div class="nc-id">
          <span class="nc-avatar"><img src="img/mark.png" alt=""></span>
          <div><b>مساعد نور الذكي</b><small><i class="nc-dot"></i><span class="nc-status">متصل الآن · يرد خلال ثوانٍ</span></small></div>
        </div>
        <div class="nc-tools">
          <a class="nc-tool nc-to-wa" href="#" target="_blank" rel="noopener" title="أكمل على واتساب" aria-label="أكمل المحادثة على واتساب">${ico.wa}</a>
          <button class="nc-tool nc-reset" type="button" title="محادثة جديدة" aria-label="محادثة جديدة">${ico.reset}</button>
          <button class="nc-tool nc-close" type="button" title="إغلاق" aria-label="إغلاق">${ico.close}</button>
        </div>
      </header>
      <div class="nc-body" role="log" aria-live="polite" data-lenis-prevent></div>
      <div class="nc-chips" data-lenis-prevent></div>
      <form class="nc-form" autocomplete="off">
        <textarea class="nc-input" rows="1" maxlength="1500" placeholder="اكتب سؤالك هنا…" aria-label="رسالتك"></textarea>
        <button class="nc-send" type="submit" aria-label="إرسال">${ico.send}</button>
      </form>
      <p class="nc-foot">مساعد ذكي — للأسعار والتفاصيل تواصل مع فريقنا على واتساب</p>
    </section>`;
  document.body.appendChild(root);

  const $ = s => root.querySelector(s);
  const launch = $('.nc-launch'), panel = $('.nc-panel'), body = $('.nc-body'), chips = $('.nc-chips'),
    form = $('.nc-form'), input = $('.nc-input'), send = $('.nc-send'), teaser = $('.nc-teaser'), toWa = $('.nc-to-wa');

  /* ---------- state ---------- */
  let msgs = [];
  try { msgs = JSON.parse(sessionStorage.getItem(KEY) || '[]'); } catch { msgs = []; }
  const save = () => { try { sessionStorage.setItem(KEY, JSON.stringify(msgs.slice(-30))); } catch {} };
  let busy = false, ctrl = null;

  /* ---------- safe mini-markdown ---------- */
  const esc = s => s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const okUrl = u => /^(https:\/\/wa\.me\/\d+(\?[^\s]*)?|service\.html(#[\w-]+)?|index\.html(#[\w-]+)?|#[\w-]+)$/.test(u);
  const waHref = () => {
    const lastUser = [...msgs].reverse().find(m => m.role === 'user');
    const txt = `مرحبًا نور كريتف،\nتواصلت معكم من مساعد الموقع.${lastUser ? `\nاستفساري: ${lastUser.content.slice(0, 300)}` : ''}`;
    return `https://wa.me/${WA_NUM}?text=${encodeURIComponent(txt)}`;
  };
  let waShown = false;
  const waBtn = (label) => waShown ? '' : (waShown = true, `<a class="nc-btn-wa" href="${esc(waHref())}" target="_blank" rel="noopener">${ico.wa}<span>${label}</span></a>`);
  function inline(t) {
    // WhatsApp links (even malformed) → placeholder tokens, rendered as our own button at the end
    const wa = [];
    const tok = (label) => { wa.push(label); return `\u0001${wa.length - 1}\u0001`; };
    t = t.replace(/\[([^\]]+)\]\((?:https?:\/\/)?(?:wa\.me|api\.whatsapp\.com)[^)]*\)/g, (m, txt) => tok(txt));
    t = t.replace(/\((?:https?:\/\/)?wa\.me\/[^)]*\)/g, () => tok('تواصل معنا على واتساب'));
    t = t.replace(/(?:https?:\/\/)?wa\.me\/[^\s<)]*/g, () => tok('تواصل معنا على واتساب'));
    t = t.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (m, txt, url) => {
      const u = url.replace(/&amp;/g, '&');
      if (!okUrl(u)) return txt;
      return `<a class="nc-btn-link" href="${esc(u)}">${txt} <i>↖</i></a>`;
    });
    t = t.replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>');
    return t.replace(/\u0001(\d+)\u0001/g, (m, i) => waBtn(wa[+i]));
  }
  function md(src) {
    waShown = false;
    const lines = esc(src).split('\n');
    let html = '', list = null;
    const close = () => { if (list) { html += `</${list}>`; list = null; } };
    for (const raw of lines) {
      const l = raw.trim();
      let m;
      if ((m = l.match(/^[-•*]\s+(.*)/))) { if (list !== 'ul') { close(); html += '<ul>'; list = 'ul'; } html += `<li>${inline(m[1])}</li>`; }
      else if ((m = l.match(/^\d+[.)]\s+(.*)/))) { if (list !== 'ol') { close(); html += '<ol>'; list = 'ol'; } html += `<li>${inline(m[1])}</li>`; }
      else if (!l) { close(); }
      else if ((m = l.match(/^#{1,4}\s+(.*)/))) { close(); html += `<p><b>${inline(m[1])}</b></p>`; }
      else { close(); const h = inline(l).replace(/(<\/a>)\s*[.،:]+/g, '$1'); if (!/<a /.test(h) && !h.replace(/<[^>]*>/g, '').replace(/أو|[\s.،,:؛-]/g, '')) continue; html += `<p>${h}</p>`; }
    }
    close();
    return html;
  }

  /* ---------- render ---------- */
  const scrollEnd = (smooth) => body.scrollTo({ top: body.scrollHeight, behavior: smooth && !reduce ? 'smooth' : 'auto' });
  function bubble(role, text, extra = '') {
    const row = document.createElement('div');
    row.className = `nc-msg ${role === 'user' ? 'me' : 'bot'} ${extra}`;
    row.innerHTML = role === 'user'
      ? `<div class="nc-bub">${esc(text).replace(/\n/g, '<br>')}</div>`
      : `<span class="nc-mini"><img src="img/mark.png" alt=""></span><div class="nc-bub">${md(text)}</div>`;
    body.appendChild(row);
    return row;
  }
  function renderAll() {
    body.innerHTML = '';
    bubble('assistant', GREETING, 'greet');
    msgs.forEach(m => bubble(m.role, m.content));
    renderChips();
    scrollEnd(false);
  }
  function renderChips() {
    const show = !msgs.length;
    chips.hidden = !show;
    chips.innerHTML = show ? CHIPS.map(c => `<button type="button">${c}</button>`).join('') : '';
  }
  function updateWa() {
    const lastUser = [...msgs].reverse().find(m => m.role === 'user');
    const txt = `مرحبًا نور كريتف،\nتواصلت مع مساعد الموقع وبدي أكمل معكم.${lastUser ? `\nسؤالي: ${lastUser.content.slice(0, 300)}` : ''}`;
    toWa.href = `https://wa.me/${WA_NUM}?text=${encodeURIComponent(txt)}`;
  }

  /* ---------- open / close ---------- */
  let lastFocus = null;
  function open() {
    teaser.hidden = true; try { sessionStorage.setItem(KEY + '-t', '1'); } catch {}
    if (!panel.hidden) return;
    lastFocus = document.activeElement;
    panel.hidden = false;
    requestAnimationFrame(() => root.classList.add('open'));
    launch.setAttribute('aria-expanded', 'true');
    document.documentElement.classList.add('nc-on');
    if (isPhone()) document.documentElement.classList.add('nc-lock');
    renderAll(); updateWa();
    setTimeout(() => { if (!isPhone()) input.focus(); }, 250);
  }
  function close() {
    root.classList.remove('open');
    launch.setAttribute('aria-expanded', 'false');
    document.documentElement.classList.remove('nc-on', 'nc-lock');
    setTimeout(() => { if (!root.classList.contains('open')) panel.hidden = true; }, reduce ? 0 : 320);
    lastFocus && lastFocus.focus && lastFocus.focus({ preventScroll: true });
  }
  launch.addEventListener('click', () => root.classList.contains('open') ? close() : open());
  $('.nc-close').addEventListener('click', close);
  $('.nc-reset').addEventListener('click', () => { ctrl && ctrl.abort(); msgs = []; save(); renderAll(); updateWa(); input.focus(); });
  addEventListener('keydown', e => { if (e.key === 'Escape' && root.classList.contains('open')) close(); });
  body.addEventListener('click', e => { const a = e.target.closest('a.nc-btn-link'); if (a && isPhone()) close(); });

  /* on the home page, show the launcher after leaving the hero (like the WhatsApp button) */
  const hero = document.querySelector('.hero');
  const vis = () => true;

  /* teaser bubble (once per session) */
  let teased = false; try { teased = !!sessionStorage.getItem(KEY + '-t'); } catch {}
  if (!teased) setTimeout(function tease() { if (!vis()) { setTimeout(tease, 2000); return; } if (!root.classList.contains('open')) { teaser.hidden = false; requestAnimationFrame(() => teaser.classList.add('in')); } }, 9000);
  teaser.addEventListener('click', e => { if (e.target.closest('.nc-teaser-x')) { teaser.hidden = true; try { sessionStorage.setItem(KEY + '-t', '1'); } catch {} } else open(); });

  /* ---------- input ---------- */
  const grow = () => { input.style.height = 'auto'; input.style.height = Math.min(input.scrollHeight, 130) + 'px'; };
  input.addEventListener('input', grow);
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey && !e.isComposing && !isPhone()) { e.preventDefault(); form.requestSubmit(); }
  });
  chips.addEventListener('click', e => { const b = e.target.closest('button'); if (b) ask(b.textContent); });
  form.addEventListener('submit', e => {
    e.preventDefault();
    if (busy) { ctrl && ctrl.abort(); return; }
    const t = input.value.trim(); if (!t) return;
    input.value = ''; grow(); ask(t);
  });

  /* ---------- talk to API ---------- */
  function setBusy(b) {
    busy = b; root.classList.toggle('busy', b);
    send.innerHTML = b ? ico.stop : ico.send;
    send.setAttribute('aria-label', b ? 'إيقاف' : 'إرسال');
  }
  const fallback = (why) => `${why}\nتقدر تتواصل مع فريقنا مباشرة وبنرد عليك بأسرع وقت:\n[تواصل معنا على واتساب](https://wa.me/${WA_NUM}?text=${encodeURIComponent('مرحبًا نور كريتف، عندي استفسار عن خدماتكم')})`;

  async function ask(text) {
    if (busy) return;
    msgs.push({ role: 'user', content: text.slice(0, 1500) }); save();
    renderChips(); bubble('user', text); updateWa();
    const row = bubble('assistant', '', 'typing');
    const bub = row.querySelector('.nc-bub');
    bub.innerHTML = '<span class="nc-typing"><i></i><i></i><i></i></span>';
    scrollEnd(true);
    setBusy(true);

    if (location.protocol === 'file:') {
      await new Promise(r => setTimeout(r, 600));
      finish(fallback('المساعد بيشتغل لما يكون الموقع مرفوع على Netlify (مش من ملف على الجهاز).'), true);
      return;
    }

    ctrl = new AbortController();
    let acc = '', ended = false;
    try {
      const res = await fetch(API, {
        method: 'POST', signal: ctrl.signal,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: msgs.slice(-14), page: (document.title || '').slice(0, 60) })
      });
      if (!res.ok || !res.body) {
        try { console.warn('[Noor chat]', res.status, await res.clone().text()); } catch {}
        const why = res.status === 429 ? 'وصلت للحد المسموح من الرسائل، جرّب بعد دقيقة.' : 'المساعد غير متاح حاليًا.';
        finish(fallback(why), true); return;
      }
      const reader = res.body.getReader(), dec = new TextDecoder();
      row.classList.remove('typing');
      let pending = false;
      const paint = () => { pending = false; if (ended) return; bub.innerHTML = md(acc) + '<span class="nc-caret"></span>'; const near = body.scrollHeight - body.scrollTop - body.clientHeight < 140; if (near) scrollEnd(false); };
      for (;;) {
        const { value, done } = await reader.read();
        if (done) break;
        acc += dec.decode(value, { stream: true });
        if (!pending) { pending = true; requestAnimationFrame(paint); }
      }
      finish(acc.trim() || 'عذرًا، ما وصلني رد. جرّب مرة ثانية.');
    } catch (err) {
      if (err.name === 'AbortError') finish(acc.trim() ? acc.trim() + ' …' : 'تم الإيقاف.');
      else finish(fallback('صار خلل بالاتصال.'), true);
    }

    function finish(text, local) {
      ended = true;
      row.classList.remove('typing');
      bub.innerHTML = md(text);
      if (!local) { msgs.push({ role: 'assistant', content: text }); save(); }
      setBusy(false); ctrl = null; scrollEnd(true);
      if (!isPhone()) input.focus();
    }
  }

  /* ---------- mobile keyboard / viewport ---------- */
  if (window.visualViewport) {
    const vv = window.visualViewport;
    const fit = () => { root.style.setProperty('--vvh', vv.height + 'px'); root.style.setProperty('--vvt', vv.offsetTop + 'px'); if (root.classList.contains('open')) scrollEnd(false); };
    vv.addEventListener('resize', fit); vv.addEventListener('scroll', fit); fit();
  }

  /* custom cursor hover support */
  root.addEventListener('pointerover', e => { if (e.target.closest('button,a,textarea')) document.querySelector('.cursor')?.classList.add('hover'); });
  root.addEventListener('pointerout', e => { if (e.target.closest('button,a,textarea')) document.querySelector('.cursor')?.classList.remove('hover'); });
})();
