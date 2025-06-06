// apiClient.js
export class ApiClient {
    constructor(baseUrl) {
        this.baseUrl = baseUrl; // Base URL for the API
        this.taskList = document.getElementById("task-list"); // Element to render task data
    }

    async deleteByTitle(title) {
        const url = `${this.baseUrl}/by-title/${encodeURIComponent(title)}`; // Build URL with encoded title
        try {
            const res = await fetch(url, { method: 'DELETE' }); // Send DELETE request
            if (!res.ok) throw new Error('HTTP DELETE failed'); // Throw error if not successful
        } catch (error) {
            console.error('DELETE', error); // Log error to console
        }
        // Clear form fields
        document.querySelector('.nameinput').value = '';
        document.querySelector('.descinput').value = '';
        document.querySelector('.dueinput').value = '';
        document.querySelector('.completeinput').checked = false;   
        this.get(); // Refresh the task list
    }

    async deleteAll() {
        try {
            const res = await fetch(this.baseUrl, { method: 'DELETE' }); // Send DELETE request to remove all
            if (!res.ok) throw new Error('Failed to delete all tasks'); // Handle error
            const json = await res.json(); // Parse response
        } catch (error) {
            console.error('DELETE ALL', error); // Log error
        }
        this.get(); // Refresh list
    }

    async get() {
        try {
            const res = await fetch(this.baseUrl); // Fetch all tasks
            const data = await res.json(); // Parse response JSON

            this.taskList.innerHTML = ''; // Clear previous task list
            data.forEach((task, i) => {
                const taskDiv = document.createElement("div"); // Create task container
                taskDiv.className = task.completed ? "task-completed" : "task"; // Assign class
                taskDiv.innerHTML = `
                    <h3><strong>${i + 1}. ${task.title}</strong></h3>
                    <p><strong>Created At:</strong> ${new Date(task.createdAt).toLocaleString()}</p>
                    <p><strong>Due Date:</strong> ${task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "Not set"}</p>
                    <p><strong>Description:</strong> ${task.description || "None"}</p>
                    <hr>
                `;
                this.taskList.appendChild(taskDiv); // Add task to DOM
            });

        } catch (error) {
            console.error('GET error:', error); // Log fetch error
        }
    }

    async getByTitle(title) {
        try {
            const res = await fetch(`${this.baseUrl}/by-title/${encodeURIComponent(title)}`); // Fetch task by title
            if (!res.ok) throw new Error("Task not found"); // Handle 404
            const task = await res.json(); // Parse response

            this.taskList.innerHTML = ''; // Clear task list
            const taskDiv = document.createElement("div"); // Create task display
            taskDiv.className = task.completed ? "task-completed" : "task"; // Assign class
            taskDiv.innerHTML = `
                <h3><strong>${task.title}</strong></h3>
                <p><strong>Created At:</strong> ${new Date(task.createdAt).toLocaleString()}</p>
                <p><strong>Due Date:</strong> ${task.dueDate || "Not set"}</p>
                <p><strong>Description:</strong> ${task.description || "None"}</p>
                <hr>
            `;
            this.taskList.appendChild(taskDiv); // Display task
        } catch (error) {
            console.error(`${method} error:`, error); // Log method-specific error
        }
    }

    async postPutPatch(jsonFields, method, titleQuery = '') {
        let url = this.baseUrl; // Default to base URL
        if (method !== 'POST' && titleQuery) {
            url += `/by-title/${encodeURIComponent(titleQuery)}`; // Add title param if updating
        }

        try {
            const res = await fetch(url, {
                method, // 'POST', 'PUT', or 'PATCH'
                headers: { 'Content-Type': 'application/json' }, // Set JSON header
                body: JSON.stringify(jsonFields) // Convert fields to JSON string
            });

            if (!res.ok) throw new Error(`HTTP ${method} failed`); // Throw error if request fails

            const task = await res.json(); // Parse returned task

            this.taskList.innerHTML = ''; // Clear old task list
            const taskDiv = document.createElement("div"); // Create new task display
            taskDiv.className = task.completed ? "task-completed" : "task";
            taskDiv.innerHTML = `
                <h3><strong>${task.title}</strong></h3>
                <p><strong>Created At:</strong> ${new Date(task.createdAt).toLocaleString()}</p>
                <p><strong>Due Date:</strong> ${task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "Not set"}</p>
                <p><strong>Description:</strong> ${task.description || "None"}</p>
                <hr>
            `;
            this.taskList.appendChild(taskDiv); // Display task

            // Clear form fields
            document.querySelector('.nameinput').value = '';
            document.querySelector('.descinput').value = '';
            document.querySelector('.dueinput').value = '';
            document.querySelector('.completeinput').checked = false;

        } catch (error) {
            console.error(`${method} error:`, error); // Log method-specific error
        }
    }

    formatTask(task, index = null) {
        return `${index !== null ? `${index + 1}. ` : ""}Task Name: ${task.title}
        Completed: ${task.completed ? "Yes" : "No"}
        Created At: ${new Date(task.createdAt).toLocaleString()}
        Due Date: ${task.dueDate || "Not set"}
        Description: ${task.description || "None"}`; // Format task for display or logging
    }
}
