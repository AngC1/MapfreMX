# MapfreMX - Context Engineering & SDD

Este repositorio implementa una estrategia reusable para trabajar con GitHub Copilot y otros LLMs mediante Context Engineering + SDD (Spec Driven Development).

## Objetivo

- Estandarizar el contexto para modelos de IA.
- Reducir ambiguedad en documentacion y estructura.
- Reutilizar el mismo patrón en otros repositorios.

## Estrategia SDD (Spec Driven Development)

SDD en este repo significa construir desde la especificacion hacia el codigo:

1. Spec: definir el comportamiento esperado en `Skill.md`, `docs/api/` y guias.
2. Design: fijar arquitectura y reglas en `ARCHITECTURE.md`, `AGENT.md` y convenciones.
3. Develop: implementar en `src/` con scripts reproducibles en `scripts/`.
4. Validate: validar con pruebas y checklists en `src/test/` y `docs/guides/SETUP_CHECKLIST.md`.
5. Operate: mantener catalogo y contexto actualizado en `Skill-Catalog.md` y README.

## Estrategia Context Engineering

Capas de contexto recomendadas para LLMs:

1. Navegacion global: `.github/README.md`
2. Descubrimiento de proyectos: `.github/Skill-Catalog.md`
3. Reglas globales de agente: `.github/AGENT.md`
4. Adaptador por modelo: `.github/copilot-instructions.md` o `.github/CLAUDE.md`
5. Contexto especifico del proyecto: `.github/skill/<project>/Skill.md`

## Estructura Skill

```text
.github/
├── skill/
│   └── <project>/
│       ├── README.md
│       ├── Skill.md
│       ├── CONTRIBUTING.md
│       ├── STRUCTURE.md
│       ├── INDEX.md
│       ├── scripts/
│       ├── docs/
│       ├── resources/
│       ├── config/
│       └── src/
├── Skill-Catalog.md
├── SKILL-TEMPLATE.md
├── AGENT.md
├── CLAUDE.md
├── CONTEXT-ENGINEERING.md
└── copilot-instructions.md
```

## Nombres Canonicos (importante)

Usar siempre estos nombres:

- `skill/` (no `skills/`)
- `Skill.md` (no `Skill.m`)
- `AGENT.md` (no `Agnet.md`)
- `CLAUDE.md` (no `Cloud.md` ni `Cloude.md`)

## Flujo Recomendado con Copilot

1. Leer `.github/README.md`
2. Revisar `.github/Skill-Catalog.md`
3. Aplicar reglas de `.github/AGENT.md`
4. Aplicar adapter de modelo (`copilot-instructions.md` o `CLAUDE.md`)
5. Implementar cambios en `.github/skill/<project>/`
6. Actualizar docs y catalogo

## Documentacion Clave

- `.github/README.md`: estructura organizacional
- `.github/CONTEXT-ENGINEERING.md`: blueprint reusable
- `.github/AGENT.md`: reglas globales
- `.github/CLAUDE.md`: reglas especificas para Claude
- `.github/Skill-Catalog.md`: catalogo de skills
- `.github/SKILL-TEMPLATE.md`: plantilla para nuevos skills

## Estado

- Context Engineering baseline: activo
- SDD strategy: documentada
- Estructura Skill reusable: activa
