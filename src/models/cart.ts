import { z } from "zod";

export const CartId = z.object({
  id: z.string().optional(),
});

const discount = z.number().min(0).max(100);
const total = z
  .number()
  .nonnegative("Erro na finalização da compra, valor negativo");

export const Cart = CartId.extend({ discount, total });
