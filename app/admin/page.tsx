"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { PRODUCTS, type Product } from "@/lib/mock-data";
import { ORDER_STORAGE_KEY, type Order, type OrderStatus } from "@/lib/order-store";

function money(n: number) {
  return n.toFixed(2);
}

const STATUSES: OrderStatus[] = ["Placed", "Picking", "Ready", "Out for delivery", "Delivered"]; 

export default function AdminPage() {
  const [inventory, setInventory] = useState<Product[]>(PRODUCTS);
  const [orders, setOrders] = useState<Order[]>([]);
  const [lastSync, setLastSync] = useState<Date | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(ORDER_STORAGE_KEY);
      setOrders(raw ? JSON.parse(raw) : []);
    } catch {
      setOrders([]);
    }
  }, []);

  const syncPOS = () => {
    // Demo: randomly adjust stock and toggle out-of-stock
    setInventory((prev) =>
      prev.map((p) => {
        const delta = Math.floor(Math.random() * 6) - 2; // -2..+3
        const nextCount = Math.max(0, p.stockCount + delta);
        return {
          ...p,
          stockCount: nextCount,
          inStock: nextCount > 0,
        };
      })
    );
    setLastSync(new Date());
  };

  const updateOrderStatus = (id: string, status: OrderStatus) => {
    setOrders((prev) => {
      const next = prev.map((o) => (o.id === id ? { ...o, status } : o));
      try {
        localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const totals = useMemo(() => {
    const revenue = orders.reduce((sum, o) => sum + o.subtotal, 0);
    const deliveryFees = orders.reduce((sum, o) => sum + o.deliveryFee, 0);
    return { revenue, deliveryFees, count: orders.length };
  }, [orders]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="badge badge-gold">Admin Console (Demo)</div>
          <h2 className="mt-3 text-2xl font-semibold">Lotus Mart Ops Dashboard</h2>
          <p className="mt-1 text-sm text-zinc-400">
            Preview of POS sync + order workflow + dispatch monitoring.
          </p>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-primary" onClick={syncPOS}>
            Run POS sync (demo)
          </button>
          <Link className="btn btn-ghost" href="/shop">
            View store
          </Link>
        </div>
      </div>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="card p-5">
          <div className="text-sm text-zinc-400">Orders (demo)</div>
          <div className="mt-1 text-2xl font-semibold gold-text">{totals.count}</div>
          <div className="mt-2 text-xs text-zinc-500">
            Stored in the browser only.
          </div>
        </div>
        <div className="card p-5">
          <div className="text-sm text-zinc-400">Product revenue (Lotus Mart)</div>
          <div className="mt-1 text-2xl font-semibold gold-text">${money(totals.revenue)}</div>
          <div className="mt-2 text-xs text-zinc-500">
            In production: accurate reporting and exports.
          </div>
        </div>
        <div className="card p-5">
          <div className="text-sm text-zinc-400">Delivery fees (pool)</div>
          <div className="mt-1 text-2xl font-semibold gold-text">${money(totals.deliveryFees)}</div>
          <div className="mt-2 text-xs text-zinc-500">
            IslandSprint earns from delivery fees (per agreement).
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="card p-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-lg font-semibold gold-text">Inventory sync</div>
              <div className="mt-1 text-sm text-zinc-400">
                Demo of real-time POS inventory synchronization.
              </div>
            </div>
            <div className="text-xs text-zinc-500">
              Last sync: {lastSync ? lastSync.toLocaleTimeString() : "—"}
            </div>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-zinc-300">
                <tr>
                  <th className="border-b border-zinc-800 pb-2 pr-4">SKU</th>
                  <th className="border-b border-zinc-800 pb-2 pr-4">Product</th>
                  <th className="border-b border-zinc-800 pb-2 pr-4">Category</th>
                  <th className="border-b border-zinc-800 pb-2 pr-4">Stock</th>
                  <th className="border-b border-zinc-800 pb-2">Status</th>
                </tr>
              </thead>
              <tbody className="text-zinc-300">
                {inventory.map((p) => (
                  <tr key={p.id}>
                    <td className="border-b border-zinc-900 py-3 pr-4 text-zinc-400">{p.id.toUpperCase()}</td>
                    <td className="border-b border-zinc-900 py-3 pr-4 font-semibold">{p.name}</td>
                    <td className="border-b border-zinc-900 py-3 pr-4 text-zinc-400">{p.category}</td>
                    <td className="border-b border-zinc-900 py-3 pr-4">{p.stockCount}</td>
                    <td className="border-b border-zinc-900 py-3">
                      {p.inStock ? (
                        <span className="badge badge-gold">In stock</span>
                      ) : (
                        <span className="badge border-red-500/30 bg-red-500/10 text-red-200">Out</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card p-6">
          <div className="text-lg font-semibold gold-text">Order management</div>
          <div className="mt-1 text-sm text-zinc-400">
            Change an order status to preview the workflow.
          </div>

          {orders.length === 0 ? (
            <div className="mt-4 rounded-2xl border border-zinc-800 bg-zinc-950/40 p-4 text-sm text-zinc-300">
              No demo orders yet. Create one via <Link className="gold-text" href="/shop">Shop</Link> → Cart → Checkout.
            </div>
          ) : (
            <div className="mt-4 space-y-3">
              {orders.slice(0, 8).map((o) => (
                <div key={o.id} className="rounded-2xl border border-zinc-800 bg-zinc-950/40 p-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="text-sm font-semibold">{o.id}</div>
                      <div className="mt-1 text-xs text-zinc-500">
                        {new Date(o.createdAt).toLocaleString()} • {o.items.length} items
                      </div>
                    </div>
                    <Link className="btn btn-ghost" href={`/track/${encodeURIComponent(o.id)}`}>
                      View tracking
                    </Link>
                  </div>

                  <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                    <div className="text-sm text-zinc-400">
                      Total: <span className="text-zinc-200">${money(o.total)}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {STATUSES.map((s) => (
                        <button
                          key={s}
                          className={`rounded-2xl border px-3 py-2 text-xs transition ${
                            o.status === s
                              ? "border-yellow-400/40 bg-yellow-400/10 text-yellow-200"
                              : "border-zinc-800 bg-zinc-950/40 text-zinc-300 hover:bg-zinc-900/40"
                          }`}
                          onClick={() => updateOrderStatus(o.id, s)}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mt-3 text-xs text-zinc-500">
                    In production: status updates propagate to customer via SMS/email + push.
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="card p-6">
        <div className="text-lg font-semibold gold-text">Delivery dispatch (preview)</div>
        <div className="mt-2 grid gap-3 md:grid-cols-3">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950/40 p-4">
            <div className="text-sm font-semibold">Auto-assignment</div>
            <div className="mt-1 text-sm text-zinc-400">Nearest available driver is selected.</div>
          </div>
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950/40 p-4">
            <div className="text-sm font-semibold">Route optimization</div>
            <div className="mt-1 text-sm text-zinc-400">Batching + ETAs for fast delivery.</div>
          </div>
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950/40 p-4">
            <div className="text-sm font-semibold">Proof of delivery</div>
            <div className="mt-1 text-sm text-zinc-400">Photo/signature capture + audit trail.</div>
          </div>
        </div>
      </section>
    </div>
  );
}
