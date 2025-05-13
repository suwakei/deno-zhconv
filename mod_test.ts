import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";
import { h2z, z2h } from "./mod.ts";

Deno.test("h2z: empty string", () => {
    assertEquals(h2z(""), "");
});

Deno.test("h2z: null input", () => {
    assertEquals(h2z(null), "");
});

Deno.test("h2z: half-width ASCII to full-width", () => {
    assertEquals(h2z("abc ABC 123 !@#"), "ａｂｃ　ＡＢＣ　１２３　！＠＃");
    assertEquals(h2z("Hello World, 2024!"), "Ｈｅｌｌｏ　Ｗｏｒｌｄ，　２０２４！");
});

Deno.test("h2z: half-width Katakana (Seion) to full-width", () => {
    assertEquals(h2z("ｱｲｳｴｵｶｷｸｹｺ"), "アイウエオカキクケコ");
    assertEquals(h2z("ｻｼｽｾｿﾀﾁﾂﾃﾄ"), "サシスセソタチツテト");
});

Deno.test("h2z: half-width Katakana with Dakuten to full-width", () => {
    assertEquals(h2z("ｶﾞｷﾞｸﾞｹﾞｺﾞ"), "ガギグゲゴ");
    assertEquals(h2z("ｻﾞｼﾞｽﾞｾﾞｿﾞ"), "ザジズゼゾ");
  assertEquals(h2z("ﾀﾞﾁﾞﾂﾞﾃﾞﾄﾞ"), "ダヂヅデド"); // ﾁﾞ, ﾂﾞ
});

Deno.test("h2z: half-width Katakana 'ｳ' with Dakuten to 'ヴ'", () => {
    assertEquals(h2z("ｳﾞ"), "ヴ");
});

Deno.test("h2z: half-width Katakana with Handakuten to full-width", () => {
    assertEquals(h2z("ﾊﾟﾋﾟﾌﾟﾍﾟﾎﾟ"), "パピプペポ");
});

Deno.test("h2z: mixed half-width content", () => {
    assertEquals(h2z("ﾃｽﾄ 123 abc ｶﾞﾝﾊﾞﾚ! ｳﾞ"), "テスト　１２３　ａｂｃ　ガンバレ！　ヴ");
});

Deno.test("h2z: already full-width characters (should remain unchanged)", () => {
    assertEquals(h2z("あいうえおＡＢＣ１２３ガギグゲゴパピプペポ"), "あいうえおＡＢＣ１２３ガギグゲゴパピプペポ");
});

Deno.test("h2z: standalone half-width Dakuten/Handakuten marks", () => {
  // 'ﾞ' and 'ﾟ' are in KANA_H2Z_CHARS_MAP, so they convert to '゛' and '゜'
    assertEquals(h2z("ﾞ"), "゛");
    assertEquals(h2z("ﾟ"), "゜");
    assertEquals(h2z("abcﾞdefﾟ"), "ａｂｃ゛ｄｅｆ゜");
});

Deno.test("h2z: half-width Katakana symbols", () => {
    assertEquals(h2z("｡､･ｰ｢｣"), "。、・ー「」");
});

Deno.test("h2z: string ending with a base char for dakuten/handakuten", () => {
    assertEquals(h2z("ｶ"), "カ");
    assertEquals(h2z("abcｶ"), "ａｂｃカ");
});

Deno.test("h2z: string with dakuten/handakuten not applicable to preceding char", () => {
    assertEquals(h2z("aﾞ"), "ａ゛"); // 'a' is not in KANA_H2Z_DAKUTEN_MAP, 'ﾞ' becomes '゛'
    assertEquals(h2z("ｱﾟ"), "ア゜"); // 'ｱ' is not in KANA_H2Z_MARU_MAP, 'ﾟ' becomes '゜'
});

Deno.test("h2z: complex mixed string", () => {
    const input = "abc 123 ﾃｽﾄ ｶﾞｷﾞｸﾞｹﾞｺﾞ ﾊﾟﾋﾟﾌﾟﾍﾟﾎﾟ ｳﾞ ｱｲｳｴｵ ｡､･ｰ｢｣ ﾞ ﾟ XYZ";
    const expected = "ａｂｃ　１２３　テスト　ガギグゲゴ　パピプペポ　ヴ　アイウエオ　。、・ー「」　゛　゜　ＸＹＺ";
    assertEquals(h2z(input), expected);
});

Deno.test("h2z: half-width small kana", () => {
    assertEquals(h2z("ｧｨｩｪｫｯｬｭｮ"), "ァィゥェォッャュョ");
});

