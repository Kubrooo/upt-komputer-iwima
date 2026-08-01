import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

function nonBlockingCssPlugin() {
  return {
    name: 'non-blocking-css',
    transformIndexHtml(html) {
      return html.replace(
        /<link rel="stylesheet"([^>]+)href="([^"]+\.css)"([^>]*)>/g,
        '<link rel="preload" href="$2" as="style"><link rel="stylesheet"$1href="$2"$3 media="print" onload="this.media=\'all\'"><noscript><link rel="stylesheet"$1href="$2"$3></noscript>'
      );
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
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-framer': ['framer-motion'],
          'vendor-lucide': ['lucide-react'],
          'vendor-confetti': ['canvas-confetti']
        }
      }
    }
  }
})
