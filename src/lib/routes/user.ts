import { authenticate } from "./../../middlewares/authenticate";
import { userController } from "./../../controllers/userController";
import { FastifyInstance } from "fastify";

export const userRoutes = async function (app: FastifyInstance) {
  app.get("/user", userController.getUser);
  app.get("/users", userController.getUsers);
  app.post("/user/create", userController.createUser);
  app.put("/user/update", userController.updateUser);
  app.put("/user/update-password", userController.updateUserPassword);
  app.delete("/user/inactivate", userController.inactivateUser);
};
