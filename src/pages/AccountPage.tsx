import { useQuery } from "@tanstack/react-query";
import { Heart, Home, Package, UserRound } from "lucide-react";
import { getOrders, getUser } from "../api/shopApi";
import { ProductCard } from "../components/product/ProductCard";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Skeleton } from "../components/ui/Skeleton";
import { products } from "../mocks/products";

export function AccountPage() {
  const userQuery = useQuery({ queryKey: ["user"], queryFn: getUser });
  const ordersQuery = useQuery({ queryKey: ["orders"], queryFn: getOrders });

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="font-heading text-3xl font-extrabold">My Account</h1>
      <div className="mt-6 grid gap-6 lg:grid-cols-[240px_1fr]">
        <aside className="h-fit rounded-lg bg-white p-3 shadow-sm">
          {[
            ["Profile", UserRound],
            ["Order History", Package],
            ["Wishlist", Heart],
            ["Saved Addresses", Home],
          ].map(([label, Icon]) => {
            const TypedIcon = Icon as typeof UserRound;
            return <button key={String(label)} className="flex min-h-11 w-full items-center gap-3 rounded-md px-3 text-left font-semibold hover:bg-amber-soft"><TypedIcon size={18} />{String(label)}</button>;
          })}
        </aside>
        <section className="space-y-6">
          <div className="rounded-lg bg-white p-5 shadow-sm">
            <h2 className="font-heading text-2xl font-bold">Profile</h2>
            {userQuery.isLoading ? <Skeleton className="mt-4 h-40 w-full" /> : (
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <Input label="Name" defaultValue={userQuery.data?.name} />
                <Input label="Email" defaultValue={userQuery.data?.email} />
                <Input label="Phone" defaultValue={userQuery.data?.phone} />
                <div className="flex items-end"><Button>Save Profile</Button></div>
              </div>
            )}
          </div>
          <div className="rounded-lg bg-white p-5 shadow-sm">
            <h2 className="font-heading text-2xl font-bold">Order History</h2>
            <div className="mt-4 space-y-3">
              {ordersQuery.isLoading ? <Skeleton className="h-24 w-full" /> : ordersQuery.data?.map((order) => (
                <article key={order.id} className="rounded-md border border-slate-200 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <strong>{order.id}</strong>
                    <span className="rounded-full bg-amber-soft px-3 py-1 text-sm font-bold">{order.status}</span>
                  </div>
                  <p className="mt-2 text-sm text-slate-600">{order.date} · {order.paymentMethod} · {order.note}</p>
                  <p className="price-font mt-2 font-bold">${order.total.toFixed(2)}</p>
                </article>
              ))}
            </div>
          </div>
          <div className="rounded-lg bg-white p-5 shadow-sm">
            <h2 className="font-heading text-2xl font-bold">Wishlist</h2>
            <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">{products.slice(0, 4).map((product) => <ProductCard key={product.id} product={product} />)}</div>
          </div>
          <div className="rounded-lg bg-white p-5 shadow-sm">
            <h2 className="font-heading text-2xl font-bold">Saved Addresses</h2>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {userQuery.data?.addresses.map((address) => <div key={address.id} className="rounded-md border border-slate-200 p-4"><strong>{address.label}</strong><p className="mt-1 text-sm text-slate-600">{address.line1}<br />{address.city}, {address.country}</p></div>)}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
