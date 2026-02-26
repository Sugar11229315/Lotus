# LotusMartGD.com — Preview Site (Frontend Prototype)

This is a **frontend-only preview** of a dedicated e-commerce storefront for **Lotus Mart**, powered by **IslandSprint**.

✅ Includes:
- Branded home page (logo + gold/black theme)
- Shop catalog with search + category filters
- Product detail pages
- Cart + demo checkout
- Order tracking (demo timeline)
- Admin demo (POS sync + order status workflow)
- Local product images included (see `public/products/CREDITS.md`)

⚠️ This preview does **not** include real:
- Payments
- POS integration
- Driver dispatch
- Database / backend

## Run locally

1) Unzip the project
2) Install dependencies:

```bash
npm install
```

3) Start dev server:

```bash
npm run dev
```

Then open:
- http://localhost:3000

## Build for production

```bash
npm run build
npm start
```

## Notes
- Demo orders and cart are stored in **your browser localStorage**.
- The admin page is **/admin**.
- Tracking page is **/track**.

