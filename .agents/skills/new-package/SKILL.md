---
name: new-package
description: Add a new workspace package to packages/ in this repository. Use when the user asks to create, scaffold, or start a new library, command-line tool, Vue application, or workspace package.
---

# Add a workspace package

Read [AGENTS.md](../../../AGENTS.md) and [the workspace layout](../../../docs/WORKSPACES.md) before you start.
Use [the project-workflow skill](../project-workflow/SKILL.md) for the implementation and security review after the scaffold.
This skill makes the empty package structure. It does not authorize publication, a release, or a push to `master` or `main`.

## Collect the inputs

Get these values from the user or from the task before you write files:

| Input          | Rule                                                                                                 | Example                 |
| -------------- | ---------------------------------------------------------------------------------------------------- | ----------------------- |
| Directory name | Matches `^[a-z][a-z0-9-]{0,63}$`. Use kebab case.                                                    | `validator`             |
| Package name   | The project npm scope followed by the directory name. Read the scope from the decision log.          | `@acme/validator`       |
| Kind           | `library` (imported by other packages), `cli` (has one bin entry), or `vue-app` (browser UI).        | `cli`                   |
| CLI command    | Only for `cli`: the command name. Use the project prefix when the decision log defines one.          | `acme-validator`        |
| Alias          | `@<directory-name>/*`.                                                                               | `@validator/*`          |
| Component      | The component from [the architecture](../../../docs/ARCHITECTURE.md).                                | Input validation        |
| Description    | One English sentence about the result for the user.                                                  | `Validate project data` |
| Runtime data   | The files, subprocesses, network targets, and browser APIs that the package reads or changes.         | Input directory         |

Stop and ask when the directory name, the kind, the npm scope, or the purpose is not clear.
Do not invent author data, service URLs, or a public API.
Check that no other directory in `packages/` has the same name.

## Make the files for a library or a CLI

Start with the smallest working package: one exported function and one test, or `--help` and one validated argument for a CLI.

| File                | Content                                                                                                                       |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `package.json`      | Fields from the next block. `version` is `0.1.0`.                                                                             |
| `tsconfig.json`     | Extend `../../configs/tsconfig.base.json`. Set `rootDir: "."`, `outDir: "dist"`, `paths`, `include`, and `exclude`.           |
| `vite.config.mjs`   | Call `nodePackageConfig` from `../../configs/vite.config.mjs`. Set `root`, the alias namespace, and the entry modules.         |
| `vitest.config.mjs` | Call `nodeTestConfig` from `../../configs/vitest.config.mjs` and pass the Vite alias mapping.                                 |
| `src/index.ts`      | The library entry, or `src/cli.ts` with the first line `#!/usr/bin/env node` and English help text for a CLI.                 |
| `test/*.test.ts`    | English test names. Test one success path and one failure path in a temporary directory with synthetic data.                 |
| `README.md`         | Purpose, component, inputs, outputs, commands, and limits.                                                                    |
| `SECURITY.md`       | Required when the package writes user files, parses untrusted input, starts subprocesses, or uses the network.                |

```json
{
  "name": "@<scope>/<dir>",
  "version": "0.1.0",
  "description": "<description>",
  "private": true,
  "type": "module",
  "license": "MIT",
  "engines": { "node": ">=26.12.1" },
  "exports": { ".": "./dist/src/index.js" },
  "scripts": {
    "build": "vite build",
    "typecheck": "tsc --project tsconfig.json --noEmit",
    "test": "npm run build && vitest run",
    "lint": "eslint . --max-warnings=0",
    "format:check": "prettier --ignore-path ../../.prettierignore --check ."
  }
}
```

For a `cli` package, add `"bin": { "<command>": "dist/src/cli.js" }` and `"start": "npm run build && node dist/src/cli.js"`.
Add `cli` to the entry modules in `vite.config.mjs`.

```json
{
  "extends": "../../configs/tsconfig.base.json",
  "compilerOptions": { "rootDir": ".", "outDir": "dist", "paths": { "@<dir>/*": ["./src/*.ts"] } },
  "include": ["src/**/*.ts", "test/**/*.ts"],
  "exclude": ["dist", "node_modules"]
}
```

```js
// vite.config.mjs
import { fileURLToPath } from 'node:url';

import { nodePackageConfig } from '../../configs/vite.config.mjs';

export default nodePackageConfig({ root: fileURLToPath(new URL('.', import.meta.url)), namespace: '<dir>', modules: ['index'] });
```

```js
// vitest.config.mjs
import { nodeTestConfig } from '../../configs/vitest.config.mjs';
import viteConfig from './vite.config.mjs';

export default nodeTestConfig({ root: viteConfig.root, resolve: viteConfig.resolve });
```

