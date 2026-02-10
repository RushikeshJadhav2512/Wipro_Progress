// ==========================================================================
// TaskFlowPro Utility Functions
// Module 2: Tooling, Build & Execution in TypeScript
// ==========================================================================

import { TaskStatus, TaskPriority, Task, User, TaskFilter, TaskSort } from '../types';

/**
 * Generate a unique ID
 */
export function generateId(): string {
    return `${Date.now().toString(36)}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Format a date to locale string
 */
export function formatDate(date: Date | string, locale = 'en-US'): string {
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleDateString(locale, {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

/**
 * Format relative time (e.g., "2 hours ago")
 */
export function formatRelativeTime(date: Date | string): string {
    const now = new Date();
    const d = typeof date === 'string' ? new Date(date) : date;
    const diffMs = now.getTime() - d.getTime();
    const diffSecs = Math.floor(diffMs / 1000);
    const diffMins = Math.floor(diffSecs / 60);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffSecs < 60) return 'just now';
    if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    return formatDate(d);
}

/**
 * Format file size to human readable
 */
export function formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

/**
 * Truncate text with ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return `${text.substring(0, maxLength - 3)}...`;
}

/**
 * Debounce function for performance optimization (US-PERF-01)
 */
export function debounce<T extends (...args: Parameters<T>) => ReturnType<T>>(
    func: T,
    wait: number
): (...args: Parameters<T>) => void {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    return function executedFunction(...args: Parameters<T>): void {
        if (timeoutId !== null) {
            clearTimeout(timeoutId);
        }

        timeoutId = setTimeout(() => {
            func(...args);
        }, wait);
    };
}

/**
 * Throttle function for scroll events (US-PERF-01)
 */
export function throttle<T extends (...args: Parameters<T>) => ReturnType<T>>(
    func: T,
    limit: number
): (...args: Parameters<T>) => void {
    let inThrottle = false;

    return function executedFunction(...args: Parameters<T>): void {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => {
                inThrottle = false;
            }, limit);
        }
    };
}

/**
 * Deep clone an object
 */
export function deepClone<T>(obj: T): T {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }

    if (obj instanceof Date) {
        return new Date(obj.getTime()) as unknown as T;
    }

    if (obj instanceof Array) {
        return obj.map(item => deepClone(item)) as unknown as T;
    }

    if (obj instanceof Object) {
        const clonedObj: Record<string, unknown> = {};
        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                clonedObj[key] = deepClone((obj as Record<string, unknown>)[key]);
            }
        }
        return clonedObj as T;
    }

    throw new Error('Unable to copy object');
}

/**
 * Check if two arrays are equal
 */
export function arraysEqual<T>(arr1: T[], arr2: T[]): boolean {
    if (arr1.length !== arr2.length) return false;
    return arr1.every((value, index) => value === arr2[index]);
}

/**
 * Remove duplicates from array
 */
export function unique<T>(arr: T[], key?: keyof T): T[] {
    if (!key) {
        return [...new Set(arr)];
    }
    const seen = new Set();
    return arr.filter(item => {
        const k = item[key];
        if (seen.has(k)) return false;
        seen.add(k);
        return true;
    });
}

/**
 * Group array items by key
 */
export function groupBy<T>(arr: T[], key: keyof T): Record<string, T[]> {
    return arr.reduce((groups, item) => {
        const groupKey = String(item[key]);
        if (!groups[groupKey]) {
            groups[groupKey] = [];
        }
        groups[groupKey].push(item);
        return groups;
    }, {} as Record<string, T[]>);
}

/**
 * Sort tasks by multiple criteria
 */
export function sortTasks(
    tasks: Task[],
    sort: TaskSort[]
): Task[] {
    return [...tasks].sort((a, b) => {
        for (const { field, direction } of sort) {
            const multiplier = direction === 'asc' ? 1 : -1;
            let comparison = 0;

            switch (field) {
                case 'title':
                    comparison = a.title.localeCompare(b.title);
                    break;
                case 'priority':
                    const priorityOrder: Record<TaskPriority, number> = {
                        [TaskPriority.CRITICAL]: 4,
                        [TaskPriority.HIGH]: 3,
                        [TaskPriority.MEDIUM]: 2,
                        [TaskPriority.LOW]: 1
                    };
                    comparison = priorityOrder[a.priority] - priorityOrder[b.priority];
                    break;
                case 'status':
                    const statusOrder: Record<TaskStatus, number> = {
                        [TaskStatus.DONE]: 4,
                        [TaskStatus.REVIEW]: 3,
                        [TaskStatus.IN_PROGRESS]: 2,
                        [TaskStatus.TODO]: 1,
                        [TaskStatus.ARCHIVED]: 0
                    };
                    comparison = statusOrder[a.status] - statusOrder[b.status];
                    break;
                case 'dueDate':
                    if (a.dueDate && b.dueDate) {
                        comparison = a.dueDate.getTime() - b.dueDate.getTime();
                    } else if (a.dueDate) {
                        comparison = -1;
                    } else if (b.dueDate) {
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

/**
 * Filter tasks based on criteria (US-JS-04)
 */
export function filterTasks(tasks: Task[], filter: TaskFilter): Task[] {
    return tasks.filter(task => {
        // Status filter
        if (filter.status && filter.status.length > 0) {
            if (!filter.status.includes(task.status)) return false;
        }

        // Priority filter
        if (filter.priority && filter.priority.length > 0) {
            if (!filter.priority.includes(task.priority)) return false;
        }

        // Assignee filter
        if (filter.assigneeId) {
            if (task.assigneeId !== filter.assigneeId) return false;
        }

        // Tags filter
        if (filter.tags && filter.tags.length > 0) {
            const hasAllTags = filter.tags.every(tag => task.tags.includes(tag));
            if (!hasAllTags) return false;
        }

        // Due date filters
        if (filter.dueBefore) {
            if (task.dueDate && task.dueDate > filter.dueBefore) return false;
        }

        if (filter.dueAfter) {
            if (task.dueDate && task.dueDate < filter.dueAfter) return false;
        }

        // Search term
        if (filter.searchTerm) {
            const term = filter.searchTerm.toLowerCase();
            const matchesTitle = task.title.toLowerCase().includes(term);
            const matchesDescription = task.description.toLowerCase().includes(term);
            if (!matchesTitle && !matchesDescription) return false;
        }

        return true;
    });
}

/**
 * Calculate task completion percentage
 */
export function calculateCompletionPercentage(task: Task): number {
    if (task.subtasks.length === 0) {
        return task.status === TaskStatus.DONE ? 100 : 0;
    }

    const completedSubtasks = task.subtasks.filter(st => st.completed).length;
    return Math.round((completedSubtasks / task.subtasks.length) * 100);
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Capitalize first letter of string
 */
export function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Convert string to slug
 */
export function slugify(str: string): string {
    return str
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

/**
 * Get initials from name
 */
export function getInitials(name: string): string {
    return name
        .split(' ')
        .map(word => word.charAt(0).toUpperCase())
        .slice(0, 2)
        .join('');
}

/**
 * Get priority color class
 */
export function getPriorityColor(priority: TaskPriority): string {
    const colors: Record<TaskPriority, string> = {
        [TaskPriority.LOW]: 'success',
        [TaskPriority.MEDIUM]: 'warning',
        [TaskPriority.HIGH]: 'danger',
        [TaskPriority.CRITICAL]: 'dark'
    };
    return colors[priority];
}

/**
 * Get status color class
 */
export function getStatusColor(status: TaskStatus): string {
    const colors: Record<TaskStatus, string> = {
        [TaskStatus.TODO]: 'secondary',
        [TaskStatus.IN_PROGRESS]: 'primary',
        [TaskStatus.REVIEW]: 'info',
        [TaskStatus.DONE]: 'success',
        [TaskStatus.ARCHIVED]: 'light'
    };
    return colors[status];
}

/**
 * Check if date is overdue
 */
export function isOverdue(dueDate: Date | string | undefined): boolean {
    if (!dueDate) return false;
    const d = typeof dueDate === 'string' ? new Date(dueDate) : dueDate;
    return d < new Date();
}

/**
 * Check if due date is approaching (within 2 days)
 */
export function isDueSoon(dueDate: Date | string | undefined): boolean {
    if (!dueDate) return false;
    const d = typeof dueDate === 'string' ? new Date(dueDate) : dueDate;
    const now = new Date();
    const twoDaysFromNow = new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000);
    return d <= twoDaysFromNow && d >= now;
}

/**
 * Get remaining days until due date
 */
export function getDaysUntilDue(dueDate: Date | string | undefined): number | null {
    if (!dueDate) return null;
    const d = typeof dueDate === 'string' ? new Date(dueDate) : dueDate;
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    d.setHours(0, 0, 0, 0);
    const diffTime = d.getTime() - now.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

/**
 * Local storage helpers with type safety
 */
export const Storage = {
    get<T>(key: string, defaultValue: T): T {
        try {
            const item = localStorage.getItem(key);
            if (item === null) return defaultValue;
            return JSON.parse(item) as T;
        } catch {
            return defaultValue;
        }
    },

    set<T>(key: string, value: T): void {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error('Failed to save to localStorage:', error);
        }
    },

    remove(key: string): void {
        localStorage.removeItem(key);
    },

    clear(): void {
        localStorage.clear();
    }
};

/**
 * Delay helper for async operations (US-AJS-03)
 */
export function delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Retry operation with exponential backoff
 */
export async function retry<T>(
    fn: () => Promise<T>,
    maxRetries = 3,
    baseDelay = 1000
): Promise<T> {
    let lastError: Error | undefined;

    for (let attempt = 0; attempt < maxRetries; attempt++) {
        try {
            return await fn();
        } catch (error) {
            lastError = error as Error;
            if (attempt < maxRetries - 1) {
                const delayMs = baseDelay * Math.pow(2, attempt);
                await delay(delayMs);
            }
        }
    }

    throw lastError;
}

