export type Product = {
  id: string;
  name: string;
  brand?: string;
  category: string;
  price: number;
  unit: string;
  inStock: boolean;
  stockCount: number;
  image: string;
  badge?: string;
  description: string;
  nutrition?: string[];
};

export const STORE = {
  name: "Lotus Mart",
  domain: "LotusMartGD.com",
  partner: "IslandSprint",
  tagline: "A dedicated online store + delivery engine — not a marketplace.",
  supportEmail: "support@lotusmartgd.com",
};

export const CATEGORIES = [
  "Fresh Produce",
  "Dairy & Eggs",
  "Bakery",
  "Pantry",
  "Beverages",
];

export const PRODUCTS: Product[] = [
  {
    id: "banana",
    name: "Banana Bunch",
    brand: "Farm Fresh",
    category: "Fresh Produce",
    price: 6.5,
    unit: "bunch",
    inStock: true,
    stockCount: 24,
    image: "/products/banana.jpg",
    badge: "Fresh",
    description:
      "Sweet bananas perfect for snacks, smoothies, and breakfast. (Inventory shown is a preview.)",
    nutrition: ["Potassium", "Fiber", "Vitamin B6"],
  },
  {
    id: "tomatoes",
    name: "Vine Tomatoes",
    brand: "Lotus Select",
    category: "Fresh Produce",
    price: 5.25,
    unit: "lb",
    inStock: true,
    stockCount: 18,
    image: "/products/tomatoes.jpg",
    badge: "Local",
    description:
      "Ripe tomatoes for salads, sauces, and everyday cooking. (Inventory shown is a preview.)",
    nutrition: ["Vitamin C", "Lycopene"],
  },
  {
    id: "milk",
    name: "Whole Milk",
    brand: "Dairy Valley",
    category: "Dairy & Eggs",
    price: 8.99,
    unit: "1L",
    inStock: true,
    stockCount: 12,
    image: "/products/milk.jpg",
    badge: "Chilled",
    description:
      "Classic whole milk for cereals, baking, and coffee. (Inventory shown is a preview.)",
  },
  {
    id: "eggs",
    name: "White Eggs",
    brand: "Sunny Farm",
    category: "Dairy & Eggs",
    price: 9.5,
    unit: "6-pack",
    inStock: true,
    stockCount: 20,
    image: "/products/eggs.jpg",
    badge: "Daily",
    description:
      "Simple, reliable eggs for breakfast and baking. (Inventory shown is a preview.)",
  },
  {
    id: "bread",
    name: "Fresh Bread Loaf",
    brand: "Bakery Corner",
    category: "Bakery",
    price: 10.0,
    unit: "loaf",
    inStock: true,
    stockCount: 9,
    image: "/products/bread.jpg",
    badge: "Baked Today",
    description:
      "Soft bread loaf — great for sandwiches and toast. (Inventory shown is a preview.)",
  },
  {
    id: "rice",
    name: "Rice",
    brand: "Pantry Essentials",
    category: "Pantry",
    price: 18.75,
    unit: "5kg",
    inStock: true,
    stockCount: 7,
    image: "/products/rice.jpg",
    badge: "Value",
    description:
      "Staple rice for everyday meals. (Inventory shown is a preview.)",
  },
  {
    id: "pasta",
    name: "Pasta Mix",
    brand: "Lotus Pantry",
    category: "Pantry",
    price: 7.95,
    unit: "500g",
    inStock: true,
    stockCount: 15,
    image: "/products/pasta.jpg",
    badge: "Quick",
    description:
      "Pasta shapes for weeknight dinners. (Inventory shown is a preview.)",
  },
  {
    id: "water",
    name: "Bottled Water",
    brand: "Hydra",
    category: "Beverages",
    price: 3.75,
    unit: "500ml",
    inStock: true,
    stockCount: 40,
    image: "/products/water.jpg",
    badge: "Cold",
    description:
      "Grab-and-go bottled water. (Inventory shown is a preview.)",
  },
];

export const MOCK_PROMOS = [
  { code: "LOTUS10", label: "10% off Pantry (preview)", details: "Applies to Pantry items only." },
  { code: "FREESPRINT", label: "$0 delivery over $150 (preview)", details: "Delivery fee waived in this demo." },
];

export const DELIVERY_WINDOWS = [
  "ASAP (60–90 min)",
  "Today 4:00–6:00 PM",
  "Today 6:00–8:00 PM",
  "Tomorrow 9:00–11:00 AM",
];
