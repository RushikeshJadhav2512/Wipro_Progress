// User Management System - Main App Component
// Demonstrates: Functional Components, Class Components, Props, State, Event Handling

import React, { useState, useEffect } from 'react';

// API Base URL
const API_URL = 'http://localhost:3001/api';

// ================================
// FUNCTIONAL COMPONENT: UserCard
// ================================
function UserCard({ user, onDelete }) {
    return (
        <div className="user-item">
            <div className="user-info">
                <h3>{user.name}</h3>
                <p>Email: {user.email}</p>
                <span className="user-role">{user.role}</span>
            </div>
            <div className="user-actions">
                <button 
                    className="btn btn-danger"
                    onClick={() => onDelete(user.id)}
                >
                    Delete
                </button>
            </div>
        </div>
    );
}

// ================================
// FUNCTIONAL COMPONENT: UserForm
// ================================
function UserForm({ onAddUser }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: 'User'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddUser(formData);
        setFormData({ name: '', email: '', role: 'User' });
    };

    return (
        <div className="card">
            <div className="card-header">
                <h2>Add New User</h2>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter user name"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter user email"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="role">Role:</label>
                    <select
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                    >
                        <option value="User">User</option>
                        <option value="Admin">Admin</option>
                        <option value="Moderator">Moderator</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-success">
                    Add User
                </button>
            </form>
        </div>
    );
}

// ================================
// CLASS COMPONENT: UserList
// Demonstrates: Lifecycle methods, state management
// ================================
class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            loading: true,
            error: null
        };
        console.log('UserList: Constructor called');
    }

    componentDidMount() {
        console.log('UserList: Component mounted');
        this.fetchUsers();
    }

    componentDidUpdate(prevProps) {
        console.log('UserList: Component updated');
        if (prevProps.users !== this.props.users) {
            this.setState({ users: this.props.users });
        }
    }

    fetchUsers = async () => {
        try {
            this.setState({ loading: true, error: null });
            const response = await fetch(`${API_URL}/users`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const users = await response.json();
            this.setState({ users, loading: false });
        } catch (error) {
            console.error('Error fetching users:', error);
            this.setState({ 
                error: 'Failed to fetch users. Make sure the backend is running.',
                loading: false 
            });
        }
    };

    render() {
        console.log('UserList: Rendering');
        const { users, loading, error } = this.state;

        if (loading) {
            return (
                <div className="card">
                    <div className="loading">Loading users...</div>
                </div>
            );
        }

        if (error) {
            return (
                <div className="card">
                    <div className="error">{error}</div>
                </div>
            );
        }

        if (users.length === 0) {
            return (
                <div className="card">
                    <div className="info-box">
                        <h3>No Users Found</h3>
                        <p>Add your first user using the form above!</p>
                    </div>
                </div>
            );
        }

        return (
            <div className="card">
                <div className="card-header">
                    <h2>User List ({users.length} users)</h2>
                </div>
                <div className="user-list">
                    {users.map(user => (
                        <UserCard 
                            key={user.id} 
                            user={user}
                            onDelete={this.props.onDeleteUser}
                        />
                    ))}
                </div>
            </div>
        );
    }
}

