<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { useColorScheme } from '../composables/useColorScheme'

const router = useRouter()
const { toggle } = useColorScheme()
const showScrollTop = ref(false)
const isMobile = ref(false)

// to: 内部路由用 '/path'，外部链接用完整 URL
// external: true → 用 <a target="_blank">，新标签页打开
const navItems = [
  { to: 'https://www.wangyiguo.top/posts', title: '博客（OpenWalk）', icon: 'i-ri-article-line', text: '博客', external: true },
  { to: '/projects', title: '项目', icon: 'i-ri-lightbulb-line', text: '项目', external: false },
  { to: '/websites', title: '网站', icon: 'i-ri-global-line', text: '网站', external: false },
  { to: '/demos', title: '探索', icon: 'i-ri-screenshot-line', text: '探索', external: false },
]

function go(to: string, e: MouseEvent) {
  // cmd/ctrl/shift + 点击 → 让浏览器走新标签页
  if (e.metaKey || e.ctrlKey || e.shiftKey) return
  e.preventDefault()
  router.push(to)
}

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
      @click="(e) => go('/', e)"
    >
      <!-- 签名风格 "Yg" 标志：Y 的右臂顺势连到 g 的起笔，整体一气呵成 -->
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="w-full h-full"
        aria-hidden="true"
      >
        <title>Yiguo</title>
        <path
          class="logo-path"
          d="
            M 22 20
            L 38 56
            M 38 56
            L 54 20
            M 38 56
            C 38 64, 50 60, 60 58
            C 72 56, 80 66, 78 74
            C 76 84, 60 86, 52 80
            C 46 75, 48 66, 56 64
            M 56 64
            L 56 84
            C 56 90, 50 92, 46 88
          "
          stroke-width="3"
          stroke-linejoin="round"
          stroke-linecap="round"
        />
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
        <!-- 内部路由 -->
        <a
          v-for="item in navItems.filter(i => !i.external)"
          :key="item.to"
          :href="`#${item.to}`"
          :title="item.title"
          class="nav-link-item"
          @click="(e) => go(item.to, e)"
        >
          <span v-if="!isMobile || !item.icon">
            {{ item.text }}
          </span>
          <i
            v-if="isMobile"
            :class="item.icon"
          />
        </a>

        <!-- 外部链接：新标签页打开（带外链小箭头） -->
        <a
          v-for="item in navItems.filter(i => i.external)"
          :key="item.to"
          :href="item.to"
          target="_blank"
          rel="noopener noreferrer"
          :title="item.title"
          class="nav-link-item"
        >
          <span v-if="!isMobile || !item.icon" class="inline-flex items-center gap-1">
            {{ item.text }}
            <i class="i-ri-external-link-line text-xs op-50" />
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
</style>
