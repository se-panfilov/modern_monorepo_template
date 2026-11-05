# Decision log

**Template.** This log lists the decisions that the owner must make. Replace the example entries with the project decisions.
Only the owner closes an entry. An agent can add options and a recommendation, but it cannot change the status to **Accepted**.

## Known owner requirements

These items come from the owner. They are not open. The template supplies the first rows. Change them when the project needs other rules.

| Requirement                                                                                                                             |
| --------------------------------------------------------------------------------------------------------------------------------------- |
| The repository is an npm workspaces monorepo. Code runs on Node.js or in the browser.                                                   |
| Code is TypeScript. User interfaces use Vue 3. Tests use Vitest.                                                                        |
| Everything in the repository is in English: code, comments, user interface, documentation, and reports.                                 |
| New custom tooling is TypeScript on Node.js. Shell is only a thin wrapper. See [engineering requirements](ENGINEERING_REQUIREMENTS.md). |
| Supported operating systems for development: macOS first, then Linux. Windows is not tested.                                            |
| All packages are private. Publication to npm needs a separate decision.                                                                 |
| No license purchase or paid API call without the owner's approval.                                                                      |

## Open decisions

| Id  | Decision                      | Options                               | Recommendation             | Status |
| --- | ----------------------------- | ------------------------------------- | -------------------------- | ------ |
| D1  | npm scope for package names   | `@<project>/<dir>` / no scope         | `@<project>/<dir>`         | Open   |
| D2  | Storage of large binary files | Not in Git / Git LFS / object storage | Not in Git until necessary | Open   |

## Accepted decisions

None yet. Move an entry here when the owner accepts it. Use the format below.

## How to record a decision

1. Change the status to **Accepted** and write the selected option.
2. Write the reason in one or two sentences.
3. List the documents, schemas, and settings that the decision changes.
4. Update those documents in the same pull request.
