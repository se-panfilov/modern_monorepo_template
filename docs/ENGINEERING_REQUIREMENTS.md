# Engineering requirements

**Draft.** This document holds the rules for languages, command-line tools, runtime, portability, security, and build.
Tools check part of these rules. See [Enforced rules](ENFORCED_RULES.md).
It does not define project data formats. Give each data format its own document in `docs/`.
The owner set the rules in sections 1–3. See [the known owner requirements](DECISIONS.md#known-owner-requirements).

## Scope of the documents

Keep each rule in one document. Do not copy a rule into another document.

| Document                                 | Contents                                                             |
| ---------------------------------------- | -------------------------------------------------------------------- |
| Engineering requirements (this document) | Languages, command-line tools, runtime, portability, security, build |
| [Architecture](ARCHITECTURE.md)          | Goal, scope, components, trust boundaries, human review steps        |
| Data format documents in `docs/`         | Structures, schemas, versions, and compatibility of project data     |

## 1. Language and runtime

1. Write new custom code in TypeScript. Run tools in Node.js. Build user interfaces with Vue 3 for the browser.
   This rule applies to command-line tools, file operations, validation, build steps, orchestration, and calls to external tools.
2. Use the Node.js version in [`.nvmrc`](../.nvmrc) as the target version. Do not lower the target version to the version of an earlier test run.
3. Declare the supported Node.js range in the `engines` field of each package. Record each tested version in the compatibility matrix of the package.
4. Use the standard Node.js modules first: `node:fs`, `node:path`, `node:crypto`, `node:child_process`, `node:process`.
5. Add an npm dependency only with a reason. Pin its exact version. Keep the lockfile in Git.
6. Run TypeScript with a pinned local tool (for example `tsx`) or compile it to JavaScript. Do not require a global transpiler.
7. Do not rewrite existing JavaScript (`.mjs`) only to change the file extension. It already runs in Node.js.

## 2. Shell, Python, and other runtimes

1. Use shell scripts only as thin wrappers: bootstrap, Python virtual environment, start of an external program, or one operating-system-specific step.
2. Do not put business logic or file processing in a new shell script.
3. Run external tools that need Python or another runtime as isolated processes or services. Control them from Node.js. Do not port them to TypeScript without a human decision.
4. For each new dependency on Bash, Python, or another runtime, record three items: the reason, the alternatives, and the effect on the supported operating systems.
   Convenience for the author is not a reason.

## 3. Portability

1. Supported operating systems: macOS and Linux. Windows is not tested. Do not claim Windows support.
2. Do not use GNU-only commands: for example `sha256sum`, `realpath -m`, `xargs -d`, `readlink -f`, `sed -i` without a suffix, or `stat -c`.
   Use Node.js APIs for these operations.
3. macOS has Bash 3.2 at `/bin/bash`. A remaining shell wrapper must run in Bash 3.2 or in POSIX `sh`.
4. Do not use Homebrew-only commands or other non-standard system packages unless the documentation names them as prerequisites.
5. Pass command arguments as arrays. Do not use `shell: true` to build a command from paths or arguments.
6. Test paths with spaces and non-ASCII characters where a user can choose the path, for example an input folder.

## 4. Security and evidence

1. Do not write licenses, activation codes, tokens, cookies, or other secrets to Git, logs, evidence, or reports.
2. Do not write environment variables to logs. Remove device identifiers (serial number, hardware UUID) from machine descriptions.
3. When the project packs an archive of results or test evidence, add a SHA-256 manifest. The manifest does not list itself. Verify it before and after packing.
4. Scan the text files of such an archive for credentials before packing. A finding stops the packing.
5. A test runner must not report PASS when a dependency is missing or one command fails. Report such a run as FAIL or INCOMPLETE.

## 5. Package manager

npm 11 (Node.js 26 ships npm 11) runs dependency install scripts by default. npm 12 runs only the install scripts that the `allowScripts` field of `package.json` approves.
The repository `.npmrc` sets `ignore-scripts=true`, so that a plain `npm install` or `npm ci` does not run them either. Explicit `npm run` and `npm test` commands still run their own script, but not `pre` or `post` scripts.
If a dependency needs an install script, list it in `allowScripts` with a pinned version after a human review.
Use `npm ci --ignore-scripts` for the repository. A package that needs an install script needs a human review (see [Enforced rules](ENFORCED_RULES.md#pull-request-rules)).

## Exceptions in force

Record each accepted exception to sections 1–3 here, with the reason, the alternative, and the affected operating systems.

| Exception | Reason | Alternative | Operating systems |
| --------- | ------ | ----------- | ----------------- |
