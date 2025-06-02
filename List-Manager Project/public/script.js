// Class that contains request operations for get, post, put, patch and delete
class ApiClient {  
    constructor(baseUrl) {       // Constructor gets base url for client
        this.baseUrl = baseUrl;
    }

    queryResults = document.getElementById("response");  // Get text area to output response

    // Delete request, asynchronous method
    async  delete(id) {

        let url = this.baseUrl + `/${id}`;  // Get record id

        try {
            await fetch(url, {         // Request delete
                method: 'DELETE',
            })
            .then(response => {                                                                     // response returned from fetch
                if (!response.ok) {                                                                 // HTTP request failed
                    this.queryResults.value = 'HTTP DELETE request error: Status = ' + response.status.toString(); // log failure to Result output                                                  // Check for request error
                    throw new Error('HTTP request failed: Status = ' + response.status.toString()); // Throw error POST,PUT or PATCH request failed
                }})

            this.queryResults.value = 'Deleted record number ' +  `${id}`;   // Send delete message to text area

          // Catch error, send to console, and throw
        } catch (error) {
            console.error('DELETE', error);
            throw error;
        }
    }

    // Get request, asynchronous method
    async get(id) {     // Pass id for specific record

            let url = this.baseUrl;    // Start with base url
            if (id) 
                url += `/${id}`;       // Add id for specific record, if id was passed
            
            try {
                await fetch(url)      // Request Get and return response
                        .then(response => {                                                                     // response returned from fetch
                            if (!response.ok) {                                                                 // HTTP request failed
                                this.queryResults.value = 'HTTP GET request error: Status = ' + response.status.toString(); // log failure to Result output                                                  // Check for request error
                                throw new Error('HTTP request failed: Status = ' + response.status.toString()); // Throw error stating that POST,PUT or PATCH request failed
                            }
                            return response;
                            })
                        .then((response) => response.json())   // Format response into json file and return file
                        .then((json) => this.queryResults.value = JSON.stringify(json, null, 2))  // Stringify json file and return
          
            // Catch error, send to console, then throw error  
            } catch (error) {
                console.error('GET', error);
                throw error;
            }
    }

    // Post, Put and Patch requests, asynchronous method
    // jsonFields: all fields with data for current method
    // thisMethod: current method for this request (post, put or patch)
    // ID: id of the record for put or patch request
    async postPutPatch(jsonFields, thisMethod, id) {

            try {
                let url = this.baseUrl;     // Start with base url
                if (id) 
                    url += `/${id}`;      // Add id for specific record, if id was passed
                await fetch(url, {
                        method: thisMethod,    // Parameter: post, put or patch
                        body: JSON.stringify(jsonFields),   // Parameter: all fields in json format for post, put or patch
                        headers: {
                            'Content-type': 'application/json; charset=UTF-8',   // Request header
                        },
                        })
                        .then(response => {                                                                     // response returned from fetch
                            if (!response.ok) {                                                                 // HTTP request failed
                                this.queryResults.value = 'HTTP ' + thisMethod + ' request error: Status = ' + response.status.toString(); // log failure to Result output                                                   // Check for request error
                                throw new Error('HTTP request failed: Status = ' + response.status.toString()); // Throw error stating that POST,PUT or PATCH request failed
                            }
                            return response;
                            })
                        .then((response) => response.json())    // Format response into json file and return file
                        .then((json) => this.queryResults.value = JSON.stringify(json, null, 2));    // Stringify json file and return
            
            // Catch error, send to console, then throw error
            } catch (error) {
            console.error(thisMethod, error);
            throw error;
            }

            const inputs = document.querySelectorAll('.fieldGroup input');
    
            inputs.forEach(input => {    // Clear all fields on client front end
                input.value = '';});
    }
} 

//-----------------------------------------------------------------------------------

// Event listeners triggered when radio button is selected for a request
document.getElementById("get").addEventListener("change", radioGetDelete);
document.getElementById("post").addEventListener("change", radioPost);
document.getElementById("put").addEventListener("change", radioPutPatch);
document.getElementById("patch").addEventListener("change", radioPutPatch);
document.getElementById("delete").addEventListener("change", radioGetDelete);
// Event listener triggered when "Send Request" button is clicked
document.getElementById("myButton").addEventListener("click", (e) => {
  e.preventDefault(); //stop form submit/page reload
  getRequestType();   // do your request
});


// Disables input for all input fields except for ID for Get and Delete requests
function radioGetDelete() {

    const inputs = document.querySelectorAll('.fieldGroup input');

    inputs.forEach(input => {
        if (input.className != "IDinput") 
            input.disabled = true;
        else
            input.disabled = false;
    });

}

// Enables input for all input fields except for ID for Post requests
function radioPost() {

    const inputs = document.querySelectorAll('.fieldGroup input');

    inputs.forEach(input => {
        if (input.className != "IDinput") 
            input.disabled = false;
        else
            input.disabled = true;
    });
}

