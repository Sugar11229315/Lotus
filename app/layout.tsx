import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CartProvider } from "@/components/cart/cart-context";

export const metadata: Metadata = {
  title: "Lotus Mart | LotusMartGD.com (Preview)",
  description:
    "Preview of a dedicated e-commerce + delivery storefront for Lotus Mart, powered by IslandSprint.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-grain">
        <CartProvider>
          <SiteHeader />
          <main className="mx-auto w-full max-w-6xl px-4 pb-16 pt-6 md:px-6">
            {children}
          </main>
          <SiteFooter />
        </CartProvider>
      </body>
    </html>
  );
}
