---
name: eagle-website
description: 在 Eagle 个人主页的"网站"页加一条站点记录（站点名 / 描述 / 链接 / 状态 / 分类）。自动 commit + push + 部署。
when_to_use: 用户说"关联网站"、"加站点"、"加一个网站"、"new site" 时触发
---

# eagle-website

> 在 `https://jeekeagle.github.io/eagle/#/websites` 加一条站点。

## 触发

用户输入 `/eagle-website`、说"关联网站"、"加站点"、"加一个网站"、"new site"。

## 第一步：收集信息

`AskUserQuestion`：

1. **站点名**（必填） — 短文本
2. **一句话描述**（必填） — 短文本，30 字以内
3. **链接**（必填） — URL（"先空着" → `#`）
4. **状态**（必选，单选） — `在用` / `归档` / `规划中`
5. **分类**（必选，单选） — 从 `src/data/content.ts` 的 `websiteGroups` key 列表 + 「新建分类」选项
   - 现有：`个人项目 / 家庭 / 创作`
6. **立即发布**（必选） — `是` / `否`

## 第二步：写入 `src/data/content.ts`

打开文件，在 `websiteGroups[分类]` 数组**开头**插入：

```ts
{ name: '<站点名>', desc: '<描述>', href: '<url>', status: '<状态>', category: '<分类>' },
```

**如果新建分类**：在 `websiteGroups` 里新增一个 key。

## 第三步：build + commit + push + 部署

commit message 格式：
```
website: <站点名>

- category: <分类>
- status: <状态>
```

## 第四步：报告

- ✅ 站点名 + 分类 + 状态
- 🔗 `https://jeekeagle.github.io/eagle/#/websites`

## 错误处理

| 错误 | 处理 |
|---|---|
| 链接格式错 | 让用户重输 |
| 分类不存在 | 让用户重选 / 选新建 |

## 与 eagle-project 的区别

- `eagle-project` → 加到「项目」页（projects），强调技术/工具属性
- `eagle-website` → 加到「网站」页（websites），强调站点/服务属性

如果用户犹豫该用哪个，给个判断标准：
- **自己做的小工具 / 库 / 框架** → project
- **完整的一个网站 / 服务** → website
