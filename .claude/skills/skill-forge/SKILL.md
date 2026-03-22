---
name: skill-forge
description: "Create or modify skills then auto-register them. Wrapper around /skill-creator + /skills-registry. Use when: user says /skill-forge, 'create a skill', 'new skill', 'make a skill', 'modify skill', 'edit skill', 'improve skill'."
---

# /skill-forge

Create or modify Claude Code skills, then automatically sync the skills registry.

This skill chains two existing skills in sequence, with an automatic help modifier convention.

## Workflow

### Step 1: Run /skill-creator

Pass the user's full request to the `/skill-creator` skill. This handles all skill creation, modification, evaluation, and optimization.

**Important:** Forward all user arguments and context exactly as provided. Do not alter or summarize the user's request.

### Step 2: Auto-Add Help Modifier

After `/skill-creator` finishes, automatically ensure the created or modified skill has a `help` modifier section. If one already exists, update it to reflect the current state of the skill.

#### Help Modifier Convention

Every skill created or modified through `/skill-forge` MUST have a `help` modifier. Add this at the end of the SKILL.md, before any trailing notes:

```markdown
## Modifiers

### help
Usage: `/skill-name help`

**skill-name** — One-line description of what the skill does.

Available modifiers:
- `help` — Show this help message
- `modifier-name` — Description (list all other modifiers the skill supports)
```

**Rules:**
- If the skill already has a `## Modifiers` section, add `help` to it (don't duplicate the section)
- If the skill has modifiers defined elsewhere (e.g., in an Arguments section), consolidate them into the help output
- Keep the help text concise — just the skill's purpose and available modifiers
- When editing an existing skill (adding/removing modifiers), always update the `help` modifier to reflect the current state

### Step 3: Run /skills-registry

After `/skill-creator` completes successfully, run `/skills-registry` to discover and register the newly created or modified skill.

This ensures the central skills registry (`~/.claude/skills-registry.md`) is always up to date without manual intervention.

## Notes

- If `/skill-creator` fails or the user cancels, do NOT run `/skills-registry`
- This skill is intentionally thin — all logic lives in the two upstream skills
- The help modifier convention applies only to slash command skills, not auto-applied skills

## Modifiers

### help
Usage: `/skill-forge help`

**skill-forge** — Create or modify Claude Code skills, then auto-register them and ensure a help modifier exists.

Available modifiers:
- `help` — Show this help message
