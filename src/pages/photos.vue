<script setup lang="ts">
import { photos } from '../data/content'
</script>

<template>
  <div class="text-center prose m-auto mb-8">
    <h1 class="mb-0 slide-enter-50">摄影</h1>
  </div>

  <article>
    <div class="max-w-300 mx-auto slide-enter-content">
      <p class="op50 italic text-center">
        一些我用相机记录下的瞬间。
      </p>

      <div class="photos-grid mt-8">
        <div
          v-for="(p, i) in photos"
          :key="p.id"
          class="photo-card slide-enter"
          :style="{
            '--enter-stage': i,
            '--enter-step': '40ms',
            background: `linear-gradient(135deg, ${p.color} 0%, var(--bg) 100%)`,
          }"
        >
          <div class="placeholder">{{ p.title }}</div>
        </div>
      </div>
    </div>
  </article>

  <div class="mt-10 mb-6 prose m-auto flex slide-enter animate-delay-1200 copyright">
    <span class="text-sm op50">
      <a
        target="_blank"
        href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
        style="color: inherit"
      >CC BY-NC-SA 4.0</a>
      2021-{{ new Date().getFullYear() }} © 你的名字
    </span>
    <div class="flex-auto"></div>
  </div>
</template>
