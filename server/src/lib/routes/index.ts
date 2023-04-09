import { userRoutes } from "./user";
// This file exports all the others routes.

import { FastifyInstance } from "fastify";
import { loginRoutes } from "./login";
import { productRoutes } from "./product";
import { cartRoutes } from "./cart";

export const routes = async function (app: FastifyInstance) {
  app.register(userRoutes, {
    prefix: "/user",
  });
  app.register(loginRoutes, {
    prefix: "/login",
  });
  app.register(productRoutes, {
    prefix: "/product",
  });
  app.register(cartRoutes, {
    prefix: "/cart",
  });
};
