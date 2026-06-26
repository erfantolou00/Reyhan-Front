const fs = require('fs');
const path = require('path');
function copyDir(src, dest) {
  if (!fs.existsSync(src)) {
    console.error(`Missing source folder: ${src}`);
    process.exit(1);
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
}
copyDir('public', '.next/standalone/public');
copyDir('.next/static', '.next/standalone/.next/static');
console.log('Copied public/ and .next/static/ into .next/standalone/');
