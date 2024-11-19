import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';
import { readdirSync } from 'fs';
import { filter, map, delay } from 'lodash-es';
import shell from 'shelljs';
import hooks from './hooksPlugin';

const RETRY_MOVE_STYLES_MS = 800 as const;

function getDirectoriesSync(basePath: string) {
  const entries = readdirSync(basePath, { withFileTypes: true });

  return map(
    filter(entries, (entry) => entry.isDirectory()),
    (entry) => entry.name
  );
}

function moveStyles() {
  try {
    readdirSync('./dist/es/theme');
    shell.mv('./dist/es/theme', './dist');
  } catch (_) {
    delay(moveStyles, RETRY_MOVE_STYLES_MS);
  }
}

export default defineConfig({
  plugins: [
    vue(),
    dts({
      tsconfigPath: '../../tsconfig.build.json',
      outDir: 'dist/types',
    }),
    hooks({
      rmFiles: ['./dist/es', './dist/theme', './dist/types'],
      afterBuild: moveStyles,
    }),
  ],
  build: {
    outDir: 'dist/es',
    minify: false,
    cssCodeSplit: true,
    lib: {
      entry: resolve(__dirname, './index.ts'),
      name: 'ToyView',
      fileName: 'index',
      formats: ['es'],
    },
    rollupOptions: {
      external: [
        'vue',
        '@fontawesome/fontawesome-svg-core',
        '@fontawesome/free-solid-svg-icons',
        '@fontawesome/vue-fontawesome',
        '@poppperjs/core',
        'async-validator',
      ],
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') {
            return 'index.css';
          }
          if (assetInfo.type === "asset" && //
            /\.(css)$/i.test(assetInfo.name as string)
          ) {
            return "theme/[name].[ext]";
          }
          return assetInfo.name as string;
        },
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
          if (id.includes('/packages/hooks')) {
            return 'hooks';
          }
          if (
            id.includes("/packages/utils") || //
            id.includes("plugin-vue:export-helper")
          ) {
            return 'utils';
          }
          for (const compName of getDirectoriesSync("../components")) {
            if (id.includes(`/packages/components/${compName}`)) {
              return compName;
            }
          }
        },
        chunkFileNames: () => {
          return "[name].mjs";
        },
      },
    },
  },
})