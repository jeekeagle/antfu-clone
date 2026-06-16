<script setup lang="ts">
import { demos } from '../data/content'
</script>

<template>
  <div class="text-center prose m-auto mb-8">
    <h1 class="mb-0 slide-enter-50">实验</h1>
  </div>

  <article>
    <div class="prose m-auto slide-enter-content">
      <p class="op50 italic">
        一些小型交互实验和生成艺术作品。
      </p>
      <hr />

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
        <a
          v-for="(d, i) in demos"
          :key="d.name"
          :href="d.href"
          target="_blank"
          rel="noopener"
          class="project-card slide-enter"
          :style="{ '--enter-stage': i, '--enter-step': '50ms' }"
        >
          <div class="icon"><i class="i-ri-screenshot-line"></i></div>
          <div class="title">{{ d.name }}</div>
          <div class="desc">{{ d.desc }}</div>
          <div class="flex gap-1 mt-2 flex-wrap">
            <span
              v-for="t in d.tags"
              :key="t"
              class="text-xs op60 px-1.5 py-0.5 rounded bg-[#8882]"
            >#{{ t }}</span>
          </div>
        </a>
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
