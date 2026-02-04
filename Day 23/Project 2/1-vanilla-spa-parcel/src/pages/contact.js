// Contact Page Component
export function contactPage() {
    return `
        <div class="page">
            <h2>📬 Contact Us</h2>
            <p>Have questions? We'd love to hear from you!</p>
            
            <div class="card">
                <h3>Get in Touch</h3>
                <form id="contact-form">
                    <div style="margin-bottom: 1rem;">
                        <label for="name" style="display: block; margin-bottom: 0.5rem;">Name:</label>
                        <input type="text" id="name" name="name" required 
                            style="width: 100%; padding: 0.5rem; border: 1px solid #ddd; border-radius: 4px;">
                    </div>
                    <div style="margin-bottom: 1rem;">
                        <label for="email" style="display: block; margin-bottom: 0.5rem;">Email:</label>
                        <input type="email" id="email" name="email" required 
                            style="width: 100%; padding: 0.5rem; border: 1px solid #ddd; border-radius: 4px;">
                    </div>
                    <div style="margin-bottom: 1rem;">
                        <label for="message" style="display: block; margin-bottom: 0.5rem;">Message:</label>
                        <textarea id="message" name="message" rows="4" required 
                            style="width: 100%; padding: 0.5rem; border: 1px solid #ddd; border-radius: 4px;"></textarea>
                    </div>
                    <button type="submit" class="btn">Send Message</button>
                </form>
            </div>
            
            <div class="card">
                <h3>Other Ways to Reach Us</h3>
                <p>📧 Email: hello@vanilla-spa.demo</p>
                <p>📍 Location: Web City, Internet</p>
                <p>📞 Phone: +1 (555) 123-4567</p>
            </div>
            
            <button class="btn" onclick="window.location.hash='/'">← Back to Home</button>
        </div>
    `;
}

