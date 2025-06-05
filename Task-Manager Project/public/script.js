import { ApiClient } from './apiClient.js';
// Instantiate API
const apiClient = new ApiClient('http://localhost:3000/api/tasks');

// Event listeners
document.getElementById("get").addEventListener("change", () => toggleInputs(false, true));
document.getElementById("post").addEventListener("change", () => toggleInputs(false, true));
document.getElementById("put").addEventListener("change", () => toggleInputs(false, true));
document.getElementById("delete").addEventListener("change", () => {
    toggleInputs(false, true);
    apiClient.get(); // Show all tasks when DELETE is selected
});

// Event listener for the main submit button
document.getElementById("myButton").addEventListener("click", (e) => {
    e.preventDefault();
    getRequestType();
});
// Event listener for the "Delete All" button
document.getElementById("deleteAllButton").addEventListener("click", () => {
    apiClient.deleteAll();
    showStatus("🗑️ All tasks deleted!", "red");
});

// Input toggle
function toggleInputs(readOnly, enableFields) {
    document.querySelector('.IDinput')?.setAttribute("disabled", "true");

    document.querySelector('.nameinput').disabled = !enableFields;

    const disableOthers = readOnly;

    document.querySelector('.descinput').disabled = disableOthers;
    document.querySelector('.dueinput').disabled = disableOthers;
    document.querySelector('.completeinput').disabled = disableOthers;
}


// Show feedback messages
function showStatus(message, color = 'green') {
    const status = document.getElementById("statusMessage");
    status.textContent = message;
    status.style.color = color;

    setTimeout(() => {
        status.textContent = '';
    }, 3000);
}

// Main request switcher
function getRequestType() {
    const selected = document.querySelector('input[name="request"]:checked');
    const title = document.querySelector('.nameinput').value.trim();
    const description = document.querySelector('.descinput').value.trim();
    const dueDate = document.querySelector('.dueinput').value;
    const completed = document.querySelector('.completeinput').checked;

    const jsonFields = { title, description, dueDate, completed };

    switch (selected.value) {
        case "GET":
            if (title) {
                apiClient.getByTitle(title); // Show just one
            } else {
                apiClient.get(); // Show all
            }
            break;

        case "POST":
            if (!title) return alert("Task name is required to create.");
            apiClient.postPutPatch(jsonFields, "POST");
            break;

        case "PUT":
            if (!title) return alert("Task name is required for update.");
            apiClient.postPutPatch(jsonFields, "PUT", title);
            break;

        case "DELETE":
            if (!title) return alert("Task name is required for deletion.");
            if (confirm(`Are you sure you want to delete "${title}"?`)) {
                apiClient.deleteByTitle(title);
            }
            break;

        default:
            alert("Please select a request type.");
    }
}

