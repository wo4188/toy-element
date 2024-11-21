import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import { compression } from 'vite-plugin-compression2';
import { readFile } from 'fs';
import { delay, defer } from 'lodash-es';
import shell from 'shelljs';
import hooks from './hooksPlugin';
import terser from '@rollup/plugin-terser';
import { visualizer } from "rollup-plugin-visualizer";

const RETRY_MOVE_STYLES_MS = 800 as const;

const isProd = process.env.NODE_ENV === 'production';
const isDev = process.env.NODE_ENV === 'development';
const isTest = process.env.NODE_ENV === 'test';

function moveStyles() {
  readFile('./dist/umd/index.css.gz', (err) => {
    if (err) {
      delay(moveStyles, RETRY_MOVE_STYLES_MS);
      return;
    }
    defer(() => shell.cp('./dist/umd/index.css', './dist/index.css'));
  })
}

export default defineConfig({
  plugins: [
    vue(), //
    compression({
      include: /.(cjs|css)$/i,
    }),
    visualizer({
      filename: "dist/stats.umd.html",
    }),
    hooks({
      rmFiles: ['./dist/umd', './dist/index.css'],
      afterBuild: moveStyles,
    }),
    terser({
      compress: {
        drop_console: ['log'],
        drop_debugger: true,
        passes: 3,
        global_defs: {
          '@PROD': JSON.stringify(isProd),
          '@DEV': JSON.stringify(isDev),
          '@TEST': JSON.stringify(isTest),
        },
      },
    }),
  ],
  build: {
    outDir: 'dist/umd',
    minify: false,
    lib: {
      entry: resolve(__dirname, '../index.ts'),
      name: 'ToyView',
      fileName: 'index',
      formats: ['umd'],
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        exports: 'named',
        globals: {
          vue: 'Vue',
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') {
            return 'index.css';
          }
          return assetInfo.name as string;
        }
      },
    },
  },
})