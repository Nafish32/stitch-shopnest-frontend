export type ProductCondition = "New" | "Open Box" | "Refurbished";
export type DeliveryOption = "Standard" | "Express" | "Free Delivery";
export type SortOption = "best-match" | "price-low-high" | "price-high-low" | "rating" | "newest";

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  children?: Category[];
}

export interface ProductVariant {
  id: string;
  name: string;
  values: string[];
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  compareAtPrice?: number;
  discountPercent?: number;
  rating: number;
  reviewCount: number;
  image: string;
  images: string[];
  description: string;
  specs: Record<string, string>;
  stock: number;
  isBestSeller?: boolean;
  isFeatured?: boolean;
  isFlashDeal?: boolean;
  condition: ProductCondition;
  delivery: DeliveryOption[];
  variants: ProductVariant[];
}

export interface CartItem {
  productId: string;
  quantity: number;
  selectedVariant?: Record<string, string>;
  savedForLater?: boolean;
}

export interface Address {
  id: string;
  label: string;
  name: string;
  phone: string;
  email: string;
  line1: string;
  city: string;
  country: string;
  isDefault?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  addresses: Address[];
}

export interface OrderLine {
  productId: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  date: string;
  status: "Processing" | "Shipped" | "Delivered";
  total: number;
  estimatedDelivery: string;
  lines: OrderLine[];
  paymentMethod: "Cash on Delivery";
  note: "Pay when your order arrives.";
}

export interface Review {
  id: string;
  productId: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Coupon {
  code: string;
  label: string;
  discountType: "percent" | "fixed";
  value: number;
}

export interface SearchSuggestion {
  id: string;
  label: string;
  type: "product" | "category" | "brand";
  href: string;
}

export interface FilterState {
  categories: string[];
  priceMin: number;
  priceMax: number;
  rating: number;
  brands: string[];
  availability: "all" | "in-stock" | "out-of-stock";
  delivery: DeliveryOption[];
  discounts: number[];
  conditions: ProductCondition[];
}
