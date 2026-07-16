const sharp = require('sharp');
const path = require('path');

const SRC = path.join(__dirname, 'icon-source.svg');
const OUT_DIR = path.join(__dirname, '..', 'public', 'icons');

const SIZES = [16, 32, 180, 192, 512];

(async () => {
  const fs = require('fs');
  fs.mkdirSync(OUT_DIR, { recursive: true });
  for (const size of SIZES) {
    await sharp(SRC).resize(size, size).png().toFile(path.join(OUT_DIR, `icon-${size}.png`));
    console.log(`generated icon-${size}.png`);
  }
})();
