<script setup lang="ts">
import { computed, ref } from 'vue'
import { posts } from '../data/posts'

const chineseOnly = ref(false)

// 按年份分组
const grouped = computed(() => {
  const map = new Map<string, typeof posts>()
  for (const p of posts) {
    const y = p.date.slice(0, 4)
    if (!map.has(y)) map.set(y, [])
    map.get(y)!.push(p)
  }
  return Array.from(map.entries()).sort((a, b) => Number(b[0]) - Number(a[0]))
})

function formatDate(iso: string) {
  const d = new Date(iso)
  return `${d.getMonth() + 1} 月 ${d.getDate()} 日`
}
</script>

<template>
  <article>
    <div class="prose m-auto slide-enter-content">
      <div class="prose m-auto mb-8 select-none animate-none op100">
        <div class="mb-0 flex flex-col sm:flex-row sm:gap-3 flex-wrap text-3xl">
          <router-link to="/posts" class="!border-none opacity-100 underline">博客</router-link>
          <router-link to="/talks" class="!border-none opacity-20 hover:opacity-50">演讲</router-link>
          <router-link to="/podcasts" class="!border-none opacity-20 hover:opacity-50">播客</router-link>
          <router-link to="/demos" class="!border-none opacity-20 hover:opacity-50">实验</router-link>
          <router-link to="/photos" class="!border-none opacity-20 hover:opacity-50">摄影</router-link>
        </div>
      </div>

      <ul>
        <template v-for="([year, items], i) in grouped" :key="year">
          <div
            class="select-none relative h-20 pointer-events-none slide-enter"
            :style="{ '--enter-stage': i * 2 - 2, '--enter-step': '60ms' }"
          >
            <span
              class="text-8em color-transparent absolute left--3rem top--2rem font-bold stroke-text-2 op10"
            >{{ year }}</span>
          </div>
          <div
            v-for="(p, j) in items"
            :key="p.slug"
            class="slide-enter"
            :style="{ '--enter-stage': i * 2 + j + 1, '--enter-step': '60ms' }"
          >
            <router-link
              :to="`/posts/${p.slug}`"
              class="list-item block font-normal mb-6 mt-2 no-underline"
            >
              <li class="no-underline flex flex-col md:row gap-2 md:items-center">
                <div class="title text-lg leading-1.2em flex gap-2 flex-wrap">
                  <span class="align-middle">{{ p.title }}</span>
                </div>
                <div class="flex gap-2 items-center list-item-row">
                  <span class="text-sm op50 ws-nowrap">{{ formatDate(p.date) }}</span>
                  <span v-if="p.readTime" class="text-sm op40 ws-nowrap">· {{ p.readTime }} 分钟</span>
                </div>
              </li>
            </router-link>
          </div>
        </template>
      </ul>

      <div v-if="!posts.length" class="op50 italic">还没有文章。</div>
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
