import type { CartItem } from "@/components/cart/cart-context";

export type OrderStatus = "Placed" | "Picking" | "Ready" | "Out for delivery" | "Delivered";

export type Order = {
  id: string;
  createdAt: string;
  customer: {
    name: string;
    phone: string;
    address: string;
    notes?: string;
  };
  deliveryWindow: string;
  paymentMethod: "Card" | "Cash";
  items: { id: string; name: string; price: number; qty: number }[];
  subtotal: number;
  deliveryFee: number;
  tax: number;
  total: number;
  status: OrderStatus;
  timeline: { label: OrderStatus; at: string; detail?: string }[];
};

export const ORDER_STORAGE_KEY = "lotusmartgd_preview_orders_v1";

export function makeOrderId() {
  const now = Date.now().toString(36).toUpperCase();
  const rnd = Math.floor(Math.random() * 1e6)
    .toString(36)
    .toUpperCase();
  return `LM-${now}-${rnd}`;
}

export function cartToOrderItems(items: CartItem[]) {
  return items.map((i) => ({
    id: i.product.id,
    name: i.product.name,
    price: i.product.price,
    qty: i.qty,
  }));
}

export function computeTotals(subtotal: number) {
  const deliveryFee = subtotal > 150 ? 0 : subtotal > 0 ? 12 : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + deliveryFee + tax;
  return { deliveryFee, tax, total };
}
