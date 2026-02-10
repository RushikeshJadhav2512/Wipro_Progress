"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskFlowPro = void 0;
exports.main = main;
const types_1 = require("./types");
const services_1 = require("./services");
const utils_1 = require("./utils");
class TaskFlowPro {
    constructor() {
        this.currentUser = null;
        this.taskRepository = new services_1.TaskRepository();
        this.taskService = new services_1.TaskService();
        this.loadData();
    }
    async initialize() {
        console.log('🚀 TaskFlowPro initializing...');
        console.log(`📦 Version: ${this.getVersion()}`);
        console.log(`📁 Source maps enabled for debugging`);
        this.currentUser = this.getDefaultUser();
        this.taskService.setCurrentUser(this.currentUser);
        this.createDemoTasks();
        this.setupAutoSave();
        this.setupEventHandlers();
        console.log('✅ TaskFlowPro initialized successfully!');
        console.log(`👤 Logged in as: ${this.currentUser.name}`);
        this.displayDashboardStats();
    }
    getVersion() {
        return '1.0.0';
    }
    loadData() {
        const tasks = this.taskRepository.load();
        if (tasks.length > 0) {
            this.taskService = new services_1.TaskService(tasks);
            console.log(`📥 Loaded ${tasks.length} tasks from storage`);
        }
    }
    getDefaultUser() {
        return {
            id: 'user-001',
            name: 'Demo User',
            email: 'demo@taskflowpro.com',
            role: 'admin',
            createdAt: new Date()
        };
    }
    createDemoTasks() {
        const demoTasks = [
            {
                title: 'Complete project documentation',
                description: 'Write comprehensive documentation for TaskFlowPro',
                priority: types_1.TaskPriority.HIGH,
                dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
                tags: ['documentation', 'important']
            },
            {
                title: 'Review pull requests',
                description: 'Review pending PRs from the team',
                priority: types_1.TaskPriority.MEDIUM,
                dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
                tags: ['code-review', 'team']
            },
            {
                title: 'Set up CI/CD pipeline',
                description: 'Configure GitHub Actions for automated testing and deployment',
                priority: types_1.TaskPriority.HIGH,
                tags: ['devops', 'automation']
            },
            {
                title: 'Update dependencies',
                description: 'Check and update npm packages to latest versions',
                priority: types_1.TaskPriority.LOW,
                tags: ['maintenance']
            },
            {
                title: 'Write unit tests',
                description: 'Increase test coverage for TaskService class',
                priority: types_1.TaskPriority.MEDIUM,
                dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
                tags: ['testing', 'quality']
            }
        ];
        if (this.taskService.getAllTasks().length === 0) {
            demoTasks.forEach(task => {
                this.taskService.createTask(task);
            });
            console.log(`📝 Created ${demoTasks.length} demo tasks`);
        }
    }
    setupAutoSave() {
        const autoSave = (0, utils_1.debounce)(() => {
            this.saveData();
        }, 30000);
        if (typeof document !== 'undefined') {
            document?.addEventListener?.('task-updated', autoSave);
            document?.addEventListener?.('task-created', autoSave);
            document?.addEventListener?.('task-deleted', autoSave);
        }
        console.log('💾 Auto-save enabled (every 30 seconds)');
    }
    setupEventHandlers() {
        if (typeof window !== 'undefined') {
            const handleResize = (0, utils_1.throttle)(() => {
                console.log(`📐 Window resized: ${window.innerWidth}x${window.innerHeight}`);
            }, 250);
            window.addEventListener('resize', handleResize);
        }
        console.log('🎮 Event handlers initialized');
    }
    saveData() {
        const tasks = this.taskService.getAllTasks();
        this.taskRepository.save(tasks);
        console.log('💾 Data saved to localStorage');
    }
    displayDashboardStats() {
        const stats = this.taskService.getDashboardStats();
        console.log('\n📊 Dashboard Statistics:');
        console.log(`   Total Tasks: ${stats.totalTasks}`);
        console.log(`   Completed: ${stats.completedTasks}`);
        console.log(`   Overdue: ${stats.overdueTasks}`);
        console.log('------------------------------');
    }
    createTask(input) {
        const task = this.taskService.createTask(input);
        console.log(`✅ Created task: ${task.title}`);
        return task;
    }
    getTasksByStatus() {
        const tasks = this.taskService.getAllTasks();
        return (0, utils_1.groupBy)(tasks, 'status');
    }
    getDashboardStats() {
        return this.taskService.getDashboardStats();
    }
    exportTasks() {
        const json = this.taskService.exportToJSON();
        console.log('📤 Tasks exported to JSON');
        return json;
    }
    importTasks(json) {
        const result = this.taskService.importFromJSON(json);
        console.log(`📥 Imported ${result.imported} tasks`);
        if (result.errors.length > 0) {
            console.warn(`⚠️ ${result.errors.length} errors during import`);
        }
        return result;
    }
    shutdown() {
        console.log('👋 Shutting down TaskFlowPro...');
        this.saveData();
        console.log('✅ Goodbye!');
    }
}
exports.TaskFlowPro = TaskFlowPro;
async function main() {
    try {
        const app = new TaskFlowPro();
        await app.initialize();
        demonstrateFeatures(app);
        const exported = app.exportTasks();
        console.log('\n📄 Exported tasks preview:');
        console.log(exported.substring(0, 200) + '...\n');
        process.on('SIGINT', () => {
            app.shutdown();
            process.exit(0);
        });
    }
    catch (error) {
        console.error('❌ Application error:', error);
        process.exit(1);
    }
}
function demonstrateFeatures(app) {
    console.log('\n🔍 Demonstrating TypeScript Features:\n');
    const addTask = (title, priority) => {
        return app.createTask({
            title,
            description: 'Demo task',
            priority
        });
    };
    const task = addTask('Destructuring Demo', types_1.TaskPriority.LOW);
    const { title, priority, status } = task;
    console.log(`1. Destructuring: ${title} (${priority}) - ${status}`);
    const message = `Task "${title}" has priority ${priority.toUpperCase()}`;
    console.log(`2. Template literals: ${message}`);
    const taskCopy = { ...task, status: types_1.TaskStatus.DONE };
    console.log(`3. Spread operator: Task status changed to ${taskCopy.status}`);
    const asyncDemo = async () => {
        return new Promise(resolve => {
            setTimeout(() => resolve('Async operation complete'), 100);
        });
    };
    asyncDemo().then(result => {
        console.log(`4. Async/Await: ${result}`);
    });
    const now = new Date();
    const formatted = (0, utils_1.formatDate)(now);
    console.log(`5. Date formatting: ${formatted}`);
    function isHighPriority(task) {
        return task.priority === types_1.TaskPriority.HIGH;
    }
    const tasks = app.getDashboardStats();
    console.log(`6. Type guards: ${tasks.totalTasks} tasks total`);
    const readonlyTask = {
        id: 'readonly-1',
        title: 'Readonly Task',
        description: 'This task cannot be modified',
        priority: types_1.TaskPriority.LOW,
        status: types_1.TaskStatus.TODO,
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
if (require.main === module) {
    main();
}
//# sourceMappingURL=main.js.map