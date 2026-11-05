# Architecture

**Template.** Replace the placeholder text in each section. Keep the document short and link the detailed documents.
Many choices can be open at the start. Record them in [the decision log](DECISIONS.md), not here.

## Goal

Describe the problem that the project solves and the result for its users in two or three sentences.

## Scope

| In scope                         | Out of scope                     |
| -------------------------------- | -------------------------------- |
| A feature that the project gives | A related feature that it avoids |

## Components

List the packages and external systems, and the data that moves between them.
Use the package directory names from [the workspace layout](WORKSPACES.md).

| Component        | Kind                              | Responsibility                    |
| ---------------- | --------------------------------- | --------------------------------- |
| `<package-name>` | library / cli / Vue application   | What it owns and what it produces |
| `<service>`      | external service (user-specified) | What the project uses it for      |

## Data formats

List each data format that crosses a component boundary. Give each format one document in `docs/` and one JSON Schema.
A breaking change to a format needs a human decision and a new format version.

## Trust boundaries

List the inputs that the project does not control: files, network responses, user input, and external tools.
For each input, name the component that validates it and the limits that it applies.

## Human review steps

List the steps where a person approves a result. Agents and scripts do not automate these steps without a human decision.
