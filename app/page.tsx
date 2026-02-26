import Image from "next/image";
import Link from "next/link";
import { STORE } from "@/lib/mock-data";

export default function HomePage() {
  return (
    <div className="space-y-10">
      <section className="grid items-center gap-8 md:grid-cols-2">
        <div className="space-y-5">
          <div className="badge badge-gold">CONFIDENTIAL PREVIEW • Feb 2026</div>
          <h1 className="text-3xl font-semibold leading-tight md:text-5xl">
            <span className="gold-gradient-text">Lotus Mart</span>
            <span className="text-zinc-200">, online ordering + delivery — owned by Lotus Mart.</span>
          </h1>
          <p className="text-zinc-300">
            A dedicated e-commerce storefront on <span className="gold-text">{STORE.domain}</span>,
            backed by POS-driven inventory sync and an IslandSprint delivery engine.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link className="btn btn-primary" href="/shop">
              Start shopping (demo)
            </Link>
            <Link className="btn btn-ghost" href="/proposal">
              View proposal summary
            </Link>
            <Link className="btn btn-ghost" href="/track">
              Track order (demo)
            </Link>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="card p-4">
              <div className="text-sm font-semibold gold-text">No marketplace dependency</div>
              <div className="mt-1 text-sm text-zinc-400">
                Lotus Mart owns the storefront, branding, and customer relationship.
              </div>
            </div>
            <div className="card p-4">
              <div className="text-sm font-semibold gold-text">Live inventory (future)</div>
              <div className="mt-1 text-sm text-zinc-400">
                POS API sync removes overselling and reduces substitutions.
              </div>
            </div>
          </div>
        </div>

        <div className="card relative overflow-hidden p-6">
          <div className="absolute inset-0 opacity-40">
            <div className="h-full w-full bg-[radial-gradient(circle_at_30%_20%,rgba(212,175,55,0.25),transparent_45%),radial-gradient(circle_at_70%_70%,rgba(246,232,164,0.18),transparent_45%)]" />
          </div>
          <div className="relative">
            <div className="flex items-center gap-4">
              <div className="relative h-16 w-16 overflow-hidden rounded-3xl gold-border bg-black">
                <Image
                  src="/brand/lotus-mart-logo.png"
                  alt="Lotus Mart"
                  fill
                  className="object-contain p-2"
                  priority
                />
              </div>
              <div>
                <div className="text-lg font-semibold">{STORE.name} Digital Commerce Stack</div>
                <div className="text-sm text-zinc-400">
                  Website + POS integration + delivery engine (preview UI)
                </div>
              </div>
            </div>

            <div className="mt-6 grid gap-3">
              <div className="card p-4">
                <div className="text-sm font-semibold">Layer 1 — Storefront</div>
                <div className="mt-1 text-sm text-zinc-400">
                  Product catalog, search, cart, checkout, order tracking.
                </div>
              </div>
              <div className="card p-4">
                <div className="text-sm font-semibold">Layer 2 — POS API (future)</div>
                <div className="mt-1 text-sm text-zinc-400">
                  Real-time inventory sync, automatic stock deduction, automated order transmission.
                </div>
              </div>
              <div className="card p-4">
                <div className="text-sm font-semibold">Layer 3 — IslandSprint Delivery Engine</div>
                <div className="mt-1 text-sm text-zinc-400">
                  Dispatch, driver assignment, notifications, proof of delivery.
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              <span className="badge badge-gold">100% product revenue to Lotus Mart</span>
              <span className="badge badge-gold">IslandSprint earns % of delivery fees</span>
              <span className="badge badge-gold">Brand control + customer ownership</span>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="card p-5">
          <div className="text-sm font-semibold gold-text">Operational workflow</div>
          <ol className="mt-3 space-y-2 text-sm text-zinc-300">
            <li>1) POS sync → website catalog (future)</li>
            <li>2) Customer orders online</li>
            <li>3) Order hits POS + dispatch</li>
            <li>4) Store picks/packs</li>
            <li>5) Driver assigned + delivered</li>
          </ol>
        </div>
        <div className="card p-5">
          <div className="text-sm font-semibold gold-text">Implementation timeline</div>
          <div className="mt-3 grid gap-2 text-sm text-zinc-300">
            <div className="flex items-center justify-between rounded-2xl border border-zinc-800 px-3 py-2">
              <span>Phase 1 — Planning</span>
              <span className="text-zinc-400">1–2 weeks</span>
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-zinc-800 px-3 py-2">
              <span>Phase 2 — Development</span>
              <span className="text-zinc-400">2–4 weeks</span>
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-zinc-800 px-3 py-2">
              <span>Phase 3 — Integration testing</span>
              <span className="text-zinc-400">1–2 weeks</span>
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-zinc-800 px-3 py-2">
              <span>Phase 4 — Soft launch</span>
              <span className="text-zinc-400">1 week</span>
            </div>
          </div>
        </div>
        <div className="card p-5">
          <div className="text-sm font-semibold gold-text">Preview disclaimer</div>
          <p className="mt-3 text-sm text-zinc-300">
            This site is a UI prototype — no real payments, no real inventory, and no real driver
            dispatch. It exists to show what the future product will look and feel like.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link className="btn btn-primary" href="/shop">
              Browse catalog
            </Link>
            <Link className="btn btn-ghost" href="/admin">
              View admin demo
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
