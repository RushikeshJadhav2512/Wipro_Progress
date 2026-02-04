// Home Page - TypeScript Component
export function homePage(): string {
    return `
    <div class="page">
      <h2>📘 Welcome to TypeScript SPA</h2>
      <p>This is a type-safe Vanilla JavaScript Single Page Application built with Vite and TypeScript!</p>
      
      <div class="card">
        <h3>🔷 TypeScript Benefits</h3>
        <ul>
          <li>Static type checking at compile time</li>
          <li>Better IDE support and autocompletion</li>
          <li>Enhanced code documentation</li>
          <li>Catch errors before runtime</li>
          <li>Better refactoring support</li>
        </ul>
      </div>
      
      <div class="card">
        <h3>Quick Start</h3>
        <pre>
npm install
npm run dev</pre>
      </div>
      
      <button class="btn" onclick="window.location.hash='/about'">Learn More →</button>
      <button class="btn" onclick="window.location.hash='/contact'">Contact Us</button>
    </div>
  `;
}

