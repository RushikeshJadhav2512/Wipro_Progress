// About Page - TypeScript Component
export function aboutPage(): string {
    return `
    <div class="page">
      <h2>ℹ️ About TypeScript</h2>
      <p>TypeScript is JavaScript with syntax for types. It's a strongly typed programming language that compiles to plain JavaScript.</p>
      
      <div class="card">
        <h3>Key Features</h3>
        <ul>
          <li>Type annotations and inference</li>
          <li>Interfaces and type aliases</li>
          <li>Generics for reusable code</li>
          <li>Enums for named constants</li>
          <li>Advanced type manipulation</li>
        </ul>
      </div>
      
      <div class="card">
        <h3>Type Safety Example</h3>
        <pre>
interface User {
  name: string;
  age: number;
}

function greet(user: User): string {
  return \`Hello, \${user.name}!\`;
}</pre>
      </div>
      
      <button class="btn" onclick="window.location.hash='/'">← Back Home</button>
      <button class="btn" onclick="window.location.hash='/contact'">Get in Touch</button>
    </div>
  `;
}

