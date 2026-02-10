# User Management System - Day 23 CC1

## Practical Coding Application: NodeJS & React Overview

A full-stack user management application demonstrating React components, Virtual DOM, state management, and Node.js backend API.

## Features Implemented

### User Stories Completed:
1. ✅ **Setup & Initialization** - Manual Webpack + Babel setup for React
2. ✅ **Backend API** - Express server with REST endpoints
3. ✅ **Display Users** - Functional & class components with data fetching
4. ✅ **Add New User** - Form with state management and POST requests
5. ✅ **Component Types** - Both functional and class components with props

### Technical Concepts Demonstrated:
- 🔷 **JSX** - HTML-like syntax in JavaScript
- 🔷 **Virtual DOM** - Efficient rendering updates
- 🔷 **Functional Components** - Using React Hooks (useState, useEffect)
- 🔷 **Class Components** - Lifecycle methods (componentDidMount, componentDidUpdate)
- 🔷 **Props** - Data passing between components
- 🔷 **State Management** - Component-level and application-level state
- 🔷 **Event Handling** - Form submissions and button clicks
- 🔷 **REST API** - GET, POST, PUT, DELETE endpoints
- 🔷 **CORS** - Cross-origin resource sharing

## Project Structure

```
Day 23/Project 3/
├── backend/
│   ├── package.json
│   └── server.js          # Express API server
├── frontend/
│   ├── package.json
│   ├── webpack.config.js   # Manual Webpack setup
│   ├── public/
│   │   └── index.html      # HTML template
│   └── src/
│       ├── index.js        # React entry point
│       ├── index.css       # Global styles
│       └── App.js          # Main App with components
└── README.md
```

## Getting Started

### 1. Start the Backend Server

```bash
cd Day\ 23/Project\ 3/backend
npm install
npm start
```

Server runs at: `http://localhost:3001`

API Endpoints:
- `GET /api/users` - Get all users
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### 2. Start the Frontend

Open a new terminal:

```bash
cd Day\ 23/Project\ 3/frontend
npm install
npm start
```

Frontend runs at: `http://localhost:3000`

## Components Overview

### Functional Components:
1. **UserCard** - Displays individual user info
2. **UserForm** - Form for adding new users
3. **FunctionalUserList** - User list using hooks

### Class Component:
1. **UserList** - Demonstrates lifecycle methods

### Props Flow:
```
App (state: users)
    ↓ passes users as prop
UserList / FunctionalUserList
    ↓ passes user as prop
UserCard
```

### State Management:
- **App**: Main user list state
- **UserForm**: Form input state
- **UserList**: Loading/error states (class component)

## Expected Outcome

After completing this activity:
1. ✅ Working React-Node.js application
2. ✅ Manual Webpack+Babel setup experience
3. ✅ Understanding of functional vs class components
4. ✅ Hands-on with props and event handling
5. ✅ Virtual DOM update demonstration

## API Testing

Test with curl:

```bash
# Get all users
curl http://localhost:3001/api/users

# Add a user
curl -X POST http://localhost:3001/api/users \
  -H "Content-Type: application/json" \
  -d '{"name": "Test User", "email": "test@example.com", "role": "User"}'

# Delete a user
curl -X DELETE http://localhost:3001/api/users/1
```

## Virtual DOM Demonstration

The React application demonstrates Virtual DOM:
1. When you add/delete a user, React creates a virtual DOM
2. Compares with previous version (diffing)
3. Only updates the changed parts (reconciliation)
4. Results in efficient, minimal DOM updates

---

**Note**: Make sure to start the backend server before the frontend for full functionality.

