// User Management System - Backend API
// Node.js + Express Server

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;

// Middleware
app.use(cors()); // Enable CORS for React frontend
app.use(express.json()); // Parse JSON bodies

// In-memory user storage (in real app, use a database)
let users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User' }
];

let nextId = 4;

// GET /users - Retrieve all users
app.get('/api/users', (req, res) => {
    res.json(users);
});

// GET /users/:id - Retrieve a specific user
app.get('/api/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
});

// POST /users - Create a new user
app.post('/api/users', (req, res) => {
    const { name, email, role } = req.body;
    
    // Validation
    if (!name || !email) {
        return res.status(400).json({ error: 'Name and email are required' });
    }

    const newUser = {
        id: nextId++,
        name,
        email,
        role: role || 'User'
    };
    
    users.push(newUser);
    res.status(201).json(newUser);
});

// PUT /users/:id - Update a user
app.put('/api/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    
    const { name, email, role } = req.body;
    if (name) user.name = name;
    if (email) user.email = email;
    if (role) user.role = role;
    
    res.json(user);
});

// DELETE /users/:id - Delete a user
app.delete('/api/users/:id', (req, res) => {
    const index = users.findIndex(u => u.id === parseInt(req.params.id));
    if (index === -1) {
        return res.status(404).json({ error: 'User not found' });
    }
    
    const deletedUser = users.splice(index, 1)[0];
    res.json({ message: 'User deleted successfully', user: deletedUser });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'Server is running', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`API endpoints:`);
    console.log(`  GET    /api/users      - Get all users`);
    console.log(`  GET    /api/users/:id  - Get user by ID`);
    console.log(`  POST   /api/users      - Create new user`);
    console.log(`  PUT    /api/users/:id  - Update user`);
    console.log(`  DELETE /api/users/:id  - Delete user`);
});

