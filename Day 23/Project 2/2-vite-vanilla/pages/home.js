// Home Page - Vite Vanilla
export function homePage() {
    return `
    <div class="page">
      <h2>⚡ Welcome to Vite SPA</h2>
      <p>This is a blazing fast Vanilla JavaScript Single Page Application built with Vite!</p>
      
      <div class="card">
        <h3>🚀 Why Vite?</h3>
        <ul>
          <li>Lightning fast cold starts</li>
          <li>Hot Module Replacement (HMR)</li>
          <li>Native ES modules</li>
          <li>Built-in TypeScript support</li>
          <li>Optimized production builds</li>
        </ul>
      </div>
      
      <div class="card">
        <h3>Quick Start</h3>
        <p>Run these commands to get started:</p>
        <pre style="background: #1a1a1a; color: #667eea; padding: 1rem; border-radius: 8px; overflow-x: auto;">
npm install
npm run dev</pre>
      </div>
      
      <button class="btn" onclick="window.location.hash='/about'">Learn More →</button>
      <button class="btn" onclick="window.location.hash='/contact'">Contact Us</button>
    </div>
  `;
}

