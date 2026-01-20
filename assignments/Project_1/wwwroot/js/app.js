/**
 * .NET Core Middleware Demo - JavaScript
 * Demonstrates static file serving and client-side interactions
 */

// Application State
const AppState = {
    initialized: false,
    clickCount: 0,
    apiEndpoint: '/api/hello'
};

// DOM Elements
const elements = {
    testButton: null,
    fetchButton: null,
    output: null
};

// Initialize application when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

/**
 * Initialize the application
 */
function initializeApp() {
    // Cache DOM elements
    elements.testButton = document.getElementById('testButton');
    elements.fetchButton = document.getElementById('fetchButton');
    elements.output = document.getElementById('output');
    
    // Set up event listeners
    if (elements.testButton) {
        elements.testButton.addEventListener('click', handleTestClick);
    }
    
    if (elements.fetchButton) {
        elements.fetchButton.addEventListener('click', handleFetchClick);
    }
    
    AppState.initialized = true;
    logMessage('Application initialized successfully!', 'success');
    logMessage('Static files loaded from wwwroot folder.', 'info');
}

/**
 * Handle test button click
 */
function handleTestClick() {
    AppState.clickCount++;
    
    const messages = [
        '🎉 Click registered!',
        '✅ Great job!',
        '🚀 Working perfectly!',
        '✨ Amazing interaction!',
        '👍 Well done!'
    ];
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    
    const output = {
        action: 'Button Click',
        message: randomMessage,
        clickNumber: AppState.clickCount,
        timestamp: new Date().toLocaleTimeString()
    };
    
    logMessage(JSON.stringify(output, null, 2), 'success');
    showNotification(randomMessage);
}

/**
 * Handle fetch button click - demonstrates API interaction
 */
async function handleFetchClick() {
    try {
        logMessage('Fetching data from API...', 'info');
        
        const response = await fetch(AppState.apiEndpoint);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        const output = {
            action: 'API Fetch',
            status: 'Success',
            data: data,
            timestamp: new Date().toLocaleTimeString()
        };
        
        logMessage(JSON.stringify(output, null, 2), 'success');
        
    } catch (error) {
        const output = {
            action: 'API Fetch',
            status: 'Error',
            error: error.message,
            timestamp: new Date().toLocaleTimeString()
        };
        
        logMessage(JSON.stringify(output, null, 2), 'error');
    }
}

/**
 * Log message to output area
 * @param {string} message - Message to display
 * @param {string} type - Message type (success, error, info)
 */
function logMessage(message, type = 'info') {
    if (!elements.output) return;
    
    const timestamp = new Date().toLocaleTimeString();
    const formattedMessage = `[${timestamp}] ${message}`;
    
    const messageElement = document.createElement('div');
    messageElement.className = type;
    messageElement.textContent = formattedMessage;
    
    // Clear previous messages after 5
    const existingMessages = elements.output.querySelectorAll('div');
    if (existingMessages.length >= 5) {
        existingMessages[0].remove();
    }
    
    elements.output.appendChild(messageElement);
    
    // Scroll to bottom
    elements.output.scrollTop = elements.output.scrollHeight;
}

/**
 * Show browser notification
 * @param {string} message - Notification message
 */
function showNotification(message) {
    if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('Middleware Demo', {
            body: message,
            icon: '/favicon.ico'
        });
    }
}

/**
 * Request notification permission
 */
async function requestNotificationPermission() {
    if ('Notification' in window) {
        await Notification.requestPermission();
    }
}

// Request notification permission on first interaction
document.addEventListener('click', function handler() {
    requestNotificationPermission();
    document.removeEventListener('click', handler);
}, { once: true });

/**
 * Utility function to format JSON
 * @param {any} obj - Object to format
 * @returns {string} Formatted JSON string
 */
function formatJSON(obj) {
    try {
        return JSON.stringify(obj, null, 2);
    } catch (e) {
        return String(obj);
    }
}

// Expose functions to global scope for debugging
window.MiddlewareDemo = {
    state: AppState,
    logMessage: logMessage,
    handleTestClick: handleTestClick,
    handleFetchClick: handleFetchClick,
    formatJSON: formatJSON
};

console.log('🚀 Middleware Demo JavaScript loaded successfully!');
console.log('📁 Static files served from wwwroot folder');
console.log('🔧 Middleware is handling HTTP requests');

