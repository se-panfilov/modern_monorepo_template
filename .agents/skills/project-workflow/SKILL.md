---
name: project-workflow
description: Develop and audit code in this repository. Use for package implementation, data format and schema changes, and security reviews.
---

# Develop and audit project code

Read [AGENTS.md](../../../AGENTS.md) before using this workflow.
That file contains the project requirements and authorization limits.
This skill does not grant permission to download tools, call paid services, publish, push, or change approved output.

## Establish the change

1. Read the affected package source, README, and root and workspace package scripts.
2. Read [the architecture](../../../docs/ARCHITECTURE.md) and identify the affected component.
3. Read the data format documents in `docs/` when the change reads or writes documented data.
4. Identify inputs, outputs, writes, subprocesses, and network effects.
5. Check [the decision log](../../../docs/DECISIONS.md). Do not implement an open decision as if it were accepted.
6. Resolve material ambiguities before dependent work. Continue independent authorized work.
7. Select checks that can show both the result and the relevant safety properties.

For a new package, use [the new-package workflow](../new-package/SKILL.md).
Use the root lockfile and shared development tools. Do not add per-package lockfiles.
Keep common settings in `configs/` and package wrappers limited to paths, aliases, and entry points.

## Keep contracts stable

A documented data format, schema, or public package API is a contract between components.

- Do not change a contract to make one input or one test pass. Fix the input or report the defect.
- A breaking contract change needs a human decision and a new version of the contract.
- Read shared constants and schemas from one source. Do not copy them into each package.
- Validate untrusted data at run time against its JSON Schema. Static types do not prove that a file is valid.

## Implement in stages

Separate input validation, plan construction, writes, and result checks.
Keep reusable logic independent of terminal prompts, UI components, and a specific external service.
Put external tools and services behind a narrow adapter.
In Vue packages, keep business logic in plain TypeScript modules. Components show state and send user actions.

After each stage, examine its security and determinism impact before you continue.
Check the applicable boundaries:

| Boundary    | Questions to resolve                                                                                    |
| ----------- | ------------------------------------------------------------------------------------------------------- |
| Input       | Can a malformed argument, JSON file, or other input select another target or become executable text?   |
| Parsing     | Are size, count, and depth limited before parsing or decoding? Are encodings and formats explicit?     |
| Contract    | Does the change keep the documented data formats and public APIs compatible?                            |
| Subprocess  | Can inherited environment, configuration, or shell parsing change an external tool call?               |
| File system | Can links, existing paths, or concurrent runs overwrite user data or approved output?                  |
| Network     | Is the destination authorized? Does the call cost money? What happens after a partial success?         |
| UI          | Can untrusted text reach `v-html`, a dynamic component, a URL attribute, or a style binding?            |
| Secrets     | Can a token, a key, or personal data reach logs, reports, build output, or the browser bundle?         |
| Recovery    | Can failure leave partial output? Can the user restore the previous state?                              |

Add project-specific boundaries to this table when the project needs them.
For inapplicable boundaries, record why they do not apply instead of adding unnecessary mechanisms.

## Review the completed change

Perform a separate security pass after implementation.
Read the final code and diff, including errors and cleanup paths.
Trace input through validation to each write, subprocess call, network call, and rendered output.
Try relevant malformed inputs and failure cases in isolated fixtures with synthetic data.
Check that the dry-run plan, the validation report, and the final result agree.
Compare output hashes of deterministic stages between two runs.

Fix confirmed defects within the task scope.
Add meaningful regression checks for confirmed defects.
Repeat affected checks after each fix.
Report unresolved findings with impact, conditions, evidence, and a recommended action.
A human makes the final decision on each security finding that is not fixed. Do not accept or postpone a risk yourself.

For a documentation-only change, examine instruction accuracy and unsafe example commands.
Check references, open decisions, and authorization boundaries.

## External services

Do not start a paid or long-running external job unless the task explicitly requests that run.
Use only endpoints that the user specifies. Do not discover or guess service addresses.
Do not download tools, binaries, or data sets without an explicit request for each item.
Do not call a paid API without explicit authorization that names the service and the limit.
Keep large binaries and generated media out of Git unless [the decision log](../../../docs/DECISIONS.md) defines the storage.

## Deliver

Bump the version of each changed package once per iteration. Use `npm version` from the root with `--workspace <name> --no-git-tag-version --ignore-scripts`.
Run Prettier on changed maintained files with the existing configuration.
Run the root format check, ESLint, type check, and the affected workspace tests. Fix errors before completion.
Keep generated output and vendored skills outside formatting changes.
Update the package README and the affected docs when behavior or data formats change.
Report the result, executed checks, fixed defects, and remaining limits in English.
Never merge the pull request. A human reviews and merges it.
Do not present static review as a test on real hardware or a formal security certificate.
