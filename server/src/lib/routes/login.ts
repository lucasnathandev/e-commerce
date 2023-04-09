import { loginController } from "./../../controllers/loginController";
import { FastifyInstance } from "fastify";

export const loginRoutes = async function (app: FastifyInstance) {
  app.post("/auth", loginController.signIn);
  app.post("/signout", loginController.signOut);
};
