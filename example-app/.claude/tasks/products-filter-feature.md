# Products Filter Feature

## Overview

Add a "Filters" button to the Products page that opens a popover with local (client-side) filtering options: product name, price range, and reset functionality.

## Requirements

- Button labeled "Filters" in the upper part of the Products page (in PageHeader)
- Popover opens on click with:
  - Product name text input
  - Price range inputs (min/max)
  - Reset filters button
  - Submit/Apply button
- Filtering happens locally (no backend calls)
- Products list updates when filters are applied

## Architecture Decisions

### Component Location

Following feature slice architecture:

- **ProductsFilter** component → `src/features/products/presentation/ProductsFilter.tsx`
- Filter logic (hook) → `src/features/products/application/use-products-filter.ts`

### Why This Structure

1. Filter is product-specific UI → belongs in `features/products/presentation`
2. Filter logic is reusable business logic → belongs in `features/products/application`
3. The page (`src/pages/Products/index.tsx`) will compose these together

### State Management

- Local React state for filter values (name, minPrice, maxPrice)
- The filtering logic will be in a custom hook that:
  - Takes the products array and filter state
  - Returns filtered products
- Popover state managed by Chakra UI

## Implementation Plan

Following the testing workflow from `.claude/skills/testing/test-workflow.md`:

### Task 1: Create test plan (invoke test-planner agent)

- Invoke `test-planner` agent to create test context folder and `test-plan.md`
- Defines "done" criteria before implementation begins

### Task 2: Create filter types and hook

Create `src/features/products/application/use-products-filter.ts`:

- Define `IProductFilters` interface (name, minPrice, maxPrice)
- Create `useProductsFilter` hook that:
  - Accepts products array
  - Returns filtered products, filter state, setters, and reset function
  - Handles empty/partial filters gracefully

### Task 3: Create ProductsFilter component

Create `src/features/products/presentation/ProductsFilter.tsx`:

- Use Chakra UI Popover, Button, Input, NumberInput components
- "Filters" button as trigger
- Popover content with:
  - Text input for product name (searches in title)
  - Two number inputs for price range (min/max)
  - Reset button
  - Apply/Submit button
- Props: filters state and handlers from hook

### Task 4: Integrate filter into Products page

Update `src/pages/Products/index.tsx`:

- Add useProductsFilter hook
- Pass filtered products to ProductsList
- Add ProductsFilter component to PageHeader children

### Task 5: Add translations

Update `public/locales/en-GB/translation.json`:

- Add filter-related translations under `pages.products.filters`

### Task 6: Run page-analyzer agent

- Page skeleton now exists with filter UI
- Creates `page-analysis.md` with elements, network calls, ARIA analysis

### Task 7: Write and verify tests (invoke test-verifier agent)

- Write tests based on `test-plan.md` and `page-analysis.md`
- Invoke `test-verifier` agent to validate test quality

## Files to Create/Modify

| File                                                       | Action |
| ---------------------------------------------------------- | ------ |
| `src/features/products/application/use-products-filter.ts` | Create |
| `src/features/products/presentation/ProductsFilter.tsx`    | Create |
| `src/pages/Products/index.tsx`                             | Modify |
| `public/locales/en-GB/translation.json`                    | Modify |

---

## Implementation Status

- [x] Task 1: Create test plan (test-planner agent)
- [x] Task 2: Create filter hook
- [x] Task 3: Create ProductsFilter component
- [x] Task 4: Integrate into Products page
- [x] Task 5: Add translations
- [x] Task 6: Run page-analyzer agent
- [x] Task 7: Write and verify tests (test-verifier agent)

## Completion Notes

**Tests Created**: 6 browser tests in `src/pages/Products/Products-filter.browser.test.tsx`

- Filter by name (case-insensitive)
- Filter by minimum price
- Filter by price range (min + max)
- Combined name + price filters
- Reset filters functionality
- Empty state when no products match

**All tests pass consistently (verified 5 runs)**
