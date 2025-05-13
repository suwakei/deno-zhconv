import { createConversionTables } from "./table.ts";

const convTables = createConversionTables();

//h2z returns a string with half-width characters converted to full-width characters.
export function h2z(str: string | null): string {
  if (str === null || str === "") {
      return "";
  }

  const runes = Array.from(str);
  const runeLen = runes.length;
  const resultParts: string[] = [];

  let i = 0;
  while (i < runeLen) {
      const char = runes[i];
      let consumedCombined = false;


      if (i + 1 < runeLen) {
          const nextChar = runes[i + 1];

          if (nextChar === 'ﾞ') {
              const zenkakuDakuten = convTables.KANA_H2Z_DAKUTEN_MAP[char];
              if (zenkakuDakuten !== undefined) {
                  resultParts.push(zenkakuDakuten);
                  i += 2;
                  consumedCombined = true;
              }
          } else if (nextChar === 'ﾟ') {
              const zenkakuHandakuten = convTables.KANA_H2Z_MARU_MAP[char];
              if (zenkakuHandakuten !== undefined) {
                  resultParts.push(zenkakuHandakuten);
                  i += 2;
                  consumedCombined = true;
              }
          }
      }

      if (!consumedCombined) {
          const c1 = convTables.ASCII_H2Z_CHARS_MAP[char];
          const c2 = convTables.KANA_H2Z_CHARS_MAP[char];
          const c3 = convTables.DIGIT_H2Z_CHARS_MAP[char];

          if (c1 !== undefined) resultParts.push(c1);
          else if (c2 !== undefined) resultParts.push(c2);
          else if (c3 !== undefined) resultParts.push(c3);
          else resultParts.push(char);

          i++;
      }
  }
  return resultParts.join("");
}

// z2h returns a string with full-width characters converted to half-width characters.
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
            const c1 = convTables.ASCII_Z2H_CHARS_MAP[char];
            const c2 = convTables.KANA_Z2H_CHARS_MAP[char];
            const c3 = convTables.DIGIT_Z2H_CHARS_MAP[char];

            if (c1 !== undefined) resultParts.push(c1);
            else if (c2 !== undefined) resultParts.push(c2);
            else if (c3 !== undefined) resultParts.push(c3);
            else resultParts.push(char);
        }
        i++;
    }
    return resultParts.join("");
  }