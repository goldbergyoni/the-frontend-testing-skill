# Pages

## Responsibility

Route-level page components that compose feature components into complete user-facing screens. Each page corresponds to a route defined in `router.tsx` and may include a loader for data prefetching.

## Pages Overview

### Home (`/`)

- **Route**: `/`
- **Component**: HomePage
- **Loader**: homePageLoader
- **Description**: Landing page with marketing sections (hero, features, pricing) and product count
- **Key Features**: Displays HeroSection, FeatureSection, PricingSection from marketing feature

### Sign In (`/sign-in`)

- **Route**: `/sign-in`
- **Component**: SignInPage
- **Auth**: Protected with `withRequirePub` - redirects authenticated users to `/products`
- **Description**: User authentication page
- **Key Features**: SignInForm with pre-filled demo credentials

### Products (`/products`)

- **Route**: `/products`
- **Component**: ProductsPage
- **Loader**: productsPageLoader
- **Description**: Product catalog with infinite scroll loading
- **Key Features**: ProductsList, filters button (not implemented), load more functionality with pagination

### Product (`/products/:productId`)

- **Route**: `/products/:productId`
- **Component**: ProductPage
- **Loader**: productPageLoader
- **Description**: Individual product detail view
- **Key Features**: ProductDetails, back navigation, custom error boundary for 404 handling

### Cart (`/cart/:cartId`)

- **Route**: `/cart/:cartId`
- **Component**: CartPage
- **Loader**: cartPageLoader
- **Auth**: Protected with `withRequireAuth` - redirects to `/sign-in` if unauthenticated
- **Description**: Shopping cart view with items and checkout
- **Key Features**: CartsList, ClearCartButton, displays cart modification time

## Key Patterns

- **Lazy loading** - All pages use lazy imports via `router.lazy()` for code splitting
- **Data prefetching** - Loaders fetch data before component renders (defined in separate `loader.ts` files)
- **Error boundaries** - Each page exports ErrorBoundary for graceful error handling
- **Auth guards** - `withRequireAuth` and `withRequirePub` HOCs protect routes based on authentication state
- **Component composition** - Pages assemble feature components without business logic
- **Routing config** - All routes centrally defined in `router.tsx` with strongly-typed paths from `lib/router/routes.ts`
