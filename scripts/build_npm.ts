// @see https://github.com/denoland/dnt

import { build, emptyDir } from "@deno/dnt";

await emptyDir("./npm");

await build({
  entryPoints: ["./mod.ts"],
  outDir: "./npm",
  shims: {
    // see JS docs for overview and more options
    deno: true,
  },
  package: {
    // package.json properties
    name: "realestate-jp",
    version: Deno.args[0]?.replace(/^v/, ""),
    description: "不動産関連のユーティリティ関数を提供するライブラリ",
    keywords: ["realestate", "japan", "japanese"],
    license: "MIT",
    repository: {
      type: "git",
      url: "git+https://github.com/ryohidaka/realestate-jp.git",
    },
    author: "ryohidaka",
    bugs: {
      url: "https://github.com/ryohidaka/realestate-jp/issues",
    },
    homepage: "https://github.com/ryohidaka/realestate-jp#readme",
  },
  compilerOptions: {
    lib: ["ESNext"],
  },
  postBuild() {
    // steps to run after building and before running the tests
    Deno.copyFileSync("LICENSE", "npm/LICENSE");
    Deno.copyFileSync("README.md", "npm/README.md");
  },
});