Deno.test("h2z: specific case from Go test (H2Z_DAKUTEN_MAP has 'ﾞ' and 'ﾟ')", () => {
    // In table.ts, KANA_H2Z_DAKUTEN_MAP has 'ﾞ': 'ﾞ' and 'ﾟ': 'ﾟ'.
    // Then KANA_H2Z_CHARS_MAP has 'ﾞ': '゛' and 'ﾟ': '゜'.
    // So, a standalone 'ﾞ' or 'ﾟ' should become '゛' or '゜'.
    assertEquals(h2z("ｶﾞ"), "ガ");
    assertEquals(h2z("ﾊﾟ"), "パ");
    assertEquals(h2z("ｳﾞ"), "ヴ");
    assertEquals(h2z("ﾞ"), "゛"); // Standalone dakuten
    assertEquals(h2z("ﾟ"), "゜"); // Standalone handakuten
});

// -------------z2h_test-------------- 

Deno.test("z2h: empty string", () => {
    assertEquals(z2h(""), "");
});

Deno.test("z2h: null input", () => {
    assertEquals(z2h(null), "");
});

Deno.test("z2h: full-width ASCII to half-width", () => {
    assertEquals(z2h("ａｂｃ ＡＢＣ １２３ ！＠＃"), "abc ABC 123 !@#");
    assertEquals(z2h("Ｈｅｌｌｏ Ｗｏｒｌｄ， ２０２４！"), "Hello World, 2024!");
});

Deno.test("z2h: full-width Katakana (Seion) to half-width", () => {
    assertEquals(z2h("アイウエオカキクケコ"), "ｱｲｳｴｵｶｷｸｹｺ");
    assertEquals(z2h("サシスセソタチツテト"), "ｻｼｽｾｿﾀﾁﾂﾃﾄ");
});

Deno.test("z2h: full-width Katakana with Dakuten to decomposed half-width", () => {
    assertEquals(z2h("ガギグゲゴ"), "ｶﾞｷﾞｸﾞｹﾞｺﾞ");
    assertEquals(z2h("ザジズゼゾ"), "ｻﾞｼﾞｽﾞｾﾞｿﾞ");
    assertEquals(z2h("ダヂヅデド"), "ﾀﾞﾁﾞﾂﾞﾃﾞﾄﾞ");
});

Deno.test("z2h: full-width Katakana 'ヴ' to decomposed 'ｳﾞ'", () => {
    assertEquals(z2h("ヴ"), "ｳﾞ");
});

Deno.test("z2h: full-width Katakana with Handakuten to decomposed half-width", () => {
    assertEquals(z2h("パピプペポ"), "ﾊﾟﾋﾟﾌﾟﾍﾟﾎﾟ");
});

Deno.test("z2h: mixed full-width content", () => {
    assertEquals(z2h("テスト １２３ ａｂｃ ガンバレ！ ヴ"), "ﾃｽﾄ 123 abc ｶﾞﾝﾊﾞﾚ! ｳﾞ");
});

Deno.test("z2h: already half-width characters (should remain unchanged)", () => {
    assertEquals(z2h("あいうえおabc123ｶﾞｷﾞﾊﾟﾋﾟ"), "あいうえおabc123ｶﾞｷﾞﾊﾟﾋﾟ");
});

Deno.test("z2h: standalone full-width Dakuten/Handakuten marks", () => {
  // '゛' and '゜' are in KANA_Z2H_CHARS_MAP, so they convert to 'ﾞ' and 'ﾟ'
    assertEquals(z2h("゛"), "ﾞ");
    assertEquals(z2h("゜"), "ﾟ");
    assertEquals(z2h("ａｂｃ゛ｄｅｆ゜"), "abcﾞdefﾟ");
});

Deno.test("z2h: full-width Katakana symbols", () => {
    assertEquals(z2h("。、・ー「」"), "｡､･ｰ｢｣");
});

Deno.test("z2h: complex mixed string", () => {
    const input = "ａｂｃ １２３ テスト ガギグゲゴ パピプペポ ヴ アイウエオ 。、・ー「」 ゛ ゜ ＸＹＺ";
    const expected = "abc 123 ﾃｽﾄ ｶﾞｷﾞｸﾞｹﾞｺﾞ ﾊﾟﾋﾟﾌﾟﾍﾟﾎﾟ ｳﾞ ｱｲｳｴｵ ｡､･ｰ｢｣ ﾞ ﾟ XYZ";
    assertEquals(z2h(input), expected);
});

Deno.test("z2h: full-width small kana", () => {
    assertEquals(z2h("ァィゥェォッャュョ"), "ｧｨｩｪｫｯｬｭｮ");
});

Deno.test("z2h: specific case from Go test", () => {
    assertEquals(z2h("ガ"), "ｶﾞ");
    assertEquals(z2h("パ"), "ﾊﾟ");
    assertEquals(z2h("ヴ"), "ｳﾞ");
    assertEquals(z2h("゛"), "ﾞ"); // Standalone dakuten
    assertEquals(z2h("゜"), "ﾟ"); // Standalone handakuten
});