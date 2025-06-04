import { ApiClient } from './apiClient.js';
// Instantiate API
const apiClient = new ApiClient('http://localhost:3000/api/tasks');

// Event listeners
document.getElementById("get").addEventListener("change", () => toggleInputs(false, true));
document.getElementById("post").addEventListener("change", () => toggleInputs(false, true));
//document.getElementById("patch").addEventListener("change", () => toggleInputs(false, true));
document.getElementById("put").addEventListener("change", () => toggleInputs(false, true));
document.getElementById("delete").addEventListener("change", () => {
    toggleInputs(false, true);
    apiClient.get(); // Show all tasks when DELETE is selected
});
document.getElementById("myButton").addEventListener("click", (e) => {
    e.preventDefault();
    getRequestType();
});
document.getElementById("deleteAllButton").addEventListener("click", () => {
    apiClient.deleteAll();
});

// Input toggle
function toggleInputs(_, enableFields) {
    document.querySelector('.IDinput')?.setAttribute("disabled", "true");
    document.querySelector('.nameinput').disabled = !enableFields;
    document.querySelector('.descinput').disabled = !enableFields;
    document.querySelector('.dueinput').disabled = !enableFields;
    document.querySelector('.completeinput').disabled = !enableFields;
}

// Main request switcher
function getRequestType() {
    const selected = document.querySelector('input[name="request"]:checked');
    const title = document.querySelector('.nameinput').value.trim();
    const description = document.querySelector('.descinput').value.trim();
    const dueDate = document.querySelector('.dueinput').value;
    const completed = document.querySelector('.completeinput').checked;
    const output = document.getElementById("response");
    output.value = '';

    const jsonFields = { title, completed, description, dueDate };

    switch (selected.value) {
        case "GET":
            apiClient.get();
            break;
        case "POST":
            if (!title) return output.value = " Error: Task name is required";
            apiClient.postPutPatch(jsonFields, "POST");
            break;
        case "PUT":
            apiClient.get(); 
            if (!title) return output.value += "\n\n Enter the task name you want to update.";
            apiClient.postPutPatch(jsonFields, "PUT", title);
            break;

        //case "PATCH":
            //if (!title) return output.value = " Error: Task name is required for update";
            //postPutPatchRequest(selected.value, title); // Use helper
            //break;

        case "DELETE":
            if (!title) return output.value = "Error: Task name is required for delete";
            if (confirm(`Are you sure you want to delete "${title}"?`)) {
                apiClient.deleteByTitle(title);
            } else {
                output.value = "Deletion cancelled.";
            }
            break;
            default:
                output.value = " Error: No request selected";
    }
}
