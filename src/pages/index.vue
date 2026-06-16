<script setup lang="ts">
import { profile } from '../data/profile'
import MagicLink from '../components/MagicLink.vue'

const year = new Date().getFullYear()
</script>

<template>
  <div class="prose m-auto mb-8">
    <h1 class="mb-0 slide-enter-50">{{ profile.name }}</h1>
  </div>

  <article>
    <div class="prose m-auto slide-enter-content">
      <p>{{ profile.bio }}</p>

      <p>
        就职于
        <MagicLink
          v-for="w in profile.work"
          :key="w.name"
          :href="w.href"
          :avatar="w.avatar"
          :name="w.name"
        />
        <br />
        我创造了
        <MagicLink
          v-for="c in profile.creator"
          :key="c.name"
          :href="c.href"
          :avatar="c.avatar"
          :name="c.name"
        />
        <br />
        核心团队成员
        <MagicLink
          v-for="c in profile.coreTeam"
          :key="c.name"
          :href="c.href"
          :avatar="c.avatar"
          :name="c.name"
        />
        <br />
        正在维护
        <MagicLink
          v-for="m in profile.maintaining"
          :key="m.name"
          :href="m.href"
          :avatar="m.avatar"
          :name="m.name"
        />
      </p>

      <p>
        构思酷点子并把它们变成现实，是我的热情所在。
        我热衷于打造让自己和他人更高效、享受过程的工具。
        你可以在
        <router-link to="/projects">这里看到我的全部项目</router-link>。
      </p>

      <p>
        我会做
        <router-link to="/talks">演讲</router-link>
        ，写
        <router-link to="/posts">博客文章</router-link>，
        聊聊开源、写代码那些事。我还联合主持一档播客
        <a href="https://example.com" target="_blank" rel="noopener"><em>播客名</em></a>
        <span class="op75">（占位）</span>。
        偶尔会在
        <a href="https://youtube.com" target="_blank" rel="noopener">YouTube</a>
        和
        <a href="https://bilibili.com" target="_blank" rel="noopener">B 站</a>
        做直播写代码。兴致来了，会在
        <a href="https://100.antfu.me/" target="_blank" rel="noopener">100.antfu.me</a>
        玩一些生成艺术和交互实验。
      </p>

      <p>
        编程之外，我也喜欢摄影和旅行。照片会发到
        <router-link to="/photos">这个页面</router-link>。
        如果你感兴趣，可以看看我的
        <router-link to="/use">常用硬件 / 软件</router-link>。
      </p>

      <div class="flex-auto"></div>

      <hr />

      <p>在以下平台找我</p>
      <p class="mt--2! flex flex-wrap gap-2">
        <a
          v-for="s in profile.socials"
          :key="s.name"
          :href="s.href"
          target="_blank"
          rel="noopener"
        >
          <span class="op75" :class="s.icon"></span>
          {{ s.name }}
        </a>
      </p>
      <p>
        或者发邮件到
        <span class="font-mono">hi<span class="i-carbon-at"></span>{{ profile.domain }}</span>
      </p>

      <hr />

      <p>
        如果你喜欢我做的东西，希望它能持续下去，
        欢迎赞助我和相关生态，让开源走得更远。非常感谢！
      </p>

      <p class="flex flex-wrap items-center gap-2">
        <a
          v-for="sp in profile.sponsors"
          :key="sp.name"
          :href="sp.href"
          target="_blank"
          rel="noopener"
          :class="sp.class"
        >
          <i :class="[sp.icon, 'group-hover:scale-110']"></i>
          {{ sp.name }}
        </a>
      </p>
    </div>
  </article>

  <div class="mt-10 mb-6 prose m-auto flex slide-enter animate-delay-1200 copyright">
    <span class="text-sm op50">
      <a
        target="_blank"
        href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
        style="color: inherit"
      >CC BY-NC-SA 4.0</a>
      2021-{{ year }} © {{ profile.name }}
    </span>
    <div class="flex-auto"></div>
  </div>
</template>
