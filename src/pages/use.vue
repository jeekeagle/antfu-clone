<script setup lang="ts">
/**
 * 常用硬件 / 软件
 */
const hardware = [
  { name: 'MacBook Pro 14 寸', desc: 'M3 Pro，36GB 内存' },
  { name: '机械键盘', desc: 'Keychron Q1' },
  { name: '罗技 MX Master 3S', desc: '日常主力鼠标' },
  { name: 'LG UltraFine 5K', desc: '外接显示器' },
]

const software = [
  { name: 'VS Code / Cursor', desc: '编辑器' },
  { name: 'iTerm2 + tmux', desc: '终端' },
  { name: 'Raycast', desc: '启动器' },
  { name: 'Figma', desc: '设计' },
  { name: 'Arc', desc: '浏览器' },
  { name: 'Linear', desc: '任务管理' },
  { name: 'Notion', desc: '笔记' },
]
</script>

<template>
  <div class="text-center prose m-auto mb-8">
    <h1 class="mb-0 slide-enter-50">/use</h1>
  </div>

  <article>
    <div class="prose m-auto slide-enter-content">
      <p class="op50 italic">
        我日常使用的硬件和软件清单。
      </p>
      <hr />

      <h2>硬件</h2>
      <ul>
        <li
          v-for="(h, i) in hardware"
          :key="h.name"
          class="slide-enter"
          :style="{ '--enter-stage': i, '--enter-step': '50ms' }"
        >
          <strong>{{ h.name }}</strong> — <span class="op75">{{ h.desc }}</span>
        </li>
      </ul>

      <h2>软件</h2>
      <ul>
        <li
          v-for="(s, i) in software"
          :key="s.name"
          class="slide-enter"
          :style="{ '--enter-stage': i, '--enter-step': '50ms' }"
        >
          <strong>{{ s.name }}</strong> — <span class="op75">{{ s.desc }}</span>
        </li>
      </ul>
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
