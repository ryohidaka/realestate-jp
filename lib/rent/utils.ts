import { MONTHS_PER_YEAR } from "../constants.ts";

/**
 * 指定した年が更新年かを判定する
 * @param year 経過年数（1年目から）
 * @param cycle 更新頻度（年単位）。0のときは更新なし。
 * @returns 更新年であれば true
 */
export function isRenewalYear(year: number, cycle: number): boolean {
  if (cycle <= 0) return false;
  return year % cycle === 0;
}

/**
 * 年間の合計支払額を計算する（月額×12 + 更新料）
 * @param rent 月額家賃
 * @param fee 月額維持費
 * @param renewFee 更新料（月数）
 * @param isRenewal この年が更新年かどうか
 * @returns 年間支払額
 */
export function calculateAnnualPayment(
  rent: number,
  fee: number,
  renewFee: number,
  isRenewal: boolean,
): number {
  const monthlyTotal = calculateMonthlyTotal(rent, fee);
  const renewalFee = calculateRenewalFee(rent, renewFee, isRenewal);
  return monthlyTotal * MONTHS_PER_YEAR + renewalFee;
}

/**
 * 月額の合計支払額を計算する
 * @param rent 月額家賃
 * @param fee 月額維持費（管理費や駐車場代など）
 * @returns 月額合計
 */
export function calculateMonthlyTotal(rent: number, fee: number): number {
  return rent + fee;
}

/**
 * 更新料を計算する
 * @param rent 月額家賃
 * @param renewFee 月数指定の更新料
 * @param isRenewal この年が更新年であるかどうか
 * @returns 更新料（該当しない場合は0）
 */
function calculateRenewalFee(
  rent: number,
  renewFee: number,
  isRenewal: boolean,
): number {
  if (!isRenewal) return 0;
  return rent * renewFee;
}
