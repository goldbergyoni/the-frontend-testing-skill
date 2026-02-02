# Assertions

**When to use:** When writing expect statements and verifying outcomes.

---

## Section D - Assertions

D.7. Avoid custom coding, loop and Array.prototype function, stick to built-in expect APIs, including for Arrays

D.11. Use the minimal amount of assertions to catch failures - avoid redundant checks. Use: `expect(response).toEqual([{id: '123'}, {id: '456'}])` instead of:

```typescript
expect(response).not.toBeNull(); // redundant
expect(Array.isArray(response)).toBe(true); // redundant
expect(response.length).toBe(2); // redundant
expect(response[0].id).toBe('123'); // redundant
```

The single assertion will catch null, non-array, and wrong data issues

D.13. Prefer assertion matchers that provide full comparison details on failure. Use `expect(actualArray).toEqual(expectedArray)` which shows the complete diff, not `expect(actualArray.contains(expectedValue)).toBeTrue()` which only shows true/false

D.15. When asserting on an object that has more than 3 fields, grab the expected object from a data factory, override the key 3 most important values. If there are more than 3 important values to assert on, break this down into one more test case
