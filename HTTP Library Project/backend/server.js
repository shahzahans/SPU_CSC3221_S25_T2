// Code handled by Shadman Shahzahan

const { error } = require('console');
const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(cors());
app.use(express.json());

// In-memory user data
let users = [
    { 
        id: 1, 
        name: 'Leanne Graham',
        username: 'Bret',
        email: 'Sincere@april.biz',
        address: {
            street: 'Kulas Light',
            suite: 'Apt. 556',
            city: 'Gwenborough',
            zipcode: '92998-3874',
            geo: {
                lat: '-37.3159',
                lng: '81.1496',
            },
        },
        phone: '1-770-736-8031 x 56442',
        website: 'hilgegard.org',
        company: {
            name: 'Romaguera-Crona',
            catchPhrase: 'Multi-layerd client-server neural-net',
            bs: 'harness real-time e-markets',
        },
    },
    // Additional data to test
];

// Get all users
app.get('/users', (req,res) => {
    const { username } = req.query;
    if (username){
        return res.json(users.filter((u) => u.username === username));
    }
    res.json(users);
});

// Get user by id
app.get('/users/:id', (req, res) =>{
    const user = users.find((u) => u.id === Number(req.params.id));
    if (!user) return res.status(404).json({ error: 'User not found'});
    res.json(user);
})

// POST create user with address
app.post('/users', (req, res) => {
    const { name, username, email, address, phone, website, company } = req.body;
    if (!name || !username ) {
        return res.status(400).json({ error: 'Missing required fields'});
    }

    const newUser = {
        id: users.length ? users[users.length - 1].id + 1 : 1,
        name,
        username,
        email,
        address,
        phone,
        website,
        company,
    };

    users.push(newUser);
    res.status(201).json(newUser);
});

// PUT (replace) user with address
app.put('/users/:id', (req, res) => {
    const{ name, username, email, address, phone, website, company } = req.body;
    const idx = users.findIndex((u) => u.id === Number(req.params.id));
    if (idx === -1) return res.status(404).json({ error: 'User not found' });

    users[idx] = { id: Number(req.params.id), name, username, email, address, phone, website, company };
    res.json(users[idx]);
});

// PATCH (Partial update) user with address
app.patch('/users/:id', (req, res) => {
    const user = users.find((u) => u.id === Number(req.params.id));
    if (!user) return res.status(404).json({ error: 'User not found'});
    
    Object.assign(user, req.body);
    res.json(user);
});

// DELETE user
app.delete('/users/:id', (req, res) =>{
    const idx = users.findIndex((u) => u.id === Number(req.params.id));
    if (idx === -1) return res.status(404).json({ error: 'User not found'});
    const deleted = users.splice(idx, 1);
    res.json(deleted[0]);
});

// Start the Server
app.listen(PORT, () =>{
    console.log(`API server running at http://localhost:${PORT}`);
});

