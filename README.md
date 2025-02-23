# deno-zhconv


## Overview
deno-zhconvはDenoでの文字変換をサポートするライブラリです。全角と半角、カナの相互変換を行います。

## Installation

リポジトリをクローンし、Denoプロジェクトに追加します。

```sh
git clone https://github.com/suwakei/deno-zhconv.git
```


## Usage

### convert from HalfWidth to FullWidth

```typescript
import { convertToFullWidth } from "./mod.ts";

const result = convertToFullWidth("Hello, world!");
console.log(result); // "Ｈｅｌｌｏ， ｗｏｒｌｄ！"
```