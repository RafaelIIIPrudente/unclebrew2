import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

/**
 * TRPC router for inventory-related API endpoints.
 */
export const inventoryRouter = createTRPCRouter({
  /**
   * Retrieves all inventory items.
   * @returns {Promise<Inventory[]>} A promise that resolves to an array of Inventory objects.
   */
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.inventory.findMany();
  }),

  /**
   * Retrieves an inventory item by ID.
   * @param {number} id - The ID of the inventory item to retrieve.
   * @returns {Promise<Inventory>} A promise that resolves to the Inventory object with the specified ID.
   */
  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ input, ctx }) => {
      return ctx.db.inventory.findUnique({
        where: { id: input.id },
      });
    }),

  /**
   * Decreases the quantity of an inventory item by a specified amount.
   * @param {number} productId - The ID of the inventory item to update.
   * @param {number} quantity - The amount to decrement the quantity by.
   * @returns {Promise<Inventory>} A promise that resolves to the updated Inventory object.
   */
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

  /**
   * Increases the quantity of an inventory item by a specified amount.
   * @param {number} productId - The ID of the inventory item to update.
   * @param {number} quantity - The amount to increment the quantity by.
   * @returns {Promise<Inventory>} A promise that resolves to the updated Inventory object.
   */
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