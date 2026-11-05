import { join } from 'node:path';

import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

/** Shared Node.js build settings for a library or CLI package. Resolve paths from each package root. */
export function nodePackageConfig({ root, namespace, modules }) {
  const source = join(root, 'src');
  return defineConfig({
    root,
    logLevel: 'silent',
    envDir: false,
    resolve: { alias: { [`@${namespace}`]: source } },
    build: {
      target: 'node26',
      minify: false,
      sourcemap: false,
      emptyOutDir: false,
      copyPublicDir: false,
      reportCompressedSize: false,
      lib: { entry: modules.map((name) => join(source, `${name}.ts`)), formats: ['es'] },
      rolldownOptions: {
        external: [/^node:/],
        output: { preserveModules: true, preserveModulesRoot: source, entryFileNames: 'src/[name].js' }
      }
    }
  });
}

/**
 * Shared browser build settings for a Vue 3 application package. The entry is `index.html` in the package root.
 * `envDir: false` keeps `.env` files out of the bundle. Give build-time values explicitly when a package needs them.
 */
export function vueAppConfig({ root, namespace }) {
  const source = join(root, 'src');
  return defineConfig({
    root,
    logLevel: 'warn',
    envDir: false,
    plugins: [vue()],
    resolve: { alias: { [`@${namespace}`]: source } },
    build: {
      target: 'es2023',
      outDir: 'dist',
      emptyOutDir: true,
      sourcemap: false,
      reportCompressedSize: false
    }
  });
}
