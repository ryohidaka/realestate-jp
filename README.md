# @japanese/realestate

[![NPM Version](https://img.shields.io/npm/v/realestate-jp?logo=npm)](https://www.npmjs.com/package/realestate-jp)
[![JSR Version](https://img.shields.io/jsr/v/%40japanese/realestate?logo=jsr)](https://jsr.io/@japanese/realestate)
[![CI](https://github.com/ryohidaka/realestate-jp/actions/workflows/ci.yml/badge.svg)](https://github.com/ryohidaka/realestate-jp/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/ryohidaka/realestate-jp/graph/badge.svg?token=2huHweDOwW)](https://codecov.io/gh/ryohidaka/realestate-jp)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)

不動産関連のユーティリティ関数を提供するライブラリ

## インストール

### Node.js

```sh
npm i realestate-jp
```

### Deno

#### Add Package

```sh
deno add jsr:@japanese/realestate
```

#### Import symbol

```sh
import * as realestate from "@japanese/realestate";
```

## 使用例

### 家賃支払いのサマリーを計算する

```ts
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
```

### 年ごとの家賃支払い推移を取得する

```ts
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
```

### 元利均等方式による住宅ローン返済を計算する（ボーナス加算対応）

```ts
import { calcEqualPrincipalAndInterest } from "@japanese/realestate";

const principal = 30000000; // 借入金額
const rate = 1.5; // 年利
const years = 35; // 返済年数
const downPayment = 5000000; // 頭金
const annualBonus = 200000; // 年間ボーナス加算額

const result = calcEqualPrincipalAndInterest(
  principal,
  rate,
  years,
  downPayment,
  annualBonus,
);

console.log("=== 元利均等方式による住宅ローン返済 ===");
console.log(result);
```

### 元金均等方式による住宅ローン返済を計算する（ボーナス加算対応）

```ts
import { calcEqualPrincipal } from "@japanese/realestate";

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
```

## ドキュメント

- https://jsr.io/@japanese/realestate/doc

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file
for details.
