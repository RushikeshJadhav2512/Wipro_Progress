<template>
  <div id="app">
    <header>
      <h1>💚 Vue SPA</h1>
      <nav>
        <router-link to="/">Home</router-link>
        <router-link to="/about">About</router-link>
        <router-link to="/contact">Contact</router-link>
      </nav>
    </header>
    <main>
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <footer>
      <p>© 2024 Vue SPA Template - Built with Vue 3</p>
    </footer>
  </div>
</template>

<script setup>
// Vue 3 Composition API
</script>

<style scoped>
nav a.router-link-active {
  background: rgba(255,255,255,0.25);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
