# راهنمای جامع استفاده از فایل JSON ماژول‌های ریحان

## 📖 معرفی

این فایل JSON یک ساختار کامل و حرفه‌ای برای مدیریت ماژول‌های سیستم ریحان است. این ساختار به شما امکان می‌دهد تا اطلاعات مربوط به ماژول‌های مختلف سیستم از جمله منابع انسانی، مالی، قرارداد، انبار، مدیریت اسناد و زنجیره تامین را به‌صورت متمرکز مدیریت کنید.

---

## 🗂️ ساختار فایل

```
modules.json
├── ماژول‌های اصلی          # لیست ماژول‌های سیستم
│   ├── id                  # شناسه یکتا
│   ├── title               # عنوان ماژول
│   ├── mainImage           # تصویر اصلی
│   ├── description         # توضیحات کوتاه
│   ├── longDescription     # توضیحات کامل
│   ├── features            # لیست ویژگی‌ها
│   │   ├── title           # عنوان ویژگی
│   │   ├── description     # توضیحات ویژگی
│   │   ├── iconKey         # نام آیکون
│   │   └── image           # تصویر ویژگی
│   ├── benefits            # لیست مزایا
│   ├── screenshot          # تصویر اسکرین‌شات
│   └── tabs                # برگه‌های اطلاعاتی (اختیاری)
│       ├── id              # شناسه برگه
│       ├── label           # برچسب برگه
│       ├── color           # رنگ برگه
│       ├── pdfUrl          # آدرس فایل PDF
│       ├── images          # لیست تصاویر
│       └── content         # محتوای برگه
│           ├── title       # عنوان محتوا
│           ├── subtitle    # زیرنویس
│           ├── goal        # هدف
│           ├── steps       # مراحل
│           ├── inputs      # ورودی‌ها
│           ├── outputs     # خروجی‌ها
│           └── roles       # نقش‌ها
```

---

## 📋 توضیحات بخش‌ها

### 1. ماژول‌های اصلی

هر ماژول شامل اطلاعات کاملی درباره یک سامانه است:

#### فیلدهای اصلی ماژول

| فیلد | نوع | توضیح | ضروری |
|------|-----|-------|-------|
| `id` | number | شناسه یکتا | ✅ |
| `title` | string | عنوان ماژول | ✅ |
| `mainImage` | string | آدرس تصویر اصلی | ✅ |
| `description` | string | توضیحات کوتاه | ✅ |
| `longDescription` | string | توضیحات کامل | ✅ |
| `features` | array | لیست ویژگی‌ها | ✅ |
| `benefits` | array | لیست مزایا | ✅ |
| `screenshot` | string | آدرس اسکرین‌شات | ✅ |
| `tabs` | array | برگه‌های اطلاعاتی | ❌ |

#### ساختار ویژگی‌ها (Features)

| فیلد | نوع | توضیح | ضروری |
|------|-----|-------|-------|
| `title` | string | عنوان ویژگی | ✅ |
| `description` | string | توضیحات ویژگی | ✅ |
| `iconKey` | string | نام آیکون (از کتابخانه آیکون) | ✅ |
| `image` | string | آدرس تصویر ویژگی | ✅ |

#### ساختار مزایا (Benefits)

آرایه‌ای از رشته‌ها که هر کدام یک مزیت را描述 می‌کنند:

```json
"benefits": [
  "کاهش 60% زمان پردازش اطلاعات پرسنلی",
  "کاهش 40% خطاهای محاسباتی حقوق و دستمزد"
]
```

---

### 2. برگه‌های اطلاعاتی (Tabs)

برگه‌ها برای نمایش اطلاعات تفصیلی یک ماژول استفاده می‌شوند. این بخش به‌ویژه برای ماژول‌های پیچیده مانند زنجیره تامین کاربرد دارد.

#### ساختار برگه‌ها

