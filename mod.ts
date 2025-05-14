import { createConversionTables } from "./table.ts";

const convTables = createConversionTables();

/**
 * h2z returns string that converted from half width to full width.t.
 * @param str The input string.
 * @returns The converted string.
 */
export const h2z = (str: string | null): string => {
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

/**
 * z2h returns string that converted from full-width to half-width.
 * @param str The input string.
 * @returns The converted string.
 */
export const z2h = (str: string | null): string => {
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


/**
 * h2zAt returns string that converted from half width to full width.
 * Conversion string can be selected with the second argument.
 * @param str The input string.
 * @param at Indices of characters to convert.
 * @returns The converted string.
 */
export const h2zAt = (str: string, ...at: number[]): string => {
    if (str === "") {
        return "";
    }

    if (at.length === 0) {
        return str;
    }

    const runes = Array.from(str);
    const runeLen = runes.length;

    // Validate indices
    if (Math.min(...at) < 0 || Math.max(...at) >= runeLen) {
        return str;
    }

    const convMap = new Map<number, string>();

    for (const indexToConvert of at) {
        const target = runes[indexToConvert];
        let pairProcessed = false;

        if (indexToConvert + 1 < runeLen) {
            const next = runes[indexToConvert + 1];
            // COMBINING KATAKANA-HIRAGANA VOICED SOUND MARK (U+3099)
            if (next === 'ﾞ') {
                const zenkakuDakuten = convTables.KANA_H2Z_DAKUTEN_MAP[target];
                if (zenkakuDakuten !== undefined) {
                    convMap.set(indexToConvert, zenkakuDakuten);
                    pairProcessed = true;
                }
            // COMBINING KATAKANA-HIRAGANA SEMI-VOICED SOUND MARK (U+309A)
            } else if (next === 'ﾟ') {
                const zenkakuHandakuten = convTables.KANA_H2Z_MARU_MAP[target];
                if (zenkakuHandakuten !== undefined) {
                    convMap.set(indexToConvert, zenkakuHandakuten);
                    pairProcessed = true;
                }
            }
        }

        if (pairProcessed) {
            continue; // このインデックス（とペアの次のインデックス）は処理済み
        }

        // ペアで処理されなかった場合、通常の文字変換を試みる
        let convertedChar: string | undefined;
        if ((convertedChar = convTables.ASCII_H2Z_CHARS_MAP[target]) !== undefined) {
            convMap.set(indexToConvert, convertedChar);
        } else if ((convertedChar = convTables.KANA_H2Z_CHARS_MAP[target]) !== undefined) {
            convMap.set(indexToConvert, convertedChar);
        } else if ((convertedChar = convTables.DIGIT_H2Z_CHARS_MAP[target]) !== undefined) {
            convMap.set(indexToConvert, convertedChar);
        } else {
            // 変換対象外の文字、または単独の濁点/半濁点など
            // Go版では convMap[a] = target としているので、指定されたインデックスが変換対象なら
            // マップには元の文字を（変更なしとして）入れる
            convMap.set(indexToConvert, target);
        }
    }

    // convMap を使って結果文字列を構築
    const resultRunes: string[] = [];
    let i: number = 0;
    while (i < runeLen) {
        let consumedChars = 1; // 現在の文字 `i` が消費する文字数 (通常は1)
        if (convMap.has(i)) {
            const convertedChar = convMap.get(i)!;
            resultRunes.push(convertedChar);
            // ペア変換の結果かどうかを確認し、そうであれば次の文字をスキップ
            const originalChar = runes[i];
            if (i + 1 < runeLen) {
                const nextOriginalChar = runes[i+1];
                if (nextOriginalChar === 'ﾞ' && convTables.KANA_H2Z_DAKUTEN_MAP[originalChar] === convertedChar) {
                    consumedChars = 2;
                } else if (nextOriginalChar === 'ﾟ' && convTables.KANA_H2Z_MARU_MAP[originalChar] === convertedChar) {
                    consumedChars = 2;
                }
            }
        } else {
            resultRunes.push(runes[i]);
        }
        i += consumedChars;
    }
    return resultRunes.join("");
}


/**
 * z2hAt returns string that converted from full-width to half-width.
 * Conversion string can be selected with the second argument.
 * @param str The input string.
 * @param at Indices of characters to convert.
 * @returns The converted string.
 */
export const z2hAt = (str: string, ...at: number[]): string => {
    if (str === "") {
        return "";
    }

    if (at.length === 0) {
        return str;
    }

    const runes = Array.from(str);
    const runeLen = runes.length;

    // Validate indices
    if (at.length > 0 && (Math.min(...at) < 0 || Math.max(...at) >= runeLen)) {
        return str;
    }

    // Create a set of `at` indices for quick lookup
    const atSet = new Set<number>(at);

    const outputRunes: string[] = [];

    for (let i = 0; i < runeLen; i++) {
        const charToProcess = runes[i];

        if (atSet.has(i)) {
            let convertedChars: string[] | undefined = undefined;

            // Check for Katakana with dakuten/handakuten first for decomposition
            const decomposedDakuten = convTables.KANA_Z2H_DAKUTEN_MAP[charToProcess];
            if (decomposedDakuten !== undefined) {
                convertedChars = [decomposedDakuten]; // e.g. 'ガ' -> 'ｶﾞ'
            } else {
                const decomposedHandakuten = convTables.KANA_Z2H_MARU_MAP[charToProcess];
                if (decomposedHandakuten !== undefined) {
                    convertedChars = [decomposedHandakuten]; // e.g. 'パ' -> 'ﾊﾟ'
                }
            }

            // If not decomposed, check other maps for single character conversion
            if (convertedChars === undefined) {
                let singleConvertedChar: string | undefined;
                if ((singleConvertedChar = convTables.ASCII_Z2H_CHARS_MAP[charToProcess]) !== undefined) {
                    convertedChars = [singleConvertedChar]; // e.g. 'Ａ' -> ['A']
                } else if ((singleConvertedChar = convTables.KANA_Z2H_CHARS_MAP[charToProcess]) !== undefined) {
                    convertedChars = [singleConvertedChar]; // e.g. 'ア' -> ['ｱ']
                } else if ((singleConvertedChar = convTables.DIGIT_Z2H_CHARS_MAP[charToProcess]) !== undefined) {
                    convertedChars = [singleConvertedChar]; // e.g. '１' -> ['1']
                }
            }

            // Append converted characters if found, otherwise append the original character
            outputRunes.push(...(convertedChars !== undefined ? convertedChars : [charToProcess]));
        } else {
            // Append original character if index is not in `at` set
            outputRunes.push(charToProcess);
        }
    }
    return outputRunes.join("");
}
