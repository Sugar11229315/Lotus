import Link from "next/link";

export default function ProposalPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="badge badge-gold">CONFIDENTIAL BUSINESS PROPOSAL (Summary)</div>
          <h2 className="mt-3 text-2xl font-semibold">E-Commerce Website & Delivery Integration</h2>
          <div className="mt-1 text-sm text-zinc-400">Prepared for: Lotus Mart • Prepared by: IslandSprint • Feb 2026</div>
        </div>
        <div className="flex gap-2">
          <Link className="btn btn-primary" href="/shop">View storefront demo</Link>
          <Link className="btn btn-ghost" href="/admin">View admin demo</Link>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <div className="card p-6">
            <h3 className="text-lg font-semibold gold-text">Executive summary</h3>
            <p className="mt-3 text-sm text-zinc-300">
              IslandSprint proposes to design, develop, host, and maintain a dedicated e-commerce + delivery
              platform for Lotus Mart under <span className="gold-text">LotusMartGD.com</span>. This is not a marketplace.
              Lotus Mart retains full brand ownership and 100% of product sales revenue. IslandSprint earns revenue solely
              from a percentage of delivery fees.
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-zinc-800 bg-zinc-950/40 p-4">
                <div className="text-sm font-semibold">Lotus Mart keeps</div>
                <ul className="mt-2 list-disc pl-5 text-sm text-zinc-300">
                  <li>100% product revenue</li>
                  <li>Brand control</li>
                  <li>Customer ownership + data</li>
                </ul>
              </div>
              <div className="rounded-2xl border border-zinc-800 bg-zinc-950/40 p-4">
                <div className="text-sm font-semibold">IslandSprint provides</div>
                <ul className="mt-2 list-disc pl-5 text-sm text-zinc-300">
                  <li>Website + hosting</li>
                  <li>POS API integration (future)</li>
                  <li>Delivery dispatch + drivers</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <h3 className="text-lg font-semibold gold-text">Marketplace vs IslandSprint</h3>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="text-zinc-300">
                  <tr>
                    <th className="border-b border-zinc-800 pb-2 pr-4">Marketplace model</th>
                    <th className="border-b border-zinc-800 pb-2">IslandSprint model</th>
                  </tr>
                </thead>
                <tbody className="text-zinc-300">
                  <tr>
                    <td className="border-b border-zinc-900 py-3 pr-4">Shared platform</td>
                    <td className="border-b border-zinc-900 py-3">Dedicated Lotus Mart store</td>
                  </tr>
                  <tr>
                    <td className="border-b border-zinc-900 py-3 pr-4">Platform owns customer data</td>
                    <td className="border-b border-zinc-900 py-3">Lotus Mart owns customers + data</td>
                  </tr>
                  <tr>
                    <td className="border-b border-zinc-900 py-3 pr-4">10%+ service fees on cart</td>
                    <td className="border-b border-zinc-900 py-3">No product commission</td>
                  </tr>
                  <tr>
                    <td className="border-b border-zinc-900 py-3 pr-4">Static catalog uploads</td>
                    <td className="border-b border-zinc-900 py-3">Live POS API sync (future)</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4">Generic branding</td>
                    <td className="py-3">Fully branded environment</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="card p-6">
            <h3 className="text-lg font-semibold gold-text">Digital commerce architecture</h3>
            <div className="mt-4 grid gap-3">
              <div className="rounded-2xl border border-zinc-800 bg-zinc-950/40 p-4">
                <div className="text-sm font-semibold">Layer 1 — LotusMartGD.com Storefront</div>
                <div className="mt-1 text-sm text-zinc-400">Catalog, search, checkout, accounts, tracking, promotions.</div>
              </div>
              <div className="rounded-2xl border border-zinc-800 bg-zinc-950/40 p-4">
                <div className="text-sm font-semibold">Layer 2 — POS API Integration (future)</div>
                <div className="mt-1 text-sm text-zinc-400">Real-time inventory sync, SKU accuracy, automatic stock updates.</div>
              </div>
              <div className="rounded-2xl border border-zinc-800 bg-zinc-950/40 p-4">
                <div className="text-sm font-semibold">Layer 3 — IslandSprint Delivery Engine</div>
                <div className="mt-1 text-sm text-zinc-400">Driver dispatch, route optimization, notifications, proof of delivery.</div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="card p-6">
            <h3 className="text-lg font-semibold gold-text">Revenue model</h3>
            <p className="mt-3 text-sm text-zinc-300">
              IslandSprint earns only from a percentage of delivery fees. Lotus Mart keeps 100% of product sales revenue.
            </p>
            <div className="mt-4 rounded-2xl border border-zinc-800 bg-zinc-950/40 p-4 text-sm text-zinc-300">
              Example: $200 basket + $12 delivery → Lotus Mart receives $200, IslandSprint receives a portion of $12.
            </div>
          </div>

          <div className="card p-6">
            <h3 className="text-lg font-semibold gold-text">Implementation timeline</h3>
            <div className="mt-3 space-y-2 text-sm text-zinc-300">
              <div className="flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-950/40 px-4 py-3">
                <span>Planning</span><span className="text-zinc-400">1–2 weeks</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-950/40 px-4 py-3">
                <span>Development</span><span className="text-zinc-400">2–4 weeks</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-950/40 px-4 py-3">
                <span>Integration testing</span><span className="text-zinc-400">1–2 weeks</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-950/40 px-4 py-3">
                <span>Soft launch</span><span className="text-zinc-400">1 week</span>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <h3 className="text-lg font-semibold gold-text">Security (future)</h3>
            <ul className="mt-3 list-disc pl-5 text-sm text-zinc-300">
              <li>PCI-compliant payment processing</li>
              <li>Secure API gateway for POS sync</li>
              <li>Encrypted transport + backups</li>
              <li>Monitoring + alerting</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="card p-6">
        <h3 className="text-lg font-semibold gold-text">Want the board-ready deck + diagrams?</h3>
        <p className="mt-2 text-sm text-zinc-300">
          This page is the short version. The full proposal includes competitive analysis, cost savings, and driver economics.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="badge badge-gold">Customer ownership</span>
          <span className="badge badge-gold">Brand control</span>
          <span className="badge badge-gold">Live inventory (POS)</span>
          <span className="badge badge-gold">Automated dispatch</span>
        </div>
      </div>
    </div>
  );
}
