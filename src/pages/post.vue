<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { marked } from 'marked'
import { posts, tagColor } from '../data/posts'

const route = useRoute()
const router = useRouter()

const post = computed(() => posts.find(p => p.slug === route.params.slug))

if (!post.value) {
  router.push('/posts')
}

// 配置 marked：GFM、支持表格、代码块、任务列表
marked.setOptions({
  gfm: true,
  breaks: false,
})

const html = computed(() => {
  if (!post.value?.content) return ''
  return marked.parse(post.value.content) as string
})

const formattedDate = computed(() => {
  if (!post.value?.date) return ''
  const d = new Date(post.value.date)
  return d.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })
})
</script>

<template>
  <article>
    <div class="prose m-auto slide-enter-content">
      <!-- 返回链接 -->
      <div class="prose m-auto mt-8 mb-8 slide-enter animate-delay-500">
        <span class="font-mono op50">&gt; </span>
        <router-link to="/posts" class="font-mono op50 hover:op75">返回博客列表</router-link>
      </div>

      <div v-if="post">
        <h1 class="!mb-3">{{ post.title }}</h1>

        <div class="post-meta-row flex flex-wrap items-center gap-3 mb-4">
          <time class="op50 text-sm">{{ formattedDate }}</time>
          <span v-if="post.readTime" class="op40 text-sm">· 阅读 {{ post.readTime }} 分钟</span>
          <span
            v-for="t in post.tags"
            :key="t"
            class="text-xs rounded px-1.5 py-0.5"
            :class="tagColor(t)"
          >#{{ t }}</span>
        </div>

        <p v-if="post.desc" class="italic op75 !mt-2 !mb-4">
          {{ post.desc }}
        </p>

        <hr />

        <!-- 正文 -->
        <div class="post-body" v-html="html" />
      </div>

      <div v-else class="op-50 italic">
        文章未找到。
      </div>
    </div>
  </article>

  <!-- 底部：上一篇 / 下一篇 + 版权 -->
  <div v-if="post" class="prose m-auto mt-12 flex flex-wrap gap-4">
    <router-link
      v-if="prevPost"
      :to="`#/posts/${prevPost.slug}`"
      class="btn btn-amber"
    >
      ← {{ prevPost.title }}
    </router-link>
    <router-link
      v-if="nextPost"
      :to="`#/posts/${nextPost.slug}`"
      class="btn btn-amber ml-auto"
    >
      {{ nextPost.title }} →
    </router-link>
  </div>

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

<script lang="ts">
import { computed as cmp } from 'vue'
import { posts as allPosts } from '../data/posts'

export default {
  computed: {
    prevPost() {
      const idx = allPosts.findIndex(p => p.slug === this.$route.params.slug)
      return idx > 0 ? allPosts[idx - 1] : null
    },
    nextPost() {
      const idx = allPosts.findIndex(p => p.slug === this.$route.params.slug)
      return idx >= 0 && idx < allPosts.length - 1 ? allPosts[idx + 1] : null
    },
  },
}
</script>

<style scoped>
.post-body {
  line-height: 1.8;
}

.post-body :deep(h1) {
  font-size: 1.6em;
  font-weight: 700;
  margin: 1.5em 0 0.8em;
  color: var(--fg-deeper);
}

.post-body :deep(h2) {
  font-size: 1.4em;
  font-weight: 700;
  margin: 1.5em 0 0.6em;
  padding-bottom: 0.3em;
  border-bottom: 1px solid #8883;
  color: var(--fg-deeper);
}

.post-body :deep(h3) {
  font-size: 1.2em;
  font-weight: 600;
  margin: 1.2em 0 0.5em;
  color: var(--fg-deep);
}

.post-body :deep(p) {
  margin: 1em 0;
}

.post-body :deep(ul),
.post-body :deep(ol) {
  margin: 1em 0;
  padding-left: 1.5em;
}

.post-body :deep(li) {
  margin: 0.4em 0;
}

.post-body :deep(li)::before {
  display: none;
}

.post-body :deep(blockquote) {
  margin: 1em 0;
  padding: 0.5em 1em;
  border-left: 3px solid #8885;
  background: #8881;
  font-style: normal;
  color: var(--fg-deep);
  border-radius: 0 4px 4px 0;
}

.post-body :deep(blockquote p) {
  margin: 0.3em 0;
}

.post-body :deep(code) {
  background: #8882;
  padding: 0.1em 0.35em;
  border-radius: 3px;
  font-family: 'LXGW WenKai Mono', ui-monospace, SFMono-Regular, monospace;
  font-size: 0.9em;
}

.post-body :deep(pre) {
  background: #8881;
  padding: 1em;
  border-radius: 6px;
  overflow-x: auto;
  margin: 1em 0;
}

.post-body :deep(pre code) {
  background: transparent;
  padding: 0;
  font-size: 0.85em;
}

.post-body :deep(hr) {
  width: 50px;
  margin: 2em auto;
  border: 0;
  border-top: 1px solid #7d7d7d4d;
}

.post-body :deep(a) {
  color: var(--fg-deeper);
  font-weight: 500;
  text-decoration: none;
  border-bottom: 1px solid #7d7d7d4d;
  transition: border-color 0.3s;
}

.post-body :deep(a:hover) {
  border-bottom-color: var(--fg);
}

.post-body :deep(strong) {
  color: var(--fg-deeper);
  font-weight: 600;
}

.post-body :deep(em) {
  font-style: italic;
  color: var(--fg-deep);
}

.post-body :deep(img) {
  max-width: 100%;
  border-radius: 6px;
  margin: 1em 0;
}

.post-body :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 1em 0;
}

.post-body :deep(th),
.post-body :deep(td) {
  border: 1px solid #8883;
  padding: 0.5em 0.8em;
  text-align: left;
}

.post-body :deep(th) {
  background: #8881;
  font-weight: 600;
}
</style>
