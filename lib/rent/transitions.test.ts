import { assertEquals } from "@std/assert";
import { getRentTransitions } from "./transitions.ts";
import type { RentTransition } from "./types.ts";

Deno.test("更新なし・値上げなし・1年契約で正しい推移が得られること", () => {
  const result = getRentTransitions(80000, 1, 5000);
  const expected: RentTransition[] = [
    {
      year: 1,
      rent: 80000,
      monthlyTotal: 85000,
      isRenewal: false,
      renewalFee: 0,
      totalPayment: 85000 * 12,
    },
  ];
  assertEquals(result, expected);
});

Deno.test("2年契約・1年ごとに更新料1ヶ月で推移が正しく計算されること", () => {
  const result = getRentTransitions(100000, 2, 10000, 1, 1);
  assertEquals(result.length, 2);

  assertEquals(result[0], {
    year: 1,
    rent: 100000,
    monthlyTotal: 110000,
    isRenewal: true,
    renewalFee: 100000,
    totalPayment: 110000 * 12 + 100000,
  });

  assertEquals(result[1], {
    year: 2,
    rent: 100000,
    monthlyTotal: 110000,
    isRenewal: true,
    renewalFee: 100000,
    totalPayment: (110000 * 12 + 100000) * 2,
  });
});

Deno.test("値上げ率5%が毎回正しく適用されること", () => {
  const result = getRentTransitions(100000, 3, 0, 1, 0, 5);
  assertEquals(result.length, 3);

  assertEquals(result[0].rent, 100000); // 初年度
  assertEquals(result[1].rent, 105000); // 2年目（+5%）
  assertEquals(result[2].rent, Math.round(105000 * 1.05)); // 3年目（さらに+5%）
});

Deno.test("更新頻度が0の場合にisRenewalがすべてfalseであること", () => {
  const result = getRentTransitions(85000, 3, 0, 0, 1, 5);
  for (const year of result) {
    assertEquals(year.isRenewal, false);
    assertEquals(year.renewalFee, 0);
  }
});
