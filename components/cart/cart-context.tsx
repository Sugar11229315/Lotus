"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Product } from "@/lib/mock-data";

export type CartItem = {
  product: Product;
  qty: number;
};

type CartState = {
  items: CartItem[];
  add: (product: Product, qty?: number) => void;
  remove: (productId: string) => void;
  setQty: (productId: string, qty: number) => void;
  clear: () => void;
  subtotal: number;
  itemCount: number;
};

const CartContext = createContext<CartState | null>(null);

const STORAGE_KEY = "lotusmartgd_preview_cart_v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items]);

  const add = (product: Product, qty = 1) => {
    setItems((prev) => {
      const next = [...prev];
      const idx = next.findIndex((i) => i.product.id === product.id);
      if (idx >= 0) {
        next[idx] = { ...next[idx], qty: next[idx].qty + qty };
        return next;
      }
      return [...next, { product, qty }];
    });
  };

  const remove = (productId: string) => {
    setItems((prev) => prev.filter((i) => i.product.id !== productId));
  };

  const setQty = (productId: string, qty: number) => {
    setItems((prev) =>
      prev
        .map((i) => (i.product.id === productId ? { ...i, qty } : i))
        .filter((i) => i.qty > 0)
    );
  };

  const clear = () => setItems([]);

  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + i.product.price * i.qty, 0),
    [items]
  );
  const itemCount = useMemo(() => items.reduce((n, i) => n + i.qty, 0), [items]);

  const value: CartState = {
    items,
    add,
    remove,
    setQty,
    clear,
    subtotal,
    itemCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
