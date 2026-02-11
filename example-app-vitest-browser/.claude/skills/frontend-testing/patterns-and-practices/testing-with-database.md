# Testing with Database

**When to use:** When tests interact with a real database.

---

## Section G - Testing with database

G.3. Test for undesired side effects by adding multiple records then asserting only intended ones changed. Example: `await api.delete('/order/123')` then verify `await api.get('/order/456')` still returns 200

G.5. Test response schema for auto-generated fields using type matchers. Example: `expect(response).toMatchObject({ id: expect.any(Number), createdAt: expect.any(String) })`

G.7. Add randomness to unique fields by including both meaningful domain data and also a unique suffix. Example, assuming email is unique: `{ email: \`\${faker.internet.email()}-\${faker.string.nanoid(5)}\` }`

G.9. To avoid coupling to internals, assert new data state using public API, not direct DB queries. Example: After `await api.post('/order', newOrder)`, verify with `await api.get('/order/${id}')`

G.12. Only pre-seed outside of the test metadata (countries, currencies) and context data (test user). Create test-specific records in each test. Example: Global seed has countries list, test creates its own orders

G.14. IMPORTANT: Each test acts on its own records only - never share test data between tests

G.18. Test for undesired cascading deletes or updates. Example: Delete parent record, assert child records handle it gracefully (either preserved or cleanly removed per business rules)
