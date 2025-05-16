## **SPU_CSC3221_S25_T2**

# HTTP Library Project

This project is a full-stack web application that demonstrates the use of HTTP methods (GET, POST, PUT, PATCH, DELETE) using **Node.js (Express)** for the backend and a plain **HTML/CSS/JavaScript** frontend. Users can create, view, update, and delete user information in an in-memory data structure.

---

## 📁 Project Structure

```
HTTP Library Project/
├── backend/
│   └── server.js              # Express server with RESTful routes
├── frontend/
│   ├── index.html             # Main web interface
│   ├── main.js                # Optional separate JS logic (can be ignored)
│   └── style.css              # Styling for the frontend
├── Worklog/                   # Team work logs
│   ├── Worklog Shadman.md
│   ├── Worklog Manxi.md
│   └── Worklog Conner.md
├── .gitignore
└── README.md                  # You are reading this!
```

---

## 🚀 How to Run This Project

### 🛠 Backend Setup

1. Open a terminal and navigate to the `backend` directory:

   ```bash
   cd "HTTP Library Project/backend"
   ```

2. Initialize the project and install dependencies:

   ```bash
   npm init -y
   npm install express cors
   ```

3. Start the server:

   ```bash
   node server.js
   ```

   You should see:
   ```
   API server running at http://localhost:3000
   ```

---

### 🌐 Frontend Setup

#### ✅ Option A: Using Live Server (Recommended)

1. Open `HTTP Library Project/frontend` in **VS Code**.
2. Install the **Live Server** extension (if not already installed).
3. Right-click `index.html` → **Open with Live Server**.

Your browser should open `http://127.0.0.1:5500/frontend/index.html`.

#### ⚠️ Option B: Open HTML File Directly

You can manually open `frontend/index.html` in a browser, but CORS or fetch errors may occur. Use Option A or C if that happens.

#### ⚙️ Option C: Serve Frontend via Express (Optional)

In `backend/server.js`, add this after your middleware:

```js
const path = require('path');
app.use(express.static(path.join(__dirname, '../frontend')));
```

Then visit:
```
http://localhost:3000/index.html
```

---

## 📋 Features

- ✅ Submit form to create a new user (POST)
- ✅ View all users in a list (GET)
- ✅ Click user to see full details in a modal
- ✅ Edit user info (PUT)
- ✅ Delete user (DELETE)
- ✅ Gracefully handles missing fields with `N/A`

---

## 📦 Dependencies

- [Express](https://expressjs.com/)
- [CORS](https://www.npmjs.com/package/cors)

---

## 🧪 API Endpoints

| Method | Endpoint            | Description              |
|--------|---------------------|--------------------------|
| GET    | `/users`            | Get all users            |
| GET    | `/users/:id`        | Get user by ID           |
| POST   | `/users`            | Create new user          |
| PUT    | `/users/:id`        | Replace user by ID       |
| PATCH  | `/users/:id`        | Update part of user info |
| DELETE | `/users/:id`        | Delete user by ID        |

---

## 👥 Team Members

- **Shadman Shahzahan** – Backend & logic
- **Manxi** – Frontend design & structure
- **Conner** – Frontend design & Form layout & testing

See the `Worklog` folder for individual contributions.

---

## 📄 License

This project is intended for educational use only.

📅 Last updated: May 16, 2025
