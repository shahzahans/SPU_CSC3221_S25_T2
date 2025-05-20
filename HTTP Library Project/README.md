# HTTP Library Project

This project is a full-stack web application that demonstrates the use of HTTP methods (GET, POST, PUT, PATCH, DELETE) using **Node.js (Express)** for the backend and a plain **HTML/CSS/JavaScript** frontend. Users can create, view, update, and delete user information in an in-memory data structure.

---

## Project Structure

```
HTTP Library Project/
├── frontend/
│   ├── index.html             # Main web interface
│   ├── app.js                 # Handles UI events, calls the coreHTTP class
│   ├── CoreHTTP.js            # Class-based HTTP library using Fetch and async/await
│   └── style.css              # Styling for the frontend
├── Worklog/                   # Team work logs
│   ├── Worklog Shadman.md
│   ├── Worklog Manxi.md
│   └── Worklog Conner.md
├── .gitignore
└── README.md                  # You are reading this!
```
## Features

- Fully functional front-end HTTP library (`coreHTTP`) written as a class
- Uses the Fetch API with `async/await` for all requests
- Supports:
  - `GET` for fetching data
  - `POST` for adding data
  - `PUT` for replacing data
  - `PATCH` for partially updating data
  - `DELETE` for removing data
- Built-in error handling for all request types
- Clean, styled UI for testing the library against any route
- Displays both a summary and raw JSON response


## How to Run This Project

1. Clone or download this repository.
2. Open `index.html` in a browser.
3. Choose an HTTP method and enter a route (default is prefilled).
4. Click **Send Request** to test the method.
5. View the response summary and raw JSON below.

## Assignment Requirements Met

| Requirement                             | Status  |
|----------------------------------------|---------|
| Class-based HTTP library               | ✅       |
| Uses Fetch API                         | ✅       |
| Uses async/await syntax                | ✅       |
| Supports GET, POST, PUT, DELETE        | ✅       |
| Includes PATCH (extra credit)          | ✅       |
| Supports routes, parameters, queries   | ✅       |
| Displays response in readable format   | ✅       |
| Error handling included                | ✅       |
| Clean and usable UI                    | ✅       |


## Team Members

- **Shadman Shahzahan** – Front End & logic
- **Manxi** – Frontend design & structure
- **Conner** – Frontend design & Form layout & testing

See the `Worklog` folder for individual contributions.

For instructional/demo purposes – Netcentric Computing Coursework

---

## License

This project is intended for educational use only.

Last updated: May 16, 2025
