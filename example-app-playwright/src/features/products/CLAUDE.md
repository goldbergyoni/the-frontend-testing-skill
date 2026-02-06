# Products Feature

## Responsibility

Handles product catalog display, product details, ratings, and category management. Provides product browsing experience with filtering and navigation.

## Key Components

### Presentation Layer

- **ProductCard** - Compact product display for lists with image, title, price, and rating
- **ProductsList** - Grid layout displaying multiple ProductCard components
- **ProductDetails** - Full product information view with detailed description and specifications
- **ProductNotFoundResult** - Error state when product is not available
- **StarRating** - Visual star rating component for product ratings
- **useCategoryLabel** - Hook for translating product category to localized label

### Infrastructure Layer

- **productQuery** - Query hook for fetching single product by ID
- **productsQuery** - Query hook for fetching product list with optional filters

### Types

- **IProduct** - Product entity with details, pricing, and rating
- **IRating** - Product rating with rate and count
- **Category** - Enum of product categories

## Key Patterns

- **React Query integration** - All data fetching via centralized query hooks from `src/lib/api/products/`
- **i18n categories** - Product categories translated via useCategoryLabel hook
- **Component composition** - ProductCard used within ProductsList for consistent display
- **Error boundaries** - ProductNotFoundResult for graceful error handling
