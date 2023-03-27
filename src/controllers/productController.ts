import { prisma } from "src/lib/prisma";
import { ControllerType } from "./../lib/types";

const getProducts: ControllerType = async (request, reply) => {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        ratingStars: "desc",
      },
    });

    return reply.status(reply.statusCode).send(products);
  } catch (error) {
    reply.send(error);
  }
};

export const productController = {
  getProducts,
};
