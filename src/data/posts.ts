/**
 * 博客文章 + 演讲数据（中文）
 */
export interface Post {
  slug: string
  title: string
  date: string
  readTime?: number // 阅读时长（分钟）
  tags?: string[]
  lang?: 'zh' | 'en'
  desc?: string
  content?: string
}

export const posts: Post[] = [
  {
    slug: 'qing-zhu-yi-xia',
    title: '自我介绍',
    date: '2025-12-01',
    readTime: 3,
    tags: ['随笔'],
    desc: '关于我是谁、在做什么的一份简要说明。',
  },
  {
    slug: 'da-jian-ge-ren-zhan',
    title: '用 Vue + UnoCSS 搭建个人站点',
    date: '2025-09-15',
    readTime: 8,
    tags: ['Vue', 'UnoCSS', 'Web'],
    desc: '记录我从零搭建个人站的过程，灵感来自 antfu.me。',
  },
  {
    slug: 'she-ji-ti-xi-bi-ji',
    title: '设计体系随笔',
    date: '2025-06-20',
    readTime: 6,
    tags: ['设计'],
    desc: '关于构建企业级设计体系的几点心得。',
  },
  {
    slug: 'zu-jian-hua-si-wei',
    title: '组件化思维',
    date: '2025-03-04',
    readTime: 5,
    tags: ['前端'],
    desc: '我在 Vue 项目里组织组件的几个原则。',
  },
  {
    slug: 'kai-yuan-ke-chi-xu',
    title: '谈谈开源可持续性',
    date: '2024-11-12',
    readTime: 7,
    tags: ['开源'],
    desc: '关于开源项目资助与维护的一点思考。',
  },
  {
    slug: 'chuan-shuo-de-yi-zhu',
    title: '发布是一门艺术',
    date: '2024-07-30',
    readTime: 4,
    tags: ['方法论'],
    desc: '为什么「做完」比「完美」更重要。',
  },
]

export const talks: Post[] = [
  {
    slug: 'she-ji-gong-cheng',
    title: '规模化设计工程',
    date: '2025-10-12',
    tags: ['演讲'],
  },
  {
    slug: 'vue-da-jian',
    title: '用 Vue 构建现代应用',
    date: '2025-04-20',
    tags: ['演讲'],
  },
  {
    slug: 'kai-yuan-gu-shi',
    title: '开源故事',
    date: '2024-11-08',
    tags: ['演讲'],
  },
  {
    slug: 'kuai-su-fa-bu',
    title: '快速发布，频繁发布',
    date: '2024-05-30',
    tags: ['演讲'],
  },
]
