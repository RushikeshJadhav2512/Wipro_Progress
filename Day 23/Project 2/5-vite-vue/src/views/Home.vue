<template>
  <div class="page">
    <h2>💚 Welcome to Vue SPA</h2>
    <p>This is a modern Vue 3 Single Page Application built with Vite!</p>
    
    <div class="card">
      <h3>Vue 3 Features</h3>
      <ul>
        <li>✓ Composition API</li>
        <li>✓ Better TypeScript support</li>
        <li>✓ Improved performance</li>
        <li>✓ Single File Components</li>
        <li>✓ Vue Router integration</li>
      </ul>
    </div>
    
    <div class="card">
      <h3>Quick Start</h3>
      <pre>
npm install
npm run dev</pre>
    </div>
    
    <router-link to="/about" class="btn">Learn More →</router-link>
    <router-link to="/contact" class="btn">Contact Us</router-link>
  </div>
</template>

<script setup>
</script>

