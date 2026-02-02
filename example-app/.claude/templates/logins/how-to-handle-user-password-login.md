# Login with user password

## How to login during browsing

During routing with an MCP, if the user seems logged-in -> seek a log-out button, log-out first. Then seek the login screen, as defined `./config.yml'.login-url. Use the credentials below to fill them in and click Submit to Login

## How to login in a test

The beforeEach hook of the test is calling a login function. Fill that function: Navigate to the login screen, the url is specified in `./config.yml'.login-url. Specify the steps to fill the login screen with username and password, submit, and then redirect to the homepage

## Credentials

- User: "mor_2314"
- Passsword: "83r5^\_"
