import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import 'virtual:uno.css'
import '@unocss/reset/tailwind.css'
import './styles/main.css'

const Home = () => import('./pages/index.vue')
const Posts = () => import('./pages/posts.vue')
const Post = () => import('./pages/post.vue')
const Projects = () => import('./pages/projects.vue')
const Websites = () => import('./pages/websites.vue')
const Photos = () => import('./pages/photos.vue')
const Paintings = () => import('./pages/paintings.vue')
const Demos = () => import('./pages/demos.vue')
const Use = () => import('./pages/use.vue')

// GitHub Pages 不支持 SPA 路由 fallback（直接访问 /posts 会 404）
// 用 hash mode 解决：URL 变成 /#/posts，所有路径都从 / 加载
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/posts', component: Posts },
    { path: '/posts/:slug', component: Post, props: true },
    { path: '/projects', component: Projects },
    { path: '/websites', component: Websites },
    { path: '/photos', component: Photos },
    { path: '/paintings', component: Paintings },
    { path: '/demos', component: Demos },
    { path: '/use', component: Use },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0, behavior: 'smooth' }
  },
})

createApp(App).use(router).mount('#app')
