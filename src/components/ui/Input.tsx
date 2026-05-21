import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "../../utils/cn";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ className, label, error, id, ...props }, ref) => {
  const inputId = id ?? props.name;
  return (
    <label className="block text-sm font-semibold text-navy-950" htmlFor={inputId}>
      {label && <span className="mb-1 block">{label}</span>}
      <input
        ref={ref}
        id={inputId}
        className={cn(
          "min-h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-navy-950",
          "placeholder:text-slate-400 focus:border-amber-brand",
          error && "border-red-500",
          className,
        )}
        {...props}
      />
      {error && <span className="mt-1 block text-xs text-red-600">{error}</span>}
    </label>
  );
});

Input.displayName = "Input";
