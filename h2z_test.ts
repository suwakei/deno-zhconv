import { h2z } from "./mod.ts";
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

Deno.test("h2z: 半角文字を全角に変換", () => {
  const input = "Hello, world";
  const expected ="Ｈｅｌｌｏ， ｗｏｒｌｄ！";
  assertEquals(h2z(input), expected);
});

Deno.test("h2z: 全角文字を含む半角文字列を全角に変換", () => {
  const input = "Ｈｅｌｌｏ, world";
  const expected = "Ｈｅｌｌｏ， ｗｏｒｌｄ！";
  assertEquals(h2z(input), expected);
});

Deno.test("h2z: 空文字列の処理", () => {
  const input = "";
  const expected = "";
  assertEquals(h2z(input), expected);
});

Deno.test("h2z: nullの処理", () => {
  const input = null;
  const expected = "";
  assertEquals(h2z(input), expected);
});