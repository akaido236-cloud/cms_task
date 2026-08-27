# SD Media — Strict AI-Generated Application Audit

> Audit scope: `sd-media/` — 9 TS/TSX source files, ~660 lines.
> Stack verified from installed packages: Next.js 16.3.3, React 19.2.8,
> next-intl 4.14.0, framer-motion 13.1.1, Tailwind 4.3.3, TypeScript 5.9.3.
> Every claim below was checked against the code, not inferred.

**Score: 41/100 — Quality Level: Below Standard (Not Production Ready)**

| Criterion | Weight | Score |
|---|---|---|
| Code Quality & Engineering | 25 | **11** |
| SEO & Technical Performance | 15 | **4** |
| Code Clarity & Comments | 10 | **5** |
| Documentation | 10 | **4** |
| Architecture & Structure | 15 | **7** |
| Components & Reusability | 15 | **6** |
| Cleanliness & Maintainability | 10 | **4** |
| **Total** | **100** | **41** |

---

## Critical Issues

**1. طبقة الـ SEO معطّلة فعليًا رغم ادّعاء التوثيق عكس ذلك — Priority: P0 — Impact: حرج**

`app/[locale]/layout.tsx:8-24` يعرّف `metadata` ثابتة بعنوان
`"SD Media | About Us"` على مستوى الـ layout، فتُطبَّق على **كل** الصفحات
بما فيها الصفحة الرئيسية. لا يوجد `generateMetadata` ولا `alternates`
ولا `hreflang`، لذلك النسخة العربية `/ar` تُقدَّم بوسوم إنجليزية بالكامل،
و`/en` و`/ar` تتنافسان كـ duplicate content. لا يوجد `sitemap.ts`
ولا `robots.ts` ولا `metadataBase`. صورة الـ OG مستضافة على نطاق خارجي
`z-cdn-media.chatglm.cn`. الأثر: موقع وكالة تسويق يفشل في وظيفته الأساسية —
الظهور في البحث — بينما `CLIENT.md` يَعِد العميل صراحةً بأنه "SEO Optimized".

**2. التطبيق كله يُرندَر ديناميكيًا وعلى العميل بلا مبرر — Priority: P0 — Impact: عالٍ**

لا يوجد `generateStaticParams` ولا `setRequestLocale` (المتاح في next-intl 4.14)
في أي ملف، فيفقد الموقع الـ Static Generation بالكامل رغم أنه موقع تسويقي
ثابت من صفحتين. إضافةً لذلك 4 من 9 ملفات مصدرية تحمل `'use client'`،
من ضمنها `AboutComponents.tsx` بأكمله، فتُشحَن framer-motion وكل المحتوى
إلى المتصفح ولا يُستفاد من React Server Components إطلاقًا. يُضاف إلى ذلك
صورتا `fill` بلا خاصية `sizes` (`page.tsx:33`، `AboutComponents.tsx:57`)
فتُحمَّل صور أكبر من اللازم، و`public/conpany.jpeg` بحجم **720 KB** بلا ضغط.

**3. محتوى وهمي وعناصر غير وظيفية مشحونة كأنها نهائية — Priority: P0 — Impact: عالٍ**

زر الـ CTA الرئيسي في `AboutComponents.tsx:138` هو `<button>` بلا `onClick`
وبلا رابط — لا يفعل شيئًا. كل روابط التواصل الاجتماعي في `Footer.tsx:63-73`
هي `href="#"`. بيانات التواصل مُختلَقة (`info@sdmedia.com`،
`+123 456 7890`، `Dubai, UAE`) ومكتوبة مباشرة في الـ JSX. أرقام الإحصاءات
في `messages/*.json` مُختلَقة. الأثر: المنتج غير قابل للتسليم لعميل
في وضعه الحالي.

**4. لا توجد طبقة مكونات قابلة لإعادة الاستخدام + 60 لونًا مكتوبًا يدويًا — Priority: P1 — Impact: عالٍ**

**ولا مكوّن واحد في المشروع يستقبل props** — التقسيم شكلي لا وظيفي.
النتيجة تكرار مباشر: `max-w-7xl mx-auto px-6` مكرر **6 مرات**،
`rounded-full` **10 مرات**، عنوان التدرّج الذهبي مرتين، وكتلة الشعار
مع اسم العلامة مكررة حرفيًا بين `Header.tsx:23-32` و`Footer.tsx:17-26`،
وروابط التنقّل مكتوبة يدويًا مرتين بدل مصفوفة واحدة. الأخطر: **60** قيمة
لون hex مكتوبة داخل الـ className بدل `@theme` tokens في Tailwind،
أي أن أي تغيير في الهوية البصرية يتطلب مسحًا يدويًا لكل الملفات.
هذا هو العائق الأساسي أمام تجاوز الصفحتين الحاليتين.

**5. خلل RTL حقيقي + توثيق يصف كودًا غير موجود — Priority: P1 — Impact: متوسط-عالٍ**

