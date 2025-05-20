// A class that wraps HTTP requests using fetch() with async/await
class coreHTTP {

    // GET request
    async get(url) {
        try {
            const res = await fetch(url);
            if (!res.ok) throw new Error(`GET Error: ${res.status} ${res.statusText}`);
            return await res.text();
        } catch (err) {
            throw err.message;
        }
    }

    // POST request
    async post(url, data) {
        try {
            const res = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            if (!res.ok) throw new Error(`POST Error: ${res.status} ${res.statusText}`);
            return await res.text();
        } catch (err) {
            throw err.message;
        }
    }

    // PUT request
    async put(url, data) {
        try {
            const res = await fetch(url, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            if (!res.ok) throw new Error(`PUT Error: ${res.status} ${res.statusText}`);
            return await res.text();
        } catch (err) {
            throw err.message;
        }
    }

    // PATCH request
    async patch(url, data) {
        try {
            const res = await fetch(url, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            if (!res.ok) throw new Error(`PATCH Error: ${res.status} ${res.statusText}`);
            return await res.text();
        } catch (err) {
            throw err.message;
        }
    }

    // DELETE request
    async delete(url) {
        try {
            const res = await fetch(url, { method: 'DELETE' });
            if (!res.ok) throw new Error(`DELETE Error: ${res.status} ${res.statusText}`);
            return 'Deleted successfully';
        } catch (err) {
            throw err.message;
        }
    }
}
