import { PackageOpen, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getProductSync, validateCoupon } from "../api/shopApi";
import { ProductCard } from "../components/product/ProductCard";
import { Button } from "../components/ui/Button";
import { EmptyState } from "../components/ui/EmptyState";
import { Input } from "../components/ui/Input";
import { PriceDisplay } from "../components/ui/PriceDisplay";
import { QuantityPicker } from "../components/ui/QuantityPicker";
import { useCartStore } from "../stores/cartStore";
import { useUiStore } from "../stores/uiStore";
import { products } from "../mocks/products";

export function CartPage() {
  const navigate = useNavigate();
  const { items, removeItem, updateQuantity, saveForLater, setCoupon, totals } = useCartStore();
  const showToast = useUiStore((state) => state.showToast);
  const [couponCode, setCouponCode] = useState("");
  const activeItems = items.filter((item) => !item.savedForLater);
  const summary = totals();

  const applyCoupon = async () => {
    try {
      const coupon = await validateCoupon(couponCode);
      setCoupon(coupon);
      showToast({ title: "Coupon applied", description: coupon.label, tone: "success" });
    } catch (error) {
      showToast({ title: "Coupon failed", description: error instanceof Error ? error.message : "Try another code.", tone: "error" });
    }
  };

  if (!activeItems.length) {
    return <main className="mx-auto max-w-7xl px-4 py-8"><EmptyState icon={<PackageOpen />} title="Your cart is empty" message="Add a few products and come back to check out with Cash on Delivery." actionLabel="Shop products" onAction={() => navigate("/products")} /></main>;
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="font-heading text-3xl font-extrabold">Cart</h1>
      <div className="mt-5 grid gap-6 lg:grid-cols-[1fr_320px]">
        <section className="space-y-4">
          {activeItems.map((item) => {
            const product = getProductSync(item.productId);
            if (!product) return null;
            return (
              <article key={item.productId} className="grid gap-4 rounded-lg border border-slate-200 bg-white p-4 sm:grid-cols-[140px_1fr_auto]">
                <img src={product.image} alt={product.name} className="h-36 w-full rounded-md bg-slate-50 object-contain p-3" />
                <div>
                  <Link to={`/products/${product.slug}`} className="font-heading text-xl font-bold hover:text-amber-700">{product.name}</Link>
                  <p className="mt-1 text-sm text-slate-600">Color: Black</p>
                  <div className="mt-2"><PriceDisplay price={product.price} /></div>
                  <p className="price-font mt-2 text-sm">JetBrains Mono</p>
                </div>
                <div className="flex flex-col items-start gap-4 sm:items-end">
                  <QuantityPicker value={item.quantity} onChange={(value) => updateQuantity(item.productId, value)} />
                  <div className="flex gap-3 text-sm">
                    <button className="font-semibold hover:text-red-600" onClick={() => removeItem(item.productId)}>Remove</button>
                    <button className="font-semibold hover:text-amber-700" onClick={() => saveForLater(item.productId)}>Save for later</button>
                  </div>
                </div>
              </article>
            );
          })}
          <div className="rounded-lg bg-white p-4">
            <h2 className="font-heading text-xl font-bold">Coupon</h2>
            <div className="mt-3 flex gap-2">
              <Input aria-label="Coupon code" value={couponCode} onChange={(event) => setCouponCode(event.target.value)} placeholder="SHOPNEST10" />
              <Button onClick={applyCoupon}>Apply</Button>
            </div>
          </div>
        </section>
        <aside className="h-fit rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="font-heading text-2xl font-bold">Order Summary</h2>
          <div className="mt-5 space-y-3 border-b border-slate-200 pb-4 text-sm">
            <Row label="Subtotal" value={`$${summary.subtotal.toFixed(2)}`} />
            <Row label="Shipping" value={summary.shipping ? `$${summary.shipping.toFixed(2)}` : "Choose options"} />
            <Row label="Estimated tax" value={`$${summary.tax.toFixed(2)}`} />
          </div>
          <Row label="Total" value={`$${summary.total.toFixed(2)}`} large />
          <div className="mt-4 flex items-center gap-2 rounded-md bg-sky-100 p-3 text-sm font-bold text-navy-950"><ShieldCheck size={18} /> Cash on Delivery Only</div>
          <Button className="mt-4" fullWidth onClick={() => navigate("/checkout")}>Proceed to Checkout</Button>
        </aside>
      </div>
      <section className="mt-10">
        <h2 className="mb-4 font-heading text-2xl font-bold">Recommended for You</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">{products.slice(0, 6).map((product) => <ProductCard key={product.id} product={product} />)}</div>
      </section>
    </main>
  );
}

function Row({ label, value, large = false }: { label: string; value: string; large?: boolean }) {
  return <div className={`flex justify-between ${large ? "mt-4 text-xl font-extrabold" : ""}`}><span>{label}</span><span className="price-font font-bold">{value}</span></div>;
}
