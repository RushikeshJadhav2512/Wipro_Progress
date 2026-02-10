// ==========================================================================
// TaskFlowPro - Main Entry Point
// Module 2: Tooling, Build & Execution in TypeScript
// ==========================================================================

/**
 * TaskFlowPro Application
 * 
 * This is the main entry point for the TaskFlowPro TypeScript SPA.
 * It demonstrates:
 * - TypeScript compilation and execution (US-TS-09)
 * - NPM scripts for build and execution (US-TS-10)
 * - Source maps for debugging (US-TS-11)
 * - Clean folder structure (US-TS-13, US-TS-14)
 * - Strict compiler options (US-TS-08)
 */

// ==========================================================================
// Imports - Demonstrating ES6+ module syntax (US-AJS-01, US-AJS-02)
// ==========================================================================

import {
    Task,
    User,
    TaskPriority,
    TaskStatus,
    CreateTaskInput,
    TaskFilter,
    DashboardStats
} from './types';

import {
    TaskService,
    TaskRepository,
    TaskFactory
} from './services';

import {
    formatDate,
    formatRelativeTime,
    debounce,
    throttle,
    groupBy,
    calculateCompletionPercentage,
    getPriorityColor,
    getStatusColor,
    isOverdue,
    Storage
} from './utils';

// ==========================================================================
// Application Class - Demonstrating OOP concepts
// ==========================================================================

/**
 * Main Application Class
 * Handles initialization and coordination of all services
 */
class TaskFlowPro {
    private taskService: TaskService;
    private taskRepository: TaskRepository;
    private currentUser: User | null = null;

    constructor() {
        this.taskRepository = new TaskRepository();
        this.taskService = new TaskService();
        
        // Load saved data
        this.loadData();
    }

    /**
     * Initialize the application
     */
    public async initialize(): Promise<void> {
        console.log('🚀 TaskFlowPro initializing...');
        console.log(`📦 Version: ${this.getVersion()}`);
        console.log(`📁 Source maps enabled for debugging`);
        
        // Set up current user
        this.currentUser = this.getDefaultUser();
        this.taskService.setCurrentUser(this.currentUser);
        
        // Create demo tasks
        this.createDemoTasks();
        
        // Set up storage persistence
        this.setupAutoSave();
        
        // Set up event handlers
        this.setupEventHandlers();
        
        console.log('✅ TaskFlowPro initialized successfully!');
        console.log(`👤 Logged in as: ${this.currentUser.name}`);
        
        // Display initial stats
        this.displayDashboardStats();
    }

    /**
     * Get application version
     */
    private getVersion(): string {
        return '1.0.0';
    }

    /**
     * Load data from storage
     */
    private loadData(): void {
        const tasks = this.taskRepository.load();
        if (tasks.length > 0) {
            this.taskService = new TaskService(tasks);
            console.log(`📥 Loaded ${tasks.length} tasks from storage`);
        }
    }

    /**
     * Get default user
     */
    private getDefaultUser(): User {
        return {
            id: 'user-001',
            name: 'Demo User',
            email: 'demo@taskflowpro.com',
            role: 'admin',
            createdAt: new Date()
        };
    }

    /**
     * Create demo tasks
     */
    private createDemoTasks(): void {
        const demoTasks: CreateTaskInput[] = [
            {
                title: 'Complete project documentation',
                description: 'Write comprehensive documentation for TaskFlowPro',
                priority: TaskPriority.HIGH,
                dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
                tags: ['documentation', 'important']
            },
            {
                title: 'Review pull requests',
                description: 'Review pending PRs from the team',
                priority: TaskPriority.MEDIUM,
                dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
                tags: ['code-review', 'team']
            },
            {
                title: 'Set up CI/CD pipeline',
                description: 'Configure GitHub Actions for automated testing and deployment',
                priority: TaskPriority.HIGH,
                tags: ['devops', 'automation']
            },
            {
                title: 'Update dependencies',
                description: 'Check and update npm packages to latest versions',
                priority: TaskPriority.LOW,
                tags: ['maintenance']
            },
            {
                title: 'Write unit tests',
                description: 'Increase test coverage for TaskService class',
                priority: TaskPriority.MEDIUM,
                dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
                tags: ['testing', 'quality']
            }
        ];

        // Only create if no tasks exist
        if (this.taskService.getAllTasks().length === 0) {
            demoTasks.forEach(task => {
                this.taskService.createTask(task);
            });
            console.log(`📝 Created ${demoTasks.length} demo tasks`);
        }
    }

    /**
     * Set up auto-save functionality
     */
    private setupAutoSave(): void {
        // Auto-save every 30 seconds (US-PERF-01: Debouncing)
        const autoSave = debounce(() => {
            this.saveData();
        }, 30000);

        // Listen for changes (browser only)
        if (typeof document !== 'undefined') {
            document?.addEventListener?.('task-updated', autoSave);
            document?.addEventListener?.('task-created', autoSave);
            document?.addEventListener?.('task-deleted', autoSave);
        }

        console.log('💾 Auto-save enabled (every 30 seconds)');
    }

    /**
     * Set up event handlers
     */
    private setupEventHandlers(): void {
        // Throttled resize handler (browser only)
        if (typeof window !== 'undefined') {
            const handleResize = throttle(() => {
                console.log(`📐 Window resized: ${window.innerWidth}x${window.innerHeight}`);
            }, 250);

            window.addEventListener('resize', handleResize);
        }
    }

