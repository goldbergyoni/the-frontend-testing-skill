# Product Filters Feature Implementation Plan

## Overview
Implement the "More filters" functionality on the Products page to allow local filtering by product name and price range.

## Current State
- Products page (`src/pages/Products/index.tsx`) has a "More filters" button that currently shows a "not implemented" toast
- Products are fetched via `useProductsQuery` and displayed via `ProductsList` component
- Products have `title` (string) and `price` (number) fields

## Proposed Solution

### MVP Approach
Use a **Popover** component (simpler than Drawer/Modal) that opens when clicking "More filters" button. The popover contains:
- Text input for filtering by product name (searches in title)
- Two number inputs for min/max price range
- Reset filters button

### Architecture

**Location**: `src/features/products/presentation/ProductFilters/`

This follows the feature slice architecture pattern used in the codebase.

### Implementation Tasks

#### Task 1: Create Filter Types
Create `src/features/products/types/IProductFilters.ts`:
```typescript
export interface IProductFilters {
  name: string;
  minPrice: number | undefined;
  maxPrice: number | undefined;
}
```

#### Task 2: Create Filter Hook
Create `src/features/products/application/use-product-filters.ts`:
- Custom hook that manages filter state
- Provides filter values and setters
- Provides a `filterProducts` function that takes products array and returns filtered array
- Provides a `resetFilters` function
- Provides `hasActiveFilters` boolean for UI feedback

#### Task 3: Create ProductFiltersPopover Component
Create `src/features/products/presentation/ProductFilters/ProductFiltersPopover.tsx`:
- Uses Chakra UI `Popover` component
- Contains filter inputs:
  - FormControl with Input for name search
  - FormControl with NumberInput for min price
  - FormControl with NumberInput for max price
- Reset button that clears all filters

#### Task 4: Update Products Page
Modify `src/pages/Products/index.tsx`:
- Import and use `useProductFilters` hook
- Replace "not implemented" button with `ProductFiltersPopover`
- Apply filtering to products before passing to `ProductsList`
- Filter is applied locally (client-side) on the already-fetched products

#### Task 5: Add i18n Translations
Update `public/locales/en-GB/translation.json`:
```json
{
  "pages": {
    "products": {
      "filters": {
        "name": "Product name",
        "name-placeholder": "Search by name...",
        "min-price": "Min price",
        "max-price": "Max price",
        "reset": "Reset filters"
      }
    }
  }
}
```

### Files to Create/Modify

| File | Action | Description |
|------|--------|-------------|
| `src/features/products/types/IProductFilters.ts` | Create | Filter interface |
| `src/features/products/application/use-product-filters.ts` | Create | Filter logic hook |
| `src/features/products/presentation/ProductFilters/ProductFiltersPopover.tsx` | Create | Filter UI component |
| `src/pages/Products/index.tsx` | Modify | Integrate filters |
| `public/locales/en-GB/translation.json` | Modify | Add translations |
| `src/test-lib/browser-setup.ts` | Modify | Add test translations |

### Filtering Logic
```typescript
function filterProducts(products: IProduct[], filters: IProductFilters): IProduct[] {
  return products.filter(product => {
    const matchesName = !filters.name ||
      product.title.toLowerCase().includes(filters.name.toLowerCase());

    const matchesMinPrice = filters.minPrice === undefined ||
      product.price >= filters.minPrice;

    const matchesMaxPrice = filters.maxPrice === undefined ||
      product.price <= filters.maxPrice;

    return matchesName && matchesMinPrice && matchesMaxPrice;
  });
}
```

### User Experience
1. User clicks "More filters" button
2. Popover opens with filter inputs
3. User enters filter criteria (any combination)
4. Products list updates immediately (no submit button needed)
5. User can click "Reset filters" to clear all filters
6. Popover closes when clicking outside

---

## Integrated Workflow (Testing + Implementation)

> **⚠️ MANDATORY: DO NOT SKIP STEPS**
>
> This workflow follows the test-first approach defined in `.claude/skills/testing/test-workflow.md`.
> Each step MUST be completed in order. Testing tasks are NOT optional - they are integral
> to the implementation process.

Testing and implementation tasks co-exist as one continuous flow:

### Task List (Execute in Order):

| # | Task | Type | Blocking |
|---|------|------|----------|
| **1** | **Create test plan** | `test-planner` agent | ✅ Must complete before coding |
| 2 | Create filter types (`IProductFilters`) | Code | |
| 3 | Create filter hook (`use-product-filters.ts`) | Code | |
| 4 | Create ProductFiltersPopover component | Code | |
| 5 | Update Products page to use filters | Code | |
| 6 | Add i18n translations | Code | |
| **7** | **Analyze page elements and accessibility** | `page-analyzer` agent | ✅ Must complete after implementation |
| **8** | **Verify tests pass** | `test-verifier` agent | ✅ Must complete before done |

### Step 1 Details: Test Planning (REQUIRED FIRST)
Before writing any code, use the `test-planner` agent to:
- Navigate to the Products page
- Analyze the current UI structure
- Document test scenarios for the filter feature
- Create a test plan file

### Expected Test Scenarios:
- Filtering by name only
- Filtering by price range (min, max, both)
- Combining name and price filters
- Reset filters functionality
- Empty state when no products match filters

---

## Approval Request
Please review this plan. Once approved, I will execute the integrated workflow above **starting with Task 1 (test planning)**.

---

## Implementation Log

### Completed: 2025-12-25

#### Task 1: Test Plan ✅
- Created test plan at `test/context/product-filters-20251225-01/test-plan.md`
- 12 test cases documented with priorities
- Page analysis included

#### Task 2: Filter Types ✅
- Created `src/features/products/types/IProductFilters.ts`

#### Task 3: Filter Hook ✅
- Created `src/features/products/application/use-product-filters.ts`
- Provides: filters state, setters, resetFilters, hasActiveFilters, filterProducts

#### Task 4: ProductFiltersPopover ✅
- Created `src/features/products/presentation/ProductFiltersPopover.tsx`
- Chakra UI Popover with name input, min/max price inputs, reset button

#### Task 5: Products Page Integration ✅
- Updated `src/pages/Products/index.tsx`
- Replaced "not implemented" toast with working filter popover
- Filters applied client-side before rendering

#### Task 6: i18n Translations ✅
- Added `pages.products.filters.*` translations

#### Task 7: Page Analysis ✅
- Analysis included in test-planner output

#### Task 8: Test Verification ✅
- All 77 unit tests pass
- No regressions introduced
