<script setup lang="ts">
/**
 * 动态点状背景
 * 复刻 antfu.me 风格的 subtle dot pattern + 缓慢移动
 * - 用 CSS radial-gradient 绘制点阵（性能好，无需 canvas）
 * - 用 background-position 动画让点缓慢漂移
 * - 暗色模式自动反色
 * - fixed 定位铺满整个视口
 * - 加 pointer-events-none 不影响交互
 */
</script>

<template>
  <div class="dots-bg" aria-hidden="true" />
</template>

<style scoped>
.dots-bg {
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  /* 三层点阵叠加，做出"远近层次" */
  background-image:
    /* 大点：最稀疏 */
    radial-gradient(circle, rgb(0 0 0 / 0.18) 1px, transparent 1.2px),
    /* 中点 */
    radial-gradient(circle, rgb(0 0 0 / 0.12) 0.8px, transparent 1px),
    /* 小点：最密 */
    radial-gradient(circle, rgb(0 0 0 / 0.08) 0.6px, transparent 0.8px);
  background-size:
    64px 64px,
    32px 32px,
    16px 16px;
  background-position:
    0 0,
    8px 8px,
    0 0;
  /* 关键：让 background-position 缓慢漂移，实现"点在动"的效果 */
  animation: dots-drift 60s linear infinite;
}

html.dark .dots-bg {
  background-image:
    radial-gradient(circle, rgb(255 255 255 / 0.12) 1px, transparent 1.2px),
    radial-gradient(circle, rgb(255 255 255 / 0.08) 0.8px, transparent 1px),
    radial-gradient(circle, rgb(255 255 255 / 0.05) 0.6px, transparent 0.8px);
}

/* 三层错落移动，方向/速度都不同，避免"机械感" */
@keyframes dots-drift {
  0% {
    background-position:
      0 0,
      8px 8px,
      0 0;
  }
  100% {
    background-position:
      64px 64px,
      -8px 24px,
      16px 16px;
  }
}

/* 用户偏好减少动效：静止 */
@media (prefers-reduced-motion: reduce) {
  .dots-bg {
    animation: none;
  }
}

/* 打印：隐藏 */
@media print {
  .dots-bg {
    display: none;
  }
}
</style>
