import { ChevronDown, SlidersHorizontal, X } from "lucide-react";
import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useUiStore } from "../../stores/uiStore";
import type { DeliveryOption, FilterState, ProductCondition } from "../../types/domain";
import { Button } from "../ui/Button";

const brands = ["Dell", "HP", "Apple", "Lenovo", "ASUS", "Suntownoles"];
const deliveries: DeliveryOption[] = ["Free Delivery", "Standard", "Express"];
const conditions: ProductCondition[] = ["New", "Open Box", "Refurbished"];
const categoryOptions = ["laptops", "audio", "wearables", "electronics", "fashion", "home", "beauty"];
const discounts = [10, 15, 30, 50];

export function readFilters(params: URLSearchParams): FilterState {
  return {
    categories: params.getAll("category"),
    priceMin: Number(params.get("min") ?? 0),
    priceMax: Number(params.get("max") ?? 3000),
    rating: Number(params.get("rating") ?? 0),
    brands: params.getAll("brand"),
    availability: (params.get("availability") as FilterState["availability"]) ?? "all",
    delivery: params.getAll("delivery") as DeliveryOption[],
    discounts: params.getAll("discount").map(Number),
    conditions: params.getAll("condition") as ProductCondition[],
  };
}

interface FilterSidebarProps {
  mobile?: boolean;
}

export function FilterSidebar({ mobile = false }: FilterSidebarProps) {
  const [params, setParams] = useSearchParams();
  const { isFilterOpen, setFilterOpen } = useUiStore();
  const filters = useMemo(() => readFilters(params), [params]);

  const setParamList = (key: string, value: string, checked: boolean) => {
    const next = new URLSearchParams(params);
    const values = next.getAll(key).filter((item) => item !== value);
    next.delete(key);
    [...values, ...(checked ? [value] : [])].forEach((item) => next.append(key, item));
    next.set("page", "1");
    setParams(next);
  };

  const setSingle = (key: string, value: string) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    next.set("page", "1");
    setParams(next);
  };

  const content = (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-lg font-bold">Filters</h2>
        {mobile && <Button variant="ghost" className="h-11 w-11 p-0" onClick={() => setFilterOpen(false)} aria-label="Close filters"><X size={20} /></Button>}
      </div>
      <FilterGroup title="Category">
        {categoryOptions.map((category) => (
          <Checkbox key={category} label={category} checked={filters.categories.includes(category)} onChange={(checked) => setParamList("category", category, checked)} />
        ))}
      </FilterGroup>
      <FilterGroup title="Price Range">
        <div className="space-y-3">
          <div className="rounded-md bg-amber-soft px-3 py-2 text-sm font-bold">${filters.priceMin} - ${filters.priceMax}</div>
          <input aria-label="Minimum price" type="range" min={0} max={3000} step={50} value={filters.priceMin} onChange={(e) => setSingle("min", e.target.value)} className="w-full accent-amber-brand" />
          <input aria-label="Maximum price" type="range" min={0} max={3000} step={50} value={filters.priceMax} onChange={(e) => setSingle("max", e.target.value)} className="w-full accent-amber-brand" />
          <div className="flex justify-between text-xs font-bold"><span>$0</span><span>$3000</span></div>
        </div>
      </FilterGroup>
      <FilterGroup title="Brand">
        {brands.map((brand) => <Checkbox key={brand} label={brand} checked={filters.brands.includes(brand)} onChange={(checked) => setParamList("brand", brand, checked)} />)}
      </FilterGroup>
      <FilterGroup title="Rating">
        {[5, 4, 3].map((rating) => (
          <label key={rating} className="flex min-h-11 items-center gap-2 text-sm">
            <input type="radio" name="rating" checked={filters.rating === rating} onChange={() => setSingle("rating", String(rating))} className="accent-amber-brand" />
            <span className="text-amber-500">★★★★★</span> {rating === 5 ? "5" : `${rating}&up`}
          </label>
        ))}
      </FilterGroup>
      <FilterGroup title="Availability">
        {["in-stock", "out-of-stock"].map((availability) => (
          <label key={availability} className="flex min-h-11 items-center gap-2 text-sm">
            <input type="radio" name="availability" checked={filters.availability === availability} onChange={() => setSingle("availability", availability)} className="accent-amber-brand" />
            {availability === "in-stock" ? "In Stock" : "Out of Stock"}
          </label>
        ))}
      </FilterGroup>
      <FilterGroup title="Delivery">
        {deliveries.map((delivery) => <Checkbox key={delivery} label={delivery} checked={filters.delivery.includes(delivery)} onChange={(checked) => setParamList("delivery", delivery, checked)} />)}
      </FilterGroup>
      <FilterGroup title="Discount">
        {discounts.map((discount) => <Checkbox key={discount} label={`${discount}% or more`} checked={filters.discounts.includes(discount)} onChange={(checked) => setParamList("discount", String(discount), checked)} />)}
      </FilterGroup>
      <FilterGroup title="Condition">
        {conditions.map((condition) => <Checkbox key={condition} label={condition} checked={filters.conditions.includes(condition)} onChange={(checked) => setParamList("condition", condition, checked)} />)}
      </FilterGroup>
      <Button variant="ghost" fullWidth onClick={() => setParams(new URLSearchParams())}>Clear filters</Button>
    </div>
  );

  if (mobile) {
    return isFilterOpen ? (
      <div className="fixed inset-0 z-50 bg-navy-950/70 lg:hidden">
        <aside className="absolute bottom-0 max-h-[86vh] w-full overflow-y-auto rounded-t-2xl bg-white p-5">{content}</aside>
      </div>
    ) : null;
  }

  return (
    <aside className="hidden rounded-lg bg-slate-50 p-5 lg:block">
      {content}
    </aside>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-b border-slate-200 pb-4">
      <h3 className="mb-3 flex items-center justify-between font-heading text-base font-bold">
        {title}
        <ChevronDown size={17} />
      </h3>
      <div className="space-y-1">{children}</div>
    </section>
  );
}

function Checkbox({ label, checked, onChange }: { label: string; checked: boolean; onChange: (checked: boolean) => void }) {
  return (
    <label className="flex min-h-11 items-center gap-2 text-sm capitalize">
      <input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} className="accent-amber-brand" />
      {label}
    </label>
  );
}

export function FilterButton() {
  const setFilterOpen = useUiStore((state) => state.setFilterOpen);
  return (
    <Button variant="secondary" onClick={() => setFilterOpen(true)} className="lg:hidden">
      <SlidersHorizontal size={17} /> Filters
    </Button>
  );
}
