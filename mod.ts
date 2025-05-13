import { createConversionTables } from "./table.ts";

const convTables = createConversionTables();


export function h2z(str: string | null): string {
  if (str === null || str === "") {
      return "";
  }
  // 文字列をUnicodeコードポイントの配列に変換 (サロゲートペア対応)
  const runes = Array.from(str);
  const runeLen = runes.length;
  const resultParts: string[] = [];

  let i = 0;
  while (i < runeLen) {
      const char = runes[i];
      let consumedCombined = false; // 現在の文字が次の文字と結合されたかを示すフラグ

      // 次の文字が存在するか確認し、濁点・半濁点との結合を試みる
      if (i + 1 < runeLen) {
          const nextChar = runes[i + 1];

          if (nextChar === 'ﾞ') {
              const zenkakuDakuten = convTables.KANA_H2Z_DAKUTEN_MAP[char];
              if (zenkakuDakuten !== undefined) {
                  resultParts.push(zenkakuDakuten);
                  i += 2; // 現在の文字と濁点の両方を消費
                  consumedCombined = true;
              }
          } else if (nextChar === 'ﾟ') { // 半角半濁点 (U+FF9F)
              const zenkakuHandakuten = convTables.KANA_H2Z_MARU_MAP[char];
              if (zenkakuHandakuten !== undefined) {
                  resultParts.push(zenkakuHandakuten);
                  i += 2; // 現在の文字と半濁点の両方を消費
                  consumedCombined = true;
              }
          }
      }

      // 結合されなかった場合、通常の文字変換を試みる
      if (!consumedCombined) {
          const c1 = convTables.ASCII_H2Z_CHARS_MAP[char];
          const c2 = convTables.KANA_H2Z_CHARS_MAP[char];
          const c3 = convTables.DIGIT_H2Z_CHARS_MAP[char];

          if (c1 !== undefined) resultParts.push(c1);
          else if (c2 !== undefined) resultParts.push(c2);
          else if (c3 !== undefined) resultParts.push(c3);
          else resultParts.push(char); // 変換対象外の文字はそのまま

          i++;
      }
  }
  return resultParts.join("");
}

export function z2h(str: string | null): string {
    if (str === null || str === "") {
        return "";
    }

    const runes = Array.from(str);
    const runeLen = runes.length;
    const resultParts: string[] = [];

    let i = 0;
    while (i < runeLen) {
        const char = runes[i];
        let consumed = false;

        // 全角カタカナの濁点・半濁点文字を分解する試み
        const decomposedDakuten = convTables.KANA_Z2H_DAKUTEN_MAP[char];
        if (decomposedDakuten !== undefined) {
            resultParts.push(decomposedDakuten);
            consumed = true;
        } else {
            const decomposedHandakuten = convTables.KANA_Z2H_MARU_MAP[char];
            if (decomposedHandakuten !== undefined) {
                resultParts.push(decomposedHandakuten); 
                consumed = true;
            }
        }

        if (!consumed) {
            // 通常の全角→半角変換
            const c1 = convTables.ASCII_Z2H_CHARS_MAP[char];
            const c2 = convTables.KANA_Z2H_CHARS_MAP[char];
            const c3 = convTables.DIGIT_Z2H_CHARS_MAP[char];

            if (c1 !== undefined) resultParts.push(c1);
            else if (c2 !== undefined) resultParts.push(c2);
            else if (c3 !== undefined) resultParts.push(c3);
            else resultParts.push(char); // 変換対象外の文字はそのまま
        }
        i++;
    }
    return resultParts.join("");
}