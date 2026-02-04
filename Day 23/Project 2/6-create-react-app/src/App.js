import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import './App.css';

function Home() {
    return (
        <div className="page">
            <h2>🏠 Welcome Home</h2>
            <p>This is a React Single Page Application created with Create React App!</p>

            <div className="card">
                <h3>CRA Features</h3>
                <ul>
                    <li>✓ Zero-configuration setup</li>
                    <li>✓ Built-in Babel & Webpack</li>
                    <li>✓ Hot Module Reloading</li>
                    <li>✓ Jest testing framework</li>
                    <li>✓ Service worker support</li>
                </ul>
            </div>

            <div className="card">
                <h3>Quick Start</h3>
                <pre>
                    npx create-react-app my-app
                    cd my-app
                    npm start</pre>
            </div>

            <Link to="/about" className="btn">Learn More →</Link>
            <Link to="/contact" className="btn">Contact Us</Link>
        </div>
    );
}

function About() {
    return (
        <div className="page">
            <h2>ℹ️ About Create React App</h2>
            <p>Create React App is an officially supported way to create single-page React applications.</p>

            <div className="card">
                <h3>Why CRA?</h3>
                <ul>
                    <li>📦 One dependency: node_modules</li>
                    <li>🔧 Zero config: Works out of the box</li>
                    <li>🧪 Includes Jest for testing</li>
                    <li>📁 Simple project structure</li>
                    <li>🚀 Optimized production builds</li>
                </ul>
            </div>

            <div className="card">
                <h3>Project Structure</h3>
                <pre>
                    my-app/
                    ├── public/
                    ├── src/
                    ├── package.json
                    └── README.md</pre>
            </div>

            <Link to="/" className="btn">← Back Home</Link>
            <Link to="/contact" className="btn">Get in Touch</Link>
        </div>
    );
}

function Contact() {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Message sent! (Demo only)');
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <div className="page">
            <h2>📬 Contact Us</h2>
            <p>Send us a message using the form below!</p>

            <div className="card">
                <h3>Send a Message</h3>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                    />
                    <textarea
                        rows="5"
                        placeholder="Your Message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                    ></textarea>
                    <button type="submit" className="btn">Send Message</button>
                </form>
            </div>

            <Link to="/" className="btn">← Back Home</Link>
        </div>
    );
}

function Header() {
    const location = useLocation();

    return (
        <header>
            <h1>📦 Create React App SPA</h1>
            <nav>
                <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
                <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>About</Link>
                <Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>Contact</Link>
            </nav>
        </header>
    );
}

function App() {
    return (
        <div id="app">
            <Header />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                </Routes>
            </main>
            <footer>
                <p>© 2024 Create React App Template</p>
            </footer>
        </div>
    );
}

export default App;

