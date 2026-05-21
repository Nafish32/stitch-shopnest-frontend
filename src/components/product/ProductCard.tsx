import { Heart, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useCartStore } from "../../stores/cartStore";
import { useUiStore } from "../../stores/uiStore";
import type { Product } from "../../types/domain";
import { cn } from "../../utils/cn";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { PriceDisplay } from "../ui/PriceDisplay";
import { StarRating } from "../ui/StarRating";

interface ProductCardProps {
  product: Product;
  variant?: "grid" | "list" | "compact";
}

export function ProductCard({ product, variant = "grid" }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const showToast = useUiStore((state) => state.showToast);

  const addToCart = () => {
    addItem(product, 1);
    showToast({ title: "Added to cart", description: product.name, tone: "success" });
  };

  return (
    <article
      className={cn(
        "group relative rounded-lg border border-slate-200 bg-white p-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow-soft",
        variant === "list" && "grid gap-4 sm:grid-cols-[180px_1fr_auto]",
        variant === "compact" && "p-2",
      )}
    >
      {product.discountPercent && <Badge tone="red" className="absolute left-3 top-3 z-10 rounded-md">-{product.discountPercent}%</Badge>}
      {product.isBestSeller && <Badge tone="navy" className="absolute right-3 top-3 z-10">Best Seller</Badge>}
      <Link to={`/products/${product.slug}`} className={cn("block overflow-hidden rounded-md bg-slate-50", variant === "compact" ? "aspect-[4/3]" : "aspect-square")}>
        <img src={product.image} alt={product.name} className="h-full w-full object-contain p-3 transition duration-300 group-hover:scale-105" />
      </Link>
      <div className={cn("mt-3 min-w-0", variant === "list" && "mt-0")}>
        <div className="flex items-start justify-between gap-2">
          <Link to={`/products/${product.slug}`} className="line-clamp-2 text-sm font-extrabold text-navy-950 hover:text-amber-700">
            {product.name}
          </Link>
          <button aria-label={`Toggle wishlist for ${product.name}`} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-navy-900 hover:bg-amber-soft">
            <Heart size={18} />
          </button>
        </div>
        {variant !== "compact" && <StarRating value={product.rating} count={product.reviewCount} />}
        <div className="mt-2 flex items-center gap-2">
          <PriceDisplay price={product.price} compareAtPrice={product.compareAtPrice} size={variant === "compact" ? "sm" : "md"} />
          {product.discountPercent && <Badge className="rounded-md">Save {product.discountPercent}%</Badge>}
        </div>
        {variant === "list" && <p className="mt-2 max-w-xl text-sm text-slate-600">{product.description}</p>}
        {variant !== "compact" && <p className="mt-2 text-xs font-medium text-slate-600">Free Delivery by <strong>Mon, Oct 28</strong></p>}
      </div>
      <div className={cn("mt-3", variant === "list" && "mt-0 flex items-end")}>
        <Button variant="secondary" fullWidth onClick={addToCart}>
          <ShoppingCart size={16} />
          {variant === "compact" ? "Add" : "Add to Cart"}
        </Button>
      </div>
    </article>
  );
}
