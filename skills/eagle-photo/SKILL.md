---
name: eagle-photo
description: 在 Eagle 个人主页的"摄影"页加一张照片（占位色块 + 标题 + 地点分组 + 标签）。自动 commit + push + 部署。
when_to_use: 用户说"加照片"、"新拍了一张"、"加一张图"、"new photo" 时触发
---

# eagle-photo

> 在 `https://jeekeagle.github.io/eagle/#/photos` 加一张照片（目前是占位色块 + 文字，真实图后续可替换）。

## 触发

`/eagle-photo`、说"加照片"、"新拍了一张"、"加一张图"、"new photo"。

## 第一步：收集信息

`AskUserQuestion`：

1. **照片标题**（必填） — 短文本（例："栈桥日出"）
2. **拍摄日期**（必填，默认今天） — `YYYY-MM-DD`
3. **地点 / 分组**（必选，单选） — 从 `src/data/content.ts` 的 `photoGroups` key 列表 + 「新建分组」选项
   - 现有：`青岛 / 城市 / 雾中西湖`
4. **主色调**（必填） — Hex 颜色（例：`#f59e0b`）。用户没填时，根据标题关键词自动推荐：
   - 日出 / 黄昏 → `#f59e0b`
   - 夜 / 城市 → `#1e3a8a`
   - 海 / 蓝 → `#0e7490`
   - 山 / 绿 → `#15803d`
   - 雪 / 白 → `#cbd5e1`
   - 花 / 粉 → `#db2777`
5. **标签**（可选，可多选） — 例如 `['日出', '海']`
6. **立即发布**（必选） — `是` / `否`

## 第二步：生成 ID

`id` 格式：`<分组首字母><序号>`，例：`qd6`（青岛第 6 张）。序号 = 该分组现有最大序号 + 1。

## 第三步：写入 `src/data/content.ts`

打开文件，在 `photoGroups[分组]` 数组**末尾**插入：

```ts
{ id: '<id>', title: '<标题>', date: '<date>', color: '<hex>', tags: [<tags>] },
```

如果用户选了空 tags，去掉 `tags` 字段。

## 第四步：build + commit + push + 部署

commit message 格式：
```
photo: <标题>

- group: <分组>
- color: <hex>
```

## 第五步：报告

- ✅ 标题 + 分组
- 🔗 `https://jeekeagle.github.io/eagle/#/photos`

## 真实图替换

未来要替换占位为真实图，把 `color` 字段替换为 `src: '/photos/<id>.jpg'`，并把图片放到 `public/photos/<id>.jpg`。这个 skill 不处理这一步。

## 错误处理

| 错误 | 处理 |
|---|---|
| 主色调格式错 | 让用户重新输入 `#xxxxxx` |
| 分组不存在 | 提示现有选项 |
