/**
 * ==========================================================================
 * ServiceHub - Comprehensive JavaScript Application
 * Module 6: JavaScript Basics
 * Module 7: Advanced JavaScript (ES6+)
 * Module 8: DOM, AJAX, JSON & jQuery concepts
 * ==========================================================================
 */

// ==========================================================================
// IIFE - Encapsulation to avoid global scope pollution
// ==========================================================================
(function() {
    'use strict';

    // ==========================================================================
    // Module 6: JavaScript Basics (US-JS-01 - Variables and Datatypes)
    // ==========================================================================
    
    // Variables using let and const (block-scoped)
    let appName = 'ServiceHub';           // String datatype
    let appVersion = '1.0.0';            // String
    let isInitialized = false;           // Boolean
    let currentUser = null;              // Null
    let services = [];                  // Array (object)
    let config = {};                     // Object
    
    // const for immutable values
    const API_BASE_URL = 'https://api.servicehub.com';
    const MAX_BOOKINGS = 10;

    // Data types demonstration
    const dataTypes = {
        string: typeof appName,
        number: 42,
        boolean: true,
        null: null,
        undefined: undefined,
        array: [1, 2, 3],
        object: { key: 'value' },
        function: function() { return 'function'; }
    };

    // ==========================================================================
    // Module 6: JavaScript Basics (US-JS-02 - Conditional Logic and Loops)
    // ==========================================================================
    
    // Conditional Logic
    function checkAvailability(service) {
        if (!service) {
            console.log('Service not provided');
            return false;
        }
        
        if (service.available === true && service.slots > 0) {
            return 'Available';
        } else if (service.available === true && service.slots === 0) {
            return 'Waitlist';
        } else {
            return 'Not Available';
        }
    }
    
    // Ternary operator (shorthand conditional)
    const statusMessage = isInitialized ? 'App is ready' : 'App is loading...';
    
    // Switch statement
    function getServiceCategory(categoryId) {
        switch (categoryId) {
            case 1:
                return 'Consulting';
            case 2:
                return 'Development';
            case 3:
                return 'Design';
            case 4:
                return 'Maintenance';
            default:
                return 'Unknown Category';
        }
    }
    
    // Loops - for, while, forEach, map
    function processServices() {
        // For loop
        for (let i = 0; i < services.length; i++) {
            console.log(`Service ${i + 1}: ${services[i].name}`);
        }
        
        // While loop
        let counter = 0;
        while (counter < 3) {
            console.log(`Processing... ${counter + 1}`);
            counter++;
        }
        
        // forEach (array iteration)
        services.forEach((service, index) => {
            console.log(`Service ${index}: ${service.name} - $${service.price}`);
        });
        
        // map (transform array)
        const serviceNames = services.map(service => service.name);
        const servicePrices = services.map(service => service.price * 1.1); // Add tax
        
        // filter (conditional filtering)
        const availableServices = services.filter(service => service.available);
        
        // find (search)
        const specificService = services.find(s => s.id === 'consultation');
        
        return { serviceNames, servicePrices, availableServices, specificService };
    }

    // ==========================================================================
    // Module 6: JavaScript Basics (US-JS-03 - Reusable Functions)
    // ==========================================================================
    
    // Function declarations
    function calculateTotal(price, quantity = 1, tax = 0.1) {
        const subtotal = price * quantity;
        const taxAmount = subtotal * tax;
        return subtotal + taxAmount;
    }
    
    // Function expressions
    const calculateDiscount = function(price, discountPercent) {
        return price - (price * (discountPercent / 100));
    };
    
    // Arrow functions (US-AJS-01)
    const calculateTip = (amount, tipPercent = 15) => amount * (tipPercent / 100);
    
    // Template literals in functions (US-AJS-01)
    function formatPrice(price, currency = '$') {
        return `${currency}${price.toFixed(2)}`;
    }
    
    function generateServiceDescription(service) {
        return `
            Service: ${service.name}
            Price: ${formatPrice(service.price)}
            Duration: ${service.duration} minutes
            Available: ${service.available ? 'Yes' : 'No'}
        `;
    }
    
    // Default parameters
    function createBooking(customerName, service = 'General', date = new Date()) {
        return {
            id: Date.now(),
            customer: customerName,
            service: service,
            bookingDate: date,
            status: 'pending'
        };
    }

    // ==========================================================================
    // Module 6: JavaScript Basics (US-JS-04 - Arrays and Strings)
    // ==========================================================================
    
    // Array manipulation
    const servicesList = ['Consulting', 'Development', 'Design', 'Maintenance', 'Training'];
    
    // Array methods (US-JS-04)
    function manipulateServices() {
        // Add to end
        servicesList.push('Support');
        
        // Add to beginning
        servicesList.unshift('Planning');
        
        // Remove from end
        const last = servicesList.pop();
        
        // Remove from beginning
        const first = servicesList.shift();
        
        // Find index
        const index = servicesList.indexOf('Design');
        
        // Slice (copy portion)
        const subset = servicesList.slice(1, 4);
        
        // Splice (remove and add)
        servicesList.splice(2, 1, 'UI/UX Design');
        
        // Join to string
        const allServices = servicesList.join(', ');
        
        // Reverse
        const reversed = [...servicesList].reverse();
        
        // Sort
        const sorted = [...servicesList].sort();
        
        return { allServices, reversed, sorted };
    }
    
    // String manipulation
    function processString(input) {
        // String methods
        const upper = input.toUpperCase();
        const lower = input.toLowerCase();
        const trimmed = input.trim();
        const replaced = input.replace('Service', 'Solution');
        const split = input.split(' ');
        const length = input.length;
        const substring = input.substring(0, 10);
        
        // Template literal for output
        return `
            Original: "${input}"
            Uppercase: "${upper}"
            Lowercase: "${lower}"
            Words count: ${split.length}
            Length: ${length}
        `;
    }

    // ==========================================================================
    // Module 7: Advanced JavaScript (US-AJS-01 - Arrow Functions & Template Literals)
    // ==========================================================================
    
    // Arrow functions for array operations
    const doublePrices = prices => prices.map(p => p * 2);
    const filterByPrice = (items, minPrice) => items.filter(i => i.price >= minPrice);
    const getTotal = prices => prices.reduce((sum, p) => sum + p, 0);
    
    // Template literals
    const userGreeting = (name, time) => {
        return `Good ${time}, ${name}! Welcome to ${appName} v${appVersion}.`;
    };

    // ==========================================================================
    // Module 7: Advanced JavaScript (US-AJS-02 - Destructuring & Spread)
    // ==========================================================================
    
    // Object destructuring
    function displayServiceInfo(service) {
        const { name, price, duration, available } = service;
        console.log(`Service: ${name}, Price: $${price}, Duration: ${duration}min`);
    }
    
    // Array destructuring
    function separateServiceTypes() {
        const [primary, secondary, ...others] = servicesList;
        return { primary, secondary, others };
    }
    
    // Spread operator - objects
    const updatedService = {
        ...services[0],
        price: 150,
        features: ['Feature 1', 'Feature 2']
    };
    
    // Spread operator - arrays
    const allCategories = ['Premium', ...servicesList, 'Enterprise'];
    
    // Copy with spread
    const servicesCopy = [...services];

    // ==========================================================================
    // Module 7: Advanced JavaScript (US-AJS-03 - Promises & Async/Await)
    // ==========================================================================
    
    // Promise-based API call simulation
    function fetchServicesAPI() {
        return new Promise((resolve, reject) => {
            // Simulate API delay
            setTimeout(() => {
                const mockData = getMockServices();
                if (mockData) {
                    resolve(mockData);
                } else {
                    reject(new Error('Failed to fetch services'));
                }
            }, 1000);
        });
    }
    
    // Async/Await function (US-AJS-03)
    async function loadServices() {
        try {
            console.log('Loading services...');
            const data = await fetchServicesAPI();
            console.log('Services loaded:', data.length);
            return data;
        } catch (error) {
            console.error('Error loading services:', error.message);
            return getMockServices(); // Fallback
        }
    }
    
    // Fetch API wrapper
    async function fetchWithHeaders(endpoint) {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer token'
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return response.json();
    }

    // ==========================================================================
    // Module 7: Advanced JavaScript (US-AJS-04 - Closures & Scope)
    // ==========================================================================
    
    // Closure example
    function createServiceCounter() {
        let count = 0; // Private variable (closure scope)
        
        return {
            increment: () => ++count,
            decrement: () => --count,
            getValue: () => count,
            reset: () => { count = 0; }
        };
    }
    
    // Module pattern using closures
    const BookingManager = (function() {
        // Private variables
        let bookings = [];
        let bookingId = 1000;
        
        // Private functions
        function generateId() {
            return ++bookingId;
        }
        
        function validateBooking(booking) {
            return booking.customer && booking.service && booking.date;
        }
        
        // Public API
        return {
            createBooking: function(customer, service, date) {
                const booking = {
                    id: generateId(),
                    customer,
                    service,
                    date,
                    createdAt: new Date()
                };
                
                if (validateBooking(booking)) {
                    bookings.push(booking);
                    return { success: true, booking };
                }
                return { success: false, error: 'Invalid booking data' };
            },
            
            getBookings: function() {
                return [...bookings]; // Return copy
            },
            
            cancelBooking: function(id) {
                const index = bookings.findIndex(b => b.id === id);
                if (index > -1) {
                    bookings.splice(index, 1);
                    return true;
                }
                return false;
            },
            
            getStats: function() {
                return {
                    total: bookings.length,
                    pending: bookings.filter(b => b.status === 'pending').length,
                    confirmed: bookings.filter(b => b.status === 'confirmed').length
                };
            }
        };
    })();
    
    // IIFE for private scope
    const privateCounter = (function() {
        let value = 0;
        return {
            add: function(x) { value += x; },
            getValue: function() { return value; }
        };
    })();

    // ==========================================================================
    // Module 7: Advanced JavaScript (US-AJS-05 - Date and Time)
    // ==========================================================================
    
    function handleDateTime() {
        const now = new Date();
        
        // Date components
        const year = now.getFullYear();
        const month = now.getMonth(); // 0-indexed
        const day = now.getDate();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();
        
        // Format date
        const formattedDate = now.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        // Format time
        const formattedTime = now.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
        
        // ISO format
        const isoDate = now.toISOString();
        
        // Parse date string
        const parsed = Date.parse('2024-12-31');
        const daysUntil = Math.ceil((parsed - now) / (1000 * 60 * 60 * 24));
        
        return {
            now,
            formattedDate,
            formattedTime,
            isoDate,
            daysUntil
        };
    }
    
    // Booking date validation
    function isValidBookingDate(dateString) {
        const selectedDate = new Date(dateString);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const maxDate = new Date();
        maxDate.setDate(today.getDate() + 30); // 30 days ahead
        
        return selectedDate >= today && selectedDate <= maxDate;
    }
    
    // Calculate duration between dates
    function calculateDuration(startDate, endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffMs = end - start;
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        return { diffMs, diffHours, diffDays };
    }

    // ==========================================================================
    // Module 8: DOM Manipulation (US-DOM-01, US-DOM-02)
    // ==========================================================================
    
    // DOM Selection helper
    const $ = (selector) => document.querySelector(selector);
    const $$ = (selector) => document.querySelectorAll(selector);
    
    // Create element helper
    function createElement(tag, attributes = {}, children = []) {
        const element = document.createElement(tag);
        
        // Set attributes
        Object.entries(attributes).forEach(([key, value]) => {
            if (key === 'className') {
                element.className = value;
            } else if (key.startsWith('on')) {
                const event = key.slice(2).toLowerCase();
                element.addEventListener(event, value);
            } else if (key === 'dataset') {
                Object.entries(value).forEach(([dataKey, dataValue]) => {
                    element.dataset[dataKey] = dataValue;
                });
            } else {
                element.setAttribute(key, value);
            }
        });
        
        // Add children
        children.forEach(child => {
            if (typeof child === 'string') {
                element.appendChild(document.createTextNode(child));
            } else if (child instanceof Node) {
                element.appendChild(child);
            }
        });
        
        return element;
    }
    
    // DOM Content Loaded
    document.addEventListener('DOMContentLoaded', function() {
        console.log('DOM is ready!');
        initializeApp();
    });
    
    // Initialize Application
    function initializeApp() {
        isInitialized = true;
        
        // Populate services
        services = getMockServices();
        renderServices();
        renderPricingTable();
        initFormValidation();
        initGeolocation();
        
        console.log(`${appName} initialized successfully!`);
    }
    
    // Render services to DOM (US-DOM-02)
    function renderServices() {
        const container = $('#services-container');
        if (!container) return;
        
        container.innerHTML = ''; // Clear existing
        
        services.forEach(service => {
            const card = createElement('div', {
                className: 'card h-100'
            }, [
                createElement('div', { className: 'card-body' }, [
                    createElement('h3', { 
                        className: 'card-title',
                        textContent: service.name 
                    }),
                    createElement('p', { 
                        className: 'card-text',
                        textContent: service.description 
                    }),
                    createElement('p', {}, [
                        createElement('strong', { textContent: 'Price: ' }),
                        formatPrice(service.price)
                    ]),
                    createElement('p', {}, [
                        createElement('strong', { textContent: 'Duration: ' }),
                        `${service.duration} minutes`
                    ]),
                    createElement('button', {
                        className: 'btn btn-primary w-100',
                        textContent: 'Book Now',
                        onclick: () => scrollToBooking(service.id)
                    })
                ])
            ]);
            container.appendChild(card);
        });
    }
    
    // Render pricing table (US-DOM-01)
    function renderPricingTable() {
        const tbody = $('#pricing-table');
        if (!tbody) return;
        
        tbody.innerHTML = '';
        
        services.forEach(service => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${service.name}</td>
                <td>${service.duration} min</td>
                <td>${formatPrice(service.price)}</td>
                <td>${service.category}</td>
            `;
            tbody.appendChild(row);
        });
    }
    
    // Scroll to booking section
    function scrollToBooking(serviceId) {
        const bookingSection = $('#booking');
        if (bookingSection) {
            bookingSection.scrollIntoView({ behavior: 'smooth' });
            
            // Pre-select service
            const serviceSelect = $('#service');
            if (serviceSelect) {
                serviceSelect.value = serviceId;
            }
        }
    }

    // ==========================================================================
    // Module 8: AJAX & Fetch (US-AJAX-01)
    // ==========================================================================
    
    // Simulated API call
    function getMockServices() {
        return [
            { id: 'consultation', name: 'Consultation', price: 50, duration: 60, category: 'Consulting', description: 'Expert advice for your business needs', available: true, slots: 5 },
            { id: 'design', name: 'UI/UX Design', price: 100, duration: 120, category: 'Design', description: 'Beautiful and intuitive user interfaces', available: true, slots: 3 },
            { id: 'development', name: 'Web Development', price: 150, duration: 180, category: 'Development', description: 'Full-stack web application development', available: true, slots: 2 },
            { id: 'maintenance', name: 'Maintenance', price: 75, duration: 90, category: 'Support', description: 'Ongoing support and maintenance', available: true, slots: 10 }
        ];
    }
    
    // Fetch testimonials (US-AJAX-01)
    async function loadTestimonials() {
        const container = $('#testimonials-container');
        if (!container) return;
        
        // Simulated JSON data (US-JSON-01)
        const testimonialsData = [
            { id: 1, name: 'Sarah Johnson', role: 'CEO', company: 'TechCorp', text: 'Excellent service! Highly recommended.', rating: 5 },
            { id: 2, name: 'Mike Chen', role: 'Manager', company: 'StartupXYZ', text: 'Professional and timely delivery.', rating: 5 },
            { id: 3, name: 'Emily Davis', role: 'Director', company: 'Design Studio', text: 'Amazing attention to detail.', rating: 4 }
        ];
        
        try {
            // Simulate async fetch
            await new Promise(resolve => setTimeout(resolve, 500));
            
            container.innerHTML = testimonialsData.map(t => `
                <div class="col-md-4">
                    <div class="card h-100">
                        <div class="card-body">
                            <div class="mb-2">
                                ${'★'.repeat(t.rating)}${'☆'.repeat(5 - t.rating)}
                            </div>
                            <p class="card-text">"${t.text}"</p>
                            <footer class="blockquote-footer">
                                ${t.name}, ${t.role} at ${t.company}
                            </footer>
                        </div>
                    </div>
                </div>
            `).join('');
            
        } catch (error) {
            console.error('Failed to load testimonials:', error);
            container.innerHTML = '<p class="text-center">Unable to load testimonials.</p>';
        }
    }
    
    // Load testimonials on init
    loadTestimonials();

    // ==========================================================================
    // Module 8: Form Handling & Validation (US-BS-03)
    // ==========================================================================
    
    function initFormValidation() {
        const form = $('#booking-form');
        if (!form) return;
        
        // Real-time validation
        form.querySelectorAll('input, select, textarea').forEach(field => {
            field.addEventListener('blur', function() {
                validateField(this);
            });
            
            field.addEventListener('input', function() {
                // Clear error on input
                this.classList.remove('is-invalid');
                this.parentElement.querySelector('.invalid-feedback')?.remove();
            });
        });
        
        // Form submission
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Check validity
            if (!form.checkValidity()) {
                e.stopPropagation();
                form.classList.add('was-validated');
                return;
            }
            
            // Process form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            
            // Create booking
            const result = BookingManager.createBooking(
                data.name,
                data.service,
                new Date(data.date)
            );
            
            if (result.success) {
                showConfirmation(result.booking);
                form.reset();
                form.classList.remove('was-validated');
            }
        });
    }
    
    // Field validation helper
    function validateField(field) {
        const isValid = field.checkValidity();
        
        if (!isValid) {
            field.classList.add('is-invalid');
            
            // Add error message if not exists
            const feedback = field.parentElement.querySelector('.invalid-feedback');
            if (!feedback) {
                const errorDiv = document.createElement('div');
                errorDiv.className = 'invalid-feedback';
                errorDiv.textContent = field.validationMessage;
                field.parentElement.appendChild(errorDiv);
            }
        } else {
            field.classList.remove('is-invalid');
        }
        
        return isValid;
    }
    
    // Show confirmation (DOM manipulation)
    function showConfirmation(booking) {
        const confirmation = $('#confirmation');
        const details = $('#confirmation-details');
        
        if (confirmation && details) {
            details.innerHTML = `
                <strong>Booking ID:</strong> ${booking.id}<br>
                <strong>Service:</strong> ${booking.service}<br>
                <strong>Date:</strong> ${new Date(booking.bookingDate).toLocaleDateString()}
            `;
            confirmation.style.display = 'block';
            
            // Auto-hide after 5 seconds
            setTimeout(() => {
                confirmation.style.display = 'none';
            }, 5000);
        }
    }

    // ==========================================================================
    // Module 8: Geolocation (US-HTML-06)
    // ==========================================================================
    
    function initGeolocation() {
        const statusDiv = $('#geolocation-status');
        const locationText = $('#location-text');
        
        if (!navigator.geolocation || !statusDiv || !locationText) {
            return;
        }
        
        // Check if already granted
        if (localStorage.getItem('geolocation_granted') === 'true') {
            getCurrentPosition();
            return;
        }
        
        // Show prompt after 2 seconds
        setTimeout(() => {
            statusDiv.style.display = 'block';
            locationText.textContent = 'Enable location to find nearby services?';
            
            // Add enable button
            const btn = document.createElement('button');
            btn.className = 'btn btn-sm btn-primary ms-2';
            btn.textContent = 'Enable';
            btn.onclick = () => {
                localStorage.setItem('geolocation_granted', 'true');
                statusDiv.style.display = 'none';
                getCurrentPosition();
            };
            locationText.parentElement.appendChild(btn);
        }, 2000);
    }
    
    function getCurrentPosition() {
        navigator.geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                console.log(`Location: ${latitude}, ${longitude}`);
                
                // Store location
                localStorage.setItem('user_location', JSON.stringify({ latitude, longitude }));
                
                // Find nearby services based on location
                findNearbyServices(latitude, longitude);
            },
            error => {
                console.warn('Geolocation error:', error.message);
            },
            { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
        );
    }
    
    function findNearbyServices(lat, lon) {
        // Simulated nearby services
        const nearbyServices = services.filter(s => s.available);
        console.log(`Found ${nearbyServices.length} nearby services for location (${lat.toFixed(2)}, ${lon.toFixed(2)})`);
    }

    // ==========================================================================
    // Module 8: Performance Optimization (US-PERF-01)
    // ==========================================================================
    
    // Debounce function for input optimization
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Throttle function for scroll events
    function throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
    
    // Event delegation for performance (US-JQ-01 equivalent)
    document.addEventListener('click', function(e) {
        // Use event delegation instead of multiple listeners
        if (e.target.matches('.btn-primary')) {
            console.log('Primary button clicked:', e.target.textContent);
        }
    });
    
    // Optimized form input handler
    const optimizedInputHandler = debounce(function(e) {
        const value = e.target.value;
        console.log(`Input optimized: ${value}`);
        // Perform search/filter here
    }, 300);
    
    // Apply to form inputs
    document.querySelectorAll('#booking-form input').forEach(input => {
        input.addEventListener('input', optimizedInputHandler);
    });

    // ==========================================================================
    // Local Storage Helper Functions
    // ==========================================================================
    
    // Save to localStorage (US-JSON-01 equivalent)
    function saveToStorage(key, data) {
        try {
            const json = JSON.stringify(data);
            localStorage.setItem(key, json);
            return true;
        } catch (e) {
            console.error('Storage error:', e);
            return false;
        }
    }
    
    // Load from localStorage
    function loadFromStorage(key) {
        try {
            const json = localStorage.getItem(key);
            return json ? JSON.parse(json) : null;
        } catch (e) {
            console.error('Parse error:', e);
            return null;
        }
    }

    // ==========================================================================
    // jQuery-like Helper (US-JQ-01)
    // ==========================================================================
    
    // Simple jQuery-like wrapper for compatibility
    const jq = function(selector) {
        const elements = document.querySelectorAll(selector);
        
        return {
            elements: Array.from(elements),
            
            // Common jQuery methods
            html: function(content) {
                this.elements.forEach(el => el.innerHTML = content);
                return this;
            },
            
            text: function(content) {
                this.elements.forEach(el => el.textContent = content);
                return this;
            },
            
            addClass: function(className) {
                this.elements.forEach(el => el.classList.add(className));
                return this;
            },
            
            removeClass: function(className) {
                this.elements.forEach(el => el.classList.remove(className));
                return this;
            },
            
            on: function(event, handler) {
                this.elements.forEach(el => el.addEventListener(event, handler));
                return this;
            },
            
            hide: function() {
                this.elements.forEach(el => el.style.display = 'none');
                return this;
            },
            
            show: function() {
                this.elements.forEach(el => el.style.display = '');
                return this;
            },
            
            each: function(callback) {
                this.elements.forEach((el, index) => callback(index, el));
                return this;
            },
            
            first: function() {
                return jq(this.elements[0]);
            }
        };
    };
    
    // Export for global use
    window.ServiceHub = {
        appName,
        appVersion,
        BookingManager,
        createServiceCounter,
        calculateTotal,
        calculateDiscount,
        calculateTip,
        formatPrice,
        createBooking,
        saveToStorage,
        loadFromStorage,
        debounce,
        throttle,
        $: jq
    };

})();

