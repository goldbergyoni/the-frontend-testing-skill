## 1. Create Shared DateTime Display Component

- [ ] 1.1 Create `ProductViewedAt` component in `src/lib/components/` that:
  - Captures current datetime on mount using `useMemo` with empty deps
  - Formats datetime using Intl.DateTimeFormat for localization
  - Displays styled text matching the design system
- [ ] 1.2 Write tests for `ProductViewedAt`:
  - Test: displays formatted datetime
  - Test: datetime is static (same value on re-render)
- [ ] 1.3 Verify tests pass for the new component

## 2. Add DateTime to ProductCard

- [ ] 2.1 Import and add `ProductViewedAt` component below price in `ProductCard.tsx`
- [ ] 2.2 Write tests for ProductCard datetime display:
  - Test: when viewing product card, then datetime is displayed below price
- [ ] 2.3 Verify tests pass

## 3. Add DateTime to ProductDetails

- [ ] 3.1 Import and add `ProductViewedAt` component below price in `ProductDetails.tsx`
- [ ] 3.2 Write tests for ProductDetails datetime display:
  - Test: when viewing product details, then datetime is displayed below price
- [ ] 3.3 Verify tests pass

## 4. Add DateTime to CartItem

- [ ] 4.1 Import and add `ProductViewedAt` component below price in `CartItem.tsx`
- [ ] 4.2 Write tests for CartItem datetime display:
  - Test: when viewing cart item, then datetime is displayed below price
- [ ] 4.3 Verify tests pass

## 5. Add DateTime to WishlistItem

- [ ] 5.1 Import and add `ProductViewedAt` component below price in `WishlistItem.tsx`
- [ ] 5.2 Write tests for WishlistItem datetime display:
  - Test: when viewing wishlist item, then datetime is displayed below price
- [ ] 5.3 Verify tests pass

## 6. Final Verification

- [ ] 6.1 Run full test suite to ensure no regressions
- [ ] 6.2 Manual visual verification across all screens
- [ ] 6.3 Verify datetime format is consistent across all components
