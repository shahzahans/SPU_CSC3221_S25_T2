// Instantiate the coreHTTP library
const http = new coreHTTP();

// Function to display the server response in both human-readable and raw JSON format
function displayResponse(err, res) {
    const outputEl = document.querySelector("#response");
    const jsonEl = document.querySelector("#jsonOutput");

    if (err) {
        // Display error in red if the request fails
        outputEl.innerHTML = `<p style="color:red;">${err}</p>`;
        jsonEl.textContent = '';
        return;
    }

    try {
        // Parse and format the response JSON
        const data = JSON.parse(res);
        const list = Array.isArray(data) ? data : [data];
        outputEl.innerHTML = `<ul>${list.map(u => `<li>User ${u.id} - ${u.name}</li>`).join('')}</ul>`;
        jsonEl.textContent = JSON.stringify(data, null, 2);
    } catch (e) {
        // Fallback if the response is not valid JSON
        outputEl.innerHTML = `<p>${res}</p>`;
        jsonEl.textContent = '';
    }
}

// Event listener for the "Send Request" button
document.querySelector("#SendReq").addEventListener("click", (e) => {
    e.preventDefault();

    // Get user-selected route and HTTP method
    const route = document.querySelector("#route").value;
    const reqType = document.querySelector('input[name="HTTPtype"]:checked').value;

    // Dummy data for POST requests
    const dummyData = {
        name: "Test User",
        username: "testuser",
        email: "test@example.com"
    };

    // Dummy data for PUT requests
    const updateData = {
        id: 1,
        name: "Updated User"
    };

    // Ensure route includes `/1` for PUT, PATCH, DELETE methods
    const idRoute = route.endsWith("/1") ? route : route + "/1";

    // Handle each request type
    switch (reqType) {
        case "get":
            http.get(route).then(res => displayResponse(null, res)).catch(err => displayResponse(err));
            break;
        case "post":
            http.post(route, dummyData).then(res => displayResponse(null, res)).catch(err => displayResponse(err));
            break;
        case "put":
            http.put(idRoute, updateData).then(res => displayResponse(null, res)).catch(err => displayResponse(err));
            break;
        case "patch":
            http.patch(idRoute, { name: "PATCHED User" }).then(res => displayResponse(null, res)).catch(err => displayResponse(err));
            break;
        case "delete":
            http.delete(idRoute).then(res => displayResponse(null, res)).catch(err => displayResponse(err));
            break;
    }
});
