import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "../../utils/cn";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", fullWidth, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-bold transition",
          "disabled:pointer-events-none disabled:opacity-50",
          variant === "primary" && "bg-amber-brand text-navy-950 shadow-sm hover:bg-amber-400",
          variant === "secondary" && "bg-navy-900 text-white hover:bg-navy-800",
          variant === "ghost" && "bg-transparent text-navy-900 hover:bg-slate-100",
          variant === "danger" && "bg-red-600 text-white hover:bg-red-700",
          fullWidth && "w-full",
          className,
        )}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";
