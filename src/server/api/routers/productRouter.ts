import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

/**
 * Router for handling product-related API requests.
 */
export const productRouter = createTRPCRouter({
  /**
   * Retrieves all products from the database.
   * @returns {Promise<Product[]>} A promise that resolves to an array of Product objects.
   */
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.product.findMany();
  }),

  /**
   * Retrieves a product by its ID from the database.
   * @param {number} id - The ID of the product to retrieve.
   * @returns {Promise<Product>} A promise that resolves to the Product object with the specified ID.
   */
  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ input, ctx }) => {
      return ctx.db.product.findUnique({
        where: { id: input.id },
      });
    }),
});
