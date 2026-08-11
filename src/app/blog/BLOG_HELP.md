# 📚 راهنمای کامل استفاده از فایل JSON وبلاگ ریحان

## 📖 معرفی

این فایل JSON یک ساختار کامل و حرفه‌ای برای مدیریت محتوای وبلاگ در پروژه‌های Next.js است. این ساختار به شما امکان می‌دهد تا مقالات، دسته‌بندی‌ها، نویسندگان، برچسب‌ها و اطلاعات جانبی وبلاگ را به‌صورت متمرکز مدیریت کنید.

---

## 🗂️ ساختار فایل

```
blog.json
├── meta                # اطلاعات سئو و متا
├── hero                # بخش هدر وبلاگ
├── categories          # لیست دسته‌بندی‌ها
├── posts               # لیست مقالات
├── sidebar             # تنظیمات سایدبار
├── share               # تنظیمات اشتراک‌گذاری
└── seo                 # تنظیمات سئو
```

---

## 📋 توضیحات بخش‌ها

### 1. بخش Meta

اطلاعات سئو و متای اصلی وبلاگ:

```json
"meta": {
  "title": "بلاگ ریحان | مقالات مدیریت و ERP",
  "description": "آخرین مقالات و تجربیات در حوزه مدیریت سازمانی...",
  "keywords": "ERP, مدیریت سازمانی, هوش مصنوعی, ...",
  "author": "تیم ریحان",
  "siteName": "ریحان",
  "locale": "fa_IR",
  "type": "website"
}
```

| فیلد | توضیح | نمونه |
|------|-------|-------|
| `title` | عنوان اصلی وبلاگ | "بلاگ ریحان \| مقالات مدیریت و ERP" |
| `description` | توضیحات برای SEO | "آخرین مقالات و تجربیات..." |
| `keywords` | کلمات کلیدی | "ERP, مدیریت سازمانی, ..." |
| `author` | نام نویسنده/ناشر | "تیم ریحان" |
| `siteName` | نام سایت | "ریحان" |
| `locale` | زبان و منطقه | "fa_IR" |
| `type` | نوع محتوا | "website" |

### 2. بخش Hero

تنظیمات بخش هدر وبلاگ:

```json
"hero": {
  "title": "مجله مدیریت و فناوری",
  "subtitle": "آخرین مقالات و تجربیات تیم ریحان...",
  "badge": "بلاگ آموزشی",
  "stats": {
    "posts": "۶",
    "readingTime": "۹۵ دقیقه",
    "authors": "۵",
    "categories": "۳"
  }
}
```

| فیلد | توضیح | نمونه |
|------|-------|-------|
| `title` | عنوان اصلی هدر | "مجله مدیریت و فناوری" |
| `subtitle` | زیرنویس هدر | "آخرین مقالات و تجربیات..." |
| `badge` | برچسب نمایشی | "بلاگ آموزشی" |
| `stats` | آمارهای نمایشی | تعداد مقالات، زمان مطالعه و... |

### 3. بخش Categories

لیست دسته‌بندی‌های وبلاگ:

```json
"categories": [
  {
    "id": 100,
    "name": "ERP و مدیریت سازمانی",
    "icon": "Briefcase",
    "color": "primary",
    "description": "مقالات مرتبط با سیستم‌های برنامه‌ریزی منابع سازمانی"
  }
]
```

| فیلد | توضیح | مقادیر مجاز |
|------|-------|-------------|
| `id` | شناسه یکتا | عدد (100, 200, 300, ...) |
| `name` | نام دسته‌بندی | متن فارسی |
| `icon` | نام آیکون | Briefcase, Brain, Code, ... |
| `color` | رنگ دسته‌بندی | primary, secondary, accent |
| `description` | توضیحات | متن |

### 4. بخش Posts (مقالات)

لیست کامل مقالات:

