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

/**
 * 各年ごとの家賃支払い推移情報
 */
export interface RentTransition {
  /** 経過年数（1年目から） */
  year: number;

  /** 当年の月額家賃 */
  rent: number;

  /** 月額合計（家賃 + 維持費） */
  monthlyTotal: number;

  /** この年が更新年かどうか */
  isRenewal: boolean;

  /** この年に発生する更新料 */
  renewalFee: number;

  /** 累積の支払額（この年までの合計） */
  totalPayment: number;
}
