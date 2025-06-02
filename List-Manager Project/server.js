const express = require('express');     // Import express
const app = express();                  // Create express object
const cors = require('cors');           // handle Cross-Origin Requests
const fs = require('fs').promises;      // Create a file stream
const path = require('path');           // Create a file path to read and write to data.json file
const port = 3000;                      // Define port for server

let newRecord = {              // This object template is used to arrange all fields in the proper order for Post
  id: '',
  name: '',
  username: '',
  email: '',
  address: {
    street: '',
    suite: '',
    city: '',
    zipcode: '',
      geo: {
        lat: '',
        lng: '',
      },
  },
  phone: '',
  website: '',
  company: {
    name: '',
    catchPhrase: '',
    bs: ''
  }
};


// Middleware to parse JSON 
app.use(express.json());

  // Middleware to handle Cross-Origin Requests
  app.use(cors());
  app.use(express.static(path.join(__dirname, 'public')));

// Path to the JSON data file
const dataFilePath = path.join(__dirname, 'data.json');

// Utility to deep merge objects
function deepMerge(target, updates) {
  
  for (const key in updates) 
    if ( updates[key] instanceof Object ) 
      deepMerge(target[key], updates[key]);
    else 
      target[key] = updates[key];
};

// Renumbers all record ids after a deleted record
function updateRecordIds(users, id) {
  deletedId = id;
  userLength = users.length;

  for (let currentId = deletedId; currentId <= userLength; currentId++)
    users[currentId - 1].id = currentId;
};

// Process GET for all user
app.get('/users', async (req, res) => {
  try {
    
    const data = await fs.readFile(dataFilePath, 'utf8');   // Read all records from json data file
    const users = JSON.parse(data);                         // convert records to non stringified json, similar to js object
    res.status(200).json(users);                            // Send back object in json format to client

  } catch (error) {
    res.status(500).json({ error: 'Failed to read data' }); // Catch any errors
  }
});

// Process GET for single user by id
app.get('/users/:id', async (req, res) => {                
  try {

    const data = await fs.readFile(dataFilePath, 'utf8');              // Read all records from json data file
    const users = JSON.parse(data);                                    // convert records to non stringified json, similar to js object
    const user = users.find(thisUser => thisUser.id === parseInt(req.params.id));   // Get record with the requested ID

    if (user) {
      res.status(200).json(user);                                     // If record exists, send back to client
    } else {
      res.status(404).json({ error: 'record not found' });            // Error, record not found
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to read data' });           // Catch any error
  }
});

// Process POST for new user
app.post('/users', async (req, res) => {
  try {

    const data = await fs.readFile(dataFilePath, 'utf8');             // Read all records from json data file
    const users = JSON.parse(data);                                   // convert records to non stringified json, similar to js object

    deepMerge(newRecord, req.body);                                   // copy all key fields from req.body to newRecord object template in correct order
    newRecord.id = users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 1;   // Find the ID of the next user and  assign to new record
    // Add new user record to end of json data file
    users.push(newRecord);                                                 // Add new user record contained in newRecord to the end of the records 
    await fs.writeFile(dataFilePath, JSON.stringify(users, null, 2));     // Write entire data file back to data.json file
    res.status(201).json(newRecord);                                       // Send new user record back to client with status

  } catch (error) {
    res.status(500).json({ error: 'Failed to save data' });               // // Catch any error
  }
});

// Process put by id
app.put('/users/:id', async (req, res) => {                
  try {

    const data = await fs.readFile(dataFilePath, 'utf8');              // Read all records from json data file
    const users = JSON.parse(data);                                    // convert records to non stringified json, similar to js object
    const user = users.find(thisUser => thisUser.id === parseInt(req.params.id));   // Get record with the requested id

    if (user) {
      
      deepMerge(user, req.body);                                            // copy all key fields from req.body to existing record with corresponding id
      await fs.writeFile(dataFilePath, JSON.stringify(users, null, 2));     // Write entire data file back to data.json file
      res.status(200).json(user);                                           // If record exists, send back to client

    } else {
      res.status(404).json({ error: 'record not found' });            // Error, record not found
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to read data' });           // Catch any error
  }
});

// Process put by id
app.patch('/users/:id', async (req, res) => {                
  try {

    const data = await fs.readFile(dataFilePath, 'utf8');              // Read all records from json data file
    const users = JSON.parse(data);                                    // convert records to non stringified json, similar to js object
    const user = users.find(thisUser => thisUser.id === parseInt(req.params.id));   // Get record with the requested ID

    if (user) {
      
      deepMerge(user, req.body);                                            // copy only key fields that were sent in req.body, leaving existing fields as they are
      await fs.writeFile(dataFilePath, JSON.stringify(users, null, 2));     // Write entire data file back to data.json file
      res.status(200).json(user);                                           // If record exists, send back to client

    } else {
      res.status(404).json({ error: 'record not found' });            // Error, record not found
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to read data' });           // Catch any error
  }
});

// Process GET for single user by id
app.delete('/users/:id', async (req, res) => {                
  try {

    const data = await fs.readFile(dataFilePath, 'utf8');              // Read all records from json data file
    let users = JSON.parse(data);
    const user = users.find(thisUser => thisUser.id === parseInt(req.params.id));   // Get record with the requested ID
    

    if (user) {   // if user record found

      users = users.filter(thisUser => thisUser.id !== parseInt(req.params.id));   // filter out record with corresponding id
      updateRecordIds(users, parseInt(req.params.id));                             // Renumbers all record ids after a deleted record
      await fs.writeFile(dataFilePath, JSON.stringify(users, null, 2));     // Write entire data file back to data.json file
      res.status(200).json(user);                                                 // If record exists, send back to client

    } else {
      res.status(404).json({ error: 'record not found' });            // Error, record not found
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to read data' });           // Catch any error
  }
});

// Start the server at port 3000
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