// Enables input for all input fields for Put and Patch requests
function radioPutPatch() {

    const inputs = document.querySelectorAll('.fieldGroup input');

    inputs.forEach(input => {
        input.disabled = false;
    });
}

// Called by event lister attached to "Send Request" button
// Calls the proper request based on the redio button  currently selected
function getRequestType() {

    const selectedRadio = document.querySelector('input[name="request"]:checked');  // Returns the radio button currently selected

    const queryResults = document.getElementById("response");                      // Get text area to output response
    queryResults.value = '';                                                       // Start out with blank text area

    // Goes to request case based on the selectRadio value, which contains the current request
    switch (selectedRadio.value) {
        case "GET":
            if (document.querySelector('.IDinput').value >= 0)                     // Process Get request of ID value is non-negative
                getRequest();
            else {
                queryResults.value = 'Error: Enter a valid id and retry request';  // ID value is negative, which is invalid
            }
            break;

        case "POST":
            postPutPatchRequest("Post");   // Process Post request
            break;

        case "PUT":
            if (document.querySelector('.IDinput').value != '' && document.querySelector('.IDinput').value >= 0)
                postPutPatchRequest("Put");    // Process Put request
            else {
                queryResults.value = 'Error: Enter a valid id and retry request';
            }

            break;

        case "PATCH":
            //postPutPatchRequest("Patch");
            if (document.querySelector('.IDinput').value != '' && document.querySelector('.IDinput').value >= 0)
                postPutPatchRequest("Patch");   // Process Patch request
            else {
                queryResults.value = 'Error: Enter a valid id and retry request';
            }
            break;

        case "DELETE":
            
            if (document.querySelector('.IDinput').value != '' && document.querySelector('.IDinput').value >= 0)
                deleteRequest();    // Process Delete request
            else {
                queryResults.value = 'Error: Enter a valid id and retry request';
            }
            break;

        default:
            queryResults.value = 'Error: No radio button selected';   // Default case, unlikely to ever be called
    }
}

const apiClient = new ApiClient('http://localhost:3000/users');   // Instanciate apiClient object to process requests

// process Delete request
function deleteRequest() {  

    const requestID = document.querySelector('.IDinput');  // Get ID for record to delete

    apiClient.delete(requestID.value);                    // Call apiClient Delete request
 
    requestID.value = "";                                 // Reset ID after delete request

}

// Process Get request
function getRequest() {

    const requestID = document.querySelector('.IDinput');  // Get ID for Get request

    requestID.value ? apiClient.get(requestID.value) : apiClient.get("");   // Call apiClient Get request

    requestID.value = "";                                 // Reset ID after delete request

}

// Process Post, Put or Patch request based on the parameter method,
// which has a value of Post, Put or Patch
function postPutPatchRequest(method) {

    let jsonFields = {   // Create empty object to hold field values for current request
        address: {
            geo: {},
        },
        company: {},
    };

    const inputs = document.querySelectorAll('.fieldGroup input');  // Get all input fields from client front end

    inputs.forEach(input => {                              // Check each input field for values

        if (input.value && input.value != 1) {                                 // If an input field contains a value, add the value to the jsonFields object

            const currentID = +input.id;   // Each input id has to begin with a letter.
                                                        // a was added before each id and removed using substring to get the inputs id number
            if ((currentID > 1 && currentID <= 4) || (currentID >= 11 && currentID <= 12))
                // currentJsonField is a temporary place holder for the current field
                currentJsonField = jsonFields;           // If input is within this range, it's on the first level of the jsonFields object
            else
                if ((currentID >= 5 && currentID <= 8))      // This is the range of the address fields of the jsonFields object
                    currentJsonField = jsonFields.address;      
            else
                if ((currentID >= 9 && currentID <= 10))      // This is the range of the address.geo fields of the jsonFields object
                    currentJsonField = jsonFields.address.geo;  
            else
                currentJsonField = jsonFields.company;      // otherwise, this is the range of the company fields of the jsonFields object       

            // Get the corresponding label for the input field. The label name is used to add the field name to the jsonField object
            const currentLabel = document.querySelector(`label[id='${input.id}']`).textContent;

            if (input.value)                            // add a field to the jsonFields object if there is date in that field
                currentJsonField[currentLabel] = input.value;

            }
    });
    
    const requestID = document.querySelector('.IDinput');               // Get the ID value for a PUT or PATCH request

    if (method === "Post")
        apiClient.postPutPatch(jsonFields, 'POST', '');                 // Send a POST request to the apiClient
    else if (method === "Put")
        apiClient.postPutPatch(jsonFields, 'PUT', requestID.value);     // Send a PUT request to the apiClient
    else if (method === "Patch")
        apiClient.postPutPatch(jsonFields, 'PATCH', requestID.value);   // Send a PATCH request to the apiClient

}
