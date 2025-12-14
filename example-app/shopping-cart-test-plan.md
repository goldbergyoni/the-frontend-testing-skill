# Shopping Cart - Comprehensive Test Plan

## Application Overview

The Shopping Cart page is a React-based authenticated e-commerce cart management interface that allows users to view, modify, and purchase selected products. The page is located at `/cart/:cartId` and requires authentication to access.

### Key Features

- **Cart Product Display**: Shows all items added to cart with product details (image, title, category, price, quantity, stock status)
- **Cart Item Management**: Individual product actions via context menu (remove from cart, add to wishlist, visit product page)
- **Cart Summary**: Real-time subtotal calculation, shipping information, and last modification timestamp
- **Clear Cart**: Bulk removal of all cart items with confirmation dialog
- **Checkout Flow**: Multi-step checkout process with shipping and payment details form
- **Navigation**: Continue shopping link and product detail navigation
- **Persistence**: Cart state maintained across sessions via API
- **Internationalization**: Multi-language support with localized text

### Technology Stack

- **Frontend**: React 19 with TypeScript, Chakra UI components
- **State Management**: React Query for server state, Zustand for dialog states
- **API Layer**: RESTful endpoints with centralized HTTP service
- **Testing**: Vitest for unit tests, Storybook for component testing
- **Mocking**: MSW (Mock Service Worker) for API mocking

### API Endpoints

- `GET /carts/:cartId` - Fetch cart details
- `GET /products/:productId` - Fetch product details for cart items
- `DELETE /carts/:cartId` - Clear entire cart
- `DELETE /carts/:cartId/products/:productId` - Remove single product from cart
- `PUT /carts/:cartId` - Update cart (add items)

---

## Test Scenarios

### 1. Page Access and Authentication

#### 1.1 Authenticated User Access

**Prerequisites:**

- User is logged in with valid credentials
- Cart with ID exists in the system

**Steps:**

1. Navigate to `/cart/1` (or any valid cart ID)
2. Verify page loads successfully

**Expected Results:**

- Page loads without errors
- Page header displays "List of selected products"
- Cart modification time is shown in description (e.g., "updated 2 minutes ago")
- If cart has items, CartsList component is visible
- Clear Cart button is visible in page header
- Checkout button is visible at bottom of cart list

#### 1.2 Unauthenticated User Access

**Prerequisites:**

- User is not logged in
- No authentication token in localStorage

**Steps:**

1. Navigate to `/cart/1`
2. Observe behavior

**Expected Results:**

- User is automatically redirected to `/sign-in` page
- Sign-in form is displayed
- After successful sign-in, user is redirected back to cart page

#### 1.3 Access Non-Existent Cart

**Prerequisites:**

- User is logged in
- Cart ID does not exist (e.g., `/cart/99999`)

**Steps:**

1. Navigate to `/cart/99999`
2. Observe error handling

**Expected Results:**

- Error boundary catches the error
- Appropriate error message is displayed
- Option to navigate back is provided

---

### 2. Cart Product Display

#### 2.1 Display Single Product in Cart

**Prerequisites:**

- User is logged in
- Cart contains one product

**Steps:**

1. Navigate to cart page
2. Verify product details are displayed

**Expected Results:**

- Product image is visible (150px max width, 100px max height)
- Product title is displayed with correct text
- Product category is shown with secondary color
- Product price is formatted correctly with currency symbol
- Quantity is displayed (e.g., "Quantity: 1")
- "In stock" status is shown with green checkmark icon
- Product actions menu button (⋮) is visible

#### 2.2 Display Multiple Products in Cart

**Prerequisites:**

- User is logged in
- Cart contains 3+ products

**Steps:**

1. Navigate to cart page
2. Scroll through product list

**Expected Results:**

- All products are displayed in vertical stack
- Each product is separated by a divider line
- Each product displays all required information (image, title, category, price, quantity, stock status)
- Subtotal reflects sum of all product prices
- Products are displayed in order returned by API

#### 2.3 Display Empty Cart

**Prerequisites:**

- User is logged in
- Cart contains zero products

**Steps:**

1. Navigate to cart page
2. Observe empty state

**Expected Results:**

- Empty cart message or state is shown
- Subtotal shows $0.00
- Checkout button may be disabled or show appropriate message
- "Continue shopping" link is still accessible