```json
{
  "id": 1,
  "title": "آموزش ERP و مفاهیم آن",
  "subtitle": "راهنمای جامع برای درک مفاهیم پایه...",
  "slug": "erp-concepts-and-training",
  "image_url": "/images/blog/1.webp",
  "content": "محتوای کامل مقاله...",
  "category_id": 100,
  "reading_time": 8,
  "published_at": "2026-07-03 11:47:49",
  "status": "published",
  "author": "احمد رضایی",
  "author_avatar": "/images/authors/1.jpg",
  "author_bio": "مدیر عامل و بنیان‌گذار ریحان...",
  "author_email": "ahmad@reyhan.com",
  "author_linkedin": "https://linkedin.com/in/ahmad-rezai",
  "views": 1245,
  "likes": 89,
  "comments": 23,
  "featured": false,
  "tags": ["ERP", "مدیریت سازمانی", "آموزش ERP"]
}
```

| فیلد | نوع | توضیح | ضروری |
|------|-----|-------|-------|
| `id` | number | شناسه یکتا | ✅ |
| `title` | string | عنوان مقاله | ✅ |
| `subtitle` | string | زیرنویس مقاله | ✅ |
| `slug` | string | آدرس URL (یکتا) | ✅ |
| `image_url` | string | آدرس تصویر شاخص | ✅ |
| `content` | string | محتوای کامل (با Markdown) | ✅ |
| `category_id` | number | شناسه دسته‌بندی | ✅ |
| `reading_time` | number | زمان مطالعه (دقیقه) | ❌ |
| `published_at` | string | تاریخ انتشار (ISO) | ✅ |
| `status` | string | وضعیت مقاله | ❌ |
| `author` | string | نام نویسنده | ✅ |
| `author_avatar` | string | آدرس تصویر نویسنده | ❌ |
| `author_bio` | string | بیوگرافی نویسنده | ❌ |
| `author_email` | string | ایمیل نویسنده | ❌ |
| `author_linkedin` | string | لینک LinkedIn | ❌ |
| `views` | number | تعداد بازدید | ❌ |
| `likes` | number | تعداد لایک | ❌ |
| `comments` | number | تعداد کامنت | ❌ |
| `featured` | boolean | مقاله ویژه | ❌ |
| `tags` | array | لیست برچسب‌ها | ❌ |

### 5. بخش Sidebar

تنظیمات سایدبار:

```json
"sidebar": {
  "recentPosts": 4,
  "popularTags": [
    { "name": "ERP", "count": 12 },
    { "name": "مدیریت سازمانی", "count": 8 }
  ],
  "featuredPosts": [4, 1, 6],
  "authors": [
    { "name": "احمد رضایی", "avatar": "/images/authors/1.jpg", "posts": 1 }
  ]
}
```

| فیلد | توضیح |
|------|-------|
| `recentPosts` | تعداد مقالات اخیر در سایدبار |
| `popularTags` | لیست برچسب‌های پرکاربرد |
| `featuredPosts` | شناسه مقالات ویژه |
| `authors` | لیست نویسندگان با آمار |

### 6. بخش Share

تنظیمات اشتراک‌گذاری:

```json
"share": {
  "title": "اشتراک‌گذاری مقاله",
  "button": "اشتراک‌گذاری",
  "copied": "لینک کپی شد!",
  "description": "این مقاله را با دوستان خود به اشتراک بگذارید"
}
```

### 7. بخش SEO

تنظیمات پیشرفته سئو:

```json
"seo": {
  "ogImage": "/images/blog/og-image.jpg",
  "twitterCard": "summary_large_image",
  "twitterSite": "@reyhan_erp"
}
```

---

## 🚀 نحوه استفاده

### 1. نصب و راه‌اندازی

فایل `blog.json` را در مسیر `app/blog/` قرار دهید:

```
app/
└── blog/
    ├── blog.json
    ├── page.tsx
    ├── [slug]/
    │   └── page.tsx
    ├── category/
    │   └── [id]/
    │       └── page.tsx
    └── tag/
        └── [name]/
            └── page.tsx
```

### 2. ایمپورت در صفحات

```tsx
import blogData from './blog.json';

// استفاده در صفحه اصلی بلاگ
const posts = blogData.posts;
const categories = blogData.categories;

// استفاده در صفحه جزئیات
const post = blogData.posts.find(p => p.slug === slug);
```

