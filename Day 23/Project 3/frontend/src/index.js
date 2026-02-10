// React Entry Point
// This file mounts the React application to the DOM

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Get the root element
const rootElement = document.getElementById('root');

// Create root and render application
const root = ReactDOM.createRoot(rootElement);

// Render with StrictMode for development checks
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

console.log('🚀 User Management System initialized');
console.log('📦 React version:', React.version);

