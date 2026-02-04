import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-about',
    standalone: true,
    imports: [RouterLink],
    template: `
    <div class="page">
      <h2>ℹ️ About Angular</h2>
      <p>Angular is a platform and framework for building single-page client applications using HTML and TypeScript.</p>
      
      <div class="card">
        <h3>Why Angular?</h3>
        <ul>
          <li>📐 Structured framework</li>
          <li>🔧 Full-featured CLI</li>
          <li>💉 Dependency injection</li>
          <li>🎯 TypeScript support</li>
          <li>🏢 Enterprise-ready</li>
        </ul>
      </div>
      
      <div class="card">
        <h3>Standalone Components</h3>
        <p>Angular 17 introduced standalone components that simplify application architecture:</p>
        <pre>
@Component(&#123;
  standalone: true,
  imports: [CommonModule],
  template: \`...\`
&#125;)
export class MyComponent &#123;&#125;</pre>
      </div>
      
      <a routerLink="/" class="btn">← Back Home</a>
      <a routerLink="/contact" class="btn">Get in Touch</a>
    </div>
  `,
    styles: []
})
export class AboutComponent { }

