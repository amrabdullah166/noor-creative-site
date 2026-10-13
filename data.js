/* ===================================================================
   بيانات خدمات نور كرييتف ومعارض الأعمال
   لإضافة عمل: ضع الصورة/الفيديو داخل مجلد works/<اسم الخدمة>/
   ثم أضف سطرًا داخل works للخدمة، مثال:
   { title: 'هوية مطعم الريف', client: 'مطعم الريف', src: 'works/brand/rif.jpg' },
   { title: 'إعلان رمضان', client: 'متجر كذا', src: 'works/ai-video/ramadan.mp4', type: 'video', poster: 'works/ai-video/ramadan.jpg' },
   =================================================================== */
const WHATSAPP = ['962791958573', '962792009766'];
const waLink = (msg, i = 0) => `https://wa.me/${WHATSAPP[i]}?text=${encodeURIComponent(msg)}`;
const SERVICES = [
 {
  "slug": "brand",
  "n": "01",
  "en": "BRAND",
  "title": "الهوية البصرية والتصميم",
  "short": "شعار وهوية كاملة وتصاميم ومطبوعات تعطي مشروعك شكلًا مميزًا يتذكره الناس.",
  "long": "نصمّم لمشروعك شعارًا وهوية كاملة: الألوان والخطوط وطريقة الاستخدام، ثم نطبّقها على تصاميم السوشال والمطبوعات، ليظهر مشروعك بنفس الشكل المميز في كل مكان.",
  "inc": [
   "تصميم الشعار",
   "الهوية البصرية الكاملة",
   "دليل الهوية",
   "تصاميم السوشال ميديا",
   "المطبوعات والتغليف",
   "بطاقات وقرطاسية"
  ],
  "icon": "<path pathLength=\"1\" d=\"M15.707 21.293a1 1 0 0 1-1.414 0l-1.586-1.586a1 1 0 0 1 0-1.414l5.586-5.586a1 1 0 0 1 1.414 0l1.586 1.586a1 1 0 0 1 0 1.414z\"/><path pathLength=\"1\" d=\"m18 13-1.375-6.874a1 1 0 0 0-.746-.776L3.235 2.028a1 1 0 0 0-1.207 1.207L5.35 15.879a1 1 0 0 0 .776.746L13 18\"/><path pathLength=\"1\" d=\"m2.3 2.3 7.286 7.286\"/><circle pathLength=\"1\" cx=\"11\" cy=\"11\" r=\"2\"/>",
  "works": [
   {"title": "هوية مدينة فرح — 1", "client": "مدينة فرح", "src": "works/brand/لوجو-مدينة-فرح_01.png"},
   {"title": "هوية مدينة فرح — 2", "client": "مدينة فرح", "src": "works/brand/لوجو-مدينة-فرح_02.png"},
   {"title": "هوية مدينة فرح — 3", "client": "مدينة فرح", "src": "works/brand/لوجو-مدينة-فرح_03.png"},
   {"title": "هوية مدينة فرح — 4", "client": "مدينة فرح", "src": "works/brand/لوجو-مدينة-فرح_04.png"}
  ]
 },
 {
  "slug": "ai-video",
  "n": "02",
  "en": "AI FILM",
  "title": "فيديو بالذكاء الاصطناعي",
  "short": "إعلانات فيديو واقعية بالذكاء الاصطناعي، بجودة عالية وتكلفة أقل من التصوير التقليدي.",
  "long": "نكتب فكرة الإعلان ونصنع مشاهده بأدوات الذكاء الاصطناعي، لنقدّم فيديو واقعيًا بجودة سينمائية، دون الحاجة لتصوير مكلف.",
  "inc": [
   "كتابة الفكرة والسيناريو",
   "إعلانات 30 / 45 / 60 ثانية",
   "ريلز وفيديوهات قصيرة",
   "شخصيات ومشاهد واقعية",
   "تعليق صوتي ومؤثرات",
   "مونتاج وتلوين نهائي"
  ],
  "icon": "<path pathLength=\"1\" d=\"M20.2 6 3 11l-.9-2.4c-.3-1.1.3-2.2 1.3-2.5l13.5-4c1.1-.3 2.2.3 2.5 1.3Z\"/><path pathLength=\"1\" d=\"m6.2 5.3 3.1 3.9\"/><path pathLength=\"1\" d=\"m12.4 3.4 3.1 4\"/><path pathLength=\"1\" d=\"M3 11h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z\"/><path pathLength=\"1\" d=\"m12 13.5.9 2.1 2.1.9-2.1.9-.9 2.1-.9-2.1-2.1-.9 2.1-.9Z\"/>",
  "works": [
   {"title": "إعلان المستشفى", "client": "مستشفى", "src": "works/ai-video/مستشفى .mp4", "type": "video"},
   {"title": "ريلز 01", "src": "https://www.facebook.com/reel/1630875741830886"},
   {"title": "ريلز 02", "src": "https://www.facebook.com/reel/1659913739173146"},
   {"title": "ريلز 03", "src": "https://www.facebook.com/reel/1059029080470141"},
   {"title": "ريلز 04", "src": "https://www.facebook.com/reel/1808178433699438"},
   {"title": "ريلز 05", "src": "https://www.facebook.com/reel/980044244480976"},
   {"title": "ريلز 06", "src": "https://www.facebook.com/reel/1135499589149982"},
   {"title": "ريلز 07", "src": "https://www.facebook.com/reel/1074395922143204"},
   {"title": "ريلز 08", "src": "https://www.facebook.com/reel/1150976680686681"},
   {"title": "ريلز 09", "src": "https://www.facebook.com/reel/1545862347553861"},
   {"title": "ريلز 10", "src": "https://www.facebook.com/reel/2120674268843673"},
   {"title": "ريلز 11", "src": "https://www.facebook.com/reel/2385921008901792"},
   {"title": "ريلز 12", "src": "https://www.facebook.com/reel/2088705868702480"},
   {"title": "ريلز 13", "src": "https://www.facebook.com/reel/1059190403589367"}
  ]
 },
 {
  "slug": "motion",
  "n": "03",
  "en": "MOTION",
  "title": "الموشن جرافيك والمونتاج",
  "short": "فيديوهات متحركة تشرح فكرتك ببساطة وتشدّ المشاهد حتى النهاية.",
  "long": "نحوّل رسالتك إلى فيديو متحرك واضح وممتع: موشن جرافيك، فيديوهات تعريفية، ونصوص متحركة، مع مونتاج احترافي يحافظ على انتباه المشاهد.",
  "inc": [
   "موشن جرافيك 2D",
   "فيديوهات تعريفية",
   "عناوين ونصوص متحركة",
   "تحريك الشعار",
   "مونتاج احترافي",
   "فيديوهات المنصات"
  ],
  "icon": "<path pathLength=\"1\" d=\"M4 19.5C10 19.5 11 4.5 20 4.5\"/><path pathLength=\"1\" d=\"M4 19.5h6.5M20 4.5h-6.5\"/><circle pathLength=\"1\" cx=\"4\" cy=\"19.5\" r=\"1.6\"/><circle pathLength=\"1\" cx=\"20\" cy=\"4.5\" r=\"1.6\"/><rect pathLength=\"1\" x=\"10.5\" y=\"18\" width=\"3\" height=\"3\" rx=\".6\"/><rect pathLength=\"1\" x=\"10.5\" y=\"3\" width=\"3\" height=\"3\" rx=\".6\"/>",
  "works": [
   {"title": "إعلان الجامعة الهاشمية", "client": "الجامعة الهاشمية", "src": "works/motion/فيديو الجامعة الهاشمية جرافيك اعلان .mp4", "type": "video"},
   {"title": "إعلان موشن العقل", "client": "", "src": "works/motion/فيديو العقل موشن جرافيك اعلان .mp4", "type": "video"}
  ]
 },
 {
  "slug": "web",
  "n": "04",
  "en": "WEB",
  "title": "المواقع والتجارب الرقمية",
  "short": "مواقع سريعة وسهلة الاستخدام، تعمل بشكل ممتاز على الجوال والكمبيوتر.",
  "long": "نصمّم ونبرمج مواقع ومنصات تناسب هوية مشروعك وهدفه: سريعة، سهلة الاستخدام، وتعمل على كل الأجهزة، مع لوحة تحكم عند الحاجة.",
  "inc": [
   "مواقع تعريفية للشركات",
   "صفحات هبوط للحملات",
   "منصات ولوحات تحكم",
   "تصميم واجهات UI / UX",
   "تجاوب كامل مع الجوال",
   "ربط واتساب ونماذج التواصل"
  ],
  "icon": "<rect pathLength=\"1\" x=\"2\" y=\"4\" width=\"20\" height=\"16\" rx=\"2.5\"/><path pathLength=\"1\" d=\"M2 9h20\"/><path pathLength=\"1\" d=\"M5.5 6.5h.01M8 6.5h.01\"/><path pathLength=\"1\" d=\"m10 12.5-2.2 2.2 2.2 2.2\"/><path pathLength=\"1\" d=\"m14 12.5 2.2 2.2-2.2 2.2\"/>",
  "works": [
  ]
 },
 {
  "slug": "social",
  "n": "05",
  "en": "SOCIAL",
  "title": "إدارة السوشال ميديا",
  "short": "نخطط المحتوى ونصمّمه وننشره بانتظام، لنزيد متابعيك وتفاعلهم.",
  "long": "ندير حساباتك بالكامل: نخطط محتوى الشهر، نصمّم ونكتب وننشر بانتظام، ونتابع النتائج لنبني لك حضورًا قويًا يكبر مع الوقت.",
  "inc": [
   "خطة محتوى شهرية",
   "تصاميم المنشورات",
   "كتابة المحتوى",
   "ريلز وستوريز",
   "جدولة ونشر",
   "تقارير أداء"
  ],
  "icon": "<path pathLength=\"1\" d=\"M7.9 20A9 9 0 1 0 4 16.1L2 22Z\"/><path pathLength=\"1\" d=\"M15.8 9.2a2.5 2.5 0 0 0-3.5 0l-.3.4-.35-.3a2.42 2.42 0 1 0-3.2 3.6l3.6 3.5 3.6-3.5c1.2-1.2 1.1-2.7.2-3.7\"/>",
  "works": [
   {"title": "انتظروا انطلاقتنا", "client": "", "src": "works/social/انتظروا انطلاقتنا.mp4", "type": "video"},
   {"title": "انظرونا", "client": "", "src": "works/social/انظرونا +.mp4", "type": "video"},
   {"title": "وصلنا إلى 5000 متابع", "client": "", "src": "works/social/وصلنا الى 5000 متابع .jpg"},
   {"title": "بوست كتالوج مدينة فرح", "client": "مدينة فرح", "src": "works/social/بوست-كتالوج-مدينة-فرح-.png"},
   {"title": "فكرتك جاهزة تنطلق", "client": "", "src": "works/social/فكرتك-جاهزة-تنطلق.jpg"},
   {"title": "اقتربنا", "client": "", "src": "works/social/اقتربنا.jpg"},
   {"title": "بدأنا", "client": "", "src": "works/social/بدأنا .jpg"},
   {"title": "إلى جميع أعضاء الفريق", "client": "", "src": "works/social/الى-جميع-اعضاء-الفريق.jpg"},
   {"title": "ملف سري", "client": "", "src": "works/social/ملف-سري-.jpg"},
   {"title": "هل لاحظت شي؟", "client": "", "src": "works/social/هل-لاحظت-اشي.jpg"},
   {"title": "شو مخبي؟ 1/10", "client": "", "src": "works/social/شو-مخبي-1-10.jpg"}
  ]
 },
 {
  "slug": "ads",
  "n": "06",
  "en": "ADS",
  "title": "الحملات الإعلانية الممولة",
  "short": "إعلانات ممولة تصل للجمهور المناسب، مع متابعة يومية لأفضل نتيجة بأقل تكلفة.",
  "long": "نخطط حملاتك الإعلانية ونطلقها ونتابعها يوميًا: نختار الجمهور المناسب، نجهّز التصاميم والفيديوهات، ونحسّن الأداء باستمرار لتحصل على أفضل نتيجة بأقل تكلفة.",
  "inc": [
   "تخطيط الحملة",
   "استهداف الجمهور",
   "تصاميم وفيديوهات إعلانية",
   "إدارة ميزانية الإعلان",
   "متابعة وتحسين يومي",
   "تقارير نتائج واضحة"
  ],
  "icon": "<path pathLength=\"1\" d=\"m3 11 18-5v12L3 14v-3z\"/><path pathLength=\"1\" d=\"M11.6 16.8a3 3 0 1 1-5.8-1.6\"/><path pathLength=\"1\" d=\"M21 3v.01M18.5 2.5l-.5 1M23 7h-.01\"/>",
  "works": [
  ]
 }
];

