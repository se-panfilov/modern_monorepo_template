# WebStorm setup

The project uses JetBrains WebStorm as the IDE. The repository does not contain settings for other editors.
WebStorm reads the shared settings in `.idea/` when you open the repository root as a project.

## Shared settings in Git

`.gitignore` ignores `.idea/` except for the files in this table. Personal settings, such as `workspace.xml`, the Node.js interpreter, and window layout, stay out of Git.

| File                         | Setting                                                                                                     |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `.idea/prettier.xml`         | Automatic Prettier configuration from `prettier.config.mjs`. Prettier formats the supported files on save.  |
| `.idea/jsLinters/eslint.xml` | Automatic ESLint configuration from `eslint.config.mjs`. ESLint fixes the problems that it can fix on save. |
| `.idea/runConfigurations/`   | Run configurations for the root npm scripts: `check`, `test`, `lint`, `typecheck`, `build`, and `format`.   |

Change a shared file only through a pull request. Review it as code: a run configuration runs a command when a person starts it.
File Watchers (`.idea/watcherTasks.xml`) can run programs automatically on each file change. `npm run check:config` rejects this file. See [Enforced rules](ENFORCED_RULES.md).

## First start

1. Install the dependencies from the repository root: `npm ci --ignore-scripts`.
2. Open the repository root in WebStorm. Select **Trust Project** only after you examine the repository.
3. In **Settings | Languages & Frameworks | Node.js**, select the Node.js version from [.nvmrc](../.nvmrc). With nvm, run `nvm install` in the repository root first. This setting is personal and is not in Git.
4. Make sure that the package manager is `npm` with the project lockfile. Do not use another package manager.

## Formatting and linting

- Prettier: **Settings | Languages & Frameworks | JavaScript | Prettier**. The shared setting selects the automatic configuration and **Run on save**. Prettier uses `.prettierignore`, so it does not format vendored skills and generated output.
- ESLint: **Settings | Languages & Frameworks | JavaScript | Code Quality Tools | ESLint**. The shared setting selects the automatic configuration and **Run eslint --fix on save**.
- EditorConfig: WebStorm reads [.editorconfig](../.editorconfig) by default. Do not change code style settings that conflict with it or with Prettier.
- Before delivery, run `npm run format:check` and `npm run lint` from the terminal or from the run configurations. Save actions do not replace these checks.

## TypeScript and Vue

- WebStorm uses the TypeScript version from `node_modules/typescript`. In **Settings | Languages & Frameworks | TypeScript**, keep the project version, not a bundled version.
- For Vue packages, keep **Settings | Languages & Frameworks | TypeScript | Vue** at **Auto**. WebStorm then uses the Vue language service from the project dependencies.
- IDE type information does not replace the type check. Run `npm run typecheck`. It uses `tsc --noEmit` and `vue-tsc --noEmit` in each package.

## Tests

WebStorm finds Vitest in the root development dependencies and shows run icons next to the tests.
Each package has its own Vitest configuration. Run the tests of one package with `npm test --workspace <name>`, or start a test from the editor gutter.

## AI assistants in WebStorm

JetBrains AI Assistant reads [.aiignore](../.aiignore) and does not send the listed paths to the AI service.
Junie MCP server settings in `.junie/mcp/` can start programs. `npm run check:config` rejects them until a human decision. See [the agent setup guide](AI_AGENTS.md).
