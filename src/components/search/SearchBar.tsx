import { useQuery } from "@tanstack/react-query";
import { Clock, Search, X } from "lucide-react";
import { useEffect, useMemo, useState, type KeyboardEvent } from "react";
import { useNavigate } from "react-router-dom";
import { searchSuggestions } from "../../api/shopApi";
import { cn } from "../../utils/cn";
import { Button } from "../ui/Button";
import { Skeleton } from "../ui/Skeleton";

const RECENT_KEY = "shopnest-recent-searches";

function readRecent() {
  try {
    const raw = localStorage.getItem(RECENT_KEY);
    const parsed = raw ? (JSON.parse(raw) as string[]) : [];
    return parsed.slice(0, 5);
  } catch {
    return [];
  }
}

function writeRecent(value: string) {
  const next = [value, ...readRecent().filter((item) => item.toLowerCase() !== value.toLowerCase())].slice(0, 5);
  localStorage.setItem(RECENT_KEY, JSON.stringify(next));
}

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [debounced, setDebounced] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [recent, setRecent] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => setRecent(readRecent()), []);
  useEffect(() => {
    const timer = window.setTimeout(() => setDebounced(query), 250);
    return () => window.clearTimeout(timer);
  }, [query]);

  const suggestionsQuery = useQuery({
    queryKey: ["search", debounced],
    queryFn: () => searchSuggestions(debounced),
    enabled: debounced.length > 1,
  });

  const options = useMemo(() => {
    if (debounced.length > 1) return suggestionsQuery.data ?? [];
    return recent.map((item) => ({ id: item, label: item, type: "product" as const, href: `/products?query=${encodeURIComponent(item)}` }));
  }, [debounced.length, recent, suggestionsQuery.data]);

  const submit = (value = query) => {
    const trimmed = value.trim();
    if (!trimmed) return;
    writeRecent(trimmed);
    setRecent(readRecent());
    setIsOpen(false);
    navigate(`/products?query=${encodeURIComponent(trimmed)}`);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((index) => Math.min(index + 1, options.length - 1));
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((index) => Math.max(index - 1, -1));
    }
    if (event.key === "Escape") {
      setIsOpen(false);
      setActiveIndex(-1);
    }
    if (event.key === "Enter") {
      event.preventDefault();
      const option = activeIndex >= 0 ? options[activeIndex] : undefined;
      if (option) {
        writeRecent(option.label);
        navigate(option.href);
        setIsOpen(false);
      } else {
        submit();
      }
    }
  };

  return (
    <div className="relative w-full">
      <div className="flex overflow-hidden rounded-md bg-white shadow-sm ring-1 ring-slate-200">
        <input
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setIsOpen(true);
            setActiveIndex(-1);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={onKeyDown}
          className="min-h-11 flex-1 border-0 px-4 text-sm text-navy-950 outline-none"
          placeholder="Search for products, brands, and more..."
          aria-label="Search products"
        />
        {query && (
          <Button aria-label="Clear search" variant="ghost" className="h-11 w-11 rounded-none p-0" onClick={() => setQuery("")}>
            <X size={17} />
          </Button>
        )}
        <Button aria-label="Search" className="h-11 rounded-l-none rounded-r-md px-4" onClick={() => submit()}>
          <Search size={18} />
        </Button>
      </div>

      {isOpen && (query.length > 1 || recent.length > 0) && (
        <div className="absolute left-0 right-0 top-full z-40 mt-2 rounded-lg border border-slate-200 bg-white p-2 shadow-soft">
          {suggestionsQuery.isLoading && query.length > 1 ? (
            <div className="space-y-2 p-2">
              <Skeleton className="h-9 w-full" />
              <Skeleton className="h-9 w-4/5" />
            </div>
          ) : suggestionsQuery.isError ? (
            <div className="p-3 text-sm text-red-700">
              Search failed. <button className="font-bold underline" onClick={() => suggestionsQuery.refetch()}>Try again</button>
            </div>
          ) : options.length ? (
            <ul role="listbox" aria-label="Search suggestions">
              {options.map((option, index) => (
                <li key={option.id}>
                  <button
                    className={cn("flex min-h-11 w-full items-center gap-3 rounded-md px-3 text-left text-sm", activeIndex === index && "bg-amber-soft")}
                    onMouseEnter={() => setActiveIndex(index)}
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => {
                      writeRecent(option.label);
                      navigate(option.href);
                      setIsOpen(false);
                    }}
                  >
                    {debounced.length > 1 ? <Search size={16} /> : <Clock size={16} />}
                    <span className="font-medium">{option.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-3 text-sm text-slate-600">No matching products found. Try “laptop” or “watch”.</div>
          )}
        </div>
      )}
    </div>
  );
}
