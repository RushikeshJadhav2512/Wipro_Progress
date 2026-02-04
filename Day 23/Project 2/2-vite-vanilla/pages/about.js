// About Page - Vite Vanilla
export function aboutPage() {
    return `
    <div class="page">
      <h2>ℹ️ About Vite</h2>
      <p>Vite (French for "fast") is a next-generation frontend tooling that provides a significantly faster development experience.</p>
      
      <div class="card">
        <h3>Development Experience</h3>
        <ul>
          <li>Instant server start</li>
          <li>Lightning-fast HMR</li>
          <li>True on-demand compilation</li>
          <li>Out-of-the-box support for TypeScript, JSX, CSS, and more</li>
        </ul>
      </div>
      
      <div class="card">
        <h3>Production Ready</h3>
        <ul>
          <li>Pre-bundling using Rollup</li>
          <li>Code splitting optimized</li>
          <li>Chunk naming strategies</li>
          <li>Automatic CSS code splitting</li>
        </ul>
      </div>
      
      <button class="btn" onclick="window.location.hash='/'">← Back Home</button>
      <button class="btn" onclick="window.location.hash='/contact'">Get in Touch</button>
    </div>
  `;
}

