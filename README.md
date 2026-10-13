# Noor Creative — الموقع الرسمي

موقع ثابت (HTML / CSS / JavaScript) مع مساعد ذكي يعمل عبر Netlify Functions.

## إضافة أعمال
ضع الملف داخل `works/<الخدمة>/` ثم أضف سطرًا في `data.js` داخل `works` للخدمة.
يمكن أيضًا إضافة روابط فيسبوك أو يوتيوب مباشرة (انظر التعليمات أسفل `data.js`).
الحد الأقصى لحجم الملف على GitHub هو 100 ميغابايت.

## المساعد الذكي (Cloudflare)
- المنطق والتعليمات: `lib/chat-core.js` (التعليمات قابلة للتعديل في أعلى الملف).
- Cloudflare Pages: يعمل تلقائيًا عبر `functions/api/chat.js`.
- Cloudflare Workers: يعمل عبر `worker.js` و `wrangler.jsonc`.
- أضف `OPENAI_API_KEY` كـ Secret في إعدادات المشروع على Cloudflare ثم أعد النشر. لا تضع المفتاح داخل الملفات.

## النشر
المشروع مربوط بـ GitHub؛ أي تعديل على فرع `main` يُنشر تلقائيًا. لا يحتاج أمر build.
