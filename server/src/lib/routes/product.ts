import { FastifyInstance } from "fastify";
import { productController } from "src/controllers/productController";

export const productRoutes = async function (app: FastifyInstance) {
  app.get("/products", productController.getProducts);
  app.get("/products/filter", productController.getProductsByFilter);
  app.get("/product/:id", productController.getProduct);
  app.post(
    "/product/create",
    { preValidation: app.authenticate },
    productController.createProduct
  );
  app.patch(
    "/product/update",
    { preValidation: app.authenticate },
    productController.updateProduct
  );
  app.delete(
    "/product/inactivate",
    { preValidation: app.authenticate },
    productController.inactivateProduct
  );
  app.patch(
    "/product/activate",
    { preValidation: [app.authenticate, app.authorize] },
    productController.activateProduct
  );
};
