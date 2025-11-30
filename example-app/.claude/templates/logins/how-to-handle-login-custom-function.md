# How to bypass login

## Context

Copy this custom function content into the login function inside the test. It should be called in beforeEach

## Custom Function

```typescript
async function login(page: Page) {
  await page.goto("http://localhost:5173/sign-in");
  //TOOD: Handle if already logged-in...
  await page.getByRole("textbox", { name: "Username" }).fill("mor_2314");
  await page.getByRole("textbox", { name: "Password" }).fill("83r5^_");
  await page.getByRole("button", { name: "Sign in" }).click();
  // Soon I'll change this to actually wait for the server response and remove that nasty timeout, shame on me
  await page.waitForTimeout(800);
}
```
