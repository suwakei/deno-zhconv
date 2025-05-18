import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";
import { h2z, z2h, h2zAt, z2hAt, reverse } from "./mod.ts";

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


Deno.test("h2z: empty string", () => {
// Unchanged lines
    assertEquals(z2h("゛"), "ﾞ"); // Standalone dakuten
    assertEquals(z2h("゜"), "ﾟ"); // Standalone handakuten
});

// -------------h2zAt_test--------------

Deno.test("h2zAt: empty string", () => {
    assertEquals(h2zAt(""), "");
});

Deno.test("h2zAt: no indices provided", () => {
    assertEquals(h2zAt("abc 123 ｱｲｳ"), "abc 123 ｱｲｳ");
});

Deno.test("h2zAt: convert single ASCII char", () => {
    assertEquals(h2zAt("abc", 0), "ａbc");
    assertEquals(h2zAt("abc", 1), "aｂc");
    assertEquals(h2zAt("abc", 2), "abｃ");
    assertEquals(h2zAt("Hello World", 6), "Hello Ｗorld"); // Space
});

Deno.test("h2zAt: convert single Digit char", () => {
    assertEquals(h2zAt("12345", 0), "１2345");
    assertEquals(h2zAt("12345", 4), "1234５");
});

Deno.test("h2zAt: convert single Katakana char", () => {
    assertEquals(h2zAt("ｱｲｳｴｵ", 0), "アｲｳｴｵ");
    assertEquals(h2zAt("ｱｲｳｴｵ", 2), "ｱｲウｴｵ");
});

Deno.test("h2zAt: convert multiple chars at specified indices", () => {
    assertEquals(h2zAt("abc 123 ｱｲｳ", 0, 4, 8), "ａbc １23 アｲｳ");
    assertEquals(h2zAt("abc 123 ｱｲｳ", 2, 6, 7), "abｃ 12３　ｱｲｳ");
});

Deno.test("h2zAt: convert chars with combined Dakuten/Handakuten at base index", () => {
    // Index points to the base character ('ｶ', 'ﾊ')
    assertEquals(h2zAt("ｶﾞｷﾞﾊﾟﾋﾟ", 0), "ガｷﾞﾊﾟﾋﾟ"); // Converts 'ｶ' + 'ﾞ' at index 0
    assertEquals(h2zAt("ｶﾞｷﾞﾊﾟﾋﾟ", 2), "ｶﾞギﾊﾟﾋﾟ"); // Converts 'ｷ' + 'ﾞ' at index 2
    assertEquals(h2zAt("ｶﾞｷﾞﾊﾟﾋﾟ", 4), "ｶﾞｷﾞパﾋﾟ"); // Converts 'ﾊ' + 'ﾟ' at index 4
    assertEquals(h2zAt("ｳﾞ", 0), "ヴ"); // Converts 'ｳ' + 'ﾞ' at index 0
});

Deno.test("h2zAt: convert chars with combined Dakuten/Handakuten at combining mark index", () => {
    // Index points to the combining mark ('ﾞ', 'ﾟ')
    // The combining mark itself is converted if it's in KANA_H2Z_CHARS_MAP
    assertEquals(h2zAt("ｶﾞｷﾞﾊﾟﾋﾟ", 1), "ｶ゛ｷﾞﾊﾟﾋﾟ"); // Converts 'ﾞ' at index 1 to '゛'
    assertEquals(h2zAt("ｶﾞｷﾞﾊﾟﾋﾟ", 3), "ｶﾞｷ゛ﾊﾟﾋﾟ"); // Converts 'ﾞ' at index 3 to '゛'
    assertEquals(h2zAt("ｶﾞｷﾞﾊﾟﾋﾟ", 5), "ｶﾞｷﾞﾊ゜ﾋﾟ"); // Converts 'ﾟ' at index 5 to '゜'
    assertEquals(h2zAt("ｳﾞ", 1), "ｳ゛"); // Converts 'ﾞ' at index 1 to '゛'
});