---

### 3. Cart Item Interactions

#### 3.1 Remove Product from Cart

**Prerequisites:**

- User is logged in
- Cart contains at least 2 products (e.g., "Wireless Bluetooth Headphones" and "Cotton T-Shirt")

**Steps:**

1. Click on product actions menu button (⋮) for first product
2. Click "Remove" option from dropdown menu
3. Observe changes

**Expected Results:**

- Success toast notification appears: "Removed from cart successfully"
- Product disappears from cart list immediately
- Subtotal is recalculated and updated
- DELETE API call is made to `/carts/:cartId/products/:productId`
- Remaining products stay in cart
- Cart item count is updated

#### 3.2 Add Product to Wishlist from Cart

**Prerequisites:**

- User is logged in
- Cart contains at least one product

**Steps:**

1. Click on product actions menu button (⋮)
2. Click "Add to wishlist" option
3. Observe feedback

**Expected Results:**

- Success toast notification appears: "Added to wishlist successfully"
- Product remains in cart (not removed)
- Product is added to wishlist store
- Can navigate to `/wishlist` to verify product was added

#### 3.3 Visit Product Page from Cart

**Prerequisites:**

- User is logged in
- Cart contains at least one product with ID 1

**Steps:**

1. Click on product actions menu button (⋮)
2. Click "Visit page" option
3. Verify navigation

**Expected Results:**

- User is navigated to `/products/1` (or corresponding product ID)
- Product detail page loads correctly
- Can navigate back to cart using browser back button or navigation links

#### 3.4 Click Product Image to Navigate

**Prerequisites:**

- User is logged in
- Cart contains at least one product

**Steps:**

1. Click on product image thumbnail
2. Verify navigation

**Expected Results:**

- User is navigated to product detail page
- Product details load correctly
- Cart state is maintained (can return to cart with same items)

#### 3.5 Click Product Title to Navigate

**Prerequisites:**

- User is logged in
- Cart contains at least one product

**Steps:**

1. Hover over product title (should show hover state with blue color)
2. Click on product title
3. Verify navigation

**Expected Results:**

- Title changes color to blue on hover
- Cursor changes to pointer on hover
- User is navigated to product detail page
- Product details load correctly

---

### 4. Cart Summary and Calculations

#### 4.1 Verify Subtotal Calculation

**Prerequisites:**

- User is logged in
- Cart contains products with known prices (e.g., $29.99, $49.99, $19.99)

**Steps:**

1. Navigate to cart page
2. Verify subtotal displayed

**Expected Results:**

- Subtotal label reads "Subtotal"
- Subtotal amount equals sum of all product prices
- Amount is formatted with currency symbol (e.g., "$99.97")
- Font is semi-bold, medium-large size

#### 4.2 Verify Shipping Information Display

**Prerequisites:**

- User is logged in
- Cart contains at least one product

**Steps:**

1. Navigate to cart page
2. Locate shipping information text

**Expected Results:**

- Text reads: "Shipping and taxes will be calculated at checkout."
- Text is displayed in small font with secondary color
- Text is positioned below subtotal

#### 4.3 Verify Last Modified Timestamp

**Prerequisites:**

- User is logged in
- Cart was last modified at a known time

**Steps:**

1. Navigate to cart page
2. Check page header description

**Expected Results:**

- Description shows relative time (e.g., "updated 5 minutes ago", "updated 2 hours ago")
- Time format uses i18n relative time formatting
- Updates appropriately as time passes

---

### 5. Clear Cart Functionality

#### 5.1 Clear Cart with Confirmation

**Prerequisites:**

- User is logged in
- Cart contains at least one product

**Steps:**

1. Click "Clear cart" button in page header
2. Verify confirmation dialog appears
3. Read dialog content
4. Click "Yes, clear cart" button
5. Observe results

**Expected Results:**

- Confirmation dialog opens with title "Clear cart"
- Dialog message reads: "Are you sure? You can't undo this action afterwards."
- Dialog shows two buttons: "Cancel" and "Yes, clear cart"
- "Yes, clear cart" button is red/destructive style
- After clicking confirm, DELETE request is sent to `/carts/:cartId`
- Success toast notification: "Your cart has been successfully cleared."
- Cart becomes empty
- Dialog closes automatically
- Subtotal shows $0.00

