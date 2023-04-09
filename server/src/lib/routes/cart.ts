import { cartController } from "./../../controllers/cartController";
import { FastifyInstance } from "fastify";
export const cartRoutes = async function (app: FastifyInstance) {
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

  app.get("/list", isAdmin, cartController.getCarts);
  app.get("/list/filter", isAdmin, cartController.getCartsWithFilter);
  app.get("/:id", isAuthenticated, cartController.getCart);
  app.post("/create", isAuthenticated, cartController.createCart);
  app.patch("/update", isAuthenticated, cartController.updateCart);
};
