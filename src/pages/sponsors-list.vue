<script setup lang="ts">
import { computed } from 'vue'
import { sponsors } from '../data/content'

const grouped = computed(() => {
  const tiers = ['gold', 'silver', 'bronze', 'past'] as const
  return tiers.map(t => ({
    tier: t === 'past' ? '历史赞助' : t === 'gold' ? '金牌' : t === 'silver' ? '银牌' : '铜牌',
    items: sponsors.filter(s => s.tier === t),
  }))
})
</script>

<template>
  <div class="text-center prose m-auto mb-8">
    <h1 class="mb-0 slide-enter-50">赞助者</h1>
  </div>

  <article>
    <div class="prose m-auto slide-enter-content">
      <p class="op50 italic text-center">
        感谢所有支持我开源工作的人。
      </p>
      <hr />

      <section v-for="g in grouped" :key="g.tier" class="mb-8">
        <h3 v-if="g.items.length" class="op60">{{ g.tier }}</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <a
            v-for="s in g.items"
            :key="s.name"
            :href="s.href"
            target="_blank"
            rel="noopener"
            class="sponsor-card"
          >
            <div class="sponsor-avatar">{{ s.name.charAt(0) }}</div>
            <div>
              <div class="sponsor-name">{{ s.name }}</div>
              <div class="sponsor-amount">{{ s.amount }}</div>
            </div>
          </a>
        </div>
      </section>
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
