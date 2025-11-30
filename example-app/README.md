# Runtime Code Review Demo

> **⚠️ DRAFT STATUS**: This project is in a very early, draftish state and serves as a proof-of-concept demonstration.

## What is this?

This is a demo system showcasing an innovative approach to code review that goes beyond traditional static analysis. At its core, it's a typical e-commerce shop application built with modern web technologies (React, TypeScript, Vite).

The key innovation demonstrated here is the ability to:

1. **Detect code changes** (diffs) in pull requests or commits
2. **Automatically identify the associated user flows** that are affected by those changes
3. **Execute those user flows** in a real browser environment (end-to-end)
4. **Capture comprehensive runtime data** including:
   - Video recordings of the flow execution
   - Performance metrics
   - Runtime errors and exceptions
   - Console warnings and logs
   - Network behavior
   - Any other runtime anomalies

This approach enables reviewers to see not just what changed in the code, but how those changes actually behave in a running application, potentially catching issues that static analysis alone would miss.

## Current State

This project is in **active development** and should be considered a **draft/proof-of-concept**. Many features are incomplete, experimental, or subject to significant changes. Use it for exploration and demonstration purposes, not production use.

## Architecture

The demo consists of:

- **E-commerce Shop**: A realistic shopping application with product browsing, cart management, and checkout flows
- **Diff Detection**: Mechanisms to identify code changes and map them to user journeys
- **Automated Flow Execution**: Browser automation to execute relevant user flows
- **Metrics Collection**: Instrumentation to capture videos, performance data, and error information
- **Analysis & Reporting**: Tools to present findings to code reviewers

## How to Run the Demo

**TBD**

## Contributing

As this is a draft demo project, contributions and feedback are welcome to help refine the concept and implementation.

## License

This project is licensed under the terms of the [MIT license](https://github.com/bartstc/vite-ts-react-template/blob/core/LICENSE).
