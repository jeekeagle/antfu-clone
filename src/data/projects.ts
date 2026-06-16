/**
 * 项目数据（中文）
 */
export interface Project {
  name: string
  desc: string
  icon: string
  href: string
  current?: boolean // 是否为"当前焦点"
}

export const currentFocus: Project[] = [
  { name: '项目甲', desc: '我正在做的那个项目。', icon: 'i-ph-rocket-launch-duotone', href: '#', current: true },
  { name: '项目乙', desc: '另一个正在重点关注的。', icon: 'i-ri-lightbulb-line', href: '#', current: true },
  { name: '项目丙', desc: '顺手在做的副线。', icon: 'i-ri-flask-line', href: '#', current: true },
]

export const projects: Project[] = [
  { name: 'Vitest', desc: '极速的前端单元测试框架。', icon: 'i-ri-test-tube-line', href: 'https://vitest.dev' },
  { name: 'Slidev', desc: '为开发者打造的幻灯片工具。', icon: 'i-ri-slideshow-line', href: 'https://sli.dev' },
  { name: 'VueUse', desc: 'Vue Composition 实用工具集。', icon: 'i-ri-tools-line', href: 'https://vueuse.org' },
  { name: 'UnoCSS', desc: '即时按需的原子化 CSS 引擎。', icon: 'i-ri-css3-line', href: 'https://unocss.dev' },
  { name: 'Elk', desc: '轻量级 Mastodon 网页客户端。', icon: 'i-ri-mastodon-line', href: 'https://elk.zone' },
  { name: 'Type Challenges', desc: 'TypeScript 类型体操练习集。', icon: 'i-simple-icons-typescript', href: 'https://tsch.js.org' },
  { name: 'Shiki', desc: '漂亮的代码语法高亮器。', icon: 'i-ri-code-box-line', href: 'https://shiki.style' },
  { name: 'Twoslash', desc: '可悬浮提示的代码示例。', icon: 'i-ri-cursor-line', href: 'https://shiki.style/packages/twoslash' },
  { name: 'ESLint Stylistic', desc: 'ESLint 代码风格规则集。', icon: 'i-simple-icons-eslint', href: 'https://eslint.style' },
  { name: 'Nuxt', desc: '直观的 Vue 全栈框架。', icon: 'i-simple-icons-nuxt', href: 'https://nuxt.com' },
  { name: 'Vite', desc: '下一代前端构建工具。', icon: 'i-simple-icons-vite', href: 'https://vitejs.dev' },
  { name: 'Vue', desc: '渐进式 JavaScript 框架。', icon: 'i-simple-icons-vuedotjs', href: 'https://vuejs.org' },
]
