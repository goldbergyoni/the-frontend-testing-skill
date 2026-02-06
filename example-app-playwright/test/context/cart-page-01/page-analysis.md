# Page Analysis: Cart Page

## Page Info
- **URL**: `/cart/:cartId`
- **Component**: `src/pages/Cart/index.tsx`
- **Auth Required**: Yes (withRequireAuth HOC)

## Key Elements (ARIA)

| Element | Role | Name/Label | Purpose |
|---------|------|------------|---------|
| Search Input | `textbox` | "Search cart products" | Filter products by title |
| Product Card | `region` | `{product.title}` | Display individual cart item |
| Clear Cart Button | `button` | "Clear cart" | Remove all items |
| Sale Icon | `img` | "On sale" | Indicates product is on sale |

## API Calls

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/carts/:cartId` | GET | Fetch cart data with product IDs |
| `/products/:id` | GET | Fetch individual product details |
| `/users/:userId` | GET | Fetch user info for auth |

## State Management
- `searchFilter` - Local state for search input
- `debouncedSearchFilter` - Debounced (300ms) version for filtering
- `useCartProductsQuery` - React Query for cart data

## User Flows

### View Cart
1. User navigates to `/cart/1`
2. App fetches cart data from API
3. App fetches each product's details
4. Products displayed in CartsList

### Search Products
1. User types in search input
2. After 300ms debounce, filter applied
3. Only matching products displayed

### Clear Cart
1. User clicks "Clear cart" button
2. Confirmation dialog appears
3. On confirm, cart is cleared

## Locator Strategy
- Use `getByRole("region", { name: productTitle })` for product cards
- Use `getByRole("textbox", { name: "Search cart products" })` for search
- Use `getByRole("button", { name: "Clear cart" })` for clear button
- Use `getByRole("img", { name: "On sale" })` for sale indicator
