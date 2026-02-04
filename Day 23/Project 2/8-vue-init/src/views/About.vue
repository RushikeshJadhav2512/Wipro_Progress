<template>
  <div class="page">
    <h2>ℹ️ About Vue</h2>
    <p>Vue is a progressive JavaScript framework for building user interfaces.</p>
    
    <div class="card">
      <h3>Why Vue.js?</h3>
      <ul>
        <li>📐 Gentle learning curve</li>
        <li>🔧 Flexible and adaptable</li>
        <li>⚡ High performance</li>
        <li>💚 Vue 3 Composition API</li>
        <li>📚 Excellent documentation</li>
      </ul>
    </div>
    
    <div class="card">
      <h3>Vue 3 Composition API</h3>
      <p>The Composition API allows better logic reuse and organization:</p>
      <pre><script setup>
import { ref, computed } from 'vue'

const count = ref(0)
const double = computed(() => count.value * 2)
</script></pre>
    </div>
    
    <router-link to="/" class="btn">← Back Home</router-link>
    <router-link to="/contact" class="btn">Get in Touch</router-link>
  </div>
</template>

<script setup>
// Vue 3 Composition API - About Component
</script>
