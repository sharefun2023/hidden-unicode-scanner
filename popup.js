// Hidden Unicode Scanner — popup 逻辑

const input = document.getElementById("input");
const scanBtn = document.getElementById("scan");
const cleanBtn = document.getElementById("clean-copy");
const clearBtn = document.getElementById("clear");
const summary = document.getElementById("summary");
const result = document.getElementById("result");
const preview = document.getElementById("preview");
const details = document.getElementById("details");
const status = document.getElementById("status");

let lastScan = [];

function escapeHtml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// 扫描文本，返回可疑字符列表
function scan(text) {
  const hits = [];
  for (let i = 0; i < text.length; i++) {
    const cp = text.codePointAt(i);
    if (cp > 0xFFFF) { i++; continue; } // 跳过代理对（emoji 等）
    const ch = text[i];

    const zero = ZERO_WIDTH_BY_CP.get(cp);
    if (zero) {
      hits.push({ index: i, char: ch, type: "zero", name: zero.name, zh: zero.zh });
      continue;
    }
    const homo = HOMOGLYPH_BY_CHAR[ch];
    if (homo) {
      hits.push({ index: i, char: ch, type: "homoglyph", looksLike: homo.looksLike, name: homo.name });
    }
  }
  return hits;
}

// 清理：移除零宽字符，同形字替换为对应 Latin 字符
function clean(text) {
  let out = "";
  for (let i = 0; i < text.length; i++) {
    const cp = text.codePointAt(i);
    if (cp > 0xFFFF) { out += text[i] + text[i + 1]; i++; continue; }
    const ch = text[i];
    if (ZERO_WIDTH_BY_CP.has(cp)) continue;
    const homo = HOMOGLYPH_BY_CHAR[ch];
    out += homo ? homo.looksLike : ch;
  }
  return out;
}

// 高亮预览 HTML
function buildPreview(text, hits) {
  if (hits.length === 0) return escapeHtml(text);
  const hitSet = new Set(hits.map(h => h.index));
  let html = "";
  for (let i = 0; i < text.length; i++) {
    const cp = text.codePointAt(i);
    if (cp > 0xFFFF) { html += escapeHtml(text[i] + text[i + 1]); i++; continue; }
    const ch = text[i];
    if (hitSet.has(i)) html += '<span class="hit">' + escapeHtml(ch) + "</span>";
    else html += escapeHtml(ch);
  }
  return html;
}

function render(hits) {
  lastScan = hits;
  const text = input.value;
  const zeroCount = hits.filter(h => h.type === "zero").length;
  const homoCount = hits.filter(h => h.type === "homoglyph").length;

  if (hits.length === 0) {
    if (!text.trim()) {
      summary.className = "hidden";
      result.className = "hidden";
      return;
    }
    summary.className = "clean";
    summary.innerHTML = "✅ 未发现隐藏字符，文本干净。";
    result.className = "hidden";
    return;
  }

  summary.className = "dirty";
  summary.innerHTML =
    "⚠️ 发现 <b>" + hits.length + "</b> 个可疑字符（零宽 <b>" + zeroCount +
    "</b> · 同形字 <b>" + homoCount + "</b>）";

  result.className = "";
  preview.innerHTML = buildPreview(text, hits);

  details.innerHTML = "";
  hits.forEach(h => {
    const li = document.createElement("li");
    const idx = document.createElement("span");
    idx.className = "idx";
    idx.textContent = "#" + h.index;
    const ch = document.createElement("span");
    ch.className = "ch";
    ch.textContent = h.char === " " ? "␣" : h.char;
    const badge = document.createElement("span");
    badge.className = "badge " + (h.type === "zero" ? "zero" : "homo");
    badge.textContent = h.type === "zero" ? "零宽" : "同形字";
    const name = document.createElement("span");
    name.className = "name";
    name.textContent = h.name + (h.zh ? "（" + h.zh + "）" : "");
    li.append(idx, ch, badge, name);
    if (h.type === "homoglyph") {
      const looks = document.createElement("span");
      looks.className = "looks";
      looks.textContent = "→ 看起来像 " + h.looksLike;
      li.append(looks);
    }
    details.appendChild(li);
  });
}

function setStatus(msg, ok) {
  status.textContent = msg;
  status.className = ok ? "ok" : "err";
  clearTimeout(setStatus._t);
  setStatus._t = setTimeout(() => { status.textContent = ""; status.className = ""; }, 2000);
}

scanBtn.addEventListener("click", () => render(scan(input.value)));

cleanBtn.addEventListener("click", () => {
  const text = input.value;
  if (!text.trim()) { setStatus("先粘贴要清理的文本", false); return; }
  const cleaned = clean(text);
  input.value = cleaned;
  render(scan(cleaned));
  navigator.clipboard.writeText(cleaned).then(() => {
    setStatus("已清理并复制到剪贴板 ✓", true);
  }).catch(() => {
    setStatus("已清理（复制失败，请手动全选复制）", false);
  });
});

clearBtn.addEventListener("click", () => {
  input.value = "";
  summary.className = "hidden";
  result.className = "hidden";
  lastScan = [];
  input.focus();
});

// 自动扫描：输入变化后防抖
let debounceTimer;
input.addEventListener("input", () => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => render(scan(input.value)), 300);
});
