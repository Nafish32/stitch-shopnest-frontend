import { categories } from "../mocks/categories";
import { coupons } from "../mocks/coupons";
import { products } from "../mocks/products";
import { orders, reviews, user } from "../mocks/users";
import type { Coupon, FilterState, Order, Product, Review, SearchSuggestion, SortOption, User } from "../types/domain";

const delay = async (ms = 360) => new Promise((resolve) => window.setTimeout(resolve, ms));

export interface ProductListParams {
  query?: string;
  filters?: Partial<FilterState>;
  sort?: SortOption;
  page?: number;
  pageSize?: number;
}

export interface ProductListResponse {
  products: Product[];
  total: number;
  page: number;
  pageSize: number;
}

const normalize = (value: string) => value.trim().toLowerCase();

function applyFilters(items: Product[], params: ProductListParams) {
  let result = [...items];
  const query = normalize(params.query ?? "");
  const filters = params.filters;

  if (query) {
    result = result.filter((product) =>
      [product.name, product.brand, product.category].some((value) => normalize(value).includes(query)),
    );
  }

  if (filters?.categories?.length) {
    result = result.filter((product) => filters.categories?.includes(product.category));
  }
  if (filters?.brands?.length) {
    result = result.filter((product) => filters.brands?.includes(product.brand));
  }
  if (filters?.rating) {
    result = result.filter((product) => product.rating >= Number(filters.rating));
  }
  if (filters?.availability && filters.availability !== "all") {
    result = result.filter((product) => (filters.availability === "in-stock" ? product.stock > 0 : product.stock === 0));
  }
  if (filters?.priceMin !== undefined) {
    result = result.filter((product) => product.price >= Number(filters.priceMin));
  }
  if (filters?.priceMax !== undefined) {
    result = result.filter((product) => product.price <= Number(filters.priceMax));
  }
  if (filters?.delivery?.length) {
    result = result.filter((product) => filters.delivery?.some((delivery) => product.delivery.includes(delivery)));
  }
  if (filters?.conditions?.length) {
    result = result.filter((product) => filters.conditions?.includes(product.condition));
  }
  if (filters?.discounts?.length) {
    result = result.filter((product) => filters.discounts?.some((discount) => (product.discountPercent ?? 0) >= discount));
  }

  switch (params.sort) {
    case "price-low-high":
      result.sort((a, b) => a.price - b.price);
      break;
    case "price-high-low":
      result.sort((a, b) => b.price - a.price);
      break;
    case "rating":
      result.sort((a, b) => b.rating - a.rating);
      break;
    case "newest":
      result.sort((a, b) => b.id.localeCompare(a.id));
      break;
    default:
      result.sort((a, b) => Number(Boolean(b.isBestSeller)) - Number(Boolean(a.isBestSeller)));
  }

  return result;
}

export async function getCategories() {
  await delay();
  return categories;
}

export async function getProducts(params: ProductListParams = {}): Promise<ProductListResponse> {
  await delay();
  const page = params.page ?? 1;
  const pageSize = params.pageSize ?? 16;
  const filtered = applyFilters(products, params);
  const start = (page - 1) * pageSize;
  return {
    products: filtered.slice(start, start + pageSize),
    total: filtered.length,
    page,
    pageSize,
  };
}

export async function getProduct(slug: string): Promise<Product> {
  await delay();
  const product = products.find((item) => item.slug === slug);
  if (!product) {
    throw new Error("Product not found");
  }
  return product;
}

export async function searchSuggestions(query: string): Promise<SearchSuggestion[]> {
  await delay(220);
  const recent = normalize(query);
  if (!recent) {
    return [];
  }
  return products
    .filter((product) => normalize(product.name).includes(recent) || normalize(product.brand).includes(recent))
    .slice(0, 6)
    .map((product) => ({
      id: product.id,
      label: product.name,
      type: "product",
      href: `/products/${product.slug}`,
    }));
}

export async function getReviews(productId: string): Promise<Review[]> {
  await delay();
  return reviews.filter((review) => review.productId === productId);
}

export async function getUser(): Promise<User> {
  await delay();
  return user;
}

export async function getOrders(): Promise<Order[]> {
  await delay();
  return orders;
}

export async function validateCoupon(code: string): Promise<Coupon> {
  await delay(200);
  const coupon = coupons.find((item) => item.code.toLowerCase() === code.toLowerCase());
  if (!coupon) {
    throw new Error("Coupon code was not found.");
  }
  return coupon;
}

export function getProductSync(productId: string) {
  return products.find((product) => product.id === productId);
}
