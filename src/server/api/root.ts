import { inventoryRouter } from "./routers/inventoryRouter";
import { createTRPCRouter } from "~/server/api/trpc";
import { orderRouter } from "./routers/order";
import { productRouter } from "./routers/productRouter";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  inventory: inventoryRouter,
  product: productRouter,
  order: orderRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
