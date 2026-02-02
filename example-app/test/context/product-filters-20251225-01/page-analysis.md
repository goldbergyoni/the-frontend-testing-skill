# Product Filters Feature - Page Analysis

## Executive Summary

**Testability Assessment**: HIGH - The Product Filters feature is ready to be tested, though it is currently not implemented (shows "Feature not available yet" toast). The page is well-structured, the API provides all product data including name, price, and category, and client-side filtering logic can be easily tested. No blockers exist for test implementation.

**Current State**: The "More filters" button exists on the Products page but only triggers a toast notification. The actual filtering functionality (Popover with inputs) needs to be implemented as described in the requirements.

## Navigation

**Route**: `/products`

**Prerequisites**:

- User must be authenticated (sign in at `/sign-in`)
- Development server running on `http://localhost:5173`

**Navigation Steps**:

1. Start at home page (`/`)
2. Click "Our Products" in navigation OR
3. Navigate directly to `http://localhost:5173/products`

## Snapshot

![Product Filters Page](./screenshot.png)

## Key Elements

| Element                   | Has ARIA | Selector Example                                      | Notes                                                  |
| ------------------------- | -------- | ----------------------------------------------------- | ------------------------------------------------------ |
| More filters button       | ✅       | `getByRole('button', { name: 'More filters' })`       | Currently triggers toast, needs Popover implementation |
| Products list grid        | ❌       | Generic `<div>` wrapper                               | Could benefit from semantic `<section>` or role        |
| Individual product cards  | ❌       | No semantic structure                                 | Each product is in generic divs                        |
| Product name/title        | ❌       | Paragraph elements with cursor:pointer                | Could use `<h3>` or proper link role                   |
| Add to cart buttons       | ✅       | `getByRole('button', { name: 'Add to cart' })`        | Multiple instances, need context for targeting         |
| Show more products button | ✅       | `getByRole('button', { name: 'Show more products' })` | Properly labeled                                       |

**Accessibility Concerns**:

- Product cards lack semantic structure (should be article or have proper landmarks)
- Product titles are paragraphs instead of headings or links
- No ARIA labels distinguish multiple "Add to cart" buttons

## Console Errors

None - Application loads cleanly with expected i18next initialization logs.

## Aria Snapshot

```yaml
- generic [active]:
    - main:
        - generic: # Header section
            - generic: # Navigation
                - link "Logo"
                - link "Our Products"
                - link "Cart"
            - generic: # User actions
                - button "Logout"
                - button "Switch mode"
        - generic: # Page content
            - generic: # Page header
                - heading "Products list" [level=2]
                - paragraph: "Explore what we have in the store for you."
                - group:
                    - button "More filters" # TARGET ELEMENT FOR FEATURE
            - generic: # Products grid
                - generic [multiple product cards]:
                    - paragraph: Product title
                    - paragraph: Price (e.g., "US$109.95")
                    - paragraph: Category
                    - button "Add to cart"
            - button "Show more products"
```

## Implementation

### Files

**Page Level**:

- `/src/pages/Products/index.tsx` - Main Products page component (57 lines)

**Feature Level (products)**:

- `/src/features/products/presentation/ProductsList.tsx` - Products grid component
- `/src/features/products/presentation/ProductCard.tsx` - Individual product card
- `/src/lib/api/products/products-list/products-list-query.ts` - Products API query

**Feature Level (to be created for filters)**:

- `/src/features/products/presentation/ProductFilters.tsx` - Filters Popover component (NEW)
- `/src/features/products/application/useProductFilters.ts` - Filter logic hook (NEW)

### Summary

**Current Logic**:

1. Products page uses `useProductsQuery` hook to fetch products from FakeStore API
2. Products are displayed in a grid using `ProductsList` component
3. Pagination is handled via "Show more" button that increases `limit` parameter
4. Products fetched: title, description, category, price, rating, image
5. Filtering currently not implemented - button shows "not implemented" toast

**Data Structure**:

```typescript
interface ProductDto {
  id: number;
  title: string;
  description: string;
  category: Category; // enum: men's clothing, women's clothing, jewelery, electronics
  image: string;
  price: number;
  rating: { rate: number; count: number };
}
```

**Required Implementation** (based on feature description):

1. Create Popover component with:
   - Text input for name search
   - Number input for min price
   - Number input for max price
   - Reset button
2. Implement client-side filtering logic that:
   - Filters by name (case-insensitive substring match)
   - Filters by min/max price range
   - Combines filters (AND logic)
   - Shows empty state when no matches

## Network

**Key Requests**:

- `GET https://fakestoreapi.com/products?limit=10&sort=asc` - Fetches initial products
- `GET https://fakestoreapi.com/users/1` - Fetches authenticated user info
- `GET http://localhost:5173/locales/en-GB/translation.json` - i18n translations

**API Response Example**:

```json
[
  {
    "id": 1,
    "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    "price": 109.95,
    "category": "men's clothing",
    "description": "...",
    "image": "...",
    "rating": { "rate": 3.9, "count": 120 }
  }
]
```

**HAR file**: Not generated (feature analysis focused on current state)

## Test Data Requirements

For comprehensive testing, the following product variations are needed:

1. **Price Range**:

   - Low price (< $20): "Mens Casual Slim Fit" - $15.99
   - Mid price ($20-$100): "Mens Casual Premium Slim Fit T-Shirts" - $22.30
   - High price (> $100): "Fjallraven Backpack" - $109.95
   - Very high price: "John Hardy Women's Bracelet" - $695.00

2. **Product Names**:

   - Short names: "Mens Cotton Jacket"
   - Long names: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops"
   - Common words: "Mens", "Cotton", "Gold"
   - Special characters possible

3. **Categories**:
   - Men's clothing
   - Women's clothing
   - Jewelery
   - Electronics

## Working Folder

`/Users/goldbergyoni/solutions/frontend-testing-setup/example-app/test/context/product-filters-20251225-01`