/* ---- روابط فيسبوك ويوتيوب ----
   فيديو فيسبوك:  { title:'...', src:'https://www.facebook.com/NoorCreativeAI/videos/123', poster:'works/ai-video/cover.jpg' }
   ريلز فيسبوك:   { title:'...', src:'https://www.facebook.com/reel/123' }   (يُعرض عموديًا تلقائيًا)
   يوتيوب:         { title:'...', src:'https://youtu.be/XXXXXXXXXXX' }      (الغلاف يُجلب تلقائيًا)
   الغلاف (poster) اختياري؛ بدونه يظهر غلاف بهوية نور. */
const ytId = u => ((u || '').match(/(?:youtu\.be\/|[?&]v=|shorts\/|embed\/)([\w-]{11})/) || [])[1];
const workKind = w => w.type === 'video' && !/^https?:/.test(w.src) ? 'video'
  : /facebook\.com|fb\.watch/.test(w.src) ? 'facebook'
  : ytId(w.src) ? 'youtube'
  : /\.(mp4|webm|mov|m4v)$/i.test(w.src) ? 'video' : (w.type || 'image');
const workVertical = w => !!w.vertical || /\/reel\/|\/shorts\//.test(w.src);
const workThumb = w => { const k = workKind(w); return w.poster || (k === 'youtube' ? `https://i.ytimg.com/vi/${ytId(w.src)}/hqdefault.jpg` : k === 'image' ? w.src : ''); };
const workEmbed = w => workKind(w) === 'facebook'
  ? `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(w.src)}&show_text=false&autoplay=true&width=${workVertical(w) ? 400 : 1280}`
  : `https://www.youtube-nocookie.com/embed/${ytId(w.src)}?autoplay=1&rel=0&playsinline=1`;
