import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getProductSync } from "../api/shopApi";
import type { CartItem, Coupon, Product } from "../types/domain";

interface CartTotals {
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
}

interface CartState {
  items: CartItem[];
  coupon?: Coupon;
  addItem: (product: Product, quantity?: number, selectedVariant?: Record<string, string>) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  saveForLater: (productId: string) => void;
  moveToCart: (productId: string) => void;
  setCoupon: (coupon?: Coupon) => void;
  clearCart: () => void;
  totals: () => CartTotals;
  count: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [
        { productId: "p2", quantity: 1 },
        { productId: "p3", quantity: 1 },
      ],
      addItem: (product, quantity = 1, selectedVariant) =>
        set((state) => {
          const existing = state.items.find((item) => item.productId === product.id && !item.savedForLater);
          if (existing) {
            return {
              items: state.items.map((item) =>
                item.productId === product.id && !item.savedForLater ? { ...item, quantity: item.quantity + quantity } : item,
              ),
            };
          }
          return { items: [...state.items, { productId: product.id, quantity, selectedVariant }] };
        }),
      removeItem: (productId) => set((state) => ({ items: state.items.filter((item) => item.productId !== productId) })),
      updateQuantity: (productId, quantity) =>
        set((state) => ({
          items: state.items.map((item) => (item.productId === productId ? { ...item, quantity: Math.max(1, quantity) } : item)),
        })),
      saveForLater: (productId) =>
        set((state) => ({
          items: state.items.map((item) => (item.productId === productId ? { ...item, savedForLater: true } : item)),
        })),
      moveToCart: (productId) =>
        set((state) => ({
          items: state.items.map((item) => (item.productId === productId ? { ...item, savedForLater: false } : item)),
        })),
      setCoupon: (coupon) => set({ coupon }),
      clearCart: () => set({ items: [], coupon: undefined }),
      totals: () => {
        const subtotal = get().items.reduce((sum, item) => {
          if (item.savedForLater) return sum;
          const product = getProductSync(item.productId);
          return sum + (product?.price ?? 0) * item.quantity;
        }, 0);
        const coupon = get().coupon;
        const discount = coupon ? (coupon.discountType === "percent" ? subtotal * (coupon.value / 100) : coupon.value) : 0;
        const shipping = subtotal > 0 && subtotal < 75 ? 12.99 : 0;
        const tax = subtotal > 0 ? 2.99 : 0;
        return {
          subtotal,
          discount,
          shipping,
          tax,
          total: Math.max(0, subtotal - discount + shipping + tax),
        };
      },
      count: () => get().items.filter((item) => !item.savedForLater).reduce((sum, item) => sum + item.quantity, 0),
    }),
    { name: "shopnest-cart" },
  ),
);
