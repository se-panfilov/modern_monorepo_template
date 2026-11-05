import { availableParallelism } from 'node:os';

import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vitest/config';

const defaults = {
  environment: 'node',
  fileParallelism: true,
  maxWorkers: Math.min(3, availableParallelism()),
  isolate: true,
  sequence: { concurrent: false },
  pool: 'forks',
  testTimeout: 60000,
  hookTimeout: 60000,
  restoreMocks: true,
  unstubEnvs: true,
  unstubGlobals: true
};
const include = ['test/**/*.test.ts', 'test/**/*.test.mjs'];

/** Tests for a Node.js library or CLI package. */
export function nodeTestConfig({ root, resolve }) {
  return defineConfig({ root, envDir: false, resolve, test: { ...defaults, include } });
}

/** Tests for a Vue 3 package: single-file components and a DOM from jsdom. */
export function vueTestConfig({ root, resolve }) {
  return defineConfig({ root, envDir: false, plugins: [vue()], resolve, test: { ...defaults, environment: 'jsdom', include } });
}

export default defineConfig({ envDir: false, test: { ...defaults, projects: ['packages/*'] } });
