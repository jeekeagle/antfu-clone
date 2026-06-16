# Eagle

复刻 [antfu.me](https://antfu.me) 风格的个人网站，**Vue 3 + Vite + UnoCSS + 霞鹜文楷**。

## 在线预览
GitHub Pages：https://&lt;你的用户名&gt;.github.io/eagle/

## 快速开始

```bash
# 注意：环境变量 NODE_ENV=production 会让 npm 跳过 devDependencies
npm install --include=dev
npm run dev      # 开发模式 → http://localhost:5173
npm run build    # 生产构建到 dist/
npm run preview  # 预览构建产物
```

## 部署到 GitHub Pages

项目已包含 `.github/workflows/deploy.yml`，push 到 `main` 分支即自动部署。

### 一次性配置

1. **创建 GitHub 仓库**（假设叫 `eagle`）
2. **初始化并 push 代码**
   ```bash
   cd eagle
   git init
   git add .
   git commit -m "init: eagle"
   git branch -M main
   git remote add origin git@github.com:<你的用户名>/eagle.git
   git push -u origin main
   ```
3. **开启 GitHub Pages**
   - 仓库 → Settings → Pages
   - Source 选 **GitHub Actions**（不是 "Deploy from a branch"）
4. **等待部署完成**
   - Actions 标签页可以看到构建进度
   - 部署成功后访问 `https://<你的用户名>.github.io/eagle/`

### 自定义域名（可选）

把 CNAME 文件放到 `public/CNAME`，内容是 `yourdomain.com`，然后在域名 DNS 添加 CNAME 记录指向 `&lt;用户名&gt;.github.io.`。

## 项目结构

```
src/
├── App.vue                  # 根组件
├── main.ts                  # 入口 + 路由配置
├── components/
│   ├── AppHeader.vue        # 顶部 logo + 导航 + 暗色切换
│   ├── MagicLink.vue        # 头像+名字的行内胶囊
│   └── ProjectCard.vue      # 项目卡片
├── composables/
│   └── useColorScheme.ts    # 暗色模式（仿 vueuse useColorScheme）
├── data/
│   ├── profile.ts           # 首页个人信息（替换这里）
│   ├── posts.ts             # 博客 & Talks 数据
│   ├── projects.ts          # 项目数据
│   └── content.ts           # 照片/赞助者/播客/Demos 数据
├── pages/
│   ├── index.vue            # 首页 /
│   ├── posts.vue            # 博客列表 /posts
│   ├── post.vue             # 博客详情 /posts/:slug
│   ├── projects.vue         # 项目网格 /projects
│   ├── talks.vue            # 演讲 /talks
│   ├── sponsors-list.vue    # 赞助者 /sponsors-list
│   ├── podcasts.vue         # 播客 /podcasts
│   ├── photos.vue           # 摄影 /photos
│   ├── demos.vue            # 创意 demo /demos
│   └── use.vue              # 装备 /use
└── styles/
    └── main.css             # 全局样式（排版/动画/组件类）
```

## 个性化替换

| 文件 | 替换什么 |
|---|---|
| `src/data/profile.ts` | 你的姓名、简介、社交、赞助、Working at / Creator of / Core team of / Maintaining 列表 |
| `src/data/posts.ts` | 博客文章 & 演讲 |
| `src/data/projects.ts` | `currentFocus`（首页当前焦点）+ `projects`（项目网格） |
| `src/data/content.ts` | 照片、赞助者、播客、Demos |
| `public/favicon.svg` | 网站图标 |
| `src/components/AppHeader.vue` | logo SVG 路径（默认是一个占位签名） |

## 设计系统要点

复刻自 antfu.me：

- **字体**：Inter（正文）/ DM Mono（代码）/ Bad Script（手写体）/ Roboto Condensed（magic link）
- **配色**：基于 CSS 变量 `--fg-light/-/-deep/-deeper`，暗色模式自动反转
- **暗色模式**：localStorage 持久化 + 跟随系统，首屏预检测防闪烁
- **进场动画**：`slide-enter` 配合 `--enter-stage` 和 `--enter-step` 错落入场
- **Magic Link**：行内小胶囊，左侧头像+右侧名字
- **项目网格**：自适应列数，移动端 1 列 → 桌面 4 列
- **照片网格**：1/2/3/4 列响应式
- **Stroke text**：用 `text-stroke` + 透明填充做大字背景
- **Current Focus**：超大半透明描边文字作为项目区域背景

## 已知限制 / 改进点

- 博客文章详情页目前是占位内容，建议接入 markdown 渲染（`unplugin-vue-markdown` 或 `@nuxt/content`）
- 照片是色块占位，把 `data/content.ts` 里的 `color` 换成 `src: '...'` 并改 `photos.vue` 即可
- logo SVG 是手绘占位，替换成你自己的签名
- 没有 SSR/SSG，纯 SPA（GitHub Pages 完全够用）

## 手动部署（不想用 Actions）

```bash
npm run build
# 把 dist/ 整个目录的内容 push 到 gh-pages 分支
git checkout -b gh-pages
cp -r dist/* .
git add . && git commit -m "deploy"
git push origin gh-pages --force
# 然后在 GitHub Pages 设置里把 Source 改为 gh-pages 分支
```
