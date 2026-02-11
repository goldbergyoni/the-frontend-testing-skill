# Testing Strategy and Tooling

Guidance on:

- What types of tests to write
- The right mix between page testing, component testing, and unit testing
- Which test runners and libraries to use

---

## Testing Strategy: Minimize Test Types

By design, we aim for as few test types as possible to minimize cognitive overhead. Only when there is a very strong need for additional types of tests should they be considered.

### Page Testing First

Our primary test type is **page testing**. Focus on this one type to achieve most of your confidence. In page testing, the test scope is a single page. Each test demonstrates one meaningful action—filling a form and submitting, filtering a grid, or performing an action over an entity—then asserts that the right outward-facing outcomes were met. If a test would navigate to another page, stop there; every test is scoped to a single page. The backend is mocked with a network interception tool so you can easily simulate various backend responses and trigger edge cases.

### Component & Library Testing

On top of page testing, every reusable component or library deserves its own isolated test. Any generic library or design system component should get a dedicated set of tests that prove it works in various scenarios without coupling to any specific page.

### Unit Tests: Only for Heavy Logic

Unit tests should only be considered for heavy logic modules with high combinatorial input—complex calculations, algorithms, or pure functions with many input variations. If the logic can be adequately tested through page tests, prefer that approach.

---

## What to Test: External Outcomes Only

Focus only on publicly noticeable external outcomes and effects. Never test implementation details.

**Outcomes to verify:**

- **Meaningful UI changes** that matter to the user—visual changes users would notice, not internal state
- **Mutations sent to the API**—POST, PUT, and DELETE requests
- **Storage changes** that might affect successor pages—cookies, localStorage, sessionStorage that other pages read
- **Any other external effect**—events dispatched, messages published, or observable side effects

We test what the user sees and what the system emits—never how the code is structured internally.

---

## Tooling & Frameworks

All framework choices are configured in `@config.toml`. This keeps the skill framework-agnostic—only the config changes between deployments.

### Integration/Page Test Framework

**Framework:** Read from `@config.toml` → `framework.integration_test_framework`
**Documentation:** Read from `@config.toml` → `framework.integration_test_framework_docs`

### Network Interception Tool

**Tool:** Read from `@config.toml` → `framework.network_interception_framework`
**Documentation:** Read from `@config.toml` → `framework.network_interception_framework_docs`

### Unit Test Framework

**Framework:** Read from `@config.toml` → `framework.unit_test_framework`
**Documentation:** Read from `@config.toml` → `framework.unit_test_framework_docs`

### Unit Test Mocking

**Library:** Read from `@config.toml` → `framework.unit_test_mocking_framework`
**Documentation:** Read from `@config.toml` → `framework.unit_test_mocking_framework_docs`
