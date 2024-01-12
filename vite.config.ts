import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { name } from './package.json';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    dts({
      include: ['lib/**/*.ts'],
      staticImport: true,
      insertTypesEntry: true,
      rollupTypes: true,
    }),
  ],
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
      fileName: (format) => `${name}.${format === 'es' ? 'm' : 'c'}js`,
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