#### 5.2 Cancel Clear Cart

**Prerequisites:**

- User is logged in
- Cart contains at least one product

**Steps:**

1. Click "Clear cart" button
2. Click "Cancel" button in dialog
3. Verify no changes occur

**Expected Results:**

- Dialog closes
- Cart items remain unchanged
- No API call is made
- Cart state is preserved

#### 5.3 Close Clear Cart Dialog

**Prerequisites:**

- User is logged in
- Cart contains at least one product

**Steps:**

1. Click "Clear cart" button
2. Click the X (close) button in dialog header
3. Verify behavior

**Expected Results:**

- Dialog closes
- Cart items remain unchanged
- No API call is made
- User can re-open dialog by clicking "Clear cart" again

#### 5.4 Clear Cart Error Handling

**Prerequisites:**

- User is logged in
- Cart contains products
- API is configured to return error on DELETE

**Steps:**

1. Mock DELETE `/carts/:cartId` to return 500 error
2. Click "Clear cart" button
3. Click "Yes, clear cart" in confirmation dialog
4. Observe error handling

**Expected Results:**

- Error toast notification appears: "Something went wrong with clearing your cart. Please try again or contact us."
- Dialog may remain open or close depending on implementation
- Cart items remain in display
- User can retry the operation
- Error is logged to console/monitoring system

---

### 6. Checkout Flow

#### 6.1 Open Checkout Dialog

**Prerequisites:**

- User is logged in
- Cart contains at least one product

**Steps:**

1. Click orange "Checkout" button at bottom of cart
2. Verify dialog opens

**Expected Results:**

- Checkout dialog opens
- Dialog title reads "Checkout"
- CheckoutForm is displayed inside dialog
- Form contains three fields: Full Name, Address, Payment Method
- Payment method dropdown has default value "Blik"
- Submit button reads "Complete Order"
- Close button (X) is visible in dialog header

#### 6.2 Complete Checkout with Valid Data

**Prerequisites:**

- User is logged in
- Cart contains products

**Steps:**

1. Click "Checkout" button
2. Enter "John Doe" in Full Name field
3. Enter "123 Main St, City, State 12345" in Address field
4. Select "Credit Card" from Payment Method dropdown
5. Click "Complete Order" button
6. Wait for processing

**Expected Results:**

- Submit button shows loading state during processing
- Success toast notification: "You have successfully purchased all selected products."
- Dialog closes automatically after success
- Cart may be cleared or remain (depending on business logic)
- Purchase is processed (mocked, takes ~400ms)

#### 6.3 Checkout Form Field Validation

**Prerequisites:**

- User is logged in
- Cart contains products

**Steps:**

1. Click "Checkout" button
2. Leave Full Name empty
3. Leave Address empty
4. Click "Complete Order" button

**Expected Results:**

- Form validation may trigger (if implemented)
- Required field errors may display
- Form does not submit if validation fails
- User can correct errors and resubmit

#### 6.4 Test All Payment Methods

**Prerequisites:**

- User is logged in
- Cart contains products

**Steps:**

1. Click "Checkout" button
2. Test each payment method option:
   - Blik
   - Credit Card
   - PayPal
3. Complete checkout with each method

**Expected Results:**

- All payment methods are selectable from dropdown
- Payment method labels are correctly displayed:
  - "Blik"
  - "Credit Card"
  - "PayPal"
- Selected payment method is properly submitted
- Checkout completes successfully with any payment method

#### 6.5 Cancel Checkout

**Prerequisites:**

- User is logged in
- Cart contains products

**Steps:**

1. Click "Checkout" button
2. Enter some data in form fields
3. Click X (close) button or click outside dialog
4. Verify behavior

**Expected Results:**

- Dialog closes
- Form data is not saved
- Cart remains unchanged
- No API call is made
- User can re-open checkout dialog and form is reset

#### 6.6 Checkout Error Handling

**Prerequisites:**

- User is logged in
- Cart contains products
- Purchase API is mocked to fail

**Steps:**

1. Configure purchase mutation to throw error
2. Click "Checkout" button
3. Fill in form and submit
4. Observe error handling

