import { MONTHS_PER_YEAR } from "../constants.ts";
import type { RentSummary } from "./types.ts";
import {
  calculateAnnualPayment,
  calculateMonthlyTotal,
  isRenewalYear,
} from "./utils.ts";

/**
 * 家賃支払いのサマリーを計算する
 *
 * @param rent 月額家賃
 * @param years 契約年数（デフォルト: 1年）
 * @param fee 月額維持費（デフォルト: 0）
 * @param renewCycle 契約更新の頻度（年単位、デフォルト: 0＝更新なし）
 * @param renewFee 更新料（月数単位、デフォルト: 0）
 * @param raiseRate 更新時の家賃値上げ率（% 単位、デフォルト: 0）
 * @returns 支払いサマリー情報
 *
 * @example 使用例
 * ```ts
 * import { getRentSummary } from "realestate-jp";
 *
 * const summary = getRentSummary(85000, 10, 5000, 2, 1, 5);
 * console.log(summary);
 * ```
 */
export function getRentSummary(
  rent: number,
  years = 1,
  fee = 0,
  renewCycle = 0,
  renewFee = 0,
  raiseRate = 0,
): RentSummary {
  let totalPayment = 0;
  let currentRent = rent;

  for (let year = 1; year <= years; year++) {
    const isRenewal = year > 1 && isRenewalYear(year, renewCycle);

    if (isRenewal && raiseRate > 0) {
      currentRent *= 1 + raiseRate / 100;
    }

    totalPayment += calculateAnnualPayment(
      currentRent,
      fee,
      renewFee,
      isRenewal,
    );
  }

  // 初年度の月額合計（値上げは考慮しない）
  const monthlyTotal = calculateMonthlyTotal(rent, fee);

  // 初年度の年間支払額
  const annualTotal = monthlyTotal * MONTHS_PER_YEAR;

  // 契約期間全体の平均月額支払額を計算
  const averageMonthly = totalPayment / (years * MONTHS_PER_YEAR);

  return {
    monthlyTotal,
    annualTotal,
    totalPayment: Math.round(totalPayment),
    averageMonthly: Math.round(averageMonthly),
  };
}
