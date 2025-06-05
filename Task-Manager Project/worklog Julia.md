# Worklog Entry
**Date**: Jun 5th, 2025

## Task: Backend: Express Server & MongoDB
### Description

- I handled setting up and organizing the backend of the project. I wrote `server.js` to initialize the Express app, serve static files from the public folder, and connect to MongoDB Atlas using `mongoose.connect()` (through our new `connect.js` file). I also created the Mongoose schema for a task in `Task.js`, defining fields like title, completed, description, and due date.

- In `tasks.js`, I first wrote all CRUD routes using Express Router. Then, after feedback from the professor, I modularized the logic by moving route functions into a controller file (`taskController.js`) and updated `tasks.js` to only contain route definitions. This makes our backend cleaner, more readable, and closer to real-world backend architecture.
