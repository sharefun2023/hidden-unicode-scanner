const { ZERO_WIDTH_BY_CP, HOMOGLYPH_BY_CHAR } = require("./lib/char-tables.js");

function scan(text) {
  const hits = [];
  for (let i = 0; i < text.length; i++) {
    const cp = text.codePointAt(i);
    if (cp > 0xFFFF) { i++; continue; }
    const ch = text[i];
    const zero = ZERO_WIDTH_BY_CP.get(cp);
    if (zero) { hits.push({ index: i, char: ch, type: "zero", name: zero.name }); continue; }
    const homo = HOMOGLYPH_BY_CHAR[ch];
    if (homo) hits.push({ index: i, char: ch, type: "homoglyph", looksLike: homo.looksLike });
  }
  return hits;
}

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

let pass = 0, fail = 0;
function assert(cond, msg) {
  if (cond) { pass++; console.log("  ✓ " + msg); }
  else { fail++; console.log("  ✗ " + msg); }
}

// 测试1：钓鱼域名 аррle.com（西里尔 а р е）
console.log("测试1 钓鱼域名 аррle.com");
const h1 = scan("аррle.com");
console.log("  命中:", h1.map(h => `${h.char}→${h.looksLike}`).join(", "));
assert(h1.length === 3, "识别出 3 个西里尔字母");
assert(clean("аррle.com") === "apple.com", "清理为 apple.com");

// 测试2：零宽水印
console.log("测试2 零宽水印 hello\u200B\u200Bworld");
const h2 = scan("hello\u200B\u200Bworld");
assert(h2.length === 2 && h2.every(h => h.type === "zero"), "识别出 2 个零宽空格");
assert(clean("hello\u200B\u200Bworld") === "helloworld", "清理后为 helloworld");

// 测试3：干净文本
console.log("测试3 干净文本");
const h3 = scan("hello world 你好 123");
assert(h3.length === 0, "干净文本无命中");

// 测试4：混合（零宽 + 同形字 + 正常）
console.log("测试4 混合文本");
const mixed = "g\u200B\u043Eogle.com";
const h4 = scan(mixed);
assert(h4.length === 2, "识别零宽 + 西里尔 o 共 2 处");
assert(clean(mixed) === "google.com", "清理为 google.com");

console.log(`\n结果: ${pass} 通过, ${fail} 失败`);
process.exit(fail === 0 ? 0 : 1);
