# Worklog Entry

**Date**: April 27,2025

## Task: Backend Development

### Description:
- Reviewed project requirements and rubric
- Planned folder structure: index.html, app.js, CoreHTTP.js, style.css
- Decided to use https://jsonplaceholder.typicode.com/users as test API
- Created coreHTTP class with methods: get(), post(), put(), patch(), delete()
- Used Fetch API with async/await for all methods
- Added error handling using try/catch blocks and status checks
- Set up DOM selectors and event listeners for the send button
- Built logic to read selected HTTP method and route
- Handled dummy request data for POST, PUT, PATCH
- Displayed formatted list of users and raw JSON response
- Added fallback logic to append /1 to routes requiring a user ID
- Tested all request types with JSONPlaceholder
- Confirmed DELETE and PATCH responses worked as expected
- Added styling in style.css to format inputs, buttons, and response areas
- Fixed layout issue where radio buttons weren’t lined up

### What I learned?
- How to create a reusable front-end library with async Fetch calls
- How to work with different HTTP methods and test APIs
- How to structure a front-end project using modular JS and clean UI
- The importance of good error handling and user feedback in web apps
