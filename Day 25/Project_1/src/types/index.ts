// ==========================================================================
// TaskFlowPro Type Definitions
// Module 2: Tooling, Build & Execution in TypeScript
// ==========================================================================

/**
 * Priority levels for tasks
 */
export enum TaskPriority {
    LOW = 'low',
    MEDIUM = 'medium',
    HIGH = 'high',
    CRITICAL = 'critical'
}

/**
 * Status of a task
 */
export enum TaskStatus {
    TODO = 'todo',
    IN_PROGRESS = 'in_progress',
    REVIEW = 'review',
    DONE = 'done',
    ARCHIVED = 'archived'
}

/**
 * User interface representing a team member
 */
export interface User {
    readonly id: string;
    name: string;
    email: string;
    avatar?: string;
    role: 'admin' | 'manager' | 'member' | 'viewer';
    createdAt: Date;
    lastLogin?: Date;
}

/**
 * Task interface representing a single task
 */
export interface Task {
    readonly id: string;
    title: string;
    description: string;
    assigneeId?: string;
    assignee?: User;
    priority: TaskPriority;
    status: TaskStatus;
    dueDate?: Date;
    createdAt: Date;
    updatedAt: Date;
    tags: string[];
    subtasks: SubTask[];
    attachments: Attachment[];
    comments: Comment[];
}

/**
 * Subtask within a task
 */
export interface SubTask {
    readonly id: string;
    title: string;
    completed: boolean;
}

/**
 * File attachment for tasks
 */
export interface Attachment {
    readonly id: string;
    name: string;
    url: string;
    size: number;
    mimeType: string;
    uploadedAt: Date;
    uploadedBy: string;
}

/**
 * Comment on a task
 */
export interface Comment {
    readonly id: string;
    content: string;
    authorId: string;
    author?: User;
    createdAt: Date;
    updatedAt?: Date;
}

/**
 * Filter options for querying tasks
 */
export interface TaskFilter {
    status?: TaskStatus[];
    priority?: TaskPriority[];
    assigneeId?: string;
    tags?: string[];
    dueBefore?: Date;
    dueAfter?: Date;
    searchTerm?: string;
}

/**
 * Sort options for task list
 */
export interface TaskSort {
    field: 'dueDate' | 'priority' | 'status' | 'createdAt' | 'title';
    direction: 'asc' | 'desc';
}

/**
 * Pagination options
 */
export interface PaginationOptions {
    page: number;
    limit: number;
}

/**
 * Paginated response
 */
export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

/**
 * Project interface
 */
export interface Project {
    readonly id: string;
    name: string;
    description: string;
    ownerId: string;
    members: string[];
    taskIds: string[];
    createdAt: Date;
    updatedAt: Date;
    color: string;
    isArchived: boolean;
}

/**
 * Notification types
 */
export type NotificationType = 
    | 'task_assigned'
    | 'task_updated'
    | 'comment_added'
    | 'due_date_approaching'
    | 'project_invite';

/**
 * Notification interface
 */
export interface Notification {
    readonly id: string;
    type: NotificationType;
    userId: string;
    title: string;
    message: string;
    read: boolean;
    createdAt: Date;
    actionUrl?: string;
    metadata?: Record<string, unknown>;
}

/**
 * Dashboard statistics
 */
export interface DashboardStats {
    totalTasks: number;
    completedTasks: number;
    overdueTasks: number;
    tasksByStatus: Record<TaskStatus, number>;
    tasksByPriority: Record<TaskPriority, number>;
    upcomingDeadlines: Task[];
    recentActivity: ActivityLog[];
}

/**
 * Activity log entry
 */
export interface ActivityLog {
    readonly id: string;
    userId: string;
    action: string;
    entityType: 'task' | 'project' | 'comment';
    entityId: string;
    timestamp: Date;
    details?: Record<string, unknown>;
}

/**
 * Application configuration
 */
export interface AppConfig {
    appName: string;
    version: string;
    apiUrl: string;
    enableNotifications: boolean;
    enableDarkMode: boolean;
    defaultProjectId?: string;
    features: {
        enableComments: boolean;
        enableAttachments: boolean;
        enableSubtasks: boolean;
        enableCategories: boolean;
    };
}

/**
 * API response wrapper
 */
export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
    timestamp: Date;
}

/**
 * Create task input
 */
export interface CreateTaskInput {
    title: string;
    description: string;
    priority?: TaskPriority;
    dueDate?: Date;
    assigneeId?: string;
    tags?: string[];
    projectId?: string;
}

/**
 * Update task input
 */
export interface UpdateTaskInput {
    title?: string;
    description?: string;
    priority?: TaskPriority;
    status?: TaskStatus;
    dueDate?: Date | null;
    assigneeId?: string | null;
    tags?: string[];
}

/**
 * Event handler types
 */
export type TaskEventHandler = (task: Task) => void;
export type ErrorEventHandler = (error: Error) => void;
export type ProgressEventHandler = (progress: number) => void;