`AboutComponents.tsx:50` يستخدم خصائص فيزيائية `border-l-2 pl-6` بدل
المنطقية (`border-s-2 ps-6`)، فيظهر الحدّ الذهبي على الجهة الخاطئة في
النسخة العربية — والعربية هي الميزة الأساسية للمشروع. ولا توجد أنماط
`focus-visible` في أي ملف، ولا مراعاة لـ `prefers-reduced-motion` رغم
وجود دوران لا نهائي للشعار. بالتوازي، `DEVELOPER.md` يوثّق بنية
`src/app/` و`src/components/` **غير موجودة إطلاقًا**، و`README.md` يذكر
Next.js 14 (الفعلي 16.3.3) ويدّعي استخدام `next/font` و Geist بينما
لا وجود لأي استيراد لها — ولذلك تقع العربية على خط Arial الاحتياطي،
ويبقى في `globals.css:11-12` متغيّران ميتان لخط غير معرَّف.

---

## Priority Actions

**1. أولًا — إصلاح طبقة الـ SEO والرندرة (P0)**

`generateMetadata` مُترجَمة لكل صفحة مع `alternates.languages` و`metadataBase`،
تصحيح عنوان الصفحة الرئيسية، إضافة `sitemap.ts` و`robots.ts`،
تفعيل `generateStaticParams` + `setRequestLocale` + التحقق من صحة الـ locale،
دفع `'use client'` إلى المكونات الطرفية المتحرّكة فقط،
إضافة `sizes` للصورتين وضغط `conpany.jpeg` إلى WebP.
هذه الحزمة وحدها تنقل التقييم نقلة حقيقية لأنها تصلح سببين من أعلى ثلاثة أسباب للخصم.

**2. ثانيًا — المحتوى والبنية القابلة للتوسع (P1)**

استبدال المحتوى الوهمي أو إخفاء أقسامه، ربط زر الـ CTA بمسار تواصل فعلي،
تحويل الخصائص الفيزيائية إلى منطقية لإصلاح الـ RTL،
ثم استخراج `Container` / `Section` / `SectionTitle` / `Button` بـ props حقيقية
ونقل ألوان الهوية إلى `@theme` tokens، ومصدر واحد لروابط التنقّل.

**3. يمكن تأجيله (P2)**

تصحيح المستندات الثلاثة لتطابق الواقع، حذف `.DS_Store` (3 مواضع من ضمنها
`public/`) وملفات SVG الافتراضية والمفاتيح الخمسة غير المستخدمة
(`Header.services`، `Header.contact`، `About.valuesTitle`، `About.teamTitle`،
`About.statsTitle`)، إزالة `package.json` و`node_modules` المكرّرين في المجلد
الأب والاستغناء عن حيلة `turbopack.root`، إضافة prettier و CI،
ثم `next/font` بخط عربي مناسب و`error.tsx`/`not-found.tsx`.

---

## Final Verdict

تطبيق من صفحتين مصقول بصريًا لكن هندسته أضعف بكثير من مظهره: البنية
الأساسية لـ App Router و next-intl مُنفَّذة بشكل صحيح، وتطابق مفاتيح الترجمة
تام (28/28) — وهاتان نقطتا القوة الحقيقيتان الوحيدتان. ما عدا ذلك، الموقع
غير جاهز للإنتاج: لا يمكن تسليمه لعميل وفيه أزرار لا تعمل وبيانات تواصل
وهمية، ولا يمكن أن يُكتشَف في محركات البحث بسبب وسوم ثابتة وخاطئة.

**أكبر نقطة ضعف:** فجوة بين ما يَعِد به التوثيق وما يفعله الكود فعلًا —
`CLIENT.md` يبيع "SEO Optimized" و`DEVELOPER.md` يشرح بنية `src/` غير موجودة،
بينما لا يستقبل أي مكوّن props وتتكرر 60 قيمة لون يدويًا. النتيجة أن التطبيق
غير قابل للتوسّع عمليًا خارج صفحتيه الحاليتين دون إعادة هيكلة لطبقة المكونات.

---

## ملحق: دليل التوليد بالذكاء الاصطناعي

مؤشرات موضوعية مستخرجة من الكود نفسه (تُذكر كقرينة تقنية، لا كاتهام):

- صورة الـ OG في `layout.tsx:17` ما زالت تشير إلى `z-cdn-media.chatglm.cn`
  وهو CDN تابع لنموذج ChatGLM.
- تعليقات تسرد تصحيحات المولّد بدل شرح النية:
  `layout.tsx:26` — `"Fix: params is now a Promise and must be awaited"`،
  `i18n/request.ts:13` — `"TypeScript fix: guarantee locale is a string"`.
- تعليق متردّد بخصوص بنية المشروع نفسه في `proxy.ts:2`:
  `"or './src/i18n/routing' depending on your structure"`.
- ست خدمات بوصف واحد مقولب:
  `"Delivering top-notch <X> solutions tailored to your brand."`
- توثيق يصف بنية `src/` لم تُنشأ قط.

**ملاحظة مهمة:** ملف `proxy.ts` **صحيح** ولا يُحتسب خطأً — فهو التسمية
المعتمدة في Next.js 16 بديلًا عن `middleware.ts`.
