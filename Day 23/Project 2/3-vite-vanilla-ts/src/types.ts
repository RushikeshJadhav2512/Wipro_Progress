// Type definitions for the SPA
export interface Route {
    path: string;
    component: () => string;
}

export interface ContactFormData {
    name: string;
    email: string;
    message: string;
}

export type RouterCallback = () => void;

