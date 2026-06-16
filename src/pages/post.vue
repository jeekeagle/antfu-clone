<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { posts } from '../data/posts'

const route = useRoute()
const router = useRouter()

const post = computed(() => posts.find(p => p.slug === route.params.slug))

if (!post.value) {
  router.push('/posts')
}
</script>

<template>
  <article>
    <div class="prose m-auto slide-enter-content">
      <div class="prose m-auto mt-8 mb-8 slide-enter animate-delay-500">
        <br />
        <span class="font-mono op50">&gt; </span>
        <router-link to="/posts" class="font-mono op50 hover:op75">返回</router-link>
      </div>

      <div v-if="post">
        <h1>{{ post.title }}</h1>
        <p class="op50 text-sm">
          {{ new Date(post.date).toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' }) }}
          <span v-if="post.readTime"> · 阅读 {{ post.readTime }} 分钟</span>
        </p>

        <p v-if="post.desc" class="italic op75">{{ post.desc }}</p>

        <hr />

        <p>
          这是文章正文的占位内容。在你的真实站点里，可以接入 markdown 渲染，常见方案：
        </p>
        <ul>
          <li>使用 <code>unplugin-vue-markdown</code> 直接 <code>.md</code> 导入</li>
          <li>迁移到 Nuxt 后用 <code>@nuxt/content</code></li>
          <li>用 Vite 的 <code>?raw</code> 导入 + markdown 渲染器</li>
        </ul>

        <p>
          也可以直接在 <code>&lt;script setup&gt;</code> 里写正文。每篇文章就是一个 Vue 路由。
        </p>
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
