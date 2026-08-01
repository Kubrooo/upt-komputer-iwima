// vite.config.js
import { defineConfig } from "file:///C:/Users/Ardiansyah/Documents/upt_komputer_iwima/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/Ardiansyah/Documents/upt_komputer_iwima/node_modules/@vitejs/plugin-react/dist/index.js";
function nonBlockingCssPlugin() {
  return {
    name: "non-blocking-css-and-preload",
    transformIndexHtml(html) {
      let transformed = html.replace(
        /<link rel="stylesheet"([^>]+)href="([^"]+\.css)"([^>]*)>/g,
        `<link rel="preload" href="$2" as="style"><link rel="stylesheet"$1href="$2"$3 media="print" onload="this.media='all'"><noscript><link rel="stylesheet"$1href="$2"$3></noscript>`
      );
      const scriptMatch = html.match(/<script type="module"([^>]+)src="([^"]+\.js)"([^>]*)>/);
      if (scriptMatch && scriptMatch[2]) {
        const entryJs = scriptMatch[2];
        const preloadTag = `<link rel="modulepreload" href="${entryJs}">`;
        if (!transformed.includes(preloadTag)) {
          transformed = transformed.replace("</head>", `  ${preloadTag}
</head>`);
        }
      }
      return transformed;
    }
  };
}
var vite_config_default = defineConfig({
  plugins: [react(), nonBlockingCssPlugin()],
  server: {
    port: 3e3,
    open: false
  },
  build: {
    target: "esnext",
    cssCodeSplit: true,
    modulePreload: {
      polyfill: false
    },
    rollupOptions: {
      output: {
        manualChunks: {
          "vendor-react": ["react", "react-dom"],
          "vendor-framer": ["framer-motion"],
          "vendor-lucide": ["lucide-react"],
          "vendor-confetti": ["canvas-confetti"]
        }
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxBcmRpYW5zeWFoXFxcXERvY3VtZW50c1xcXFx1cHRfa29tcHV0ZXJfaXdpbWFcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXEFyZGlhbnN5YWhcXFxcRG9jdW1lbnRzXFxcXHVwdF9rb21wdXRlcl9pd2ltYVxcXFx2aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvQXJkaWFuc3lhaC9Eb2N1bWVudHMvdXB0X2tvbXB1dGVyX2l3aW1hL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCdcblxuZnVuY3Rpb24gbm9uQmxvY2tpbmdDc3NQbHVnaW4oKSB7XG4gIHJldHVybiB7XG4gICAgbmFtZTogJ25vbi1ibG9ja2luZy1jc3MtYW5kLXByZWxvYWQnLFxuICAgIHRyYW5zZm9ybUluZGV4SHRtbChodG1sKSB7XG4gICAgICAvLyAxLiBUcmFuc2Zvcm0gQ1NTIHN0eWxlc2hlZXQgbGluayB0byBub24tYmxvY2tpbmcgcHJlbG9hZFxuICAgICAgbGV0IHRyYW5zZm9ybWVkID0gaHRtbC5yZXBsYWNlKFxuICAgICAgICAvPGxpbmsgcmVsPVwic3R5bGVzaGVldFwiKFtePl0rKWhyZWY9XCIoW15cIl0rXFwuY3NzKVwiKFtePl0qKT4vZyxcbiAgICAgICAgJzxsaW5rIHJlbD1cInByZWxvYWRcIiBocmVmPVwiJDJcIiBhcz1cInN0eWxlXCI+PGxpbmsgcmVsPVwic3R5bGVzaGVldFwiJDFocmVmPVwiJDJcIiQzIG1lZGlhPVwicHJpbnRcIiBvbmxvYWQ9XCJ0aGlzLm1lZGlhPVxcJ2FsbFxcJ1wiPjxub3NjcmlwdD48bGluayByZWw9XCJzdHlsZXNoZWV0XCIkMWhyZWY9XCIkMlwiJDM+PC9ub3NjcmlwdD4nXG4gICAgICApO1xuXG4gICAgICAvLyAyLiBJbmplY3QgbW9kdWxlcHJlbG9hZCBmb3IgZW50cnkgSlMgZmlsZSBpbnRvIDxoZWFkPiB0byBicmVhayBDcml0aWNhbCBSZXF1ZXN0IENoYWluXG4gICAgICBjb25zdCBzY3JpcHRNYXRjaCA9IGh0bWwubWF0Y2goLzxzY3JpcHQgdHlwZT1cIm1vZHVsZVwiKFtePl0rKXNyYz1cIihbXlwiXStcXC5qcylcIihbXj5dKik+Lyk7XG4gICAgICBpZiAoc2NyaXB0TWF0Y2ggJiYgc2NyaXB0TWF0Y2hbMl0pIHtcbiAgICAgICAgY29uc3QgZW50cnlKcyA9IHNjcmlwdE1hdGNoWzJdO1xuICAgICAgICBjb25zdCBwcmVsb2FkVGFnID0gYDxsaW5rIHJlbD1cIm1vZHVsZXByZWxvYWRcIiBocmVmPVwiJHtlbnRyeUpzfVwiPmA7XG4gICAgICAgIGlmICghdHJhbnNmb3JtZWQuaW5jbHVkZXMocHJlbG9hZFRhZykpIHtcbiAgICAgICAgICB0cmFuc2Zvcm1lZCA9IHRyYW5zZm9ybWVkLnJlcGxhY2UoJzwvaGVhZD4nLCBgICAke3ByZWxvYWRUYWd9XFxuPC9oZWFkPmApO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0cmFuc2Zvcm1lZDtcbiAgICB9XG4gIH07XG59XG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbcmVhY3QoKSwgbm9uQmxvY2tpbmdDc3NQbHVnaW4oKV0sXG4gIHNlcnZlcjoge1xuICAgIHBvcnQ6IDMwMDAsXG4gICAgb3BlbjogZmFsc2VcbiAgfSxcbiAgYnVpbGQ6IHtcbiAgICB0YXJnZXQ6ICdlc25leHQnLFxuICAgIGNzc0NvZGVTcGxpdDogdHJ1ZSxcbiAgICBtb2R1bGVQcmVsb2FkOiB7XG4gICAgICBwb2x5ZmlsbDogZmFsc2VcbiAgICB9LFxuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIG91dHB1dDoge1xuICAgICAgICBtYW51YWxDaHVua3M6IHtcbiAgICAgICAgICAndmVuZG9yLXJlYWN0JzogWydyZWFjdCcsICdyZWFjdC1kb20nXSxcbiAgICAgICAgICAndmVuZG9yLWZyYW1lcic6IFsnZnJhbWVyLW1vdGlvbiddLFxuICAgICAgICAgICd2ZW5kb3ItbHVjaWRlJzogWydsdWNpZGUtcmVhY3QnXSxcbiAgICAgICAgICAndmVuZG9yLWNvbmZldHRpJzogWydjYW52YXMtY29uZmV0dGknXVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUE0VSxTQUFTLG9CQUFvQjtBQUN6VyxPQUFPLFdBQVc7QUFFbEIsU0FBUyx1QkFBdUI7QUFDOUIsU0FBTztBQUFBLElBQ0wsTUFBTTtBQUFBLElBQ04sbUJBQW1CLE1BQU07QUFFdkIsVUFBSSxjQUFjLEtBQUs7QUFBQSxRQUNyQjtBQUFBLFFBQ0E7QUFBQSxNQUNGO0FBR0EsWUFBTSxjQUFjLEtBQUssTUFBTSx1REFBdUQ7QUFDdEYsVUFBSSxlQUFlLFlBQVksQ0FBQyxHQUFHO0FBQ2pDLGNBQU0sVUFBVSxZQUFZLENBQUM7QUFDN0IsY0FBTSxhQUFhLG1DQUFtQyxPQUFPO0FBQzdELFlBQUksQ0FBQyxZQUFZLFNBQVMsVUFBVSxHQUFHO0FBQ3JDLHdCQUFjLFlBQVksUUFBUSxXQUFXLEtBQUssVUFBVTtBQUFBLFFBQVc7QUFBQSxRQUN6RTtBQUFBLE1BQ0Y7QUFFQSxhQUFPO0FBQUEsSUFDVDtBQUFBLEVBQ0Y7QUFDRjtBQUdBLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVMsQ0FBQyxNQUFNLEdBQUcscUJBQXFCLENBQUM7QUFBQSxFQUN6QyxRQUFRO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUEsRUFDUjtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0wsUUFBUTtBQUFBLElBQ1IsY0FBYztBQUFBLElBQ2QsZUFBZTtBQUFBLE1BQ2IsVUFBVTtBQUFBLElBQ1o7QUFBQSxJQUNBLGVBQWU7QUFBQSxNQUNiLFFBQVE7QUFBQSxRQUNOLGNBQWM7QUFBQSxVQUNaLGdCQUFnQixDQUFDLFNBQVMsV0FBVztBQUFBLFVBQ3JDLGlCQUFpQixDQUFDLGVBQWU7QUFBQSxVQUNqQyxpQkFBaUIsQ0FBQyxjQUFjO0FBQUEsVUFDaEMsbUJBQW1CLENBQUMsaUJBQWlCO0FBQUEsUUFDdkM7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