**Expected Results:**

- Error toast notification: "Something went wrong with finalizing a transaction. Please try again or contact us."
- Dialog may remain open for retry
- Cart items remain unchanged
- User can attempt checkout again

---

### 7. Navigation and Links

#### 7.1 Continue Shopping Link

**Prerequisites:**

- User is logged in
- Cart contains products

**Steps:**

1. Locate "Continue shopping" link at bottom of cart
2. Click the link
3. Verify navigation

**Expected Results:**

- Link is styled as blue link with arrow icon →
- User is navigated to `/products` page
- Products list page loads correctly
- Cart state is preserved (can return to cart with same items)

#### 7.2 Continue Shopping from Empty Cart

**Prerequisites:**

- User is logged in
- Cart is empty (no products)

**Steps:**

1. Verify "Continue shopping" link is visible
2. Click the link

**Expected Results:**

- Link is still functional even with empty cart
- User is navigated to products page
- Can browse and add products to cart

---

### 8. Responsive Design and Accessibility

#### 8.1 Mobile View - Cart Display

**Prerequisites:**

- User is logged in
- Cart contains multiple products
- Browser viewport is set to mobile size (e.g., 375px width)

**Steps:**

1. Resize browser to mobile viewport
2. Navigate to cart page
3. Scroll through cart items

**Expected Results:**

- Cart items stack vertically appropriately
- Product images, titles, and details are readable
- Actions menu button is accessible
- Subtotal and checkout button are visible
- All interactive elements are touch-friendly (min 44x44px)

#### 8.2 Tablet View - Cart Display

**Prerequisites:**

- User is logged in
- Cart contains products
- Browser viewport is set to tablet size (768px width)

**Steps:**

1. Resize browser to tablet viewport
2. Navigate to cart page
3. Verify layout adjustments

**Expected Results:**

- Layout adapts to tablet breakpoint
- Product information is well-spaced
- All features remain accessible
- Text sizes adjust appropriately

#### 8.3 Keyboard Navigation

**Prerequisites:**

- User is logged in
- Cart contains at least one product

**Steps:**

1. Navigate to cart page
2. Press Tab key repeatedly to navigate through interactive elements
3. Use Enter/Space to activate buttons
4. Test menu navigation with arrow keys

**Expected Results:**

- All interactive elements can be reached via keyboard
- Focus indicators are visible on all focusable elements
- Tab order is logical (top to bottom, left to right)
- Dialogs trap focus appropriately
- Can close dialogs with Escape key
- Dropdown menus are keyboard navigable

#### 8.4 Screen Reader Compatibility

**Prerequisites:**

- User is logged in
- Cart contains products
- Screen reader software is active

**Steps:**

1. Navigate to cart page with screen reader
2. Listen to announcements for each cart item
3. Navigate through product actions
4. Test dialog interactions

**Expected Results:**

- Each cart item has proper `role="region"` with `aria-label` containing product title
- Product actions button has `aria-label="Product actions"`
- Menu items have descriptive `aria-label` attributes:
  - "Remove from cart"
  - "Add to wishlist"
  - "Visit product page"
- Toast notifications are announced as alerts
- Dialog titles and content are properly announced
- Form fields have associated labels

---

### 9. Performance and Loading States

#### 9.1 Initial Cart Load

**Prerequisites:**

- User is logged in
- Cart contains 5+ products

**Steps:**

1. Navigate to cart page
2. Observe loading behavior

**Expected Results:**

- Page loader displays while cart data is fetching
- Products load and render efficiently
- All product images load or show placeholder
- Page becomes interactive after data loads
- No cumulative layout shift (CLS)

#### 9.2 Remove Product Loading State

**Prerequisites:**

- User is logged in
- Cart contains products
- API has slight delay configured

**Steps:**

1. Click remove product action
2. Observe UI during API call

**Expected Results:**

- Toast notification appears promptly
- Product may show loading/disabled state briefly
- UI remains responsive during API call
- Product is removed from UI optimistically or after API confirms

#### 9.3 Clear Cart Loading State

**Prerequisites:**

- User is logged in
- Cart contains products

**Steps:**

1. Click "Clear cart" button
2. Click "Yes, clear cart" in dialog
3. Observe button during processing

**Expected Results:**

