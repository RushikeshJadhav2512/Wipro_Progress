/**
 * Real-time Task Management Dashboard - Backend Server
 * Day 25/Project_2 - Coding Challenge 3
 * 
 * Features:
 * - Express server with WebSocket (Socket.io)
 * - Real-time task updates across all connected clients
 * - User management with notifications
 * - In-memory task storage
 */

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const path = require('path');

const app = express();
const server = http.createServer(app);

// CORS configuration for development
const io = new Server(server, {
    cors: {
        origin: ['http://localhost:5173', 'http://localhost:3000', 'http://127.0.0.1:5173'],
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true
    }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// ==================== In-Memory Data Store ====================
let tasks = [
    {
        id: '1',
        title: 'Setup project structure',
        description: 'Create the initial folder structure for the project',
        assignee: 'Alice',
        assigneeId: 'user-1',
        deadline: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'completed',
        priority: 'high',
        createdAt: new Date().toISOString()
    },
    {
        id: '2',
        title: 'Implement WebSocket server',
        description: 'Set up Socket.io for real-time communication',
        assignee: 'Bob',
        assigneeId: 'user-2',
        deadline: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'in_progress',
        priority: 'high',
        createdAt: new Date().toISOString()
    },
    {
        id: '3',
        title: 'Create React components',
        description: 'Build TaskList, TaskItem, and TaskForm components',
        assignee: 'Charlie',
        assigneeId: 'user-3',
        deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'todo',
        priority: 'medium',
        createdAt: new Date().toISOString()
    }
];

let users = [
    { id: 'user-1', name: 'Alice', email: 'alice@team.com', role: 'admin', status: 'active' },
    { id: 'user-2', name: 'Bob', email: 'bob@team.com', role: 'member', status: 'active' },
    { id: 'user-3', name: 'Charlie', email: 'charlie@team.com', role: 'member', status: 'active' },
    { id: 'user-4', name: 'Diana', email: 'diana@team.com', role: 'member', status: 'inactive' }
];

let notifications = [];

// Connected users tracking
const connectedUsers = new Map();

// ==================== REST API Endpoints ====================

// Get all tasks
app.get('/api/tasks', (req, res) => {
    res.json(tasks);
});

// Get all users
app.get('/api/users', (req, res) => {
    res.json(users);
});

// Get task by ID
app.get('/api/tasks/:id', (req, res) => {
    const task = tasks.find(t => t.id === req.params.id);
    if (task) {
        res.json(task);
    } else {
        res.status(404).json({ error: 'Task not found' });
    }
});

// Get notifications for user
app.get('/api/notifications/:userId', (req, res) => {
    const userNotifications = notifications.filter(n => n.userId === req.params.userId || n.userId === 'all');
    res.json(userNotifications);
});

// ==================== Socket.io Events ====================

io.on('connection', (socket) => {
    console.log(`[Server] User connected: ${socket.id}`);
    
    // Send initial data to connected client
    socket.emit('initialData', {
        tasks,
        users: users.filter(u => u.status === 'active'),
        notifications: []
    });

    // Handle user connection with authentication
    socket.on('userConnected', (userData) => {
        const user = {
            ...userData,
            socketId: socket.id,
            connectedAt: new Date()
        };
        connectedUsers.set(socket.id, user);
        
        // Notify all users about online status
        io.emit('userStatusChanged', {
            userId: userData.id,
            status: 'online',
            users: Array.from(connectedUsers.values())
        });
        
        console.log(`[Server] User ${userData.name} is now online`);
    });

    // Handle adding a new task
    socket.on('addTask', (taskData) => {
        const newTask = {
            id: Date.now().toString(),
            ...taskData,
            status: 'todo',
            createdAt: new Date().toISOString()
        };
        
        tasks.push(newTask);
        
        // Broadcast to all clients
        io.emit('taskAdded', newTask);
        
        // Create notification
        const notification = {
            id: Date.now().toString(),
            type: 'task_assigned',
            message: `New task "${newTask.title}" has been created`,
            taskId: newTask.id,
            userId: newTask.assigneeId || 'all',
            createdAt: new Date().toISOString(),
            read: false
        };
        notifications.unshift(notification);
        
        // Send notification to specific user or all
        if (newTask.assigneeId) {
            const targetUser = Array.from(connectedUsers.values()).find(u => u.id === newTask.assigneeId);
            if (targetUser) {
                io.to(targetUser.socketId).emit('notification', notification);
            }
        } else {
            io.emit('notification', notification);
        }
        
        console.log(`[Server] Task added: ${newTask.title}`);
    });

    // Handle updating a task
    socket.on('updateTask', (taskData) => {
        const index = tasks.findIndex(t => t.id === taskData.id);
        if (index !== -1) {
            tasks[index] = { ...tasks[index], ...taskData, updatedAt: new Date().toISOString() };
            
            // Broadcast to all clients
            io.emit('taskUpdated', tasks[index]);
            
            // Create notification for assignment changes
            if (taskData.assigneeId && taskData.assigneeId !== tasks[index].assigneeId) {
                const notification = {
                    id: Date.now().toString(),
                    type: 'task_assigned',
                    message: `You have been assigned to task "${tasks[index].title}"`,
                    taskId: tasks[index].id,
                    userId: taskData.assigneeId,
                    createdAt: new Date().toISOString(),
                    read: false
                };
                notifications.unshift(notification);
                
                const targetUser = Array.from(connectedUsers.values()).find(u => u.id === taskData.assigneeId);
                if (targetUser) {
                    io.to(targetUser.socketId).emit('notification', notification);
                }
            }
            
            console.log(`[Server] Task updated: ${tasks[index].title}`);
        }
    });

    // Handle deleting a task
    socket.on('deleteTask', (taskId) => {
        const task = tasks.find(t => t.id === taskId);
        if (task) {
            tasks = tasks.filter(t => t.id !== taskId);
            
            // Broadcast to all clients
            io.emit('taskDeleted', taskId);
            
            console.log(`[Server] Task deleted: ${task.title}`);
        }
    });

    // Handle task status change
    socket.on('changeTaskStatus', ({ taskId, status }) => {
        const task = tasks.find(t => t.id === taskId);
        if (task) {
            task.status = status;
            task.updatedAt = new Date().toISOString();
            
            io.emit('taskUpdated', task);
            console.log(`[Server] Task ${taskId} status changed to ${status}`);
        }
    });

    // Handle marking notification as read
    socket.on('markNotificationRead', (notificationId) => {
        const notification = notifications.find(n => n.id === notificationId);
        if (notification) {
            notification.read = true;
            socket.emit('notificationUpdated', notification);
        }
    });

    // Handle user assignment changes (Admin feature)
    socket.on('assignTask', ({ taskId, assigneeId, assigneeName }) => {
        const task = tasks.find(t => t.id === taskId);
        if (task) {
            const oldAssignee = task.assignee;
            task.assignee = assigneeName;
            task.assigneeId = assigneeId;
            task.updatedAt = new Date().toISOString();
            
            io.emit('taskUpdated', task);
            
            // Notify the new assignee
            const notification = {
                id: Date.now().toString(),
                type: 'task_assigned',
                message: `You have been assigned to task "${task.title}"`,
                taskId: task.id,
                userId: assigneeId,
                createdAt: new Date().toISOString(),
                read: false
            };
            notifications.unshift(notification);
            
            const targetUser = Array.from(connectedUsers.values()).find(u => u.id === assigneeId);
            if (targetUser) {
                io.to(targetUser.socketId).emit('notification', notification);
            }
            
            console.log(`[Server] Task ${taskId} reassigned from ${oldAssignee} to ${assigneeName}`);
        }
    });

    // Handle user removal (Admin feature)
    socket.on('removeUser', (userId) => {
        const user = users.find(u => u.id === userId);
        if (user && user.role !== 'admin') {
            user.status = 'inactive';
            
            io.emit('userRemoved', userId);
            console.log(`[Server] User ${user.name} has been removed`);
        }
    });

    // Handle disconnect
    socket.on('disconnect', () => {
        const user = connectedUsers.get(socket.id);
        if (user) {
            connectedUsers.delete(socket.id);
            
            // Notify about offline status
            io.emit('userStatusChanged', {
                userId: user.id,
                status: 'offline',
                users: Array.from(connectedUsers.values())
            });
            
            console.log(`[Server] User ${user.name} disconnected`);
        }
    });
});

// Serve frontend for any unmatched routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

// ==================== Start Server ====================
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log('═══════════════════════════════════════════════════════');
    console.log('🚀 Real-time Task Management Dashboard Server');
    console.log('═══════════════════════════════════════════════════════');
    console.log(`📡 Server running on http://localhost:${PORT}`);
    console.log(`🔌 WebSocket server ready for connections`);
    console.log(`📋 Initial tasks loaded: ${tasks.length}`);
    console.log(`👥 Active users: ${users.filter(u => u.status === 'active').length}`);
    console.log('═══════════════════════════════════════════════════════');
});
