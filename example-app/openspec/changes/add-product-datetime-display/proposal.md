# Change: Add Current DateTime Display to All Product Views

## Why

Users want to see the current date and time when viewing products so they are aware of when they are browsing. This provides temporal context for the shopping experience.

## What Changes

- Add a static datetime text display to all product-related components across the application
- Display format: Full datetime (e.g., "Dec 23, 2025 at 2:30 PM")
- Position: Below the product price in each component
- Datetime is captured when the component renders (static snapshot, not live-updating)

## Impact

- Affected components:
  - `ProductCard` (product list grid)
  - `ProductDetails` (single product page)
  - `CartItem` (cart page)
  - `WishlistItem` (wishlist page)
- Affected code: `src/features/products/presentation/`, `src/features/carts/presentation/`, `src/features/wishlist/presentation/`
- No API changes required
- No breaking changes