### 3. نمایش مقالات

```tsx
{blogData.posts.map((post) => (
  <Link href={`/blog/${post.slug}`} key={post.id}>
    <h2>{post.title}</h2>
    <p>{post.subtitle}</p>
    <Image src={post.image_url} alt={post.title} />
  </Link>
))}
```

### 4. نمایش دسته‌بندی‌ها

```tsx
{blogData.categories.map((category) => (
  <Link href={`/blog/category/${category.id}`} key={category.id}>
    <span>{category.name}</span>
    <span>{blogData.posts.filter(p => p.category_id === category.id).length}</span>
  </Link>
))}
```

---

## 🔧 توابع کمکی پیشنهادی

### دریافت مقاله با اسلاگ

```tsx
function getPostBySlug(slug: string) {
  return blogData.posts.find(p => p.slug === slug) || null;
}
```

### دریافت مقالات مشابه

```tsx
function getRelatedPosts(post: any, limit = 3) {
  return blogData.posts
    .filter(p => p.id !== post.id && p.category_id === post.category_id)
    .slice(0, limit);
}
```

### دریافت دسته‌بندی با آیدی

```tsx
function getCategoryById(id: number) {
  return blogData.categories.find(c => c.id === id) || null;
}
```

### دریافت مقالات یک دسته‌بندی

```tsx
function getPostsByCategory(categoryId: number) {
  return blogData.posts.filter(p => p.category_id === categoryId);
}
```

### دریافت مقالات با یک برچسب

```tsx
function getPostsByTag(tagName: string) {
  return blogData.posts.filter(p => p.tags?.includes(tagName));
}
```

### دریافت اطلاعات نویسنده

```tsx
function getAuthorInfo(authorName: string) {
  return blogData.sidebar.authors.find(a => a.name === authorName);
}
```

---

## 📝 دستورالعمل اضافه کردن مقاله جدید

1. **آماده‌سازی محتوا**
   - محتوای مقاله را با فرمت Markdown آماده کنید
   - از هدرهای `#`, `##`, `###` استفاده کنید
   - برای لیست‌ها از `-` یا اعداد استفاده کنید

2. **افزودن به JSON**
   ```json
   {
     "id": 8,
     "title": "عنوان مقاله",
     "subtitle": "زیرنویس مقاله",
     "slug": "article-slug",
     "image_url": "/images/blog/new-image.jpg",
     "content": "محتوای کامل مقاله...",
     "category_id": 100,
     "reading_time": 10,
     "published_at": "2026-07-07 00:00:00",
     "status": "published",
     "author": "نام نویسنده",
     "author_avatar": "/images/authors/new-author.jpg",
     "author_bio": "بیوگرافی نویسنده...",
     "tags": ["برچسب1", "برچسب2", "برچسب3"],
     "featured": false,
     "views": 0,
     "likes": 0,
     "comments": 0
   }
   ```

3. **به‌روزرسانی آمار**
   - تعداد مقالات را در `hero.stats.posts` افزایش دهید
   - زمان مطالعه را در `hero.stats.readingTime` به‌روز کنید
   - اگر نویسنده جدید است، به `sidebar.authors` اضافه کنید

4. **آپلود تصاویر**
   - تصویر شاخص را در `public/images/blog/` قرار دهید
   - تصویر نویسنده را در `public/images/authors/` قرار دهید

---

## 🎨 فرمت محتوای Markdown

محتوای مقاله از Markdown پشتیبانی می‌کند:

### هدرها
```markdown
# هدر سطح 1
## هدر سطح 2
### هدر سطح 3
```

### لیست‌ها
```markdown
- آیتم اول
- آیتم دوم
- آیتم سوم

1. آیتم شماره 1
2. آیتم شماره 2
3. آیتم شماره 3
```

### متن
```markdown
پاراگراف معمولی

**متن ضخیم**

*متن ایتالیک*
```

---

## 🛠️ بهترین روش‌ها

### 1. مدیریت داده‌ها
- همیشه از `slug` برای لینک‌ها استفاده کنید، نه `id`
- `slug` باید یکتا و خوانا باشد
- از خط تیره (`-`) برای جداسازی کلمات در `slug` استفاده کنید

