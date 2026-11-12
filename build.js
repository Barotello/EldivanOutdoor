const fs = require('fs');
const path = require('path');

const srcDir = __dirname;
const destDir = path.join(__dirname, 'public');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

// Kopyalanmayacak dosya ve klasörler
const exclude = [
  'node_modules',
  '.git',
  '.gemini',
  'public',
  'build.js',
  'package.json',
  'package-lock.json',
  'vercel.json',
  'README.md',
  'proje.md'
];

const items = fs.readdirSync(srcDir);
for (const item of items) {
  if (exclude.includes(item)) continue;
  const src = path.join(srcDir, item);
  const dest = path.join(destDir, item);
  try {
    fs.cpSync(src, dest, { recursive: true, force: true });
  } catch (err) {
    console.warn(`Uyarı: ${item} kopyalanamadı:`, err.message);
  }
}

console.log('Build başarılı: Tüm statik dosyalar public/ dizinine kopyalandı.');
