# Mocking

**When to use:** When mocking external systems or network requests.

---

## Section E - Mocking

E.1. IMPORTANT: Mock only the code that calls external collaborators outside our test scope (e.g., email service clients, payment gateways). Exception: mocks needed to simulate critical events that cannot be triggered otherwise

E.3. Always use the types/interfaces of the mocked code so that when the real implementation changes, the mock fails compilation and forces updates to match the new contract

E.5. Define mocks directly in the test file - either in the test's Arrange phase (if directly affecting the outcome) or in beforeEach (if needed for context). Never hide mocks in external setup files where they mysteriously alter behavior

E.7. Reset all mocks in beforeEach to ensure a clean slate

E.9. When mocking code that makes HTTP requests with known URLs, prefer network interception (MSW, Nock) over function mocks - this keeps more of the code in the test scope
