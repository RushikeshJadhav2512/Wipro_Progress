"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Storage = void 0;
exports.generateId = generateId;
exports.formatDate = formatDate;
exports.formatRelativeTime = formatRelativeTime;
exports.formatFileSize = formatFileSize;
exports.truncateText = truncateText;
exports.debounce = debounce;
exports.throttle = throttle;
exports.deepClone = deepClone;
exports.arraysEqual = arraysEqual;
exports.unique = unique;
exports.groupBy = groupBy;
exports.sortTasks = sortTasks;
exports.filterTasks = filterTasks;
exports.calculateCompletionPercentage = calculateCompletionPercentage;
exports.isValidEmail = isValidEmail;
exports.capitalize = capitalize;
exports.slugify = slugify;
exports.getInitials = getInitials;
exports.getPriorityColor = getPriorityColor;
exports.getStatusColor = getStatusColor;
exports.isOverdue = isOverdue;
exports.isDueSoon = isDueSoon;
exports.getDaysUntilDue = getDaysUntilDue;
exports.delay = delay;
exports.retry = retry;
const types_1 = require("../types");
function generateId() {
    return `${Date.now().toString(36)}-${Math.random().toString(36).substr(2, 9)}`;
}
function formatDate(date, locale = 'en-US') {
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleDateString(locale, {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}
function formatRelativeTime(date) {
    const now = new Date();
    const d = typeof date === 'string' ? new Date(date) : date;
    const diffMs = now.getTime() - d.getTime();
    const diffSecs = Math.floor(diffMs / 1000);
    const diffMins = Math.floor(diffSecs / 60);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);
    if (diffSecs < 60)
        return 'just now';
    if (diffMins < 60)
        return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24)
        return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7)
        return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    return formatDate(d);
}
function formatFileSize(bytes) {
    if (bytes === 0)
        return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}
