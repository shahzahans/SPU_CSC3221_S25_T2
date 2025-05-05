# Worklog Entry

**Date**: May 04,2025

## Task: Front-end Development

### Description:
	
- Collaboratively worked on integrating the frontend and backend to allow users to be **added**, **edited**, and **deleted** through the HTML interface.
- Implemented an HTML form that interacts with our Node.js and Express backend API to send **POST** requests for adding new users.
- Enabled user **deletion** directly from the interface using **DELETE** requests triggered by buttons tied to each user entry.
- Integrated an **edit modal** feature, which I developed to streamline the **editing** process. The modal fetches existing user data and sends **PUT** requests upon saving changes.
- Ensured that form interactions are handled asynchronously with **fetch()** and **async/await** to keep the UI responsive.
- Maintained consistency between frontend input fields and backend user schema, including nested fields like `address` and `company`.
- Verified full **CRUD** functionality by testing all routes and UI features while running the server on **http://localhost:3000**.