Deno.test("h2zAt: convert chars with combined Dakuten/Handakuten at both indices", () => {
    // Indices point to both the base and the combining mark
    assertEquals(h2zAt("ｶﾞｷﾞ", 0, 1), "ガｷﾞ"); // Converts 'ｶ'+'ﾞ' at 0, then 'ﾞ' at 1
    assertEquals(h2zAt("ｶﾞｷﾞ", 0, 2), "ガギ"); // Converts 'ｶ'+'ﾞ' at 0, then 'ｷ' at 2
    assertEquals(h2zAt("ｶﾞｷﾞ", 0, 1, 2, 3), "ガギ"); // Converts 'ｶ'+'ﾞ' at 0, 'ﾞ' at 1, 'ｷ'+'ﾞ' at 2, 'ﾞ' at 3
});

Deno.test("h2zAt: indices pointing to non-convertible characters", () => {
    assertEquals(h2zAt("あいうえお", 0, 2, 4), "あいうえお"); // Already full-width Hiragana
    assertEquals(h2zAt("漢字", 0, 1), "漢字"); // Kanji
    assertEquals(h2zAt("abc", 0, 1, 2, 10), "abc"); // Index 10 is out of bounds, should return original string
});

Deno.test("h2zAt: invalid indices (negative or out of bounds)", () => {
    // Go version returns original string for invalid indices.
    assertEquals(h2zAt("abc", -1), "abc");
    assertEquals(h2zAt("abc", 3), "abc");
    assertEquals(h2zAt("abc", 0, -1), "abc");
    assertEquals(h2zAt("abc", 0, 3), "abc");
    assertEquals(h2zAt("abc", -1, 3), "abc");
    assertEquals(h2zAt("abc", 0, 1, 2, 100), "abc");
});

Deno.test("h2zAt: duplicate indices", () => {
    assertEquals(h2zAt("abc", 0, 0, 1, 1, 2, 2), "ａｂｃ");
});


// -------------z2hAt_test--------------

Deno.test("z2hAt: empty string", () => {
    assertEquals(z2hAt(""), "");
});


Deno.test("z2hAt: convert single ASCII char", () => {
    assertEquals(z2hAt("ａｂｃ", 0), "aｂｃ");
    assertEquals(z2hAt("ａｂｃ", 1), "ａbｃ");
    assertEquals(z2hAt("ａｂｃ", 2), "ａｂc");
    assertEquals(z2hAt("Ｈｅｌｌｏ　Ｗｏｒｌｄ", 0), "Hｅｌｌｏ　Ｗｏｒｌｄ");
    assertEquals(z2hAt("Ｈｅｌｌｏ　Ｗｏｒｌｄ", 6), "Ｈｅｌｌｏ　Wｏｒｌｄ"); // Space
});

Deno.test("z2hAt: convert single Digit char", () => {
    assertEquals(z2hAt("１２３４５", 0), "1２３４５");
    assertEquals(z2hAt("１２３４５", 4), "１２３４5");
});

Deno.test("z2hAt: convert single Katakana char", () => {
    assertEquals(z2hAt("アイウエオ", 0), "ｱイウエオ");
    assertEquals(z2hAt("アイウエオ", 2), "アイｳエオ");
});

Deno.test("z2hAt: convert multiple chars at specified indices", () => {
    assertEquals(z2hAt("ａｂｃ １２３ ＡＢＣ", 0, 4, 8), "aｂｃ 1２３ AＢＣ");
    assertEquals(z2hAt("ａｂｃ １２３ ＡＢＣ", 2, 6, 10), "ａｂc １２3 ＡＢC");
});

