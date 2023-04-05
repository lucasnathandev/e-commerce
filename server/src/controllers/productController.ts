import { CartId } from "./../models/cart";
import { UserId } from "./../models/user";
import { prisma } from "src/lib/prisma";
import { ControllerType } from "./../lib/types";
import {
  CreateProductSchema,
  ProductId,
  ProductUserIdSchema,
  UpdateProductSchema,
} from "src/models/product";
import { Prisma } from "@prisma/client";

const getProducts: ControllerType = async function (request, reply) {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        ratingStars: "desc",
      },
    });

    return reply.status(200).send(products);
  } catch (error) {
    reply.send(error);
  }
};

const getProduct: ControllerType = async function (request, reply) {
  const { id } = ProductId.parse(request.params);

  try {
    const product = await prisma.product.findFirst({
      where: {
        id,
      },
    });
    return reply.status(200).send(product);
  } catch (error) {
    reply.send(error);
  }
};

const getProductsByFilter: ControllerType = async function (request, reply) {
  try {
    const filter: Prisma.ProductFindManyArgs = request?.body?.filter || {};

    const filteredProducts = await prisma.product.findMany(filter);

    return reply.status(200).send(filteredProducts);
  } catch (error) {
    reply.send(error);
  }
};

const createProduct: ControllerType = async function (request, reply) {
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

    return reply.status(201).send({ message: "Produto cadastrado." });
  } catch (error) {
    reply.send(error);
  }
};

const updateProduct: ControllerType = async function (request, reply) {
  const { description, price, detailedDescription } = UpdateProductSchema.parse(
    request.body
  );

  const { id } = ProductId.parse(request.body);

  try {
    await prisma.product.update({
      where: {
        id,
      },
      data: {
        description,
        price,
        detailedDescription,
      },
    });

    reply.status(200).send({ message: "Produto atualizado." });
  } catch (error) {
    reply.send(error);
  }
};

const inactivateProduct: ControllerType = async function (request, reply) {
  const { id } = ProductId.parse(request.body);
  try {
    await prisma.product.update({
      where: {
        id,
      },
      data: {
        isActive: false,
      },
    });
  } catch (error) {
    reply.send(error);
  }
};

const activateProduct: ControllerType = async function (request, reply) {
  const { id } = ProductId.parse(request.body);
  try {
    await prisma.product.update({
      where: {
        id,
      },
      data: {
        isActive: true,
      },
    });
  } catch (error) {
    reply.send(error);
  }
};

export const productController = {
  getProducts,
  getProduct,
  getProductsByFilter,
  createProduct,
  updateProduct,
  inactivateProduct,
  activateProduct,
};