| فیلد | نوع | توضیح | ضروری |
|------|-----|-------|-------|
| `id` | string | شناسه یکتا | ✅ |
| `label` | string | برچسب نمایشی | ✅ |
| `color` | string | کلاس‌های رنگ Tailwind | ✅ |
| `tabColor` | string | کلاس‌های رنگ برگه | ✅ |
| `tabBadge` | string | کلاس‌های رنگ نشان | ✅ |
| `pdfUrl` | string | آدرس فایل PDF | ❌ |
| `images` | array | لیست آدرس تصاویر | ❌ |
| `content` | object | محتوای برگه | ✅ |

#### ساختار محتوای برگه (Content)

| فیلد | نوع | توضیح | ضروری |
|------|-----|-------|-------|
| `title` | string | عنوان محتوا | ✅ |
| `subtitle` | string | زیرنویس | ✅ |
| `goal` | string | هدف برگه | ✅ |
| `steps` | array | مراحل اجرایی | ❌ |
| `inputs` | array | ورودی‌ها | ❌ |
| `outputs` | array | خروجی‌ها | ❌ |
| `roles` | array | نقش‌ها | ❌ |

#### ساختار مراحل (Steps)

| فیلد | نوع | توضیح |
|------|-----|-------|
| `num` | string | شماره مرحله |
| `title` | string | عنوان مرحله |
| `desc` | string | توضیحات مرحله |

#### ساختار نقش‌ها (Roles)

| فیلد | نوع | توضیح |
|------|-----|-------|
| `name` | string | نام نقش |
| `duty` | string | وظیفه نقش |

---

## 🚀 نحوه استفاده

### 1. نصب و راه‌اندازی

فایل `modules.json` را در مسیر مناسب پروژه قرار دهید:

```
app/
└── data/
    └── modules.json
```

### 2. ایمپورت در صفحات

```tsx
import modulesData from '@/data/modules.json';

// دریافت لیست تمام ماژول‌ها
const modules = modulesData;

// دریافت یک ماژول خاص
const hrModule = modulesData.find(m => m.id === 1);
```

### 3. نمایش ماژول‌ها

#### نمایش لیست ماژول‌ها

```tsx
{modulesData.map((module) => (
  <div key={module.id} className="module-card">
    <Image src={module.mainImage} alt={module.title} />
    <h2>{module.title}</h2>
    <p>{module.description}</p>
    <Link href={`/modules/${module.id}`}>
      مشاهده جزئیات
    </Link>
  </div>
))}
```

#### نمایش ویژگی‌های یک ماژول

```tsx
{module.features.map((feature, index) => (
  <div key={index} className="feature-item">
    <Icon name={feature.iconKey} />
    <h3>{feature.title}</h3>
    <p>{feature.description}</p>
    <Image src={feature.image} alt={feature.title} />
  </div>
))}
```

#### نمایش مزایا

```tsx
<ul className="benefits-list">
  {module.benefits.map((benefit, index) => (
    <li key={index}>{benefit}</li>
  ))}
</ul>
```

### 4. نمایش برگه‌ها (Tabs)

```tsx
const [activeTab, setActiveTab] = useState(module.tabs[0]?.id);

{module.tabs?.map((tab) => (
  <button
    key={tab.id}
    className={`tab-button ${activeTab === tab.id ? tab.color : tab.tabColor}`}
    onClick={() => setActiveTab(tab.id)}
  >
    {tab.label}
    {tab.tabBadge && <span className={`badge ${tab.tabBadge}`} />}
  </button>
))}

{/* نمایش محتوای برگه فعال */}
{module.tabs?.map((tab) => (
  <div key={tab.id} className={activeTab === tab.id ? 'block' : 'hidden'}>
    <h3>{tab.content.title}</h3>
    <p>{tab.content.subtitle}</p>
    <p>{tab.content.goal}</p>
    
    {/* نمایش مراحل */}
    {tab.content.steps?.map((step) => (
      <div key={step.num}>
        <span>{step.num}</span>
        <h4>{step.title}</h4>
        <p>{step.desc}</p>
      </div>
    ))}
    
    {/* نمایش ورودی‌ها */}
    {tab.content.inputs?.map((input) => (
      <span key={input}>{input}</span>
    ))}
    
    {/* نمایش خروجی‌ها */}
    {tab.content.outputs?.map((output) => (
      <span key={output}>{output}</span>
    ))}
    
    {/* نمایش نقش‌ها */}
    {tab.content.roles?.map((role) => (
      <div key={role.name}>
        <strong>{role.name}</strong>
        <p>{role.duty}</p>
      </div>
    ))}
    
    {/* نمایش تصاویر */}
    {tab.images?.map((image) => (
      <Image key={image} src={image} alt={tab.label} />
    ))}
    
    {/* لینک دانلود PDF */}
    {tab.pdfUrl && (
      <a href={tab.pdfUrl} download>
        دانلود مستندات
      </a>
    )}
  </div>
))}
```

