/**
 * 暗色模式管理：参考 antfu.me 的 vueuse-color-scheme 实现
 */
import { ref, watchEffect } from 'vue'

type Scheme = 'light' | 'dark' | 'auto'

const STORAGE_KEY = 'vueuse-color-scheme'
const scheme = ref<Scheme>((localStorage.getItem(STORAGE_KEY) as Scheme) || 'auto')

function applyTheme(s: Scheme) {
  if (typeof document === 'undefined') return
  const isDark =
    s === 'dark' ||
    (s === 'auto' &&
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches)
  document.documentElement.classList.toggle('dark', isDark)
  // 同步更新 lang 属性，方便字体子集切换
  document.documentElement.lang = 'zh-CN'
}

export function useColorScheme() {
  watchEffect(() => {
    localStorage.setItem(STORAGE_KEY, scheme.value)
    applyTheme(scheme.value)
  })

  function toggle() {
    const current = scheme.value
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const isDark =
      current === 'dark' || (current === 'auto' && prefersDark)
    scheme.value = isDark ? 'light' : 'dark'
  }

  return { scheme, toggle }
}
