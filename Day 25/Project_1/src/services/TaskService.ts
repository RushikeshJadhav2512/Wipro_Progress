// ==========================================================================
// TaskFlowPro Task Service
// Module 2: Tooling, Build & Execution in TypeScript
// ==========================================================================

import {
    Task,
    User,
    TaskPriority,
    TaskStatus,
    CreateTaskInput,
    UpdateTaskInput,
    TaskFilter,
    TaskSort,
    PaginationOptions,
    PaginatedResponse,
    SubTask,
    Comment,
    Attachment,
    DashboardStats,
    ActivityLog
} from '../types';
import { generateId, filterTasks, sortTasks } from '../utils';

/**
 * Task Service - Handles all task-related operations
 * Demonstrates: Classes, async/await, Promises, Error handling
 */
export class TaskService {
    private tasks: Map<string, Task> = new Map();
    private currentUser: User | null = null;

    constructor(initialTasks?: Task[]) {
        if (initialTasks) {
            initialTasks.forEach(task => {
                this.tasks.set(task.id, { ...task });
            });
        }
    }

    /**
     * Set current user context
     */
    setCurrentUser(user: User): void {
        this.currentUser = user;
    }

    /**
     * Get all tasks
     */
    getAllTasks(): Task[] {
        return Array.from(this.tasks.values());
    }

    /**
     * Get task by ID
     */
    getTaskById(id: string): Task | undefined {
        return this.tasks.get(id);
    }

    /**
     * Create a new task (US-JS-03: Reusable functions)
     */
    createTask(input: CreateTaskInput): Task {
        const now = new Date();
        
        const task: Task = {
            id: generateId(),
            title: input.title,
            description: input.description,
            priority: input.priority ?? TaskPriority.MEDIUM,
            status: TaskStatus.TODO,
            dueDate: input.dueDate,
            assigneeId: input.assigneeId,
            tags: input.tags ?? [],
            createdAt: now,
            updatedAt: now,
            subtasks: [],
            attachments: [],
            comments: []
        };

        this.tasks.set(task.id, task);
        
        // Log activity
        this.logActivity('create', 'task', task.id, { title: task.title });
        
        return task;
    }

    /**
     * Update an existing task
     */
    updateTask(id: string, updates: UpdateTaskInput): Task | undefined {
        const task = this.tasks.get(id);
        if (!task) {
            throw new Error(`Task with ID ${id} not found`);
        }

        const updatedTask: Task = {
            ...task,
            title: updates.title ?? task.title,
            description: updates.description ?? task.description,
            priority: updates.priority ?? task.priority,
            status: updates.status ?? task.status,
            dueDate: updates.dueDate !== undefined && updates.dueDate !== null 
                ? updates.dueDate 
                : task.dueDate,
            assigneeId: updates.assigneeId !== undefined ? updates.assigneeId ?? undefined : task.assigneeId,
            tags: updates.tags ?? task.tags,
            updatedAt: new Date()
        };

        this.tasks.set(id, updatedTask);
        
        // Log activity
        this.logActivity('update', 'task', id, { updates: Object.keys(updates) });
        
        return updatedTask;
    }

    /**
     * Delete a task
     */
    deleteTask(id: string): boolean {
        const deleted = this.tasks.delete(id);
        
        if (deleted) {
            this.logActivity('delete', 'task', id, {});
        }
        
        return deleted;
    }

    /**
     * Add subtask to task
     */
    addSubtask(taskId: string, title: string): SubTask | undefined {
        const task = this.tasks.get(taskId);
        if (!task) return undefined;

        const subtask: SubTask = {
            id: generateId(),
            title,
            completed: false
        };

        task.subtasks.push(subtask);
        task.updatedAt = new Date();
        
        return subtask;
    }

    /**
     * Toggle subtask completion
     */
    toggleSubtask(taskId: string, subtaskId: string): boolean {
        const task = this.tasks.get(taskId);
        if (!task) return false;

        const subtask = task.subtasks.find(st => st.id === subtaskId);
        if (!subtask) return false;

        subtask.completed = !subtask.completed;
        task.updatedAt = new Date();
        
        // Check if all subtasks are complete
        if (task.subtasks.every(st => st.completed)) {
            task.status = TaskStatus.DONE;
        } else if (task.status === TaskStatus.DONE) {
            task.status = TaskStatus.IN_PROGRESS;
        }
        
        return true;
    }

    /**
     * Add comment to task
     */
    addComment(taskId: string, content: string): Comment | undefined {
        const task = this.tasks.get(taskId);
        if (!task) return undefined;

        const comment: Comment = {
            id: generateId(),
            content,
            authorId: this.currentUser?.id ?? 'anonymous',
            createdAt: new Date()
        };

        task.comments.push(comment);
        task.updatedAt = new Date();
        
        return comment;
    }

    /**
     * Add attachment to task
     */
    addAttachment(
        taskId: string,
        attachment: Omit<Attachment, 'id' | 'uploadedAt' | 'uploadedBy'>
    ): Attachment | undefined {
        const task = this.tasks.get(taskId);
        if (!task) return undefined;

        const newAttachment: Attachment = {
            ...attachment,
            id: generateId(),
            uploadedAt: new Date(),
            uploadedBy: this.currentUser?.id ?? 'anonymous'
        };

        task.attachments.push(newAttachment);
        task.updatedAt = new Date();
        
        return newAttachment;
    }

