import { userController } from "./../../controllers/userController";
import { FastifyInstance } from "fastify";

export const userRoutes = async function (app: FastifyInstance) {
  app.get("/user", userController.getUser);
  app.get("/users", userController.getUsers);
};
