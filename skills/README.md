# Eagle Skills 集

> 为 `D:\Multi-Agent\Codepilot\Valt\antfu-clone`（Eagle 个人主页）设计的 Claude Code 技能包。

每个 skill 都是一个自包含的 `SKILL.md`，定义了输入格式、校验规则、要修改的文件路径，以及"提交 / 推送 / 部署"的完整工作流。

## 全部 skill

| Skill | 用途 | 触发方式 |
|---|---|---|
| `eagle-post` | 发布一篇博客文章 | `/eagle-post` 或 "发博客" |
| `eagle-project` | 在某个分类下新建项目 | `/eagle-project` 或 "新建项目" |
| `eagle-website` | 在"网站"页加一条站点 | `/eagle-website` 或 "关联网站" |
| `eagle-photo` | 在"摄影"页加一张照片 | `/eagle-photo` 或 "加照片" |
| `eagle-painting` | 在"绘画"页加一幅画 | `/eagle-painting` 或 "加画" |
| `eagle-demo` | 在"探索实验"页加一个 demo | `/eagle-demo` 或 "加 demo" |
| `eagle-home` | 改首页介绍文字 | `/eagle-home` 或 "改首页" |
| `eagle-release` | 打 tag + 打包 + 发 GitHub Release | `/eagle-release` 或 "发版" |
| `eagle-deploy` | 不改内容，只触发部署 | `/eagle-deploy` 或 "部署" |

## 通用约定

- 所有 skill 修改完数据后，默认会：**build 验证 → git commit → git push → 等部署完成**
- 如果只想改文件、暂不部署，每个 skill 都会问你 "是否立即发布"
- 部署完成后会打印线上 URL
- 出错时回滚到上一次 commit，不留半成品

## 数据文件速查

| 内容 | 文件 | 接口 |
|---|---|---|
| 博客文章 | `src/data/posts.ts` | `posts: Post[]` |
| 项目 | `src/data/projects.ts` | `projectGroups: Record<string, Project[]>` |
| 网站 / 照片 / 绘画 / Demos | `src/data/content.ts` | `websiteGroups / photoGroups / paintingGroups / demos` |
| 首页介绍 | `src/pages/index.vue` | `<template>` 里直接编辑 |
| 路由表 | `src/main.ts` | `routes: [...]` |

## 添加新 skill

1. 在 `skills/` 下新建 `<skill-name>/` 目录
2. 写 `SKILL.md`，必须包含 YAML frontmatter：`name` + `description`
3. 写明：输入字段 / 校验规则 / 要改的文件 / 提交格式
4. 在本 README 的表格里登记

## 设计原则

- **零依赖**：每个 skill 只用 `Bash` / `Edit` / `Write` / `Read` / `AskUserQuestion` 这几个原语，不引入额外工具
- **可中断**：任何一步失败都能停下来问用户怎么处理
- **可回滚**：commit 之后用 `git reset --hard HEAD^` 就能回到上一版
- **可单独使用**：单个 skill 跑完不依赖其他 skill
