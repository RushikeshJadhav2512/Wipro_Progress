export declare enum TaskPriority {
    LOW = "low",
    MEDIUM = "medium",
    HIGH = "high",
    CRITICAL = "critical"
}
export declare enum TaskStatus {
    TODO = "todo",
    IN_PROGRESS = "in_progress",
    REVIEW = "review",
    DONE = "done",
    ARCHIVED = "archived"
}
export interface User {
    readonly id: string;
    name: string;
    email: string;
    avatar?: string;
    role: 'admin' | 'manager' | 'member' | 'viewer';
    createdAt: Date;
    lastLogin?: Date;
}
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
export interface SubTask {
    readonly id: string;
    title: string;
    completed: boolean;
}
export interface Attachment {
    readonly id: string;
    name: string;
    url: string;
    size: number;
    mimeType: string;
    uploadedAt: Date;
    uploadedBy: string;
}
export interface Comment {
    readonly id: string;
    content: string;
    authorId: string;
    author?: User;
    createdAt: Date;
    updatedAt?: Date;
}
export interface TaskFilter {
    status?: TaskStatus[];
    priority?: TaskPriority[];
    assigneeId?: string;
    tags?: string[];
    dueBefore?: Date;
    dueAfter?: Date;
    searchTerm?: string;
}
export interface TaskSort {
    field: 'dueDate' | 'priority' | 'status' | 'createdAt' | 'title';
    direction: 'asc' | 'desc';
}
export interface PaginationOptions {
    page: number;
    limit: number;
}
export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}
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
export type NotificationType = 'task_assigned' | 'task_updated' | 'comment_added' | 'due_date_approaching' | 'project_invite';
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
export interface DashboardStats {
    totalTasks: number;
    completedTasks: number;
    overdueTasks: number;
    tasksByStatus: Record<TaskStatus, number>;
    tasksByPriority: Record<TaskPriority, number>;
    upcomingDeadlines: Task[];
    recentActivity: ActivityLog[];
}
export interface ActivityLog {
    readonly id: string;
    userId: string;
    action: string;
    entityType: 'task' | 'project' | 'comment';
    entityId: string;
    timestamp: Date;
    details?: Record<string, unknown>;
}
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
export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
    timestamp: Date;
}
export interface CreateTaskInput {
    title: string;
    description: string;
    priority?: TaskPriority;
    dueDate?: Date;
    assigneeId?: string;
    tags?: string[];
    projectId?: string;
}
export interface UpdateTaskInput {
    title?: string;
    description?: string;
    priority?: TaskPriority;
    status?: TaskStatus;
    dueDate?: Date | null;
    assigneeId?: string | null;
    tags?: string[];
}
export type TaskEventHandler = (task: Task) => void;
export type ErrorEventHandler = (error: Error) => void;
export type ProgressEventHandler = (progress: number) => void;
//# sourceMappingURL=index.d.ts.map