import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const inventoryRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.inventory.findMany();
  }),
  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ input, ctx }) => {
      return ctx.db.inventory.findUnique({
        where: { id: input.id },
      });
    }),
  decreaseQuantity: publicProcedure
    .input(
      z.object({
        productId: z.number(),
        quantity: z.number(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      return ctx.db.inventory.update({
        where: { productId: input.productId },
        data: { quantity: { decrement: input.quantity } },
      });
    }),
  addQuantity: publicProcedure
    .input(
      z.object({
        productId: z.number(),
        quantity: z.number(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      return ctx.db.inventory.update({
        where: { productId: input.productId },
        data: { quantity: { increment: input.quantity } },
      });
    }),
});