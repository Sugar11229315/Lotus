"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const stages = [
  "Order received",
  "Order transmitted to POS (preview)",
  "Picking & packing",
  "Driver assigned",
  "Out for delivery",
  "Delivered (proof of delivery)",
];

function isValidDemoId(orderId: string) {
  return /^LM-\d{5}$/.test(orderId);
}

export function TrackingClient({ orderId }: { orderId: string }) {
  const [step, setStep] = useState(3);

  // ✅ Always show tracking UI if it's a valid demo-style order ID
  const canDemo = useMemo(() => isValidDemoId(orderId), [orderId]);

  useEffect(() => {
    if (!canDemo) return;

    const t = setInterval(() => {
      setStep((s) => (s < stages.length - 1 ? s + 1 : s));
    }, 2500);

    return () => clearInterval(t);
  }, [canDemo]);

  if (!canDemo) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold">Order not found</h1>
        <p className="text-sm text-slate-600">
          This preview supports tracking demo IDs like <span className="font-mono">LM-10293</span>.
        </p>
        <div className="flex gap-3">
          <Link href="/track/LM-10293" className="rounded-full bg-emerald-600 px-5 py-2 text-sm font-medium text-white">
            Back to tracking
          </Link>
          <Link href="/shop" className="rounded-full border bg-white px-5 py-2 text-sm font-medium">
            Shop
          </Link>
        </div>
      </div>
    );
  }

  const eta = step < stages.length - 1 ? "18 min" : "Completed";

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Track your delivery</h1>
          <p className="text-sm text-slate-600">
            Order <span className="font-semibold">{orderId}</span> • Real-time tracking UI (Preview)
          </p>
        </div>
        <Link href="/shop" className="text-sm font-medium text-emerald-700 hover:underline">
          Back to shop →
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-3xl border bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-slate-500">Driver status</div>
              <div className="text-lg font-semibold">
                {step >= 3 && step < 5 ? "Driver En Route" : step >= 5 ? "Delivered" : "Preparing"}
              </div>
            </div>
            <div className="rounded-2xl border bg-slate-50 px-4 py-2 text-sm">
              ETA: <span className="font-semibold">{eta}</span>
            </div>
          </div>

          <div className="mt-6 aspect-video w-full overflow-hidden rounded-2xl border bg-slate-50">
            <div className="flex h-full items-center justify-center text-slate-500">
              Map Placeholder (Preview)
            </div>
          </div>

          <div className="mt-4 text-xs text-slate-500">
            In the live system: real-time driver GPS, routing, and proof-of-delivery.
          </div>
        </div>

        <div className="rounded-3xl border bg-white p-6 shadow-sm">
          <h2 className="font-semibold">Timeline</h2>
          <div className="mt-4 space-y-3">
            {stages.map((s, i) => {
              const done = i <= step;
              return (
                <div key={s} className="flex items-start gap-3">
                  <div
                    className={`mt-1 h-3 w-3 rounded-full ${
                      done ? "bg-emerald-600" : "bg-slate-300"
                    }`}
                  />
                  <div>
                    <div className={`text-sm ${done ? "font-medium" : "text-slate-500"}`}>
                      {s}
                    </div>
                    {i === 3 && done && (
                      <div className="text-xs text-slate-500">
                        Dispatch powered by IslandSprint (preview)
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 rounded-2xl border bg-emerald-50 p-4 text-xs text-emerald-900">
            <div className="font-semibold">Service quality model</div>
            Better driver economics → faster acceptance → stronger customer experience (preview messaging).
          </div>
        </div>
      </div>
    </div>
  );
}
