import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { getCategories, getProducts } from "../api/shopApi";
import { CategoryMenu } from "../components/layout/CategoryMenu";
import { CountdownTimer } from "../components/home/CountdownTimer";
import { ProductCard } from "../components/product/ProductCard";
import { Button } from "../components/ui/Button";
import { ProductCardSkeleton } from "../components/ui/Skeleton";
import type { Product } from "../types/domain";

export function HomePage() {
  const categoriesQuery = useQuery({ queryKey: ["categories"], queryFn: getCategories });
  const productsQuery = useQuery({ queryKey: ["products", "home"], queryFn: () => getProducts({ pageSize: 10 }) });
  const products = productsQuery.data?.products ?? [];
  const flashDeals = products.filter((product) => product.isFlashDeal).slice(0, 6);
  const featured = products.filter((product) => product.isFeatured).slice(0, 6);

  return (
    <main>
      <section className="relative overflow-hidden bg-navy-950 text-white">
        <div className="mx-auto grid max-w-7xl items-center gap-6 px-4 py-6 md:grid-cols-[1fr_2fr]">
          <div className="z-10 py-8">
            <h1 className="font-heading text-4xl font-extrabold leading-tight md:text-5xl">Fashion<br />Summer Sale</h1>
            <p className="mt-3 text-slate-200">Brand up with fashion summer sale</p>
            <Link to="/products?category=fashion">
              <Button className="mt-6 px-8">Shop Now</Button>
            </Link>
          </div>
          <div className="relative min-h-[260px] overflow-hidden rounded-lg bg-sky-100">
            <img
              className="h-full min-h-[260px] w-full object-cover"
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1400&q=85"
              alt="Fashion summer sale with shoppers"
            />
            <button aria-label="Previous slide" className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-navy-950 shadow">
              <ChevronLeft />
            </button>
            <button aria-label="Next slide" className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-navy-950 shadow">
              <ChevronRight />
            </button>
            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
              <span className="h-2 w-8 rounded-full bg-amber-brand" />
              <span className="h-2 w-2 rounded-full bg-white" />
              <span className="h-2 w-2 rounded-full bg-white" />
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl space-y-10 px-4 py-8">
        {categoriesQuery.isLoading ? <div className="h-24 rounded-lg bg-slate-200 animate-pulse" /> : <CategoryMenu categories={categoriesQuery.data ?? []} />}

        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-heading text-2xl font-bold">Flash Deals</h2>
            <CountdownTimer />
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {productsQuery.isLoading
              ? Array.from({ length: 6 }).map((_, index) => <ProductCardSkeleton key={index} />)
              : flashDeals.map((product) => <ProductCard key={product.id} product={product} variant="compact" />)}
          </div>
        </section>

        <ProductSection title="Best Sellers in Electronics" products={featured} loading={productsQuery.isLoading} />
        <ProductSection title="Recommended for You" products={products.slice(2, 8)} loading={productsQuery.isLoading} />
      </div>
    </main>
  );
}

function ProductSection({ title, products, loading }: { title: string; products: Product[]; loading: boolean }) {
  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-heading text-2xl font-bold">{title}</h2>
        <Link className="text-sm font-semibold hover:text-amber-700" to="/products">View all</Link>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        {loading ? Array.from({ length: 6 }).map((_, index) => <ProductCardSkeleton key={index} />) : products.map((product) => <ProductCard key={product.id} product={product} />)}
      </div>
    </section>
  );
}
