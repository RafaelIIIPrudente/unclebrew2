import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

/**
 * Router for handling order-related API requests.
 */
export const orderRouter = createTRPCRouter({
  /**
   * Retrieves all orders from the database.
   * @returns {Promise<Order[]>} A promise that resolves to an array of Order objects.
   */
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.order.findMany();
  }),

  /**
   * Retrieves an order by its ID from the database.
   * @param {number} id - The ID of the order to retrieve.
   * @returns {Promise<Order>} A promise that resolves to the Order object with the specified ID.
   */
  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ input, ctx }) => {
      return ctx.db.order.findUnique({
        where: { id: input.id },
      });
    }),

  /**
   * Places a new order in the database.
   * @param {OrderInput} input - The details of the new order.
   * @returns {Promise<Order>} A promise that resolves to the created Order object.
   */
  placeOrder: publicProcedure
  .input(z.object({
    productId: z.number(),
    quantity: z.number().nonnegative({ message: 'Quantity must be a positive number'}),
    inventoryId: z.number(),
  }))
  .mutation(async ({ input, ctx }) => {
    const product = await ctx.db.product.findUnique({ where: { id: input.productId } });
    if (!product) throw new Error('Product not found');

    const inventory = await ctx.db.inventory.findUnique({ where: { id: input.inventoryId } });
    if (!inventory) throw new Error('Inventory not found');

    const total = product.price * input.quantity;
    
    return await ctx.db.order.create({
      data: {
        quantity: input.quantity,
        product: { connect: { id: product.id } },
        inventory: { connect: { id: inventory.id } },
        total: total
      },
    });
  }),
});