### 2. بهینه‌سازی تصاویر
- تصاویر را در فرمت WebP قرار دهید
- ابعاد استاندارد: 1200x630 برای تصویر شاخص
- تصاویر نویسنده: 400x400

### 3. دسته‌بندی‌ها
- هر مقاله باید به یک دسته‌بندی تعلق داشته باشد
- دسته‌بندی‌ها را با `id`های 100، 200، 300 و... شماره‌گذاری کنید

### 4. برچسب‌ها
- از برچسب‌های مرتبط و پرکاربرد استفاده کنید
- هر مقاله 3-5 برچسب داشته باشد
- برچسب‌ها را در `sidebar.popularTags` به‌روز کنید

### 5. تاریخ‌ها
- از فرمت ISO برای تاریخ‌ها استفاده کنید
- `published_at`: "2026-07-07 00:00:00"

---

## ⚡ نکات عملکردی

### 1. کش کردن (Revalidation)
```tsx
export const revalidate = 3600; // هر 1 ساعت
```

### 2. بهینه‌سازی تصاویر
```tsx
<Image
  src={post.image_url}
  alt={post.title}
  fill
  priority={post.featured}
  className="object-cover"
/>
```

### 3. لودینگ تدریجی
```tsx
{posts.map((post, index) => (
  <motion.div
    key={post.id}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
  >
    {/* محتوای مقاله */}
  </motion.div>
))}
```

---

## 🐛 عیب‌یابی رایج

### مشکل: مقاله نمایش داده نمی‌شود
- بررسی کنید `slug` در لینک و JSON یکسان باشد
- مطمئن شوید `status: "published"` است
- مسیر فایل `blog.json` را بررسی کنید

### مشکل: تصویر نمایش داده نمی‌شود
- مسیر تصویر را بررسی کنید
- تصویر را در `public/` قرار دهید
- فرمت تصویر را بررسی کنید

### مشکل: دسته‌بندی پیدا نمی‌شود
- `category_id` را با دسته‌بندی موجود تطابق دهید
- دسته‌بندی را در `categories` اضافه کنید

---

## 📊 مثال کامل استفاده

```tsx
import blogData from './blog.json';

export default function BlogPage() {
  const featuredPosts = blogData.posts.filter(p => p.featured);
  const regularPosts = blogData.posts.filter(p => !p.featured);

  return (
    <div>
      {/* هدر */}
      <h1>{blogData.hero.title}</h1>
      <p>{blogData.hero.subtitle}</p>

      {/* مقالات ویژه */}
      {featuredPosts.map(post => (
        <article key={post.id}>
          <Link href={`/blog/${post.slug}`}>
            <Image src={post.image_url} alt={post.title} />
            <h2>{post.title}</h2>
            <p>{post.subtitle}</p>
            <span>{post.author}</span>
            <span>{post.reading_time} دقیقه</span>
          </Link>
        </article>
      ))}

      {/* مقالات عادی */}
      {regularPosts.map(post => (
        <article key={post.id}>
          <Link href={`/blog/${post.slug}`}>
            <h3>{post.title}</h3>
            <p>{post.subtitle}</p>
          </Link>
        </article>
      ))}
    </div>
  );
}
```

---

## 📦 آپدیت و نگهداری

### به‌روزرسانی JSON
1. فایل `blog.json` را ویرایش کنید
2. تغییرات را commit کنید
3. در صورت استفاده از Git، تغییرات را push کنید

### مهاجرت به دیتابیس
اگر تصمیم به مهاجرت به دیتابیس دارید:
1. داده‌ها را از JSON استخراج کنید
2. به دیتابیس منتقل کنید
3. APIهای مناسب ایجاد کنید
4. کد را به‌روز کنید

---

## 📞 پشتیبانی

در صورت بروز مشکل یا سوال:
- مستندات Next.js را بررسی کنید
- از ابزارهای اعتبارسنجی JSON استفاده کنید
- ساختار داده را با نمونه‌های موجود مقایسه کنید

---

**موفق باشید!** 🚀