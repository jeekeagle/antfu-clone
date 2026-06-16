<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useColorScheme } from '../composables/useColorScheme'

const { toggle } = useColorScheme()
const showScrollTop = ref(false)
const isMobile = ref(false)

const navItems = [
  { to: '/posts', title: '博客', icon: 'i-ri-article-line', text: '博客' },
  { to: '/projects', title: '项目', icon: 'i-ri-lightbulb-line', text: '项目' },
  { to: '/talks', title: '演讲', icon: 'i-ri-slideshow-line', text: '演讲', hideOnMobile: true },
  { to: '/sponsors-list', title: '赞助者', icon: 'i-ri-heart-line', text: '赞助' },
  { to: '/podcasts', title: '播客', icon: 'i-ri-mic-line', text: '播客', hideOnMobile: true },
  { to: '/photos', title: '摄影', icon: 'i-ri-camera-3-line', text: '摄影' },
  { to: '/demos', title: '实验', icon: 'i-ri-screenshot-line', text: '实验' },
]

function updateBreakpoint() {
  isMobile.value = window.innerWidth < 768
}

function handleScroll() {
  showScrollTop.value = window.scrollY > 200
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  updateBreakpoint()
  window.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('resize', updateBreakpoint)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', updateBreakpoint)
})
</script>

<template>
  <header class="app-header">
    <router-link
      to="/"
      class="app-logo"
      focusable="false"
      aria-label="首页"
    >
      <!-- 复刻 antfu 的手写体 SVG logo + 笔画动画 -->
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="w-full h-full"
      >
        <title>个人主页</title>
        <g>
          <path
            class="logo-path"
            d="M40 30 Q35 45 50 50 Q60 45 55 35 M55 35 L70 20 M50 50 L55 70 L60 75 M40 30 Q30 50 35 60"
            stroke-width="2.5"
            stroke-linecap="round"
          />
        </g>
      </svg>
    </router-link>

    <button
      title="回到顶部"
      class="scroll-top-btn"
      :class="{ visible: showScrollTop }"
      @click="scrollToTop"
    >
      <i class="i-ri-arrow-up-line" />
    </button>

    <nav class="app-nav">
      <div class="spacer" />
      <div class="app-nav-right print:hidden">
        <router-link
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          :title="item.title"
        >
          <span v-if="!isMobile || !item.icon" :class="{ 'hidden md:inline': item.hideOnMobile }">
            {{ item.text }}
          </span>
          <i
            v-if="isMobile"
            :class="[item.icon, { 'md:hidden': item.hideOnMobile && item.text }]"
          />
        </router-link>

        <a
          href="https://github.com"
          target="_blank"
          title="GitHub"
          class="hidden md:inline-flex"
        >
          <i class="i-uil-github-alt" />
        </a>
        <a
          href="/feed.xml"
          target="_blank"
          title="RSS"
          class="hidden md:inline-flex"
        >
          <i class="i-la-rss-square" style="font-size: 1.25rem; margin: 0 -0.125rem" />
        </a>

        <a
          class="cursor-pointer select-none"
          title="切换深色 / 浅色"
          @click.prevent="toggle"
        >
          <i class="i-ri-sun-line dark:i-ri-moon-line" />
        </a>
      </div>
    </nav>
  </header>
</template>
