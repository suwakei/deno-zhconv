"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const dntShim = __importStar(require("./_dnt.test_shims.js"));
const mod_js_1 = require("./deps/deno.land/std@0.224.0/assert/mod.js");
const mod_js_2 = require("./mod.js");
dntShim.Deno.test("h2z: empty string", () => {
    (0, mod_js_1.assertEquals)((0, mod_js_2.h2z)(""), "");
});
dntShim.Deno.test("h2z: null input", () => {
    (0, mod_js_1.assertEquals)((0, mod_js_2.h2z)(null), "");
});
dntShim.Deno.test("h2z: half-width ASCII to full-width", () => {
    (0, mod_js_1.assertEquals)((0, mod_js_2.h2z)("abc ABC 123 !@#"), "ａｂｃ　ＡＢＣ　１２３　！＠＃");
    (0, mod_js_1.assertEquals)((0, mod_js_2.h2z)("Hello World, 2024!"), "Ｈｅｌｌｏ　Ｗｏｒｌｄ，　２０２４！");
});
dntShim.Deno.test("h2z: half-width Katakana (Seion) to full-width", () => {
    (0, mod_js_1.assertEquals)((0, mod_js_2.h2z)("ｱｲｳｴｵｶｷｸｹｺ"), "アイウエオカキクケコ");
    (0, mod_js_1.assertEquals)((0, mod_js_2.h2z)("ｻｼｽｾｿﾀﾁﾂﾃﾄ"), "サシスセソタチツテト");
});
dntShim.Deno.test("h2z: half-width Katakana with Dakuten to full-width", () => {
    (0, mod_js_1.assertEquals)((0, mod_js_2.h2z)("ｶﾞｷﾞｸﾞｹﾞｺﾞ"), "ガギグゲゴ");
    (0, mod_js_1.assertEquals)((0, mod_js_2.h2z)("ｻﾞｼﾞｽﾞｾﾞｿﾞ"), "ザジズゼゾ");
    (0, mod_js_1.assertEquals)((0, mod_js_2.h2z)("ﾀﾞﾁﾞﾂﾞﾃﾞﾄﾞ"), "ダヂヅデド"); // ﾁﾞ, ﾂﾞ
});
dntShim.Deno.test("h2z: half-width Katakana 'ｳ' with Dakuten to 'ヴ'", () => {
    (0, mod_js_1.assertEquals)((0, mod_js_2.h2z)("ｳﾞ"), "ヴ");
});
dntShim.Deno.test("h2z: half-width Katakana with Handakuten to full-width", () => {
    (0, mod_js_1.assertEquals)((0, mod_js_2.h2z)("ﾊﾟﾋﾟﾌﾟﾍﾟﾎﾟ"), "パピプペポ");
});
dntShim.Deno.test("h2z: mixed half-width content", () => {
    (0, mod_js_1.assertEquals)((0, mod_js_2.h2z)("ﾃｽﾄ 123 abc ｶﾞﾝﾊﾞﾚ! ｳﾞ"), "テスト　１２３　ａｂｃ　ガンバレ！　ヴ");
});
dntShim.Deno.test("h2z: already full-width characters (should remain unchanged)", () => {
    (0, mod_js_1.assertEquals)((0, mod_js_2.h2z)("あいうえおＡＢＣ１２３ガギグゲゴパピプペポ"), "あいうえおＡＢＣ１２３ガギグゲゴパピプペポ");
});
dntShim.Deno.test("h2z: standalone half-width Dakuten/Handakuten marks", () => {
    // 'ﾞ' and 'ﾟ' are in KANA_H2Z_CHARS_MAP, so they convert to '゛' and '゜'
    (0, mod_js_1.assertEquals)((0, mod_js_2.h2z)("ﾞ"), "゛");
    (0, mod_js_1.assertEquals)((0, mod_js_2.h2z)("ﾟ"), "゜");
    (0, mod_js_1.assertEquals)((0, mod_js_2.h2z)("abcﾞdefﾟ"), "ａｂｃ゛ｄｅｆ゜");
});
dntShim.Deno.test("h2z: half-width Katakana symbols", () => {
    (0, mod_js_1.assertEquals)((0, mod_js_2.h2z)("｡､･ｰ｢｣"), "。、・ー「」");
});
dntShim.Deno.test("h2z: string ending with a base char for dakuten/handakuten", () => {
    (0, mod_js_1.assertEquals)((0, mod_js_2.h2z)("ｶ"), "カ");
    (0, mod_js_1.assertEquals)((0, mod_js_2.h2z)("abcｶ"), "ａｂｃカ");
});
dntShim.Deno.test("h2z: string with dakuten/handakuten not applicable to preceding char", () => {
    (0, mod_js_1.assertEquals)((0, mod_js_2.h2z)("aﾞ"), "ａ゛"); // 'a' is not in KANA_H2Z_DAKUTEN_MAP, 'ﾞ' becomes '゛'
    (0, mod_js_1.assertEquals)((0, mod_js_2.h2z)("ｱﾟ"), "ア゜"); // 'ｱ' is not in KANA_H2Z_MARU_MAP, 'ﾟ' becomes '゜'
});
dntShim.Deno.test("h2z: complex mixed string", () => {
    const input = "abc 123 ﾃｽﾄ ｶﾞｷﾞｸﾞｹﾞｺﾞ ﾊﾟﾋﾟﾌﾟﾍﾟﾎﾟ ｳﾞ ｱｲｳｴｵ ｡､･ｰ｢｣ ﾞ ﾟ XYZ";
    const expected = "ａｂｃ　１２３　テスト　ガギグゲゴ　パピプペポ　ヴ　アイウエオ　。、・ー「」　゛　゜　ＸＹＺ";
    (0, mod_js_1.assertEquals)((0, mod_js_2.h2z)(input), expected);
});
dntShim.Deno.test("h2z: half-width small kana", () => {
    (0, mod_js_1.assertEquals)((0, mod_js_2.h2z)("ｧｨｩｪｫｯｬｭｮ"), "ァィゥェォッャュョ");
});
dntShim.Deno.test("h2z: specific case from Go test (H2Z_DAKUTEN_MAP has 'ﾞ' and 'ﾟ')", () => {
    // In table.ts, KANA_H2Z_DAKUTEN_MAP has 'ﾞ': 'ﾞ' and 'ﾟ': 'ﾟ'.
    // Then KANA_H2Z_CHARS_MAP has 'ﾞ': '゛' and 'ﾟ': '゜'.
    // So, a standalone 'ﾞ' or 'ﾟ' should become '゛' or '゜'.
    (0, mod_js_1.assertEquals)((0, mod_js_2.h2z)("ｶﾞ"), "ガ");
    (0, mod_js_1.assertEquals)((0, mod_js_2.h2z)("ﾊﾟ"), "パ");
    (0, mod_js_1.assertEquals)((0, mod_js_2.h2z)("ｳﾞ"), "ヴ");
    (0, mod_js_1.assertEquals)((0, mod_js_2.h2z)("ﾞ"), "゛"); // Standalone dakuten
    (0, mod_js_1.assertEquals)((0, mod_js_2.h2z)("ﾟ"), "゜"); // Standalone handakuten
});
// -------------z2h_test-------------- 
dntShim.Deno.test("z2h: empty string", () => {
    (0, mod_js_1.assertEquals)((0, mod_js_2.z2h)(""), "");
});
dntShim.Deno.test("z2h: null input", () => {
    (0, mod_js_1.assertEquals)((0, mod_js_2.z2h)(null), "");
});
dntShim.Deno.test("z2h: full-width ASCII to half-width", () => {
    (0, mod_js_1.assertEquals)((0, mod_js_2.z2h)("ａｂｃ ＡＢＣ １２３ ！＠＃"), "abc ABC 123 !@#");
    (0, mod_js_1.assertEquals)((0, mod_js_2.z2h)("Ｈｅｌｌｏ Ｗｏｒｌｄ， ２０２４！"), "Hello World, 2024!");
});
dntShim.Deno.test("z2h: full-width Katakana (Seion) to half-width", () => {
    (0, mod_js_1.assertEquals)((0, mod_js_2.z2h)("アイウエオカキクケコ"), "ｱｲｳｴｵｶｷｸｹｺ");
    (0, mod_js_1.assertEquals)((0, mod_js_2.z2h)("サシスセソタチツテト"), "ｻｼｽｾｿﾀﾁﾂﾃﾄ");
});
dntShim.Deno.test("z2h: full-width Katakana with Dakuten to decomposed half-width", () => {
    (0, mod_js_1.assertEquals)((0, mod_js_2.z2h)("ガギグゲゴ"), "ｶﾞｷﾞｸﾞｹﾞｺﾞ");
    (0, mod_js_1.assertEquals)((0, mod_js_2.z2h)("ザジズゼゾ"), "ｻﾞｼﾞｽﾞｾﾞｿﾞ");
    (0, mod_js_1.assertEquals)((0, mod_js_2.z2h)("ダヂヅデド"), "ﾀﾞﾁﾞﾂﾞﾃﾞﾄﾞ");
});
dntShim.Deno.test("z2h: full-width Katakana 'ヴ' to decomposed 'ｳﾞ'", () => {
    (0, mod_js_1.assertEquals)((0, mod_js_2.z2h)("ヴ"), "ｳﾞ");
});
dntShim.Deno.test("z2h: full-width Katakana with Handakuten to decomposed half-width", () => {
    (0, mod_js_1.assertEquals)((0, mod_js_2.z2h)("パピプペポ"), "ﾊﾟﾋﾟﾌﾟﾍﾟﾎﾟ");
});
dntShim.Deno.test("z2h: mixed full-width content", () => {
    (0, mod_js_1.assertEquals)((0, mod_js_2.z2h)("テスト １２３ ａｂｃ ガンバレ！ ヴ"), "ﾃｽﾄ 123 abc ｶﾞﾝﾊﾞﾚ! ｳﾞ");
});
dntShim.Deno.test("z2h: already half-width characters (should remain unchanged)", () => {
    (0, mod_js_1.assertEquals)((0, mod_js_2.z2h)("あいうえおabc123ｶﾞｷﾞﾊﾟﾋﾟ"), "あいうえおabc123ｶﾞｷﾞﾊﾟﾋﾟ");
});
dntShim.Deno.test("z2h: standalone full-width Dakuten/Handakuten marks", () => {
    // '゛' and '゜' are in KANA_Z2H_CHARS_MAP, so they convert to 'ﾞ' and 'ﾟ'
    (0, mod_js_1.assertEquals)((0, mod_js_2.z2h)("゛"), "ﾞ");
    (0, mod_js_1.assertEquals)((0, mod_js_2.z2h)("゜"), "ﾟ");
    (0, mod_js_1.assertEquals)((0, mod_js_2.z2h)("ａｂｃ゛ｄｅｆ゜"), "abcﾞdefﾟ");
});
dntShim.Deno.test("z2h: full-width Katakana symbols", () => {
    (0, mod_js_1.assertEquals)((0, mod_js_2.z2h)("。、・ー「」"), "｡､･ｰ｢｣");
});
dntShim.Deno.test("z2h: complex mixed string", () => {
    const input = "ａｂｃ １２３ テスト ガギグゲゴ パピプペポ ヴ アイウエオ 。、・ー「」 ゛ ゜ ＸＹＺ";
    const expected = "abc 123 ﾃｽﾄ ｶﾞｷﾞｸﾞｹﾞｺﾞ ﾊﾟﾋﾟﾌﾟﾍﾟﾎﾟ ｳﾞ ｱｲｳｴｵ ｡､･ｰ｢｣ ﾞ ﾟ XYZ";
    (0, mod_js_1.assertEquals)((0, mod_js_2.z2h)(input), expected);
});
dntShim.Deno.test("z2h: full-width small kana", () => {
    (0, mod_js_1.assertEquals)((0, mod_js_2.z2h)("ァィゥェォッャュョ"), "ｧｨｩｪｫｯｬｭｮ");
});
dntShim.Deno.test("z2h: specific case from Go test", () => {
    (0, mod_js_1.assertEquals)((0, mod_js_2.z2h)("ガ"), "ｶﾞ");
    (0, mod_js_1.assertEquals)((0, mod_js_2.z2h)("パ"), "ﾊﾟ");
    (0, mod_js_1.assertEquals)((0, mod_js_2.z2h)("ヴ"), "ｳﾞ");
    (0, mod_js_1.assertEquals)((0, mod_js_2.z2h)("゛"), "ﾞ"); // Standalone dakuten
    (0, mod_js_1.assertEquals)((0, mod_js_2.z2h)("゜"), "ﾟ"); // Standalone handakuten
});
dntShim.Deno.test("h2z: empty string", () => {
    // Unchanged lines
    (0, mod_js_1.assertEquals)((0, mod_js_2.z2h)("゛"), "ﾞ"); // Standalone dakuten
    (0, mod_js_1.assertEquals)((0, mod_js_2.z2h)("゜"), "ﾟ"); // Standalone handakuten
});
// -------------h2zAt_test--------------
dntShim.Deno.test("h2zAt: empty string", () => {
    (0, mod_js_1.assertEquals)((0, mod_js_2.h2zAt)(""), "");
});
dntShim.Deno.test("h2zAt: no indices provided", () => {
    (0, mod_js_1.assertEquals)((0, mod_js_2.h2zAt)("abc 123 ｱｲｳ"), "abc 123 ｱｲｳ");
});
dntShim.Deno.test("h2zAt: convert single ASCII char", () => {
    (0, mod_js_1.assertEquals)((0, mod_js_2.h2zAt)("abc", 0), "ａbc");
    (0, mod_js_1.assertEquals)((0, mod_js_2.h2zAt)("abc", 1), "aｂc");
    (0, mod_js_1.assertEquals)((0, mod_js_2.h2zAt)("abc", 2), "abｃ");
    (0, mod_js_1.assertEquals)((0, mod_js_2.h2zAt)("Hello World", 6), "Hello Ｗorld"); // Space
});
dntShim.Deno.test("h2zAt: convert single Digit char", () => {
    (0, mod_js_1.assertEquals)((0, mod_js_2.h2zAt)("12345", 0), "１2345");
    (0, mod_js_1.assertEquals)((0, mod_js_2.h2zAt)("12345", 4), "1234５");
});
dntShim.Deno.test("h2zAt: convert single Katakana char", () => {
    (0, mod_js_1.assertEquals)((0, mod_js_2.h2zAt)("ｱｲｳｴｵ", 0), "アｲｳｴｵ");
    (0, mod_js_1.assertEquals)((0, mod_js_2.h2zAt)("ｱｲｳｴｵ", 2), "ｱｲウｴｵ");
});
dntShim.Deno.test("h2zAt: convert multiple chars at specified indices", () => {
    (0, mod_js_1.assertEquals)((0, mod_js_2.h2zAt)("abc 123 ｱｲｳ", 0, 4, 8), "ａbc １23 アｲｳ");
    (0, mod_js_1.assertEquals)((0, mod_js_2.h2zAt)("abc 123 ｱｲｳ", 2, 6, 7), "abｃ 12３　ｱｲｳ");
});
dntShim.Deno.test("h2zAt: convert chars with combined Dakuten/Handakuten at base index", () => {
    // Index points to the base character ('ｶ', 'ﾊ')
    (0, mod_js_1.assertEquals)((0, mod_js_2.h2zAt)("ｶﾞｷﾞﾊﾟﾋﾟ", 0), "ガｷﾞﾊﾟﾋﾟ"); // Converts 'ｶ' + 'ﾞ' at index 0
    (0, mod_js_1.assertEquals)((0, mod_js_2.h2zAt)("ｶﾞｷﾞﾊﾟﾋﾟ", 2), "ｶﾞギﾊﾟﾋﾟ"); // Converts 'ｷ' + 'ﾞ' at index 2
    (0, mod_js_1.assertEquals)((0, mod_js_2.h2zAt)("ｶﾞｷﾞﾊﾟﾋﾟ", 4), "ｶﾞｷﾞパﾋﾟ"); // Converts 'ﾊ' + 'ﾟ' at index 4
    (0, mod_js_1.assertEquals)((0, mod_js_2.h2zAt)("ｳﾞ", 0), "ヴ"); // Converts 'ｳ' + 'ﾞ' at index 0
});
dntShim.Deno.test("h2zAt: convert chars with combined Dakuten/Handakuten at combining mark index", () => {
    // Index points to the combining mark ('ﾞ', 'ﾟ')
    // The combining mark itself is converted if it's in KANA_H2Z_CHARS_MAP
    (0, mod_js_1.assertEquals)((0, mod_js_2.h2zAt)("ｶﾞｷﾞﾊﾟﾋﾟ", 1), "ｶ゛ｷﾞﾊﾟﾋﾟ"); // Converts 'ﾞ' at index 1 to '゛'
    (0, mod_js_1.assertEquals)((0, mod_js_2.h2zAt)("ｶﾞｷﾞﾊﾟﾋﾟ", 3), "ｶﾞｷ゛ﾊﾟﾋﾟ"); // Converts 'ﾞ' at index 3 to '゛'
    (0, mod_js_1.assertEquals)((0, mod_js_2.h2zAt)("ｶﾞｷﾞﾊﾟﾋﾟ", 5), "ｶﾞｷﾞﾊ゜ﾋﾟ"); // Converts 'ﾟ' at index 5 to '゜'
    (0, mod_js_1.assertEquals)((0, mod_js_2.h2zAt)("ｳﾞ", 1), "ｳ゛"); // Converts 'ﾞ' at index 1 to '゛'
});
dntShim.Deno.test("h2zAt: convert chars with combined Dakuten/Handakuten at both indices", () => {
    // Indices point to both the base and the combining mark
    (0, mod_js_1.assertEquals)((0, mod_js_2.h2zAt)("ｶﾞｷﾞ", 0, 1), "ガｷﾞ"); // Converts 'ｶ'+'ﾞ' at 0, then 'ﾞ' at 1
    (0, mod_js_1.assertEquals)((0, mod_js_2.h2zAt)("ｶﾞｷﾞ", 0, 2), "ガギ"); // Converts 'ｶ'+'ﾞ' at 0, then 'ｷ' at 2
    (0, mod_js_1.assertEquals)((0, mod_js_2.h2zAt)("ｶﾞｷﾞ", 0, 1, 2, 3), "ガギ"); // Converts 'ｶ'+'ﾞ' at 0, 'ﾞ' at 1, 'ｷ'+'ﾞ' at 2, 'ﾞ' at 3
});
dntShim.Deno.test("h2zAt: indices pointing to non-convertible characters", () => {
    (0, mod_js_1.assertEquals)((0, mod_js_2.h2zAt)("あいうえお", 0, 2, 4), "あいうえお"); // Already full-width Hiragana
    (0, mod_js_1.assertEquals)((0, mod_js_2.h2zAt)("漢字", 0, 1), "漢字"); // Kanji
    (0, mod_js_1.assertEquals)((0, mod_js_2.h2zAt)("abc", 0, 1, 2, 10), "abc"); // Index 10 is out of bounds, should return original string
});
dntShim.Deno.test("h2zAt: invalid indices (negative or out of bounds)", () => {
    // Go version returns original string for invalid indices.
    (0, mod_js_1.assertEquals)((0, mod_js_2.h2zAt)("abc", -1), "abc");
    (0, mod_js_1.assertEquals)((0, mod_js_2.h2zAt)("abc", 3), "abc");
    (0, mod_js_1.assertEquals)((0, mod_js_2.h2zAt)("abc", 0, -1), "abc");
    (0, mod_js_1.assertEquals)((0, mod_js_2.h2zAt)("abc", 0, 3), "abc");
    (0, mod_js_1.assertEquals)((0, mod_js_2.h2zAt)("abc", -1, 3), "abc");
    (0, mod_js_1.assertEquals)((0, mod_js_2.h2zAt)("abc", 0, 1, 2, 100), "abc");
});
dntShim.Deno.test("h2zAt: duplicate indices", () => {
    (0, mod_js_1.assertEquals)((0, mod_js_2.h2zAt)("abc", 0, 0, 1, 1, 2, 2), "ａｂｃ");
});
// -------------z2hAt_test--------------
dntShim.Deno.test("z2hAt: empty string", () => {
    (0, mod_js_1.assertEquals)((0, mod_js_2.z2hAt)(""), "");
});
dntShim.Deno.test("z2hAt: convert single ASCII char", () => {
    (0, mod_js_1.assertEquals)((0, mod_js_2.z2hAt)("ａｂｃ", 0), "aｂｃ");
    (0, mod_js_1.assertEquals)((0, mod_js_2.z2hAt)("ａｂｃ", 1), "ａbｃ");
    (0, mod_js_1.assertEquals)((0, mod_js_2.z2hAt)("ａｂｃ", 2), "ａｂc");
    (0, mod_js_1.assertEquals)((0, mod_js_2.z2hAt)("Ｈｅｌｌｏ　Ｗｏｒｌｄ", 0), "Hｅｌｌｏ　Ｗｏｒｌｄ");
    (0, mod_js_1.assertEquals)((0, mod_js_2.z2hAt)("Ｈｅｌｌｏ　Ｗｏｒｌｄ", 6), "Ｈｅｌｌｏ　Wｏｒｌｄ"); // Space
});
dntShim.Deno.test("z2hAt: convert single Digit char", () => {
    (0, mod_js_1.assertEquals)((0, mod_js_2.z2hAt)("１２３４５", 0), "1２３４５");
    (0, mod_js_1.assertEquals)((0, mod_js_2.z2hAt)("１２３４５", 4), "１２３４5");
});
dntShim.Deno.test("z2hAt: convert single Katakana char", () => {
    (0, mod_js_1.assertEquals)((0, mod_js_2.z2hAt)("アイウエオ", 0), "ｱイウエオ");
    (0, mod_js_1.assertEquals)((0, mod_js_2.z2hAt)("アイウエオ", 2), "アイｳエオ");
});
dntShim.Deno.test("z2hAt: convert multiple chars at specified indices", () => {
    (0, mod_js_1.assertEquals)((0, mod_js_2.z2hAt)("ａｂｃ １２３ ＡＢＣ", 0, 4, 8), "aｂｃ 1２３ AＢＣ");
    (0, mod_js_1.assertEquals)((0, mod_js_2.z2hAt)("ａｂｃ １２３ ＡＢＣ", 2, 6, 10), "ａｂc １２3 ＡＢC");
});
dntShim.Deno.test("z2hAt: convert chars with Dakuten/Handakuten at specified indices", () => {
    (0, mod_js_1.assertEquals)((0, mod_js_2.z2hAt)("ガギグゲゴ", 0), "ｶﾞギグゲゴ"); // 'ガ' -> 'ｶﾞ'
    (0, mod_js_1.assertEquals)((0, mod_js_2.z2hAt)("ガギグゲゴ", 2), "ガギｸﾞゲゴ"); // 'ギ' -> 'ｷﾞ'
    (0, mod_js_1.assertEquals)((0, mod_js_2.z2hAt)("パピプペポ", 0), "ﾊﾟピプペポ"); // 'パ' -> 'ﾊﾟ'
    (0, mod_js_1.assertEquals)((0, mod_js_2.z2hAt)("ヴ", 0), "ｳﾞ"); // 'ヴ' -> 'ｳﾞ'
});
dntShim.Deno.test("z2hAt: mixed string with full-width and half-width chars", () => {
    (0, mod_js_1.assertEquals)((0, mod_js_2.z2hAt)("ａｂｃ １２３ ＡＢＣ カキクケコ", 0, 4, 10), "aｂｃ 1２３ ＡＢC カキクケコ");
    (0, mod_js_1.assertEquals)((0, mod_js_2.z2hAt)("ａｂｃ １２３ ＡＢＣ カキクケコ", 2, 6, 14), "ａｂc １２3 ＡＢＣ カキｸケコ");
});
dntShim.Deno.test("z2hAt: indices pointing to non-convertible characters", () => {
    (0, mod_js_1.assertEquals)((0, mod_js_2.z2hAt)("あいうえお", 0, 2, 4), "あいうえお"); // Hiragana (no conversion)
    (0, mod_js_1.assertEquals)((0, mod_js_2.z2hAt)("漢字", 0, 1), "漢字"); // Kanji (no conversion)
    (0, mod_js_1.assertEquals)((0, mod_js_2.z2hAt)("abc123", 0, 1, 2), "abc123"); // Half-width ASCII and digits (no conversion)
});
dntShim.Deno.test("z2hAt: invalid indices (negative or out of bounds)", () => {
    // Go version returns original string for invalid indices
    (0, mod_js_1.assertEquals)((0, mod_js_2.z2hAt)("ａｂｃ", -1), "ａｂｃ");
    (0, mod_js_1.assertEquals)((0, mod_js_2.z2hAt)("ａｂｃ", 3), "ａｂｃ");
    (0, mod_js_1.assertEquals)((0, mod_js_2.z2hAt)("ａｂｃ", 0, -1), "ａｂｃ");
    (0, mod_js_1.assertEquals)((0, mod_js_2.z2hAt)("ａｂｃ", 0, 3), "ａｂｃ");
    (0, mod_js_1.assertEquals)((0, mod_js_2.z2hAt)("ａｂｃ", -1, 3), "ａｂｃ");
    (0, mod_js_1.assertEquals)((0, mod_js_2.z2hAt)("ａｂｃ", 0, 1, 2, 100), "ａｂｃ");
});
dntShim.Deno.test("z2hAt: specific case from Go test", () => {
    (0, mod_js_1.assertEquals)((0, mod_js_2.z2hAt)("ガ", 0), "ｶﾞ");
    (0, mod_js_1.assertEquals)((0, mod_js_2.z2hAt)("パ", 0), "ﾊﾟ");
    (0, mod_js_1.assertEquals)((0, mod_js_2.z2hAt)("ヴ", 0), "ｳﾞ");
});
dntShim.Deno.test("z2hAt: duplicate indices", () => {
    (0, mod_js_1.assertEquals)((0, mod_js_2.z2hAt)("ａｂｃ", 0, 0, 1, 1, 2, 2), "abc");
});
dntShim.Deno.test("z2hAt: index at last character", () => {
    (0, mod_js_1.assertEquals)((0, mod_js_2.z2hAt)("ａｂｃ", 2), "ａｂc");
});
