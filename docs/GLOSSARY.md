# Glossary

**Draft.** Use these terms in code, data, and documentation. Use one term for each concept.
Add the domain terms of the project in a separate section.

## Repository terms

| Term            | Meaning                                                                                                      |
| --------------- | ------------------------------------------------------------------------------------------------------------ |
| Package         | One npm workspace in `packages/<directory>`. It has its own `package.json`, version, and entry points.       |
| Library         | A package that other packages import through its `exports`.                                                  |
| CLI             | A package with one `bin` entry that runs on Node.js.                                                         |
| Vue application | A package with an `index.html` entry that Vite builds for the browser.                                       |
| Shared config   | A file in `configs/` that all packages use: TypeScript bases, Vite and Vitest helpers, ESLint, and Prettier. |
| Alias           | The `@<directory>/*` import path of a package to its own `src/` modules.                                     |
| Adapter         | A small module that calls an external program or service. It validates input and output at the boundary.     |
| Data format     | A documented structure of data that crosses a component boundary, with a JSON Schema.                        |
| Dry run         | A command mode that shows the planned changes and writes nothing.                                            |
| Human decision  | A decision that AGENTS.md reserves for a person. An agent prepares options and does not make it.             |
| Provenance      | The record of inputs, parameters, tool versions, and hashes that lets another person repeat a result.        |

## Agent terms

| Term               | Meaning                                                                                                      |
| ------------------ | ------------------------------------------------------------------------------------------------------------ |
| Rule file          | `AGENTS.md` and the host adapters `CLAUDE.md` and `GEMINI.md` that import it.                                |
| Skill              | A `SKILL.md` workflow in `.agents/skills/<name>/`. Claude Code reads it through `.claude/skills/<name>`.     |
| Project skill      | A skill that this repository maintains: `project-workflow` and `new-package`.                                |
| Third-party skill  | A vendored skill with a pinned upstream revision, a local patch, and hashes in `docs/skill-provenance.json`. |
| Host settings file | An agent configuration file that can run commands or grant permissions, such as `.claude/settings.json`.     |
