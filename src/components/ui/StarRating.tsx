import { Star } from "lucide-react";

interface StarRatingProps {
  value: number;
  count?: number;
  size?: number;
}

export function StarRating({ value, count, size = 14 }: StarRatingProps) {
  return (
    <div className="flex items-center gap-1" aria-label={`${value.toFixed(1)} out of 5 stars`}>
      <div className="flex">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star
            key={index}
            size={size}
            className={index + 1 <= Math.round(value) ? "fill-amber-brand text-amber-brand" : "fill-slate-200 text-slate-200"}
          />
        ))}
      </div>
      {count !== undefined && <span className="text-xs text-slate-500">({count})</span>}
    </div>
  );
}
