---
name: eagle-painting
description: 在 Eagle 个人主页的"绘画"页加一幅画（AI 画画 / 涂鸦占位卡 + 标题 + 工具标签）。自动 commit + push + 部署。
when_to_use: 用户说"加画"、"今天画了一张"、"加一幅画"、"new painting" 时触发
---

# eagle-painting

> 在 `https://jeekeagle.github.io/eagle/#/paintings` 加一幅画（占位卡 + 文字）。

## 触发

`/eagle-painting`、说"加画"、"今天画了一张"、"加一幅画"、"new painting"。

## 第一步：收集信息

`AskUserQuestion`：

1. **画作标题**（必填） — 短文本
2. **创作日期**（必填，默认今天） — `YYYY-MM-DD`
3. **分组**（必选，单选） — `AI 画画` / `涂鸦` / 「新建分组」
4. **使用工具**（必填） — 短文本（例：`Midjourney` / `Stable Diffusion` / `Procreate` / `手绘`）
5. **主色调**（必填） — Hex 颜色
6. **标签**（可选，可多选） — 例如 `['风景', '夜景', '童话']`
7. **立即发布**（必选） — `是` / `否`

## 第二步：生成 ID

`id` 格式：`<分组首字母><序号>`。`AI 画画` → `pa`，`涂鸦` → `pb`。

## 第三步：写入 `src/data/content.ts`

打开文件，在 `paintingGroups[分组]` 数组**末尾**插入：

```ts
{ id: '<id>', title: '<标题>', date: '<date>', color: '<hex>', tool: '<工具>', tags: [<tags>] },
```

## 第四步：build + commit + push + 部署

commit message 格式：
```
painting: <标题>

- group: <分组>
- tool: <工具>
```

## 第五步：报告

- ✅ 标题 + 分组 + 工具
- 🔗 `https://jeekeagle.github.io/eagle/#/paintings`

## 与 eagle-photo 的区别

- `eagle-photo` → 真实相机拍的照片，发布到「摄影」页
- `eagle-painting` → AI 画 / 手绘 / 数字画，发布到「绘画」页
