import { Task, User, CreateTaskInput, UpdateTaskInput, TaskFilter, TaskSort, PaginationOptions, PaginatedResponse, SubTask, Comment, Attachment, DashboardStats } from '../types';
export declare class TaskService {
    private tasks;
    private currentUser;
    constructor(initialTasks?: Task[]);
    setCurrentUser(user: User): void;
    getAllTasks(): Task[];
    getTaskById(id: string): Task | undefined;
    createTask(input: CreateTaskInput): Task;
    updateTask(id: string, updates: UpdateTaskInput): Task | undefined;
    deleteTask(id: string): boolean;
    addSubtask(taskId: string, title: string): SubTask | undefined;
    toggleSubtask(taskId: string, subtaskId: string): boolean;
    addComment(taskId: string, content: string): Comment | undefined;
    addAttachment(taskId: string, attachment: Omit<Attachment, 'id' | 'uploadedAt' | 'uploadedBy'>): Attachment | undefined;
    queryTasks(filter?: TaskFilter, sort?: TaskSort[], pagination?: PaginationOptions): PaginatedResponse<Task>;
    getDashboardStats(): DashboardStats;
    exportToJSON(): string;
    importFromJSON(json: string): {
        imported: number;
        errors: string[];
    };
    private validateTask;
    private logActivity;
}
export declare class TaskRepository {
    private storageKey;
    save(tasks: Task[]): void;
    load(): Task[];
    clear(): void;
}
export declare class TaskFactory {
    static create(input: CreateTaskInput): Task;
    static fromTemplate(template: Partial<Task>): Task;
}
//# sourceMappingURL=TaskService.d.ts.map