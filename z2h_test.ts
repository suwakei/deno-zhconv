import { z2h } from "./mod.ts";
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

Deno.test("z2h: 全角文字を半角に変換", () => {
  const input = "Ｈｅｌｌｏ， ｗｏｒｌｄ！";
  const expected = "Hello, world!";
  assertEquals(z2h(input), expected);
});

Deno.test("z2h: 半角文字を含む全角文字列を半角に変換", () => {
  const input = "Ｈｅｌｌｏ， ｗｏｒｌｄ！";
  const expected = "Hello, world!";
  assertEquals(z2h(input), expected);
});

Deno.test("z2h: 空文字列の処理", () => {
  const input = "";
  const expected = "";
  assertEquals(z2h(input), expected);
});

Deno.test("z2h: nullの処理", () => {
  const input = null;
  const expected = "";
  assertEquals(z2h(input), expected);
});