function truncateText(text, maxLength) {
    if (text.length <= maxLength)
        return text;
    return `${text.substring(0, maxLength - 3)}...`;
}
function debounce(func, wait) {
    let timeoutId = null;
    return function executedFunction(...args) {
        if (timeoutId !== null) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            func(...args);
        }, wait);
    };
}
function throttle(func, limit) {
    let inThrottle = false;
    return function executedFunction(...args) {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => {
                inThrottle = false;
            }, limit);
        }
    };
}
function deepClone(obj) {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }
    if (obj instanceof Date) {
        return new Date(obj.getTime());
    }
    if (obj instanceof Array) {
        return obj.map(item => deepClone(item));
    }
    if (obj instanceof Object) {
        const clonedObj = {};
        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                clonedObj[key] = deepClone(obj[key]);
            }
        }
        return clonedObj;
    }
    throw new Error('Unable to copy object');
}
function arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length)
        return false;
    return arr1.every((value, index) => value === arr2[index]);
}
function unique(arr, key) {
    if (!key) {
        return [...new Set(arr)];
    }
    const seen = new Set();
    return arr.filter(item => {
        const k = item[key];
        if (seen.has(k))
            return false;
        seen.add(k);
        return true;
    });
}
function groupBy(arr, key) {
    return arr.reduce((groups, item) => {
        const groupKey = String(item[key]);
        if (!groups[groupKey]) {
            groups[groupKey] = [];
        }
        groups[groupKey].push(item);
        return groups;
    }, {});
}
function sortTasks(tasks, sort) {
    return [...tasks].sort((a, b) => {
        for (const { field, direction } of sort) {
            const multiplier = direction === 'asc' ? 1 : -1;
            let comparison = 0;
            switch (field) {
                case 'title':
                    comparison = a.title.localeCompare(b.title);
                    break;
                case 'priority':
                    const priorityOrder = {
                        [types_1.TaskPriority.CRITICAL]: 4,
                        [types_1.TaskPriority.HIGH]: 3,
                        [types_1.TaskPriority.MEDIUM]: 2,
                        [types_1.TaskPriority.LOW]: 1
                    };
                    comparison = priorityOrder[a.priority] - priorityOrder[b.priority];
                    break;
                case 'status':
                    const statusOrder = {
                        [types_1.TaskStatus.DONE]: 4,
                        [types_1.TaskStatus.REVIEW]: 3,
                        [types_1.TaskStatus.IN_PROGRESS]: 2,
                        [types_1.TaskStatus.TODO]: 1,
                        [types_1.TaskStatus.ARCHIVED]: 0
                    };
                    comparison = statusOrder[a.status] - statusOrder[b.status];
                    break;
                case 'dueDate':
                    if (a.dueDate && b.dueDate) {
                        comparison = a.dueDate.getTime() - b.dueDate.getTime();
                    }
                    else if (a.dueDate) {
                        comparison = -1;
                    }
                    else if (b.dueDate) {
                        comparison = 1;
                    }
                    break;
                case 'createdAt':
                default:
                    comparison = a.createdAt.getTime() - b.createdAt.getTime();
            }
            if (comparison !== 0) {
                return comparison * multiplier;
            }
        }
        return 0;
    });
}
function filterTasks(tasks, filter) {
    return tasks.filter(task => {
        if (filter.status && filter.status.length > 0) {
            if (!filter.status.includes(task.status))
                return false;
        }
        if (filter.priority && filter.priority.length > 0) {
            if (!filter.priority.includes(task.priority))
                return false;
        }
        if (filter.assigneeId) {
            if (task.assigneeId !== filter.assigneeId)
                return false;
        }
        if (filter.tags && filter.tags.length > 0) {
            const hasAllTags = filter.tags.every(tag => task.tags.includes(tag));
            if (!hasAllTags)
                return false;
        }
        if (filter.dueBefore) {
            if (task.dueDate && task.dueDate > filter.dueBefore)
                return false;
        }
        if (filter.dueAfter) {
            if (task.dueDate && task.dueDate < filter.dueAfter)
                return false;
        }
        if (filter.searchTerm) {
            const term = filter.searchTerm.toLowerCase();
            const matchesTitle = task.title.toLowerCase().includes(term);
            const matchesDescription = task.description.toLowerCase().includes(term);
            if (!matchesTitle && !matchesDescription)
                return false;
        }
        return true;
    });
}
function calculateCompletionPercentage(task) {
    if (task.subtasks.length === 0) {
        return task.status === types_1.TaskStatus.DONE ? 100 : 0;
    }
    const completedSubtasks = task.subtasks.filter(st => st.completed).length;
    return Math.round((completedSubtasks / task.subtasks.length) * 100);
}
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
function slugify(str) {
    return str
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
}
function getInitials(name) {
    return name
        .split(' ')
        .map(word => word.charAt(0).toUpperCase())
        .slice(0, 2)
        .join('');
}
function getPriorityColor(priority) {
    const colors = {
        [types_1.TaskPriority.LOW]: 'success',
        [types_1.TaskPriority.MEDIUM]: 'warning',
        [types_1.TaskPriority.HIGH]: 'danger',
        [types_1.TaskPriority.CRITICAL]: 'dark'
    };
    return colors[priority];
}
function getStatusColor(status) {
    const colors = {
        [types_1.TaskStatus.TODO]: 'secondary',
        [types_1.TaskStatus.IN_PROGRESS]: 'primary',
        [types_1.TaskStatus.REVIEW]: 'info',
        [types_1.TaskStatus.DONE]: 'success',
        [types_1.TaskStatus.ARCHIVED]: 'light'
    };
    return colors[status];
}
function isOverdue(dueDate) {
    if (!dueDate)
        return false;
    const d = typeof dueDate === 'string' ? new Date(dueDate) : dueDate;
    return d < new Date();
}
function isDueSoon(dueDate) {
    if (!dueDate)
        return false;
    const d = typeof dueDate === 'string' ? new Date(dueDate) : dueDate;
    const now = new Date();
    const twoDaysFromNow = new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000);
    return d <= twoDaysFromNow && d >= now;
}
function getDaysUntilDue(dueDate) {
    if (!dueDate)
        return null;
    const d = typeof dueDate === 'string' ? new Date(dueDate) : dueDate;
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    d.setHours(0, 0, 0, 0);
    const diffTime = d.getTime() - now.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}
exports.Storage = {
    get(key, defaultValue) {
        try {
            const item = localStorage.getItem(key);
            if (item === null)
                return defaultValue;
            return JSON.parse(item);
        }
        catch {
            return defaultValue;
        }
    },
    set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        }
        catch (error) {
            console.error('Failed to save to localStorage:', error);
        }
    },
    remove(key) {
        localStorage.removeItem(key);
    },
    clear() {
        localStorage.clear();
    }
};
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function retry(fn, maxRetries = 3, baseDelay = 1000) {
    let lastError;
    for (let attempt = 0; attempt < maxRetries; attempt++) {
        try {
            return await fn();
        }
        catch (error) {
            lastError = error;
            if (attempt < maxRetries - 1) {
                const delayMs = baseDelay * Math.pow(2, attempt);
                await delay(delayMs);
            }
        }
    }
    throw lastError;
}
//# sourceMappingURL=index.js.map