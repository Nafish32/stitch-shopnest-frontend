import { Compass } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { EmptyState } from "../components/ui/EmptyState";

export function NotFoundPage() {
  const navigate = useNavigate();
  return <main className="mx-auto max-w-7xl px-4 py-12"><EmptyState icon={<Compass />} title="Page not found" message="That page is not part of the ShopNest storefront." actionLabel="Go home" onAction={() => navigate("/")} /></main>;
}
