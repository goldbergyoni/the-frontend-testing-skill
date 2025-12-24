# Initialize Testing Skill Links

Link project memory files and SDD framework templates to the testing skill.

## Prerequisites

1. Verify `.claude/skills/testing/SKILL.md` exists in this project
2. If not found, STOP and report: "Testing skill not found at `.claude/skills/testing/`. Install it first."

## Tasks

### 1. Update Memory Files

Search project root for these files:

- `CLAUDE.md`
- `AGENTS.md`
- `README.md`

For each file found:

- Check if it contains `## Testing` AND references `.claude/skills/testing/`
- If already references testing skill: skip
- If no testing skill reference: append this section at the end:

```markdown
## Testing

Testing is a core practice in this project. For planning, coding, or reviewing - consult the testing skill at `.claude/skills/testing/SKILL.md`. Follow the workflow in `.claude/skills/testing/test-workflow.md`.
```

### 2. Detect SDD Framework

Check for these spec-driven development frameworks:

| Framework | Detection                               |
| --------- | --------------------------------------- |
| OpenSpec  | `openspec/AGENTS.md` exists             |
| SpecKit   | `speckit/` or `.speckit/` folder exists |
| BMAD      | `bmad/` or `.bmad/` folder exists       |
| AgentOS   | `agentos/` or `.agentos/` folder exists |

Report which framework found (or "none detected").

### 3. Update SDD Framework Files (if detected)

**A. Update framework's AGENTS.md** - Add this section (if not already referencing testing skill):

```markdown
## Testing Integration

Before finalizing specs or tasks, review testing requirements:

- Skill: `.claude/skills/testing/SKILL.md`
- Workflow: `.claude/skills/testing/test-workflow.md`
- Patterns: `.claude/skills/testing/patterns-and-practices/`
```

**B. Update command templates** - For each template file (proposal, apply, task templates), add this section:

```markdown
## Testing Alignment

Any spec creation, task planning, or tech design must align with the testing skill. Before finalizing this document, review `.claude/skills/testing/test-workflow.md` to ensure testing considerations are incorporated into your plan.
```

**Template locations by framework:**

| Framework | Command Templates                                     |
| --------- | ----------------------------------------------------- |
| OpenSpec  | `.claude/commands/openspec/*.md`                      |
| SpecKit   | `speckit/templates/*.md` or `.speckit/templates/*.md` |
| BMAD      | `bmad/templates/*.md` or `.bmad/templates/*.md`       |
| AgentOS   | `agentos/templates/*.md` or `.agentos/templates/*.md` |

### 4. Output Summary

Print this summary at the end:

```
## Testing Skill Initialization Complete

### Memory Files Updated:
- [list each file updated, or "none found"]

### SDD Framework Detected:
- [framework name, or "none"]

### Templates Updated:
- [list each file updated, or "none"]

🧪 Happy testing
```

## Important Rules

- Skip any file that already contains `.claude/skills/testing/`
- Do not overwrite existing content - only append new sections
- Use relative paths from project root in all references
