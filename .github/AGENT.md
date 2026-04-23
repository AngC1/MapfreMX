# AGENT.md

Base context for any LLM agent working in this repository.

## Goal

Provide a single source of truth for context engineering that is reusable across projects and AI tools.

## Read Order (Mandatory)

1. README.md
2. Skill-Catalog.md
3. AGENT.md (this file)
4. skill/<project>/Skill.md
5. skill/<project>/CONTRIBUTING.md

## Repository Context Model

- Global context: files in repository root.
- Skill context: files under skill/<project>/.
- Execution context: scripts and test data in each skill.

## Global Rules

- Keep one source of truth for each rule.
- Do not duplicate full guidance across model-specific files.
- Keep documentation actionable and testable.
- Prefer small, incremental changes.
- Always update docs when behavior changes.

## Output Quality Rules

- Be explicit about assumptions.
- Reference exact file paths when suggesting changes.
- Prefer deterministic scripts over manual steps.
- Include verification commands.

## Reusability Rules

- New skills must follow SKILL-TEMPLATE.md.
- New projects must be listed in Skill-Catalog.md.
- Every skill must include README.md and Skill.md.

## Security Rules

- Never expose credentials, secrets, tokens, or recovery codes.
- Avoid copying sensitive data into examples.
- Use placeholders for secrets in docs and scripts.

## Change Workflow

1. Read context files in order.
2. Identify impacted skill(s).
3. Implement minimal change.
4. Run build and tests.
5. Update documentation links.
6. Update Skill-Catalog.md if project scope changed.

## Verification Checklist

- Build succeeds.
- Tests pass.
- Docs links are valid.
- No duplicated guidance across AGENT.md and model-specific adapters.

## Model Adapters

- CLAUDE.md: adapter for Claude behavior.
- copilot-instructions.md: adapter for GitHub Copilot behavior.

Adapters must reference this file and only define model-specific deltas.
