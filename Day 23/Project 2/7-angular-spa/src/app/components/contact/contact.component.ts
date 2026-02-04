import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-contact',
    standalone: true,
    imports: [FormsModule, RouterLink],
    template: `
    <div class="page">
      <h2>📬 Contact Us</h2>
      <p>Send us a message using the form below!</p>
      
      <div class="card">
        <h3>Send a Message</h3>
        <form (ngSubmit)="submitForm()">
          <input 
            type="text" 
            placeholder="Your Name" 
            [(ngModel)]="formData.name"
            name="name"
            required 
          />
          <input 
            type="email" 
            placeholder="Your Email" 
            [(ngModel)]="formData.email"
            name="email"
            required 
          />
          <textarea 
            rows="5" 
            placeholder="Your Message"
            [(ngModel)]="formData.message"
            name="message"
            required 
          ></textarea>
          <button type="submit" class="btn">Send Message</button>
        </form>
      </div>
      
      <a routerLink="/" class="btn">← Back Home</a>
    </div>
  `,
    styles: []
})
export class ContactComponent {
    formData = {
        name: '',
        email: '',
        message: ''
    };

    submitForm(): void {
        alert('Message sent! (Demo only)');
        this.formData = { name: '', email: '', message: '' };
    }
}

