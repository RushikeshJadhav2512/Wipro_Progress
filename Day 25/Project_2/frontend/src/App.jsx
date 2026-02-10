import React, { useState } from 'react';
import { useSocket } from './context/SocketContext';
import { useTheme } from './context/ThemeContext';
import Dashboard from './components/Dashboard';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import './index.css';

function App() {
  const { isConnected, connectUser, currentUser, users } = useSocket();
  const { darkMode, toggleDarkMode } = useTheme();
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');

  // Demo user for testing
  const demoUser = {
    id: 'user-1',
    name: 'Demo User',
    email: 'demo@taskflow.com',
    role: 'admin'
  };

  const handleConnect = () => {
    if (!currentUser) {
      connectUser(demoUser);
    }
  };

  if (!currentUser) {
    return (
      <div className={`app-container ${darkMode ? 'dark' : 'light'}`}>
        <div className="login-container">
          <h1>TaskFlow Pro</h1>
          <p className="subtitle">Real-time Task Management Dashboard</p>
          <button className="connect-btn" onClick={handleConnect}>
            {isConnected ? '✅ Connected' : '🔗 Connect to Server'}
          </button>
          {!isConnected && (
            <p className="connection-warning">
              Make sure the backend server is running on port 5000
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`app-container ${darkMode ? 'dark' : 'light'}`}>
      {/* Header */}
      <header className="app-header">
        <div className="header-left">
          <h1>TaskFlow Pro</h1>
          <span className={`status-badge ${isConnected ? 'online' : 'offline'}`}>
            {isConnected ? '🟢 Online' : '🔴 Offline'}
          </span>
        </div>
        <div className="header-right">
          <span className="user-info">
            👤 {currentUser.name}
          </span>
          <button className="theme-toggle" onClick={toggleDarkMode}>
            {darkMode ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>
      </header>

      {/* Navigation */}
      <nav className="app-nav">
        <button
          className={`nav-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          📊 Dashboard
        </button>
        <button
          className={`nav-btn ${activeTab === 'tasks' ? 'active' : ''}`}
          onClick={() => setActiveTab('tasks')}
        >
          📋 Tasks
        </button>
        <button
          className={`nav-btn ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          👥 Team
        </button>
      </nav>

      {/* Main Content */}
      <main className="app-main">
        {activeTab === 'dashboard' && (
          <Dashboard onNewTask={() => setShowTaskForm(true)} />
        )}

        {activeTab === 'tasks' && (
          <TaskList
            onEditTask={(task) => {
              setSelectedTask(task);
              setShowTaskForm(true);
            }}
            onNewTask={() => {
              setSelectedTask(null);
              setShowTaskForm(true);
            }}
          />
        )}

        {activeTab === 'users' && (
          <div className="team-section">
            <h2>Team Members</h2>
            <div className="team-grid">
              {users.map(user => (
                <div key={user.id} className="team-card">
                  <div className="avatar">
                    {user.name.charAt(0)}
                  </div>
                  <div className="team-info">
                    <h3>{user.name}</h3>
                    <p>{user.email}</p>
                    <span className={`role-badge ${user.role}`}>
                      {user.role}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Task Form Modal */}
      {showTaskForm && (
        <TaskForm
          task={selectedTask}
          users={users}
          onClose={() => {
            setShowTaskForm(false);
            setSelectedTask(null);
          }}
        />
      )}
    </div>
  );
}

export default App;

