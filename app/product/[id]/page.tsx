import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PRODUCTS } from "@/lib/mock-data";
import { ProductClient } from "./product-client";

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = PRODUCTS.find((p) => p.id === params.id);
  if (!product) return notFound();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Link href="/shop" className="text-sm text-zinc-300 hover:text-white">
          ← Back to shop
        </Link>
        <Link href="/cart" className="btn btn-ghost">
          Go to cart
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="card overflow-hidden">
          <div className="relative aspect-[4/3]">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <div className="badge badge-gold">{product.category}</div>
            <h1 className="mt-3 text-3xl font-semibold">{product.name}</h1>
            <div className="mt-1 text-sm text-zinc-400">
              {product.brand ? `${product.brand} • ` : ""}Unit: {product.unit}
            </div>
          </div>

          <div className="card p-5">
            <div className="flex items-end justify-between">
              <div>
                <div className="text-sm text-zinc-400">Price</div>
                <div className="text-2xl font-semibold gold-text">
                  ${product.price.toFixed(2)}
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-zinc-400">Availability</div>
                <div className="text-sm font-semibold">
                  {product.inStock ? "In stock" : "Out of stock"}
                </div>
                <div className="text-xs text-zinc-500">
                  POS sync will control this in production.
                </div>
              </div>
            </div>

            <div className="mt-4">
              <ProductClient product={product} />
            </div>
          </div>

          <div className="card p-5">
            <div className="text-sm font-semibold">Details</div>
            <p className="mt-2 text-sm text-zinc-300">{product.description}</p>

            {product.nutrition?.length ? (
              <div className="mt-4">
                <div className="text-xs text-zinc-500">Highlights</div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {product.nutrition.map((n) => (
                    <span key={n} className="badge badge-gold">
                      {n}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
