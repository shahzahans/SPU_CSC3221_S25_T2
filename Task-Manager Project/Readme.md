# Task Manager Web App

A simple full-stack Task Manager application that allows users to **create**, **read**, **update**, and **delete** tasks. Built with **Node.js**, **Express**, **MongoDB Atlas**, and **vanilla JavaScript** on the frontend.

## Features

- Add tasks with:
  - Title
  - Description
  - Due date
  - Completion status
- View all tasks or search by title
- Update any field by task name
- Delete one task by name or all tasks at once
- Modern, responsive UI

---

## Technologies Used

### Frontend
- HTML5, CSS3 (custom styling)
- JavaScript (ES6 modules)

### Backend
- Node.js
- Express.js
- MongoDB Atlas (with Mongoose ODM)
- CORS + dotenv

---

## Project Structure

Task-Manager-Project/
├── public/
│ ├── index.html
│ ├── style.css
│ ├── apiClient.js
│ └── script.js
├── controllers/
│ └── taskController.js
├── connect.js
├── server.js
├── Task.js
├── tasks.js
├── .env
├── package.json
└── README.md


---

## Setup & Installation

### Prerequisites

Make sure you have:

- Node.js (v18 or later)
- MongoDB Atlas account
- An `.env` file (or hardcoded URI)

---

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/task-manager.git
cd task-manager
```

### 2. Install dependencies
```bash
npm install
```

### 3. Create your .env file
```bash
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/task-manager?retryWrites=true&w=majority&appName=Cluster0
PORT=3000
```
### Start the Server
```bash
node server.js
```
The app will be running at:

"http://localhost:3000"

## How to Use?
### From the browser:

- Open http://localhost:3000
- Select one of the request types:
- Read: View all tasks or search by title
- Create: Add a new task
- Update: Modify task data by task name
- Delete: Remove a task by name or delete all
- Fill out the form fields and click Submit

For instructional/demo purposes – Netcentric Computing Coursework

---

## License

This project is intended for educational use only.

Last updated: June 5th, 2025






