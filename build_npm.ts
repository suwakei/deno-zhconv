// This script is for build

import { build, emptyDir } from "https://deno.land/x/dnt@0.37.0/mod.ts";

await emptyDir("./npm");

await build({
    entryPoints: ["./mod.ts"],
    outDir: "./npm",
    shims: {
    deno: true,
    },
    package: {
    name: "@suwakei/zhconv",
    version: Deno.args[0],
    description: "deno-zhconv is a library that supports character conversion in Deno. It performs mutual conversion between full-width and half-width characters and kana.",
    license: "BSD 2-Clause",
    repository: {
        type: "git",
        url: "git+https://github.com/suwakei/deno-zhconv.git",
    },
    bugs: {
        url: "https://github.com/suwakei/deno-zhconv/issues",
    },
},
postBuild() {
    Deno.copyFileSync("LICENSE", "npm/LICENSE");
    Deno.copyFileSync("README.md", "npm/README.md");
},
});