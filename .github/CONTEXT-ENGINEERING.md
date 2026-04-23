# CONTEXT-ENGINEERING.md

Reusable context engineering blueprint for GitHub Copilot projects.

## Objective

Make repository context predictable for LLMs and reusable for future projects.

## Recommended Root Structure

```text
.github/
├── README.md
├── Skill-Catalog.md
├── SKILL-TEMPLATE.md
├── AGENT.md
├── CLAUDE.md
├── copilot-instructions.md
└── skill/
    └── <project>/
        ├── README.md
        ├── Skill.md
        ├── CONTRIBUTING.md
        ├── STRUCTURE.md
        ├── INDEX.md
        ├── scripts/
        ├── docs/
        ├── resources/
        ├── config/
        └── src/
```

## Context Layers

- Layer 1: Repository navigation (README.md).
- Layer 2: Project discovery (Skill-Catalog.md).
- Layer 3: Global agent policy (AGENT.md).
- Layer 4: Model adapter (CLAUDE.md, copilot-instructions.md).
- Layer 5: Skill-specific implementation context (skill/<project>/Skill.md).

## Reuse in Another Repository

1. Copy README.md, Skill-Catalog.md, SKILL-TEMPLATE.md, AGENT.md, and model adapters.
2. Create skill/<project>/ using SKILL-TEMPLATE.md.
3. Add project to Skill-Catalog.md.
4. Validate links and run tests.

## Minimal Quality Gate

- Every skill has README.md and Skill.md.
- Every script has a short purpose in scripts/README.md.
- Every public endpoint is documented.
- Every behavior change updates docs.

## GitHub Integration Recommendation

Commit these files at repository root and keep them versioned with code.
This ensures Copilot and collaborators consume the same context baseline.
