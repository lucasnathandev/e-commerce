import { ZodArray, z } from "zod";
import { Product } from "./product";

export const CartId = z.object({
  id: z.string(),
});

const products: ZodArray<z.AnyZodObject> = z.array(Product);
const discount = z.number().min(0).max(100);
const total = z
  .number()
  .nonnegative("Erro na finalização da compra, valor negativo");

export const Cart = CartId.extend({ products, discount, total });
