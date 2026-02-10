import { Task, TaskStatus, CreateTaskInput, DashboardStats } from './types';
declare class TaskFlowPro {
    private taskService;
    private taskRepository;
    private currentUser;
    constructor();
    initialize(): Promise<void>;
    private getVersion;
    private loadData;
    private getDefaultUser;
    private createDemoTasks;
    private setupAutoSave;
    private setupEventHandlers;
    private saveData;
    private displayDashboardStats;
    createTask(input: CreateTaskInput): Task;
    getTasksByStatus(): Map<TaskStatus, Task[]>;
    getDashboardStats(): DashboardStats;
    exportTasks(): string;
    importTasks(json: string): {
        imported: number;
        errors: string[];
    };
    shutdown(): void;
}
declare function main(): Promise<void>;
export { TaskFlowPro, main };
//# sourceMappingURL=main.d.ts.map