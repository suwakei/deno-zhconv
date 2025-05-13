# deno-zhconv

[![Test Status](https://github.com/suwakei/deno-zhconv/actions/workflows/test.yml/badge.svg)](https://github.com/suwakei/deno-zhconv/actions/workflows/test.yml)

## Overview
deno-zhconv is a library that supports character conversion in Deno. It performs mutual conversion between full-width and half-width characters and kana.

## Installation

```typescript
import {h2z, z2h} from "https://deno.land/x/zhconv@1.0.1/mod.ts"
```

## Usage

### convert from HalfWidth to FullWidth

```typescript
import { h2z } from "https://deno.land/x/zhconv@1.0.1/mod.ts";


const result = h2z("Hello, world!")
console.log(result) // Ｈｅｌｌｏ， ｗｏｒｌｄ！.

const result = h2z("") // Empty string.
console.log(result) // "".

const result = h2z("ＡＢＣ１２３アイウガパ") // No conversion needed (Zenkaku).
console.log(result) // ＡＢＣ１２３アイウガパ.

const result = h2z("ABCdef XYZ!#$%&'()*+,-./:;<=>?@[¥]^_`{|}~ \\")
console.log(result) // ＡＢＣｄｅｆ　ＸＹＺ！＃＄％＆’（）＊＋，－．／：；＜＝＞？＠［￥］＾＿‘｛｜｝～　＼.

const result = h2z("0123456789") // Hankaku Digits to Zenkaku.
console.log(result) // ０１２３４５６７８９.

const result = h2z("ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜｦﾝ") // Hankaku Katakana to Zenkaku.
console.log(result) // アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン.

const result = h2z("ｧｨｩｪｫｯｬｭｮ") // Hankaku Katakana (Small) to Zenkaku.
console.log(result) // ァィゥェォッャュョ.

const result = h2z("｡､･ｰ｢｣")// Hankaku Katakana (Symbols) to Zenkaku.
console.log(result) // 。、・ー「」.

const result = h2z("ｶﾞｷﾞｸﾞｹﾞｺﾞｻﾞｼﾞｽﾞｾﾞｿﾞﾀﾞﾁﾞﾂﾞﾃﾞﾄﾞﾊﾞﾋﾞﾌﾞﾍﾞﾎﾞｳﾞ") // Hankaku Katakana with Dakuten to Zenkaku".
console.log(result) // ガギグゲゴザジズゼゾダヂヅデドバビブベボヴ.

const result = h2z( "ﾊﾟﾋﾟﾌﾟﾍﾟﾎﾟ") // Hankaku Katakana with Handakuten to Zenkaku.
console.log(result) // パピプペポ.

const result = h2z("これはﾃｽﾄです｡123 ABC ｱｲｳ ｶﾞｷﾞｸﾞ ﾊﾟﾋﾟﾌﾟ!") // Mixed Hankaku/Zenkaku/Other.
console.log(result) // これはテストです。１２３　ＡＢＣ　アイウ　ガギグ　パピプ！.

const result = h2z(" ｽﾍﾟｰｽ ") // convert from Half width space to Full width space.
console.log(result) //  　スペース　.

const result = h2z("ｱﾞｲﾟﾝﾞ") // Dakuten/Handakuten cannot be applied.
console.log(result) // ア゛イ゜ン゛ Converted to full-width characters as separated( (ｱ->ア, ﾞ->ﾞ).

const result = h2z("①②③㈱㈲") // Not convertible symbols.
console.log(result) // It is assumed that environment dependent characters will not be converted.

const result = h2z("1ﾊﾞｲﾄ文字と2ﾊﾞｲﾄ文字が混在するﾃｷｽﾄ｡ ABC 123 ｶﾞｷﾞｸﾞﾊﾟﾋﾟﾌﾟ!?") // Long string with various conversions.
console.log(result) // １バイト文字と２バイト文字が混在するテキスト。　ＡＢＣ　１２３　ガギグパピプ！？.
```

### convert from HalfWidth to FullWidth

```typescript
import { z2h } from "https://deno.land/x/zhconv@1.0.1/mod.ts";


const result = z2h("ＡＢＣｄｅｆ　ＸＹＺ！＃＄％＆’（）＊＋，－．／：；＜＝＞？＠［￥］＾＿‘｛｜｝～")
console.log(result) // ABCdef XYZ!#$%&'()*+,-./:;<=>?@[¥]^_`{|}~

const result = z2h("０１２３４５６７８９")
console.log(result) // 0123456789

const result = z2h("アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン")
console.log(result) // ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜｦﾝ

const result = z2h("ァィゥェォッャュョ")
console.log(result) // ｧｨｩｪｫｯｬｭｮ ヮ is not converted because there is no corresponding character for half-width.

const result = z2h("。、・ー「」")
console.log(result) // ｡､･ｰ｢｣

const result = z2h("ガギグゲゴザジズゼゾダヂヅデドバビブベボヴ")
console.log(result) // ｶﾞｷﾞｸﾞｹﾞｺﾞｻﾞｼﾞｽﾞｾﾞｿﾞﾀﾞﾁﾞﾂﾞﾃﾞﾄﾞﾊﾞﾋﾞﾌﾞﾍﾞﾎﾞｳﾞ

const result = z2h("パピプペポ")
console.log(result) // ﾊﾟﾋﾟﾌﾟﾍﾟﾎﾟ

const result = z2h("　スペース　") // convert from Full width space to half width space
console.log(result) //  ｽﾍﾟｰｽ 

const result = z2h("①②③㈱㈲") // It is assumed that environment dependent characters will not be converted.
console.log(result) // ①②③㈱㈲
```