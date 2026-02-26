"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useCart } from "@/components/cart/cart-context";
import { DELIVERY_WINDOWS } from "@/lib/mock-data";
import {
  ORDER_STORAGE_KEY,
  cartToOrderItems,
  computeTotals,
  makeOrderId,
  type Order,
} from "@/lib/order-store";

function money(n: number) {
  return n.toFixed(2);
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clear } = useCart();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [window, setWindow] = useState(DELIVERY_WINDOWS[0] ?? "ASAP");
  const [payment, setPayment] = useState<"Card" | "Cash">("Card");

  const totals = useMemo(() => computeTotals(subtotal), [subtotal]);

  const canPlace = items.length > 0 && name.trim() && phone.trim() && address.trim();

  const placeOrder = () => {
    if (!canPlace) return;

    const id = makeOrderId();
    const now = new Date();

    const order: Order = {
      id,
      createdAt: now.toISOString(),
      customer: { name: name.trim(), phone: phone.trim(), address: address.trim(), notes: notes.trim() || undefined },
      deliveryWindow: window,
      paymentMethod: payment,
      items: cartToOrderItems(items),
      subtotal,
      deliveryFee: totals.deliveryFee,
      tax: totals.tax,
      total: totals.total,
      status: "Placed",
      timeline: [
        { label: "Placed", at: now.toISOString(), detail: "Order received by Lotus Mart." },
        { label: "Picking", at: new Date(now.getTime() + 12 * 60 * 1000).toISOString(), detail: "Store team is picking items." },
        { label: "Ready", at: new Date(now.getTime() + 28 * 60 * 1000).toISOString(), detail: "Order packed and ready for pickup." },
        { label: "Out for delivery", at: new Date(now.getTime() + 40 * 60 * 1000).toISOString(), detail: "Driver assigned and en route." },
        { label: "Delivered", at: new Date(now.getTime() + 68 * 60 * 1000).toISOString(), detail: "Delivered to customer." },
      ],
    };

    try {
      const raw = localStorage.getItem(ORDER_STORAGE_KEY);
      const list: Order[] = raw ? JSON.parse(raw) : [];
      localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify([order, ...list]));
    } catch {
      // ignore
    }

    clear();
    router.push(`/track/${encodeURIComponent(id)}`);
  };

  if (items.length === 0) {
    return (
      <div className="card p-8 text-center">
        <div className="text-lg font-semibold">Nothing to checkout</div>
        <div className="mt-2 text-sm text-zinc-400">Add items to your cart first.</div>
        <div className="mt-5">
          <Link className="btn btn-primary" href="/shop">
            Browse products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold">Checkout (demo)</h2>
          <p className="mt-1 text-sm text-zinc-400">
            This is a preview flow — payments and dispatch are not real.
          </p>
        </div>
        <Link className="btn btn-ghost" href="/cart">
          ← Back to cart
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <div className="card p-5">
            <div className="text-sm font-semibold">Delivery details</div>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <div>
                <div className="text-xs text-zinc-500">Full name</div>
                <input className="input mt-1" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div>
                <div className="text-xs text-zinc-500">Phone</div>
                <input className="input mt-1" value={phone} onChange={(e) => setPhone(e.target.value)} />
              </div>
              <div className="md:col-span-2">
                <div className="text-xs text-zinc-500">Address</div>
                <input className="input mt-1" value={address} onChange={(e) => setAddress(e.target.value)} />
              </div>
              <div className="md:col-span-2">
                <div className="text-xs text-zinc-500">Delivery notes (optional)</div>
                <input className="input mt-1" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Gate code, landmarks, call on arrival…" />
              </div>
            </div>
          </div>

          <div className="card p-5">
            <div className="text-sm font-semibold">Delivery window</div>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {DELIVERY_WINDOWS.map((w) => (
                <button
                  key={w}
                  type="button"
                  onClick={() => setWindow(w)}
                  className={`rounded-2xl border px-4 py-3 text-left text-sm transition ${
                    window === w
                      ? "border-yellow-400/40 bg-yellow-400/10"
                      : "border-zinc-800 bg-zinc-950/40 hover:bg-zinc-900/40"
                  }`}
                >
                  <div className="font-semibold">{w}</div>
                  <div className="text-xs text-zinc-500">Driver dispatch will be automatic in production.</div>
                </button>
              ))}
            </div>
          </div>

          <div className="card p-5">
            <div className="text-sm font-semibold">Payment (preview)</div>
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setPayment("Card")}
                className={`btn ${payment === "Card" ? "btn-primary" : "btn-ghost"}`}
              >
                Card
              </button>
              <button
                type="button"
                onClick={() => setPayment("Cash")}
                className={`btn ${payment === "Cash" ? "btn-primary" : "btn-ghost"}`}
              >
                Cash
              </button>
            </div>
            {payment === "Card" ? (
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <div className="md:col-span-2">
                  <div className="text-xs text-zinc-500">Card number</div>
                  <input className="input mt-1" placeholder="4242 4242 4242 4242" />
                </div>
                <div>
                  <div className="text-xs text-zinc-500">Expiry</div>
                  <input className="input mt-1" placeholder="MM/YY" />
                </div>
                <div>
                  <div className="text-xs text-zinc-500">CVC</div>
                  <input className="input mt-1" placeholder="123" />
                </div>
                <div className="md:col-span-2 text-xs text-zinc-500">
                  In production: PCI-compliant payments + tokenization.
                </div>
              </div>
            ) : (
              <div className="mt-4 text-sm text-zinc-300">
                Cash-on-delivery (demo). Driver will collect payment.
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div className="card p-5">
            <div className="text-sm font-semibold">Order summary</div>
            <div className="mt-3 space-y-2 text-sm">
              {items.map((i) => (
                <div key={i.product.id} className="flex items-start justify-between gap-3">
                  <div>
                    <div className="font-semibold">{i.product.name}</div>
                    <div className="text-xs text-zinc-500">Qty {i.qty}</div>
                  </div>
                  <div className="gold-text">${money(i.product.price * i.qty)}</div>
                </div>
              ))}
            </div>

            <hr className="my-4" />
            <div className="flex items-center justify-between text-sm">
              <span className="text-zinc-400">Subtotal</span>
              <span>${money(subtotal)}</span>
            </div>
            <div className="mt-2 flex items-center justify-between text-sm">
              <span className="text-zinc-400">Delivery</span>
              <span>${money(totals.deliveryFee)}</span>
            </div>
            <div className="mt-2 flex items-center justify-between text-sm">
              <span className="text-zinc-400">Tax</span>
              <span>${money(totals.tax)}</span>
            </div>
            <hr className="my-4" />
            <div className="flex items-center justify-between text-base font-semibold">
              <span>Total</span>
              <span className="gold-text">${money(totals.total)}</span>
            </div>

            <button
              className={`btn mt-4 w-full ${canPlace ? "btn-primary" : "btn-ghost opacity-50"}`}
              disabled={!canPlace}
              onClick={placeOrder}
            >
              Place order (demo)
            </button>
            <div className="mt-2 text-xs text-zinc-500">
              You’ll get a demo tracking page after placing.
            </div>
          </div>

          <div className="card p-5">
            <div className="text-sm font-semibold">IslandSprint delivery engine</div>
            <p className="mt-2 text-sm text-zinc-300">
              In the full build, this step triggers automated dispatch + real-time tracking.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
