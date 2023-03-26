import { userController } from "./../../controllers/userController";
import { FastifyInstance } from "fastify";

export const userRoutes = async function (app: FastifyInstance) {
  const adminValidation = { onRequest: [app.authenticate, app.authorize] };
  const userValidation = { onRequest: [app.authenticate] };
  app.get("/user/:id", userValidation, userController.getUser);
  app.get("/user/list", adminValidation, userController.getUsers);
  app.post("/user/create", adminValidation, userController.createUser);
  app.put("/user/update", userValidation, userController.updateUser);
  app.put(
    "/user/update-password",
    userValidation,
    userController.updateUserPassword
  );
  app.delete("/user/inactivate", userValidation, userController.inactivateUser);
  app.put("/user/activate", adminValidation, userController.activateUser);
};
