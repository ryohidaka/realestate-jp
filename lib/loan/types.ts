/** 住宅ローンの返済計算結果 */
export interface LoanResult {
  /** 通常月の月額返済 */
  monthly: number;

  /** ボーナス月の返済額 */
  bonusMonth: number;

  /** 年間支払額 */
  annual: number;

  /** 総支払額 */
  total: number;
}