// ================================
// MAIN APP COMPONENT
// ================================
function App() {
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState(null);
    const [view, setView] = useState('functional'); // 'functional' or 'class'

    // Fetch initial users
    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch(`${API_URL}/users`);
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error('Error fetching users:', error);
            setMessage({
                type: 'error',
                text: 'Failed to connect to backend. Please start the server.'
            });
        }
    };

    // Add new user
    const addUser = async (userData) => {
        try {
            const response = await fetch(`${API_URL}/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            if (!response.ok) {
                throw new Error('Failed to add user');
            }

            const newUser = await response.json();
            setUsers(prev => [...prev, newUser]);
            setMessage({
                type: 'success',
                text: `User "${newUser.name}" added successfully!`
            });

            // Clear message after 3 seconds
            setTimeout(() => setMessage(null), 3000);
        } catch (error) {
            console.error('Error adding user:', error);
            setMessage({
                type: 'error',
                text: 'Failed to add user. Please try again.'
            });
        }
    };

    // Delete user
    const deleteUser = async (userId) => {
        try {
            const response = await fetch(`${API_URL}/users/${userId}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('Failed to delete user');
            }

            setUsers(prev => prev.filter(user => user.id !== userId));
            setMessage({
                type: 'success',
                text: 'User deleted successfully!'
            });

            setTimeout(() => setMessage(null), 3000);
        } catch (error) {
            console.error('Error deleting user:', error);
            setMessage({
                type: 'error',
                text: 'Failed to delete user. Please try again.'
            });
        }
    };

    return (
        <div className="container">
            {/* Header */}
            <header className="header">
                <h1>👥 User Management System</h1>
                <p>React + Node.js Full Stack Application</p>
            </header>

            {/* Message Display */}
            {message && (
                <div className={message.type === 'error' ? 'error' : 'success-message'}>
                    {message.text}
                </div>
            )}

            {/* Component Type Toggle */}
            <div className="card">
                <div className="card-header">
                    <h2>Component Demo</h2>
                </div>
                <div className="tab-container">
                    <button 
                        className={`tab ${view === 'functional' ? 'active' : ''}`}
                        onClick={() => setView('functional')}
                    >
                        Functional Components
                    </button>
                    <button 
                        className={`tab ${view === 'class' ? 'active' : ''}`}
                        onClick={() => setView('class')}
                    >
                        Class Components
                    </button>
                </div>
                
                {view === 'functional' && (
                    <div className="info-box">
                        <h3>Functional Component Features:</h3>
                        <ul>
                            <li>✓ Uses React Hooks (useState, useEffect)</li>
                            <li>✓ Simpler syntax with arrow functions</li>
                            <li>✓ More concise and easier to test</li>
                            <li>✓ Preferred in modern React development</li>
                        </ul>
                    </div>
                )}
                
                {view === 'class' && (
                    <div className="info-box">
                        <h3>Class Component Features:</h3>
                        <ul>
                            <li>✓ Uses class syntax with render method</li>
                            <li>✓ Lifecycle methods (componentDidMount, etc.)</li>
                            <li>✓ State managed with this.state</li>
                            <li>✓ Traditional React pattern (pre-Hooks)</li>
                        </ul>
                    </div>
                )}
            </div>

            {/* Add User Form */}
            <UserForm onAddUser={addUser} />

            {/* User List - Shows both approaches */}
            {view === 'functional' ? (
                <FunctionalUserList users={users} onDeleteUser={deleteUser} />
            ) : (
                <UserList users={users} onDeleteUser={deleteUser} />
            )}

            {/* API Info */}
            <div className="card">
                <div className="card-header">
                    <h2>API Endpoints</h2>
                </div>
                <div className="info-box">
                    <ul>
                        <li><strong>GET</strong> /api/users - Get all users</li>
                        <li><strong>POST</strong> /api/users - Create new user</li>
                        <li><strong>PUT</strong> /api/users/:id - Update user</li>
                        <li><strong>DELETE</strong> /api/users/:id - Delete user</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

// ================================
// FUNCTIONAL USER LIST (Alternative)
// ================================
function FunctionalUserList({ users, onDeleteUser }) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Simulate loading delay for demonstration
        const timer = setTimeout(() => {
            setLoading(false);
        }, 500);
        
        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return (
            <div className="card">
                <div className="loading">Loading users...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="card">
                <div className="error">{error}</div>
            </div>
        );
    }

    if (users.length === 0) {
        return (
            <div className="card">
                <div className="info-box">
                    <h3>No Users Found</h3>
                    <p>Add your first user using the form above!</p>
                </div>
            </div>
        );
    }

    return (
        <div className="card">
            <div className="card-header">
                <h2>User List ({users.length} users)</h2>
            </div>
            <div className="user-list">
                {users.map(user => (
                    <UserCard 
                        key={user.id} 
                        user={user}
                        onDelete={onDeleteUser}
                    />
                ))}
            </div>
        </div>
    );
}

export default App;

