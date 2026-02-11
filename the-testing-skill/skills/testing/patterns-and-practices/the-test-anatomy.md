# The Test Anatomy

**Read this document before writing any test.** It covers the fundamental structure, logic, and critical rules that every test must follow.

These rules are not applicable to end-to-end tests that span multiple processes and components, only for unit, integration, component, Microservice, API tests. If you realize tests that don't mock the backend, these are end-to-end tests, in this case apply the rules from [system-wide-e2e-best-practices.md](./system-wide-e2e-best-practices.md).

---

## The 6 Most Important (!) Rules

Tests must never become another system to maintain, so we keep its complexity ridiculously low. Building a super simple reading experience is a top priority. Always stop coding a test if you can't follow these rules. While all rules in this document are mandatory, these 6 are absolutely critical:

1. Important: The test should have no more than 10 statements #customize
2. Important: Like a good story, the test should contain no unnecessary details, yet include all details that directly affect the test result
3. Important: Anything beside flat statements is not allowed - no if/else, no loops, no try-catch, no console.log
4. Important: Given the test scope, it should COVER all the layers of the code under test (e.g., frontend page, backend Microservice). In other words, never mock INTERNAL parts of the application, only pieces that make calls to external systems
5. 🔫 The smoking gun principle: Important: Each data or assumption in the assertion/expectation phase, must appear first in the arrange phase to make the result and cause clear to the reader
6. Important: Each test that is self-contained and never relies on other tests state or generated artifacts. Consequently, if a test depends on any state, it should create it itself or ensure it was created in a hook

---

## Section A - The Test Structure

A. 1. The test title should have the pattern of 'When {case/scenario}, then {some expectation}', For example, 'When adding a valid order, then it should be retrievable' #customize

A. 2. Try to use the same setup as in the example i provided you in the config.toml file. Meaning- if you see that we are already invoking authentication-related logic in order to bypass it- reuse it.

A. 3. No more than 10 statements and expressions. Don't count a single expression that was broken to multiple lines #customize

A. 4. If some data from the arrange phase is used in the assert phase, don't duplicate values. Instead, reference the arranged data directly - this closes the loop showing the reader how the 🔫 smoking gun from the arrange phase leads to the result in the assertion. Example: Use `expect(result.id).toBe(activeOrder.id)` not `expect(result.id).toBe('123')`

A. 5. A test should have at least three phases: Arrange, Act and Assert. Either the phase names exist in the test or a line break must appear before the 2nd and 3rd phases

A. 10. No more than 3 assertions

A. 13. Totally flat, no try-catch, no loops, no comments, no console.log

A. 15. 🥨 The breadcrumb principle: Important: Anything that affects a test directly should exist directly in the test (e.g., a data that will get checked in the assert phase). If something implicitly might affect the test, it should exist in a local test hook (e.g., mock authentication in beforeEach, not in external setup). Avoid hidden effects from extraneous setup files

A.18. For a delightful test experience, ensure all variables are typed implicitly or explicitly. Don't use 'any' type. Should you need to craft a deliberately invalid input, use 'myIllegalObject as unknown as LegalType'

A.23. For clarity, assertions should exist only inside test and never inside helpers or hooks

A.25. Assertions should exist only in the /Assert phase, never in start or middle of a test

A.28. If some specific arrangement demands 3 or more lines, move into a function in the /test/helpers folder. It's OK if the overall Arrange is more than 2 lines, only if specific setup that aims to achieve one thing grabs 3 or more lines - it should be extracted to a helper file

---

## Section B - The Test Logic

B. 3. 🔫 The smoking gun principle: Important: Each data or assumption in the assertion phase, must appear first in the arrange phase to make the result and cause clear to the reader

B. 5. Details that are not directly related with understanding the test result, should not be part of the test

B. 10. There should be no redundant assertions

B. 15. Don't assert and compare huge datasets but rather focus on a specific topic or area in a test

B. 20. If a test assumes the existence of some records/data, it must create it upfront in the Arrange phase

B. 23. Don't test implementation details. Mention this issue only if seeing assertions that check internal implementation and not user-facing behavior like screen elements

B. 25. Avoid any time-based waiting like setTimeout or page.waitForTimeout(2000)

B. 28. Clean up before each test (beforeEach) anything that might leak between tests: mocks, environment variables, local storage, globals, and other resources that make tests step on each other's toes

