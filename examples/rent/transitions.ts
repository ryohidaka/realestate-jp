import { getRentTransitions } from "@japanese/realestate";

const rentPerMonth = 85000; // 月額家賃
const contractYears = 10; // 契約年数
const maintenanceFee = 5000; // 月額維持費
const renewalCycle = 2; // 契約更新の頻度（年数）
const renewalFeeInMonths = 1.0; // 更新料（月数）
const raiseRatePercent = 3.0; // 更新時の家賃値上げ率（%）

const transitions = getRentTransitions(
  rentPerMonth,
  contractYears,
  maintenanceFee,
  renewalCycle,
  renewalFeeInMonths,
  raiseRatePercent,
);

console.log("年ごとの家賃支払推移:");
console.table(transitions);
