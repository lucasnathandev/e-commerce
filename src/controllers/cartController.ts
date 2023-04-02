import { prisma } from "src/lib/prisma";
import { CartId, CartSchema, UpdateCartSchema } from "./../models/cart";
import { ControllerType } from "./../lib/types";
import { Prisma } from "@prisma/client";

const getCart: ControllerType = async function (request, reply) {
  const { id } = CartId.parse(request.body);

  try {
    const foundCart = await prisma.cart.findFirst({
      where: {
        id,
      },
      select: {
        products: true,
        discount: true,
        paymentMethod: true,
        total: true,
      },
    });

    if (foundCart) {
      return reply.status(200).send(foundCart);
    }

    reply
      .status(404)
      .send(new Error("Não foi possível carregar informações do carrinho."));
  } catch (error) {
    reply.send(error);
  }
};

const getCarts: ControllerType = async function (request, reply) {
  try {
    const carts = await prisma.cart.findMany();
    if (carts) {
      return reply.status(200).send(carts);
    }
  } catch (error) {
    reply.send(error);
  }
};

const getCartsWithFilter: ControllerType = async function (request, reply) {
  try {
    const filter: Prisma.CartFindManyArgs = request.body?.filter || {};
    const filteredCarts = await prisma.cart.findMany(filter);
    return reply.status(200).send(filteredCarts);
  } catch (error) {
    reply.send(error);
  }
};

const createCart: ControllerType = async function (request, reply) {
  const { userId } = CartSchema.parse(request.body);

  try {
    const createdCart = await prisma.cart.create({
      data: {
        userId: userId.id,
        total: 0,
      },
    });

    if (!createdCart) {
      return reply.send(new Error("Não foi possível criar o carrinho."));
    }
  } catch (error) {
    reply.send(error);
  }
};

const updateCart: ControllerType = async function (request, reply) {
  const { id, discount, total } = UpdateCartSchema.parse(request.body);

  try {
    const updatedCart = await prisma.cart.update({
      where: {
        id,
      },
      data: {
        discount,
        total,
      },
    });

    if (!updatedCart) {
      return reply
        .status(404)
        .send(new Error("Não foi possível atualizar o carrinho"));
    }

    const isTotalCartValueValid: boolean | unknown =
      await validateTotalCartValue(id!, total!);

    if (typeof isTotalCartValueValid !== "boolean") {
      return reply.status(404).send(isTotalCartValueValid);
    }

    reply.status(200).send({ message: "Carrinho atualizado." });
  } catch (error) {
    reply.send(error);
  }
};

export const cartController = {
  getCarts,
  getCartsWithFilter,
  getCart,
  createCart,
  updateCart,
};

// Functions (hoisting)

async function validateTotalCartValue(cartId: string, totalValue: number) {
  try {
    const cartProducts = await prisma.cart.findFirst({
      where: {
        id: cartId,
      },
      select: {
        products: {},
      },
    });

    const totalCartValue: number | undefined = cartProducts?.products.reduce(
      (prev, curr) => (prev += curr.price),
      0
    );

    if (!totalCartValue) {
      return new Error("Cannot get cart total value from database");
    }

    console.log(totalCartValue.toFixed(2) === totalValue.toFixed(2));

    const isEqualTotal: boolean =
      totalCartValue.toFixed(2) === totalValue.toFixed(2);

    return isEqualTotal;
  } catch (error) {
    return error;
  }
}

// In test
async function updateProductsWithCart(
  cartId: string,
  products: { id: string }[]
) {
  try {
    const updatedProducts = await Promise.all(
      products.map(async (product) => {
        return prisma.product.update({
          where: {
            id: product.id,
          },
          data: {
            cartId,
          },
          select: {
            id: true,
          },
        });
      })
    );

    if (!updatedProducts) {
      new Error("Cannot update products.");
    }

    return updatedProducts;
  } catch (error) {
    return error;
  }
}
