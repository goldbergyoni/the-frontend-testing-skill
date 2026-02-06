# Testing with DOM

**When to use:** When testing React components with testing-library, Playwright, StoryBook, or similar frameworks.

> **Framework Translation:** Locator syntax is similar across frameworks:
> | Vitest Browser Mode | Playwright |
> |---------------------|------------|
> | `screen.getByRole()` | `page.getByRole()` |
> | `screen.getByLabelText()` | `page.getByLabel()` |
> | `screen.getByText()` | `page.getByText()` |
> | `screen.getByPlaceholder()` | `page.getByPlaceholder()` |

---

## Section F - Testing with DOM

F.1. Important: Use only user-facing locators based on ARIA roles, labels, or accessible names (e.g., getByRole, getByLabel). Avoid using test-id (e.g., .getByTestId), CSS selectors, or any non-ARIA-based locators

F.3. Do not assume or rely on the page structure or layout. Avoid using positional selectors like nth(i), first(), last() and similar

F.5. Use the framework mechanism for asserting safely on elements: If the framework can tell deterministically when the re-render ended (e.g., testing-library), just include standard non-awaitable assertions. In framework like Playwright that don't interact directly with the Renderer, use auto-retriable assertions (a.k.a web-first assertions) with await: `await expect(locator).toContainText('some string');`

F.9. Avoid waiting for some internal element appearance (e.g., Playwright waitForSelector) as it couple the test to the implementation. The auto-retriable assertion will do the wait in a reliable way

F.14. Avoid approaching and asserting on external systems. Alternatively, assert that the navigation happened and if needed simulate a stubbed response
