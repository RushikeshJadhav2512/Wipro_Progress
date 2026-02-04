// Vite Vanilla TypeScript SPA - Main Application
import { homePage } from './pages/home';
import { aboutPage } from './pages/about';
import { contactPage } from './pages/contact';

// TypeScript Router with type safety
class Router {
    private routes: Map<string, () => string>;

    constructor() {
        this.routes = new Map([
            ['/', homePage],
            ['/about', aboutPage],
            ['/contact', contactPage]
        ]);

        this.init();
    }

    private init(): void {
        window.addEventListener('hashchange', () => this.handleRoute());
        window.addEventListener('load', () => this.handleRoute());

        document.body.addEventListener('click', (e: MouseEvent): void => {
            const target = e.target as HTMLElement;
            if (target.matches('[data-link]')) {
                e.preventDefault();
                const href = target.getAttribute('href');
                if (href) this.navigate(href);
            }
        });
    }

    private navigate(path: string): void {
        window.location.hash = path;
    }

    private handleRoute(): void {
        const hash: string = window.location.hash.slice(1) || '/';
        const route = this.routes.get(hash) || this.routes.get('/');

        const content = document.getElementById('content');
        if (content && route) {
            content.innerHTML = route();
        }
    }
}

// Initialize the application
const app: Router = new Router();
console.log('📘 Vite TypeScript SPA initialized successfully!');

