/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-var-requires */

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const order = await prisma.order.create({
    data: {
      quantity: 1,
      total: 1,
      product: {
        connect: {
          id: 1,
        },
      },
      inventory: {
        connect: {
          id: 1,
        },
      },
    },
  });
  console.log(order);

  const product = await prisma.product.create({
    data: {
      name: "test",
      description: "test",
      price: 1,
    },
  });

  console.log(product);

  const inventory = await prisma.inventory.create({
    data: {
      productId: 1,
      quantity: 1,
    },
  });

  console.log(inventory);


}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });



