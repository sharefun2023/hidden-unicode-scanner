// Hidden Unicode Scanner — 字符表
// 零宽/不可见字符 + 同形字(homoglyph)映射表
// 供 popup.js 引用；也可独立 import 到 devtoolbox 网页版复用

// ── 零宽 / 不可见 / 格式控制字符 ──────────────────────────────
const ZERO_WIDTH_CHARS = [
  { cp: 0x200B, name: "Zero Width Space", zh: "零宽空格" },
  { cp: 0x200C, name: "Zero Width Non-Joiner", zh: "零宽不连字" },
  { cp: 0x200D, name: "Zero Width Joiner", zh: "零宽连字" },
  { cp: 0x200E, name: "Left-to-Right Mark", zh: "从左向右标记" },
  { cp: 0x200F, name: "Right-to-Left Mark", zh: "从右向左标记" },
  { cp: 0x202A, name: "Left-to-Right Embedding", zh: "左向右嵌入" },
  { cp: 0x202B, name: "Right-to-Left Embedding", zh: "右向左嵌入" },
  { cp: 0x202C, name: "Pop Directional Formatting", zh: "弹出方向格式" },
  { cp: 0x202D, name: "Left-to-Right Override", zh: "左向右覆盖" },
  { cp: 0x202E, name: "Right-to-Left Override", zh: "右向左覆盖" },
  { cp: 0x2060, name: "Word Joiner", zh: "词连接符" },
  { cp: 0x2061, name: "Function Application", zh: "函数应用" },
  { cp: 0x2062, name: "Invisible Times", zh: "隐形乘号" },
  { cp: 0x2063, name: "Invisible Separator", zh: "隐形分隔符" },
  { cp: 0x2064, name: "Invisible Plus", zh: "隐形加号" },
  { cp: 0x2066, name: "Left-to-Right Isolate", zh: "左向右隔离" },
  { cp: 0x2067, name: "Right-to-Left Isolate", zh: "右向左隔离" },
  { cp: 0x2068, name: "First Strong Isolate", zh: "首个强隔离" },
  { cp: 0x2069, name: "Pop Directional Isolate", zh: "弹出方向隔离" },
  { cp: 0x206A, name: "Inhibit Symmetric Swapping", zh: "抑制对称交换" },
  { cp: 0x206B, name: "Activate Symmetric Swapping", zh: "激活对称交换" },
  { cp: 0x206C, name: "Inhibit Arabic Form Shaping", zh: "抑制阿拉伯语形态" },
  { cp: 0x206D, name: "Activate Arabic Form Shaping", zh: "激活阿拉伯语形态" },
  { cp: 0x206E, name: "National Digit Shapes", zh: "国家数字形态" },
  { cp: 0x206F, name: "Nominal Digit Shapes", zh: "名义数字形态" },
  { cp: 0xFEFF, name: "Zero Width No-Break Space (BOM)", zh: "零宽不换行空格" },
  { cp: 0x180E, name: "Mongolian Vowel Separator", zh: "蒙古语元音分隔符" },
  { cp: 0x00AD, name: "Soft Hyphen", zh: "软连字符" },
  { cp: 0x034F, name: "Combining Grapheme Joiner", zh: "组合字形连接符" },
  { cp: 0x061C, name: "Arabic Letter Mark", zh: "阿拉伯字母标记" },
  { cp: 0x115F, name: "Hangul Choseong Filler", zh: "谚文初声填充" },
  { cp: 0x1160, name: "Hangul Jungseong Filler", zh: "谚文中声填充" },
  { cp: 0x17B4, name: "Khmer Vowel Inherent AQ", zh: "高棉语固有元音AQ" },
  { cp: 0x17B5, name: "Khmer Vowel Inherent AA", zh: "高棉语固有元音AA" },
  { cp: 0x3164, name: "Hangul Filler", zh: "谚文填充" },
  { cp: 0xFFA0, name: "Halfwidth Hangul Filler", zh: "半角谚文填充" }
];

// ── 同形字 (homoglyph)：字符 → 看起来像的 Latin 字符 ──────────
// 主要用于钓鱼域名(аррle.com)、AI 文本水印、混淆文本检测
const HOMOGLYPHS = {
  // 西里尔小写
  "\u0430": { looksLike: "a", name: "Cyrillic Small Letter A (西里尔 а)" },
  "\u0435": { looksLike: "e", name: "Cyrillic Small Letter IE (西里尔 е)" },
  "\u0454": { looksLike: "e", name: "Cyrillic Small Letter Ukrainian IE (є)" },
  "\u043E": { looksLike: "o", name: "Cyrillic Small Letter O (西里尔 о)" },
  "\u0440": { looksLike: "p", name: "Cyrillic Small Letter ER (西里尔 р)" },
  "\u0441": { looksLike: "c", name: "Cyrillic Small Letter ES (西里尔 с)" },
  "\u0445": { looksLike: "x", name: "Cyrillic Small Letter HA (西里尔 х)" },
  "\u0443": { looksLike: "y", name: "Cyrillic Small Letter U (西里尔 у)" },
  "\u0456": { looksLike: "i", name: "Cyrillic Small Letter Byelorussian-Ukrainian I (і)" },
  "\u0458": { looksLike: "j", name: "Cyrillic Small Letter JE (ј)" },
  "\u0455": { looksLike: "s", name: "Cyrillic Small Letter DZE (ѕ)" },
  "\u0501": { looksLike: "d", name: "Cyrillic Small Letter Komi De (ԁ)" },
  "\u04BB": { looksLike: "h", name: "Cyrillic Small Letter Shha (һ)" },
  "\u04CF": { looksLike: "l", name: "Cyrillic Small Letter Palochka (ӏ)" },
  // 西里尔大写
  "\u0410": { looksLike: "A", name: "Cyrillic Capital Letter A (А)" },
  "\u0412": { looksLike: "B", name: "Cyrillic Capital Letter VE (В)" },
  "\u0415": { looksLike: "E", name: "Cyrillic Capital Letter IE (Е)" },
  "\u0417": { looksLike: "3", name: "Cyrillic Capital Letter ZE (З)" },
  "\u041C": { looksLike: "M", name: "Cyrillic Capital Letter EM (М)" },
  "\u041D": { looksLike: "H", name: "Cyrillic Capital Letter EN (Н)" },
  "\u041E": { looksLike: "O", name: "Cyrillic Capital Letter O (О)" },
  "\u0420": { looksLike: "P", name: "Cyrillic Capital Letter ER (Р)" },
  "\u0421": { looksLike: "C", name: "Cyrillic Capital Letter ES (С)" },
  "\u0422": { looksLike: "T", name: "Cyrillic Capital Letter TE (Т)" },
  "\u0425": { looksLike: "X", name: "Cyrillic Capital Letter HA (Х)" },
  "\u0406": { looksLike: "I", name: "Cyrillic Capital Letter Byelorussian-Ukrainian I (І)" },
  // 希腊小写
  "\u03B1": { looksLike: "a", name: "Greek Small Letter Alpha (α)" },
  "\u03B2": { looksLike: "B", name: "Greek Small Letter Beta (β)" },
  "\u03B5": { looksLike: "e", name: "Greek Small Letter Epsilon (ε)" },
  "\u03B7": { looksLike: "n", name: "Greek Small Letter Eta (η)" },
  "\u03B9": { looksLike: "i", name: "Greek Small Letter Iota (ι)" },
  "\u03BA": { looksLike: "k", name: "Greek Small Letter Kappa (κ)" },
  "\u03BD": { looksLike: "v", name: "Greek Small Letter Nu (ν)" },
  "\u03BF": { looksLike: "o", name: "Greek Small Letter Omicron (ο)" },
  "\u03C1": { looksLike: "p", name: "Greek Small Letter Rho (ρ)" },
  "\u03C2": { looksLike: "s", name: "Greek Small Letter Final Sigma (ς)" },
  "\u03C3": { looksLike: "o", name: "Greek Small Letter Sigma (σ)" },
  "\u03C4": { looksLike: "t", name: "Greek Small Letter Tau (τ)" },
  "\u03C5": { looksLike: "u", name: "Greek Small Letter Upsilon (υ)" },
  "\u03C7": { looksLike: "x", name: "Greek Small Letter Chi (χ)" },
  // 希腊大写
  "\u0391": { looksLike: "A", name: "Greek Capital Letter Alpha (Α)" },
  "\u0392": { looksLike: "B", name: "Greek Capital Letter Beta (Β)" },
  "\u0395": { looksLike: "E", name: "Greek Capital Letter Epsilon (Ε)" },
  "\u0397": { looksLike: "H", name: "Greek Capital Letter Eta (Η)" },
  "\u0399": { looksLike: "I", name: "Greek Capital Letter Iota (Ι)" },
  "\u039A": { looksLike: "K", name: "Greek Capital Letter Kappa (Κ)" },
  "\u039C": { looksLike: "M", name: "Greek Capital Letter Mu (Μ)" },
  "\u039D": { looksLike: "N", name: "Greek Capital Letter Nu (Ν)" },
  "\u039F": { looksLike: "O", name: "Greek Capital Letter Omicron (Ο)" },
  "\u03A1": { looksLike: "P", name: "Greek Capital Letter Rho (Ρ)" },
  "\u03A4": { looksLike: "T", name: "Greek Capital Letter Tau (Τ)" },
  "\u03A5": { looksLike: "Y", name: "Greek Capital Letter Upsilon (Υ)" },
  "\u03A7": { looksLike: "X", name: "Greek Capital Letter Chi (Χ)" }
};

// 预构建索引（popup.js 用）
const ZERO_WIDTH_BY_CP = new Map(ZERO_WIDTH_CHARS.map(z => [z.cp, z]));
const HOMOGLYPH_BY_CHAR = HOMOGLYPHS; // 直接对象查找

if (typeof module !== "undefined" && module.exports) {
  module.exports = { ZERO_WIDTH_CHARS, HOMOGLYPHS, ZERO_WIDTH_BY_CP, HOMOGLYPH_BY_CHAR };
}