---

## 🔧 توابع کمکی پیشنهادی

### دریافت ماژول با شناسه

```tsx
function getModuleById(id: number) {
  return modulesData.find(m => m.id === id) || null;
}
```

### دریافت ماژول‌های یک دسته خاص

```tsx
function getModulesByCategory(category: string) {
  // بر اساس نیاز می‌توانید فیلتر اضافه کنید
  return modulesData;
}
```

### دریافت ویژگی‌های یک ماژول

```tsx
function getModuleFeatures(moduleId: number) {
  const module = getModuleById(moduleId);
  return module?.features || [];
}
```

### دریافت مزایای یک ماژول

```tsx
function getModuleBenefits(moduleId: number) {
  const module = getModuleById(moduleId);
  return module?.benefits || [];
}
```

### دریافت برگه‌های یک ماژول

```tsx
function getModuleTabs(moduleId: number) {
  const module = getModuleById(moduleId);
  return module?.tabs || [];
}
```

### دریافت برگه با شناسه

```tsx
function getTabById(moduleId: number, tabId: string) {
  const tabs = getModuleTabs(moduleId);
  return tabs.find(t => t.id === tabId) || null;
}
```

---

## 📝 دستورالعمل اضافه کردن ماژول جدید

### 1. ساختار ماژول جدید

```json
{
  "id": 7,
  "title": "سامانه جدید",
  "mainImage": "/images/modules/main/7.jpg",
  "description": "توضیحات کوتاه ماژول جدید",
  "longDescription": "توضیحات کامل ماژول جدید با جزئیات بیشتر...",
  "features": [
    {
      "title": "ویژگی اول",
      "description": "توضیحات ویژگی اول",
      "iconKey": "FaIconName",
      "image": "/images/modules/new/feature1.png"
    },
    {
      "title": "ویژگی دوم",
      "description": "توضیحات ویژگی دوم",
      "iconKey": "FaIconName2",
      "image": "/images/modules/new/feature2.png"
    }
  ],
  "benefits": [
    "مزیت اول: شرح مزیت",
    "مزیت دوم: شرح مزیت",
    "مزیت سوم: شرح مزیت"
  ],
  "screenshot": "/images/portfolio/new-screenshot.jpg"
}
```

### 2. اضافه کردن برگه‌ها (اختیاری)

```json
"tabs": [
  {
    "id": "overview",
    "label": "معرفی کلی",
    "color": "bg-slate-700 text-white border-slate-700",
    "tabColor": "bg-slate-50 text-slate-800 border-slate-200",
    "tabBadge": "bg-slate-700",
    "pdfUrl": "/documents/new-module/main.pdf",
    "images": ["/images/modules/new/main.png"],
    "content": {
      "title": "عنوان محتوای برگه",
      "subtitle": "زیرنویس محتوای برگه",
      "goal": "هدف از این برگه...",
      "steps": [
        {
          "num": "۱",
          "title": "مرحله اول",
          "desc": "توضیحات مرحله اول"
        }
      ],
      "inputs": ["ورودی اول", "ورودی دوم"],
      "outputs": ["خروجی اول", "خروجی دوم"],
      "roles": [
        {
          "name": "نقش اول",
          "duty": "وظیفه نقش اول"
        }
      ]
    }
  }
]
```

