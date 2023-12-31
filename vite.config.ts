import { resolve } from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { name } from './package.json';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: 'happy-dom',
    coverage: {
      exclude: ['data/**', 'lib/types/**', 'src/**', '.eslintrc.cjs'],
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'lib/index.ts'),
      name: name,
      fileName: name,
    },
    rollupOptions: {
      // https://rollupjs.org/configuration-options/
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
});
