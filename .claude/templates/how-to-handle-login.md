# How to bypass login

## Instructions

1. If you don't see a login screen, there is no need to do anything
2. If you do see for sure a login screen, try first to set the following items in the localStorage using playwright MCP, and then once these items are set, try to refresh the page. Read the function here, this should bypass login @login.ts (you may try to use page.evaluate)

3. If the former act didn't help, please quit and explain what happened
4. After a successful login, navigate to the home page and verify that the user is indeed logged in