- "Yes, clear cart" button shows loading spinner
- Button is disabled during API call
- Dialog remains open until operation completes
- User cannot double-submit

#### 9.4 Checkout Loading State

**Prerequisites:**

- User is logged in
- Cart contains products

**Steps:**

1. Open checkout dialog
2. Fill in form
3. Click "Complete Order"
4. Observe button during processing

**Expected Results:**

- Submit button shows loading state with spinner
- Button text may change or spinner appears
- Button is disabled during processing (prevents double-submit)
- Processing takes approximately 400ms
- Loading state clears after completion

---

### 10. Internationalization (i18n)

#### 10.1 English Language Display

**Prerequisites:**

- User is logged in
- Locale is set to "en-GB"
- Cart contains products

**Steps:**

1. Navigate to cart page
2. Verify all text labels

**Expected Results:**

- Page title: "List of selected products"
- Page description: "These are all products that you yet chose (updated [time])."
- Clear cart button: "Clear cart"
- Checkout button: "Checkout"
- Subtotal label: "Subtotal"
- Shipping info: "Shipping and taxes will be calculated at checkout."
- Continue shopping: "Continue shopping"
- All other UI text is in English

#### 10.2 Relative Time Formatting

**Prerequisites:**

- User is logged in
- Cart was modified at different times (test multiple scenarios)

**Steps:**

1. Mock cart with `date` field set to various times:
   - 2 minutes ago
   - 1 hour ago
   - 1 day ago
   - 1 week ago
2. Navigate to cart page for each scenario

**Expected Results:**

- Recent: "updated 2 minutes ago"
- Hours: "updated 1 hour ago"
- Days: "updated 1 day ago"
- Weeks: "updated 1 week ago"
- Time format is localized and grammatically correct

---

### 11. Edge Cases and Error Scenarios

#### 11.1 Cart with Single Product

**Prerequisites:**

- User is logged in
- Cart contains exactly one product

**Steps:**

1. Navigate to cart page
2. Remove the only product

**Expected Results:**

- Product is removed successfully
- Cart becomes empty
- Subtotal shows $0.00
- Checkout button behavior adjusts for empty cart
- No JavaScript errors occur

#### 11.2 Product with Very Long Title

**Prerequisites:**

- User is logged in
- Cart contains product with title exceeding 100 characters

**Steps:**

1. Add product with long title to cart
2. Navigate to cart page
3. Observe title display

**Expected Results:**

- Title is displayed fully or truncated with ellipsis
- Layout does not break
- Title wraps to multiple lines if needed
- Other product information remains visible

#### 11.3 Product with Missing Image

**Prerequisites:**

- User is logged in
- Cart contains product with invalid/missing image URL

**Steps:**

1. Navigate to cart page
2. Observe image display

**Expected Results:**

- Placeholder image is shown, or
- Broken image is handled gracefully
- Layout remains intact
- Other product information displays correctly

#### 11.4 Product with Zero Price

**Prerequisites:**

- User is logged in
- Cart contains product with price = 0

**Steps:**

1. Navigate to cart page
2. Verify price display and subtotal

**Expected Results:**

- Price displays as "$0.00"
- Subtotal calculation includes zero-price items correctly
- No division by zero or calculation errors
- Checkout process handles free items

#### 11.5 Product with Very High Quantity

**Prerequisites:**

- User is logged in
- Cart contains product with quantity = 999

**Steps:**

1. Navigate to cart page
2. Verify quantity display

**Expected Results:**

- Quantity displays as "Quantity: 999"
- Large quantity does not break layout
- Subtotal calculation is accurate (if based on quantity)
- No overflow or number formatting issues

#### 11.6 Rapid Multiple Remove Actions

**Prerequisites:**

- User is logged in
- Cart contains 5+ products

**Steps:**

1. Quickly remove multiple products in succession
2. Click remove on 3 products rapidly
3. Observe behavior

**Expected Results:**

- Each remove action is processed
- No race conditions occur
- UI updates correctly for each removal
- API calls are made for each product
- No duplicate API calls
- Final cart state is accurate

#### 11.7 Network Timeout on Cart Load

**Prerequisites:**

- User is logged in
- Network is configured to timeout on cart API call

**Steps:**

