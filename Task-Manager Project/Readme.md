# Task Manager Web App

A simple yet powerful **full-stack Task Manager** that enables users to perform full **CRUD** operations on tasks. It uses a **Node.js** backend with **Express** and **MongoDB Atlas**, and a lightweight **vanilla JavaScript frontend** for seamless user interaction.

> **Demo use case:** Netcentric Computing coursework, designed for clarity and educational purposes.

---

## Features

- **Create** tasks with:
  - Title
  - Description
  - Due date
  - Completion status (true/false)
- **Read** all tasks or search by title
- **Update** tasks (any field) using the task name as identifier
- **Delete** one task by name or **wipe all tasks**
- Clean and **responsive UI** for all screen sizes
- Minimal frontend with **zero dependencies**

---

## 🧠 Technologies Used

### Frontend
- HTML5 & CSS3 (custom styles)
- JavaScript (ES6+, `fetch` API)

### Backend
- Node.js
- Express.js
- MongoDB Atlas (via Mongoose)
- CORS + dotenv for config
- Modular structure with separation of concerns (controllers, routing, config)

---

##  Project Structure

## Technologies Used
Task-Manager-Project/
├── public/                # Frontend files served statically
│   ├── index.html         # Main UI
│   ├── style.css          # Basic styling
│   ├── apiClient.js       # Functions to call backend API
│   └── script.js          # UI logic, form handling
├── controllers/
│   └── taskController.js  # Task business logic
├── connect.js             # MongoDB connection logic
├── server.js              # Main server setup
├── Task.js                # Mongoose task schema/model
├── tasks.js               # Routes for /api/tasks
├── .env                   # Environment config (NOT tracked by Git)
├── package.json
└── README.md

---

## ⚙️ Setup & Installation

### Prerequisites

- Node.js v18+
- MongoDB Atlas account
- Optional: VS Code or any code editor

### 1. Clone the Repository

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






