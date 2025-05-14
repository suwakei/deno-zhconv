/**
 * h2z returns string that converted from half width to full width.t.
 * @param str The input string.
 * @returns The converted string.
 */
export declare const h2z: (str: string | null) => string;
/**
 * z2h returns string that converted from full-width to half-width.
 * @param str The input string.
 * @returns The converted string.
 */
export declare const z2h: (str: string | null) => string;
/**
 * h2zAt returns string that converted from half width to full width.
 * Conversion string can be selected with the second argument.
 * @param str The input string.
 * @param at Indices of characters to convert.
 * @returns The converted string.
 */
export declare const h2zAt: (str: string, ...at: number[]) => string;
/**
 * z2hAt returns string that converted from full-width to half-width.
 * Conversion string can be selected with the second argument.
 * @param str The input string.
 * @param at Indices of characters to convert.
 * @returns The converted string.
 */
export declare const z2hAt: (str: string, ...at: number[]) => string;
