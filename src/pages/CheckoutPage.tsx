import { Lock, MapPin, PackageCheck } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProductSync } from "../api/shopApi";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { PriceDisplay } from "../components/ui/PriceDisplay";
import { useCartStore } from "../stores/cartStore";
import { user } from "../mocks/users";

type Step = 1 | 2 | 3;

export function CheckoutPage() {
  const [step, setStep] = useState<Step>(1);
  const { items, totals, clearCart } = useCartStore();
  const navigate = useNavigate();
  const activeItems = items.filter((item) => !item.savedForLater);
  const summary = totals();

  const placeOrder = () => {
    clearCart();
    navigate("/order-confirmation/SN-NEW-2026");
  };

  return (
    <main>
      <header className="bg-navy-950 text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5">
          <span className="font-heading text-2xl font-extrabold">Shop<span className="text-amber-brand">Nest</span></span>
          <span className="flex items-center gap-2 text-sm"><Lock size={16} /> Secure Checkout</span>
        </div>
      </header>
      <div className="mx-auto max-w-7xl px-4 py-8">
        <h1 className="font-heading text-3xl font-extrabold">Cash on Delivery Checkout</h1>
        <div className="mt-5 grid overflow-hidden rounded-md border border-navy-900 text-center font-semibold text-white sm:grid-cols-3">
          <StepItem active={step === 1} label="1. Shipping Address" />
          <StepItem active={step === 2} label="2. Review Order" />
          <StepItem active={step === 3} label="3. COD Confirm" />
        </div>
        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]">
          <section className="space-y-6">
            {step === 1 && (
              <>
                <Panel title="Shipping Address">
                  {user.addresses.map((address) => (
                    <label key={address.id} className="flex min-h-11 items-start gap-3 rounded-md border border-slate-200 p-3">
                      <input type="radio" name="address" defaultChecked={address.isDefault} className="mt-1 accent-amber-brand" />
                      <span><strong>{address.label}</strong><br /><span className="text-sm text-slate-600">{address.line1}</span></span>
                    </label>
                  ))}
                </Panel>
                <Panel title="New Address">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Input label="First name *" />
                    <Input label="Last name *" />
                    <Input label="Email *" type="email" />
                    <Input label="Phone *" />
                    <Input label="Address" className="sm:col-span-2" placeholder="Enter your address" />
                  </div>
                </Panel>
                <Panel title="Delivery Method">
                  <label className="flex min-h-11 items-center justify-between gap-3"><span><input className="mr-2 accent-amber-brand" type="radio" name="delivery" defaultChecked /> Standard Delivery<br /><small className="ml-6 text-slate-500">Standard delivery within your order window.</small></span><strong>$12.99</strong></label>
                  <label className="flex min-h-11 items-center justify-between gap-3"><span><input className="mr-2 accent-amber-brand" type="radio" name="delivery" /> Express Delivery</span><strong>$29.99</strong></label>
                </Panel>
                <Button onClick={() => setStep(2)}>Continue to Review</Button>
              </>
            )}
            {step === 2 && (
              <Panel title="Review Order">
                <div className="space-y-3">
                  {activeItems.map((item) => {
                    const product = getProductSync(item.productId);
                    if (!product) return null;
                    return <div key={item.productId} className="flex items-center gap-3 rounded border border-slate-200 p-3"><img src={product.image} alt={product.name} className="h-20 w-20 object-contain" /><div className="flex-1"><strong>{product.name}</strong><p className="text-sm text-slate-600">Quantity: {item.quantity}</p></div><PriceDisplay price={product.price * item.quantity} /></div>;
                  })}
                </div>
                <div className="mt-5 flex gap-3"><Button variant="ghost" onClick={() => setStep(1)}>Back</Button><Button onClick={() => setStep(3)}>Confirm COD</Button></div>
              </Panel>
            )}
            {step === 3 && (
              <Panel title="Payment Method">
                <div className="rounded-lg border-2 border-navy-900 bg-slate-50 p-5">
                  <div className="flex items-center gap-3"><PackageCheck className="text-sky-600" /><strong>Cash on Delivery</strong><Lock className="ml-auto text-slate-500" size={18} /></div>
                  <p className="mt-2 text-slate-700">Pay when your order arrives.</p>
                </div>
                <div className="mt-5 flex gap-3"><Button variant="ghost" onClick={() => setStep(2)}>Back</Button><Button onClick={placeOrder}>Place Order</Button></div>
              </Panel>
            )}
          </section>
          <aside className="h-fit rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="font-heading text-2xl font-bold">Order Summary</h2>
            <div className="mt-4 space-y-3">
              {activeItems.slice(0, 3).map((item) => {
                const product = getProductSync(item.productId);
                if (!product) return null;
                return <div key={item.productId} className="flex gap-3 border-b border-slate-200 pb-3"><img src={product.image} alt={product.name} className="h-16 w-16 rounded bg-slate-50 object-contain" /><div className="flex-1 text-sm"><strong className="line-clamp-2">{product.name}</strong><p>x{item.quantity}</p></div><span className="price-font text-sm font-bold">${product.price.toFixed(2)}</span></div>;
              })}
            </div>
            <div className="mt-4 space-y-2 text-sm">
              <Row label="Subtotal" value={`$${summary.subtotal.toFixed(2)}`} />
              <Row label="Shipping" value={summary.shipping ? `$${summary.shipping.toFixed(2)}` : "$0.00"} />
              <Row label="Total" value={`$${summary.total.toFixed(2)}`} large />
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

function StepItem({ active, label }: { active: boolean; label: string }) {
  return <div className={`px-4 py-3 ${active ? "bg-amber-brand text-navy-950" : "bg-navy-950"}`}>{label}</div>;
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return <section><h2 className="mb-3 font-heading text-2xl font-bold">{title}</h2><div className="space-y-3 rounded-lg border border-slate-200 bg-white p-4">{children}</div></section>;
}

function Row({ label, value, large = false }: { label: string; value: string; large?: boolean }) {
  return <div className={`flex justify-between ${large ? "border-t border-slate-200 pt-3 text-2xl font-extrabold" : ""}`}><span>{label}</span><span className="price-font font-bold">{value}</span></div>;
}
