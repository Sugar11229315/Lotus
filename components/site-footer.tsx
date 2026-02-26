import Link from "next/link";
import { STORE } from "@/lib/mock-data";

export function SiteFooter() {
  return (
    <footer className="border-t border-zinc-900/60 bg-zinc-950/30">
      <div className="mx-auto w-full max-w-6xl px-4 py-10 md:px-6">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="text-sm font-semibold">{STORE.name}</div>
            <div className="mt-2 text-sm text-zinc-400">
              Dedicated storefront preview. Built for brand ownership, POS-driven inventory, and
              delivery automation.
            </div>
            <div className="mt-4 text-xs text-zinc-500">
              © {new Date().getFullYear()} {STORE.name}. Preview only.
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold">Quick links</div>
            <div className="mt-2 grid gap-2 text-sm">
              <Link className="text-zinc-300 hover:text-white" href="/shop">
                Shop
              </Link>
              <Link className="text-zinc-300 hover:text-white" href="/track">
                Track an order
              </Link>
              <Link className="text-zinc-300 hover:text-white" href="/proposal">
                Partnership proposal
              </Link>
              <Link className="text-zinc-300 hover:text-white" href="/admin">
                Admin (demo)
              </Link>
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold">Powered by</div>
            <div className="mt-2 text-sm text-zinc-300">
              <span className="gold-gradient-text font-semibold">{STORE.partner}</span>
              <div className="mt-2 text-zinc-400">
                Hosting • POS API integration • Delivery dispatch • Monitoring
              </div>
            </div>
            <div className="mt-4 text-xs text-zinc-500">
              This is a front-end preview (no real payments, no real inventory sync).
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
