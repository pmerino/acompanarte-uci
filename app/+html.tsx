import { ScrollViewStyleReset } from 'expo-router/html';
import type { PropsWithChildren } from 'react';

export default function Root({ children }: PropsWithChildren) {
  return (
    <html lang="es">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no, viewport-fit=cover"
        />

        {/* PWA */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#4A90B8" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="UCI Río Hortega" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />

        {/* SEO */}
        <meta
          name="description"
          content="App para familias de pacientes en la UCI del Hospital Universitario Río Hortega de Valladolid. Información sobre patologías, dispositivos, horarios y apoyo emocional."
        />
        <title>Acompañarte UCI - Río Hortega</title>

        {/* Service Worker registration with auto-update */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').then(function(reg) {
                    // Check for updates every 60 seconds
                    setInterval(function() { reg.update(); }, 60000);
                    // When a new SW is found and installed, reload to get latest
                    reg.addEventListener('updatefound', function() {
                      var newWorker = reg.installing;
                      if (newWorker) {
                        newWorker.addEventListener('statechange', function() {
                          if (newWorker.state === 'activated' && navigator.serviceWorker.controller) {
                            window.location.reload();
                          }
                        });
                      }
                    });
                  });
                  // Also reload when a new SW takes control
                  navigator.serviceWorker.addEventListener('controllerchange', function() {
                    window.location.reload();
                  });
                });
              }
            `,
          }}
        />

        <ScrollViewStyleReset />

        <style dangerouslySetInnerHTML={{ __html: responsiveBackground }} />
      </head>
      <body>{children}</body>
    </html>
  );
}

const responsiveBackground = `
body {
  background-color: #F7F9FB;
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', sans-serif;
  -webkit-font-smoothing: antialiased;
}
/* Limit width on desktop for mobile-first experience */
#root {
  max-width: 480px;
  margin: 0 auto;
  min-height: 100vh;
  min-height: -webkit-fill-available;
  background-color: #F7F9FB;
  box-shadow: 0 0 20px rgba(0,0,0,0.05);
}
@media (max-width: 480px) {
  #root {
    box-shadow: none;
  }
}
/* iOS Safari PWA: prevent bottom bar overlap */
@supports (padding-bottom: env(safe-area-inset-bottom)) {
  #root {
    padding-bottom: env(safe-area-inset-bottom);
  }
}
`;
