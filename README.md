# deno-zhconv

[![Test Status](https://github.com/suwakei/deno-zhconv/actions/workflows/test.yml/badge.svg)](https://github.com/suwakei/deno-zhconv/actions/workflows/test.yml)
[![codecov](https://codecov.io/gh/suwakei/deno-zhconv/graph/badge.svg?token=HPK546J57Z)](https://codecov.io/gh/suwakei/deno-zhconv)

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
import { z2h } from "https://deno.land/x/zhconv@1.0.1/mod.ts";


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