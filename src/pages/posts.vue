<script setup lang="ts">
import { computed, ref } from 'vue'
import { posts, tagColor } from '../data/posts'

// 是否只看中文（antfu 的 English Only 开关）
const zhOnly = ref(false)

const visiblePosts = computed(() =>
  zhOnly.value ? posts.filter(p => p.lang === 'zh' || !p.lang) : posts,
)

const groupKeys = computed(() => {
  const set = new Set<string>()
  for (const p of visiblePosts.value) {
    set.add(p.date.slice(0, 4))
  }
  return Array.from(set).sort((a, b) => Number(b) - Number(a))
})

const grouped = computed(() => {
  return groupKeys.value.map(year => ({
    year,
    items: visiblePosts.value.filter(p => p.date.startsWith(year)),
  }))
})

function formatDate(iso: string) {
  const d = new Date(iso)
  const y = d.getFullYear()
  const now = new Date().getFullYear()
  // 跟 antfu 一致：本年度只显示 M月D日，往年才带年份
  if (y === now) return `${d.getMonth() + 1} 月 ${d.getDate()} 日`
  return `${y} 年 ${d.getMonth() + 1} 月 ${d.getDate()} 日`
}

function langLabel(lang?: 'zh' | 'en') {
  if (lang === 'zh') return '中文'
  if (lang === 'en') return 'EN'
  return ''
}

function langClass(lang?: 'zh' | 'en') {
  if (lang === 'zh') return 'bg-rose-500/15 text-rose-700 dark:text-rose-300'
  if (lang === 'en') return 'bg-sky-500/15 text-sky-700 dark:text-sky-300'
  return 'bg-zinc-500/15 text-zinc-600 dark:text-zinc-300'
}
</script>

<template>
  <article>
    <div class="prose m-auto slide-enter-content">
      <!-- 顶部开关 + 简介 -->
      <div class="prose m-auto mb-8 select-none animate-none op100">
        <button
          class="flex items-center gap-1 mb-3 op-30 text-sm"
          @click="zhOnly = !zhOnly"
        >
          <i :class="zhOnly ? 'i-ri-checkbox-circle-line' : 'i-ri-checkbox-blank-circle-line'" />
          只看中文
        </button>
        <p class="op-50 italic mt-0 mb-0 text-sm">
          写点 AI、Agent 架构、个人知识管理、个人成长相关的事。
        </p>
      </div>

      <ul class="post-list">
        <template v-for="(g, gi) in grouped" :key="g.year">
          <!-- 年份大字符 -->
          <div
            class="select-none relative h-20 pointer-events-none slide-enter"
            :style="{ '--enter-stage': gi * 2 - 2, '--enter-step': '60ms' }"
          >
            <span
              class="text-8em color-transparent absolute left--3rem top--2rem font-bold stroke-text-2 op10"
            >{{ g.year }}</span>
          </div>

          <!-- 每篇文章 -->
          <li
            v-for="(p, j) in g.items"
            :key="p.slug"
            class="post-item slide-enter"
            :style="{ '--enter-stage': gi * 2 + j + 1, '--enter-step': '60ms' }"
          >
            <a
              :href="`#/posts/${p.slug}`"
              class="post-item-link"
            >
              <div class="post-row">
                <div class="post-title-wrap">
                  <span
                    v-if="langLabel(p.lang)"
                    class="lang-badge"
                    :class="langClass(p.lang)"
                  >{{ langLabel(p.lang) }}</span>
                  <span class="post-title">{{ p.title }}</span>
                  <i
                    v-if="p.redirect"
                    class="post-external op-50 ml--1.5"
                    title="外部链接"
                  />
                </div>

                <div class="post-meta">
                  <span class="post-date">{{ formatDate(p.date) }}</span>
                  <span v-if="p.readTime" class="post-sub">· {{ p.readTime }} 分钟</span>
                </div>
              </div>

              <div v-if="p.tags && p.tags.length" class="post-tags">
                <span
                  v-for="t in p.tags"
                  :key="t"
                  class="post-tag"
                  :class="tagColor(t)"
                >#{{ t }}</span>
              </div>

              <div v-if="p.desc" class="post-desc op-60">
                {{ p.desc }}
              </div>
            </a>
          </li>
        </template>
      </ul>

      <div v-if="!visiblePosts.length" class="op-50 italic">
        还没有文章。
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
      2021-{{ new Date().getFullYear() }} © Yiguo
    </span>
    <div class="flex-auto"></div>
  </div>
</template>

<style scoped>
.post-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.post-item {
  padding-left: 0 !important;
  margin: 1.25rem 0;
}

.post-item::before {
  display: none;
}

.post-item-link {
  display: block;
  text-decoration: none;
  color: inherit;
  border: 0 !important;
  opacity: 0.7;
  transition: opacity 0.2s ease-out;
}

.post-item-link:hover {
  opacity: 1;
}

.post-row {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

@media (min-width: 768px) {
  .post-row {
    flex-direction: row;
    gap: 0.5rem;
    align-items: center;
  }
}

.post-title-wrap {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  flex-wrap: wrap;
  flex: 1;
}

.post-title {
  font-size: 1.125rem;
  line-height: 1.2em;
  font-weight: 500;
}

.lang-badge {
  display: inline-flex;
  align-items: center;
  font-size: 0.7rem;
  border-radius: 4px;
  padding: 0.1rem 0.4rem;
  margin-left: -0.75rem;
  margin-right: 0.5rem;
  flex-shrink: 0;
}

@media (min-width: 768px) {
  .lang-badge {
    margin-left: 0;
  }
}

.post-external::before {
  content: '↗';
  font-size: 0.85em;
}

.post-meta {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  flex-shrink: 0;
}

.post-date {
  font-size: 0.875rem;
  opacity: 0.5;
  white-space: nowrap;
}

.post-sub {
  font-size: 0.875rem;
  opacity: 0.4;
  white-space: nowrap;
}

.post-tags {
  display: flex;
  gap: 0.25rem;
  flex-wrap: wrap;
  margin-top: 0.5rem;
}

.post-tag {
  font-size: 0.7rem;
  border-radius: 4px;
  padding: 0.1rem 0.4rem;
}

.post-desc {
  font-size: 0.85rem;
  margin-top: 0.4rem;
  line-height: 1.5;
}
</style>
