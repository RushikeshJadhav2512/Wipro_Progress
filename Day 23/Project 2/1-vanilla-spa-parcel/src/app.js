// Vanilla SPA - Main Application
import { homePage } from './pages/home.js';
import { aboutPage } from './pages/about.js';
import { contactPage } from './pages/contact.js';

// Simple Router
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
        // Handle browser back/forward
        window.addEventListener('popstate', () => this.handleRoute());

        // Handle clicks on links with data-link attribute
        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-link]')) {
                e.preventDefault();
                this.navigate(e.target.getAttribute('href'));
            }
        });

        // Initial route
        this.handleRoute();
    }

    navigate(path) {
        window.history.pushState({}, path, window.location.origin + path);
        this.handleRoute();
    }

    handleRoute() {
        const path = window.location.pathname || '/';
        const hash = window.location.hash.slice(1) || '/';
        const route = this.routes[hash] || this.routes['/'];

        const content = document.getElementById('content');
        if (content) {
            content.innerHTML = route();
        }
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    new Router();
    console.log('Vanilla SPA initialized successfully!');
});

// Export for testing
export default Router;

