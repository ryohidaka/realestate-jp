import { MONTHS_PER_YEAR } from "../constants.ts";
import {
  BONUS_MONTHS,
  DEFAULT_LOAN_RATE,
  DEFAULT_LOAN_YEARS,
} from "./constants.ts";
import type { LoanResult } from "./types.ts";
import { calculateMonthlyInterest, isBonusMonth } from "./utils.ts";

/**
 * 元金均等方式による住宅ローン返済を計算する（ボーナス加算対応）
 *
 * @param principal 借入金額（円）
 * @param rate 年利（％、デフォルト: 1.5）
 * @param years 返済年数（デフォルト: 35）
 * @param downPayment 頭金（円、デフォルト: 0）
 * @param annualBonus 年間ボーナス加算額（円、夏冬合計、デフォルト: 0）
 * @returns ローン返済結果
 *
 * @example 使用例
 * ```ts
 * const result = calcEqualPrincipal(30000000, 1.5, 35, 5000000, 200000);
 * console.log(result);
 * ```
 */
export function calcEqualPrincipal(
  principal: number,
  rate: number = DEFAULT_LOAN_RATE,
  years: number = DEFAULT_LOAN_YEARS,
  downPayment: number = 0,
  annualBonus: number = 0,
): LoanResult {
  const loanAmount = principal - downPayment;
  const months = years * MONTHS_PER_YEAR;
  const monthlyPrincipal = loanAmount / months;
  const bonusPerMonth = annualBonus / BONUS_MONTHS.length;

  let total = 0;
  let normalSum = 0;
  let bonusSum = 0;
  let normalCount = 0;
  let bonusCount = 0;

  for (let i = 0; i < months; i++) {
    const isBonus = isBonusMonth(i);
    const monthlyInterest = calculateMonthlyInterest(
      loanAmount,
      monthlyPrincipal,
      i,
      rate,
    );
    const basePayment = monthlyPrincipal + monthlyInterest;
    const payment = isBonus ? basePayment + bonusPerMonth : basePayment;

    total += payment;

    if (isBonus) {
      bonusSum += payment;
      bonusCount++;
    } else {
      normalSum += payment;
      normalCount++;
    }
  }

  const avgMonthly = normalSum / normalCount;
  const avgBonus = bonusSum / bonusCount;
  const annual = (avgMonthly * normalCount + avgBonus * bonusCount) / years;

  return {
    monthly: Math.round(avgMonthly),
    bonusMonth: Math.round(avgBonus),
    annual: Math.round(annual),
    total: Math.round(total),
  };
}
