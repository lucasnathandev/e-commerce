import { loginController } from "./../../controllers/loginController";
import { FastifyInstance } from "fastify";

export const loginRoutes = async function (app: FastifyInstance) {
  app.post("/login/auth", loginController.signIn);
  app.post("/login/signout", loginController.signOut);
};
