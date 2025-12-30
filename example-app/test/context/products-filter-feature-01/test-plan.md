# Products Filter Feature Test Plan

## Target

- **Page/View**: Products page (`/products`)
- **Feature**: Client-side filtering by product name and price range
- **Scenario**: All filtering scenarios - filter by name, filter by price range, reset filters, combined filters

## Coverage Baseline

- **Statements**: Unable to measure (test suite currently has failures - 122 passing, 5 failing)
- **Total tests**: 127 tests (122 passing)
- **Note**: Baseline should be re-measured after existing test failures are resolved

## Working Folder

`/Users/goldbergyoni/solutions/frontend-testing-setup/example-app/test/context/products-filter-feature-01`

## Test Framework

- **Page Testing**: Vitest Browser Mode (https://vitest.dev/guide/browser/)
- **Network Mocking**: MSW (https://mswjs.io/docs/)
- **Pattern Reference**: `/Users/goldbergyoni/solutions/frontend-testing-setup/example-app/src/pages/Cart/Cart.browser.test.tsx`

## Proposed Test Cases

### 1. When filtering by product name, then only matching products are displayed

- **Priority**: high
- **Type**: Page test (browser mode)
- **Simulation**:
  - Mock API to return 3 products: "Nike Shoes", "Adidas Shoes", "Cotton T-Shirt"
  - Navigate to Products page
  - Open filters popover by clicking "Filters" button
  - Enter "shoes" in the product name input
  - Click "Apply" button
- **Expected outcomes**:
  - UI shows only 2 products (Nike Shoes, Adidas Shoes)
  - Cotton T-Shirt is not visible
  - No API calls are made (client-side filtering)

### 2. When filtering by minimum price, then only products meeting price criteria are shown

- **Priority**: high
- **Type**: Page test (browser mode)
- **Simulation**:
  - Mock API to return products with prices: $50, $100, $150
  - Navigate to Products page
  - Open filters popover
  - Enter "100" in minimum price input
  - Click "Apply"
- **Expected outcomes**:
  - UI shows only products priced >= $100 ($100, $150)
  - $50 product is not visible
  - No API calls are made

### 3. When filtering by price range (min and max), then only products within range are shown

- **Priority**: high
- **Type**: Page test (browser mode)
- **Simulation**:
  - Mock API to return products with prices: $30, $75, $120, $200
  - Navigate to Products page
  - Open filters popover
  - Enter "50" in minimum price, "150" in maximum price
  - Click "Apply"
- **Expected outcomes**:
  - UI shows only products priced between $50-$150 ($75, $120)
  - Products priced $30 and $200 are not visible
  - No API calls are made

### 4. When combining name and price filters, then products must match all criteria

- **Priority**: high
- **Type**: Page test (browser mode)
- **Simulation**:
  - Mock API to return: "Nike Shoes" ($100), "Nike Shirt" ($50), "Adidas Shoes" ($120)
  - Navigate to Products page
  - Open filters popover
  - Enter "shoes" in name filter and "80" in minimum price
  - Click "Apply"
- **Expected outcomes**:
  - UI shows only "Nike Shoes" ($100)
  - Nike Shirt (doesn't match name) and Adidas Shoes (wrong brand) are not shown
  - No API calls are made

### 5. When clicking reset button, then filters are cleared and all products are shown

- **Priority**: high
- **Type**: Page test (browser mode)
- **Simulation**:
  - Mock API to return 3 products
  - Navigate to Products page
  - Apply filters (e.g., name = "shoes", min price = 100)
  - Open filters popover again
  - Click "Reset" button
- **Expected outcomes**:
  - Filter inputs are cleared (empty values)
  - All 3 products are visible again
  - No API calls are made

### 6. When filters popover is opened, then current filter values are displayed

- **Priority**: medium
- **Type**: Page test (browser mode)
- **Simulation**:
  - Mock API to return products
  - Navigate to Products page
  - Apply filters (name = "test", min = 50, max = 100)
  - Close popover (click outside or ESC)
  - Re-open filters popover
- **Expected outcomes**:
  - Filter inputs show previously applied values
  - Products remain filtered
  - No API calls are made

### 7. When no products match filter criteria, then empty state is displayed

- **Priority**: medium
- **Type**: Page test (browser mode)
- **Simulation**:
  - Mock API to return products all priced under $100
  - Navigate to Products page
  - Open filters popover
  - Enter "500" in minimum price input
  - Click "Apply"
- **Expected outcomes**:
  - UI shows empty state result component
  - No product cards are visible
  - No API calls are made

### 8. When filter values are invalid (max < min), then appropriate handling occurs

- **Priority**: low
- **Type**: Page test (browser mode)
- **Simulation**:
  - Navigate to Products page
  - Open filters popover
  - Enter "100" in min price, "50" in max price
  - Click "Apply"
- **Expected outcomes**:
  - Either validation error is shown, OR
  - No products are displayed (valid behavior for impossible range)
  - No API calls are made
- **Note**: Implementation will determine exact behavior

### 9. When "Load More" button is used with active filters, then new products are also filtered

- **Priority**: medium
- **Type**: Page test (browser mode)
- **Simulation**:
  - Mock API to return 15 products (initial limit is 10)
  - Products 1-10: various prices
  - Products 11-15: all priced over $200
  - Navigate to Products page
  - Apply filter: min price = $200
  - Click "Load More" button
- **Expected outcomes**:
  - Only products over $200 are visible
  - Products from both initial and loaded batches are filtered
  - API is called only for "Load More" (not for filtering)

### 10. When filters button accessibility is tested, then it meets ARIA standards

- **Priority**: medium
- **Type**: Page test (browser mode)
- **Simulation**:
  - Navigate to Products page
  - Query for filters button using accessible role/name
- **Expected outcomes**:
  - Button is findable via `getByRole('button', { name: 'Filters' })`
  - Popover has appropriate ARIA attributes when opened
  - Filter inputs have proper labels for screen readers

## Test Data Requirements

### Product Fixtures

Create test products with varying:

- **Names**: Mix of brands, product types, generic terms
- **Prices**: Range from $10 to $500 for comprehensive price testing
- **Categories**: Various categories to ensure filter doesn't affect non-price/name fields

Suggested fixture products:

1. "Nike Running Shoes" - $129.99
2. "Adidas Training Shoes" - $89.99
3. "Cotton T-Shirt" - $24.99
4. "Leather Jacket" - $299.99
5. "Wireless Headphones" - $149.99
6. "Smartphone Case" - $19.99

## Implementation Notes

### Mocking Strategy

- Use MSW to mock `GET /products` endpoint
- Return predetermined product list for each test scenario
- Use `worker.use()` pattern from canonical example
- No need to mock mutation endpoints (filtering is client-side only)

### Helper Functions to Create

Consider extracting helpers similar to Cart test:

```typescript
function mockProductsAPI(worker: SetupWorker, products: IProduct[]) {
  worker.use(http.get(`${host}/products`, () => HttpResponse.json(products)));
}

function openFiltersPopover() {
  await page.getByRole("button", { name: "Filters" }).click();
}

function applyFilters() {
  await page.getByRole("button", { name: "Apply" }).click();
}
```

### Assertions Focus

Focus on **external outcomes only**:

- ✅ Product cards visible/not visible in DOM
- ✅ Empty state component visible
- ✅ Filter input values (visible to user)
- ✅ Accessible roles and labels
- ❌ Internal state (filter values in memory)
- ❌ Implementation details (how filtering logic works)

### Test File Location

Following project structure:

- **File**: `/Users/goldbergyoni/solutions/frontend-testing-setup/example-app/src/pages/Products/Products-filter.browser.test.tsx`
- Pattern: Page-level test since filtering affects entire page view
- Name convention: `{Page}-{feature}.browser.test.tsx`

## Next Steps

1. **Wait for feature implementation** - Filter hook and UI components must exist first
2. **Run page-analyzer agent** - Once filter UI exists, analyze page elements and accessibility
   - Command: Invoke `page-analyzer` agent with target URL and working folder
   - Output: `page-analysis.md` with actual element selectors, ARIA attributes, network calls
3. **Write tests** - Use both this plan and `page-analysis.md` as references
4. **Run test-verifier agent** - Validate test quality and coverage
5. **Measure coverage delta** - Compare new coverage to baseline after test fixes

## Coverage Goals

- **Target**: 100% of filter feature code paths
  - Name filtering logic
  - Price range filtering logic
  - Combined filter logic
  - Reset functionality
  - UI interactions (popover open/close, form submission)
- **Stretch goal**: Maintain or improve overall project coverage percentage
