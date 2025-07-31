import { assertAlmostEquals } from "@std/assert/almost-equals";
import { assertEquals } from "@std/assert/equals";
import { assertGreater } from "@std/assert/greater";
import { calcEqualPrincipalAndInterest } from "./equal_interest.ts";

Deno.test("calcEqualPrincipalAndInterestが正しい返済情報を返却すること", () => {
  const result = calcEqualPrincipalAndInterest(30000000, 1.5, 35, 0, 200000);

  assertEquals(typeof result.monthly, "number");
  assertEquals(typeof result.bonusMonth, "number");
  assertEquals(typeof result.annual, "number");
  assertEquals(typeof result.total, "number");

  assertGreater(result.monthly, 0);
  assertGreater(result.bonusMonth, result.monthly);
  assertGreater(result.total, 0);
});

Deno.test("頭金を含めた場合に総返済額が小さくなること", () => {
  const noDown = calcEqualPrincipalAndInterest(30000000, 1.5, 35, 0, 0);
  const withDown = calcEqualPrincipalAndInterest(30000000, 1.5, 35, 5000000, 0);

  assertGreater(noDown.total, withDown.total);
});

Deno.test("ボーナス加算なしの場合にbonusMonthがmonthlyと等しいこと", () => {
  const result = calcEqualPrincipalAndInterest(30000000, 1.5, 35, 0, 0);
  assertAlmostEquals(result.bonusMonth, result.monthly, 1); // ±1円以内
});

Deno.test("年間返済額が月額とボーナスから正しく算出されること", () => {
  const result = calcEqualPrincipalAndInterest(30000000, 1.5, 35, 0, 200000);

  const months = 35 * 12;
  const bonusMonths = 2;
  const normalMonths = months - bonusMonths * 35;

  const estimatedAnnual = Math.round(
    (result.monthly * normalMonths + result.bonusMonth * bonusMonths * 35) / 35,
  );

  assertAlmostEquals(result.annual, estimatedAnnual, 10); // ±10円以内
});
