---
name: eagle-home
description: 修改 Eagle 个人主页首页（/）的介绍文字 / 链接 / MagicLink 社交胶囊。自动 commit + push + 部署。
when_to_use: 用户说"改首页"、"改介绍"、"更新首页"、"update home" 时触发
---

# eagle-home

> 修改 `https://jeekeagle.github.io/eagle/#/` 首页内容。

## 触发

`/eagle-home`、说"改首页"、"改介绍"、"更新首页"、"update home"。

## 第一步：读当前首页

读 `D:\Multi-Agent\Codepilot\Valt\antfu-clone\src\pages\index.vue`，识别：

- `<h1>Yiguo</h1>` — 标题（一般不动）
- 多个 `<p>...</p>` — 介绍段落
- 末尾 `<MagicLink>` 列表 — 社交胶囊
- 末尾邮箱 `hi@yiguo.dev`

## 第二步：问用户改什么

`AskUserQuestion`（多选）：

- A. **改某一段介绍文字**（用户指明段号或关键词）
- B. **新增一段**（用户给新段落内容）
- C. **删除某段**（用户指明）
- D. **改社交链接**（改 / 加 / 删 MagicLink）
- E. **改邮箱**

可以多选。逐个处理。

## 第三步：精确编辑

用 `Edit` 工具，对 `index.vue` 做精准替换。**不要整体重写**。

替换时**保留**：
- 现有的 `slide-enter` / `prose` / `op-50` 等 class 名
- 现有 `<a>` 标签的 `font-semibold` / `<strong>` 加粗链样式
- `<abbr title="One-Person Company">OPC</abbr>` 这种语义化标签

## 第四步：build + commit + push + 部署

commit message 格式（描述清楚改了什么）：

```
home: <改了什么>

- <改动点 1>
- <改动点 2>
```

例：
```
home: 改第一段自我介绍 + 加 GitHub 链接

- 第一段加上"目前在做一个 Agent 项目"
- 社交区加 GitHub 链接
```

## 第五步：报告

- ✅ 改动清单
- 🔗 `https://jeekeagle.github.io/eagle/`

## 错误处理

| 错误 | 处理 |
|---|---|
| 用户给的段落找不到 | 让用户用关键词重新指明 |
| 改动超长 | 提示用户拆成多次改动 |
| Email 格式错 | 让用户重输 |
