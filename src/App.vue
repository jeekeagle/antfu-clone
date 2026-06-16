<script setup lang="ts">
import AppHeader from './components/AppHeader.vue'
import DotsBackground from './components/DotsBackground.vue'
</script>

<template>
  <DotsBackground />
  <AppHeader />
  <main class="app-main">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </main>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