    /**
     * Filter and sort tasks (US-JS-04: Arrays and strings)
     */
    queryTasks(
        filter?: TaskFilter,
        sort?: TaskSort[],
        pagination?: PaginationOptions
    ): PaginatedResponse<Task> {
        let results = this.getAllTasks();

        // Apply filters
        if (filter) {
            results = filterTasks(results, filter);
        }

        // Apply sorting
        if (sort && sort.length > 0) {
            results = sortTasks(results, sort);
        } else {
            // Default sort by creation date
            results = sortTasks(results, [{ field: 'createdAt', direction: 'desc' }]);
        }

        // Apply pagination
        const total = results.length;
        let page = 1;
        let limit = total;

        if (pagination) {
            page = pagination.page;
            limit = pagination.limit;
            const start = (page - 1) * limit;
            results = results.slice(start, start + limit);
        }

        const totalPages = Math.ceil(total / limit);

        return {
            data: results,
            total,
            page,
            limit,
            totalPages
        };
    }

    /**
     * Get dashboard statistics (US-AJS-05: Date and Time)
     */
    getDashboardStats(): DashboardStats {
        const tasks = this.getAllTasks();
        const now = new Date();
        const twoDaysFromNow = new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000);

        // Count by status
        const tasksByStatus = {} as Record<TaskStatus, number>;
        const tasksByPriority = {} as Record<TaskPriority, number>;
        
        Object.values(TaskStatus).forEach(status => {
            tasksByStatus[status] = 0;
        });
        
        Object.values(TaskPriority).forEach(priority => {
            tasksByPriority[priority] = 0;
        });

        tasks.forEach(task => {
            tasksByStatus[task.status]++;
            tasksByPriority[task.priority]++;
        });

        // Find overdue tasks
        const overdueTasks = tasks.filter(
            task => task.dueDate && new Date(task.dueDate) < now && task.status !== TaskStatus.DONE
        );

        // Upcoming deadlines (next 7 days)
        const upcomingDeadlines = tasks
            .filter(task => {
                if (!task.dueDate) return false;
                const dueDate = new Date(task.dueDate);
                return dueDate >= now && dueDate <= twoDaysFromNow && task.status !== TaskStatus.DONE;
            })
            .sort((a, b) => {
                if (!a.dueDate || !b.dueDate) return 0;
                return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
            })
            .slice(0, 5);

        // Recent activity (placeholder)
        const recentActivity: ActivityLog[] = [];

        return {
            totalTasks: tasks.length,
            completedTasks: tasks.filter(t => t.status === TaskStatus.DONE).length,
            overdueTasks: overdueTasks.length,
            tasksByStatus,
            tasksByPriority,
            upcomingDeadlines,
            recentActivity
        };
    }

    /**
     * Export tasks to JSON (US-JSON-01)
     */
    exportToJSON(): string {
        const data = {
            tasks: this.getAllTasks(),
            exportedAt: new Date().toISOString(),
            version: '1.0'
        };
        return JSON.stringify(data, null, 2);
    }

    /**
     * Import tasks from JSON
     */
    importFromJSON(json: string): { imported: number; errors: string[] } {
        const errors: string[] = [];
        let imported = 0;

        try {
            const data = JSON.parse(json);
            const tasks = data.tasks as Task[];

            tasks.forEach(task => {
                try {
                    if (this.validateTask(task)) {
                        this.tasks.set(task.id, { ...task });
                        imported++;
                    }
                } catch (err) {
                    errors.push(`Failed to import task: ${task.id}`);
                }
            });
        } catch {
            errors.push('Invalid JSON format');
        }

        return { imported, errors };
    }

    /**
     * Validate task data
     */
    private validateTask(task: Partial<Task>): task is Task {
        if (!task.id || !task.title || !task.description) {
            return false;
        }
        return true;
    }

    /**
     * Internal activity logging
     */
    private logActivity(
        action: string,
        entityType: 'task' | 'project' | 'comment',
        entityId: string,
        details: Record<string, unknown>
    ): void {
        if (!this.currentUser) return;
        
        const activity: ActivityLog = {
            id: generateId(),
            userId: this.currentUser.id,
            action,
            entityType,
            entityId,
            timestamp: new Date(),
            details
        };
        
        console.log(`[Activity] ${this.currentUser.name} ${action}d ${entityType} ${entityId}`);
    }
}

/**
 * Task Repository - Data access layer
 */
export class TaskRepository {
    private storageKey = 'taskflow_tasks';

    /**
     * Save tasks to localStorage
     */
    save(tasks: Task[]): void {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(tasks));
        } catch (error) {
            console.error('Failed to save tasks:', error);
        }
    }

    /**
     * Load tasks from localStorage
     */
    load(): Task[] {
        try {
            const data = localStorage.getItem(this.storageKey);
            if (!data) return [];
            return JSON.parse(data) as Task[];
        } catch {
            return [];
        }
    }

    /**
     * Clear all tasks
     */
    clear(): void {
        localStorage.removeItem(this.storageKey);
    }
}

/**
 * Task Factory - Creates task instances
 */
export class TaskFactory {
    static create(input: CreateTaskInput): Task {
        return {
            id: generateId(),
            title: input.title,
            description: input.description,
            priority: input.priority ?? TaskPriority.MEDIUM,
            status: TaskStatus.TODO,
            dueDate: input.dueDate,
            assigneeId: input.assigneeId,
            tags: input.tags ?? [],
            createdAt: new Date(),
            updatedAt: new Date(),
            subtasks: [],
            attachments: [],
            comments: []
        };
    }

    static fromTemplate(template: Partial<Task>): Task {
        return {
            id: generateId(),
            title: template.title ?? 'New Task',
            description: template.description ?? '',
            priority: template.priority ?? TaskPriority.MEDIUM,
            status: TaskStatus.TODO,
            dueDate: template.dueDate,
            assigneeId: template.assigneeId,
            tags: template.tags ?? [],
            createdAt: new Date(),
            updatedAt: new Date(),
            subtasks: template.subtasks ?? [],
            attachments: template.attachments ?? [],
            comments: template.comments ?? []
        };
    }
}

