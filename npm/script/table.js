"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createConversionTables = exports.ConversionTables = exports.KANA_Z2H_MARU_MAP = exports.KANA_Z2H_DAKUTEN_MAP = exports.KANA_H2Z_MARU_MAP = exports.KANA_H2Z_DAKUTEN_MAP = exports.DIGIT_Z2H_CHARS_MAP = exports.DIGIT_H2Z_CHARS_MAP = exports.KANA_Z2H_CHARS_MAP = exports.KANA_H2Z_CHARS_MAP = exports.ASCII_Z2H_CHARS_MAP = exports.ASCII_H2Z_CHARS_MAP = void 0;
/**
 * Full Width ASCII characters map.
 */
exports.ASCII_H2Z_CHARS_MAP = {
    'a': 'ａ', 'b': 'ｂ', 'c': 'ｃ', 'd': 'ｄ', 'e': 'ｅ', 'f': 'ｆ', 'g': 'ｇ', 'h': 'ｈ', 'i': 'ｉ', 'j': 'ｊ', 'k': 'ｋ', 'l': 'ｌ', 'm': 'ｍ', 'n': 'ｎ', 'o': 'ｏ', 'p': 'ｐ', 'q': 'ｑ', 'r': 'ｒ', 's': 'ｓ', 't': 'ｔ', 'u': 'ｕ', 'v': 'ｖ', 'w': 'ｗ', 'x': 'ｘ', 'y': 'ｙ', 'z': 'ｚ',
    'A': 'Ａ', 'B': 'Ｂ', 'C': 'Ｃ', 'D': 'Ｄ', 'E': 'Ｅ', 'F': 'Ｆ', 'G': 'Ｇ', 'H': 'Ｈ', 'I': 'Ｉ', 'J': 'Ｊ', 'K': 'Ｋ', 'L': 'Ｌ', 'M': 'Ｍ', 'N': 'Ｎ', 'O': 'Ｏ', 'P': 'Ｐ', 'Q': 'Ｑ', 'R': 'Ｒ', 'S': 'Ｓ', 'T': 'Ｔ', 'U': 'Ｕ', 'V': 'Ｖ', 'W': 'Ｗ', 'X': 'Ｘ', 'Y': 'Ｙ', 'Z': 'Ｚ',
    '!': '！', '"': '”', '#': '＃', '$': '＄', '%': '％', '&': '＆', '\'': '’', '(': '（', ')': '）', '*': '＊', '+': '＋', ',': '，', '-': '－', '.': '．', '/': '／', ':': '：', ';': '；', '<': '＜', '=': '＝', '>': '＞', '?': '？', '@': '＠', '[': '［', '¥': '￥', ']': '］', '^': '＾',
    '_': '＿', '`': '‘', '{': '｛', '|': '｜', '}': '｝', '~': '～', ' ': '　', '\\': '＼',
};
/**
 * Half Width ASCII characters map.
 */
exports.ASCII_Z2H_CHARS_MAP = {
    'ａ': 'a', 'ｂ': 'b', 'ｃ': 'c', 'ｄ': 'd', 'ｅ': 'e', 'ｆ': 'f', 'ｇ': 'g', 'ｈ': 'h', 'ｉ': 'i', 'ｊ': 'j', 'ｋ': 'k', 'ｌ': 'l', 'ｍ': 'm', 'ｎ': 'n', 'ｏ': 'o', 'ｐ': 'p', 'ｑ': 'q', 'ｒ': 'r', 'ｓ': 's', 'ｔ': 't', 'ｕ': 'u', 'ｖ': 'v', 'ｗ': 'w', 'ｘ': 'x', 'ｙ': 'y', 'ｚ': 'z',
    'Ａ': 'A', 'Ｂ': 'B', 'Ｃ': 'C', 'Ｄ': 'D', 'Ｅ': 'E', 'Ｆ': 'F', 'Ｇ': 'G', 'Ｈ': 'H', 'Ｉ': 'I', 'Ｊ': 'J', 'Ｋ': 'K', 'Ｌ': 'L', 'Ｍ': 'M', 'Ｎ': 'N', 'Ｏ': 'O', 'Ｐ': 'P', 'Ｑ': 'Q', 'Ｒ': 'R', 'Ｓ': 'S', 'Ｔ': 'T', 'Ｕ': 'U', 'Ｖ': 'V', 'Ｗ': 'W', 'Ｘ': 'X', 'Ｙ': 'Y', 'Ｚ': 'Z',
    '！': '!', '”': '"', '＃': '#', '＄': '$', '％': '%', '＆': '&', '’': '\'', '（': '(', '）': ')', '＊': '*', '＋': '+', '，': ',', '－': '-', '．': '.', '／': '/', '：': ':', '；': ';', '＜': '<', '＝': '=', '＞': '>', '？': '?', '＠': '@', '［': '[', '￥': '¥', '］': ']', '＾': '^',
    '＿': '_', '‘': '`', '｛': '{', '｜': '|', '｝': '}', '～': '~', '　': ' ', '＼': '\\',
};
/**
 * Half Width KANA characters map.
 */
