# Chrome Web Store 上架素材 · Hidden Unicode Scanner

> 生成 2026-08-16 · 基于暴涨作业清单打法（标题=品牌+关键词，前132字符塞关键词，截图 before/after）
> 分类建议：**Utilities**（实用工具）｜ 权限：仅 `clipboardWrite` ｜ 隐私：100% 本地，零上传

---

## 一、英文 Listing（默认语言）

### 标题（69 字符 ✅）
```
Zero-Width & Hidden Unicode Scanner – Detect Phishing & AI Watermarks
```

### 简短描述 / Summary（132 字符 ✅ 卡线，搜索摘要展示的就是这段）
```
Detect zero-width & invisible characters. Spot phishing domains (аррle.com) and AI text watermarks. One-click cleanup, 100% offline.
```

### 完整描述（Description）
```
Detect and clean invisible characters hiding in your text — zero-width characters, homoglyphs (lookalike letters), and Unicode control characters. Built for anyone who copies text from PDFs, web pages, or AI-generated content.

WHAT IT FINDS
• Zero-width characters (U+200B, U+200C, U+200D, U+2060, U+2061, U+FEFF & 30+ more) — the building blocks of AI text watermarks and hidden tracking
• Homoglyphs — Cyrillic/Greek letters that look identical to Latin (аррle.com → the "р" is Cyrillic, a classic phishing trick)
• Bidi control characters & format controls that scramble or hide text

WHAT IT DOES
• Highlights every suspicious character in red, with a per-character breakdown (code point + name)
• One-click cleanup: removes zero-width chars, converts homoglyphs back to Latin
• Instantly copies the clean text

PRIVACY
• 100% local — no servers, no uploads, no account, no analytics
• Only one permission requested: clipboardWrite
• Open source on GitHub

USE CASES
• Verify links before clicking (phishing detection)
• Check AI-generated text for hidden watermarks
• Clean invisible junk copied from PDFs and websites
```

---

## 二、中文 Listing

### 标题（40 字符 ✅）
```
隐藏 Unicode 字符扫描器 — 检测零宽字符、同形字、AI 水印与钓鱼域名
```

### 简短描述（71 字符 ✅）
```
检测零宽字符、同形字与不可见文本。识别钓鱼域名（аррle.com 里的 р 不是 p）和 AI 文本水印。一键清理，100% 本地，不上传。
```

### 完整描述
```
检测并清理文本里藏着的不可见字符——零宽字符、同形字、Unicode 控制字符。适合经常从 PDF、网页、AI 生成内容里复制文本的人。

能发现什么
• 零宽字符（U+200B、U+200C、U+200D、U+2060、U+2061、U+FEFF 等 30 多种）——AI 文本水印和隐藏追踪的基础
• 同形字——长得和拉丁字母一模一样的西里尔/希腊字母（аррle.com 里的 р 其实是西里尔字母，经典钓鱼手法）
• 双向控制符与格式控制字符——可能扰乱或隐藏文本

能做什么
• 每个可疑字符红色高亮，附逐字符明细（码点 + 名称）
• 一键清理：移除零宽字符、同形字还原为拉丁字母
• 即时复制干净文本

隐私
• 100% 本地处理——无服务器、无上传、无账号、无统计
• 仅申请 clipboardWrite 一个权限
• 开源（GitHub 可查）

适用场景
• 点击链接前先验证（防钓鱼）
• 检查 AI 生成文本里的隐藏水印
• 清理从 PDF/网页复制出来的不可见乱码
```

---

## 三、截图脚本（3 张，1280×800，JPEG/PNG）

> 制作方式：本地 `chrome://extensions/` 加载扩展 → 点工具栏图标展开 popup → 粘贴示例文本 → 点「扫描」→ 截屏。

### 截图 1 · 主图（功能全貌 + 钓鱼检测）
- **画面**：popup 展开，输入框已粘贴文本，扫描完成，预览区红底高亮可疑字符，下方逐字符明细列表可见
- **示例输入**：
  ```
  Check this link: аррle.com and invoice №123
  ```
- **期望画面**：`р`（西里尔 U+0440）红底高亮；明细显示 `U+0440 CYRILLIC SMALL ER → 形似 'p'`；`№` 的同形情况一并检出

### 截图 2 · 钓鱼场景特写（情绪钩子）
- **画面**：聚焦钓鱼域名检测结果
- **示例输入**：
  ```
  Verify your account at аррle.com/login — urgent!
  ```
- **期望画面**：`р` 高亮 + 顶部警示「检测到钓鱼域名风险：р 是西里尔字母 Cyrillic Small Er」

### 截图 3 · AI 水印 / 零宽字符场景
- **画面**：一段看起来完全正常的英文句子，扫描后零宽字符被可视化标记（红点/红线）高亮
- **示例输入**（含真实零宽字符 U+200B/U+200C/U+200D，直接复制）：
  ```
  This‌ text‌ looks‍ normal but has hidden marks
  ```
- **期望画面**：三个零宽字符位置被标记；明细列出 `U+200B ZERO WIDTH SPACE` / `U+200C ZERO WIDTH NON-JOINER` / `U+200D ZERO WIDTH JOINER`

---

## 四、上架 Checklist

- [ ] 图标 16/48/128 已就绪（`icons/`，`gen_icons.py` 生成）
- [ ] 本地 `chrome://extensions/` 加载验证通过
- [ ] 3 张截图按上方脚本制作
- [ ] 英文 listing 填好（标题/摘要/完整描述）
- [ ] 中文 listing 填好（同上）
- [ ] 分类选 Utilities
- [ ] 隐私声明：选「不收集数据」+ 粘贴纯本地说明
- [ ] 提交审核（首次约 1-3 天，$5 开发者注册费一次性）
- [ ] 过审后 devtoolbox（23232322.xyz）加同名网页工具页 + 双向引流