---

## Examples

### BAD Test Example

```typescript
// BAD TEST EXAMPLE - Violates multiple best practices
it('should test orders report filtering functionality', async () => { // 👎🏻 violates A.1
  const adminUser = { role: 'admin' } // 👎🏻 violates I.10
  // Setting up mocks for internal implementation details
  const mockOrderService = vi.fn() // 👎🏻 violates E.1
  const mockFilterService = vi.fn() // 👎🏻 violates E.1

  // Dummy meaningless data
  const testData = [ // 👎🏻 violates C.8
    { id: 1, name: 'test1', status: 'foo', date: '2023-01-01' },
    { id: 2, name: 'test2', status: 'bar', date: '2023-01-02' }
  ]

  // No clear arrange phase - mixing setup with assertions
  render(<OrdersReport data={testData} onFilter={mockFilterService} />)

  // Getting internal component state instead of user-facing behavior
  const component = screen.getByTestId('orders-report') // 👎🏻 violates F.1
  const internalState = component.querySelector('.internal-filter-state') // 👎🏻 violates F.1

  try { // 👎🏻 violates A.13
    const filterButton = screen.getByRole('button', { name: 'Filter Active' })
    await userEvent.click(filterButton)

    // Custom assertion logic instead of built-in expect
    let foundItems = [] // 👎🏻 violates D.7
    const rows = screen.getAllByRole('row')
    for (const row of rows) { // 👎🏻 violates A.13, D.7
      if (row.textContent?.includes('Active')) {
        foundItems.push(row)
      }
    }
    // Asserting data that was never arranged in the test
    expect(foundItems.length).toBe(5) // 👎🏻 violates B.3, B.20

    // Testing implementation details
    expect(mockOrderService).toHaveBeenCalled() // 👎🏻 violates B.23
    expect(internalState).toHaveClass('filtered-state') // 👎🏻 violates B.23

    // Too many assertions
    expect(component).toBeInTheDocument() // 👎🏻 violates A.10
    expect(screen.getByText('Active Orders')).toBeVisible() // 👎🏻 violates A.10
    expect(filterButton).toHaveAttribute('aria-pressed', 'true') // 👎🏻 violates A.10
    expect(rows).toBeDefined() // 👎🏻 violates B.10, D.11
    expect(rows).not.toBeNull() // 👎🏻 violates B.10, D.11
    expect(rows.length).toBeGreaterThan(0) // 👎🏻 violates B.10, D.11

  } catch (error) { // 👎🏻 violates A.13
    console.log('Filter test failed:', error) // 👎🏻 violates A.13
    throw new Error('Test setup failed')
  }

  // More irrelevant details not related to filtering
  const headerElement = screen.getByRole('banner')
  expect(headerElement).toHaveTextContent('Dashboard') // 👎🏻 violates B.5
}) // 👎🏻 violates A.3 (too many statements), A.5 (no clear AAA phases)
```

### GOOD Test Example

```typescript
beforeEach(() => {
  const currentUser = buildUser({ name: faker.person.fullName(), role: 'viewer' }) // 🔥 The deliberate fire principle
  http.get('/api/user/1', () => HttpResponse.json(currentUser)) // 🥨 The breadcrumb principle
})

test('When filtering by active status, then only active orders are displayed', async () => {
  // Arrange
  const activeOrder = buildOrder({ customerName: faker.person.fullName(), status: 'active' })
  const completedOrder = buildOrder({ customerName: faker.person.fullName(), status: 'non-active' }) // 🔫 The smoking gun principle
  http.get('/api/orders', () => HttpResponse.json([activeOrder, completedOrder]))
  const screen = render(<OrdersReport />)

  // Act
  await userEvent.click(screen.getByRole('button', { name: 'Filter by Active' }))

  // Assert
  expect.element(screen.getByRole('cell', { name: activeOrder.customerName })).toBeVisible()
  expect.element(screen.getByRole('cell', { name: completedOrder.customerName })).not.toBeVisible() // 🚀 The extra mile principle
})
```

> 📌 **Real-world example:** For a complete page test demonstrating these patterns, see the canonical test configured in `config.toml` under `[canonical_example]`.

---

## In Closing

Try to respect all the rules, the 'The 6 most important (!) rules' are even more important, read them twice.
