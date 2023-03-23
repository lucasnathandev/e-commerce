import { userController } from "./../../controllers/userController";
import { authenticate } from "./../../middlewares/authenticate";
import { userRoutes } from "./user";
import { User } from "./../../models/user";

import { fastifyAuth } from "@fastify/auth";
// This file exports all the others routes.

import { FastifyInstance } from "fastify";
import { indexController } from "../../controllers/index";

export const routes = async function (app: FastifyInstance) {
  app.get("/", indexController);
  userRoutes(app);
};
