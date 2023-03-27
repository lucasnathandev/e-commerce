import { userController } from "./../../controllers/userController";
import { FastifyInstance } from "fastify";

export const userRoutes = async function (app: FastifyInstance) {
  const isAdmin = { onRequest: [app.authenticate, app.authorize] };
  const isAuthenticated = { onRequest: [app.authenticate] };
  app.get("/user/:id", isAuthenticated, userController.getUser);
  app.get("/user/list", isAdmin, userController.getUsers);
  app.post("/user/create", isAdmin, userController.createUser);
  app.patch("/user/update", isAuthenticated, userController.updateUser);
  app.patch(
    "/user/update-password",
    isAuthenticated,
    userController.updateUserPassword
  );
  app.delete(
    "/user/inactivate",
    isAuthenticated,
    userController.inactivateUser
  );
  app.patch("/user/activate", isAdmin, userController.activateUser);
};
