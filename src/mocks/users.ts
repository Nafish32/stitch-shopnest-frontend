import type { Order, Review, User } from "../types/domain";

export const user: User = {
  id: "u1",
  name: "Sahad Ahmed",
  email: "sahad@example.com",
  phone: "+880 1700 000000",
  avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=80",
  addresses: [
    {
      id: "a1",
      label: "Saved Address 1",
      name: "Sahad Ahmed",
      phone: "+880 1700 000000",
      email: "sahad@example.com",
      line1: "2 Conn/siven 11, United Address.",
      city: "Dhaka",
      country: "Bangladesh",
      isDefault: true,
    },
    {
      id: "a2",
      label: "Saved Address 2",
      name: "Sahad Ahmed",
      phone: "+880 1700 000000",
      email: "sahad@example.com",
      line1: "4 Conn/siven 11, United Address.",
      city: "Dhaka",
      country: "Bangladesh",
    },
  ],
};

export const orders: Order[] = [
  {
    id: "SN-10245",
    date: "2026-05-18",
    status: "Processing",
    total: 139.99,
    estimatedDelivery: "Mon, May 25",
    lines: [
      { productId: "p2", quantity: 1, price: 24.99 },
      { productId: "p1", quantity: 1, price: 1299.99 },
    ],
    paymentMethod: "Cash on Delivery",
    note: "Pay when your order arrives.",
  },
  {
    id: "SN-10192",
    date: "2026-05-02",
    status: "Delivered",
    total: 47.98,
    estimatedDelivery: "Delivered May 07",
    lines: [{ productId: "p3", quantity: 2, price: 22.99 }],
    paymentMethod: "Cash on Delivery",
    note: "Pay when your order arrives.",
  },
];

export const reviews: Review[] = [
  { id: "r1", productId: "p1", author: "Mina", rating: 5, comment: "Fast, clean, and exactly as described.", date: "2026-05-10" },
  { id: "r2", productId: "p1", author: "Tanvir", rating: 4, comment: "Great delivery and premium feel.", date: "2026-05-12" },
  { id: "r3", productId: "p2", author: "Nadia", rating: 5, comment: "Looks sharp and paired quickly.", date: "2026-05-08" },
];
