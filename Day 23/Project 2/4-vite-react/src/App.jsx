import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'
import './App.css'

function Home() {
    return (
        <div className="page">
            <h2>⚛️ Welcome to React SPA</h2>
            <p>This is a modern React Single Page Application built with Vite!</p>

            <div className="card">
                <h3>React Features</h3>
                <ul>
                    <li>✓ Component-based architecture</li>
                    <li>✓ Virtual DOM for performance</li>
                    <li>✓ JSX for templating</li>
                    <li>✓ One-way data binding</li>
                    <li>✓ Rich ecosystem</li>
                </ul>
            </div>

            <div className="card">
                <h3>Quick Start</h3>
                <pre>
                    npm install
                    npm run dev</pre>
            </div>

            <Link to="/about" className="btn">Learn More →</Link>
            <Link to="/contact" className="btn">Contact Us</Link>
        </div>
    )
}

function About() {
    return (
        <div className="page">
            <h2>ℹ️ About React</h2>
            <p>React is a JavaScript library for building user interfaces, maintained by Meta.</p>

            <div className="card">
                <h3>Why React?</h3>
                <ul>
                    <li>Declarative: Design simple views for each state</li>
                    <li>Component-Based: Build encapsulated components</li>
                    <li>Learn Once, Write Anywhere: Use with TypeScript, Next.js, etc.</li>
                </ul>
            </div>

            <div className="card">
                <h3>Hooks</h3>
                <p>React Hooks let you use state and other React features in functional components:</p>
                <ul>
                    <li>useState - Manage component state</li>
                    <li>useEffect - Handle side effects</li>
                    <li>useContext - Access context values</li>
                </ul>
            </div>

            <Link to="/" className="btn">← Back Home</Link>
            <Link to="/contact" className="btn">Get in Touch</Link>
        </div>
    )
}

function Contact() {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' })

    const handleSubmit = (e) => {
        e.preventDefault()
        alert('Message sent! (Demo only)')
        setFormData({ name: '', email: '', message: '' })
    }

    return (
        <div className="page">
            <h2>📬 Contact Us</h2>
            <p>Send us a message using the React form below!</p>

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
    )
}

function Header() {
    const location = useLocation()

    return (
        <header>
            <h1>⚛️ Vite React SPA</h1>
            <nav>
                <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
                <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>About</Link>
                <Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>Contact</Link>
            </nav>
        </header>
    )
}

function App() {
    return (
        <Router>
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
                    <p>© 2024 Vite React Template - Powered by React & Vite</p>
                </footer>
            </div>
        </Router>
    )
}

export default App

