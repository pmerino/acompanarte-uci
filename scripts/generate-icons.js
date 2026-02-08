const sharp = require('sharp');
const path = require('path');

async function generateIcon(size, filename) {
  const svg = `
    <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${size}" height="${size}" rx="${size * 0.2}" fill="#4A90B8"/>
      <text x="50%" y="55%" text-anchor="middle" dominant-baseline="central"
            font-size="${size * 0.45}" fill="white" font-family="Arial">&#x2665;</text>
    </svg>
  `;

  await sharp(Buffer.from(svg))
    .resize(size, size)
    .png()
    .toFile(path.join(__dirname, '..', 'public', filename));

  console.log(`Generated ${filename}`);
}

async function main() {
  await generateIcon(192, 'icon-192.png');
  await generateIcon(512, 'icon-512.png');
}

main().catch(console.error);