Deno.test("z2hAt: convert chars with Dakuten/Handakuten at specified indices", () => {
    assertEquals(z2hAt("ガギグゲゴ", 0), "ｶﾞギグゲゴ"); // 'ガ' -> 'ｶﾞ'
    assertEquals(z2hAt("ガギグゲゴ", 2), "ガギｸﾞゲゴ"); // 'ギ' -> 'ｷﾞ'
    assertEquals(z2hAt("パピプペポ", 0), "ﾊﾟピプペポ"); // 'パ' -> 'ﾊﾟ'
    assertEquals(z2hAt("ヴ", 0), "ｳﾞ"); // 'ヴ' -> 'ｳﾞ'
});

Deno.test("z2hAt: mixed string with full-width and half-width chars", () => {
    assertEquals(z2hAt("ａｂｃ １２３ ＡＢＣ カキクケコ", 0, 4, 10), "aｂｃ 1２３ ＡＢC カキクケコ");
    assertEquals(z2hAt("ａｂｃ １２３ ＡＢＣ カキクケコ", 2, 6, 14), "ａｂc １２3 ＡＢＣ カキｸケコ");
});

Deno.test("z2hAt: indices pointing to non-convertible characters", () => {
    assertEquals(z2hAt("あいうえお", 0, 2, 4), "あいうえお"); // Hiragana (no conversion)
    assertEquals(z2hAt("漢字", 0, 1), "漢字"); // Kanji (no conversion)
    assertEquals(z2hAt("abc123", 0, 1, 2), "abc123"); // Half-width ASCII and digits (no conversion)
});

Deno.test("z2hAt: invalid indices (negative or out of bounds)", () => {
    // Go version returns original string for invalid indices
    assertEquals(z2hAt("ａｂｃ", -1), "ａｂｃ");
    assertEquals(z2hAt("ａｂｃ", 3), "ａｂｃ");
    assertEquals(z2hAt("ａｂｃ", 0, -1), "ａｂｃ");
    assertEquals(z2hAt("ａｂｃ", 0, 3), "ａｂｃ");
    assertEquals(z2hAt("ａｂｃ", -1, 3), "ａｂｃ");
    assertEquals(z2hAt("ａｂｃ", 0, 1, 2, 100), "ａｂｃ");
});

Deno.test("z2hAt: specific case from Go test", () => {
    assertEquals(z2hAt("ガ", 0), "ｶﾞ");
    assertEquals(z2hAt("パ", 0), "ﾊﾟ");
    assertEquals(z2hAt("ヴ", 0), "ｳﾞ");
});

Deno.test("z2hAt: duplicate indices", () => {
    assertEquals(z2hAt("ａｂｃ", 0, 0, 1, 1, 2, 2), "abc");
});

Deno.test("z2hAt: index at last character", () => {
    assertEquals(z2hAt("ａｂｃ", 2), "ａｂc");
});

// -------------reverse_test--------------

Deno.test("reverse: empty string", () => {
    assertEquals(reverse(""), "");
});

Deno.test("reverse: full-width ASCII to half-width", () => {
    assertEquals(reverse("ＡＢＣ　ＸＹＺ！"), "ABC XYZ!");
});

Deno.test("reverse: half-width ASCII to full-width", () => {
    assertEquals(reverse("abc xyz!"), "ａｂｃ　ｘｙｚ！");
});

Deno.test("reverse: full-width Digits to half-width", () => {
    assertEquals(reverse("０１２３４５"), "012345");
});

Deno.test("reverse: half-width Digits to full-width", () => {
    assertEquals(reverse("67890"), "６７８９０");
});

Deno.test("reverse: full-width Katakana (Seion) to half-width", () => {
    assertEquals(reverse("アイウエオ"), "ｱｲｳｴｵ");
});

Deno.test("reverse: half-width Katakana (Seion) to full-width", () => {
    assertEquals(reverse("ｶｷｸｹｺ"), "カキクケコ");
});

Deno.test("reverse: full-width Katakana (Dakuten) to half-width (decomposed)", () => {
    assertEquals(reverse("ガギグゲゴ"), "ｶﾞｷﾞｸﾞｹﾞｺﾞ");
});

