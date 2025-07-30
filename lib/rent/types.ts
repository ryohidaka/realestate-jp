/**
 * 家賃支払いの集計情報
 */
export interface RentSummary {
  /** 初年度の月額合計 */
  monthlyTotal: number;

  /** 初年度の年間合計 */
  annualTotal: number;

  /** 契約期間中の総支払額 */
  totalPayment: number;

  /** 契約期間中の平均月額支払額 */
  averageMonthly: number;
}
