import { cartController } from "./../../controllers/cartController";
import { FastifyInstance } from "fastify";
export const cartRoutes = async function (app: FastifyInstance) {
  app.get("/carts", { preValidation: app.authorize }, cartController.getCarts);
  app.get(
    "/carts",
    { preValidation: app.authorize },
    cartController.getCartsWithFilter
  );
  app.get("/cart/:id", cartController.getCart);
  app.post("/cart/create", cartController.createCart);
  app.patch("/cart/update", cartController.updateCart);
};
