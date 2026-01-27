# Help Page Test Plan

## Target

- **Page/View**: Help Page
- **Scenario**: All scenarios - basic page rendering, authentication protection, and support contact functionality
- **How To Get There**:
  1. Authenticate as a user (required for protected route)
  2. Navigate to `/help` route
  3. Page should render within the MainLayout (same as other protected pages)

## Coverage Baseline

- **Statements**: 44.2%
- **Total tests**: 14 (across all page tests)

## Working Folders

- **Test plan folder:** `/Users/goldbergyoni/solutions/qodo/codium-ai-platform-client/.claude/tasks/help-page`
- **Test implementation folder:** `/Users/goldbergyoni/solutions/qodo/codium-ai-platform-client/src2/pages/Help/test/`
  - See [file-structure.md](../../../.claude/skills/testing/patterns-and-practices/file-structure.md) for required companion files:
    - `Help.integration.spec.tsx` - Test cases only
    - `actions.tsx` - Render, navigate, click, verify helpers
    - `httpMocks.ts` - MSW handler setup functions
    - `worker.ts` - MSW worker initialization

## Proposed Test Cases

### 1. When page loads, then the help message and heading are displayed

- **External Outcome**: Verify that the main heading and help message text are visible to the user
- **Remarks**:
  - Assert on i18n translation keys rendered as visible text
  - Follow existing pattern from Organization/Teams tests for text visibility checks
  - Use `page.getByRole('heading')` to find the main heading

### 2. When page loads, then the contact support button is visible

- **External Outcome**: Verify that the primary call-to-action (contact support button/link) is visible
- **Remarks**:
  - Use `page.getByRole('button')` or `page.getByRole('link')` depending on implementation
  - Button should have proper accessible name from i18n

### 3. When clicking contact support button, then the correct external URL is opened

- **External Outcome**: Verify that clicking the support button navigates to or opens the expected support URL
- **Remarks**:
  - Check that `href` attribute points to correct CONTACT_SUPPORT_URL
  - Consider testing `target="_blank"` if link opens in new tab
  - This tests the external effect (navigation intent) not the actual browser navigation

### 4. When unauthenticated user tries to access /help, then they are redirected to login

- **External Outcome**: Verify that the route is protected and unauthorized users cannot access it
- **Remarks**:
  - Test the RootProtectedRoute behavior for this page
  - Mock authentication state as unauthenticated
  - Assert that user is redirected to signin route
  - This may require adjusting the authentication mock in the test setup

### 5. When authenticated user navigates to /help, then page renders within MainLayout

- **External Outcome**: Verify that the page renders with proper layout structure (sidebar, header, etc.)
- **Remarks**:
  - Check for presence of MainLayout elements (e.g., sidebar navigation)
  - Ensures Help page follows same layout pattern as other protected pages
  - Can verify by checking for known MainLayout child elements

### 6. When page renders, then all text content uses i18n translations

- **External Outcome**: Verify that no hardcoded text is present and all content comes from translation keys
- **Remarks**:
  - This ensures proper internationalization support
  - Verify specific translation keys are loaded and rendered
  - Check that English translations match expected help page content

## Next Steps

1. Implement the Help page feature code (Tasks 2-5 in tasks.md)
2. Once page skeleton exists, run `testskill.page-analyzer` agent to create `page-analysis.md`
3. Write tests referencing both this plan and the page analysis
4. Run test verifier agent to validate test quality and coverage
