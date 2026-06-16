<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useColorScheme } from '../composables/useColorScheme'

const { toggle } = useColorScheme()
const showScrollTop = ref(false)
const isMobile = ref(false)

const navItems = [
  { to: '#/posts', title: '博客', icon: 'i-ri-article-line', text: '博客' },
  { to: '#/projects', title: '项目', icon: 'i-ri-lightbulb-line', text: '项目' },
  { to: '#/websites', title: '网站', icon: 'i-ri-global-line', text: '网站' },
  { to: '#/photos', title: '摄影', icon: 'i-ri-camera-3-line', text: '摄影' },
  { to: '#/paintings', title: '绘画', icon: 'i-ri-palette-line', text: '绘画' },
  { to: '#/demos', title: '探索实验', icon: 'i-ri-screenshot-line', text: '探索实验' },
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
    <a
      href="#/"
      class="app-logo"
      focusable="false"
      aria-label="返回首页"
      title="Yiguo · 个人主页"
    >
      <!-- 简洁鹰剪影：单条 path 勾勒侧面展翅的鹰 -->
      <svg
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="w-full h-full"
        aria-hidden="true"
      >
        <title>Eagle</title>
        <path
          class="logo-path"
          d="M6 32 Q16 26 26 30 L30 28 Q34 22 40 24 L44 26 Q48 22 52 26 L56 28 Q58 32 54 34 L48 36 Q44 38 40 36 L36 38 Q32 40 28 38 L24 36 Q16 38 10 36 Q4 34 6 32 Z"
          stroke-width="2"
          stroke-linejoin="round"
          stroke-linecap="round"
        />
        <circle class="logo-eye" cx="48" cy="30" r="1" />
      </svg>
    </a>

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
        <a
          v-for="item in navItems"
          :key="item.to"
          :href="item.to"
          :title="item.title"
          class="nav-link-item"
        >
          <span v-if="!isMobile || !item.icon">
            {{ item.text }}
          </span>
          <i
            v-if="isMobile"
            :class="item.icon"
          />
        </a>

        <a
          href="https://github.com/jeekeagle"
          target="_blank"
          title="GitHub"
          class="hidden md:inline-flex"
        >
          <i class="i-uil-github-alt" />
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

<style scoped>
.logo-eye {
  fill: currentColor;
  opacity: 0.7;
}

.nav-link-item {
  cursor: pointer;
  color: inherit;
  opacity: 0.6;
  outline: none;
  text-decoration: none;
  transition: opacity 0.2s;
  display: inline-flex;
  align-items: center;
  font-size: 1.05em;
}

.nav-link-item:hover {
  opacity: 1;
}

.nav-link-item.router-link-active,
.nav-link-item.active {
  opacity: 1;
}
</style>