### 3. آپلود تصاویر

- تصویر اصلی: `/images/modules/main/{id}.jpg`
- تصاویر ویژگی‌ها: `/images/modules/{module-name}/feature-number.png`
- اسکرین‌شات: `/images/portfolio/{id}.jpg`
- تصاویر برگه‌ها: `/images/modules/{module-name}/tab-image.png`

---

## 🎨 نکات طراحی و رنگ‌بندی

### کلاس‌های رنگ برگه‌ها

| کلاس | کاربرد |
|------|--------|
| `bg-slate-700 text-white` | برگه فعال با رنگ اسلیت |
| `bg-slate-50 text-slate-800` | برگه غیرفعال اسلیت |
| `bg-rose-600 text-white` | برگه فعال با رنگ رز |
| `bg-amber-500 text-white` | برگه فعال با رنگ کهربایی |
| `bg-sky-500 text-white` | برگه فعال با رنگ آسمانی |
| `bg-emerald-500 text-white` | برگه فعال با رنگ زمردی |

### نام آیکون‌های رایج

| نام آیکون | کاربرد |
|-----------|--------|
| `FaUsers` | مدیریت کاربران و پرسنل |
| `FaMoneyBillWave` | امور مالی و حقوق |
| `FaWarehouse` | انبار و موجودی |
| `FaFileContract` | قراردادها |
| `FaChartLine` | گزارش‌ها و آمار |
| `FaCog` | تنظیمات |
| `FiFile` | فایل و اسناد |
| `FiLock` | امنیت و دسترسی |
| `FiSearch` | جستجو |
| `FiLayers` | لایه‌ها و نسخه‌ها |

---

## 🛠️ بهترین روش‌ها

### 1. مدیریت داده‌ها
- همیشه از `id` برای شناسایی ماژول‌ها استفاده کنید
- `id`ها باید یکتا و ترتیبی باشند
- برای ماژول‌های جدید از `id` بعدی استفاده کنید

### 2. بهینه‌سازی تصاویر
- تصاویر را در فرمت WebP یا JPEG بهینه قرار دهید
- ابعاد استاندارد تصویر اصلی: 1200x800
- ابعاد تصاویر ویژگی‌ها: 600x400
- ابعاد اسکرین‌شات: 1200x700

### 3. نوشتن توضیحات
- توضیحات کوتاه (`description`): حداکثر 200 کاراکتر
- توضیحات بلند (`longDescription`): 200-500 کاراکتر
- توضیحات ویژگی‌ها: 50-150 کاراکتر
- مزایا: 30-80 کاراکتر

### 4. ترتیب ماژول‌ها
- ماژول‌های اصلی و پرکاربرد را در ابتدا قرار دهید
- ماژول‌های تخصصی را در انتها قرار دهید

### 5. برگه‌ها
- اولین برگه باید برگه "معرفی کلی" باشد
- ترتیب برگه‌ها باید منطقی و بر اساس جریان کاری باشد
- تعداد برگه‌ها را محدود نگه دارید (حداکثر 10 برگه)

---

## ⚡ نکات عملکردی

### 1. کش کردن داده‌ها

```tsx
import modulesData from '@/data/modules.json';

// در Next.js با App Router
export const revalidate = 3600; // هر 1 ساعت
```

### 2. لودینگ تدریجی

```tsx
import { motion } from 'framer-motion';

{modulesData.map((module, index) => (
  <motion.div
    key={module.id}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
  >
    {/* محتوای ماژول */}
  </motion.div>
))}
```

### 3. بهینه‌سازی تصاویر

```tsx
import Image from 'next/image';

<Image
  src={module.mainImage}
  alt={module.title}
  width={1200}
  height={800}
  priority={module.id === 1}
  className="object-cover"
/>
```

### 4. لودینگ با Suspense

```tsx
import { Suspense } from 'react';

<Suspense fallback={<ModuleSkeleton />}>
  <ModuleList modules={modulesData} />
</Suspense>
```

---

