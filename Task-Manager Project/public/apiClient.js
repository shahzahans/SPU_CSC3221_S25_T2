// apiClient.js
export class ApiClient {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
        this.queryResults = document.getElementById("response");
        this.taskList = document.getElementById("task-list");
    }

    async deleteByTitle(title) {
        const url = `${this.baseUrl}/by-title/${encodeURIComponent(title)}`;
        try {
            const res = await fetch(url, { method: 'DELETE' });
            if (!res.ok) throw new Error('HTTP DELETE failed');
            this.queryResults.value = `Deleted task titled "${title}"`;
        } catch (error) {
            console.error('DELETE', error);
            this.queryResults.value = error.message;
        }
        this.get();
    }

    async deleteAll() {
        try {
            const res = await fetch(this.baseUrl, { method: 'DELETE' });
            if (!res.ok) throw new Error('Failed to delete all tasks');
            const json = await res.json();
            this.queryResults.value = `🗑️ Deleted ${json.deletedCount} task(s).`;
        } catch (error) {
            console.error('DELETE ALL', error);
            this.queryResults.value = error.message;
        }
        this.get();
    }

    async get() {
        try {
            const res = await fetch(this.baseUrl);
            const data = await res.json();

            this.taskList.innerHTML = '';
            data.forEach((task, i) => {
                const taskDiv = document.createElement("div");
                taskDiv.className = "task";
                taskDiv.innerHTML = `
                    <h3><strong>${i + 1}. ${task.title}</strong></h3>
                    <p><strong>Completed:</strong> ${task.completed ? "Yes" : "No"}</p>
                    <p><strong>Created At:</strong> ${new Date(task.createdAt).toLocaleString()}</p>
                    <p><strong>Due Date:</strong> ${task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "Not set"}</p>
                    <p><strong>Description:</strong> ${task.description || "None"}</p>
                    <hr>
                `;
                this.taskList.appendChild(taskDiv);
            });

        } catch (err) {
            console.error('GET error:', err);
        }
    }

    async getByTitle(title) {
        try {
            const res = await fetch(`${this.baseUrl}/by-title/${encodeURIComponent(title)}`);
            if (!res.ok) throw new Error("Task not found");
            const task = await res.json();

            this.taskList.innerHTML = ''; // Clear task list
            const taskDiv = document.createElement("div");
            taskDiv.className = "task";
            taskDiv.innerHTML = `
                <h3><strong>${task.title}</strong></h3>
                <p><strong>Completed:</strong> ${task.completed ? "Yes" : "No"}</p>
                <p><strong>Created At:</strong> ${new Date(task.createdAt).toLocaleString()}</p>
                <p><strong>Due Date:</strong> ${task.dueDate || "Not set"}</p>
                <p><strong>Description:</strong> ${task.description || "None"}</p>
                <hr>
            `;
            this.taskList.appendChild(taskDiv);
        } catch (error) {
            this.queryResults.value = error.message;
        }
    }


    async postPutPatch(jsonFields, method, titleQuery = '') {
        let url = this.baseUrl;
        if (method !== 'POST' && titleQuery) {
            url += `/by-title/${encodeURIComponent(titleQuery)}`;
        }

        try {
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(jsonFields)
            });

            if (!res.ok) throw new Error(`HTTP ${method} failed`);

            const task = await res.json();

            // Show only the created/updated task
            this.taskList.innerHTML = '';
            const taskDiv = document.createElement("div");
            taskDiv.className = "task";
            taskDiv.innerHTML = `
                <h3><strong>${task.title}</strong></h3>
                <p><strong>Completed:</strong> ${task.completed ? "Yes" : "No"}</p>
                <p><strong>Created At:</strong> ${new Date(task.createdAt).toLocaleString()}</p>
                <p><strong>Due Date:</strong> ${task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "Not set"}</p>
                <p><strong>Description:</strong> ${task.description || "None"}</p>
                <hr>
            `;
            this.taskList.appendChild(taskDiv);

            // Clear fields
            document.querySelector('.nameinput').value = '';
            document.querySelector('.descinput').value = '';
            document.querySelector('.dueinput').value = '';
            document.querySelector('.completeinput').checked = false;

        } catch (err) {
            console.error(`${method} error:`, err);
        }
    }


    formatTask(task, index = null) {
        return `${index !== null ? `${index + 1}. ` : ""}Task Name: ${task.title}
        Completed: ${task.completed ? "Yes" : "No"}
        Created At: ${new Date(task.createdAt).toLocaleString()}
        Due Date: ${task.dueDate || "Not set"}
        Description: ${task.description || "None"}`;
    }
}
