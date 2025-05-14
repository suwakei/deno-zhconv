/**
 * Full Width ASCII characters map.
 */
export declare const ASCII_H2Z_CHARS_MAP: Record<string, string>;
/**
 * Half Width ASCII characters map.
 */
export declare const ASCII_Z2H_CHARS_MAP: Record<string, string>;
/**
 * Half Width KANA characters map.
 */
export declare const KANA_H2Z_CHARS_MAP: Record<string, string>;
/**
 * Full Width KANA characters map.
 */
export declare const KANA_Z2H_CHARS_MAP: Record<string, string>;
/**
 * Half Width number characters map.
 */
export declare const DIGIT_H2Z_CHARS_MAP: Record<string, string>;
/**
 * Full Width number characters map.
 */
export declare const DIGIT_Z2H_CHARS_MAP: Record<string, string>;
/**
 * Half Width DAKUTEN_KANA characters map.
 */
export declare const KANA_H2Z_DAKUTEN_MAP: Record<string, string>;
/**
 * Half Width HANDAKUTEN_KANA characters map.
 */
export declare const KANA_H2Z_MARU_MAP: Record<string, string>;
/**
 * Full Width DAKUTEN_KANA characters map.
 */
export declare const KANA_Z2H_DAKUTEN_MAP: Record<string, string>;
/**
 * Full Width HANDAKUTEN_KANA characters map.
 */
export declare const KANA_Z2H_MARU_MAP: Record<string, string>;
export declare class ConversionTables {
    readonly ASCII_Z2H_CHARS_MAP: Record<string, string>;
    readonly ASCII_H2Z_CHARS_MAP: Record<string, string>;
    readonly KANA_Z2H_CHARS_MAP: Record<string, string>;
    readonly KANA_H2Z_CHARS_MAP: Record<string, string>;
    readonly DIGIT_Z2H_CHARS_MAP: Record<string, string>;
    readonly DIGIT_H2Z_CHARS_MAP: Record<string, string>;
    readonly KANA_Z2H_DAKUTEN_MAP: Record<string, string>;
    readonly KANA_Z2H_MARU_MAP: Record<string, string>;
    readonly KANA_H2Z_DAKUTEN_MAP: Record<string, string>;
    readonly KANA_H2Z_MARU_MAP: Record<string, string>;
    constructor();
}
/**
 * Creates and returns a new instance of ConversionTables.
 * This is equivalent to the New() function in the original Go code.
 */
export declare function createConversionTables(): ConversionTables;
