import { useQuery } from "@tanstack/react-query";
import { Grid2X2, List, PackageSearch } from "lucide-react";
import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getProducts } from "../api/shopApi";
import { FilterButton, FilterSidebar, readFilters } from "../components/filters/FilterSidebar";
import { Breadcrumb } from "../components/layout/Breadcrumb";
import { ProductCard } from "../components/product/ProductCard";
import { Button } from "../components/ui/Button";
import { EmptyState } from "../components/ui/EmptyState";
import { ProductCardSkeleton } from "../components/ui/Skeleton";
import type { SortOption } from "../types/domain";

export function ProductListingPage() {
  const [params, setParams] = useSearchParams();
  const [view, setView] = useState<"grid" | "list">("grid");
  const filters = useMemo(() => readFilters(params), [params]);
  const page = Number(params.get("page") ?? 1);
  const sort = (params.get("sort") as SortOption) ?? "best-match";
  const query = params.get("query") ?? "Laptops";

  const productsQuery = useQuery({
    queryKey: ["products", "listing", params.toString()],
    queryFn: () => getProducts({ query: params.get("query") ?? undefined, filters, sort, page, pageSize: 16 }),
  });

  const productData = productsQuery.data;
  const total = productData?.total ?? 0;
  const pageCount = Math.max(1, Math.ceil(total / 16));

  const setParam = (key: string, value: string) => {
    const next = new URLSearchParams(params);
    next.set(key, value);
    if (key !== "page") next.set("page", "1");
    setParams(next);
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-4">
      <Breadcrumb items={[{ label: "Electronics", href: "/products?category=electronics" }, { label: query || "Products" }]} />
      <div className="mt-5 grid gap-6 lg:grid-cols-[240px_1fr]">
        <FilterSidebar />
        <FilterSidebar mobile />
        <section>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="font-heading text-2xl font-extrabold">{total || 1_245} results for "{query || "Laptops"}"</h1>
              <div className="mt-3 flex flex-wrap gap-2">
                {filters.brands.map((brand) => <span key={brand} className="rounded-full bg-amber-soft px-3 py-1 text-sm font-semibold">Brand: {brand}</span>)}
                {filters.rating > 0 && <span className="rounded-full bg-amber-soft px-3 py-1 text-sm font-semibold">Rating: {filters.rating}+ Stars</span>}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <FilterButton />
              <label className="flex items-center gap-2 text-sm font-semibold">
                Sort by:
                <select className="min-h-11 rounded-md border border-slate-300 bg-white px-3" value={sort} onChange={(event) => setParam("sort", event.target.value)}>
                  <option value="best-match">Best Match</option>
                  <option value="price-low-high">Price: Low to High</option>
                  <option value="price-high-low">Price: High to Low</option>
                  <option value="rating">Rating</option>
                  <option value="newest">Newest</option>
                </select>
              </label>
              <Button aria-label="Grid view" className="h-11 w-11 p-0" variant={view === "grid" ? "primary" : "ghost"} onClick={() => setView("grid")}><Grid2X2 size={18} /></Button>
              <Button aria-label="List view" className="h-11 w-11 p-0" variant={view === "list" ? "primary" : "ghost"} onClick={() => setView("list")}><List size={18} /></Button>
            </div>
          </div>

          {productsQuery.isLoading ? (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">{Array.from({ length: 12 }).map((_, index) => <ProductCardSkeleton key={index} />)}</div>
          ) : productsQuery.isError ? (
            <EmptyState icon={<PackageSearch />} title="Products could not load" message="The catalog request failed. Try loading the products again." actionLabel="Retry" onAction={() => productsQuery.refetch()} />
          ) : !productData || productData.products.length === 0 ? (
            <EmptyState icon={<PackageSearch />} title="No products found" message="Adjust your filters or try a broader search term." actionLabel="Clear filters" onAction={() => setParams(new URLSearchParams())} />
          ) : (
            <div className={view === "grid" ? "grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4" : "space-y-4"}>
              {productData.products.map((product) => <ProductCard key={product.id} product={product} variant={view} />)}
            </div>
          )}

          <div className="mt-8 flex items-center justify-center gap-2">
            <Button variant="ghost" disabled={page <= 1} onClick={() => setParam("page", String(page - 1))}>Previous</Button>
            {Array.from({ length: Math.min(pageCount, 5) }).map((_, index) => (
              <Button key={index} variant={page === index + 1 ? "primary" : "ghost"} className="w-11 px-0" onClick={() => setParam("page", String(index + 1))}>{index + 1}</Button>
            ))}
            <Button variant="ghost" disabled={page >= pageCount} onClick={() => setParam("page", String(page + 1))}>Next</Button>
          </div>
        </section>
      </div>
    </main>
  );
}
