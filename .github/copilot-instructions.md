# Copilot Instructions for IDP Strategy Workspace

Primary shared context source: [AGENT.md](AGENT.md)

This file contains Copilot-specific guidance. Shared rules should remain in AGENT.md.

## Workspace Context

This is a **hybrid workspace** for the Internal Developer Platform (IDP) strategy initiative at AYESA. It contains:
- Strategic planning documents and credentials
- Demo/webinar materials showcasing IDP tooling (CloudBees Unify CI/CD)
- Reference implementations for presentations

## Workspace Structure

### Root Directory
- `github-recovery-codes.txt`: GitHub account recovery codes (**SENSITIVE - never expose**)
- `PE Mapfre MX.pdf`: Project documentation/proposal for Mapfre Mexico

### Webinar/ Directory
Contains demonstration materials for IDP presentations:
- **[cloudbees-unify.yml](Webinar/cloudbees-unify.yml)**: Template CloudBees Unify pipeline with standard CI/CD stages (build → test → package → deploy)
  - Uses parameter substitution (`${APP_NAME}`, `${REGISTRY}`, etc.)
  - Follows NPM-based build workflow with Docker packaging
  - Spanish comments for LATAM audience
- **[CloudBeesPipelineBuilder.tsx](Webinar/CloudBeesPipelineBuilder.tsx)**: React component for interactive pipeline generation
  - Next.js client component (`"use client"`)
  - Form-based YAML generator with live preview
  - Demonstrates IDP self-service portal UI pattern

## Key Patterns & Conventions

### CloudBees Pipeline Structure
The workspace demonstrates CloudBees Unify's declarative pipeline approach:
```yaml
pipeline → triggers → stages → steps → run commands
```
Standard stage sequence: `build` → `test` → `package` → `deploy`

### TypeScript Component Patterns
- React functional components with TypeScript types
- `useMemo` for derived YAML generation to avoid unnecessary recalculations
- Controlled form inputs with shared `onChange` handler factory
- Template literal approach for multi-line YAML formatting

### Bilingual Content (ES/EN)
- YAML comments and configuration parameters in Spanish
- React component UI text in Spanish ("Configura parámetros...")
- Code identifiers and technical terms in English
- Accommodate both languages when generating new content

## Security & Sensitive Information

- **NEVER** expose contents of [github-recovery-codes.txt](github-recovery-codes.txt)
- All files should be treated as confidential AYESA internal materials
- When working with credentials, recommend secure password managers instead

## Workflows for Different Request Types

### Webinar/Demo Material Requests
- **Updating pipelines**: Edit [cloudbees-unify.yml](Webinar/cloudbees-unify.yml) with proper parameter syntax
- **Adding stages**: Follow existing 4-space indentation, include `name` and `steps`
- **Modifying builder UI**: Update [CloudBeesPipelineBuilder.tsx](Webinar/CloudBeesPipelineBuilder.tsx) state and form fields in parallel
- **New demo components**: Create in `Webinar/` directory, use Next.js/React patterns

### Documentation Requests
- Create markdown files with clear naming conventions
- Maintain Spanish content for LATAM materials
- Suggest subdirectories by project, client, or document type

### Code Generation Requests
- **Within Webinar context**: Proceed with React/TypeScript or CloudBees YAML
- **New standalone projects**: Clarify if separate workspace is needed
- **Build/test commands**: This workspace has no build system - webinar files are references only

## Questions to Ask Users

- Creating new content: "Is this for the webinar demo or a separate implementation?"
- Pipeline modifications: "Should I update both the YAML template and the TSX generator?"
- New features: "Should this be added to existing webinar materials or as a new example?"

# Project Coding Standards

## Testing
- Write tests before code (TDD)
- For bugs: write a failing test first, then fix (Prove-It pattern)
- Test hierarchy: unit > integration > e2e (use the lowest level that captures the behavior)
- Run `npm test` after every change

## Code Quality
- Review across five axes: correctness, readability, architecture, security, performance
- Every PR must pass: lint, type check, tests, build
- No secrets in code or version control

## Implementation
- Build in small, verifiable increments
- Each increment: implement → test → verify → commit
- Never mix formatting changes with behavior changes

## Boundaries
- Always: Run tests before commits, validate user input
- Ask first: Database schema changes, new dependencies
- Never: Commit secrets, remove failing tests, skip verification