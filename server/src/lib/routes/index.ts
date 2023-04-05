import { userRoutes } from "./user";
// This file exports all the others routes.

import { FastifyInstance } from "fastify";
import { indexController } from "../../controllers/index";
import { loginRoutes } from "./login";
import { productRoutes } from "./product";

export const routes = async function (app: FastifyInstance) {
  app.get("/", indexController);
  userRoutes(app);
  loginRoutes(app);
  productRoutes(app);
};
