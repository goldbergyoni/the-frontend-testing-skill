---
description: "Plan testing of a the $ARGUMENTS page and scenarios including page inspection, elements accessibility check, console errors verification, print screens and more"
---

Invoke the `test-planner` agent with the following arguments:

- **Page/View**: $ARGUMENTS
- **Working folder** (optional): If a specific working folder path is provided in the arguments, pass it to the agent

The agent will:

1. Read configuration from `.claude/skills/testing/config.toml`
2. Create a working folder based on the config template
3. Run tests and measure coverage baseline using `mcp__test-coverage__coverage_summary`
4. Start the app and analyze the target page with Playwright MCP
5. Generate two output files:
   - `page-analysis.md` - Page analysis data (navigation, elements, accessibility, network, implementation)
   - `test-plan.md` - Test definitions (coverage baseline, proposed test cases with simulation guidance)