1. Mock GET `/carts/:cartId` to timeout after 10 seconds
2. Navigate to cart page
3. Wait for timeout

**Expected Results:**

- Loading state is shown initially
- After timeout, error boundary catches error
- User-friendly error message is displayed
- Option to retry or navigate away is provided
- No infinite loading spinner

#### 11.8 Concurrent Cart Modifications

**Prerequisites:**

- User is logged in with same account in two browser tabs
- Cart contains products

**Steps:**

1. Open cart page in Tab 1
2. Open cart page in Tab 2
3. Remove a product in Tab 1
4. Observe Tab 2

**Expected Results:**

- Tab 2 may or may not update automatically (depends on cache/polling strategy)
- If Tab 2 is refreshed, it shows updated cart state
- No data inconsistency issues
- Stale data is eventually updated via cache invalidation

---

### 12. Integration with Other Features

#### 12.1 Add to Wishlist and Verify

**Prerequisites:**

- User is logged in
- Cart contains products
- Wishlist page is accessible

**Steps:**

1. From cart page, add product to wishlist via actions menu
2. Navigate to `/wishlist`
3. Verify product appears

**Expected Results:**

- Product is in wishlist
- Product remains in cart (not removed)
- Product displays correctly in wishlist with same details
- Can remove from wishlist independently

#### 12.2 Navigate to Product and Return

**Prerequisites:**

- User is logged in
- Cart contains products

**Steps:**

1. From cart page, click product title to visit product page
2. View product details
3. Click browser back button

**Expected Results:**

- User returns to cart page
- Cart state is preserved (same products, same scroll position)
- No re-fetching of cart data (if using cache)
- Page loads instantly from cache

#### 12.3 Add Product from Products Page

**Prerequisites:**

- User is logged in
- User is on products page

**Steps:**

1. Add a product to cart from products page
2. Navigate to cart page
3. Verify new product appears

**Expected Results:**

- New product is in cart
- Product details match what was added
- Cart count is updated
- Subtotal reflects new product price

---

### 13. Browser Compatibility

#### 13.1 Chrome/Edge (Chromium) Testing

**Prerequisites:**

- User is logged in
- Using latest Chrome or Edge browser

**Steps:**

1. Perform all major cart operations
2. Test dialogs, forms, navigation
3. Check console for errors

**Expected Results:**

- All features work as expected
- No console errors
- Smooth animations and transitions
- Proper rendering of all components

#### 13.2 Firefox Testing

**Prerequisites:**

- User is logged in
- Using latest Firefox browser

**Steps:**

1. Perform all major cart operations
2. Test dialogs, forms, navigation
3. Check console for errors

**Expected Results:**

- All features work as expected
- No console errors or warnings
- Dialogs and modals render correctly
- Event handling works properly

#### 13.3 Safari Testing

**Prerequisites:**

- User is logged in
- Using latest Safari browser

**Steps:**

1. Perform all major cart operations
2. Test dialogs, forms, navigation
3. Check console for errors
4. Test on macOS and iOS if possible

**Expected Results:**

- All features work as expected
- No webkit-specific issues
- Proper date/time formatting
- Touch interactions work on iOS

---

### 14. Console and Network Monitoring

#### 14.1 Check for Console Errors

**Prerequisites:**

- User is logged in
- Browser DevTools console is open

**Steps:**

1. Navigate to cart page
2. Perform various actions (remove, clear, checkout)
3. Monitor console for errors or warnings

**Expected Results:**

- No JavaScript errors in console
- No React warnings about keys, props, etc.
- Only expected debug logs appear (if any)
- No 404s for missing resources

#### 14.2 Network Request Monitoring

**Prerequisites:**

- User is logged in
- Browser DevTools Network tab is open

**Steps:**

1. Navigate to cart page
2. Observe network requests
3. Perform cart operations
4. Monitor API calls

**Expected Results:**

- GET `/carts/:cartId` is called on page load
- GET `/products/:productId` called for each cart item
- DELETE requests sent when removing items
- DELETE request sent when clearing cart
- All requests return expected status codes (200, 204)
- No unnecessary duplicate requests
- Proper request headers (auth tokens, content-type)

#### 14.3 API Response Validation

**Prerequisites:**

- User is logged in
- Cart contains products

