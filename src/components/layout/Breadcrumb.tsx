import { ChevronRight, Home } from "lucide-react";
import { Link } from "react-router-dom";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="flex min-h-11 items-center gap-2 text-sm text-slate-600">
      <Link to="/" className="flex items-center gap-1 hover:text-navy-950">
        <Home size={15} /> Home
      </Link>
      {items.map((item) => (
        <span key={item.label} className="flex items-center gap-2">
          <ChevronRight size={15} />
          {item.href ? <Link to={item.href} className="hover:text-navy-950">{item.label}</Link> : <span className="font-bold text-navy-950">{item.label}</span>}
        </span>
      ))}
    </nav>
  );
}
