# npm workspaces

The root workspace and the shared configuration exist. The template has no package. Add packages with the [new-package](../.agents/skills/new-package/SKILL.md) workflow.

## Layout

The private root package declares `packages/*` as workspaces.
Each package keeps its own name, version, runtime dependencies, and entry points.
Shared development dependencies belong to the root `package.json`.
One root `package-lock.json` records the complete dependency tree.
All packages are private. Publication to npm needs a separate human decision.

| Shared configuration          | Package configuration                                                                                                                     |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `configs/eslint.config.mjs`   | Root discovery supplies the shared rules, including the Vue rules for `.vue` files. A package needs no duplicate file.                    |
| `configs/prettier.config.mjs` | Root discovery supplies formatting. Package commands use the root ignore file.                                                            |
| `configs/tsconfig.base.json`  | A Node.js package `tsconfig.json` extends the base and sets local paths and inputs.                                                       |
| `configs/tsconfig.vue.json`   | A Vue package `tsconfig.json` extends this file. It adds the DOM library and the Vite client types to the base.                           |
| `configs/vite.config.mjs`     | A Node.js package calls `nodePackageConfig` with its root, alias namespace, and entry modules. A Vue package calls `vueAppConfig`.        |
| `configs/vitest.config.mjs`   | A Node.js package calls `nodeTestConfig` with its root and the Vite alias mapping. A Vue package calls `vueTestConfig`, which uses jsdom. |

Path settings remain local because relative paths resolve from their configuration file.
The root `npm test`, `npm run build`, and `npm run typecheck` use [scripts/workspaces.mjs](../scripts/workspaces.mjs). It runs the script in each package, and it succeeds with a message when `packages/` has no package.
`npm run check:config` checks each package against these rules. See [Enforced rules](ENFORCED_RULES.md#configuration-check).

## Package kinds

| Kind            | Entry                                  | Build                                 | Type check         | Tests                                   |
| --------------- | -------------------------------------- | ------------------------------------- | ------------------ | --------------------------------------- |
| library         | `src/index.ts`, `exports` in manifest  | `vite build` with `nodePackageConfig` | `tsc --noEmit`     | Vitest in Node.js                       |
| cli             | `src/cli.ts` with a shebang, one `bin` | `vite build` with `nodePackageConfig` | `tsc --noEmit`     | Vitest in Node.js                       |
| Vue application | `index.html` and `src/main.ts`         | `vite build` with `vueAppConfig`      | `vue-tsc --noEmit` | Vitest with jsdom and `@vue/test-utils` |

A Vue application declares `vue` as a runtime dependency. Add it to `runtimeDependencyAllowlist` in [scripts/ci/config.mjs](../scripts/ci/config.mjs).
The Vue tooling (`@vitejs/plugin-vue`, `vue-tsc`, `eslint-plugin-vue`, `@vue/test-utils`, and `jsdom`) is in the root development dependencies.

## Packages

| Directory | Kind | Purpose |
| --------- | ---- | ------- |

Add a row for each package. Keep the list in the same order as `packages/`.

## Commands

Run these commands from the repository root:

```sh
npm ci --ignore-scripts
npm run build
npm test
npm run typecheck
npm run format
npm run lint
```

Select one package when necessary:

```sh
npm run build --workspace @<scope>/<dir>
npm test --workspace @<scope>/<dir>
```

npm runs workspace scripts in the package directory.
The root package has no release command and cannot be published.

## Add a package

Use the [new-package](../.agents/skills/new-package/SKILL.md) workflow. In Claude Code, use `/new-package`.

Do not create a package lockfile.
Do not add another package's source as a TypeScript alias. Use declared workspace dependencies and package exports.
A successful TypeScript check must precede any use of compiled output.

## References

- [npm workspaces](https://docs.npmjs.com/cli/v11/using-npm/workspaces/).
- [Vite](https://vite.dev/guide/), [Vitest](https://vitest.dev/guide/), and [Vue](https://vuejs.org/guide/introduction.html).
