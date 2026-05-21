interface PriceDisplayProps {
  price: number;
  compareAtPrice?: number;
  size?: "sm" | "md" | "lg";
}

export function PriceDisplay({ price, compareAtPrice, size = "md" }: PriceDisplayProps) {
  const priceClass = size === "lg" ? "text-2xl" : size === "sm" ? "text-sm" : "text-base";
  return (
    <div className="flex flex-wrap items-baseline gap-2">
      <span className={`price-font font-bold text-navy-950 ${priceClass}`}>${price.toFixed(2)}</span>
      {compareAtPrice && <span className="price-font text-xs font-semibold text-slate-400 line-through">${compareAtPrice.toFixed(2)}</span>}
    </div>
  );
}