## Make the files for a Vue application

Start with one component, one plain TypeScript module, and one component test.

| File                 | Content                                                                                                                    |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `package.json`       | Fields from the next block. `exports` is an empty object, because no package imports an application.                      |
| `tsconfig.json`      | Extend `../../configs/tsconfig.vue.json`. The alias target is `./src/*`, so that it resolves `.ts` and `.vue` files.     |
| `vite.config.mjs`    | Call `vueAppConfig` from `../../configs/vite.config.mjs` with `root` and the alias namespace.                             |
| `vitest.config.mjs`  | Call `vueTestConfig` from `../../configs/vitest.config.mjs`. It adds the Vue plugin and jsdom.                            |
| `index.html`         | The page with `<div id="app"></div>` and `<script type="module" src="/src/main.ts"></script>`.                           |
| `src/main.ts`        | `createApp(App).mount('#app')`.                                                                                            |
| `src/App.vue`        | A component with `<script setup lang="ts">`. Keep logic in `src/*.ts` modules.                                            |
| `src/env.d.ts`       | The module declaration for `*.vue` files, so that `tsc`-based lint rules can read component imports.                      |
| `test/*.test.ts`     | English test names. Mount components with `@vue/test-utils`.                                                               |
| `README.md`          | Purpose, component, commands, browser support, and limits.                                                                 |

```json
{
  "name": "@<scope>/<dir>",
  "version": "0.1.0",
  "description": "<description>",
  "private": true,
  "type": "module",
  "license": "MIT",
  "engines": { "node": ">=26.12.1" },
  "exports": {},
  "dependencies": { "vue": "<the vue version in the root package.json>" },
  "scripts": {
    "dev": "vite",
    "build": "vue-tsc --project tsconfig.json --noEmit && vite build",
    "typecheck": "vue-tsc --project tsconfig.json --noEmit",
    "test": "vitest run",
    "lint": "eslint . --max-warnings=0",
    "format:check": "prettier --ignore-path ../../.prettierignore --check ."
  }
}
```

```json
{
  "extends": "../../configs/tsconfig.vue.json",
  "compilerOptions": { "rootDir": ".", "outDir": "dist", "paths": { "@<dir>/*": ["./src/*"] } },
  "include": ["src/**/*.ts", "src/**/*.vue", "test/**/*.ts"],
  "exclude": ["dist", "node_modules"]
}
```

```js
// vite.config.mjs
import { fileURLToPath } from 'node:url';

import { vueAppConfig } from '../../configs/vite.config.mjs';

export default vueAppConfig({ root: fileURLToPath(new URL('.', import.meta.url)), namespace: '<dir>' });
```

```js
// vitest.config.mjs
import { vueTestConfig } from '../../configs/vitest.config.mjs';
import viteConfig from './vite.config.mjs';

export default vueTestConfig({ root: viteConfig.root, resolve: viteConfig.resolve });
```

```ts
// src/env.d.ts
declare module '*.vue' {
  import type { DefineComponent } from 'vue';

  const component: DefineComponent;
  export default component;
}
```

Add `"@<scope>/<dir>": ["vue"]` to `runtimeDependencyAllowlist` in [scripts/ci/config.mjs](../../../scripts/ci/config.mjs). This approval is a human decision, so confirm it with the user.
Images, fonts, and other binary files in `public/` need an entry in `binaryAssetAllowlist` after a human decision. Prefer SVG or CSS when possible.

## Common rules

The shared configuration in `configs/` and the root scripts already exist. Do not copy them into the package.
Packages stay private. Publication to npm needs a separate human decision.
Do not add `postinstall`, `prepare`, or other installation hooks.
Do not add devDependencies to the package. Shared development tools belong to the root `package.json`.
Do not add a runtime dependency without a reason and a security check of its package.
Declare libraries with native binaries only after a human decision. Record the reason in the package README.

## Install and check

Run these commands from the repository root:

```sh
npm install --ignore-scripts
npx eslint packages/<dir> --fix
npm run format
npm run lint
npm run check:config
npm run typecheck
npm test --workspace @<scope>/<dir>
```

`npm install` adds the workspace link to the root lockfile. Do not add a package lockfile.
Review the lockfile diff. Only the new workspace entries and the declared dependencies must change.
After that, use `npm ci --ignore-scripts` for later installs.

## Finish

- Do a security review of the scaffold.
- Do not run `npm version` for a new package. Its first version is `0.1.0`.
- Add the package to the table in [the workspace layout](../../../docs/WORKSPACES.md).
- Add the directory name to the `package` options in [test.yml](../../../.github/workflows/test.yml), then run `npm run check:workflows`.
- Report the new files, the checks, and the open questions in English.
