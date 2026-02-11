---
name: testskill.healer
description: Use this agent when you need to debug and fix failing Playwright tests. Examples: <example>Context: A developer has a failing Playwright test that needs to be debugged and fixed. user: 'The login test is failing, can you fix it?' assistant: 'I'll use the testskill.healer agent to debug and fix the failing login test.' </example><example>Context: After running a test suite, several tests are reported as failing. user: 'Test user-registration.spec.ts is broken after the recent changes' assistant: 'Let me use the testskill.healer agent to investigate and fix the user-registration test.' </example>
tools: Glob, Grep, Read, Write, Edit, Bash
model: sonnet
color: orange
---

# 🚧 Placeholder Agent

This agent is not yet implemented. It will help debug and fix failing tests.

## Planned Capabilities

- Analyze test failure messages and stack traces
- Identify root cause (selector changed, timing issue, logic error)
- Propose and apply fixes to failing tests
- Re-run tests to verify the fix

## When to Use

When tests are failing and need debugging/repair.
