# Worklog Entry
**Date**: Jun 4th, 2025

## Task: Testing, HTTP Client Logic: apiClient.js

### Description
- My main contribution was writing and maintaining the `apiClient.js` file, which handles all HTTP communication between the frontend and backend. I created a class called `ApiClient` with methods for GET, POST, PUT, DELETE (by title), and DELETE ALL. Each method uses the Fetch API to send data to our Express server and display the response in the UI.

- To keep things modular and DRY, I made a `postPutPatch()` method that accepts parameters for all update/create requests. I also wrote a `formatTask()` function that formats the data returned from MongoDB into a clean, readable string. This made the UI feedback consistent and easy to read. I tested each request type extensively to ensure all fetch calls behave as expected.
