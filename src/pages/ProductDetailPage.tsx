import { useQuery } from "@tanstack/react-query";
import { Heart, PackageCheck, ShoppingCart, Truck } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getProduct, getProducts, getReviews } from "../api/shopApi";
import { Breadcrumb } from "../components/layout/Breadcrumb";
import { ProductCard } from "../components/product/ProductCard";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { EmptyState } from "../components/ui/EmptyState";
import { PriceDisplay } from "../components/ui/PriceDisplay";
import { QuantityPicker } from "../components/ui/QuantityPicker";
import { Skeleton } from "../components/ui/Skeleton";
import { StarRating } from "../components/ui/StarRating";
import { useCartStore } from "../stores/cartStore";
import { useUiStore } from "../stores/uiStore";

export function ProductDetailPage() {
  const { slug = "" } = useParams();
  const navigate = useNavigate();
  const addItem = useCartStore((state) => state.addItem);
  const showToast = useUiStore((state) => state.showToast);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [tab, setTab] = useState<"description" | "specs" | "reviews">("description");

  const productQuery = useQuery({ queryKey: ["product", slug], queryFn: () => getProduct(slug) });
  const relatedQuery = useQuery({ queryKey: ["products", "related", slug], queryFn: () => getProducts({ pageSize: 6 }) });
  const reviewsQuery = useQuery({ queryKey: ["reviews", productQuery.data?.id], queryFn: () => getReviews(productQuery.data?.id ?? ""), enabled: Boolean(productQuery.data?.id) });

  if (productQuery.isLoading) {
    return <main className="mx-auto max-w-7xl px-4 py-6"><Skeleton className="h-[540px] w-full" /></main>;
  }
  if (productQuery.isError || !productQuery.data) {
    return <main className="mx-auto max-w-7xl px-4 py-8"><EmptyState icon={<PackageCheck />} title="Product not found" message="This product may have moved or is no longer available." actionLabel="Back to products" onAction={() => navigate("/products")} /></main>;
  }

  const product = productQuery.data;
  const selectedImage = product.images[activeImage] ?? product.image;

  const handleAdd = () => {
    addItem(product, quantity);
    showToast({ title: "Added to cart", description: `${quantity} x ${product.name}`, tone: "success" });
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-4">
      <Breadcrumb items={[{ label: product.category, href: `/products?category=${product.category}` }, { label: product.name }]} />
      <section className="mt-5 grid gap-8 lg:grid-cols-[1fr_1fr]">
        <div>
          <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
            <img className="h-[420px] w-full object-contain p-6 transition hover:scale-110" src={selectedImage} alt={product.name} />
          </div>
          <div className="mt-3 grid grid-cols-4 gap-3">
            {product.images.map((image, index) => (
              <button key={image} className={`rounded-md border bg-white p-2 ${index === activeImage ? "border-amber-brand" : "border-slate-200"}`} onClick={() => setActiveImage(index)}>
                <img src={image} alt={`${product.name} view ${index + 1}`} className="h-20 w-full object-contain" />
              </button>
            ))}
          </div>
        </div>
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-center gap-2">
            {product.isBestSeller && <Badge tone="navy">Best Seller</Badge>}
            {product.stock > 0 ? <Badge tone="blue">In Stock</Badge> : <Badge tone="red">Out of Stock</Badge>}
          </div>
          <h1 className="mt-3 font-heading text-3xl font-extrabold">{product.name}</h1>
          <div className="mt-2 flex items-center gap-3"><StarRating value={product.rating} count={product.reviewCount} /><span className="text-sm text-slate-500">Brand: {product.brand}</span></div>
          <div className="mt-5"><PriceDisplay price={product.price} compareAtPrice={product.compareAtPrice} size="lg" /></div>
          <p className="mt-4 text-slate-600">{product.description}</p>
          <div className="mt-5 space-y-4">
            {product.variants.map((variant) => (
              <div key={variant.id}>
                <p className="mb-2 text-sm font-bold">{variant.name}</p>
                <div className="flex flex-wrap gap-2">
                  {variant.values.map((value) => <button key={value} className="min-h-11 rounded-md border border-slate-300 px-4 text-sm font-semibold hover:border-amber-brand">{value}</button>)}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex items-center gap-3">
            <QuantityPicker value={quantity} max={product.stock || 1} onChange={setQuantity} />
            <span className="text-sm font-semibold text-slate-600">{product.stock} items available</span>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <Button variant="secondary" disabled={product.stock === 0} onClick={handleAdd}><ShoppingCart size={17} /> Add to Cart</Button>
            <Button disabled={product.stock === 0} onClick={() => { handleAdd(); navigate("/checkout"); }}>Buy Now</Button>
            <Button variant="ghost"><Heart size={17} /> Wishlist</Button>
          </div>
          <div className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
            <div className="flex items-center gap-2 rounded-md bg-slate-50 p-3"><Truck size={18} /> Free delivery options available</div>
            <div className="flex items-center gap-2 rounded-md bg-slate-50 p-3"><PackageCheck size={18} /> Pay when your order arrives.</div>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-lg bg-white p-5">
        <div className="flex flex-wrap gap-2 border-b border-slate-200">
          {(["description", "specs", "reviews"] as const).map((item) => <button key={item} className={`min-h-11 px-4 font-bold capitalize ${tab === item ? "border-b-2 border-amber-brand text-navy-950" : "text-slate-500"}`} onClick={() => setTab(item)}>{item}</button>)}
        </div>
        <div className="py-5">
          {tab === "description" && <p className="max-w-3xl text-slate-700">{product.description}</p>}
          {tab === "specs" && <dl className="grid gap-3 sm:grid-cols-2">{Object.entries(product.specs).map(([key, value]) => <div key={key} className="rounded bg-slate-50 p-3"><dt className="font-bold">{key}</dt><dd className="text-slate-600">{value}</dd></div>)}</dl>}
          {tab === "reviews" && (
            <div className="space-y-3">
              {reviewsQuery.isLoading ? <Skeleton className="h-24 w-full" /> : reviewsQuery.data?.length ? reviewsQuery.data.map((review) => <article key={review.id} className="rounded border border-slate-200 p-3"><StarRating value={review.rating} /><p className="mt-2 font-bold">{review.author}</p><p className="text-sm text-slate-600">{review.comment}</p></article>) : <p>No reviews yet.</p>}
            </div>
          )}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="mb-4 font-heading text-2xl font-bold">Related Products</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {(relatedQuery.data?.products ?? []).slice(0, 6).map((item) => <ProductCard key={item.id} product={item} />)}
        </div>
      </section>
      <Link className="sr-only" to="/cart">Cart</Link>
    </main>
  );
}
