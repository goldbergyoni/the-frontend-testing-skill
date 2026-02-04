# Test Plan: Cart Page

## Overview
E2E tests for the Cart page using Playwright. Tests verify user-facing behavior with mocked API responses.

## Page Under Test
- **Route**: `/cart/:cartId`
- **Component**: `src/pages/Cart/index.tsx`
- **Auth**: Requires authentication (redirects to `/sign-in` if not authenticated)

## Test Scenarios

### 1. Display Products
**Scenario**: When API returns products, then they are all visible in the cart
- **Arrange**: Mock cart API with 2 products
- **Act**: Navigate to `/cart/1`
- **Assert**: Both product regions are visible

### 2. Search Filter
**Scenario**: When searching in the cart, then only matching products appear
- **Arrange**: Mock cart with "Wireless Headphones" and "Cotton T-Shirt"
- **Act**: Type "Wireless" in search input
- **Assert**: "Wireless Headphones" visible, "Cotton T-Shirt" not visible

### 3. Product On Sale (Optional)
**Scenario**: When a product is on sale, then a star icon is displayed
- **Arrange**: Mock cart with product where `onSale: true`
- **Act**: Navigate to cart
- **Assert**: Star icon visible in product region

## Test File
`src/pages/Cart/Cart.e2e.test.ts`

## Framework
- **Test Runner**: Playwright
- **API Mocking**: `page.route()` (not MSW)
- **Assertions**: Playwright auto-retry assertions

## Notes
- Route patterns MUST include API host (`**/fakestoreapi.com/**`) to avoid intercepting Vite module requests
- Use `page.addInitScript()` for localStorage setup before navigation
