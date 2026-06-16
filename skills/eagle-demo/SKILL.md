---
name: eagle-demo
description: 在 Eagle 个人主页的"探索实验"页加一个 demo 条目（名称 / 描述 / 链接 / 标签 / 日期）。自动 commit + push + 部署。
when_to_use: 用户说"加 demo"、"做个实验"、"加个实验"、"new demo" 时触发
---

# eagle-demo

> 在 `https://jeekeagle.github.io/eagle/#/demos` 加一个 demo 条目。

## 触发

`/eagle-demo`、说"加 demo"、"做个实验"、"加个实验"、"new demo"。

## 第一步：收集信息

`AskUserQuestion`：

1. **Demo 名称**（必填） — 短文本
2. **一句话描述**（必填） — 30 字以内
3. **链接**（必填） — URL（或 `#` 占位）
4. **标签**（必填，可多选，从已有 tag 中选或自填）— 已有：艺术 / canvas / 音频 / webgl / 物理 / 颜色 / 字体 / 交互 / 倒计时 / 文字
5. **日期**（必填，默认今天） — `YYYY-MM-DD`
6. **立即发布**（必选） — `是` / `否`

## 第二步：写入 `src/data/content.ts`

打开文件，在 `demos: Demo[]` 数组**开头**插入（让最新 demo 排最前）：

```ts
{ name: '<名称>', desc: '<描述>', href: '<url>', tags: [<tags>], date: '<date>' },
```

## 第三步：build + commit + push + 部署

commit message 格式：
```
demo: <名称>

- tags: <tags>
- date: <date>
```

## 第四步：报告

- ✅ 名称 + 标签
- 🔗 `https://jeekeagle.github.io/eagle/#/demos`

## 错误处理

| 错误 | 处理 |
|---|---|
| 链接格式错 | 让用户重输 |
| 标签为空 | 提示至少加 1 个 |
