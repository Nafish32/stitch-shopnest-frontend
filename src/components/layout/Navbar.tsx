import { Grid2X2, Heart, Menu, PackageSearch, ShoppingCart, Tag, User, X } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../../api/shopApi";
import { useCartStore } from "../../stores/cartStore";
import { useUiStore } from "../../stores/uiStore";
import { SearchBar } from "../search/SearchBar";
import { Button } from "../ui/Button";

export function Navbar() {
  const { data: categories = [] } = useQuery({ queryKey: ["categories"], queryFn: getCategories });
  const count = useCartStore((state) => state.count());
  const { isMobileMenuOpen, setMobileMenuOpen } = useUiStore();

  return (
    <header className="sticky top-0 z-40 bg-navy-950 text-white shadow-lg">
      <div className="mx-auto hidden max-w-7xl items-center justify-between border-b border-white/10 px-4 py-2 text-xs md:flex">
        <span>Language: English (US)</span>
        <div className="flex gap-6">
          <Link to="/account">Help & Contact</Link>
          <Link to="/account">My Account</Link>
          <Link to="/account">Track Order</Link>
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3">
        <Button variant="ghost" className="h-11 w-11 p-0 text-white hover:bg-white/10 md:hidden" onClick={() => setMobileMenuOpen(true)} aria-label="Open menu">
          <Menu size={22} />
        </Button>
        <Link to="/" className="font-heading text-2xl font-extrabold">
          Shop<span className="text-amber-brand">Nest</span>
        </Link>
        <div className="hidden flex-1 md:block">
          <SearchBar />
        </div>
        <nav className="ml-auto flex items-center gap-1 text-sm">
          <NavLink className="hidden min-h-11 items-center gap-2 rounded-md px-3 hover:bg-white/10 lg:flex" to="/products">
            <Grid2X2 size={18} /> All
          </NavLink>
          <NavLink className="hidden min-h-11 items-center gap-2 rounded-md px-3 hover:bg-white/10 lg:flex" to="/products?discount=15">
            <Tag size={18} /> Deals
          </NavLink>
          <NavLink className="hidden min-h-11 items-center gap-2 rounded-md px-3 hover:bg-white/10 sm:flex" to="/account">
            <User size={18} /> Account
          </NavLink>
          <NavLink className="hidden min-h-11 items-center gap-2 rounded-md px-3 hover:bg-white/10 sm:flex" to="/account">
            <Heart size={18} /> Wishlist
          </NavLink>
          <NavLink className="relative flex min-h-11 items-center gap-2 rounded-md px-3 hover:bg-white/10" to="/cart">
            <ShoppingCart size={18} /> Cart
            {count > 0 && <span className="absolute -right-1 top-0 rounded-full bg-amber-brand px-1.5 text-xs font-bold text-navy-950">{count}</span>}
          </NavLink>
        </nav>
      </div>
      <div className="mx-auto max-w-7xl px-4 pb-3 md:hidden">
        <SearchBar />
      </div>
      <div className="hidden border-t border-white/10 bg-navy-900 md:block">
        <nav className="mx-auto flex max-w-7xl items-center gap-7 overflow-x-auto px-4 text-sm font-semibold">
          {categories.slice(0, 7).map((category) => (
            <div key={category.id} className="group relative flex min-h-11 items-center">
              <NavLink to={`/products?category=${category.slug}`} className="flex min-h-11 items-center gap-1 whitespace-nowrap hover:text-amber-brand">
                {category.name}
              </NavLink>
              {category.children && (
                <div className="invisible absolute left-0 top-full z-50 min-w-56 rounded-b-lg bg-white p-3 text-navy-950 opacity-0 shadow-soft transition group-hover:visible group-hover:opacity-100">
                  {category.children.map((child) => (
                    <Link key={child.id} to={`/products?category=${child.slug}`} className="block rounded px-3 py-2 hover:bg-amber-soft">
                      {child.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-navy-950/70 md:hidden">
          <aside className="h-full w-80 max-w-[88vw] bg-white p-4 text-navy-950 shadow-soft">
            <div className="flex items-center justify-between">
              <span className="font-heading text-xl font-extrabold">Shop<span className="text-amber-brand">Nest</span></span>
              <Button variant="ghost" className="h-11 w-11 p-0" onClick={() => setMobileMenuOpen(false)} aria-label="Close menu">
                <X size={20} />
              </Button>
            </div>
            <div className="mt-6 space-y-2">
              <Link className="flex min-h-11 items-center gap-3 rounded-md px-3 hover:bg-amber-soft" to="/products" onClick={() => setMobileMenuOpen(false)}>
                <PackageSearch size={18} /> Browse products
              </Link>
              {categories.map((category) => (
                <Link key={category.id} className="flex min-h-11 items-center rounded-md px-3 font-semibold hover:bg-amber-soft" to={`/products?category=${category.slug}`} onClick={() => setMobileMenuOpen(false)}>
                  {category.name}
                </Link>
              ))}
            </div>
          </aside>
        </div>
      )}
    </header>
  );
}