## 🐛 عیب‌یابی رایج

### مشکل: ماژول نمایش داده نمی‌شود
- بررسی کنید `id` در لینک و JSON یکسان باشد
- مطمئن شوید مسیر فایل `modules.json` درست است
- داده‌های JSON را با یک اعتبارسنج بررسی کنید

### مشکل: تصویر نمایش داده نمی‌شود
- مسیر تصویر را بررسی کنید
- تصویر را در پوشه `public/` قرار دهید
- فرمت تصویر را بررسی کنید (jpg, png, webp)
- از `/` در ابتدای مسیر استفاده کنید

### مشکل: آیکون نمایش داده نمی‌شود
- نام آیکون را در `iconKey` بررسی کنید
- مطمئن شوید کتابخانه آیکون نصب شده است
- از آیکون‌های موجود در پروژه استفاده کنید

### مشکل: برگه‌ها کار نمی‌کنند
- `id` برگه‌ها را بررسی کنید (باید یکتا باشد)
- استیت فعال‌سازی برگه را بررسی کنید
- کلاس‌های نمایش/مخفی‌سازی را بررسی کنید

### مشکل: PDF دانلود نمی‌شود
- مسیر `pdfUrl` را بررسی کنید
- فایل PDF را در پوشه `public/` قرار دهید
- از لینک مطلق استفاده کنید: `/documents/...`

---

## 📊 مثال کامل استفاده

```tsx
import modulesData from '@/data/modules.json';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function ModulesPage() {
  const [activeModuleId, setActiveModuleId] = useState(1);
  const [activeTabId, setActiveTabId] = useState('overview');

  const activeModule = modulesData.find(m => m.id === activeModuleId);

  return (
    <div className="container mx-auto p-4">
      {/* لیست ماژول‌ها */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modulesData.map((module) => (
          <div
            key={module.id}
            className={`module-card p-4 border rounded-lg cursor-pointer ${
              activeModuleId === module.id ? 'border-blue-500' : 'border-gray-200'
            }`}
            onClick={() => setActiveModuleId(module.id)}
          >
            <Image
              src={module.mainImage}
              alt={module.title}
              width={400}
              height={250}
              className="rounded-lg"
            />
            <h2 className="text-xl font-bold mt-2">{module.title}</h2>
            <p className="text-gray-600">{module.description}</p>
          </div>
        ))}
      </div>

      {/* جزئیات ماژول فعال */}
      {activeModule && (
        <div className="mt-8 p-6 border rounded-lg">
          <h1 className="text-3xl font-bold">{activeModule.title}</h1>
          <p className="text-gray-600 mt-2">{activeModule.longDescription}</p>

          {/* برگه‌ها */}
          {activeModule.tabs && (
            <div className="mt-4">
              <div className="flex gap-2 flex-wrap">
                {activeModule.tabs.map((tab) => (
                  <button
                    key={tab.id}
                    className={`px-4 py-2 rounded-lg border transition-all ${
                      activeTabId === tab.id ? tab.color : tab.tabColor
                    }`}
                    onClick={() => setActiveTabId(tab.id)}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* محتوای برگه فعال */}
              {activeModule.tabs.map((tab) => (
                <div key={tab.id} className={activeTabId === tab.id ? 'block' : 'hidden'}>
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <h3 className="text-2xl font-bold">{tab.content.title}</h3>
                    <p className="text-gray-600">{tab.content.subtitle}</p>
                    <p className="mt-2">{tab.content.goal}</p>

                    {/* مراحل */}
                    {tab.content.steps && (
                      <div className="mt-4">
                        <h4 className="font-bold">مراحل:</h4>
                        {tab.content.steps.map((step) => (
                          <div key={step.num} className="mt-2 p-2 bg-white rounded border">
                            <span className="font-bold">{step.num}</span>
                            <span className="mx-2">{step.title}</span>
                            <p className="text-gray-600">{step.desc}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* ورودی‌ها و خروجی‌ها */}
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      {tab.content.inputs && (
                        <div>
                          <h4 className="font-bold">ورودی‌ها:</h4>
                          <ul className="list-disc list-inside">
                            {tab.content.inputs.map((input) => (
                              <li key={input}>{input}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {tab.content.outputs && (
                        <div>
                          <h4 className="font-bold">خروجی‌ها:</h4>
                          <ul className="list-disc list-inside">
                            {tab.content.outputs.map((output) => (
                              <li key={output}>{output}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    {/* نقش‌ها */}
                    {tab.content.roles && (
                      <div className="mt-4">
                        <h4 className="font-bold">نقش‌ها:</h4>
                        {tab.content.roles.map((role) => (
                          <div key={role.name} className="mt-2 p-2 bg-white rounded border">
                            <span className="font-bold">{role.name}</span>
                            <p className="text-gray-600">{role.duty}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* دانلود PDF */}
                    {tab.pdfUrl && (
                      <a
                        href={tab.pdfUrl}
                        download
                        className="inline-block mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        📄 دانلود مستندات
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ویژگی‌ها */}
          <div className="mt-6">
            <h3 className="text-xl font-bold">ویژگی‌ها:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              {activeModule.features.map((feature, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <h4 className="font-bold">{feature.title}</h4>
                  <p className="text-gray-600">{feature.description}</p>
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    width={200}
                    height={150}
                    className="mt-2 rounded"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* مزایا */}
          <div className="mt-6">
            <h3 className="text-xl font-bold">مزایا:</h3>
            <ul className="list-disc list-inside mt-2">
              {activeModule.benefits.map((benefit, index) => (
                <li key={index} className="text-gray-700">{benefit}</li>
              ))}
            </ul>
          </div>

          {/* اسکرین‌شات */}
          <div className="mt-6">
            <h3 className="text-xl font-bold">پیش‌نمایش:</h3>
            <Image
              src={activeModule.screenshot}
              alt={activeModule.title}
              width={800}
              height={450}
              className="mt-2 rounded-lg border"
            />
          </div>
        </div>
      )}
    </div>
  );
}
```