**Steps:**

1. Open Network tab
2. Navigate to cart page
3. Inspect API responses

**Expected Results:**

- Cart response includes: id, userId, date, products array
- Product responses include: id, title, price, category, image, etc.
- All required fields are present
- Data types match expected schema
- Dates are in ISO 8601 format

---

## Test Data Requirements

### User Accounts

- **Test User 1**: Standard authenticated user with cart ID 1
- **Test User 2**: User with empty cart
- **Test User 3**: User with large cart (10+ items)

### Product Data

- **Product 1**: Wireless Bluetooth Headphones - $29.99, Electronics
- **Product 2**: Cotton T-Shirt - $19.99, Men's Clothing
- **Product 3**: Gold Necklace - $199.99, Jewelery
- **Product 4**: Product with very long title
- **Product 5**: Product with missing/broken image
- **Product 6**: Free product (price = $0.00)

### Cart Scenarios

- **Cart 1**: Contains 2 products (Product 1, Product 2)
- **Cart 2**: Empty cart (0 products)
- **Cart 3**: Contains 5 products with varying quantities
- **Cart 4**: Contains product with high quantity (999)
- **Cart 5**: Contains all edge case products

---

## Testing Tools and Environment

### Manual Testing

- **Browsers**: Chrome (latest), Firefox (latest), Safari (latest), Edge (latest)
- **Devices**: Desktop (1920x1080), Tablet (768x1024), Mobile (375x667)
- **Screen Readers**: NVDA (Windows), VoiceOver (macOS/iOS)

### Automated Testing

- **Unit Tests**: Vitest with React Testing Library
- **Component Tests**: Storybook with interaction testing
- **Browser Tests**: Vitest Browser Mode with MSW
- **E2E Tests**: Playwright (if applicable)

### API Mocking

- **MSW (Mock Service Worker)**: For intercepting and mocking API requests
- **Test Fixtures**: ProductFixture, CartFixture, UserFixture

---

## Success Criteria

A test scenario passes if:

1. All expected results are achieved
2. No console errors or warnings appear
3. UI updates correctly and promptly
4. Accessibility standards are met (WCAG 2.1 AA)
5. Network requests match expected patterns
6. User experience is smooth and intuitive
7. Error cases are handled gracefully

---

## Notes

- All tests should start from a clean state (fresh cart, no cached data)
- Authentication state should be properly set up before each test
- MSW handlers should be configured to match expected API behavior
- React Query cache should be cleared between tests to avoid state pollution
- Consider testing with different locale settings if i18n is fully implemented
- Performance testing should use realistic data volumes (not just 1-2 items)
- Accessibility testing should include both automated tools and manual verification

---

## Appendix: Key Components

### Components Involved

- **CartPage** (`src/pages/Cart/index.tsx`) - Main page component
- **CartsList** (`src/features/carts/presentation/CartsList.tsx`) - List of cart items
- **CartItem** (`src/features/carts/presentation/CartItem.tsx`) - Individual cart item
- **ClearCartButton** (`src/features/carts/presentation/ClearCartButton/ClearCartButton.tsx`) - Clear cart functionality
- **ConfirmClearCartDialog** - Confirmation dialog for clearing cart
- **CheckoutButton** (`src/features/carts/presentation/CheckoutButton/CheckoutButton.tsx`) - Checkout trigger
- **CheckoutDialog** - Checkout dialog container
- **CheckoutForm** (`src/features/carts/presentation/CheckoutForm.tsx`) - Checkout form

### Hooks and Infrastructure

- **useCartProductsQuery** - Fetches cart and products data
- **useRemoveFromCart** - Handles removing single product
- **useClearCart** - Handles clearing entire cart
- **usePurchase** - Handles checkout/purchase flow
- **useWishlistStore** - Zustand store for wishlist management

### API Handlers (for testing)

- **getCartHandler** - MSW handler for GET `/carts/:cartId`
- **getClearCartHandler** - MSW handler for DELETE `/carts/:cartId`
- **removeProductFromCartHandler** - MSW handler for DELETE `/carts/:cartId/products/:productId`

---

**Document Version**: 1.0
**Last Updated**: 2025-12-12
**Author**: AI Test Planning Agent
**Review Status**: Draft - Pending Review
