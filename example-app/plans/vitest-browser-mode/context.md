# Vitest Browser Mode Setup - Context

## Request Overview

Set up Vitest browser mode tests for page-level testing. Unlike unit tests (jsdom) or Storybook tests (component isolation), browser mode tests run in a real browser and can navigate to actual pages.

The first test targets the Wishlist screen (`/wishlist`), navigating to it and verifying static text is displayed. Tests should be co-located in the folder of their target screen.

Configuration uses Playwright as the browser provider with Chromium only.

## File Paths

| File | Path |
|------|------|
| Vitest config | `vitest.config.ts` |
| Package.json | `package.json` |
| Wishlist page | `src/pages/Wishlist/index.tsx` |
| New test file | `src/pages/Wishlist/Wishlist.browser.test.ts` |
| i18n translations | `public/locales/en-GB/translation.json` |

## Current Vitest Projects

The config already has 2 projects:
- `unit` - runs `src/**/*.test.ts` and `src/**/*.test.tsx`
- `storybook` - runs `src/**/*.stories.@(ts|tsx)` with browser mode

## Dependencies Already Installed

- `vitest`: 4.0.6
- `@vitest/browser-playwright`: 4.0.6
- `playwright`: 1.56.1

No new packages needed.

## Wishlist Page Static Text

From `public/locales/en-GB/translation.json`:
- Title: `"Your Wishlist"`
- Description: `"Products you've saved for later."`

## Test File Naming Convention

Using `*.browser.test.ts` pattern to:
- Distinguish from unit tests (`*.test.ts`)
- Distinguish from storybook tests (`*.stories.tsx`)
- Co-locate with target screen in `src/pages/Wishlist/`

## Dev Server

- Port: 5173
- Command: `pnpm dev`
- Must be running before browser tests execute

## Vitest Browser Mode API

From `vitest/browser`:
- `page` - for navigation and locators (like `page.goto()`, `page.getByText()`)
- `expect.element()` - for DOM assertions (like `toBeVisible()`, `toBeInTheDocument()`)
