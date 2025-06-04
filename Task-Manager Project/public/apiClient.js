// apiClient.js
export class ApiClient {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
        this.queryResults = document.getElementById("response");
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
    }

    async get() {
        try {
            const res = await fetch(this.baseUrl);
            if (!res.ok) throw new Error('HTTP GET failed');
            const json = await res.json();
            this.queryResults.value = Array.isArray(json)
                ? json.map((task, i) => this.formatTask(task, i)).join('\n\n')
                : this.formatTask(json);
        } catch (error) {
            console.error('GET', error);
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

            const json = await res.json();
            this.queryResults.value = this.formatTask(json);
        } catch (error) {
            console.error(method, error);
            this.queryResults.value = error.message;
        }

        document.querySelectorAll('.fieldGroup input').forEach(input => input.value = '');
    }

    formatTask(task, index = null) {
        return `${index !== null ? `${index + 1}. ` : ""}Task Name: ${task.title}
        Completed: ${task.completed ? "Yes" : "No"}
        Created At: ${new Date(task.createdAt).toLocaleString()}
        Due Date: ${task.dueDate || "Not set"}
        Description: ${task.description || "None"}`;
    }
}
