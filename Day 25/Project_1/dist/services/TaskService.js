"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskFactory = exports.TaskRepository = exports.TaskService = void 0;
const types_1 = require("../types");
const utils_1 = require("../utils");
class TaskService {
    constructor(initialTasks) {
        this.tasks = new Map();
        this.currentUser = null;
        if (initialTasks) {
            initialTasks.forEach(task => {
                this.tasks.set(task.id, { ...task });
            });
        }
    }
    setCurrentUser(user) {
        this.currentUser = user;
    }
    getAllTasks() {
        return Array.from(this.tasks.values());
    }
    getTaskById(id) {
        return this.tasks.get(id);
    }
    createTask(input) {
        const now = new Date();
        const task = {
            id: (0, utils_1.generateId)(),
            title: input.title,
            description: input.description,
            priority: input.priority ?? types_1.TaskPriority.MEDIUM,
            status: types_1.TaskStatus.TODO,
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
        this.logActivity('create', 'task', task.id, { title: task.title });
        return task;
    }
    updateTask(id, updates) {
        const task = this.tasks.get(id);
        if (!task) {
            throw new Error(`Task with ID ${id} not found`);
        }
        const updatedTask = {
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
        this.logActivity('update', 'task', id, { updates: Object.keys(updates) });
        return updatedTask;
    }
    deleteTask(id) {
        const deleted = this.tasks.delete(id);
        if (deleted) {
            this.logActivity('delete', 'task', id, {});
        }
        return deleted;
    }
    addSubtask(taskId, title) {
        const task = this.tasks.get(taskId);
        if (!task)
            return undefined;
        const subtask = {
            id: (0, utils_1.generateId)(),
            title,
            completed: false
        };
        task.subtasks.push(subtask);
        task.updatedAt = new Date();
        return subtask;
    }
    toggleSubtask(taskId, subtaskId) {
        const task = this.tasks.get(taskId);
        if (!task)
            return false;
        const subtask = task.subtasks.find(st => st.id === subtaskId);
        if (!subtask)
            return false;
        subtask.completed = !subtask.completed;
        task.updatedAt = new Date();
        if (task.subtasks.every(st => st.completed)) {
            task.status = types_1.TaskStatus.DONE;
        }
        else if (task.status === types_1.TaskStatus.DONE) {
            task.status = types_1.TaskStatus.IN_PROGRESS;
        }
        return true;
    }
    addComment(taskId, content) {
        const task = this.tasks.get(taskId);
        if (!task)
            return undefined;
        const comment = {
            id: (0, utils_1.generateId)(),
            content,
            authorId: this.currentUser?.id ?? 'anonymous',
            createdAt: new Date()
        };
        task.comments.push(comment);
        task.updatedAt = new Date();
        return comment;
    }
    addAttachment(taskId, attachment) {
        const task = this.tasks.get(taskId);
        if (!task)
            return undefined;
        const newAttachment = {
            ...attachment,
            id: (0, utils_1.generateId)(),
            uploadedAt: new Date(),
            uploadedBy: this.currentUser?.id ?? 'anonymous'
        };
        task.attachments.push(newAttachment);
        task.updatedAt = new Date();
        return newAttachment;
    }
    queryTasks(filter, sort, pagination) {
        let results = this.getAllTasks();
        if (filter) {
            results = (0, utils_1.filterTasks)(results, filter);
        }
        if (sort && sort.length > 0) {
            results = (0, utils_1.sortTasks)(results, sort);
        }
        else {
            results = (0, utils_1.sortTasks)(results, [{ field: 'createdAt', direction: 'desc' }]);
        }
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
    getDashboardStats() {
        const tasks = this.getAllTasks();
        const now = new Date();
        const twoDaysFromNow = new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000);
        const tasksByStatus = {};
        const tasksByPriority = {};
        Object.values(types_1.TaskStatus).forEach(status => {
            tasksByStatus[status] = 0;
        });
        Object.values(types_1.TaskPriority).forEach(priority => {
            tasksByPriority[priority] = 0;
        });
        tasks.forEach(task => {
            tasksByStatus[task.status]++;
            tasksByPriority[task.priority]++;
        });
        const overdueTasks = tasks.filter(task => task.dueDate && new Date(task.dueDate) < now && task.status !== types_1.TaskStatus.DONE);
        const upcomingDeadlines = tasks
            .filter(task => {
            if (!task.dueDate)
                return false;
            const dueDate = new Date(task.dueDate);
            return dueDate >= now && dueDate <= twoDaysFromNow && task.status !== types_1.TaskStatus.DONE;
        })
            .sort((a, b) => {
            if (!a.dueDate || !b.dueDate)
                return 0;
            return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        })
            .slice(0, 5);
        const recentActivity = [];
        return {
            totalTasks: tasks.length,
            completedTasks: tasks.filter(t => t.status === types_1.TaskStatus.DONE).length,
            overdueTasks: overdueTasks.length,
            tasksByStatus,
            tasksByPriority,
            upcomingDeadlines,
            recentActivity
        };
    }
    exportToJSON() {
        const data = {
            tasks: this.getAllTasks(),
            exportedAt: new Date().toISOString(),
            version: '1.0'
        };
        return JSON.stringify(data, null, 2);
    }
    importFromJSON(json) {
        const errors = [];
        let imported = 0;
        try {
            const data = JSON.parse(json);
            const tasks = data.tasks;
            tasks.forEach(task => {
                try {
                    if (this.validateTask(task)) {
                        this.tasks.set(task.id, { ...task });
                        imported++;
                    }
                }
                catch (err) {
                    errors.push(`Failed to import task: ${task.id}`);
                }
            });
        }
        catch {
            errors.push('Invalid JSON format');
        }
        return { imported, errors };
    }
    validateTask(task) {
        if (!task.id || !task.title || !task.description) {
            return false;
        }
        return true;
    }
    logActivity(action, entityType, entityId, details) {
        if (!this.currentUser)
            return;
        const activity = {
            id: (0, utils_1.generateId)(),
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
exports.TaskService = TaskService;
class TaskRepository {
    constructor() {
        this.storageKey = 'taskflow_tasks';
    }
    save(tasks) {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(tasks));
        }
        catch (error) {
            console.error('Failed to save tasks:', error);
        }
    }
    load() {
        try {
            const data = localStorage.getItem(this.storageKey);
            if (!data)
                return [];
            return JSON.parse(data);
        }
        catch {
            return [];
        }
    }
    clear() {
        localStorage.removeItem(this.storageKey);
    }
}
exports.TaskRepository = TaskRepository;
class TaskFactory {
    static create(input) {
        return {
            id: (0, utils_1.generateId)(),
            title: input.title,
            description: input.description,
            priority: input.priority ?? types_1.TaskPriority.MEDIUM,
            status: types_1.TaskStatus.TODO,
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
    static fromTemplate(template) {
        return {
            id: (0, utils_1.generateId)(),
            title: template.title ?? 'New Task',
            description: template.description ?? '',
            priority: template.priority ?? types_1.TaskPriority.MEDIUM,
            status: types_1.TaskStatus.TODO,
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
exports.TaskFactory = TaskFactory;
//# sourceMappingURL=TaskService.js.map