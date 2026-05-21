import type { Coupon } from "../types/domain";

export const coupons: Coupon[] = [
  { code: "SHOPNEST10", label: "ShopNest 10% off", discountType: "percent", value: 10 },
  { code: "SAVE5", label: "$5 off essentials", discountType: "fixed", value: 5 },
];
