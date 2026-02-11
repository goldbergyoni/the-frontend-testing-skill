# Test Plan: SignIn Page

## Overview

**Page Under Test:** `/sign-in`
**Component Path:** `src/pages/SignIn/index.tsx`
**Test Framework:** Playwright
**Network Mocking:** Playwright `page.route()` API

## Page Description

The SignIn page allows users to authenticate using a username and password. It features:
- Pre-filled demo credentials (username: `mor_2314`, password: `83r5^_`)
- Username and password input fields
- "Remember me" checkbox (decorative)
- "Forgot password" link (decorative)
- "Sign in" button
- Toast notifications for success/failure feedback

## Authentication Guard

The page is wrapped with `withRequirePub` HOC which redirects already-authenticated users to `/products`.

## External Outcomes to Verify

Following the testing strategy of verifying only external outcomes:

1. **API Mutations**: POST request to `auth/login` with credentials
2. **Storage Changes**: `localStorage` key `fake_store_is_authenticated` set to `"true"` on success, `"false"` on failure
3. **UI Changes**: Success toast ("Successfully signed in!") or error toast ("Failed to sign in...")
4. **Navigation**: Authenticated users are redirected away from the sign-in page

## API Endpoints

| Endpoint | Method | Request Body | Success Response | Error Response |
|----------|--------|--------------|------------------|----------------|
| `auth/login` | POST | `{ username: string, password: string }` | `200 OK` with token string | `401 Unauthorized` |
| `users/{id}` | GET | - | `200 OK` with user object | - |

## Test Scenarios

### Test 1: When valid credentials are submitted, then user is signed in successfully

**Preconditions:**
- User is not authenticated (no `fake_store_is_authenticated` in localStorage)
- API will return success for login

**Actions:**
1. Navigate to `/sign-in`
2. Fill username field with "mor_2314"
3. Fill password field with "83r5^_"
4. Click "Sign in" button

**Expected Outcomes:**
- POST request sent to `**/auth/login` with `{ username: "mor_2314", password: "83r5^_" }`
- Success toast appears with text "Successfully signed in!"
- `localStorage.getItem("fake_store_is_authenticated")` returns `"true"`

**Network Mocks:**
- `POST **/fakestoreapi.com/auth/login` returns `200` with token
- `GET **/fakestoreapi.com/users/**` returns user object

---

### Test 2: When invalid credentials are submitted, then error is displayed

**Preconditions:**
- User is not authenticated
- API will return 401 error for login

**Actions:**
1. Navigate to `/sign-in`
2. Fill username field with "wronguser"
3. Fill password field with "wrongpass"
4. Click "Sign in" button

**Expected Outcomes:**
- POST request sent to `**/auth/login`
- Error toast appears with text "Failed to sign in. Please check your credentials and try again."
- `localStorage.getItem("fake_store_is_authenticated")` returns `"false"`

**Network Mocks:**
- `POST **/fakestoreapi.com/auth/login` returns `401 Unauthorized`

---

### Test 3: When sign-in form loads, then pre-filled credentials are displayed

**Preconditions:**
- User is not authenticated

**Actions:**
1. Navigate to `/sign-in`

**Expected Outcomes:**
- Username field contains "mor_2314"
- Password field contains "83r5^_" (check via input value attribute)
- "Sign in" button is visible and enabled

**Network Mocks:**
- None required (no API calls on initial load)

---

### Test 4: When authenticated user visits sign-in page, then they are redirected to products

**Preconditions:**
- User is already authenticated (`fake_store_is_authenticated` = `"true"` in localStorage)

**Actions:**
1. Set localStorage authentication before navigation
2. Navigate to `/sign-in`

**Expected Outcomes:**
- User is redirected to `/products` page
- Sign-in form is not visible

**Network Mocks:**
- `GET **/fakestoreapi.com/users/**` returns user object (for auth state initialization)

---

### Test 5: When form is submitted with empty fields, then no API call is made

**Preconditions:**
- User is not authenticated

**Actions:**
1. Navigate to `/sign-in`
2. Clear the username field
3. Clear the password field
4. Click "Sign in" button

**Expected Outcomes:**
- No POST request is sent to `**/auth/login`
- No toast notification appears
- User remains on sign-in page

**Network Mocks:**
- None (request should not be made)

---

## Locators Reference

| Element | Locator Strategy |
|---------|------------------|
| Username input | `page.getByRole('textbox', { name: 'Username' })` |
| Password input | `page.getByLabelText('Password')` |
| Sign in button | `page.getByRole('button', { name: 'Sign in' })` |
| Remember me checkbox | `page.getByRole('checkbox', { name: 'Remember me' })` |
| Forgot password link | `page.getByRole('link', { name: 'Forgot password?' })` |
| Success toast | `page.getByText('Successfully signed in!')` |
| Error toast | `page.getByText('Failed to sign in')` |

## Test Data

### Valid User Credentials
```typescript
const validCredentials = {
  username: "mor_2314",
  password: "83r5^_"
};
```

### Mock User Response
```typescript
const mockUser = {
  id: 1,
  cartId: 1,
  role: "viewer",
  email: "test@test.com",
  username: "testuser",
  name: { firstname: "John", lastname: "Doe" },
  phone: "123-456-7890",
  address: {
    city: "Test City",
    street: "Test Street",
    number: 123,
    zipcode: "12345",
    geolocation: { lat: "0", long: "0" },
  },
};
```

## Implementation Notes

1. **Route Pattern**: Use `**/fakestoreapi.com/**` pattern to avoid intercepting Vite's module requests (per canonical example).

2. **Authentication Setup**: Use `page.addInitScript()` for localStorage setup before page loads (per canonical example pattern).

3. **Toast Assertions**: Toasts may require waiting for visibility since they appear asynchronously after API response.

4. **Request Interception**: For Test 5, use `page.waitForRequest()` with a short timeout to verify no request is made, or track requests with a flag.

## Review Checklist

- [ ] Each test verifies one meaningful user action
- [ ] Tests focus on external outcomes (API calls, storage, UI)
- [ ] No implementation details tested
- [ ] Tests are independent and self-contained
- [ ] Mocks use specific host pattern to avoid Vite interference
