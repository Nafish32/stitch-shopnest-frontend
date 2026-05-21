import type { Category } from "../types/domain";

export const categories: Category[] = [
  { id: "electronics", name: "Electronics", slug: "electronics", icon: "Laptop", children: [
    { id: "laptops", name: "Laptops", slug: "laptops", icon: "Laptop" },
    { id: "audio", name: "Audio", slug: "audio", icon: "Headphones" },
    { id: "wearables", name: "Wearables", slug: "wearables", icon: "Watch" },
  ] },
  { id: "fashion", name: "Fashion", slug: "fashion", icon: "Shirt" },
  { id: "home", name: "Home", slug: "home", icon: "Home" },
  { id: "beauty", name: "Beauty", slug: "beauty", icon: "Sparkles" },
  { id: "sports", name: "Sports", slug: "sports", icon: "Trophy" },
  { id: "toys", name: "Toys", slug: "toys", icon: "Gamepad2" },
  { id: "books", name: "Books", slug: "books", icon: "BookOpen" },
];
