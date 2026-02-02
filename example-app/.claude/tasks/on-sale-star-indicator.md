# On Sale Star Indicator Feature

## Summary

Add an `onSale` property to the product entity and display a star indicator next to the product title in the cart when a product is on sale.

## Implementation Plan

### 1. Extend ProductDto with new properties

**File**: `src/lib/api/products/{product-id}/product-dto.ts`

- Add `onSale: boolean` property
- Add 7 more reasonable properties for larger JSON payload:
  - `sku: string` - Stock Keeping Unit
  - `brand: string` - Product brand name
  - `weight: number` - Product weight in kg
  - `dimensions: { width: number; height: number; depth: number }` - Product dimensions
  - `manufacturer: string` - Manufacturer name
  - `warrantyMonths: number` - Warranty duration
  - `stockCount: number` - Available stock count

### 2. Update ProductFixture

**File**: `src/test-lib/fixtures/ProductFixture.ts`

- Add default values for all new properties including `onSale: false`

### 3. Update cart-products-query mapping

**File**: `src/lib/api/carts/{cart-id}/cart-products-query.ts`

- Add mapping logic to set `onSale` based on some criteria (e.g., price-based or random)
- Since API doesn't return `onSale`, we'll compute it during mapping

### 4. Update CartItem component

**File**: `src/features/carts/presentation/CartItem.tsx`

- Add `onSale` prop to IProps interface
- Display a star (⭐) next to the title when `onSale` is true

### 5. Write browser test

**File**: `src/pages/Cart/Cart.browser.test.tsx`

- Create test: "When a product is on sale, then a star is shown next to the title"
- Build one product with `onSale: true`
- Build another product with `onSale: false`
- Verify star is visible for on-sale product
- Verify star is not visible for not-on-sale product

## Status

- [x] Extend ProductDto
- [x] Update ProductFixture
- [x] Update cart-products-query mapping
- [x] Update CartItem component
- [x] Write browser test

## Completed Changes

### Files Modified:

1. `src/lib/api/products/{product-id}/product-dto.ts` - Added `onSale`, `sku`, `brand`, `weight`, `dimensions`, `manufacturer`, `warrantyMonths`, `stockCount` properties
2. `src/test-lib/fixtures/ProductFixture.ts` - Added default values for all new properties
3. `src/lib/api/carts/{cart-id}/cart-products-query.ts` - Added mapping logic for `onSale` (defaults to price < 50 if not provided)
4. `src/features/carts/presentation/CartItem.tsx` - Added star (⭐) display next to title when `onSale` is true
5. `src/pages/Cart/index.tsx` - Added `onSale` to the cart products mapping
6. `src/pages/Cart/Cart.browser.test.tsx` - Added test for on-sale star indicator
