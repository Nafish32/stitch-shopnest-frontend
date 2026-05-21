import type { HTMLAttributes } from "react";
import { cn } from "../../utils/cn";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: "amber" | "navy" | "red" | "blue" | "slate";
}

export function Badge({ className, tone = "amber", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex min-h-6 items-center rounded-full px-2.5 text-xs font-bold",
        tone === "amber" && "bg-amber-soft text-navy-950",
        tone === "navy" && "bg-navy-900 text-white",
        tone === "red" && "bg-red-600 text-white",
        tone === "blue" && "bg-sky-100 text-navy-900",
        tone === "slate" && "bg-slate-100 text-slate-700",
        className,
      )}
      {...props}
    />
  );
}
