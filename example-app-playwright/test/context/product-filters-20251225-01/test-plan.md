# Product Filters Feature - Test Plan

## Target

- **Page/View**: Products page (`/products`)
- **Scenario**: All filtering scenarios (name search, price range, combined filters, reset)
- **Feature**: Product Filters Popover with client-side filtering

## Coverage Baseline

**Current State**: Tests are failing (7 failed, 132 passed out of 145 tests)

- Coverage report not available due to test failures
- Baseline will be established after fixing existing test failures
- **Action Required**: Fix test failures before implementing new feature tests

**Note**: The product filters feature is not yet implemented, so no existing tests cover this functionality.

## Proposed Test Cases

### 1. When user opens More Filters popover, then all filter inputs and reset button are visible

- **Priority**: HIGH
- **Type**: Component rendering test
- **Simulation**:
  - Render `<ProductsPage />` with test wrapper (providers)
  - Use MSW to mock products API response with diverse test data
  - Click "More filters" button using `getByRole('button', { name: 'More filters' })`
  - Assert Popover opens
  - Verify presence of:
    - Text input with label "Product name" or "Search by name"
    - Number input with label "Min price"
    - Number input with label "Max price"
    - Button "Reset filters" or "Clear"
- **Expected Result**: All filter controls are rendered and accessible

### 2. When user filters by product name only, then only matching products are displayed

- **Priority**: HIGH
- **Type**: Filtering logic test
- **Simulation**:
  - Mock API to return products including:
    - "Fjallraven Backpack" ($109.95)
    - "Mens Cotton Jacket" ($55.99)
    - "Mens Casual Slim Fit" ($15.99)
  - Open filters popover
  - Type "mens" in name search input (case-insensitive test)
  - Assert only 2 products displayed: "Mens Cotton Jacket" and "Mens Casual Slim Fit"
  - Assert "Fjallraven Backpack" is NOT visible
- **Expected Result**: Products filtered by case-insensitive substring match on title

### 3. When user filters by min price only, then only products above minimum are displayed

- **Priority**: HIGH
- **Type**: Price filtering test
- **Simulation**:
  - Mock API with products at various prices:
    - "Product A" ($10.00)
    - "Product B" ($50.00)
    - "Product C" ($100.00)
  - Open filters popover
  - Enter "50" in min price input
  - Assert 2 products displayed: "Product B" ($50) and "Product C" ($100)
  - Assert "Product A" ($10) is NOT visible
- **Expected Result**: Only products with price >= min price are shown

### 4. When user filters by max price only, then only products below maximum are displayed

- **Priority**: HIGH
- **Type**: Price filtering test
- **Simulation**:
  - Mock API with products:
    - "Product A" ($10.00)
    - "Product B" ($50.00)
    - "Product C" ($100.00)
  - Open filters popover
  - Enter "50" in max price input
  - Assert 2 products displayed: "Product A" ($10) and "Product B" ($50)
  - Assert "Product C" ($100) is NOT visible
- **Expected Result**: Only products with price <= max price are shown

### 5. When user filters by price range (min and max), then only products within range are displayed

- **Priority**: HIGH
- **Type**: Combined price filtering test
- **Simulation**:
  - Mock API with products:
    - "Product A" ($10.00)
    - "Product B" ($50.00)
    - "Product C" ($75.00)
    - "Product D" ($100.00)
  - Open filters popover
  - Enter "50" in min price input
  - Enter "75" in max price input
  - Assert 2 products displayed: "Product B" ($50) and "Product C" ($75)
  - Assert "Product A" and "Product D" are NOT visible
- **Expected Result**: Only products with price between min and max (inclusive) are shown

### 6. When user combines name and price filters, then only products matching all criteria are displayed

