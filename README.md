# Modern monorepo template

A template for npm workspaces monorepos with Node.js, TypeScript, Vue 3, Vite, and Vitest.
It contains shared tool configuration, repository checks, Git hooks, GitHub Actions workflows, and instructions for AI agents and people.

**Status: template.** The repository has no package yet. To start a project, follow [Adapt the template](docs/ADAPTING.md).

## Documents

| Document                                                     | Content                                                         |
| ------------------------------------------------------------ | --------------------------------------------------------------- |
| [Adapt the template](docs/ADAPTING.md)                       | Required and optional changes for a new project.                |
| [Architecture](docs/ARCHITECTURE.md)                         | Goal, scope, components, and trust boundaries (template).       |
| [Decision log](docs/DECISIONS.md)                            | Owner requirements and open decisions (template).               |
| [Workspaces](docs/WORKSPACES.md)                             | npm workspaces layout, package kinds, and shared configuration. |
| [Engineering requirements](docs/ENGINEERING_REQUIREMENTS.md) | Languages, runtime, portability, and security for tooling.      |
| [Enforced rules](docs/ENFORCED_RULES.md)                     | ESLint rules, configuration check, Git hooks, and PR rules.     |
| [Git hooks](docs/GIT_HOOKS.md)                               | Lefthook hooks and Gitleaks secret checks.                      |
| [GitHub Actions](docs/GITHUB_ACTIONS.md)                     | CI workflows, inputs, and CodeQL.                               |
| [Writing rules](docs/WRITING.md)                             | English documentation rules based on ASD-STE100.                |
| [Glossary](docs/GLOSSARY.md)                                 | Terms for code, data, and documentation.                        |
| [WebStorm setup](docs/WEBSTORM.md)                           | IDE settings, formatting, linting, TypeScript, and tests.       |

## AI agents

[AGENTS.md](AGENTS.md) contains the rules for AI agents and people.
[The agent setup guide](docs/AI_AGENTS.md) describes the host adapters and the project skills.
[Installed skills](docs/INSTALLED_SKILLS.md) lists the third-party skills, their sources, and the local changes.

## Requirements

Node.js version from [.nvmrc](.nvmrc). Install and check from the repository root:

```sh
npm ci --ignore-scripts
npm run check
```

Use JetBrains WebStorm as the IDE. See [WebStorm setup](docs/WEBSTORM.md).
Install the optional Git hooks with `npm run hooks:install`. See [Git hooks](docs/GIT_HOOKS.md).

## License

[MIT](LICENSE). Third-party skills in `.agents/skills/` keep their own licenses.
