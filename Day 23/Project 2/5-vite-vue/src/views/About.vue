<template>
  <div class="page">
    <h2>ℹ️ About Vue</h2>
    <p>Vue.js is a progressive JavaScript framework for building user interfaces.</p>
    
    <div class="card">
      <h3>Why Vue?</h3>
      <ul>
        <li>📖 Easy to learn</li>
        <li>🔧 Flexible</li>
        <li>⚡ Fast and lightweight</li>
        <li>🧩 Component-based</li>
        <li>🌟 Great documentation</li>
      </ul>
    </div>
    
    <div class="card">
      <h3>Composition API</h3>
      <p>Vue 3 introduces the Composition API for better code organization:</p>
      <pre>
<script setup>
import { ref } from 'vue'

const count = ref(0)
</script></pre>
    </div>
    
    <router-link to="/" class="btn">← Back Home</router-link>
    <router-link to="/contact" class="btn">Get in Touch</router-link>
  </div>
</template>

<script setup>
</script>

