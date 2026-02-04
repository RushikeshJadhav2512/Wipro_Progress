// Home Page Component
export function homePage() {
    return `
        <div class="page">
            <h2>🏠 Welcome Home</h2>
            <p>This is a Vanilla JavaScript Single Page Application built with Parcel bundler.</p>
            
            <div class="card">
                <h3>Features</h3>
                <ul>
                    <li>✓ Simple and lightweight</li>
                    <li>✓ No framework dependencies</li>
                    <li>✓ Hash-based routing</li>
                    <li>✓ ES6 modules</li>
                    <li>✓ Hot module replacement with Parcel</li>
                </ul>
            </div>
            
            <div class="card">
                <h3>Getting Started</h3>
                <p>Navigate using the menu above or click the buttons below:</p>
                <button class="btn" onclick="window.location.hash='/about'">Learn More</button>
                <button class="btn" onclick="window.location.hash='/contact'">Contact Us</button>
            </div>
        </div>
    `;
}

