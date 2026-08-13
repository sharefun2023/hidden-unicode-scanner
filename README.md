# Hidden Unicode Scanner · 隐藏字符扫描器

检测并清理文本中的**零宽字符**和**同形字(homoglyph)**，用于识别：

- AI 文本水印（零宽字符编码指纹）
- 钓鱼域名（`аррle.com` 里的 `р` 是西里尔字母，不是 `p`）
- PDF / 网页复制出来的乱码不可见字符

纯前端 Manifest V3，零 API、零上传、零后端。

## 安装（本地测试）

1. Chrome 打开 `chrome://extensions/`
2. 右上角开启「开发者模式」
3. 点「加载已解压的扩展程序」，选择本目录
4. 点工具栏图标 → 粘贴文本 → 扫描

## 功能

- 扫描 36 种零宽/格式控制字符
- 检测 60+ 种西里尔/希腊同形字
- 高亮预览 + 逐字符明细
- 一键清理（移除零宽、同形字还原为 Latin）并复制

## 结构

```
manifest.json        MV3 配置（仅 clipboardWrite 权限）
popup.html/css/js    界面 + 逻辑
lib/char-tables.js   字符表（可被 devtoolbox 网页版复用）
test-scan.cjs        node 单测（node test-scan.cjs）
```

## 联动

`lib/char-tables.js` 是纯数据模块（UMD），可直接复用为
devtoolbox（23232322.xyz）的同名网页工具，双向引流。
