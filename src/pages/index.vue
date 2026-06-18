<script setup lang="ts">
import MagicLink from '../components/MagicLink.vue'

const year = new Date().getFullYear()

// 社交 / 工作 / 项目 / 维护 —— 都用 MagicLink 风格胶囊
const socials = [
  { name: 'GitHub', icon: 'i-simple-icons-github', href: 'https://github.com/jeekeagle' },
  { name: '知乎', icon: 'i-simple-icons-zhihu', href: 'https://zhihu.com' },
  { name: '微博', icon: 'i-simple-icons-sinaweibo', href: 'https://weibo.com' },
  { name: 'X', icon: 'i-ri-twitter-x-fill', href: 'https://x.com' },
  { name: 'B站', icon: 'i-simple-icons-bilibili', href: 'https://space.bilibili.com' },
]

// 工具 / 站点占位
const links = {
  projects: '/#/projects',
  bookmarks: '#',
  websites: '/#/websites',
  use: '/#/use',
  photos: '/#/photos',
  paintings: '/#/paintings',
  skillsHub: '#',
  fairytale: '#',
}
</script>

<template>
  <div class="prose m-auto mb-8">
    <h1 class="mb-0 slide-enter-50">Yiguo</h1>
  </div>

  <article>
    <div class="prose m-auto slide-enter-content">
      <p>
        你好！我是 Yiguo，你的朋友，一个智能时代的工程师。
      </p>

      <p>
        在山东青岛工作。
      </p>

      <p>
        构思酷点子并把它们变成现实，是我的热情所在。
        我热衷于打造让自己和他人更高效、享受过程的工具。
      </p>

      <p>
        自我定位是一名 <abbr title="One-Person Company">OPC</abbr>，
        借助 Agent 的力量，一个人就能完成过去需要团队才能做的事情。
        你可以在
        <a :href="links.projects" class="font-semibold"><strong>这里</strong></a>
        看到我的全部项目。
      </p>

      <p>
        我会经常写
        <a
          href="https://www.wangyiguo.top/posts"
          target="_blank"
          rel="noopener noreferrer"
          class="!border-none font-semibold"
        >博客文章</a>，
        聊聊 AI、Agent 架构、个人知识管理和个人成长的那些事。
        我还喜欢看书和写书，把思考过程变成可以回溯的资产。
      </p>

      <p>
        编程之外，我也喜欢
        <a :href="links.photos" class="font-semibold"><strong>摄影</strong></a>
        、旅行和 AI 画画。照片会发到
        <a :href="links.photos" class="font-semibold"><strong>这个页面</strong></a>。
      </p>

      <p>
        如果你感兴趣，可以看看我的
        <a :href="links.use" class="font-semibold"><strong>常用工具</strong></a>
        /
        <a :href="links.use" class="font-semibold"><strong>技术栈</strong></a>
        /
        <a :href="links.skillsHub" class="font-semibold"><strong>SkillsHub</strong></a>
        。
      </p>

      <p>
        家里有一个女儿，我很珍惜与女儿一起的时光。
        也用笔记记录女儿的成长，
        <a :href="links.fairytale" class="font-semibold"><strong>这个女儿的"童话小镇"</strong></a>。
      </p>

      <p>
        如果你喜欢我做的东西，欢迎常来看看。
      </p>

      <div class="flex-auto"></div>

      <hr />

      <p class="op-50 italic">在以下平台找我</p>
      <p class="mt--2! flex flex-wrap gap-2">
        <MagicLink
          v-for="s in socials"
          :key="s.name"
          :href="s.href"
          :name="s.name"
        />
      </p>
      <p>
        或者发邮件到
        <span class="font-mono">hi<span class="i-carbon-at"></span>yiguo.dev</span>
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
      2021-{{ year }} © Yiguo
    </span>
    <div class="flex-auto"></div>
  </div>
</template>
