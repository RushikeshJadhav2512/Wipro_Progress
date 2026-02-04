// Contact Page - TypeScript Component
export function contactPage(): string {
    return `
    <div class="page">
      <h2>📬 Contact Us</h2>
      <p>Get in touch with the TypeScript team!</p>
      
      <div class="card">
        <h3>Send a Message</h3>
        <form id="contact-form">
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea rows="5" placeholder="Your Message" required></textarea>
          <button type="submit" class="btn">Send Message</button>
        </form>
      </div>
      
      <div class="card">
        <h3>TypeScript Resources</h3>
        <ul>
          <li>📖 <a href="https://www.typescriptlang.org" target="_blank">Official Documentation</a></li>
          <li>💻 <a href="https://github.com/microsoft/TypeScript" target="_blank">GitHub Repository</a></li>
          <li>📚 <a href="https://www.typescriptlang.org/docs/" target="_blank">Handbook</a></li>
        </ul>
      </div>
      
      <button class="btn" onclick="window.location.hash='/'">← Back Home</button>
    </div>
  `;
}

