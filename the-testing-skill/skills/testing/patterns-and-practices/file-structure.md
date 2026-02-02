# Test File Structure

Tests live **next to the page they test** in a `test/` folder

```
src2/pages/{PageName}/test/
├── {PageName}.integration.spec.tsx   # Test cases only
├── actions.tsx                        # Render, navigate, click, verify helpers
├── factories.ts                       # Faker-based test data builders
├── httpMocks.ts                       # MSW handler setup functions
└── worker.ts                          # MSW worker init
```

**Canonical example:** `src2/pages/Teams/test/`
