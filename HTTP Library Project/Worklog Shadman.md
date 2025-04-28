# Worklog Entry

**Date**: April 27,2025

## Task: Backend Development

### Description:
- Worked on the backend part of the project using **Node.js** and **Express** to build an API that supports **CRUD** operations (Create, Read, Update, Delete) for managing user data.
- Implemented **GET** requests to retrieve all users or specific users by their `id` with support for query parameters.
- Developed **POST** and **PUT** routes to handle creating and updating user data, including nested fields such as `address` and `company`.
- Added a **DELETE** route for removing users from the in-memory database.
- Ensured that each request is handled asynchronously using **async/await** for non-blocking I/O operations.
- Set up basic **error handling** for scenarios like missing required fields or user not found.
- Installed **Express** and other necessary dependencies, and created a **`package.json`** file to manage dependencies.
- Ran the backend server on **http://localhost:3000**, ensuring all routes were functional and responding correctly.
- Implemented **basic in-memory storage** for users, which will be later swapped with a database in future iterations.
