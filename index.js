const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

let users = []; // Array to store users
let id = 1; // ID counter for new users

// Create user
app.post('/users', (req, res) => {
    const { name, email } = req.body;
    const newUser = { id: id++, name, email };
    users.push(newUser);
    res.status(201).json(newUser);
});

// Get all users
app.get('/users', (req, res) => {
    res.status(200).json(users);
});

// Get user by ID
app.get('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (user) {
        res.status(200).json(user);
    } else {
        res.status(404).json({ message: "User not found" });
    }
});

// UPDATE - HTTP PUT
app.put('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (user) {
        const { name, email } = req.body;
        user.name = name;
        user.email = email;
        res.status(200).json(user);
    } else {
        res.status(404).json({ message: "User not found" });
    }
});

// Delete user by ID
app.delete('/users/:id', (req, res) => {
    const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
    if (userIndex > -1) {
        const deletedUser = users.splice(userIndex, 1)[0];
        res.status(200).json(deletedUser);
    } else {
        res.status(404).json({ message: "User not found" });
    }
});

// Start the server in git bash
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
