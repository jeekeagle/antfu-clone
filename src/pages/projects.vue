<script setup lang="ts">
import { currentFocus, projects } from '../data/projects'
import ProjectCard from '../components/ProjectCard.vue'
</script>

<template>
  <div class="text-center prose m-auto mb-8">
    <h1 class="mb-0 slide-enter-50">项目</h1>
  </div>

  <article>
    <div>
      <div class="max-w-300 mx-auto">
        <p class="text-center mt--6 mb-5 op50 text-lg italic">
          我创建或正在维护的项目。
        </p>

        <div class="prose pb-5 mx-auto mt-10 text-center">
          <div class="flex gap-2 justify-center">
            <a
              href="https://github.com"
              target="_blank"
              class="btn-blue inline-block"
            >
              <i class="i-ph-github-logo-duotone"></i> GitHub
            </a>
            <a href="#" class="btn-amber inline-block">
              <i class="i-ph-rocket-launch-duotone"></i> 最近发布
            </a>
            <a href="#" class="btn-lime inline-block">
              <i class="i-ph-cow-duotone"></i> 旁支清单
            </a>
          </div>
          <hr />
        </div>

        <!-- 当前焦点 -->
        <div
          class="select-none relative h-18 mt-5 pointer-events-none slide-enter"
          :style="{ '--enter-stage': -2, '--enter-step': '60ms' }"
        >
          <span
            class="text-5em color-transparent absolute left--1rem top-0rem font-bold leading-1em stroke-text-1.5 stroke-text-hex-aaa op35 dark:op20"
          >当前焦点</span>
        </div>
        <div
          class="project-grid py-2 max-w-500 w-max mx-auto slide-enter"
          :style="{ '--enter-stage': 0, '--enter-step': '60ms' }"
        >
          <ProjectCard
            v-for="p in currentFocus"
            :key="p.name"
            v-bind="p"
          />
        </div>

        <div class="mt-16"></div>
        <div
          class="project-grid py-2 max-w-500 w-max mx-auto slide-enter"
          :style="{ '--enter-stage': 1, '--enter-step': '60ms' }"
        >
          <ProjectCard
            v-for="(p, i) in projects"
            :key="p.name"
            v-bind="p"
            class="slide-enter"
            :style="{ '--enter-stage': 2 + i, '--enter-step': '40ms' }"
          />
        </div>
      </div>
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
