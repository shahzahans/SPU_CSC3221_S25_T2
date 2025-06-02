# Worklog Entry
**Date**: Jun 1st, 2025

## Task: Testing, Debugging, and CORS Issue Resolution

### Description
- Tested all request methods using the frontend. Noticed an issue where the page would refresh after clicking "Send Request," which appeared to wipe form values. Traced the problem to default form behavior, not CORS. Fixed it by using event.preventDefault(). Verified all CORS functionality locally, though cors() was ultimately not needed with same-origin deployment.

### Reflection:
- This debugging session taught me how easily frontend behavior can be mistaken for server issues. Preventing default events made the app feel much smoother.