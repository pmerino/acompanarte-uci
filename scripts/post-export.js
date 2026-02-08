const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, '..', 'dist');
const publicDir = path.join(__dirname, '..', 'public');

// Copy public assets to dist
const publicFiles = ['manifest.json', 'sw.js', 'icon-192.png', 'icon-512.png'];
for (const file of publicFiles) {
  const src = path.join(publicDir, file);
  const dest = path.join(distDir, file);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log(`Copied ${file}`);
  }
}

// Inject PWA meta tags into index.html
const indexPath = path.join(distDir, 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');

// Fix lang
html = html.replace('lang="en"', 'lang="es"');

// Fix title
html = html.replace(
  '<title>Acompañarte UCI</title>',
  '<title>Acompañarte UCI - Río Hortega</title>'
);

// Inject PWA tags before </head>
const pwaTags = `
    <!-- PWA -->
    <link rel="manifest" href="/manifest.json" />
    <meta name="theme-color" content="#4A90B8" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="default" />
    <meta name="apple-mobile-web-app-title" content="UCI Río Hortega" />
    <link rel="apple-touch-icon" href="/icon-192.png" />
    <meta name="description" content="App para familias de pacientes en la UCI del Hospital Universitario Río Hortega de Valladolid" />
    <!-- Service Worker -->
    <script>
      if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
          navigator.serviceWorker.register('/sw.js');
        });
      }
    </script>
    <!-- Mobile-first styles -->
    <style>
      body {
        background-color: #F7F9FB;
        margin: 0;
        -webkit-font-smoothing: antialiased;
      }
      #root {
        max-width: 480px;
        margin: 0 auto;
        min-height: 100vh;
        background-color: #F7F9FB;
      }
      @media (min-width: 481px) {
        #root { box-shadow: 0 0 20px rgba(0,0,0,0.05); }
        body { background-color: #E8EDF2; }
      }
    </style>
`;

html = html.replace('</head>', pwaTags + '\n  </head>');

fs.writeFileSync(indexPath, html);
console.log('Injected PWA meta tags into index.html');

// Fix: Vercel ignores node_modules directories even inside dist/assets.
// Rename the assets/node_modules dir to assets/_packages so fonts are served.
const assetsNM = path.join(distDir, 'assets', 'node_modules');
const assetsPkg = path.join(distDir, 'assets', '_packages');
if (fs.existsSync(assetsNM)) {
  fs.renameSync(assetsNM, assetsPkg);
  console.log('Renamed assets/node_modules → assets/_packages');

  // Update references in JS bundle(s)
  const jsDir = path.join(distDir, '_expo', 'static', 'js', 'web');
  if (fs.existsSync(jsDir)) {
    const jsFiles = fs.readdirSync(jsDir).filter(f => f.endsWith('.js'));
    for (const file of jsFiles) {
      const filePath = path.join(jsDir, file);
      let content = fs.readFileSync(filePath, 'utf8');
      if (content.includes('assets/node_modules/')) {
        content = content.replace(/assets\/node_modules\//g, 'assets/_packages/');
        fs.writeFileSync(filePath, content);
        console.log(`Updated references in ${file}`);
      }
    }
  }
}
