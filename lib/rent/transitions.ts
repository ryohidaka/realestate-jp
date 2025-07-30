import type { RentTransition } from "./types.ts";
import {
  calculateAnnualPayment,
  calculateRenewalFee,
  isRenewalYear,
} from "./utils.ts";

/**
 * 年ごとの家賃支払い推移を取得する
 *
 * @param rent 月額家賃
 * @param years 契約年数（デフォルト: 1年）
 * @param fee 月額維持費（デフォルト: 0）
 * @param renewCycle 契約更新の頻度（年単位、デフォルト: 0）
 * @param renewFee 更新料（月数、デフォルト: 0）
 * @param raiseRate 更新時の家賃値上げ率（% 単位、デフォルト: 0）
 * @returns 年ごとの支払い推移リスト
 *
 * @example 使用例
 * ```ts
 * import { getRentTransitions } from "realestate-jp";
 *
 * const transitions = getRentTransitions(85000, 10, 5000, 2, 1, 5);
 * console.table(transitions);
 * ```
 */
export function getRentTransitions(
  rent: number,
  years = 1,
  fee = 0,
  renewCycle = 0,
  renewFee = 0,
  raiseRate = 0,
): RentTransition[] {
  let totalPayment = 0;
  let currentRent = rent;
  const results: RentTransition[] = [];

  for (let year = 1; year <= years; year++) {
    const isRenewal = isRenewalYear(year, renewCycle);
    const renewalFeeAmount = calculateRenewalFee(
      currentRent,
      renewFee,
      isRenewal,
    );
    const annualPayment = calculateAnnualPayment(
      currentRent,
      fee,
      renewFee,
      isRenewal,
    );
    totalPayment += annualPayment;

    results.push({
      year,
      rent: Math.round(currentRent),
      monthlyTotal: Math.round(currentRent + fee),
      isRenewal,
      renewalFee: Math.round(renewalFeeAmount),
      totalPayment: Math.round(totalPayment),
    });

    if (isRenewal && raiseRate > 0) {
      currentRent *= 1 + raiseRate / 100;
    }
  }

  return results;
}
