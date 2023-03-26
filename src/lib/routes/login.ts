import { loginController } from "./../../controllers/loginController";
import { FastifyInstance } from "fastify";

export const loginRoutes = async function signIn(app: FastifyInstance) {
  app.post("/login/auth", loginController.signIn);
};
