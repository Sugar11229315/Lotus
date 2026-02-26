"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { Product } from "@/lib/mock-data";
import { useCart } from "@/components/cart/cart-context";

export function ShopClient({
  products,
  categories,
}: {
  products: Product[];
  categories: string[];
}) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>("All");
  const [onlyInStock, setOnlyInStock] = useState(false);
  const { add } = useCart();

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return products
      .filter((p) => (cat === "All" ? true : p.category === cat))
      .filter((p) => (onlyInStock ? p.inStock : true))
      .filter((p) => {
        if (!query) return true;
        return (
          p.name.toLowerCase().includes(query) ||
          p.brand?.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query)
        );
      });
  }, [q, cat, onlyInStock, products]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold">Shop Lotus Mart</h2>
          <p className="mt-1 text-sm text-zinc-400">
            Inventory is a preview — in the real build, this list will reflect live POS stock.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search products…"
            className="input w-60"
          />
          <select
            value={cat}
            onChange={(e) => setCat(e.target.value)}
            className="input w-48"
          >
            <option>All</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <label className="flex items-center gap-2 rounded-2xl border border-zinc-800 bg-zinc-950/40 px-3 py-2 text-sm text-zinc-300">
            <input
              type="checkbox"
              checked={onlyInStock}
              onChange={(e) => setOnlyInStock(e.target.checked)}
            />
            In stock
          </label>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => (
          <div key={p.id} className="card overflow-hidden">
            <Link href={`/product/${p.id}`} className="block">
              <div className="relative aspect-[4/3]">
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
                <div className="absolute left-3 top-3 flex gap-2">
                  {p.badge ? <span className="badge badge-gold">{p.badge}</span> : null}
                  {!p.inStock ? (
                    <span className="badge border-red-500/30 bg-red-500/10 text-red-200">
                      Out of stock
                    </span>
                  ) : null}
                </div>
              </div>
            </Link>

            <div className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold">{p.name}</div>
                  <div className="text-xs text-zinc-500">
                    {p.brand ? `${p.brand} • ` : ""}{p.category}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold gold-text">
                    ${p.price.toFixed(2)}
                  </div>
                  <div className="text-xs text-zinc-500">per {p.unit}</div>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between">
                <div className="text-xs text-zinc-500">
                  Stock: <span className="text-zinc-300">{p.inStock ? p.stockCount : 0}</span>
                </div>
                <button
                  className={`btn ${p.inStock ? "btn-primary" : "btn-ghost opacity-50"}`}
                  disabled={!p.inStock}
                  onClick={() => add(p, 1)}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="card p-6 text-sm text-zinc-300">
          No matches. Try a different search or category.
        </div>
      ) : null}
    </div>
  );
}
