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

      return transformed;
    }
  };
}

function inlineEntryJsPlugin() {
  return {
    name: 'inline-entry-js',
    enforce: 'post',
    transformIndexHtml(html, ctx) {
      if (!ctx || !ctx.bundle) return html;
      return html.replace(
        /<script type="module"([^>]+)src="([^"]+\.js)"([^>]*)><\/script>/g,
        (match, p1, src) => {
          const fileName = src.replace(/^\//, '');
          const chunk = ctx.bundle[fileName] || Object.values(ctx.bundle).find((b) => b.fileName === fileName);
          if (chunk && chunk.code && chunk.code.length < 35000) {
            delete ctx.bundle[fileName];
            return `<script type="module">${chunk.code}</script>`;
          }
          return match;
        }
      );
    }
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), nonBlockingCssPlugin(), inlineEntryJsPlugin()],
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
