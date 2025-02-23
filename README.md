# deno-zhconv


## Overview
deno-zhconv is a library that supports character conversion in Deno. It performs mutual conversion between full-width and half-width characters and kana.

## Installation

リポジトリをクローンし、Denoプロジェクトに追加します。

```sh
git clone https://github.com/suwakei/deno-zhconv.git
```


## Usage

### convert from HalfWidth to FullWidth

```typescript
import { h2z } from "./mod.ts";

const result = h2z("Hello, world!");
console.log(result); // "Ｈｅｌｌｏ， ｗｏｒｌｄ！"
```

### convert from HalfWidth to FullWidth

```typescript
import { z2h } from "./mod.ts";

const result = z2h("Ｈｅｌｌｏ， ｗｏｒｌｄ！");
console.log(result); // "Hello, world!"
```
