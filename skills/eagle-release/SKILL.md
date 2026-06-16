---
name: eagle-release
description: 给当前 Eagle 主仓库打 tag（vX.Y.Z）+ 打包 dist 成 zip + 用 gh CLI 发 GitHub Release。
when_to_use: 用户说"发版"、"打 tag"、"release"、"v0.x.0" 时触发
---

# eagle-release

> 把当前已部署的 Eagle 主仓库打上版本号 tag，发布到 GitHub Releases。

## 触发

`/eagle-release`、说"发版"、"打 tag"、"release"、"v0.x.0"。

## 第一步：检查状态

```bash
cd "D:/Multi-Agent/Codepilot/Valt/antfu-clone"
git status --short
git log origin/main --oneline -1
gh release list --repo jeekeagle/eagle --limit 3
```

如果 `git status` 不干净（未 commit 的修改）→ 提示用户先 commit 或 stash。

## 第二步：问版本号

`AskUserQuestion`：

1. **版本号**（必填） — 短文本（例：`v0.4.0`）。如果不填，自动从 `git tag --sort=-v:refname | head -1` 的下一个 patch / minor / major 自动算
2. **版本标题**（必填） — 短文本（例：`Eagle v0.4.0`）
3. **Release notes**（必填） — markdown 文本。模板：

```markdown
## 🦅 Eagle v<X.Y.Z> — <一句话标题>

### 改动
- ...

### 验证
- ✅ Build / Workflow / 8 个页面 / etc.

### 在线预览
https://jeekeagle.github.io/eagle/
```

如果用户没写，自动从 `git log` 上一个 tag 到现在的所有 commit 拼接。

## 第三步：build

```bash
cd "D:/Multi-Agent/Codepilot/Valt/antfu-clone"
export NODE_ENV=development && npm run build
```

build 失败 → 中止。

## 第四步：打 tag

```bash
cd "D:/Multi-Agent/Codepilot/Valt/antfu-clone"
git tag -d v<X.Y.Z> 2>/dev/null  # 删本地已存在的同名 tag
git tag -a v<X.Y.Z> -m "v<X.Y.Z>: <一句话标题>"
git push origin v<X.Y.Z>
```

如果远端已有同名 tag → 问用户「覆盖 / 跳过 / 改号」。

## 第五步：打包

```bash
cd "D:/Multi-Agent/Codepilot/Valt/antfu-clone"
powershell -NoProfile -Command "Compress-Archive -Path dist/* -DestinationPath eagle-v<X.Y.Z>.zip -Force"
```

## 第六步：发 release

```bash
REPO="jeekeagle/eagle"
TAG="v<X.Y.Z>"
ZIP="D:/Multi-Agent/Codepilot/Valt/antfu-clone/eagle-v<X.Y.Z>.zip"
gh release create "$TAG" "$ZIP" \
  --repo "$REPO" \
  --title "Eagle v<X.Y.Z>" \
  --notes "<用户填的 release notes>"
```

## 第七步：报告

- ✅ Tag: `v<X.Y.Z>`
- 📦 资源: `eagle-v<X.Y.Z>.zip` (size)
- 🔗 URL: `https://github.com/jeekeagle/eagle/releases/tag/v<X.Y.Z>`

## 错误处理

| 错误 | 处理 |
|---|---|
| working tree 不干净 | 提示用户先 commit/stash |
| tag 已存在（远端） | 问覆盖 / 改号 |
| build 失败 | 中止 |
| `gh` 未登录 | 提示 `gh auth login` |
| 资源 > 100MB | 警告（GitHub 上限 2GB，但大文件不该在 release） |
