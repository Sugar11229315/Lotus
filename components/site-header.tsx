"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { STORE } from "@/lib/mock-data";
import { useCart } from "@/components/cart/cart-context";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/track", label: "Track" },
  { href: "/proposal", label: "Proposal" },
  { href: "/admin", label: "Admin" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const { itemCount } = useCart();
  const [open, setOpen] = useState(false);

  const active = useMemo(() => {
    return NAV.reduce<Record<string, boolean>>((acc, n) => {
      acc[n.href] = pathname === n.href || (n.href !== "/" && pathname?.startsWith(n.href));
      return acc;
    }, {});
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-900/60 bg-zinc-950/50 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-3 md:px-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative h-10 w-10 overflow-hidden rounded-2xl gold-border bg-black">
            <Image
              src="/brand/lotus-mart-logo.png"
              alt="Lotus Mart"
              fill
              className="object-contain p-1"
              priority
            />
          </div>
          <div className="leading-tight">
            <div className="text-sm font-semibold tracking-wide">{STORE.name}</div>
            <div className="text-xs text-zinc-400">{STORE.domain} • Preview</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={`rounded-2xl px-3 py-2 text-sm transition ${
                active[n.href]
                  ? "bg-yellow-400/10 text-yellow-200 gold-border"
                  : "text-zinc-300 hover:bg-zinc-900/40 hover:text-white"
              }`}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/cart"
            className="btn btn-ghost relative"
            aria-label="Cart"
          >
            <span>Cart</span>
            {itemCount > 0 ? (
              <span className="badge badge-gold ml-1">{itemCount}</span>
            ) : (
              <span className="ml-1 text-xs text-zinc-500">(0)</span>
            )}
          </Link>

          <button
            onClick={() => setOpen((v) => !v)}
            className="btn btn-ghost md:hidden"
            aria-label="Menu"
          >
            Menu
          </button>
        </div>
      </div>

      {open ? (
        <div className="mx-auto w-full max-w-6xl px-4 pb-4 md:hidden">
          <div className="card p-3">
            <div className="grid gap-1">
              {NAV.map((n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-2xl px-3 py-2 text-sm transition ${
                    active[n.href]
                      ? "bg-yellow-400/10 text-yellow-200 gold-border"
                      : "text-zinc-300 hover:bg-zinc-900/40 hover:text-white"
                  }`}
                >
                  {n.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
