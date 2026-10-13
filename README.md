# Noor Creative — الموقع الرسمي

موقع ثابت (HTML / CSS / JavaScript) مع مساعد ذكي يعمل عبر Netlify Functions.

## إضافة أعمال
ضع الملف داخل `works/<الخدمة>/` ثم أضف سطرًا في `data.js` داخل `works` للخدمة.
يمكن أيضًا إضافة روابط فيسبوك أو يوتيوب مباشرة (انظر التعليمات أسفل `data.js`).
الحد الأقصى لحجم الملف على GitHub هو 100 ميغابايت.

## المساعد الذكي
- الكود: `netlify/functions/chat.mjs` (التعليمات قابلة للتعديل في أعلى الملف).
- أضف `OPENAI_API_KEY` في إعدادات Netlify → Environment variables. لا تضع المفتاح داخل الملفات.

## النشر
اربط هذا المستودع بـ Netlify (Add new site → Import from Git). لا يحتاج أمر build؛ مجلد النشر هو الجذر.
