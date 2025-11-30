# How to bypass login

## Context

This system supports multiple login options that are being configured in advance. Find the right configuration and refer to the right instructions file that explains how to log in this specific method

## Instructions

1. Read the file `./config.yml' and choose one login instructions file
2. If login-method equals to "user-password", please read the instructions file "how-to-handle-user-password-login.md"
3. If login-method equals to "token", please read the instructions file "how-to-handle-token-login.md"
4. If login-method equals to "custom-function", please apply what is instruced in the file "how-to-handle-login-custom-function.md"
5. If the config.yml specifies a login-url - include this in your instructions
6. After a successful login, navigate to the home page and verify that the user is indeed logged in

IMPORTANT: Only read and provide instructions of the configured login method in ./config.yml - DO NOT read instructions of any other login method
