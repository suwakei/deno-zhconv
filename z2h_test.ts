import { z2h } from "./mod.ts";
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

type sn = string | null

Deno.test("z2h: 全角文字を半角に変換", () => {
  const input: sn = "Ｈｅｌｌｏ， ｗｏｒｌｄ！";
  const expected: string = "Hello, world!";
  assertEquals(z2h(input), expected);
});

Deno.test("z2h: 半角文字を含む全角文字列を半角に変換", () => {
  const input: sn = "Ｈｅｌｌｏ, world";
  const expected: string = "Hello, world!";
  assertEquals(z2h(input), expected);
});

Deno.test("z2h: 空文字列の処理", () => {
  const input: sn = "";
  const expected: string = "";
  assertEquals(z2h(input), expected);
});

Deno.test("z2h: nullの処理", () => {
  const input: sn = null;
  const expected: string = "";
  assertEquals(z2h(input), expected);
});