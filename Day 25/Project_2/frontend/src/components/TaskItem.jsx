import React from 'react';
import { useSocket } from '../context/SocketContext';
import './TaskItem.css';

function TaskItem({ task, onEdit, onStatusChange, onDelete }) {
  const { assignTask, currentUser } = useSocket();

  const getPriorityColor = (priority) => {
    const colors = {
      critical: '#dc3545',
      high: '#fd7e14',
      medium: '#ffc107',
      low: '#28a745'
    };
    return colors[priority] || colors.medium;
  };

  const getStatusColor = (status) => {
    const colors = {
      todo: '#6c757d',
      in_progress: '#007bff',
      completed: '#28a745'
    };
    return colors[status] || colors.todo;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'No deadline';
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Due today';
    }
    if (date.toDateString() === tomorrow.toDateString()) {
      return 'Due tomorrow';
    }
    
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const isOverdue = () => {
    if (!task.deadline || task.status === 'completed') return false;
    return new Date(task.deadline) < new Date();
  };

  const handleStatusToggle = () => {
    if (task.status === 'completed') {
      onStatusChange('todo');
    } else {
      onStatusChange('completed');
    }
  };

  const handleClaimTask = () => {
    if (currentUser) {
      assignTask(task.id, currentUser.id, currentUser.name);
    }
  };

  return (
    <div className={`task-item ${task.status === 'completed' ? 'completed' : ''}`}>
      <div className="task-item-header">
        <button 
          className={`status-checkbox ${task.status === 'completed' ? 'checked' : ''}`}
          onClick={handleStatusToggle}
        >
          {task.status === 'completed' && '✓'}
        </button>
        
        <div className="task-priority">
          <span 
            className="priority-indicator"
            style={{ backgroundColor: getPriorityColor(task.priority) }}
            title={`${task.priority} priority`}
          />
        </div>

        <h3 className="task-title">{task.title}</h3>

        <div className="task-actions">
          <button className="action-btn edit" onClick={onEdit} title="Edit">
            ✏️
          </button>
          <button className="action-btn delete" onClick={onDelete} title="Delete">
            🗑️
          </button>
        </div>
      </div>

      <p className="task-description">
        {task.description || 'No description provided'}
      </p>

      <div className="task-meta">
        <div className="meta-left">
          <span 
            className="status-badge"
            style={{ backgroundColor: getStatusColor(task.status) }}
          >
            {task.status.replace('_', ' ')}
          </span>

          {task.deadline && (
            <span className={`deadline ${isOverdue() ? 'overdue' : ''}`}>
              📅 {formatDate(task.deadline)}
            </span>
          )}

          <span 
            className="priority-badge"
            style={{ backgroundColor: getPriorityColor(task.priority) }}
          >
            {task.priority}
          </span>
        </div>

        <div className="meta-right">
          {task.assignee ? (
            <span className="assignee" title={task.assignee}>
              👤 {task.assignee}
            </span>
          ) : (
            <button className="claim-btn" onClick={handleClaimTask}>
              👤 Claim Task
            </button>
          )}
        </div>
      </div>

      <div className="task-footer">
        <span className="created-at">
          Created {new Date(task.createdAt).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
}

export default TaskItem;

