# {PR_NAME} - Visualization Summary

- **PR URL**: {PR_URL_PLACEHOLDER}
- **How to get there**: {NAVIGATION_PATH_AND_INSTRUCTIONS}
- **Output video file name**: {VIDEO_FILE_PATH}
- **App start command**: pnpm dev
- **Config**: {CONFIG}

## PR Summary

{PR_SUMMARY_ONE_PARAGRAPH}

## Status

**Status**: {SUCCESS|PARTIAL_SUCCESS|FAILURE}

**Exit Description**: {EXIT_DESCRIPTION}

**Exit Reason**: {SUCCESS|CANT_FIND_PATH|ANNOTATIONS_FAILURE|STATE_ISSUE|OTHER}

**Exiting Agent**: {AGENT_NAME_THAT_CAUSED_EXIT}

**PR summary agent status** {PR_SUMMARY_AGENT_STATUS}
**Story teller agent status** {STORYTELLER_AGENT_STATUS}
**Video creator agent status** {VIDEO_CREATOR_STATUS}

## Resources

Be aware of this helpful resources and read when the need arise:

- **PR Summary**: [PR-summary.md](PR-summary.md) - The product description of the PR and the code changes

- **User flow** - [user-flow.md](user-flow.md) - The produced user flow that should be followed when creating the test and video

- **Login**: [how-to-handle-login.md](./logins/how-to-handle-login.md) - Authentication flow and credentials handling
