import { createTRPCRouter } from "~/server/api/trpc";
import { productRouter } from './productRouter';
import { inventoryRouter } from './inventoryRouter';

export const appRouter = createTRPCRouter({
  product: productRouter,
  inventory: inventoryRouter,
});