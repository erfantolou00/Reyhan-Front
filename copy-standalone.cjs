const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function copyDir(src, dest) {
  if (!fs.existsSync(src)) {
    console.warn(`⚠️  پوشه مبدأ وجود ندارد: ${src}`);
    return false;
  }

  fs.mkdirSync(dest, { recursive: true });

  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
  return true;
}

function incrementVersion(version) {
  const parts = version.split('.').map(Number);
  parts[parts.length - 1] += 1;
  return parts.join('.');
}

function buildAndCopy() {
  console.log('🚀 شروع فرآیند بیلد و کپی...\n');

  // 1. Build
  console.log('📦 مرحله ۱: اجرای Next.js build...');
  try {
    execSync('next build', { stdio: 'inherit', env: process.env });
    console.log('✅ Next.js build با موفقیت انجام شد\n');
  } catch (error) {
    console.error('❌ خطا در Next.js build');
    process.exit(1);
  }

  // 2. بررسی وجود standalone
  const standaloneDir = path.join(process.cwd(), '.next', 'standalone');
  if (!fs.existsSync(standaloneDir)) {
    console.error('❌ پوشه .next/standalone پیدا نشد.');
    console.error('   مطمئن شوید که در next.config.js مقدار output: "standalone" را تنظیم کرده‌اید.');
    process.exit(1);
  }

  // 3. کپی فایل‌ها
  console.log('📁 مرحله ۲: کپی فایل‌ها به standalone...');

  const copies = [
    { src: 'public', dest: path.join(standaloneDir, 'public') },
    { src: path.join('.next', 'static'), dest: path.join(standaloneDir, '.next', 'static') },
  ];

  for (const { src, dest } of copies) {
    if (copyDir(src, dest)) {
      console.log(`✅ ${src} → ${path.relative(process.cwd(), dest)}`);
    }
  }

  console.log('✅ کپی فایل‌ها تمام شد\n');

  // 4. افزایش نسخه
  console.log('📝 مرحله ۳: به‌روزرسانی نسخه...');
  try {
    const packagePath = path.join(process.cwd(), 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf-8'));

    const oldVersion = packageJson.version || '1.0.0';
    const newVersion = incrementVersion(oldVersion);
    packageJson.version = newVersion;

    fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2) + '\n');
    console.log(`✅ نسخه از ${oldVersion} → ${newVersion}`);

    // نوشتن در .env.local
    const envPath = path.join(process.cwd(), '.env.local');
    let envContent = fs.existsSync(envPath) ? fs.readFileSync(envPath, 'utf-8') : '';
    envContent = envContent.replace(/NEXT_PUBLIC_APP_VERSION=.*\n?/g, '');
    envContent = envContent.trim() + `\nNEXT_PUBLIC_APP_VERSION=${newVersion}\n`;
    fs.writeFileSync(envPath, envContent);

    console.log('✅ نسخه در .env.local ذخیره شد');
    console.log(`\n🎉 فرآیند کامل شد! نسخه جدید: v${newVersion}`);
  } catch (error) {
    console.error('❌ خطا در به‌روزرسانی نسخه:', error.message);
    process.exit(1);
  }
}

buildAndCopy();