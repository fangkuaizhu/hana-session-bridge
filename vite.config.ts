// vite.config.ts
// UI 构建：React + @hana/plugin-components → assets/panel.js + assets/panel.css
// 输出目录为 assets（Hana 以 /api/plugins/{pluginId}/assets/... 统一服务静态资源）
import path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'assets',
    emptyOutDir: true,
    sourcemap: false,
    lib: {
      entry: path.resolve(__dirname, 'ui', 'RoomPanel.tsx'),
      formats: ['es'],
      fileName: () => 'panel.js',
    },
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css' || assetInfo.name?.endsWith('.css')) {
            return 'panel.css';
          }
          return '[name][extname]';
        },
      },
    },
  },
});
