import { calcEqualPrincipal } from "realestate-jp";

const principal = 30000000; // 借入金額
const rate = 1.5; // 年利
const years = 35; // 返済年数
const downPayment = 5000000; // 頭金
const annualBonus = 200000; // 年間ボーナス加算額

const result = calcEqualPrincipal(
  principal,
  rate,
  years,
  downPayment,
  annualBonus,
);

console.log("=== 元金均等方式による住宅ローン返済 ===");
console.log(result);
