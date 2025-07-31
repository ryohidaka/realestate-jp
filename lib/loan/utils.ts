import { MONTHS_PER_YEAR } from "../constants.ts";
import { BONUS_MONTHS } from "./constants.ts";

/**
 * 指定月がボーナス月か判定する
 *
 * @param index 返済開始からの月数（0始まり、例：0 = 1月目、12 = 翌年の1月目）
 * @returns 指定月がボーナス月であれば true を返却する
 */
export function isBonusMonth(index: number): boolean {
  const month = index % MONTHS_PER_YEAR;
  return BONUS_MONTHS.includes(month);
}

/**
 * 残元金に対する月利を計算する
 *
 * @param loanAmount 借入総額
 * @param monthlyPrincipal 月々の元金返済額
 * @param monthIndex 現在の月インデックス（0始まり）
 * @param annualRate 年利（%）
 * @returns 月利額（円）
 */
export function calculateMonthlyInterest(
  loanAmount: number,
  monthlyPrincipal: number,
  monthIndex: number,
  annualRate: number,
): number {
  const remainingPrincipal = loanAmount - monthlyPrincipal * monthIndex;
  return remainingPrincipal * (annualRate / 100 / MONTHS_PER_YEAR);
}

/**
 * 元利均等の月額返済額を計算する
 *
 * @param principal 借入金額（円）
 * @param annualRate 年利（%）
 * @param months 返済期間（月単位）
 * @returns 月々の返済額（円）
 */
export function calculateMonthlyPI(
  principal: number,
  annualRate: number,
  months: number,
): number {
  const r = annualRate / 100 / MONTHS_PER_YEAR;
  return (principal * r) / (1 - Math.pow(1 + r, -months));
}
