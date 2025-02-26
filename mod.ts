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

// 変換マップを作成
const zenkakuToHankakuMap = new Map<string, string>();
const hankakuToZenkakuMap = new Map<string, string>();


/*
半角に全角が混ざっていた場合反転しない
逆も同じ
 */

// マップの初期化
ASCII_ZENKAKU_CHARS.forEach((char, index) => zenkakuToHankakuMap.set(char, ASCII_HANKAKU_CHARS[index]));
KANA_ZENKAKU_CHARS.forEach((char, index) => zenkakuToHankakuMap.set(char, KANA_HANKAKU_CHARS[index]));
DIGIT_ZENKAKU_CHARS.forEach((char, index) => zenkakuToHankakuMap.set(char, DIGIT_HANKAKU_CHARS[index]));

ASCII_HANKAKU_CHARS.forEach((char, index) => hankakuToZenkakuMap.set(char, ASCII_ZENKAKU_CHARS[index]));
KANA_HANKAKU_CHARS.forEach((char, index) => hankakuToZenkakuMap.set(char, KANA_ZENKAKU_CHARS[index]));
DIGIT_HANKAKU_CHARS.forEach((char, index) => hankakuToZenkakuMap.set(char, DIGIT_ZENKAKU_CHARS[index]));

export function z2h(str: string | null): string {
  if (str === null) return ""; // エラーチェック
  if (str === "") return ""
  let result = "";
  let isHankaku = false;

  // 半角文字が含まれているかチェック
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    if (hankakuToZenkakuMap.has(char)) {
      isHankaku = true;
      break;
    }
  }

  for (const char of str) {
    if (isHankaku) {
      result += zenkakuToHankakuMap.get(char) || char; // 半角に変換
    } else {
      result += char; // そのまま
    }
  }
  return result;
}


export function h2z(str: string): string {
  if (str === null) return "";
  if (str === "") return ""
  let result = "";
  let isZenkaku = false;
  
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    // 全角文字が含まれているかチェック
    if (zenkakuToHankakuMap.has(char)) {
      isZenkaku = true;
      break;
    }
  }

  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    if (char === "ﾞ" && i > 0 && KANA_TEN_MAP.has(str[i - 1])) {
      result = result.slice(0, -1) + KANA_TEN_MAP.get(str[i - 1]);
      continue;
    }
    if (char === "ﾟ" && i > 0 && KANA_MARU_MAP.has(str[i - 1])) {
      result = result.slice(0, -1) + KANA_MARU_MAP.get(str[i - 1]);
      continue;
    }
    if (isZenkaku) {
      result += hankakuToZenkakuMap.get(char) || char; // 全角に変換
    } else {
      result += char; // そのまま
    }
  }
  return result;
}