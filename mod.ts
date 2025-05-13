import { createConversionTables } from "./table.ts";

const convTable = createConversionTables();

export function z2h(str: string): string {
  if (str === null) return ""
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