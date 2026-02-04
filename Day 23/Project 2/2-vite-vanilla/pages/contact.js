// Contact Page - Vite Vanilla
export function contactPage() {
    return `
    <div class="page">
      <h2>📬 Contact the Vite Team</h2>
      <p>Have questions about Vite? We'd love to hear from you!</p>
      
      <div class="card">
        <h3>Send us a Message</h3>
        <form id="contact-form">
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea rows="5" placeholder="Your Message" required></textarea>
          <button type="submit" class="btn">Send Message</button>
        </form>
      </div>
      
      <div class="card">
        <h3>Resources</h3>
        <ul>
          <li>📖 <a href="https://vitejs.dev" target="_blank">Official Documentation</a></li>
          <li>💬 <a href="https://discord.gg/vite" target="_blank">Discord Community</a></li>
          <li>🐙 <a href="https://github.com/vitejs/vite" target="_blank">GitHub Repository</a></li>
        </ul>
      </div>
      
      <button class="btn" onclick="window.location.hash='/'">← Back Home</button>
    </div>
  `;
}

