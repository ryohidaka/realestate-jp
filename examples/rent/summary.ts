import { getRentSummary } from "@japanese/realestate";

const monthlyRent = 85000; // 月額家賃
const year = 10; // 契約年数
const fee = 5000; // 月額維持費
const renewCycle = 2; // 契約更新の頻度
const renewFee = 1; // 更新料（月数）
const raiseRate = 5; // 更新時の家賃値上げ率（%）

const summary = getRentSummary(
  monthlyRent,
  year,
  fee,
  renewCycle,
  renewFee,
  raiseRate,
);

console.log("=== 家賃サマリー ===");
console.log(summary);
