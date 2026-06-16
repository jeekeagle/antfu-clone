---
name: eagle-project
description: 在 Eagle 个人主页的"项目"页新建一个项目条目。需要选分类、加名称 / 描述 / 图标 / 链接，自动 commit + push + 部署。
when_to_use: 用户说"新建项目"、"加项目"、"new project"、"我做了一个 xxx" 时触发
---

# eagle-project

> 在 `https://jeekeagle.github.io/eagle/#/projects` 的某个分类下加一个项目。

## 触发

用户输入 `/eagle-project`、说"新建项目"、"加项目"、"new project"，或主对话里明确要登记一个新项目。

## 第一步：收集信息

`AskUserQuestion` 一次性问：

1. **项目名称**（必填） — 短文本
2. **一句话描述**（必填） — 短文本，30 字以内
3. **项目链接**（必填） — URL（如果用户说"先空着"，用 `#`）
4. **分类**（必选，单选） — 从 `src/data/projects.ts` 现有的 key 列表 + 「新建分类」选项
   - 现有分类（自动从文件读）：`当前焦点 / AI 与 Agent / 前端工具链 / 内容与创作 / 日常工具`
5. **图标**（可选） — 提示输入 `iconify` 类名（如 `i-ri-rocket-line`）。如果不填，从 `https://icones.js.org` 帮用户挑一个相关的
6. **是否设为「当前焦点」**（必选） — `是` / `否`。「是」会把它移到 `当前焦点` 分组顶部
7. **立即发布**（必选） — `是` / `否`

## 第二步：校验

- 链接 URL 必须能 `new URL()` 解析（空链接 `#` 例外）
- 分类必须存在（除非用户选「新建分类」）
- 图标类名要符合 `i-<collection>-<name>` 格式

## 第三步：写入 `src/data/projects.ts`

打开文件，在 `projectGroups[分类名]` 数组**开头**插入：

```ts
{ name: '<名称>', desc: '<描述>', icon: '<icon>', href: '<url>' },
```

**如果用户选「新建分类」**：
- 在 `projectGroups` 里新增一个 key
- 提示用户取个中文名

**如果用户选「设为当前焦点」**：
- 把这个项目移到 `projectGroups['当前焦点']` 数组的开头
- 不删原分类里的副本（避免双计），改为从原分类中**移除**

## 第四步：build + commit + push + 部署

流程同 `eagle-post` 的第五~八步。

commit message 格式：
```
project: <项目名>

- category: <分类>
- icon: <icon>
- href: <url>
```

## 第五步：报告

- ✅ 项目名 + 分类
- 🔗 跳转链接：`https://jeekeagle.github.io/eagle/#/projects`（带锚点 `#<分类-slug>`）

## 错误处理

| 错误 | 处理 |
|---|---|
| 链接格式错 | 让用户重新输入 |
| 分类不存在（用户没选「新建」） | 提示并让用户重选 |
| 图标类名格式错 | 自动 fallback 到 `i-ri-lightbulb-line` 并提示 |

## 示例交互

```
User: 我刚做了一个 Vue 组件库，名字叫 Vue Snippets Kit
AI:  [AskUserQuestion]
User:  Vue Snippets Kit | 30+ 常用 Vue 3 组件模板 | https://github.com/yiguo/vue-snippets-kit | 前端工具链 | i-ri-code-box-line | 否 | 是
AI:  [写入 projectGroups['前端工具链']]
AI:  [build → 1.06s, success]
AI:  ✅ 已加入：https://jeekeagle.github.io/eagle/#/projects#前端工具链
```
