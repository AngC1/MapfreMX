# CLAUDE.md

Model-specific adapter for Claude.

Primary context source: [AGENT.md](AGENT.md)

## Scope

This file contains only Claude-specific adjustments. All shared rules live in AGENT.md.

## Claude Delta Rules

- Keep responses concise by default.
- Prefer structured lists over long prose.
- Highlight assumptions and unknowns early.
- If a request is ambiguous, propose one default path and one alternative.

## Context Read Order for Claude

1. AGENT.md
2. README.md
3. Skill-Catalog.md
4. skill/<project>/Skill.md

## Do Not Duplicate

Do not copy full policy, architecture, or workflow sections from AGENT.md here.
Link to AGENT.md instead.
