const path = require('path');
import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';

const resolve = (dir) => path.resolve(process.cwd(), dir);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  // 路径别名
  resolve: {
    alias: [
      {
        find: '@',
        replacement: resolve('src'),
      },
      {
        find: 'static',
        replacement: resolve('static'),
      },
    ],
  },

  server: {
    port: 712,
    proxy: {
      '/api': {
        // target: 'http://jsonplaceholder.typicode.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
    }
  }
});
