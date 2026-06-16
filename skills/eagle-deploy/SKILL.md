---
name: eagle-deploy
description: 把当前 Eagle 主仓库的本地修改 commit + push，触发 GitHub Pages 自动部署。不改任何内容。
when_to_use: 用户说"部署"、"deploy"、"push 一下"、"上线" 时触发
---

# eagle-deploy

> 不改任何内容，只把当前 `main` 分支的本地修改推到 GitHub，触发自动部署。

## 触发

`/eagle-deploy`、说"部署"、"deploy"、"push 一下"、"上线"。

## 第一步：检查状态

```bash
cd "D:/Multi-Agent/Codepilot/Valt/antfu-clone"
git status --short
git log origin/main..HEAD --oneline  # 本地领先多少 commit
```

两种情况：
- **情况 A**：有未 commit 的本地修改 → 走「先 commit 再 push」
- **情况 B**：没有未 commit 的修改，但本地领先远端 → 走「直接 push」

## 第二步：情况 A — commit + push

`AskUserQuestion`：

1. **commit 信息**（必填） — 短文本（例：`docs: 修正 README 笔误`）

然后：

```bash
cd "D:/Multi-Agent/Codepilot/Valt/antfu-clone"
git add -A
git -c core.quotepath=false commit -m "<commit 信息>"
git push origin main  # 失败重试 3 次
```

## 第三步：情况 B — 直接 push

```bash
cd "D:/Multi-Agent/Codepilot/Valt/antfu-clone"
git push origin main  # 失败重试 3 次
```

## 第四步：等部署

```bash
sleep 30 && gh run list --repo jeekeagle/eagle --limit 1 --json status,conclusion,databaseId
```

如果不 success，用 `gh run view <id> --log-failed` 拉日志。

## 第五步：报告

- ✅ commit hash
- 🚀 部署状态
- 🔗 `https://jeekeagle.github.io/eagle/`

## 错误处理

| 错误 | 处理 |
|---|---|
| 没有任何修改 + 没有任何领先 | 提示"没有可部署的" |
| push 失败（git 协议超时） | 重试 3 次（间隔 10s），仍失败提示用户 |
| 部署失败 | 拉日志 + 让用户决定回滚 / 重试 |

## 与其它 skill 的关系

- `eagle-post` / `eagle-project` 等内容类 skill 内部已经包含部署步骤
- `eagle-deploy` 适用于**单独部署**：本地有改动想推上去，或想重新触发一次部署
