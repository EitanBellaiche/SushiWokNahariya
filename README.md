# Sushi Wok Nahariya

React / MUI menu with a persistent cart and WhatsApp checkout.

```sh
npm install
npm run dev
npm test
npm run build
npm start
```

`npm run dev` serves both the UI and `/api/orders` through Vite. `npm run build`
creates `dist/` and `dist-server/`; `npm start` (also `npm run preview`) serves both
from one Node 20.19+ process on port 4173. Set `PORT` / `HOST` as needed.

**Deployment:** the checkout now requires the API. Deploy the Node process with
both build directories and `server/index.mjs`, or route `/api/orders` to an
adapter invoking `server/handler.ts`. Hosting `dist/` alone cannot validate or
complete orders. There is deliberately no browser-only checkout fallback.
The supplied server and Vite adapter use `Asia/Jerusalem` for opening hours;
any alternative adapter must use that timezone too. A reverse proxy should
preserve `Host` and `Origin` and send `X-Forwarded-Proto: https` when terminating TLS.

The API rebuilds every item from catalog identifiers, validates choices,
quantities, opening hours and delivery zones, and calculates prices and totals.
It rejects a subtotal that differs from the amount the customer reviewed. It
returns an order snapshot for the existing WhatsApp flow, **not** an order receipt
or payment confirmation. The customer must still send the WhatsApp message and
receive confirmation from the restaurant. The API keeps up to 1000 recent request
IDs/results in process memory for 15 minutes to handle retries; no database or
restaurant dashboard is added.

## Dish configuration

- `src/data/menu.ts`: existing menu prices and required protein/preparation,
  drink and side choices. Optional `ingredients`, `removableIngredients`, and
  `optionalAddons: { name, price }[]` configure each dish independently.
- `src/dishes/catalog.ts`: combines existing categories and special products.
  Ingredient defaults come only from existing descriptions. No optional paid
  extras have been enabled beyond existing menu choices.
- `src/dishes/configuration.ts`: shared runtime validation, pricing, option
  labels and migration of the previous local cart format. Used in both UI and API.
- `src/components/DishDetailsDialog.tsx` and `RollChoices.tsx`: responsive,
  keyboard-accessible configuration, kitchen notes and cart editing. MUI handles
  focus trapping, Escape and scroll locking. `useDialogReturnFocus` restores
  keyboard focus without scrolling and preserves the exact menu position.

Kitchen notes are limited to 500 characters per dish. Different notes or choices
produce separate cart lines; edits retain the selected line's identity.
Local cart prices are recalculated from the catalog when restored.

## Verification

`npm test` covers pricing, invalid input, migration/persistence, cart edits,
server validation, retries, kitchen notes in WhatsApp, keyboard dismissal/focus,
closed-store browsing, and successful/failed checkout through the UI.

`npm run test:browser` runs Chrome checks on desktop and Pixel-sized screens
against the production build, and exercises both production and Vite APIs. Run
`npm run build` first. Set `CHROME_BIN` if Chrome is not installed at
`/usr/bin/google-chrome`. Browser tests cover images, internal scrolling, fixed
actions, keyboard focus, scroll restoration, closed hours and cart editing/reload.

## Changed files

- [.gitignore](.gitignore)
- [README.md](README.md)
- [e2e/dish-details.e2e.ts](e2e/dish-details.e2e.ts)
- [package-lock.json](package-lock.json)
- [package.json](package.json)
- [playwright.config.ts](playwright.config.ts)
- [server/handler.ts](server/handler.ts)
- [server/index.mjs](server/index.mjs)
- [server/orders.test.ts](server/orders.test.ts)
- [server/orders.ts](server/orders.ts)
- [src/App.tsx](src/App.tsx)
- [src/cart/CartContext.tsx](src/cart/CartContext.tsx)
- [src/cart/state.ts](src/cart/state.ts)
- [src/cart/types.ts](src/cart/types.ts)
- [src/cart/whatsapp.ts](src/cart/whatsapp.ts)
- [src/components/AddToCartButton.tsx](src/components/AddToCartButton.tsx)
- [src/components/BuildYourOwnDialog.tsx](src/components/BuildYourOwnDialog.tsx)
- [src/components/CartDrawer.tsx](src/components/CartDrawer.tsx)
- [src/components/CombosSection.tsx](src/components/CombosSection.tsx)
- [src/components/DishDetailsDialog.test.tsx](src/components/DishDetailsDialog.test.tsx)
- [src/components/DishDetailsDialog.tsx](src/components/DishDetailsDialog.tsx)
- [src/components/DrinksSection.tsx](src/components/DrinksSection.tsx)
- [src/components/MenuSection.tsx](src/components/MenuSection.tsx)
- [src/components/PartyTraysSection.tsx](src/components/PartyTraysSection.tsx)
- [src/components/Promo.tsx](src/components/Promo.tsx)
- [src/components/PromoBundleDialog.tsx](src/components/PromoBundleDialog.tsx)
- [src/components/RollChoices.tsx](src/components/RollChoices.tsx)
- [src/components/SushiBoxPickerDialog.tsx](src/components/SushiBoxPickerDialog.tsx)
- [src/components/SushiBoxSection.tsx](src/components/SushiBoxSection.tsx)
- [src/data/menu.ts](src/data/menu.ts)
- [src/dishes/DishDetailsContext.tsx](src/dishes/DishDetailsContext.tsx)
- [src/dishes/catalog.ts](src/dishes/catalog.ts)
- [src/dishes/configuration.test.ts](src/dishes/configuration.test.ts)
- [src/dishes/configuration.ts](src/dishes/configuration.ts)
- [src/dishes/types.ts](src/dishes/types.ts)
- [src/hooks/useDialogReturnFocus.ts](src/hooks/useDialogReturnFocus.ts)
- [vite.config.ts](vite.config.ts)
