import {
  ASCII_ZENKAKU_CHARS,
  ASCII_HANKAKU_CHARS,
  KANA_ZENKAKU_CHARS,
  KANA_HANKAKU_CHARS,
  DIGIT_ZENKAKU_CHARS,
  DIGIT_HANKAKU_CHARS,
  KANA_TEN_MAP,
  KANA_MARU_MAP
} from "./table.ts";
/*

半角文字に全角が含まれてた時反転しない
逆も同じ


*/
function z2h(str: string): string {
  let result = "";
  for (let char of str) {
    let index = ASCII_ZENKAKU_CHARS.indexOf(char);
    if (index !== -1) {
      result += ASCII_HANKAKU_CHARS[index];
      continue;
    }
    index = KANA_ZENKAKU_CHARS.indexOf(char);
    if (index !== -1) {
      result += KANA_HANKAKU_CHARS[index];
      continue;
    }
    index = DIGIT_ZENKAKU_CHARS.indexOf(char);
    if (index !== -1) {
      result += DIGIT_HANKAKU_CHARS[index];
      continue;
    }
    if (KANA_TEN_MAP.has(char)) {
      result += KANA_TEN_MAP.get(char) + "ﾞ";
      continue;
    }
    if (KANA_MARU_MAP.has(char)) {
      result += KANA_MARU_MAP.get(char) + "ﾟ";
      continue;
    }
    result += char;
  }
  return result;
}

function h2z(str: string): string {
  let result = "";
  for (let i = 0; i < str.length; i++) {
    let char = str[i];
    let index = ASCII_HANKAKU_CHARS.indexOf(char);
    if (index !== -1) {
      result += ASCII_ZENKAKU_CHARS[index];
      continue;
    }
    index = KANA_HANKAKU_CHARS.indexOf(char);
    if (index !== -1) {
      result += KANA_ZENKAKU_CHARS[index];
      continue;
    }
    index = DIGIT_HANKAKU_CHARS.indexOf(char);
    if (index !== -1) {
      result += DIGIT_ZENKAKU_CHARS[index];
      continue;
    }
    if (char === "ﾞ" && i > 0 && KANA_TEN_MAP.has(str[i - 1])) {
      result = result.slice(0, -1) + KANA_TEN_MAP.get(str[i - 1]);
      continue;
    }
    if (char === "ﾟ" && i > 0 && KANA_MARU_MAP.has(str[i - 1])) {
      result = result.slice(0, -1) + KANA_MARU_MAP.get(str[i - 1]);
      continue;
    }
    result += char;
  }
  return result;
}


console.log(z2h("Ｈｅｌｌｏ， ｗｏｒｌｄ！")); // "Hello, world!"
console.log(h2z("Hello, ｗｏｒｌｄ！")); // "Ｈｅｌｌｏ， ｗｏｒｌｄ！"