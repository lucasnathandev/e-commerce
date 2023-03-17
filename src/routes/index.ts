// This file exports all the others routes.

import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { indexController } from "../controllers/index";

export const routes = async function (app: FastifyInstance) {
  app.get("/", indexController);
};
