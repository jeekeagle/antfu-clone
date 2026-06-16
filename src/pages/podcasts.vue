<script setup lang="ts">
import { podcasts } from '../data/content'
</script>

<template>
  <div class="text-center prose m-auto mb-8">
    <h1 class="mb-0 slide-enter-50">播客</h1>
  </div>

  <article>
    <div class="prose m-auto slide-enter-content">
      <p class="op50 italic">
        我主持或联合主持的播客节目。
      </p>
      <hr />

      <ul>
        <li
          v-for="(p, i) in podcasts"
          :key="p.name"
          class="slide-enter flex flex-col gap-2 mb-6"
          :style="{ '--enter-stage': i, '--enter-step': '60ms' }"
        >
          <a :href="p.href" target="_blank" rel="noopener" class="!border-none flex items-center gap-2">
            <i :class="p.icon" class="op60 text-lg"></i>
            <span class="font-semibold">{{ p.name }}</span>
          </a>
          <p class="op75 ml-6 mt-0">{{ p.desc }}</p>
        </li>
      </ul>
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