    /**
     * Save data to storage
     */
    private saveData(): void {
        const tasks = this.taskService.getAllTasks();
        this.taskRepository.save(tasks);
        console.log('💾 Data saved to localStorage');
    }

    /**
     * Display dashboard statistics
     */
    private displayDashboardStats(): void {
        const stats = this.taskService.getDashboardStats();
        
        console.log('\n📊 Dashboard Statistics:');
        console.log(`   Total Tasks: ${stats.totalTasks}`);
        console.log(`   Completed: ${stats.completedTasks}`);
        console.log(`   Overdue: ${stats.overdueTasks}`);
        console.log('------------------------------');
    }

    /**
     * Create a new task
     */
    public createTask(input: CreateTaskInput): Task {
        const task = this.taskService.createTask(input);
        console.log(`✅ Created task: ${task.title}`);
        return task;
    }

    /**
     * Get all tasks grouped by status
     */
    public getTasksByStatus(): Map<TaskStatus, Task[]> {
        const tasks = this.taskService.getAllTasks();
        return groupBy(tasks, 'status') as unknown as Map<TaskStatus, Task[]>;
    }

    /**
     * Get dashboard stats
     */
    public getDashboardStats(): DashboardStats {
        return this.taskService.getDashboardStats();
    }

    /**
     * Export tasks to JSON
     */
    public exportTasks(): string {
        const json = this.taskService.exportToJSON();
        console.log('📤 Tasks exported to JSON');
        return json;
    }

    /**
     * Import tasks from JSON
     */
    public importTasks(json: string): { imported: number; errors: string[] } {
        const result = this.taskService.importFromJSON(json);
        console.log(`📥 Imported ${result.imported} tasks`);
        if (result.errors.length > 0) {
            console.warn(`⚠️ ${result.errors.length} errors during import`);
        }
        return result;
    }

    /**
     * Shutdown the application
     */
    public shutdown(): void {
        console.log('👋 Shutting down TaskFlowPro...');
        this.saveData();
        console.log('✅ Goodbye!');
    }
}

// ==========================================================================
// Demo Execution (US-TS-10: npm scripts for build and execution)
// ==========================================================================

/**
 * Main function - Entry point for the application
 */
async function main(): Promise<void> {
    try {
        // Create application instance
        const app = new TaskFlowPro();
        
        // Initialize
        await app.initialize();
        
        // Demonstrate features
        demonstrateFeatures(app);
        
        // Export tasks as JSON
        const exported = app.exportTasks();
        console.log('\n📄 Exported tasks preview:');
        console.log(exported.substring(0, 200) + '...\n');
        
        // Handle graceful shutdown
        process.on('SIGINT', () => {
            app.shutdown();
            process.exit(0);
        });
        
    } catch (error) {
        console.error('❌ Application error:', error);
        process.exit(1);
    }
}

/**
 * Demonstrate various TypeScript features
 */
function demonstrateFeatures(app: TaskFlowPro): void {
    console.log('\n🔍 Demonstrating TypeScript Features:\n');
    
    // 1. Arrow functions (US-AJS-01)
    const addTask = (title: string, priority: TaskPriority) => {
        return app.createTask({
            title,
            description: 'Demo task',
            priority
        });
    };
    
    // 2. Destructuring (US-AJS-02)
    const task = addTask('Destructuring Demo', TaskPriority.LOW);
    const { title, priority, status } = task;
    console.log(`1. Destructuring: ${title} (${priority}) - ${status}`);
    
    // 3. Template literals (US-AJS-01)
    const message = `Task "${title}" has priority ${priority.toUpperCase()}`;
    console.log(`2. Template literals: ${message}`);
    
    // 4. Spread operator (US-AJS-02)
    const taskCopy = { ...task, status: TaskStatus.DONE };
    console.log(`3. Spread operator: Task status changed to ${taskCopy.status}`);
    
    // 5. Async/Await (US-AJS-03)
    const asyncDemo = async (): Promise<string> => {
        return new Promise(resolve => {
            setTimeout(() => resolve('Async operation complete'), 100);
        });
    };
    
    asyncDemo().then(result => {
        console.log(`4. Async/Await: ${result}`);
    });
    
    // 6. Date handling (US-AJS-05)
    const now = new Date();
    const formatted = formatDate(now);
    console.log(`5. Date formatting: ${formatted}`);
    
    // 7. Type guards
    function isHighPriority(task: Task): task is Task & { priority: TaskPriority.HIGH } {
        return task.priority === TaskPriority.HIGH;
    }
    
    const tasks = app.getDashboardStats();
    console.log(`6. Type guards: ${tasks.totalTasks} tasks total`);
    
    // 8. Utility types (US-TS-08: Strict typing)
    type ReadonlyTask = Readonly<Task>;
    const readonlyTask: ReadonlyTask = {
        id: 'readonly-1',
        title: 'Readonly Task',
        description: 'This task cannot be modified',
        priority: TaskPriority.LOW,
        status: TaskStatus.TODO,
        tags: [],
        subtasks: [],
        attachments: [],
        comments: [],
        createdAt: new Date(),
        updatedAt: new Date()
    };
    console.log(`7. Utility types: Readonly task created`);
    
    console.log('\n✅ All TypeScript features demonstrated successfully!\n');
}

// ==========================================================================
// Run the application (ES Module compatible)
// ==========================================================================

if (typeof process !== 'undefined' && import.meta.url === `file://${process.argv[1]}`) {
    main();
}

// Export for use as module
export { TaskFlowPro, main };