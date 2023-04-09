import { FastifyInstance } from "fastify";
import { productController } from "src/controllers/productController";

export const productRoutes = async function (app: FastifyInstance) {
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
  app.get("/list", productController.getProducts);
  app.get("/list/filter", productController.getProductsByFilter);
  app.get("/:id", productController.getProduct);
  app.post("/create", isAuthenticated, productController.createProduct);
  app.patch("/update", isAuthenticated, productController.updateProduct);
  app.delete(
    "/inactivate",
    isAuthenticated,
    productController.inactivateProduct
  );
  app.patch("/activate", isAdmin, productController.activateProduct);
};
