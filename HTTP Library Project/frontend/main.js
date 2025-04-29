const api = 'http://localhost:3000/users'

// GET
async function fetchUsers() {
    try {
        const response = await fetch(api);
        const users = await response.json();
        console.log(users);
    } catch (err) {
        console.error("Error while fetching users: ", err);
    }
}

// POST
async function createUser(userInfo) {
    try {
        const response = await fetch(api, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(userInfo)
        });

        const newUser = await response.json();
        
    } catch(err) {
        console.error("Error creating new user: ", err);
    }
}