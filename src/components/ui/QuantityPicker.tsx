import { Minus, Plus } from "lucide-react";
import { Button } from "./Button";

interface QuantityPickerProps {
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
}

export function QuantityPicker({ value, min = 1, max = 99, onChange }: QuantityPickerProps) {
  return (
    <div className="inline-flex overflow-hidden rounded-md border border-slate-300 bg-white">
      <Button
        aria-label="Decrease quantity"
        variant="ghost"
        className="h-11 min-h-11 w-11 rounded-none p-0"
        disabled={value <= min}
        onClick={() => onChange(Math.max(min, value - 1))}
      >
        <Minus size={16} />
      </Button>
      <span className="flex min-h-11 min-w-11 items-center justify-center border-x border-slate-300 text-sm font-bold">{value}</span>
      <Button
        aria-label="Increase quantity"
        variant="ghost"
        className="h-11 min-h-11 w-11 rounded-none p-0"
        disabled={value >= max}
        onClick={() => onChange(Math.min(max, value + 1))}
      >
        <Plus size={16} />
      </Button>
    </div>
  );
}
