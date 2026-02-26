"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ORDER_STORAGE_KEY, type Order, type OrderStatus } from "@/lib/order-store";

function statusIndex(s: OrderStatus) {
  return ["Placed", "Picking", "Ready", "Out for delivery", "Delivered"].indexOf(s);
}

export default function TrackOrderPage({ params }: { params: { orderId: string } }) {
  const orderId = decodeURIComponent(params.orderId);
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(ORDER_STORAGE_KEY);
      const list: Order[] = raw ? JSON.parse(raw) : [];
      setOrder(list.find((o) => o.id === orderId) ?? null);
    } catch {
      setOrder(null);
    }
  }, [orderId]);

  const derivedStatus = useMemo(() => {
    if (!order) return null;
    const now = Date.now();
    const idx = order.timeline.reduce((i, step, j) => {
      if (new Date(step.at).getTime() <= now) return j;
      return i;
    }, 0);
    return order.timeline[Math.max(0, idx)]?.label ?? order.status;
  }, [order]);

  if (!order) {
    return (
      <div className="space-y-4">
        <div className="card p-8 text-center">
          <div className="text-lg font-semibold">Order not found</div>
          <div className="mt-2 text-sm text-zinc-400">
            This demo stores orders only in your browser. Try tracking from the same device.
          </div>
          <div className="mt-5 flex justify-center gap-2">
            <Link className="btn btn-primary" href="/track">
              Back to tracking
            </Link>
            <Link className="btn btn-ghost" href="/shop">
              Shop
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const current = derivedStatus ?? order.status;
  const currentIdx = statusIndex(current);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-sm text-zinc-400">Order</div>
          <h2 className="text-2xl font-semibold">{order.id}</h2>
          <div className="mt-1 text-sm text-zinc-400">
            Placed {new Date(order.createdAt).toLocaleString()} • Window: {order.deliveryWindow}
          </div>
        </div>
        <Link className="btn btn-ghost" href="/track">
          ← Track another
        </Link>
      </div>

      <div className="card p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-sm font-semibold">Current status</div>
            <div className="mt-1 text-lg font-semibold gold-text">{current}</div>
          </div>
          <div className="text-sm text-zinc-400">
            Driver + GPS tracking is simulated in this preview.
          </div>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-5">
          {order.timeline.map((step, i) => {
            const done = i <= currentIdx;
            return (
              <div
                key={step.label}
                className={`rounded-2xl border px-4 py-3 text-sm ${
                  done
                    ? "border-yellow-400/35 bg-yellow-400/10"
                    : "border-zinc-800 bg-zinc-950/40"
                }`}
              >
                <div className="font-semibold">{step.label}</div>
                <div className="mt-1 text-xs text-zinc-500">
                  {new Date(step.at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="card p-5">
            <div className="text-sm font-semibold">Items</div>
            <div className="mt-3 space-y-2">
              {order.items.map((i) => (
                <div
                  key={i.id}
                  className="flex items-start justify-between gap-3 rounded-2xl border border-zinc-800 bg-zinc-950/40 px-4 py-3 text-sm"
                >
                  <div>
                    <div className="font-semibold">{i.name}</div>
                    <div className="text-xs text-zinc-500">Qty {i.qty}</div>
                  </div>
                  <div className="gold-text">${(i.price * i.qty).toFixed(2)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="card p-5">
            <div className="text-sm font-semibold">Delivery to</div>
            <div className="mt-2 text-sm text-zinc-300">
              <div className="font-semibold">{order.customer.name}</div>
              <div className="text-zinc-400">{order.customer.phone}</div>
              <div className="mt-2">{order.customer.address}</div>
              {order.customer.notes ? (
                <div className="mt-2 text-xs text-zinc-500">Notes: {order.customer.notes}</div>
              ) : null}
            </div>
          </div>

          <div className="card p-5">
            <div className="text-sm font-semibold">Charges (preview)</div>
            <div className="mt-3 space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-zinc-400">Subtotal</span>
                <span>${order.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-400">Delivery</span>
                <span>${order.deliveryFee.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-400">Tax</span>
                <span>${order.tax.toFixed(2)}</span>
              </div>
              <hr className="my-2" />
              <div className="flex items-center justify-between font-semibold">
                <span>Total</span>
                <span className="gold-text">${order.total.toFixed(2)}</span>
              </div>
              <div className="mt-2 text-xs text-zinc-500">
                Payment method: {order.paymentMethod}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
