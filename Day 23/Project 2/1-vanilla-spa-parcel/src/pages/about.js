// About Page Component
export function aboutPage() {
    return `
        <div class="page">
            <h2>ℹ️ About Us</h2>
            <p>This SPA template demonstrates the power of vanilla JavaScript for building modern web applications.</p>
            
            <div class="card">
                <h3>Why Vanilla JavaScript?</h3>
                <p>Vanilla JavaScript provides:</p>
                <ul>
                    <li>• No build tool complexity</li>
                    <li>• No framework overhead</li>
                    <li>• Better performance for simple applications</li>
                    <li>• Complete control over your code</li>
                    <li>• Easier debugging and testing</li>
                </ul>
            </div>
            
            <div class="card">
                <h3>Technology Stack</h3>
                <p>
                    <strong>Parcel</strong> - Blazing fast, zero configuration bundler<br>
                    <strong>ES6+</strong> - Modern JavaScript features<br>
                    <strong>CSS3</strong> - Modern styling with animations
                </p>
            </div>
            
            <button class="btn" onclick="window.location.hash='/'">← Back to Home</button>
        </div>
    `;
}

