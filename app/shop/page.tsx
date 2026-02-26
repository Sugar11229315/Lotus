import { PRODUCTS, CATEGORIES } from "@/lib/mock-data";
import { ShopClient } from "./shop-client";

export default function ShopPage() {
  return <ShopClient products={PRODUCTS} categories={CATEGORIES} />;
}
