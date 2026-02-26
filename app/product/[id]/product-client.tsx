"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/lib/mock-data";
import { useCart } from "@/components/cart/cart-context";

export function ProductClient({ product }: { product: Product }) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);

  const canAdd = product.inStock && qty > 0;
  const max = useMemo(() => Math.max(1, Math.min(25, product.stockCount || 1)), [product]);

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex items-center gap-2">
        <button
          className="btn btn-ghost"
          onClick={() => setQty((q) => Math.max(1, q - 1))}
          aria-label="Decrease quantity"
        >
          −
        </button>
        <input
          className="input w-20 text-center"
          value={qty}
          onChange={(e) => {
            const n = Number(e.target.value);
            if (!Number.isFinite(n)) return;
            setQty(Math.max(1, Math.min(max, n)));
          }}
          inputMode="numeric"
        />
        <button
          className="btn btn-ghost"
          onClick={() => setQty((q) => Math.min(max, q + 1))}
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>

      <button
        className={`btn ${canAdd ? "btn-primary" : "btn-ghost opacity-50"}`}
        disabled={!canAdd}
        onClick={() => add(product, qty)}
      >
        Add to cart
      </button>

      <div className="text-xs text-zinc-500">
        Demo limit: {max} max • In production: live POS limits
      </div>
    </div>
  );
}
