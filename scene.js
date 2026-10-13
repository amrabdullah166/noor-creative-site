/* NOOR — WebGL sculpture (three.js) */
(function () {
  const canvas = document.getElementById('scene');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const mobile = innerWidth < 760;
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
  } catch (e) { document.documentElement.classList.add('no-gl'); window.NoorScene = null; return; }
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, mobile ? 1.5 : 1.75));
  renderer.setSize(innerWidth, innerHeight, false);
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, innerWidth / innerHeight, 0.1, 100);
  camera.position.set(0, 0, 9);

  const NOISE = `
  vec3 mod289(vec3 x){return x-floor(x*(1./289.))*289.;}
  vec4 mod289(vec4 x){return x-floor(x*(1./289.))*289.;}
  vec4 permute(vec4 x){return mod289(((x*34.)+1.)*x);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-.85373472095314*r;}
  float snoise(vec3 v){
    const vec2 C=vec2(1./6.,1./3.); const vec4 D=vec4(0.,.5,1.,2.);
    vec3 i=floor(v+dot(v,C.yyy)); vec3 x0=v-i+dot(i,C.xxx);
    vec3 g=step(x0.yzx,x0.xyz); vec3 l=1.-g; vec3 i1=min(g.xyz,l.zxy); vec3 i2=max(g.xyz,l.zxy);
    vec3 x1=x0-i1+C.xxx; vec3 x2=x0-i2+C.yyy; vec3 x3=x0-D.yyy;
    i=mod289(i);
    vec4 p=permute(permute(permute(i.z+vec4(0.,i1.z,i2.z,1.))+i.y+vec4(0.,i1.y,i2.y,1.))+i.x+vec4(0.,i1.x,i2.x,1.));
    float n_=.142857142857; vec3 ns=n_*D.wyz-D.xzx;
    vec4 j=p-49.*floor(p*ns.z*ns.z); vec4 x_=floor(j*ns.z); vec4 y_=floor(j-7.*x_);
    vec4 x=x_*ns.x+ns.yyyy; vec4 y=y_*ns.x+ns.yyyy; vec4 h=1.-abs(x)-abs(y);
    vec4 b0=vec4(x.xy,y.xy); vec4 b1=vec4(x.zw,y.zw);
    vec4 s0=floor(b0)*2.+1.; vec4 s1=floor(b1)*2.+1.; vec4 sh=-step(h,vec4(0.));
    vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy; vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
    vec3 p0=vec3(a0.xy,h.x); vec3 p1=vec3(a0.zw,h.y); vec3 p2=vec3(a1.xy,h.z); vec3 p3=vec3(a1.zw,h.w);
    vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
    p0*=norm.x; p1*=norm.y; p2*=norm.z; p3*=norm.w;
    vec4 m=max(.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.); m=m*m;
    return 42.*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
  }`;

  const uniforms = {
    uTime: { value: 0 }, uAmp: { value: 0.26 }, uFreq: { value: 0.62 },
    uHue: { value: 0 }, uLines: { value: 1 }, uMouse: { value: new THREE.Vector2() }
  };

  const vert = NOISE + `
  uniform float uTime,uAmp,uFreq; uniform vec2 uMouse;
  varying vec3 vN; varying vec3 vV; varying float vD; varying vec3 vP;
  float disp(vec3 p){
    float t=uTime*.16;
    float n=snoise(p*uFreq+vec3(t,t*.7,-t));
    float n2=snoise(p*uFreq*1.9+vec3(-t*1.3,t,t*.5))*.16;
    float m=smoothstep(1.6,0.,distance(p.xy,uMouse*1.4))*.22;
    return (n+n2)*uAmp+m;
  }
  void main(){
    vec3 p=normalize(position)*1.5;
    vec3 n=normalize(p);
    vec3 t=normalize(cross(n,abs(n.y)>.95?vec3(1.,0.,0.):vec3(0.,1.,0.)));
    vec3 b=normalize(cross(n,t));
    float e=.012;
    vec3 pa=p+n*disp(p);
    vec3 pt=normalize(p+t*e)*1.5; pt+=normalize(pt)*disp(pt);
    vec3 pb=normalize(p+b*e)*1.5; pb+=normalize(pb)*disp(pb);
    vec3 nn=normalize(cross(pt-pa,pb-pa));
    if(dot(nn,n)<0.) nn=-nn;
    vD=length(pa)-1.5; vP=pa;
    vec4 mv=modelViewMatrix*vec4(pa,1.);
    vN=normalize(normalMatrix*nn); vV=-mv.xyz;
    gl_Position=projectionMatrix*mv;
  }`;

  const frag = `
  uniform float uTime,uHue,uLines;
  varying vec3 vN; varying vec3 vV; varying float vD; varying vec3 vP;
  vec3 pal(float t){
    t=abs(fract(t)*2.-1.);
    vec3 c1=vec3(.20,.26,1.), c2=vec3(.54,.17,.96), c3=vec3(1.,.18,.58), c4=vec3(1.,.48,.18);
    float s=t*3.;
    vec3 c=mix(c1,c2,clamp(s,0.,1.));
    c=mix(c,c3,clamp(s-1.,0.,1.));
    c=mix(c,c4,clamp(s-2.,0.,1.));
    return c;
  }
  void main(){
    vec3 N=normalize(vN); vec3 V=normalize(vV);
    vec3 L1=normalize(vec3(-.6,.7,.8)); vec3 L2=normalize(vec3(.9,-.3,.4));
    float d1=max(dot(N,L1),0.), d2=max(dot(N,L2),0.);
    float fres=pow(1.-max(dot(N,V),0.),2.2);
    float k=vD*1.6+N.y*.25+N.x*.15+uHue+uTime*.03;
    vec3 base=pal(k);
    vec3 col=base*(.015+.62*pow(d1,2.2)) + pal(k+.35)*pow(d2,2.)*.4;
    col+=pal(k+.15)*fres*1.35;
    float sp=pow(max(dot(reflect(-L1,N),V),0.),48.);
    col+=vec3(1.,.92,1.)*sp*.9;
    // topographic contour lines
    float c=fract(vD*16.+vP.y*1.2);
    float line=1.-smoothstep(0.,.09,abs(c-.5)-.41);
    col+=line*uLines*(.10+fres*.5)*pal(k+.2);
    col=mix(col,col*col*1.4,.25);
    gl_FragColor=vec4(col,1.);
  }`;

  const geo = new THREE.IcosahedronGeometry(1.5, mobile ? 64 : 110);
  const mat = new THREE.ShaderMaterial({ uniforms, vertexShader: vert, fragmentShader: frag });
  const blob = new THREE.Mesh(geo, mat);
  const group = new THREE.Group(); group.add(blob); scene.add(group);

  /* particles */
  const N = mobile ? 900 : 2200, pos = new Float32Array(N * 3), col = new Float32Array(N * 3), sz = new Float32Array(N);
  const cols = [[.23, .29, 1], [.54, .17, .96], [1, .18, .58], [1, .48, .18], [1, 1, 1]];
  for (let i = 0; i < N; i++) {
    const r = 2.6 + Math.random() * 6, th = Math.random() * Math.PI * 2, ph = Math.acos(2 * Math.random() - 1);
    pos[i * 3] = r * Math.sin(ph) * Math.cos(th); pos[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th) * .7; pos[i * 3 + 2] = r * Math.cos(ph) - 2;
    const c = cols[(Math.random() * cols.length) | 0]; col.set(c, i * 3); sz[i] = Math.random();
  }
  const pg = new THREE.BufferGeometry();
  pg.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  pg.setAttribute('color', new THREE.BufferAttribute(col, 3));
  pg.setAttribute('size', new THREE.BufferAttribute(sz, 1));
  const pm = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, vertexColors: true,
    uniforms: { uTime: uniforms.uTime, uPR: { value: renderer.getPixelRatio() } },
    vertexShader: `attribute float size; varying vec3 vC; varying float vA; uniform float uTime,uPR;
      void main(){ vC=color; vec4 mv=modelViewMatrix*vec4(position,1.); gl_Position=projectionMatrix*mv;
      vA=.35+.65*abs(sin(uTime*.8+size*40.)); gl_PointSize=(1.+size*2.6)*uPR*(9./-mv.z); }`,
    fragmentShader: `varying vec3 vC; varying float vA; void main(){ float d=length(gl_PointCoord-.5); if(d>.5) discard; gl_FragColor=vec4(vC,(1.-d*2.)*vA*.85); }`
  });
  const stars = new THREE.Points(pg, pm); scene.add(stars);

  /* state driven by app.js (scroll) */
  const state = { x: 0, y: 0.05, s: 1.35, amp: 0.26, hue: 0, opacity: 1, intro: 0 };
  const mouse = { x: 0, y: 0, tx: 0, ty: 0, v: 0 };
  let scrollV = 0;

  function resize() {
    const w = innerWidth, h = innerHeight;
    renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix();
    camera.position.z = w < 760 ? 12.5 : (w < 1100 ? 10.5 : 9);
  }
  addEventListener('resize', resize); resize();

  addEventListener('pointermove', e => {
    const nx = e.clientX / innerWidth * 2 - 1, ny = -(e.clientY / innerHeight * 2 - 1);
    mouse.v = Math.min(1, mouse.v + Math.hypot(nx - mouse.tx, ny - mouse.ty) * 2);
    mouse.tx = nx; mouse.ty = ny;
  }, { passive: true });

  const clock = new THREE.Clock();
  let raf;
  function tick() {
    raf = requestAnimationFrame(tick);
    const dt = Math.min(clock.getDelta(), .05), t = clock.elapsedTime;
    const L = k => 1 - Math.pow(1 - k, dt * 60);
    mouse.x += (mouse.tx - mouse.x) * .06; mouse.y += (mouse.ty - mouse.y) * .06;
    mouse.v *= .94; scrollV *= .9;
    uniforms.uTime.value = reduce ? 10 : t;
    uniforms.uAmp.value += ((state.amp + mouse.v * .18 + Math.min(Math.abs(scrollV) * .002, .25)) - uniforms.uAmp.value) * .08;
    uniforms.uHue.value = state.hue;
    uniforms.uMouse.value.set(mouse.x, mouse.y);
    const ar = camera.aspect, unit = Math.min(1, ar / 1.6);
    const tx = state.x * unit, ty = state.y;
    group.position.x += (tx - group.position.x) * L(.07);
    group.position.y += (ty - group.position.y) * L(.07);
    const sc = state.s * state.intro * (innerWidth < 760 ? 1.05 : 1);
    group.scale.setScalar(group.scale.x + (sc - group.scale.x) * L(.08));
    blob.rotation.y += dt * .12 + scrollV * .00015;
    blob.rotation.x += dt * .04;
    group.rotation.y += ((mouse.x * .45) - group.rotation.y) * .05;
    group.rotation.x += ((-mouse.y * .3) - group.rotation.x) * .05;
    stars.rotation.y = t * .015 + mouse.x * .08; stars.rotation.x = mouse.y * .05;
    canvas.style.opacity = state.opacity;
    renderer.render(scene, camera);
  }
  tick();
  document.addEventListener('visibilitychange', () => { if (document.hidden) cancelAnimationFrame(raf); else { clock.getDelta(); tick(); } });

  window.NoorScene = { state, setScrollVelocity: v => { scrollV = v; } };
})();
