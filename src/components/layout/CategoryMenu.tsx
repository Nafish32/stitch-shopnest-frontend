import { Baby, BookOpen, Gamepad2, Home, Laptop, Shirt, Sparkles, Trophy } from "lucide-react";
import { Link } from "react-router-dom";
import type { Category } from "../../types/domain";

const icons = { Laptop, Shirt, Home, Sparkles, Trophy, Gamepad2, BookOpen, Baby };

interface CategoryMenuProps {
  categories: Category[];
}

export function CategoryMenu({ categories }: CategoryMenuProps) {
  return (
    <section className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-7">
      {categories.slice(0, 7).map((category) => {
        const Icon = icons[category.icon as keyof typeof icons] ?? Laptop;
        return (
          <Link key={category.id} to={`/products?category=${category.slug}`} className="group flex flex-col items-center gap-2">
            <span className="flex h-20 w-20 items-center justify-center rounded-xl bg-amber-brand text-navy-950 shadow-sm transition group-hover:-translate-y-1 group-hover:bg-amber-400">
              <Icon size={34} />
            </span>
            <span className="text-sm font-bold">{category.name}</span>
          </Link>
        );
      })}
    </section>
  );
}
