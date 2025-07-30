import { assertAlmostEquals, assertEquals } from "@std/assert";
import { getRentSummary } from "./summary.ts";

Deno.test("契約1年・更新なしの場合に正しく計算されること", () => {
  const result = getRentSummary(80000, 1, 5000);
  assertEquals(result.monthlyTotal, 85000);
  assertEquals(result.annualTotal, 85000 * 12);
  assertEquals(result.totalPayment, 85000 * 12);
  assertEquals(result.averageMonthly, 85000);
});

Deno.test("1年ごとの更新あり・更新料1ヶ月の場合に正しく計算されること", () => {
  const result = getRentSummary(100000, 2, 10000, 1, 1);

  const monthlyTotal = 100000 + 10000;
  const year1 = monthlyTotal * 12;
  const year2 = monthlyTotal * 12 + 100000; // 更新料1ヶ月分（家賃分）

  const expected = year1 + year2;

  assertEquals(result.totalPayment, expected);
  assertEquals(result.monthlyTotal, monthlyTotal);
  assertEquals(result.annualTotal, monthlyTotal * 12);
});

Deno.test("値上げ率5%が更新時に正しく反映されること", () => {
  const result = getRentSummary(100000, 2, 0, 1, 0, 5);
  const year1 = 100000 * 12;
  const year2 = 100000 * 1.05 * 12;
  const expected = year1 + year2;
  assertAlmostEquals(result.totalPayment, expected, 0.01);
  assertEquals(result.monthlyTotal, 100000);
  assertEquals(result.annualTotal, 100000 * 12);
  assertAlmostEquals(result.averageMonthly, expected / 24, 0.01);
});

Deno.test("更新設定が無視されること（renewCycle = 0 の場合）", () => {
  const result = getRentSummary(95000, 2, 5000, 0, 2, 10);
  const expected = (95000 + 5000) * 12 * 2;
  assertEquals(result.totalPayment, expected);
  assertEquals(result.averageMonthly, expected / 24);
});
