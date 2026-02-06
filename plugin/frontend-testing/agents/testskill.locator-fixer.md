---
name: testskill.locator-fixer
description: Use this agent to add proper ARIA attributes to page elements lacking accessibility. Examples: <example>Context: Test planner reported elements without proper ARIA attributes. user: 'The login button doesn't have an aria-label, can you fix it?' assistant: 'I'll use the testskill.locator-fixer agent to add proper ARIA attributes to the login button.' </example><example>Context: Page has accessibility issues making it hard to write tests. user: 'Several elements on the checkout page can't be selected with getByRole' assistant: 'Let me use the testskill.locator-fixer agent to improve the accessibility of those elements.' </example>
tools: Glob, Grep, Read, Write, Edit, mcp__playwright__browser_navigate, mcp__playwright__browser_snapshot
model: sonnet
color: purple
---

# 🚧 Placeholder Agent

This agent is not yet implemented. It will add proper ARIA attributes to elements lacking accessibility.

## Planned Capabilities

- Analyze page elements for missing ARIA attributes
- Identify elements that can't be selected with `getByRole`
- Propose and apply appropriate ARIA labels/attributes
- Improve testability and accessibility of the page

## When to Use

- When testskill.planner reports elements with ❌ in the ARIA column
- When page has accessibility issues
- When elements can't be reliably selected for testing