exports.KANA_H2Z_CHARS_MAP = {
    'ｱ': 'ア', 'ｲ': 'イ', 'ｳ': 'ウ', 'ｴ': 'エ', 'ｵ': 'オ',
    'ｶ': 'カ', 'ｷ': 'キ', 'ｸ': 'ク', 'ｹ': 'ケ', 'ｺ': 'コ',
    'ｻ': 'サ', 'ｼ': 'シ', 'ｽ': 'ス', 'ｾ': 'セ', 'ｿ': 'ソ',
    'ﾀ': 'タ', 'ﾁ': 'チ', 'ﾂ': 'ツ', 'ﾃ': 'テ', 'ﾄ': 'ト',
    'ﾅ': 'ナ', 'ﾆ': 'ニ', 'ﾇ': 'ヌ', 'ﾈ': 'ネ', 'ﾉ': 'ノ',
    'ﾊ': 'ハ', 'ﾋ': 'ヒ', 'ﾌ': 'フ', 'ﾍ': 'ヘ', 'ﾎ': 'ホ',
    'ﾏ': 'マ', 'ﾐ': 'ミ', 'ﾑ': 'ム', 'ﾒ': 'メ', 'ﾓ': 'モ',
    'ﾔ': 'ヤ', 'ﾕ': 'ユ', 'ﾖ': 'ヨ',
    'ﾗ': 'ラ', 'ﾘ': 'リ', 'ﾙ': 'ル', 'ﾚ': 'レ', 'ﾛ': 'ロ',
    'ﾜ': 'ワ', 'ｦ': 'ヲ', 'ﾝ': 'ン',
    'ｧ': 'ァ', 'ｨ': 'ィ', 'ｩ': 'ゥ', 'ｪ': 'ェ', 'ｫ': 'ォ',
    'ｯ': 'ッ',
    'ｬ': 'ャ', 'ｭ': 'ュ', 'ｮ': 'ョ',
    '｡': '。', '､': '、', '･': '・', 'ﾞ': '゛', 'ﾟ': '゜',
    '｢': '「', '｣': '」', 'ｰ': 'ー',
};
/**
 * Full Width KANA characters map.
 */
exports.KANA_Z2H_CHARS_MAP = {
    'ア': 'ｱ', 'イ': 'ｲ', 'ウ': 'ｳ', 'エ': 'ｴ', 'オ': 'ｵ',
    'カ': 'ｶ', 'キ': 'ｷ', 'ク': 'ｸ', 'ケ': 'ｹ', 'コ': 'ｺ',
    'サ': 'ｻ', 'シ': 'ｼ', 'ス': 'ｽ', 'セ': 'ｾ', 'ソ': 'ｿ',
    'タ': 'ﾀ', 'チ': 'ﾁ', 'ツ': 'ﾂ', 'テ': 'ﾃ', 'ト': 'ﾄ',
    'ナ': 'ﾅ', 'ニ': 'ﾆ', 'ヌ': 'ﾇ', 'ネ': 'ﾈ', 'ノ': 'ﾉ',
    'ハ': 'ﾊ', 'ヒ': 'ﾋ', 'フ': 'ﾌ', 'ヘ': 'ﾍ', 'ホ': 'ﾎ',
    'マ': 'ﾏ', 'ミ': 'ﾐ', 'ム': 'ﾑ', 'メ': 'ﾒ', 'モ': 'ﾓ',
    'ヤ': 'ﾔ', 'ユ': 'ﾕ', 'ヨ': 'ﾖ',
    'ラ': 'ﾗ', 'リ': 'ﾘ', 'ル': 'ﾙ', 'レ': 'ﾚ', 'ロ': 'ﾛ',
    'ワ': 'ﾜ', 'ヲ': 'ｦ', 'ン': 'ﾝ',
    'ァ': 'ｧ', 'ィ': 'ｨ', 'ゥ': 'ｩ', 'ェ': 'ｪ', 'ォ': 'ｫ',
    'ッ': 'ｯ',
    'ャ': 'ｬ', 'ュ': 'ｭ', 'ョ': 'ｮ',
    '。': '｡', '、': '､', '・': '･', '゛': 'ﾞ', '゜': 'ﾟ',
    '「': '｢', '」': '｣', 'ー': 'ｰ',
};
/**
 * Half Width number characters map.
 */
exports.DIGIT_H2Z_CHARS_MAP = {
    '0': '０', '1': '１', '2': '２', '3': '３', '4': '４',
    '5': '５', '6': '６', '7': '７', '8': '８', '9': '９',
};
/**
 * Full Width number characters map.
 */
