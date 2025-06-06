# deno-zhconv

[![Test Status](https://github.com/suwakei/deno-zhconv/actions/workflows/test.yml/badge.svg)](https://github.com/suwakei/deno-zhconv/actions/workflows/test.yml)
[![codecov](https://codecov.io/github/suwakei/deno-zhconv/branch/main/graph/badge.svg?token=HPK546J57Z)](https://codecov.io/github/suwakei/deno-zhconv)

<table>
    <thead>
        <tr>
            <th style="text-align:center">English</th>
            <th style="text-align:center"><a href="README_ja.md">日本語</a></th>
        </tr>
    </thead>
</table>


## Overview
deno-zhconv is a library that supports character conversion in Deno. It performs mutual conversion between full-width and half-width characters and kana.

### deno other repository
- deno.land: https://deno.land/x/zhconv

- jsr.io: https://jsr.io/@suwakei/zhconv

### zhconv written in other langage
- Go: https://github.com/suwakei/go-zhconv

## Installing
```typescript
import {h2z, z2h, h2zAt, z2hAt} from "https://deno.land/x/zhconv@1.2.0/mod.ts"
```
or
```typescript
import {h2z, z2h, h2zAt, z2hAt} from "https://jsr.io/@suwakei/zhconv";
```

## Features
```typescript
/**
 * h2z converts half-width characters (hankaku) in a string to full-width characters (zenkaku).
 * It handles ASCII, Katakana, digits, and Katakana with dakuten/handakuten.
 * @param "str" The input string.
 * @returns The converted string.
 */
function h2z(str: string): string


/**
 * h2zAt returns string that converted from half width to full width.
 * Conversion string can be selected with the second argument.
 * @param "str" The input string.
 * @param "at" Indices of characters to convert.
 * @returns The converted string.
 */
function h2zAt(str: string, ...at: number[]): string


/**
 * z2h converts full-width characters (zenkaku) in a string to half-width characters (hankaku).
 * It handles ASCII, Katakana, digits, and Katakana with dakuten/handakuten.
 * @param "str" The input string.
 * @returns The converted string.
 */
function z2h(str: string): string


/**
 * z2hAt returns string that converted from full-width to half-width.
 * Conversion string can be selected with the second argument.
 * @param "str" The input string.
 * @param "at" Indices of characters to convert.
 * @returns The converted string.
 */
function Z2hAt(str: tring, at: number[]): string


/**
 * Reverses the width of characters in a string.
 * Full-width characters are converted to half-width, and half-width characters are converted to full-width.
 * Characters that are neither full-width nor half-width, or for which no direct reverse mapping exists, remain unchanged.
 *
 * @param str The input string.
 * @returns The string with character widths reversed.
 */
function reverse (str: string): string
```

## Usage

### convert from HalfWidth to FullWidth

```typescript
import { h2z } from "https://deno.land/x/zhconv@1.2.0/mod.ts"; // or import { h2z } from "https://jsr.io/@suwakei/zhconv";


let result = h2z("Hello, world!")
console.log(result) // Ｈｅｌｌｏ， ｗｏｒｌｄ！.

let result = h2z("") // Empty string.
console.log(result) // "".

let result = h2z("ＡＢＣ１２３アイウガパ") // No conversion needed (Zenkaku).
console.log(result) // ＡＢＣ１２３アイウガパ.

let result = h2z("ABCdef XYZ!#$%&'()*+,-./:;<=>?@[¥]^_`{|}~ \\")
console.log(result) // ＡＢＣｄｅｆ　ＸＹＺ！＃＄％＆’（）＊＋，－．／：；＜＝＞？＠［￥］＾＿‘｛｜｝～　＼.

let result = h2z("0123456789") // Hankaku Digits to Zenkaku.
console.log(result) // ０１２３４５６７８９.

let result = h2z("ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜｦﾝ") // Hankaku Katakana to Zenkaku.
console.log(result) // アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン.

let result = h2z("ｧｨｩｪｫｯｬｭｮ") // Hankaku Katakana (Small) to Zenkaku.
console.log(result) // ァィゥェォッャュョ.

let result = h2z("｡､･ｰ｢｣")// Hankaku Katakana (Symbols) to Zenkaku.
console.log(result) // 。、・ー「」.

let result = h2z("ｶﾞｷﾞｸﾞｹﾞｺﾞｻﾞｼﾞｽﾞｾﾞｿﾞﾀﾞﾁﾞﾂﾞﾃﾞﾄﾞﾊﾞﾋﾞﾌﾞﾍﾞﾎﾞｳﾞ") // Hankaku Katakana with Dakuten to Zenkaku".
console.log(result) // ガギグゲゴザジズゼゾダヂヅデドバビブベボヴ.

let result = h2z( "ﾊﾟﾋﾟﾌﾟﾍﾟﾎﾟ") // Hankaku Katakana with Handakuten to Zenkaku.
console.log(result) // パピプペポ.

let result = h2z("これはﾃｽﾄです｡123 ABC ｱｲｳ ｶﾞｷﾞｸﾞ ﾊﾟﾋﾟﾌﾟ!") // Mixed Hankaku/Zenkaku/Other.
console.log(result) // これはテストです。１２３　ＡＢＣ　アイウ　ガギグ　パピプ！.

let result = h2z(" ｽﾍﾟｰｽ ") // convert from Half width space to Full width space.
console.log(result) //  　スペース　.

let result = h2z("ｱﾞｲﾟﾝﾞ") // Dakuten/Handakuten cannot be applied.
console.log(result) // ア゛イ゜ン゛ Converted to full-width characters as separated( (ｱ->ア, ﾞ->ﾞ).

let result = h2z("①②③㈱㈲") // Not convertible symbols.
console.log(result) // It is assumed that environment dependent characters will not be converted.

let result = h2z("1ﾊﾞｲﾄ文字と2ﾊﾞｲﾄ文字が混在するﾃｷｽﾄ｡ ABC 123 ｶﾞｷﾞｸﾞﾊﾟﾋﾟﾌﾟ!?") // Long string with various conversions.
console.log(result) // １バイト文字と２バイト文字が混在するテキスト。　ＡＢＣ　１２３　ガギグパピプ！？.
```

### convert from HalfWidth to FullWidth

```typescript
import { z2h } from "https://deno.land/x/zhconv@1.2.0/mod.ts";


let result = z2h("ＡＢＣｄｅｆ　ＸＹＺ！＃＄％＆’（）＊＋，－．／：；＜＝＞？＠［￥］＾＿‘｛｜｝～")
console.log(result) // ABCdef XYZ!#$%&'()*+,-./:;<=>?@[¥]^_`{|}~

let result = z2h("０１２３４５６７８９")
console.log(result) // 0123456789

let result = z2h("アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン")
console.log(result) // ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜｦﾝ

let result = z2h("ァィゥェォッャュョ")
console.log(result) // ｧｨｩｪｫｯｬｭｮ ヮ is not converted because there is no corresponding character for half-width.

let result = z2h("。、・ー「」")
console.log(result) // ｡､･ｰ｢｣

let result = z2h("ガギグゲゴザジズゼゾダヂヅデドバビブベボヴ")
console.log(result) // ｶﾞｷﾞｸﾞｹﾞｺﾞｻﾞｼﾞｽﾞｾﾞｿﾞﾀﾞﾁﾞﾂﾞﾃﾞﾄﾞﾊﾞﾋﾞﾌﾞﾍﾞﾎﾞｳﾞ

let result = z2h("パピプペポ")
console.log(result) // ﾊﾟﾋﾟﾌﾟﾍﾟﾎﾟ

let result = z2h("　スペース　") // convert from Full width space to half width space
console.log(result) //  ｽﾍﾟｰｽ 

let result = z2h("①②③㈱㈲") // It is assumed that environment dependent characters will not be converted.
console.log(result) // ①②③㈱㈲
```

### Partial conversion from half-width to full-width characters
```typescript
import { h2zAt } from "https://deno.land/x/zhconv@1.2.0/mod.ts";


let result = h2zAt("Hello, world!", 0, 7)
console.log(result) // Ｈello, ｗorld!.

let result = h2zAt("", 0) // Empty string.
console.log(result) // "".

let result = h2zAt("ＡＢＣ１２３アイウガパ", 0, 5) // No conversion needed (Zenkaku).
console.log(result) // ＡＢＣ１２３アイウガパ.

let result = h2zAt("ABCdef XYZ!#$%&'()*+,-./:;<=>?@[¥]^_`{|}~ \\", 3, 17)
console.log(result) // ABCｄef XYZ!#$%&'（)*+,-./:;<=>?@[¥]^_`{|}~ \\.

let result = h2zAt("0123456789",0, 5) // Hankaku Digits to Zenkaku.
console.log(result) // ０1234５6789.

let result = h2zAt("ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜｦﾝ", 0) // Hankaku Katakana to Zenkaku.
console.log(result) // アｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜｦﾝ.

let result = h2zAt("ｧｨｩｪｫｯｬｭｮ", 0) // Hankaku Katakana (Small) to Zenkaku.
console.log(result) // ァｨｩｪｫｯｬｭｮ.
```


### Partial conversion from full-width to half-width characters
```typescript
import { z2hAt } from "https://deno.land/x/zhconv@1.2.0/mod.ts";


let result = z2hAt("Ｈｅｌｌｏ， ｗｏｒｌｄ！", 0, 7)
console.log(result) // Hｅｌｌｏ， wｏｒｌｄ！.

let result = z2hAt("ＡＢＣｄｅｆ　ＸＹＺ！＃＄％＆’（）＊＋，－．／：；＜＝＞？＠［￥］＾＿‘｛｜｝～", 3, 17)
console.log(result) // ＡＢＣdｅｆ　ＸＹＺ！＃＄％＆’（)＊＋，－．／：；＜＝＞？＠［￥］＾＿‘｛｜｝～.

let result = z2hAt("０１２３４５６７８９", 0, 5)
console.log(result) // 0１２３４5６７８９.

let result = z2hAt("アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン", 0, 6, 9, 10)
console.log(result) // ｱイウエオカｷクケｺｻシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン.

let result = z2hAt("ァィゥェォッャュョ", 4)
console.log(result) // ァィゥェｫッャュョ.

```

### Invert half-width and full-width characters
```typescript
import { reverse } from "https://deno.land/x/zhconv@1.2.0/mod.ts";



let result = reverse("abc xyz!")
console.log(result) // ａｂｃ　ｘｙｚ！

let result = reverse("０１２３４５")
console.log(result) // 012345

let result = reverse("Ｈｅｌｌｏ　Ｗｏｒｌｄ！　１２３　アイウガパ")
console.log(result) // Hello World! 123 ｱｲｳｶﾞﾊﾟ

let result = reverse("ＡbcＤＥＦｇｈ　1２３ＸＹｚ　アｲウｴオ　カｷﾞクｹﾞコ　サｼﾞスｾﾞソ　タﾁヅﾃド")
console.log(result) //AｂｃDEFgh １23XYz ｱイｳエｵ ｶキﾞｸケﾞｺ ｻシﾞｽセﾞｿ ﾀチﾂﾞテﾄﾞ

let result = reverse("１ｓｔ「ＰＲＩＣＥ」ｉｓ　￥１，０００－　（ＴＡＸ　ＩＮ）　ｶﾞﾝﾊﾞﾚ！")
console.log(result) // 1st｢PRICE｣is \\1,000- (TAX IN) カﾞンハﾞレ!

let result = reverse("テストｶﾞ")
console.log(result) // ﾃｽﾄカﾞ
```
