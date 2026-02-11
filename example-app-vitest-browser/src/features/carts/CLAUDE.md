# Carts Feature

## Responsibility

Manages shopping cart functionality including adding products, viewing cart contents, clearing cart, and checkout/purchase flow.

## Key Components

### Presentation Layer

- **AddToCartButton** - Button component with product added dialog and notifications
- **CartsList** - Displays list of products in cart with CartItem components
- **CartItem** - Individual cart item showing product details and quantity
- **CheckoutButton** - Initiates checkout flow with checkout dialog
- **CheckoutForm** - Form for completing purchase with shipping details
- **ClearCartButton** - Clears all items from cart with confirmation dialog

### Infrastructure Layer

- **useAddToCart** - Mutation hook for adding products to cart
- **useCartProductsQuery** - Query hook for fetching cart products
- **useClearCart** - Mutation hook for clearing cart
- **usePurchase** - Mutation hook for completing purchase

### Types

- **ICart** - Cart entity with user and product references
- **ICartProduct** - Product representation within cart context

## Key Patterns

- **Dialog-based workflows** - Uses Zustand stores for dialog state management (useProductAddedDialogStore, usePurchaseDialogStore, useConfirmClearCartDialogStore)
- **Notification hooks** - Separate hooks handle success/failure notifications (useAddToCartNotifications, useClearCartNotifications, useCheckoutNotifications)
- **Auth integration** - Components check authentication state via useAuthStore before operations
- **API centralization** - All API calls delegated to `src/lib/api/carts/` endpoints
