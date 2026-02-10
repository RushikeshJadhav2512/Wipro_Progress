import React, { useMemo } from 'react';
import { useSocket } from '../context/SocketContext';

function Dashboard({ onNewTask }) {
  const { tasks, notifications, users } = useSocket();

  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter(t => t.status === 'completed').length;
    const inProgress = tasks.filter(t => t.status === 'in_progress').length;
    const todo = tasks.filter(t => t.status === 'todo').length;
    const overdue = tasks.filter(t => {
      if (!t.deadline) return false;
      return new Date(t.deadline) < new Date() && t.status !== 'completed';
    }).length;

    return { total, completed, inProgress, todo, overdue };
  }, [tasks]);

  const recentTasks = useMemo(() => {
    return [...tasks]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5);
  }, [tasks]);

  const upcomingDeadlines = useMemo(() => {
    const now = new Date();
    const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    
    return tasks
      .filter(t => t.deadline && new Date(t.deadline) <= nextWeek && t.status !== 'completed')
      .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
      .slice(0, 5);
  }, [tasks]);

  const unreadNotifications = notifications.filter(n => !n.read).length;

  const getPriorityColor = (priority) => {
    const colors = {
      high: '#dc3545',
      medium: '#ffc107',
      low: '#28a745'
    };
    return colors[priority] || colors.low;
  };

  const getStatusColor = (status) => {
    const colors = {
      todo: '#6c757d',
      in_progress: '#007bff',
      completed: '#28a745'
    };
    return colors[status] || colors.todo;
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>📊 Dashboard</h2>
        <button className="new-task-btn" onClick={onNewTask}>
          ➕ New Task
        </button>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📋</div>
          <div className="stat-content">
            <span className="stat-value">{stats.total}</span>
            <span className="stat-label">Total Tasks</span>
          </div>
        </div>
        <div className="stat-card completed">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <span className="stat-value">{stats.completed}</span>
            <span className="stat-label">Completed</span>
          </div>
        </div>
        <div className="stat-card progress">
          <div className="stat-icon">🔄</div>
          <div className="stat-content">
            <span className="stat-value">{stats.inProgress}</span>
            <span className="stat-label">In Progress</span>
          </div>
        </div>
        <div className="stat-card overdue">
          <div className="stat-icon">⚠️</div>
          <div className="stat-content">
            <span className="stat-value">{stats.overdue}</span>
            <span className="stat-label">Overdue</span>
          </div>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="dashboard-grid">
        {/* Recent Tasks */}
        <div className="dashboard-section">
          <h3>📝 Recent Tasks</h3>
          {recentTasks.length === 0 ? (
            <div className="empty-state">
              <p>No tasks yet</p>
              <button onClick={onNewTask}>Create your first task</button>
            </div>
          ) : (
            <div className="task-list">
              {recentTasks.map(task => (
                <div key={task.id} className="task-mini-card">
                  <div className="task-mini-header">
                    <span 
                      className="priority-dot"
                      style={{ backgroundColor: getPriorityColor(task.priority) }}
                    />
                    <span className="task-mini-title">{task.title}</span>
                  </div>
                  <div className="task-mini-meta">
                    <span 
                      className="status-badge"
                      style={{ backgroundColor: getStatusColor(task.status) }}
                    >
                      {task.status.replace('_', ' ')}
                    </span>
                    <span className="assignee">
                      {task.assignee ? `👤 ${task.assignee}` : '👤 Unassigned'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Upcoming Deadlines */}
        <div className="dashboard-section">
          <h3>📅 Upcoming Deadlines</h3>
          {upcomingDeadlines.length === 0 ? (
            <div className="empty-state">
              <p>No upcoming deadlines this week</p>
            </div>
          ) : (
            <div className="deadline-list">
              {upcomingDeadlines.map(task => {
                const deadline = new Date(task.deadline);
                const isToday = deadline.toDateString() === new Date().toDateString();
                const isTomorrow = new Date(deadline.getTime() + 24 * 60 * 60 * 1000).toDateString() === new Date().toDateString();
                
                return (
                  <div key={task.id} className="deadline-item">
                    <div className="deadline-date">
                      <span className="date-day">{deadline.getDate()}</span>
                      <span className="date-month">
                        {deadline.toLocaleString('default', { month: 'short' })}
                      </span>
                    </div>
                    <div className="deadline-info">
                      <span className="deadline-title">{task.title}</span>
                      <span className="deadline-assignee">
                        {isToday ? '🔴 Today' : isTomorrow ? '🟡 Tomorrow' : ''} 
                        {task.assignee ? ` • ${task.assignee}` : ''}
                      </span>
                    </div>
                    <span 
                      className="priority-badge"
                      style={{ backgroundColor: getPriorityColor(task.priority) }}
                    >
                      {task.priority}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Quick Stats Footer */}
      <div className="dashboard-footer">
        <div className="footer-item">
          <span className="footer-label">Team Members</span>
          <span className="footer-value">👥 {users.length} active</span>
        </div>
        <div className="footer-item">
          <span className="footer-label">Notifications</span>
          <span className="footer-value">🔔 {unreadNotifications} unread</span>
        </div>
        <div className="footer-item">
          <span className="footer-label">Completion Rate</span>
          <span className="footer-value">
            {stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0}%
          </span>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

