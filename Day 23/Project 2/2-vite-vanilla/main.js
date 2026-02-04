// Vite Vanilla SPA - Main Application
import { homePage } from './pages/home.js';
import { aboutPage } from './pages/about.js';
import { contactPage } from './pages/contact.js';

// Simple Hash Router for Vite
class Router {
    constructor() {
        this.routes = {
            '/': homePage,
            '/about': aboutPage,
            '/contact': contactPage
        };

        this.init();
    }

    init() {
        window.addEventListener('hashchange', () => this.handleRoute());
        window.addEventListener('load', () => this.handleRoute());

        document.body.addEventListener('click', (e) => {
            if (e.target.matches('[data-link]')) {
                e.preventDefault();
                this.navigate(e.target.getAttribute('href'));
            }
        });
    }

    navigate(path) {
        window.location.hash = path;
    }

    handleRoute() {
        const hash = window.location.hash.slice(1) || '/';
        const route = this.routes[hash] || this.routes['/'];

        const content = document.getElementById('content');
        if (content) {
            content.innerHTML = route();
        }
    }
}

// Initialize the application
const app = new Router();
console.log('⚡ Vite Vanilla SPA initialized successfully!');

