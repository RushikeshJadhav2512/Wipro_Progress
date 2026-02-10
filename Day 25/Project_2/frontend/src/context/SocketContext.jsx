import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext();

export function SocketProvider({ children }) {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const newSocket = io('http://localhost:5000', {
      transports: ['websocket', 'polling']
    });

    newSocket.on('connect', () => {
      console.log('[Socket] Connected to server');
      setIsConnected(true);
    });

    newSocket.on('disconnect', () => {
      console.log('[Socket] Disconnected from server');
      setIsConnected(false);
    });

    newSocket.on('initialData', (data) => {
      console.log('[Socket] Received initial data');
      setTasks(data.tasks || []);
      setUsers(data.users || []);
      setNotifications(data.notifications || []);
    });

    newSocket.on('taskAdded', (task) => {
      console.log('[Socket] Task added:', task.title);
      setTasks(prev => [...prev, task]);
    });

    newSocket.on('taskUpdated', (task) => {
      console.log('[Socket] Task updated:', task.title);
      setTasks(prev => prev.map(t => t.id === task.id ? task : t));
    });

    newSocket.on('taskDeleted', (taskId) => {
      console.log('[Socket] Task deleted:', taskId);
      setTasks(prev => prev.filter(t => t.id !== taskId));
    });

    newSocket.on('notification', (notification) => {
      console.log('[Socket] Notification received:', notification.message);
      setNotifications(prev => [notification, ...prev]);
    });

    newSocket.on('userStatusChanged', (data) => {
      console.log('[Socket] User status changed:', data);
      setOnlineUsers(data.users || []);
    });

    newSocket.on('userRemoved', (userId) => {
      console.log('[Socket] User removed:', userId);
      setUsers(prev => prev.filter(u => u.id !== userId));
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  const connectUser = useCallback((user) => {
    if (socket && isConnected) {
      console.log('[Socket] Connecting as user:', user.name);
      setCurrentUser(user);
      socket.emit('userConnected', user);
    }
  }, [socket, isConnected]);

  const addTask = useCallback((task) => {
    if (socket && isConnected) {
      socket.emit('addTask', task);
    }
  }, [socket, isConnected]);

  const updateTask = useCallback((task) => {
    if (socket && isConnected) {
      socket.emit('updateTask', task);
    }
  }, [socket, isConnected]);

  const deleteTask = useCallback((taskId) => {
    if (socket && isConnected) {
      socket.emit('deleteTask', taskId);
    }
  }, [socket, isConnected]);

  const changeTaskStatus = useCallback((taskId, status) => {
    if (socket && isConnected) {
      socket.emit('changeTaskStatus', { taskId, status });
    }
  }, [socket, isConnected]);

  const assignTask = useCallback((taskId, assigneeId, assigneeName) => {
    if (socket && isConnected) {
      socket.emit('assignTask', { taskId, assigneeId, assigneeName });
    }
  }, [socket, isConnected]);

  const removeUser = useCallback((userId) => {
    if (socket && isConnected) {
      socket.emit('removeUser', userId);
    }
  }, [socket, isConnected]);

  const markNotificationRead = useCallback((notificationId) => {
    if (socket && isConnected) {
      socket.emit('markNotificationRead', notificationId);
      setNotifications(prev => 
        prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
      );
    }
  }, [socket, isConnected]);

  const clearNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  const value = {
    socket,
    isConnected,
    tasks,
    users,
    notifications,
    onlineUsers,
    currentUser,
    connectUser,
    addTask,
    updateTask,
    deleteTask,
    changeTaskStatus,
    assignTask,
    removeUser,
    markNotificationRead,
    clearNotifications
  };

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
}

export function useSocket() {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
}
