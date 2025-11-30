# Vitest Browser Mode Setup - Tasks

## Task 1: Update vitest.config.ts

Add a new "browser" project to the existing projects array:

```typescript
{
  extends: true,
  test: {
    name: "browser",
    include: ["src/**/*.browser.test.ts", "src/**/*.browser.test.tsx"],
    browser: {
      enabled: true,
      provider: playwright(),
      headless: true,
      instances: [{ browser: "chromium" }],
    },
  },
},
```

## Task 2: Update package.json

Add new script:

```json
"test:browser": "vitest --project=browser"
```

## Task 3: Create Wishlist browser test

Create file `src/pages/Wishlist/Wishlist.browser.test.ts`:

```typescript
import { expect, test } from 'vitest'
import { page } from 'vitest/browser'

test('Wishlist page displays title', async () => {
  await page.goto('http://localhost:5173/wishlist')
  await expect.element(page.getByText('Your Wishlist')).toBeVisible()
})
```

## Task 4: Verify test passes

1. Start dev server: `pnpm dev`
2. Run browser tests: `pnpm test:browser`
3. Confirm test passes
