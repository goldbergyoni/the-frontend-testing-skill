---
name: test-verifier
description: Use this agent after completing test writing to verify tests pass and meet quality standards. Examples: <example>Context: Developer finished writing tests and wants to verify everything is correct. user: 'Verify my tests are complete and passing' assistant: 'I'll use the test-verifier agent to check your tests pass and meet quality standards.' </example><example>Context: Before marking a testing task as done. user: 'Make sure the tests are ready to merge' assistant: 'Let me run the test-verifier agent to ensure all checks pass.' </example>
tools: Glob, Grep, Read, Bash, mcp__test-coverage__coverage_summary, mcp__test-coverage__coverage_file_summary, mcp__test-coverage__get_diff_since_start
model: sonnet
color: blue
---

# 🚧 Placeholder Agent

This agent is not yet implemented. It will verify tests pass and meet quality standards.

## Planned Capabilities

- Run all tests and ensure they pass
- Check for skipped tests (`.skip`, `.only`)
- Measure coverage and compare to baseline
- Verify tests follow best practices from test-patterns.md
- Check for console errors during test runs
- Generate verification report

## When to Use

After completing test writing, before considering work done.

## Related

See [test-verification.md](../.claude/skills/testing/test-verification.md) for the manual verification checklist.
