# Reyhan Smart Systems - Official Website

<div dir="rtl">

## معرفی پروژه
وب‌سایت رسمی **سیستم‌های هوشمند ریحان**، ارائه‌دهنده راهکارهای نرم‌افزاری جامع در حوزه ERP. این پروژه با هدف معرفی خدمات، جذب مشتریان و ارائه ارتباط مؤثر با مخاطبان طراحی و پیاده‌سازی شده است.

## ویژگی‌های برجسته
- **طراحی مدرن و واکنش‌گرا**: تجربه کاربری عالی در تمامی دستگاه‌ها (موبایل، تبلت، دسکتاپ)
- **پشتیبانی کامل از زبان فارسی (RTL)**: نمایش صحیح محتوای فارسی
- **ساختار سئو شده**: بهینه‌سازی برای موتورهای جستجو
- **دسترسی‌پذیری بالا**: رعایت استانداردهای دسترسی برای همه کاربران
- **انیمیشن‌های روان**: تعاملات جذاب با استفاده از Framer Motion
- **نظافت کد**: استفاده از تایپ‌اسکریپت برای امنیت و نگهداری آسان

## تکنولوژی‌های استفاده شده
| فناوری | کاربرد |
|--------|--------|
| **Next.js 14** | فریمورک اصلی (App Router) |
| **TypeScript** | ایمنی نوع‌ها و توسعه پویا |
| **TailwindCSS** | استایل‌دهی سریع و سفارشی |
| **React Icons** | آیکون‌های زیبا و متنوع |
| **Framer Motion** | انیمیشن‌های روان و پیشرفته |

## شروع سریع

### پیش‌نیازها
- Node.js نسخه 18.17 یا بالاتر
- npm یا yarn

### مراحل نصب و اجرا
```bash
# ۱. دریافت کد
git clone https://github.com/erfantolou00/Reyhan-Front.git
cd Reyhan-Front

# ۲. نصب وابستگی‌ها
npm install
# یا
yarn install

# ۳. اجرای محیط توسعه
npm run dev
# یا
yarn dev
```
سپس مرورگر خود را به آدرس `http://localhost:3000` باز کنید.

## ساختار پروژه
```
Reyhan-Front/
├── src/
│   ├── app/              # مسیریابی و صفحات (App Router)
│   ├── components/       # کامپوننت‌های قابل استفاده مجدد
│   ├── styles/          # استایل‌های سراسری
│   ├── lib/             # توابع کمکی و ابزارها
│   └── types/           # تعاریف نوع‌های TypeScript
├── public/              # فایل‌های استاتیک (تصاویر، فونت‌ها)
├── middleware.ts        # میان‌افزارهای Next.js
├── next.config.js       # تنظیمات Next.js
├── tailwind.config.js   # تنظیمات TailwindCSS
└── package.json         # وابستگی‌ها و اسکریپت‌ها
```

## اسکریپت‌های قابل اجرا
| دستور | توضیح |
|-------|--------|
| `npm run dev` | شروع سرور توسعه با قابلیت بازسازی خودکار |
| `npm run build` | ساخت نسخه نهایی برای انتشار (Production) |
| `npm run start` | اجرای نسخه ساخته شده |
| `npm run lint` | بررسی کیفیت کد با ESLint |

## مشارکت در توسعه
1. مخزن را **فورک** کنید
2. شاخه جدید برای ویژگی مدنظر ایجاد کنید: `git checkout -b feature/amazing-feature`
3. تغییرات را **کامیت** کنید: `git commit -m 'Add some amazing feature'`
4. به شاخه خود **پوش** دهید: `git push origin feature/amazing-feature`
5. یک درخواست **Pull Request** ثبت کنید

## لایسنس
این پروژه تحت لایسنس **MIT** منتشر شده است - برای جزئیات بیشتر فایل `LICENSE` را ببینید.

## ارتباط با ما
**سیستم‌های هوشمند ریحان**
- 📍 آدرس: تهران، خیابان فرشته، جنب رستوران ریواس
- 📞 تلفن: ۰۲۱-XXXXXXXX
- 📧 ایمیل: info@reyhan.ir
- 🌐 وب‌سایت: [reyhan.ir](https://reyhan.ir)

---

</div>

---

## English Version

# Reyhan Smart Systems - Official Website

This is the official website for **Reyhan Smart Systems**, a company specializing in comprehensive ERP software solutions. The project is designed to showcase services, attract customers, and establish effective communication with the audience.

## Key Features
- **Modern & Responsive Design**: Great user experience across all devices
- **Full RTL Support**: Proper display of Persian content
- **SEO Optimized**: Search engine friendly structure
- **Highly Accessible**: Following accessibility standards
- **Smooth Animations**: Engaging interactions with Framer Motion
- **Clean Code**: TypeScript for type safety and maintainability

## Tech Stack
| Technology | Purpose |
|------------|---------|
| **Next.js 14** | Main framework (App Router) |
| **TypeScript** | Type safety and dynamic development |
| **TailwindCSS** | Fast & customizable styling |
| **React Icons** | Beautiful icon set |
| **Framer Motion** | Advanced & smooth animations |

## Quick Start

### Prerequisites
- Node.js 18.17 or later
- npm or yarn

### Installation & Running
```bash
# 1. Clone the repository
git clone https://github.com/erfantolou00/Reyhan-Front.git
cd Reyhan-Front

# 2. Install dependencies
npm install
# or
yarn install

# 3. Run development server
npm run dev
# or
yarn dev
```
Then open `http://localhost:3000` in your browser.

## Project Structure
```
Reyhan-Front/
├── src/
│   ├── app/              # Routing & pages (App Router)
│   ├── components/       # Reusable components
│   ├── styles/          # Global styles
│   ├── lib/             # Utility functions & helpers
│   └── types/           # TypeScript type definitions
├── public/              # Static assets (images, fonts)
├── middleware.ts        # Next.js middleware
├── next.config.js       # Next.js configuration
├── tailwind.config.js   # TailwindCSS configuration
└── package.json         # Dependencies & scripts
```

## Available Scripts
| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint for code quality |

## Contributing
1. **Fork** the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** your changes: `git commit -m 'Add some amazing feature'`
4. **Push** to the branch: `git push origin feature/amazing-feature`
5. Open a **Pull Request**

## License
This project is licensed under the **MIT License** - see the `LICENSE` file for details.

## Contact
**Reyhan Smart Systems**
- 📍 Address: Tehran, Fereshteh Street, next to Rivas Restaurant
- 📞 Phone: 021-XXXXXXXX
- 📧 Email: info@reyhan.ir
- 🌐 Website: [reyhan.ir](https://reyhan.ir)

---

**توسعه‌دهنده / Developer**: [Erfan Tolou](https://github.com/erfantolou00)