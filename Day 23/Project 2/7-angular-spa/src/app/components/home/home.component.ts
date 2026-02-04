import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [RouterLink],
    template: `
    <div class="page">
      <h2>🏠 Welcome Home</h2>
      <p>Welcome to the Angular Single Page Application!</p>
      
      <div class="card">
        <h3>Angular Features</h3>
        <ul>
          <li>✓ TypeScript-based</li>
          <li>✓ Dependency Injection</li>
          <li>✓ Two-way data binding</li>
          <li>✓ Modular architecture</li>
          <li>✓ Enterprise-ready</li>
        </ul>
      </div>
      
      <div class="card">
        <h3>Angular 17 Features</h3>
        <ul>
          <li>🚀 Standalone components by default</li>
          <li>⚡ Improved hydration</li>
          <li>🎯 Deferrable views</li>
          <li>📦 Reduced bundle size</li>
        </ul>
      </div>
      
      <a routerLink="/about" class="btn">Learn More →</a>
      <a routerLink="/contact" class="btn">Contact Us</a>
    </div>
  `,
    styles: []
})
export class HomeComponent { }

