import { FastifyInstance } from "fastify";
import { productController } from "src/controllers/productController";

export const productRoutes = async function (app: FastifyInstance) {
  app.get("/products", productController.getProducts);
};
