import React, { useState, useMemo } from 'react';
import { useSocket } from '../context/SocketContext';
import TaskItem from './TaskItem';
import './TaskList.css';

function TaskList({ onEditTask, onNewTask }) {
  const { tasks, changeTaskStatus, deleteTask } = useSocket();
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('createdAt');

  const filteredTasks = useMemo(() => {
    let result = [...tasks];

    // Filter by status
    if (filter === 'active') {
      result = result.filter(t => t.status !== 'completed');
    } else if (filter === 'completed') {
      result = result.filter(t => t.status === 'completed');
    }

    // Search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(t =>
        t.title.toLowerCase().includes(term) ||
        t.description.toLowerCase().includes(term) ||
        (t.assignee && t.assignee.toLowerCase().includes(term))
      );
    }

    // Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case 'dueDate':
          if (!a.deadline && !b.deadline) return 0;
          if (!a.deadline) return 1;
          if (!b.deadline) return -1;
          return new Date(a.deadline) - new Date(b.deadline);
        case 'priority':
          const priorityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
          return (priorityOrder[b.priority] || 0) - (priorityOrder[a.priority] || 0);
        case 'title':
          return a.title.localeCompare(b.title);
        case 'createdAt':
        default:
          return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });

    return result;
  }, [tasks, filter, searchTerm, sortBy]);

  const taskCounts = useMemo(() => {
    return {
      all: tasks.length,
      active: tasks.filter(t => t.status !== 'completed').length,
      completed: tasks.filter(t => t.status === 'completed').length
    };
  }, [tasks]);

  const handleStatusChange = (taskId, newStatus) => {
    changeTaskStatus(taskId, newStatus);
  };

  const handleDelete = (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(taskId);
    }
  };

  return (
    <div className="task-list-container">
      <div className="task-list-header">
        <h2>📋 All Tasks</h2>
        <button className="new-task-btn" onClick={onNewTask}>
          ➕ New Task
        </button>
      </div>

      {/* Filters and Search */}
      <div className="task-controls">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-tabs">
          <button
            className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All ({taskCounts.all})
          </button>
          <button
            className={`filter-tab ${filter === 'active' ? 'active' : ''}`}
            onClick={() => setFilter('active')}
          >
            Active ({taskCounts.active})
          </button>
          <button
            className={`filter-tab ${filter === 'completed' ? 'active' : ''}`}
            onClick={() => setFilter('completed')}
          >
            Completed ({taskCounts.completed})
          </button>
        </div>

        <div className="sort-select">
          <label>Sort by:</label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="createdAt">Date Created</option>
            <option value="dueDate">Due Date</option>
            <option value="priority">Priority</option>
            <option value="title">Title</option>
          </select>
        </div>
      </div>

      {/* Task List */}
      <div className="task-list-content">
        {filteredTasks.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📋</div>
            <h3>No tasks found</h3>
            <p>
              {searchTerm || filter !== 'all'
                ? 'Try adjusting your filters or search term'
                : 'Create your first task to get started'}
            </p>
            {!searchTerm && filter === 'all' && (
              <button className="create-btn" onClick={onNewTask}>
                ➕ Create Task
              </button>
            )}
          </div>
        ) : (
          <div className="tasks-grid">
            {filteredTasks.map(task => (
              <TaskItem
                key={task.id}
                task={task}
                onEdit={() => onEditTask(task)}
                onStatusChange={(status) => handleStatusChange(task.id, status)}
                onDelete={() => handleDelete(task.id)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Footer Stats */}
      <div className="task-list-footer">
        <span>Showing {filteredTasks.length} of {tasks.length} tasks</span>
      </div>
    </div>
  );
}

export default TaskList;