---

## 🔄 آپدیت و نگهداری

### به‌روزرسانی JSON
1. فایل `modules.json` را ویرایش کنید
2. تغییرات را با یک اعتبارسنج JSON بررسی کنید
3. در صورت استفاده از Git، تغییرات را commit و push کنید

### افزودن ماژول جدید
1. آخرین `id` را پیدا کنید و یک عدد جدید انتخاب کنید
2. ساختار ماژول جدید را با دقت ایجاد کنید
3. تصاویر مربوطه را در پوشه‌های مناسب قرار دهید
4. داده‌ها را در فایل JSON اضافه کنید
5. تغییرات را تست کنید

### حذف ماژول
1. ماژول مورد نظر را از آرایه حذف کنید
2. `id`های باقی‌مانده را می‌توانید ثابت نگه دارید
3. تصاویر مربوطه را نیز پاک کنید

---

## 📞 پشتیبانی

در صورت بروز مشکل یا سوال:

1. **مستندات Next.js** را بررسی کنید
2. از **ابزارهای اعتبارسنجی JSON** استفاده کنید (مانند JSONLint)
3. ساختار داده را با **نمونه‌های موجود** مقایسه کنید
4. مطمئن شوید که **مسیرهای فایل** درست هستند
5. **برچسب‌های HTML** و **کلاس‌های Tailwind** را بررسی کنید

---

## 📦 منابع و ابزارهای مفید

### کتابخانه‌های آیکون
- **Font Awesome**: `react-icons/fa`
- **Feather Icons**: `react-icons/fi`
- **Material Icons**: `react-icons/md`

### ابزارهای اعتبارسنجی JSON
- [JSONLint](https://jsonlint.com/)
- [JSON Formatter](https://jsonformatter.org/)

### ابزارهای بهینه‌سازی تصویر
- [ImageOptim](https://imageoptim.com/)
- [TinyPNG](https://tinypng.com/)
- [Squoosh](https://squoosh.app/)


---

**موفق باشید!** 🚀