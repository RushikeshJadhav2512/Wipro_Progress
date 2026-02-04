<template>
  <div class="page">
    <h2>📬 Contact Us</h2>
    <p>Send us a message using the form below!</p>
    
    <div class="card">
      <h3>Send a Message</h3>
      <form @submit.prevent="submitForm">
        <input 
          type="text" 
          placeholder="Your Name" 
          v-model="formData.name"
          required 
        />
        <input 
          type="email" 
          placeholder="Your Email" 
          v-model="formData.email"
          required 
        />
        <textarea 
          rows="5" 
          placeholder="Your Message"
          v-model="formData.message"
          required 
        ></textarea>
        <button type="submit" class="btn">Send Message</button>
      </form>
    </div>
    
    <router-link to="/" class="btn">← Back Home</router-link>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const formData = reactive({
  name: '',
  email: '',
  message: ''
})

const submitForm = () => {
  alert('Message sent! (Demo only)')
  formData.name = ''
  formData.email = ''
  formData.message = ''
}
</script>
