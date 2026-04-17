# Character Bible — Mark (English Teacher)

> المرجع الثابت لشخصية المعلم "Mark". يُستخدم في **كل** الفيديوهات والصور لضمان ثبات المظهر والصوت والأسلوب عبر الحلقات.

---

## 1. الهوية الأساسية

| الحقل | القيمة |
|---|---|
| **الاسم** | Mark |
| **العمر** | 35 سنة |
| **الجنسية** | أمريكي |
| **المهنة** | مُعلم لغة إنجليزية ومُقدم بودكاست |
| **اللكنة** | American English (General American) |
| **النبرة** | دافئة، ودودة، واثقة، مُشجعة — لا تحاضِر بل تحاور |

---

## 2. الوصف البصري الثابت (نسخه حرفياً في كل برومبت)

```
A 35-year-old American male English teacher named "Mark".
Short well-groomed dark brown hair, neatly trimmed beard.
Bright intelligent hazel eyes. Warm friendly smile with
natural laugh lines. Direct, approachable eye contact.
Wearing a smart casual navy blue sweater over a crisp white
collared shirt. Genuine, patient, encouraging expression.
```

### نقاط بصرية يجب ألا تتغير أبداً
- شعر بُني داكن قصير
- لحية مهذبة قصيرة
- عيون عسلية
- ابتسامة ودودة حقيقية (ليست مُبالغاً فيها)
- سترة كحلية + قميص أبيض ياقة

---

## 3. الصورة المرجعية

| الحقل | القيمة |
|---|---|
| **رابط العرض (دائم)** | https://www.pixa.com/share/c244db8c-c0d4-4882-80cf-371347d88b37 |
| **Pixa Asset ID** | `asset_9b90f540f23646148d249c86671c4c57` |
| **الأبعاد** | 1376 × 768 (16:9) |
| **الموديل المُستخدم** | Nano Banana Pro (Google) — 4K quality |
| **تاريخ التوليد** | 2026-04-17 |
| **الملف المحلي** | `teacher_reference.png` *(لم يُرفع محلياً — راجع قسم 7)* |
| **رابط الرفع الدائم** | `teacher_reference_url.txt` |

---

## 4. إعدادات المشهد الافتراضية (الاستوديو)

```
Setting: Modern dark podcast studio.
- Warm moody cinematic lighting, amber/orange key light from camera-left
- Dark charcoal acoustic foam panels on walls (geometric wedge pattern)
- Hanging Edison bulbs in background → warm orange bokeh
- Wooden slatted accent wall directly behind him
- Professional Shure SM7B microphone on boom arm in foreground
- Podcast desk with subtle props (mug, notebook, laptop edge)
- Deep blacks, rich warm tones, gentle film grain
```

### الإضاءة
- **Key light:** amber/warm (~3200K) من اليسار
- **Fill:** soft, subtle من اليمين
- **Rim:** ناعم على الكتفين والشعر
- **Background:** Edison bulbs كـ bokeh دافئ

---

## 5. إعدادات Kling الافتراضية

### للصور المتحركة (image-to-video)
```yaml
model: kling-v2.1-master   # أو kling-v2.5-turbo-pro للسرعة
mode: professional
duration: 5                 # ثوانٍ (5 أو 10)
aspect_ratio: "16:9"
resolution: 1080p
cfg_scale: 0.5              # لاتزام عالي بالصورة المرجعية
negative_prompt: "distorted face, different person, logo change, extra fingers, low quality, blur, watermark, text artifacts"
reference_image: teacher_reference.png  # إلزامي في كل استدعاء
camera_control:
  type: simple
  config:
    horizontal: 0
    vertical: 0
    pan: 0
    tilt: 0
    roll: 0
    zoom: 0                 # تعديل حسب المشهد فقط
```

### قوالب حركة شائعة

**1. Talking head (الأساسي):**
```
Mark speaking directly to camera with natural warm expressions,
subtle head movements, natural blinking, hand gestures appearing
occasionally, lips syncing to spoken English words.
Camera: completely static. Depth of field preserved.
```

**2. Intro/Outro wave:**
```
Mark smiles warmly, raises his right hand and waves once to camera,
then returns hand to rest position. Natural, friendly, unhurried.
Camera: static.
```

**3. Emphasis point:**
```
Mark leans slightly forward, uses expressive hand gesture to
emphasize a key point, maintains warm eye contact. Subtle nod.
Camera: very slight push-in (zoom: +0.2).
```

### قواعد صارمة لـ Kling
- ✅ **دائماً** أرفق `teacher_reference.png` كصورة مرجعية
- ✅ **دائماً** اذكر "Mark" بالاسم في البرومبت + وصف ثابت من القسم 2
- ✅ **استخدم negative_prompt** لمنع تشوّه الوجه أو تغيّر الشخص
- ❌ **لا تغيّر** الملابس أو الاستوديو أو الإضاءة بين الحلقات دون سبب
- ❌ **لا تولّد صوراً جديدة** للشخصية — استخدم المرجع دائماً

---

## 6. برومبت ثابت للفيديوهات (Template)

```
[SCENE: Modern dark podcast studio, warm cinematic lighting,
dark charcoal acoustic foam, Edison bulb bokeh, Shure SM7B mic
in foreground.]

[SUBJECT: A 35-year-old American male English teacher "Mark" —
short dark brown hair, trimmed beard, hazel eyes, warm friendly
smile. Wearing navy blue sweater over white collared shirt.]

[ACTION: <صِف الحركة هنا — استخدم قوالب القسم 5>]

[STYLE: Photorealistic, cinematic color grading, rich warm tones,
natural skin texture, shallow depth of field, no AI artifacts,
no text overlays. Match reference image EXACTLY for face, hair,
beard, eyes, and clothing. 16:9, 1080p.]
```

---

## 7. رفع دائم للصورة المرجعية (لم يكتمل — اختر أحد الخيارات)

**الحالة الراهنة:** بيئة Claude تحجب `assets.pixelcut.app` و `litterbox.catbox.moe` عبر البروكسي، فلم أتمكن من تنزيل الصورة ورفعها إلى litterbox كما طُلب.

**الخيارات لحل المشكلة:**

1. **أفضل حل — GitHub كتخزين دائم:**
   - افتح https://www.pixa.com/share/c244db8c-c0d4-4882-80cf-371347d88b37
   - نزّل الصورة يدوياً بصيغة PNG
   - ارفعها إلى `assets/teacher_reference.png` في هذا الريبو (عبر GitHub UI أو git)
   - حدّث `teacher_reference_url.txt` بـ:
     `https://raw.githubusercontent.com/husain9010/husain.plan/claude/generate-teacher-image-aDOvd/assets/teacher_reference.png`

2. **litterbox يدوياً:**
   - نزّل الصورة من رابط Pixa
   - اذهب إلى https://litterbox.catbox.moe
   - اختر 72h ورفع يدوي
   - الصق الرابط في `teacher_reference_url.txt`

3. **إضافة النطاقات إلى allowlist Claude:**
   - أضف `assets.pixelcut.app` و `litterbox.catbox.moe` إلى إعدادات الشبكة
   - أخبرني، وسأعيد المحاولة تلقائياً

---

## 8. سجل التحديثات

| التاريخ | التغيير |
|---|---|
| 2026-04-17 | الإنشاء الأولي — صورة Mark المرجعية مولّدة بـ Nano Banana Pro. قسم Kling، برومبت القالب، وإعدادات الاستوديو. |
