import { userController } from "./../../controllers/userController";
import { FastifyInstance } from "fastify";

export const userRoutes = async function (app: FastifyInstance) {
  const isAdmin = {
    preHandler: app.auth([app.authenticate, app.authorize], {
      relation: "and",
    }),
  };
  const isAuthenticated = {
    preHandler: app.auth([app.authenticate], {
      relation: "and",
    }),
  };
  app.get("/:id", isAuthenticated, userController.getUser);
  app.get("/list", isAdmin, userController.getUsers);
  app.post("/create", isAdmin, userController.createUser);
  app.patch("/update", isAuthenticated, userController.updateUser);
  app.patch(
    "/update-password",
    isAuthenticated,
    userController.updateUserPassword
  );
  app.delete("/inactivate", isAuthenticated, userController.inactivateUser);
  app.patch("/activate", isAdmin, userController.activateUser);
};
