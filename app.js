
(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(pointer: fine)').matches;
  const S = window.NoorScene;
  gsap.registerPlugin(ScrollTrigger);

  /* ---------- smooth scroll ---------- */
  let lenis = null;
  if (!reduce && window.Lenis) {
    lenis = new Lenis({ duration: 1.15, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
    lenis.on('scroll', e => { ScrollTrigger.update(); S && S.setScrollVelocity(e.velocity * 10); mqVel = e.velocity; });
    gsap.ticker.add(t => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
    lenis.stop();
  }
  const goTo = target => lenis ? lenis.scrollTo(target, { offset: 0, duration: 1.6 }) : document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });

  /* ---------- split headings into words (Arabic-safe) ---------- */
  $$('[data-split]').forEach(el => {
    const walk = node => {
      [...node.childNodes].forEach(n => {
        if (n.nodeType === 3) {
          const frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach(w => {
            if (!w) return;
            if (/^\s+$/.test(w)) { frag.appendChild(document.createTextNode(w)); return; }
            const o = document.createElement('span'); o.className = 'split-w';
            const i = document.createElement('span'); i.textContent = w; o.appendChild(i); frag.appendChild(o);
          });
          n.replaceWith(frag);
        } else if (n.nodeType === 1 && n.tagName !== 'BR') {
          if (n.classList.contains('grad')) {
            // keep gradient continuous: wrap whole element
            const o = document.createElement('span'); o.className = 'split-w';
            n.replaceWith(o); const i = document.createElement('span'); i.appendChild(n); o.appendChild(i);
          } else walk(n);
        }
      });
    };
    walk(el);
  });

  /* ---------- nav / menu ---------- */
  const nav = $('#nav'), menuBtn = $('#menuBtn'), waF = $('.wa-float');
  menuBtn.addEventListener('click', () => {
    const open = document.body.classList.toggle('menu-open');
    menuBtn.setAttribute('aria-expanded', open); $('#menu').setAttribute('aria-hidden', !open);
    if (lenis) open ? lenis.stop() : lenis.start();
  });
  $$('[data-link]').forEach(a => a.addEventListener('click', e => {
    const h = a.getAttribute('href'); if (!h || h[0] !== '#') return;
    e.preventDefault();
    if (document.body.classList.contains('menu-open')) { document.body.classList.remove('menu-open'); menuBtn.setAttribute('aria-expanded', false); lenis && lenis.start(); }
    goTo(h === '#top' ? 0 : h);
  }));
  let lastY = 0;
  ScrollTrigger.create({
    start: 0, end: 'max', onUpdate: self => {
      const y = self.scroll();
      nav.classList.toggle('solid', y > 40);
      waF && waF.classList.toggle('show', y > innerHeight * .8);
      lastY = y;
    }
  });
  ['why', 'services', 'process', 'work', 'contact'].forEach(id => ScrollTrigger.create({
    trigger: '#' + id, start: 'top 50%', end: 'bottom 50%',
    onToggle: s => s.isActive && $$('.nav-links a').forEach(a => a.classList.toggle('act', a.getAttribute('href') === '#' + id))
  }));

  /* ---------- preloader → intro ---------- */
  const intro = () => {
    document.body.classList.remove('is-loading');
    lenis && lenis.start();
    const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
    if (S) tl.to(S.state, { intro: 1, duration: 2.4, ease: 'expo.out' }, 0);
    tl.from('.hl > span', { yPercent: 115, rotate: 3, duration: 1.4, stagger: .1, onComplete: () => $$('.hl').forEach(h => h.style.overflow = 'visible') }, .15)
      .from('.hero-top > *', { y: -20, opacity: 0, duration: 1, stagger: .1 }, .5)
      .from('.hero-bottom > *', { y: 30, opacity: 0, duration: 1.1, stagger: .1 }, .7)
      .fromTo('.nav', { y: -30, opacity: 0 }, { y: 0, opacity: 1, duration: 1, clearProps: 'transform,opacity' }, .6)
      .from('.arc', { opacity: 0, y: 120, duration: 2 }, .2);
    $$('[data-count]').forEach(el => gsap.to({ v: 0 }, { v: +el.dataset.count, duration: 2, delay: 1, ease: 'power2.out', onUpdate() { el.textContent = Math.round(this.targets()[0].v); } }));
  };
  if (reduce) { $('#loader').remove(); S && (S.state.intro = 1); document.body.classList.remove('is-loading'); }
  else {
    const c = { v: 0 };
    gsap.timeline({ onComplete: intro })
      .to(c, { v: 100, duration: 1.8, ease: 'power2.inOut', onUpdate: () => { $('#count').textContent = Math.round(c.v); $('#lbar').style.width = c.v + '%'; } })
      .to('.loader-in', { y: -40, opacity: 0, duration: .5, ease: 'power2.in' })
      .to('.loader-panel', { yPercent: -100, duration: .7, ease: 'expo.inOut' }, '-=.2')
      .to('#loader', { yPercent: -100, duration: .9, ease: 'expo.inOut' }, '-=.35')
      .set('#loader', { display: 'none' });
  }

  /* ---------- reveals ---------- */
  if (!reduce) {
    $$('[data-split]').forEach(el => {
      if (el.closest('.hero')) return;
      gsap.from($$('.split-w > span', el), { yPercent: 115, rotate: 4, duration: 1.3, ease: 'expo.out', stagger: .07, scrollTrigger: { trigger: el, start: 'top 85%' } });
    });
    $$('[data-fade]').forEach(el => gsap.from(el, { y: 40, opacity: 0, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 88%' } }));
    gsap.from('.bcard', { y: 80, opacity: 0, duration: 1.2, ease: 'expo.out', stagger: .1, scrollTrigger: { trigger: '.band-grid', start: 'top 85%' } });
    gsap.from('.gal-card', { y: 80, opacity: 0, duration: 1.2, ease: 'expo.out', stagger: .08, scrollTrigger: { trigger: '.gal-index', start: 'top 85%' } });
  }

  /* ---------- horizontal services (desktop) ---------- */
  const track = $('#svcTrack');
  ScrollTrigger.matchMedia({
    '(min-width: 761px)': () => {
      const dist = () => Math.max(0, track.scrollWidth - innerWidth);
      const tw = gsap.to(track, {
        x: () => dist(), ease: 'none',
        scrollTrigger: { trigger: '.svc-pin', start: 'top top', end: () => '+=' + dist(), pin: true, scrub: 1, invalidateOnRefresh: true, anticipatePin: 1 }
      });
      return () => tw.kill();
    }
  });

  /* ---------- process timeline ---------- */
  const steps = $$('.tl-step');
  ScrollTrigger.create({
    trigger: '#timeline', start: 'top 75%', end: 'bottom 45%', scrub: true,
    onUpdate: s => {
      $('#tlFill').style.transform = `scaleX(${s.progress})`;
      steps.forEach((st, i) => st.classList.toggle('on', s.progress >= i / (steps.length - 1) - .02));
    }
  });
  if (innerWidth <= 760) steps.forEach(st => ScrollTrigger.create({ trigger: st, start: 'top 75%', onEnter: () => st.classList.add('on') }));

  /* ---------- 3D sculpture choreography ---------- */
  if (S) {
    const hues = [0, .18, .35, .55, .1, .3, 0];
    $$('[data-blob]').forEach((sec, i) => {
      const [x, y, s, op = 1] = sec.dataset.blob.split(',').map(Number);
      ScrollTrigger.create({
        trigger: sec, start: 'top 60%', end: 'bottom 40%',
        onToggle: self => {
          if (!self.isActive) return;
          const m = innerWidth < 1100;
          const ph = innerWidth < 760, hero = i === 0;
          gsap.to(S.state, { x: m ? 0 : x, y: m ? (hero ? (ph ? 1.1 : .4) : y) : y, s: m ? (hero && ph ? s * .72 : (i ? s * .8 : s)) : s, hue: hues[i % hues.length], amp: i === 0 || sec.id === 'contact' ? .26 : .34, opacity: m && i && sec.id !== 'contact' ? Math.min(op, .35) : (hero && ph ? .7 : op), duration: 2.2, ease: 'expo.out', overwrite: true });
        }
      });
    });
  }

  /* ---------- marquee with scroll velocity ---------- */
  let mqVel = 0;
  (function () {
    const row = $('.mq-row'); const tr = $('.mq-track');
    row.appendChild(tr.cloneNode(true)); row.appendChild(tr.cloneNode(true));
    let x = 0, dir = -1;
    gsap.ticker.add(() => {
      const w = tr.offsetWidth; if (!w) return;
      if (mqVel) dir = mqVel > 0 ? -1 : 1;
      x += dir * (1 + Math.min(Math.abs(mqVel) * .6, 14));
      if (x <= -w) x += w; if (x > 0) x -= w;
      row.style.transform = `translate3d(${x}px,0,0)`;
      mqVel *= .92;
    });
  })();

  /* ---------- cursor / magnetic / tilt / glow ---------- */
  if (fine && !reduce) {
    document.documentElement.classList.add('has-cursor');
    const cur = $('.cursor'), dot = $('.c-dot'), ring = $('.c-ring'), label = $('.c-label');
    const p = { x: innerWidth / 2, y: innerHeight / 2 }, r = { x: p.x, y: p.y };
    addEventListener('pointermove', e => { p.x = e.clientX; p.y = e.clientY; dot.style.transform = `translate(${p.x}px,${p.y}px)`; }, { passive: true });
    gsap.ticker.add(() => { r.x += (p.x - r.x) * .16; r.y += (p.y - r.y) * .16; ring.style.transform = `translate(${r.x}px,${r.y}px)`; });
    $$('a,button,input,select,textarea').forEach(el => {
      el.addEventListener('pointerenter', () => cur.classList.add('hover'));
      el.addEventListener('pointerleave', () => cur.classList.remove('hover'));
    });
    $$('[data-cursor]').forEach(el => {
      el.addEventListener('pointerenter', () => { label.textContent = el.dataset.cursor; cur.classList.add('label'); });
      el.addEventListener('pointerleave', () => cur.classList.remove('label'));
    });
    $$('[data-magnetic]').forEach(b => {
      b.addEventListener('pointermove', e => {
        const q = b.getBoundingClientRect();
        b.style.setProperty('--mx', ((e.clientX - q.left - q.width / 2) * .3) + 'px');
        b.style.setProperty('--my', ((e.clientY - q.top - q.height / 2) * .4) + 'px');
      });
      b.addEventListener('pointerleave', () => { b.style.setProperty('--mx', '0px'); b.style.setProperty('--my', '0px'); });
    });
    $$('.svc').forEach(c => c.addEventListener('pointermove', e => {
      const q = c.getBoundingClientRect(); c.style.setProperty('--gx', e.clientX - q.left + 'px'); c.style.setProperty('--gy', e.clientY - q.top + 'px');
    }));
    $$('[data-tilt]').forEach(c => {
      c.addEventListener('pointermove', e => {
        const q = c.getBoundingClientRect(), x = (e.clientX - q.left) / q.width - .5, y = (e.clientY - q.top) / q.height - .5;
        c.style.transform = `perspective(1100px) rotateY(${x * 9}deg) rotateX(${-y * 9}deg)`;
      });
      c.addEventListener('pointerleave', () => c.style.transform = '');
    });
  }


  addEventListener('load', () => ScrollTrigger.refresh());
})();
