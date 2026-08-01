import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

function nonBlockingCssPlugin() {
  return {
    name: 'non-blocking-css-and-preload',
    transformIndexHtml(html) {
      // 1. Transform CSS stylesheet link to non-blocking preload
      let transformed = html.replace(
        /<link rel="stylesheet"([^>]+)href="([^"]+\.css)"([^>]*)>/g,
        '<link rel="preload" href="$2" as="style"><link rel="stylesheet"$1href="$2"$3 media="print" onload="this.media=\'all\'"><noscript><link rel="stylesheet"$1href="$2"$3></noscript>'
      );

      // 2. Inject modulepreload for entry JS file into <head> to break Critical Request Chain
      const scriptMatch = html.match(/<script type="module"([^>]+)src="([^"]+\.js)"([^>]*)>/);
      if (scriptMatch && scriptMatch[2]) {
        const entryJs = scriptMatch[2];
        const preloadTag = `<link rel="modulepreload" href="${entryJs}">`;
        if (!transformed.includes(preloadTag)) {
          transformed = transformed.replace('</head>', `  ${preloadTag}\n</head>`);
        }
      }

      return transformed;
    }
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), nonBlockingCssPlugin()],
  server: {
    port: 3000,
    open: false
  },
  build: {
    target: 'esnext',
    cssCodeSplit: true,
    modulePreload: {
      polyfill: false
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) {
            return 'vendor-react';
          }
          if (id.includes('node_modules/framer-motion/')) {
            return 'vendor-framer';
          }
          if (id.includes('node_modules/lucide-react/')) {
            return 'vendor-lucide';
          }
          if (id.includes('node_modules/canvas-confetti/')) {
            return 'vendor-confetti';
          }
        }
      }
    }
  }
})
