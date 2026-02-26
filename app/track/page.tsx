"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { ORDER_STORAGE_KEY, type Order } from "@/lib/order-store";

export default function TrackIndexPage() {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(ORDER_STORAGE_KEY);
      setOrders(raw ? JSON.parse(raw) : []);
    } catch {
      setOrders([]);
    }
  }, []);

  const recent = useMemo(() => orders.slice(0, 3), [orders]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Track your order (demo)</h2>
        <p className="mt-1 text-sm text-zinc-400">
          Enter your order ID. If you just checked out, your latest order will appear below.
        </p>
      </div>

      <div className="card p-5">
        <div className="flex flex-wrap gap-2">
          <input
            className="input flex-1"
            placeholder="e.g. LM-ABCD-1234"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button
            className="btn btn-primary"
            onClick={() => {
              const id = value.trim();
              if (!id) return;
              router.push(`/track/${encodeURIComponent(id)}`);
            }}
          >
            Track
          </button>
        </div>
        <div className="mt-3 text-xs text-zinc-500">
          Demo orders are stored in your browser only.
        </div>
      </div>

      {recent.length ? (
        <div className="card p-5">
          <div className="text-sm font-semibold">Recent demo orders</div>
          <div className="mt-3 grid gap-2">
            {recent.map((o) => (
              <Link
                key={o.id}
                href={`/track/${encodeURIComponent(o.id)}`}
                className="flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-950/40 px-4 py-3 text-sm hover:bg-zinc-900/40"
              >
                <span className="font-semibold">{o.id}</span>
                <span className="text-zinc-400">
                  {new Date(o.createdAt).toLocaleString()}
                </span>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <div className="card p-6 text-sm text-zinc-300">
          No demo orders yet. Place one via <Link className="gold-text" href="/shop">Shop</Link> →
          Cart → Checkout.
        </div>
      )}
    </div>
  );
}
