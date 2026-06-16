---
name: eagle-post
description: 在 Eagle 个人主页发布一篇新的博客文章。会交互式收集标题 / 日期 / 标签 / 摘要 / 语言，然后追加到 src/data/posts.ts，自动 commit + push + 部署。
when_to_use: 用户说"发博客"、"写一篇"、"加文章"、"new post" 时触发
---

# eagle-post

> 在 `https://jeekeagle.github.io/eagle/` 发布一篇新博客。

## 触发

用户输入 `/eagle-post`、说"发博客"、"写一篇"、"加文章"、"new post"，或主对话中明确要发布博客。

## 第一步：收集信息

用 `AskUserQuestion` 一次性问所有必填项（多选 + 单选混合）：

1. **标题**（必填） — 短文本输入
2. **slug**（必填） — 短文本输入（例：`one-person-company`）。如果不填，自动从标题 pinyin 化生成
3. **日期**（必填，默认今天） — 短文本输入，格式 `YYYY-MM-DD`
4. **语言**（必选，单选） — `中文` / `EN` / `其他`
5. **标签**（必填，可多选，已有标签会从 `src/data/posts.ts` 的 `tagColors` 里反查；自定义也接受）
6. **阅读时长**（可选） — 数字，单位分钟
7. **摘要 desc**（可选） — 一句话描述
8. **正文内容**（可选） — markdown 内容。如果提供，存到 `content` 字段；不提供则只生成列表项（点击后跳到 `/posts/:slug` 占位页）
9. **立即发布**（必选） — `是` / `否` / `只保存到本地`

## 第二步：校验

- `slug` 必须只含 `[a-z0-9-]`，且未在 `posts.ts` 里出现过
- `date` 必须能 `new Date()` 解析
- 至少要有 1 个 tag
- 如果用户说"标题"留空 → 阻止并提示

## 第三步：写入 `src/data/posts.ts`

打开 `D:\Multi-Agent\Codepilot\Valt\antfu-clone\src\data\posts.ts`，在 `posts: Post[] = [...]` 数组**开头**插入新条目（让最新文章排最前面）。格式：

```ts
{
  slug: '<用户填的 slug>',
  title: '<用户填的标题>',
  date: '<YYYY-MM-DD>',
  readTime: <number 或 undefined>,
  tags: ['<tag1>', '<tag2>'],
  lang: 'zh' | 'en' | undefined,
  desc: '<摘要>' || undefined,
  content: '<正文 markdown>' || undefined,
},
```

**不要**手动改 `tagColors` 映射，除非用户传入了全新标签且希望给它配色。

## 第四步：（可选）写正文

如果用户给了正文内容，且内容长度 > 200 字，写到 `src/pages/post-content/<slug>.md` 之类的位置（如果项目未来支持 markdown 详情页）。当前项目详情页是占位的，所以**默认不写正文**，只写入列表项。

## 第五步：build 验证

```bash
cd "D:/Multi-Agent/Codepilot/Valt/antfu-clone"
export NODE_ENV=development && npm run build
```

如果 build 失败 → 用 `AskUserQuestion` 让用户选「回滚 / 看错误 / 继续」。

## 第六步：commit + push

```bash
cd "D:/Multi-Agent/Codepilot/Valt/antfu-clone"
git add -A
git -c core.quotepath=false commit -m "post: <标题>

- slug: <slug>
- date: <date>
- tags: <tags>"
```

如果 push 失败（git 协议不可达），**最多重试 3 次**（每次间隔 10s），仍失败就提示用户检查网络。

## 第七步：等部署

```bash
sleep 30 && gh run list --repo jeekeagle/eagle --limit 1 --json status,conclusion,databaseId
```

如果 `conclusion != "success"`，用 `gh run view <id> --log-failed` 拉日志，提示用户。

## 第八步：报告

告诉用户：
- ✅ 标题 + slug + URL
- 📦 commit hash
- 🚀 部署状态
- 🔗 线上链接：`https://jeekeagle.github.io/eagle/#/posts/<slug>`

## 错误处理

| 错误 | 处理 |
|---|---|
| slug 重复 | 让用户改 slug |
| date 格式错 | 让用户重新输入 |
| build 失败 | 显示错误，**不 commit** |
| push 失败 | 重试 3 次，提示用户 |
| 部署失败 | 拉日志，问用户是否回滚 |

## 示例交互

```
User: /eagle-post
AI:  [AskUserQuestion] 收集 8 项
User:  [回答]
AI:  [检查 slug 唯一 → OK]
AI:  [写入 posts.ts]
AI:  [build → 1.06s, success]
AI:  [commit → "post: OPC：一个人 + Agent = 一家公司"]
AI:  [push → success]
AI:  [gh run list → success]
AI:  ✅ 已发布：https://jeekeagle.github.io/eagle/#/posts/one-person-company
```
