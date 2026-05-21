import { CheckCircle2 } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { Button } from "../components/ui/Button";

export function OrderConfirmationPage() {
  const { orderId = "SN-NEW-2026" } = useParams();
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-3xl items-center px-4 py-12">
      <section className="w-full rounded-xl bg-white p-8 text-center shadow-soft">
        <CheckCircle2 className="mx-auto animate-bounce text-emerald-600" size={72} />
        <h1 className="mt-5 font-heading text-3xl font-extrabold">Order Confirmed</h1>
        <p className="mt-3 text-slate-600">Your order <strong>{orderId}</strong> is being prepared. Pay when your order arrives.</p>
        <div className="mx-auto mt-6 max-w-md rounded-lg bg-slate-50 p-4 text-left">
          <p><strong>Payment:</strong> Cash on Delivery</p>
          <p><strong>Estimated delivery:</strong> Mon, May 25</p>
          <p><strong>Status:</strong> Processing</p>
        </div>
        <Link to="/products"><Button className="mt-6">Continue Shopping</Button></Link>
      </section>
    </main>
  );
}
