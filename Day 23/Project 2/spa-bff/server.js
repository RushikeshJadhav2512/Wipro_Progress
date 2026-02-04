/**
 * SPA Backend for Frontend (BFF) - Express Server
 * 
 * This Express server acts as a backend for frontend (BFF) architecture,
 * providing API endpoints that can be consumed by SPA applications.
 * 
 * Features:
 * - Basic routing with string responses
 * - Route parameters
 * - JSON API endpoints
 * - CORS enabled for cross-origin requests
 */

const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Enable CORS for all origins
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true }));

// ============================================
// Health Check Endpoint
// ============================================
app.get("/api/health", (req, res) => {
    res.json({
        status: "OK",
        timestamp: new Date().toISOString(),
        message: "Server is running healthy"
    });
});

// ============================================
// Basic HTML Routes
// ============================================

// Route: GET /
// Description: Returns a simple greeting message
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Route: GET /about
// Description: Returns information about the server
app.get('/about', (req, res) => {
    res.send('This is the about page. This Express server serves as a Backend for Frontend (BFF) architecture.');
});

// ============================================
// Route with Parameters
// ============================================

// Route: GET /user/:name
// Description: Returns a personalized greeting based on the name parameter
app.get('/user/:name', (req, res) => {
    const userName = req.params.name;
    res.send(`Hello, ${userName}!`);
});

// Route: GET /greet/:firstName/:lastName
// Description: Returns a formal greeting with first and last name
app.get('/greet/:firstName/:lastName', (req, res) => {
    const { firstName, lastName } = req.params;
    res.send(`Good day, ${firstName} ${lastName}! Welcome to our SPA BFF server.`);
});

// ============================================
// JSON API Endpoints
// ============================================

// Route: GET /api/user
// Description: Returns JSON data representing a user object
app.get('/api/user', (req, res) => {
    const userData = {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        role: 'admin',
        createdAt: new Date().toISOString()
    };
    res.json(userData);
});

// Route: GET /api/users
// Description: Returns an array of users
app.get('/api/users', (req, res) => {
    const users = [
        { id: 1, name: 'John Doe', email: 'john@example.com' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
        { id: 3, name: 'Bob Johnson', email: 'bob@example.com' }
    ];
    res.json(users);
});

// Route: GET /api/products
// Description: Returns a list of products
app.get('/api/products', (req, res) => {
    const products = [
        { id: 1, name: 'Laptop', price: 999.99, category: 'Electronics' },
        { id: 2, name: 'Headphones', price: 199.99, category: 'Audio' },
        { id: 3, name: 'Keyboard', price: 79.99, category: 'Accessories' }
    ];
    res.json(products);
});

// Route: GET /api/product/:id
// Description: Returns a single product by ID
app.get('/api/product/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const products = {
        1: { id: 1, name: 'Laptop', price: 999.99, category: 'Electronics' },
        2: { id: 2, name: 'Headphones', price: 199.99, category: 'Audio' },
        3: { id: 3, name: 'Keyboard', price: 79.99, category: 'Accessories' }
    };

    const product = products[productId];
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ error: 'Product not found' });
    }
});

// ============================================
// Message/Broadcast Endpoints
// ============================================

// Route: GET /api/message
// Description: Returns a welcome message for SPA applications
app.get('/api/message', (req, res) => {
    res.json({
        title: 'Welcome to SPA BFF Server',
        version: '1.0.0',
        description: 'Backend for Frontend server for Single Page Applications',
        endpoints: {
            health: '/api/health',
            user: '/api/user',
            users: '/api/users',
            products: '/api/products',
            message: '/api/message'
        }
    });
});

// ============================================
// Error Handling Middleware
// ============================================

// 404 handler for undefined routes
app.use((req, res) => {
    res.status(404).json({
        error: 'Not Found',
        message: `Route ${req.method} ${req.path} not found`,
        availableRoutes: [
            'GET /',
            'GET /about',
            'GET /user/:name',
            'GET /api/health',
            'GET /api/user',
            'GET /api/users',
            'GET /api/products',
            'GET /api/product/:id',
            'GET /api/message'
        ]
    });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('Error:', err.message);
    res.status(500).json({
        error: 'Internal Server Error',
        message: err.message
    });
});

// ============================================
// Start Server
// ============================================
app.listen(PORT, () => {
    console.log('========================================');
    console.log('🚀 SPA BFF Server Started Successfully!');
    console.log('========================================');
    console.log(`📡 Server running at: http://localhost:${PORT}`);
    console.log(`📡 Health check: http://localhost:${PORT}/api/health`);
    console.log('========================================');
    console.log('Available Routes:');
    console.log('  GET  /                    - Hello World');
    console.log('  GET  /about               - About page');
    console.log('  GET  /user/:name          - Greet user');
    console.log('  GET  /api/health          - Health check');
    console.log('  GET  /api/user            - Get user data (JSON)');
    console.log('  GET  /api/users           - Get all users (JSON)');
    console.log('  GET  /api/products        - Get all products (JSON)');
    console.log('  GET  /api/product/:id    - Get product by ID');
    console.log('  GET  /api/message         - Welcome message');
    console.log('========================================');
});

module.exports = app; // Export for testing

