# Adapt the template

This repository is a template for npm workspaces monorepos with Node.js, TypeScript, Vue 3, and Vitest.
The shared rules, checks, and workflows are general. Some files hold placeholders that each new project must fill in.
Do the steps below one time, in a new repository made from the template.

## What the template gives

| Area             | Content                                                                                                                        |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Workspaces       | Root `package.json`, one root lockfile, `packages/*` workspaces, and root scripts that run each package script.                |
| Shared configs   | TypeScript bases for Node.js and Vue, Vite and Vitest helpers, ESLint, and Prettier in `configs/`.                             |
| Checks           | `npm run check:config` and `npm run check:workflows` compare the repository with the documented rules.                         |
| Git hooks        | Optional Lefthook hooks: no commits or pushes to `master` or `main`, formatting, Gitleaks, and commit message rules.           |
| GitHub Actions   | Tests, PR rules, Secrets, and CodeQL workflows with pinned actions and read-only tokens.                                       |
| Agent setup      | `AGENTS.md`, host adapters for Claude Code, Gemini CLI, and GitHub Copilot, two project skills, and vetted third-party skills. |
| Writing rules    | English only, ASD-STE100 based writing rules, and a pull request template that starts with `## tl;dr`.                         |
| IDE settings     | Shared WebStorm settings in `.idea/`: Prettier and ESLint on save, and run configurations. See [WebStorm setup](WEBSTORM.md).  |
| Package scaffold | The [new-package](../.agents/skills/new-package/SKILL.md) skill makes a Node.js library, a CLI, or a Vue application.          |

## Required changes

1. Set the project name in the root `package.json`. Run `npm install --ignore-scripts` to update `package-lock.json`, then update the root name in `tests/ci/ci.test.mjs`.
2. Replace the title and the first paragraph of [README.md](../README.md).
3. Fill in the **Template** sections of [AGENTS.md](../AGENTS.md): "Project status" and "Project rules". Add project-specific items to "Human decisions".
4. Fill in [the architecture](ARCHITECTURE.md), [the decision log](DECISIONS.md), and [the glossary](GLOSSARY.md).
5. Select the npm scope for package names, for example `@acme/<dir>`. Record it in the decision log and in [the new-package skill](../.agents/skills/new-package/SKILL.md).
6. Set the code owners in [.github/CODEOWNERS](../.github/CODEOWNERS) and the copyright holder in [LICENSE](../LICENSE). Change the license if the project needs another one. That is a human decision.
7. Check the Node.js version in [.nvmrc](../.nvmrc), `engines.node` in the root `package.json`, and the `node` matrix in [test.yml](../.github/workflows/test.yml).

## Optional changes

| Change                                    | Where                                                                                                                          |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Add domain-specific review boundaries     | The boundary table in [project-workflow](../.agents/skills/project-workflow/SKILL.md) and in the security reviewer agent.      |
| Approve a runtime dependency              | `runtimeDependencyAllowlist` in [scripts/ci/config.mjs](../scripts/ci/config.mjs). A Vue application needs `vue` there.        |
| Approve a binary file, such as a favicon  | `binaryAssetAllowlist` in [scripts/ci/config.mjs](../scripts/ci/config.mjs).                                                   |
| Approve an agent host settings file       | `hostConfigAllowlist` in [scripts/ci/config.mjs](../scripts/ci/config.mjs).                                                    |
| Remove Vue support from a backend project | Remove the Vue development dependencies, `configs/tsconfig.vue.json`, the Vue helpers, and the Vue block in the ESLint config. |
| Use a default branch other than `main`    | The `push` branches in `.github/workflows/`. The Git hooks protect both `master` and `main`.                                   |
| Add or remove a branch type               | `branchTypes` in [scripts/ci/rules.mjs](../scripts/ci/rules.mjs), AGENTS.md, and [Enforced rules](ENFORCED_RULES.md).          |
| Permit text in another language           | The `cyrillic` checks in `configs/eslint.config.mjs` and `scripts/ci/config.mjs`, and the writing rules. A human decision.     |
| Publish packages to npm                   | Not included. Publication needs a release workflow, a token policy, and a human decision. All packages are private.            |

Do not weaken a check only to make the template fit. If a rule does not fit the project, change the rule, its documentation, and its tests together.

## Things to keep

These parts carry the intent of the template. Change them only with a reason:

- One root lockfile, exact development dependency versions, and `ignore-scripts=true`.
- A human makes the decisions in the "Human decisions" list of AGENTS.md. Agents prepare options.
- Workflows with read-only tokens, actions pinned to full commit SHAs, and no `${{ }}` in `run` text.
- No agent session links in commits, pull requests, or documentation.
- A separate security review after each implementation stage.

## Check the result

Run these commands from the repository root:

```sh
npm ci --ignore-scripts
npm run check
```

Then add the first package with the new-package skill. In Claude Code, use `/new-package`.
