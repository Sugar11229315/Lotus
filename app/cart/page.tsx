"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { MOCK_PROMOS } from "@/lib/mock-data";
import { useCart } from "@/components/cart/cart-context";

function money(n: number) {
  return n.toFixed(2);
}

export default function CartPage() {
  const { items, subtotal, setQty, remove, clear } = useCart();
  const [promo, setPromo] = useState("");
  const promoHit = useMemo(() => {
    const code = promo.trim().toUpperCase();
    return MOCK_PROMOS.find((p) => p.code === code);
  }, [promo]);

  const estimatedDelivery = subtotal > 150 ? 0 : subtotal > 0 ? 12 : 0;
  const estimatedTax = subtotal * 0.08; // preview
  const total = subtotal + estimatedDelivery + estimatedTax;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold">Your cart</h2>
          <p className="mt-1 text-sm text-zinc-400">
            Preview checkout — no real charges are processed.
          </p>
        </div>
        <div className="flex gap-2">
          <Link className="btn btn-ghost" href="/shop">
            Continue shopping
          </Link>
          {items.length ? (
            <button className="btn btn-ghost" onClick={clear}>
              Clear cart
            </button>
          ) : null}
        </div>
      </div>

      {items.length === 0 ? (
        <div className="card p-8 text-center">
          <div className="text-lg font-semibold">Cart is empty</div>
          <div className="mt-2 text-sm text-zinc-400">Let’s fix that.</div>
          <div className="mt-5">
            <Link className="btn btn-primary" href="/shop">
              Browse products
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="card overflow-hidden">
              <div className="divide-y divide-zinc-800">
                {items.map(({ product, qty }) => (
                  <div key={product.id} className="flex gap-4 p-4">
                    <div className="relative h-20 w-28 overflow-hidden rounded-2xl border border-zinc-800">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="text-sm font-semibold">{product.name}</div>
                          <div className="text-xs text-zinc-500">
                            {product.brand ? `${product.brand} • ` : ""}{product.unit}
                          </div>
                        </div>
                        <div className="text-sm font-semibold gold-text">
                          ${money(product.price * qty)}
                        </div>
                      </div>

                      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <button
                            className="btn btn-ghost"
                            onClick={() => setQty(product.id, Math.max(1, qty - 1))}
                          >
                            −
                          </button>
                          <input
                            className="input w-20 text-center"
                            value={qty}
                            onChange={(e) => {
                              const n = Number(e.target.value);
                              if (!Number.isFinite(n)) return;
                              setQty(product.id, Math.max(1, Math.min(25, n)));
                            }}
                          />
                          <button
                            className="btn btn-ghost"
                            onClick={() => setQty(product.id, Math.min(25, qty + 1))}
                          >
                            +
                          </button>
                        </div>

                        <button
                          className="text-sm text-zinc-400 hover:text-white"
                          onClick={() => remove(product.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="card p-5">
              <div className="text-sm font-semibold">Promo code (preview)</div>
              <div className="mt-3 flex gap-2">
                <input
                  className="input"
                  placeholder="e.g. LOTUS10"
                  value={promo}
                  onChange={(e) => setPromo(e.target.value)}
                />
                <button className="btn btn-ghost" type="button">
                  Apply
                </button>
              </div>
              {promoHit ? (
                <div className="mt-3 rounded-2xl border border-yellow-400/20 bg-yellow-400/10 p-3 text-sm text-zinc-200">
                  <div className="font-semibold">{promoHit.label}</div>
                  <div className="mt-1 text-xs text-zinc-400">{promoHit.details}</div>
                </div>
              ) : promo.trim() ? (
                <div className="mt-3 text-xs text-zinc-500">No match (demo only).</div>
              ) : null}
            </div>

            <div className="card p-5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-zinc-400">Subtotal</span>
                <span>${money(subtotal)}</span>
              </div>
              <div className="mt-2 flex items-center justify-between text-sm">
                <span className="text-zinc-400">Delivery (estimated)</span>
                <span>${money(estimatedDelivery)}</span>
              </div>
              <div className="mt-2 flex items-center justify-between text-sm">
                <span className="text-zinc-400">Tax (preview)</span>
                <span>${money(estimatedTax)}</span>
              </div>
              <hr className="my-4" />
              <div className="flex items-center justify-between text-base font-semibold">
                <span>Total</span>
                <span className="gold-text">${money(total)}</span>
              </div>

              <div className="mt-4">
                <Link className="btn btn-primary w-full" href="/checkout">
                  Checkout (demo)
                </Link>
                <div className="mt-2 text-xs text-zinc-500">
                  In production: PCI-compliant payments + driver dispatch.
                </div>
              </div>
            </div>

            <div className="card p-5">
              <div className="text-sm font-semibold">Why this isn’t a marketplace</div>
              <p className="mt-2 text-sm text-zinc-300">
                Lotus Mart keeps 100% of product revenue and customer ownership. IslandSprint earns
                only from delivery fees.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
