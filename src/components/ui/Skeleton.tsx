import { cn } from "../../utils/cn";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return <div className={cn("animate-pulse rounded-md bg-slate-200", className)} aria-hidden="true" />;
}

export function ProductCardSkeleton() {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-3">
      <Skeleton className="aspect-square w-full" />
      <Skeleton className="mt-3 h-4 w-4/5" />
      <Skeleton className="mt-2 h-3 w-3/5" />
      <Skeleton className="mt-4 h-9 w-full" />
    </div>
  );
}