- **Priority**: HIGH
- **Type**: Multi-filter logic test
- **Simulation**:
  - Mock API with products:
    - "Mens Cotton Jacket" ($55.99)
    - "Mens Casual Slim Fit" ($15.99)
    - "Fjallraven Backpack" ($109.95)
  - Open filters popover
  - Type "mens" in name search
  - Enter "20" in min price input
  - Assert only 1 product displayed: "Mens Cotton Jacket" ($55.99)
  - Assert "Mens Casual Slim Fit" ($15.99) is NOT visible (below min price)
  - Assert "Fjallraven Backpack" is NOT visible (doesn't match name)
- **Expected Result**: Filters use AND logic - product must match all active filters

### 7. When filters result in no matching products, then empty state is displayed

- **Priority**: MEDIUM
- **Type**: Edge case - empty results test
- **Simulation**:
  - Mock API with products all under $100
  - Open filters popover
  - Enter "500" in min price input (no products above $500)
  - Assert `EmptyStateResult` component is displayed
  - Assert no product cards are visible
  - Verify empty state message is user-friendly
- **Expected Result**: Graceful empty state when filters exclude all products

### 8. When user clicks reset button, then all filters are cleared and all products are displayed

- **Priority**: HIGH
- **Type**: Filter reset functionality test
- **Simulation**:
  - Mock API with 5 diverse products
  - Open filters popover
  - Apply multiple filters:
    - Name: "mens"
    - Min price: "20"
  - Verify filtered results (e.g., 1 product)
  - Click "Reset" button
  - Assert all 5 original products are displayed again
  - Assert filter inputs are cleared:
    - Name input is empty
    - Min price input is empty
    - Max price input is empty
- **Expected Result**: Reset button clears all filters and restores full product list

### 9. When user opens and closes popover without applying filters, then product list remains unchanged

- **Priority**: MEDIUM
- **Type**: UI interaction test
- **Simulation**:
  - Mock API with 5 products
  - Verify all 5 products initially displayed
  - Click "More filters" button to open popover
  - Verify popover is visible
  - Click outside popover or ESC key to close it
  - Assert all 5 products still displayed (unchanged)
  - Assert no filters were applied
- **Expected Result**: Opening/closing popover without interaction doesn't affect product list

### 10. When user types in name filter, then filtering happens in real-time (debounced)

- **Priority**: MEDIUM
- **Type**: User experience test
- **Simulation**:
  - Mock API with products including "Mens Jacket" and "Fjallraven Backpack"
  - Open filters popover
  - Type "me" in name input
  - Use `waitFor` with reasonable timeout (300-500ms debounce)
  - Assert only "Mens Jacket" is visible
  - Continue typing "ns" (full: "mens")
  - Assert still showing "Mens Jacket"
- **Expected Result**: Filtering updates reactively as user types (with appropriate debounce)

### 11. When invalid price range is entered (min > max), then user receives helpful feedback

- **Priority**: LOW
- **Type**: Input validation test
- **Simulation**:
  - Mock API with products
  - Open filters popover
  - Enter "100" in min price input
  - Enter "50" in max price input (invalid: min > max)
  - Assert either:
    - Error message displayed ("Min price cannot exceed max price")
    - OR max price is auto-adjusted/ignored
    - OR no products shown with clear indication why
- **Expected Result**: Invalid price range is handled gracefully with user feedback

### 12. When user enters negative or zero price values, then validation prevents invalid filtering

- **Priority**: LOW
- **Type**: Edge case - invalid input test
- **Simulation**:
  - Open filters popover
  - Attempt to enter "-10" in min price input
  - Assert input validation prevents negative values OR
  - Assert filter ignores negative values gracefully
  - Attempt to enter "0" in price inputs
  - Verify behavior is sensible (either accepts 0 or validates minimum value)
- **Expected Result**: Price inputs have sensible validation (typically min=0, positive numbers only)

## Implementation Recommendations

### Test File Organization

```
src/features/products/
  presentation/
    ProductFilters/
      ProductFilters.tsx (NEW)
      ProductFilters.test.tsx (NEW)
      ProductFiltersPopover.tsx (optional: separate popover component)
  application/
    useProductFilters.ts (NEW - filter logic hook)
    useProductFilters.test.ts (NEW - pure logic tests)
```

### Testing Strategy

1. **Unit Tests** (Test cases 2-8, 11-12):

   - Test `useProductFilters` hook in isolation
   - Verify filtering logic without rendering components
   - Test edge cases and validation

2. **Integration Tests** (Test cases 1, 9-10):

   - Test full `ProductsPage` with filters
   - Mock API responses via MSW
   - Verify component interactions and UI updates

3. **Component Tests** (Test case 1):
   - Test `ProductFilters` component rendering
   - Verify accessibility of form inputs
   - Test Popover open/close behavior

### Test Data Fixtures

Create reusable test fixtures in `test-lib/fixtures/`:

```typescript
// test-lib/fixtures/products.ts
export const createTestProduct = (
  overrides?: Partial<ProductDto>
): ProductDto => ({
  id: 1,
  title: "Test Product",
  description: "Test description",
  category: Category.Men_clothing,
  price: 50.0,
  image: "https://example.com/image.jpg",
  rating: { rate: 4.0, count: 100 },
  ...overrides,
});

export const productsForFilterTesting = [
  createTestProduct({ id: 1, title: "Mens Cotton Jacket", price: 55.99 }),
  createTestProduct({ id: 2, title: "Mens Casual Slim Fit", price: 15.99 }),
  createTestProduct({ id: 3, title: "Fjallraven Backpack", price: 109.95 }),
  // ... more test products
];
```

### MSW Handlers

Extend existing MSW handlers to support filter testing:

```typescript
// test-lib/handlers/products.ts
http.get('https://fakestoreapi.com/products', () => {
  return HttpResponse.json(productsForFilterTesting);
}),
```

### Accessibility Testing

Ensure all test cases verify:

- Proper ARIA labels on filter inputs
- Keyboard navigation (Tab, Enter, Escape)
- Screen reader announcements for filter results count
- Focus management when opening/closing popover

## Success Criteria

1. All 12 test cases pass consistently
2. Code coverage for filter functionality > 90%
3. Tests use proper testing best practices:
   - Arrange-Act-Assert structure
   - No implementation details tested (use user-facing queries)
   - Proper async handling with `waitFor`
   - Meaningful assertion messages
4. Tests are maintainable and readable
5. Feature works correctly in manual testing alongside automated tests

## Notes

- **Current blocker**: Existing test failures must be fixed before adding new tests
- **Feature status**: Not implemented - tests will be written for the new feature
- **Client-side filtering**: All filtering logic happens in browser, no API calls for filtering
- **Performance consideration**: Filter large product lists efficiently (consider useMemo)
- **Accessibility**: Ensure filter inputs are properly labeled and keyboard-accessible
