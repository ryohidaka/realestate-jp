import { assertEquals } from "@std/assert/equals";
import { assertGreater } from "@std/assert/greater";
import { calcEqualPrincipal } from "./equal_principal.ts";

Deno.test("calcEqualPrincipalが正しい数値を返却すること", () => {
  const result = calcEqualPrincipal(30000000, 1.5, 35, 0, 200000);

  assertEquals(typeof result.monthly, "number");
  assertEquals(typeof result.bonusMonth, "number");
  assertEquals(typeof result.annual, "number");
  assertEquals(typeof result.total, "number");
});

Deno.test("monthly, bonusMonth, totalが正の数値であること", () => {
  const result = calcEqualPrincipal(30000000, 1.5, 35, 0, 200000);

  assertGreater(result.monthly, 0);
  assertGreater(result.bonusMonth, result.monthly);
  assertGreater(result.total, 0);
});

Deno.test("頭金を引いた元金で計算されること", () => {
  const resultWithoutDown = calcEqualPrincipal(30000000, 1.5, 35, 0, 0);
  const resultWithDown = calcEqualPrincipal(30000000, 1.5, 35, 5000000, 0);

  assertGreater(resultWithoutDown.total, resultWithDown.total);
});

Deno.test(
  "ボーナス加算なしの場合にbonusMonthがmonthlyとほぼ同じであること",
  () => {
    const result = calcEqualPrincipal(30000000, 1.5, 35, 0, 0);

    const diff = Math.abs(result.bonusMonth - result.monthly);
    // ボーナスなしなら bonusMonth ≒ monthly になる
    // 少数の影響を考慮して数百円程度までは許容
    const maxAllowedDiff = 500;
    assertGreater(maxAllowedDiff, diff);
  },
);