exports.DIGIT_Z2H_CHARS_MAP = {
    '０': '0', '１': '1', '２': '2', '３': '3', '４': '4',
    '５': '5', '６': '6', '７': '7', '８': '8', '９': '9',
};
/**
 * Half Width DAKUTEN_KANA characters map.
 */
exports.KANA_H2Z_DAKUTEN_MAP = {
    'ｶ': 'ガ', 'ｷ': 'ギ', 'ｸ': 'グ', 'ｹ': 'ゲ', 'ｺ': 'ゴ',
    'ｻ': 'ザ', 'ｼ': 'ジ', 'ｽ': 'ズ', 'ｾ': 'ゼ', 'ｿ': 'ゾ',
    'ﾀ': 'ダ', 'ﾁ': 'ヂ', 'ﾂ': 'ヅ', 'ﾃ': 'デ', 'ﾄ': 'ド',
    'ﾊ': 'バ', 'ﾋ': 'ビ', 'ﾌ': 'ブ', 'ﾍ': 'ベ', 'ﾎ': 'ボ',
    'ｳ': 'ヴ', 'ﾞ': 'ﾞ', 'ﾟ': 'ﾟ', // Note: ﾞ and ﾟ are included here as per original Go map
};
/**
 * Half Width HANDAKUTEN_KANA characters map.
 */
exports.KANA_H2Z_MARU_MAP = {
    'ﾊ': 'パ', 'ﾋ': 'ピ', 'ﾌ': 'プ', 'ﾍ': 'ペ', 'ﾎ': 'ポ',
};
/**
 * Full Width DAKUTEN_KANA characters map.
 */
exports.KANA_Z2H_DAKUTEN_MAP = {
    'ガ': 'ｶﾞ', 'ギ': 'ｷﾞ', 'グ': 'ｸﾞ', 'ゲ': 'ｹﾞ', 'ゴ': 'ｺﾞ',
    'ザ': 'ｻﾞ', 'ジ': 'ｼﾞ', 'ズ': 'ｽﾞ', 'ゼ': 'ｾﾞ', 'ゾ': 'ｿﾞ',
    'ダ': 'ﾀﾞ', 'ヂ': 'ﾁﾞ', 'ヅ': 'ﾂﾞ', 'デ': 'ﾃﾞ', 'ド': 'ﾄﾞ',
    'バ': 'ﾊﾞ', 'ビ': 'ﾋﾞ', 'ブ': 'ﾌﾞ', 'ベ': 'ﾍﾞ', 'ボ': 'ﾎﾞ',
    'ヴ': 'ｳﾞ',
};
/**
 * Full Width HANDAKUTEN_KANA characters map.
 */
exports.KANA_Z2H_MARU_MAP = {
    'パ': 'ﾊﾟ', 'ピ': 'ﾋﾟ', 'プ': 'ﾌﾟ', 'ペ': 'ﾍﾟ', 'ポ': 'ﾎﾟ',
};
class ConversionTables {
    constructor() {
        Object.defineProperty(this, "ASCII_Z2H_CHARS_MAP", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "ASCII_H2Z_CHARS_MAP", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "KANA_Z2H_CHARS_MAP", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "KANA_H2Z_CHARS_MAP", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "DIGIT_Z2H_CHARS_MAP", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "DIGIT_H2Z_CHARS_MAP", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "KANA_Z2H_DAKUTEN_MAP", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "KANA_Z2H_MARU_MAP", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "KANA_H2Z_DAKUTEN_MAP", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "KANA_H2Z_MARU_MAP", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.ASCII_Z2H_CHARS_MAP = exports.ASCII_Z2H_CHARS_MAP;
        this.ASCII_H2Z_CHARS_MAP = exports.ASCII_H2Z_CHARS_MAP;
        this.KANA_Z2H_CHARS_MAP = exports.KANA_Z2H_CHARS_MAP;
        this.KANA_H2Z_CHARS_MAP = exports.KANA_H2Z_CHARS_MAP;
        this.DIGIT_Z2H_CHARS_MAP = exports.DIGIT_Z2H_CHARS_MAP;
        this.DIGIT_H2Z_CHARS_MAP = exports.DIGIT_H2Z_CHARS_MAP;
        this.KANA_Z2H_DAKUTEN_MAP = exports.KANA_Z2H_DAKUTEN_MAP;
        this.KANA_Z2H_MARU_MAP = exports.KANA_Z2H_MARU_MAP;
        this.KANA_H2Z_DAKUTEN_MAP = exports.KANA_H2Z_DAKUTEN_MAP;
        this.KANA_H2Z_MARU_MAP = exports.KANA_H2Z_MARU_MAP;
    }
}
exports.ConversionTables = ConversionTables;
/**
 * Creates and returns a new instance of ConversionTables.
 * This is equivalent to the New() function in the original Go code.
 */
function createConversionTables() {
    return new ConversionTables();
}
exports.createConversionTables = createConversionTables;
