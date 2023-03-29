import { prisma } from "src/lib/prisma";
import { ControllerType } from "./../lib/types";
import {
  CreateProductSchema,
  ProductId,
  ProductUserIdSchema,
  UpdateProductSchema,
} from "src/models/product";

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

const getProduct: ControllerType = async (request, reply) => {
  const { id } = ProductId.parse(request.params);

  try {
    const product = await prisma.product.findFirst({
      where: {
        id,
      },
    });
    return reply.status(reply.statusCode).send(product);
  } catch (error) {
    reply.send(error);
  }
};

const createProduct: ControllerType = async (request, reply) => {
  const { description, price, detailedDescription } = CreateProductSchema.parse(
    request.body
  );
  const code = "must create product bar code API integration";

  const { userId } = ProductUserIdSchema.parse(request.body);
  try {
    const userExists = !!(await prisma.user.findFirst({
      where: {
        id: userId,
        type: "Seller",
      },
    }));

    if (!userExists) {
      return reply.status(403).send({
        message:
          "Produto não foi possível ser criado, erro ao buscar vendedor no sistema.",
      });
    }

    await prisma.product.create({
      data: {
        description,
        price,
        detailedDescription,
        code,
        userId,
      },
    });

    return reply
      .status(reply.statusCode)
      .send({ message: "Produto cadastrado com sucesso." });
  } catch (error) {
    reply.send(error);
  }
};

export const productController = {
  getProducts,
  getProduct,
  createProduct,
};