Deno.test("reverse: half-width Katakana (Dakuten) to full-width (composed)", () => {
    assertEquals(reverse("ｶﾞｷﾞｸﾞｹﾞｺﾞ"), "ガギグゲゴ");
});

Deno.test("reverse: full-width Katakana (Handakuten) to half-width (decomposed)", () => {
    assertEquals(reverse("パピプペポ"), "ﾊﾟﾋﾟﾌﾟﾍﾟﾎﾟ");
});

Deno.test("reverse: half-width Katakana (Handakuten) to full-width (composed)", () => {
    assertEquals(reverse("ﾊﾟﾋﾟﾌﾟﾍﾟﾎﾟ"), "パピプペポ");
});

Deno.test("reverse: mixed full-width to half-width", () => {
    assertEquals(reverse("Ｈｅｌｌｏ　Ｗｏｒｌｄ！　１２３　アイウガパ"), "Hello World! 123 ｱｲｳｶﾞﾊﾟ");
});

Deno.test("reverse: mixed half-width to full-width", () => {
    assertEquals(reverse("Hello World! 123 ｱｲｳｶﾞﾊﾟ"), "Ｈｅｌｌｏ　Ｗｏｒｌｄ！　１２３　アイウガパ");
});

Deno.test("reverse: mixed full-half already, should reverse all", () => {
    assertEquals(reverse("ＡbcＤＥＦｇｈ　1２３ＸＹｚ　アｲウｴオ　カｷﾞクｹﾞコ　パﾋﾟプﾍﾟポ"), "AｂｃDEFgh １23XYz ｱイｳエｵ ｶギｸゲｺ ﾊﾟピﾌﾟペﾎﾟ");
});

Deno.test("reverse: non-convertible characters (Hiragana, Kanji) mixed with convertible", () => {
    assertEquals(reverse("あいう漢字ＡＢＣ123ｱｲｳｶﾞ"), "あいう漢字ABC１２３アイウガ");
});

Deno.test("reverse: string with only non-convertible characters", () => {
    assertEquals(reverse("春夏秋冬"), "春夏秋冬");
});

Deno.test("reverse: full-width symbols to half-width", () => {
    assertEquals(reverse("。、・ー「」"), "｡､･ｰ｢｣");
});

Deno.test("reverse: half-width symbols to full-width", () => {
    assertEquals(reverse("｡､･ｰ｢｣"), "。、・ー「」");
});

Deno.test("reverse: complex mix", () => {
    assertEquals(reverse("１ｓｔ「ＰＲＩＣＥ」ｉｓ　￥１，０００－　（ＴＡＸ　ＩＮ）　ｶﾞﾝﾊﾞﾚ！"), "1st｢PRICE｣is ¥1,000- (TAX IN) ガンバレ!");
});

Deno.test("reverse: half-width dakuten/handakuten at end of string", () => {
    assertEquals(reverse("テストｶﾞ"), "ﾃｽﾄガ");
    assertEquals(reverse("テストﾊﾟ"), "ﾃｽﾄパ");
});

Deno.test("reverse: full-width dakuten/handakuten at end of string", () => {
    assertEquals(reverse("テストガ"), "ﾃｽﾄｶﾞ");
    assertEquals(reverse("テストパ"), "ﾃｽﾄﾊﾟ");
});

Deno.test("reverse: standalone half-width dakuten/handakuten (should convert to full-width)", () => {
    assertEquals(reverse("ﾞ"), "゛"); // From KANA_H2Z_CHARS_MAP
    assertEquals(reverse("ﾟ"), "゜"); // From KANA_H2Z_CHARS_MAP
});

Deno.test("reverse: standalone full-width dakuten/handakuten (should convert to half-width)", () => {
    assertEquals(reverse("゛"), "ﾞ"); // From KANA_Z2H_CHARS_MAP
    assertEquals(reverse("゜"), "ﾟ"); // From KANA_Z2H_CHARS_MAP
});