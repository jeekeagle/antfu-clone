import {
  defineConfig,
  presetUno,
  presetTypography,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'
import presetIcons from '@unocss/preset-icons'

export default defineConfig({
  presets: [
    presetUno(),
    presetTypography(),
    presetIcons({
      // 通过安装 @iconify-json/* 包来支持离线图标
      // 命名规则：i-{collection}-{name}，如 i-ri-article-line
    }),
    presetWebFonts({
      provider: 'none', // 字体改用 CDN 引入 LXGW WenKai（见 index.html）
    }),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  shortcuts: {
    // 排版
    'prose-mx': 'prose m-auto',
    'prose-sm-mx': 'prose prose-sm m-auto',
    // 文本渐层（fg 变量）
    'fg-light': 'text-[var(--fg-light)]',
    'fg': 'text-[var(--fg)]',
    'fg-deep': 'text-[var(--fg-deep)]',
    'fg-deeper': 'text-[var(--fg-deeper)]',
    // 颜色按钮（pill 风格）
    'btn': 'inline-block border border-current rounded px-2 py-1 transition-all duration-200',
    'btn-blue': 'btn text-blue-500 hover:bg-blue-500/10',
    'btn-amber': 'btn text-amber-500 hover:bg-amber-500/10',
    'btn-rose': 'btn text-rose-500 hover:bg-rose-500/10',
    'btn-lime': 'btn text-lime-500 hover:bg-lime-500/10',
    'btn-yellow': 'btn text-yellow-500 hover:bg-yellow-500/10',
    'btn-green': 'btn text-emerald-500 hover:bg-emerald-500/10',
    'btn-purple': 'btn text-violet-500 hover:bg-violet-500/10',
    // 通用链接
    'a-item': 'op60 hover:op100 transition-all duration-200',
    // Magic Link
    'magic-link': 'inline-flex items-center gap-1 px-1.5 py-1 rounded bg-[#8882] hover:bg-[#8883] transition-colors duration-150 font-condensed leading-none border-0',
    'magic-link-img': 'inline-block bg-center bg-no-repeat bg-cover rounded-[2px] w-[1.1em] h-[1.1em]',
    // 顶部 nav 链接
    'nav-link': 'cursor-pointer color-inherit op60 hover:op100 outline-none no-underline transition-all duration-200',
    // slide-enter 容器
    'slide-enter': 'animate-[slide-enter_0.4s_both]',
  },
  theme: {
    colors: {
      // 还原 antfu 的颜色系统
      'fg-light': '#888',
      'fg': '#555',
      'fg-deep': '#222',
      'fg-deeper': '#000',
    },
  },
})
