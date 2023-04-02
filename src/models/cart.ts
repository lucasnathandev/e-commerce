import { UserId } from "./user";
import { ProductSearchSchema } from "./product";
import { z } from "zod";

enum PaymentMethodEnum {
  "Credit",
  "Debit",
  "PIX",
  "PaymentSlip",
}

const paymentMethod = z
  .nativeEnum(PaymentMethodEnum)
  .default(PaymentMethodEnum.Credit);

export const CartId = z.object({
  id: z.string().optional(),
});

const discount = z.number().min(0).max(100);
const total = z.number().nonnegative("Erro no valor total, valor negativo");
// const products = z.array(ProductSearchSchema).min(1);
const userId = UserId;

export const CartSchema = CartId.extend({
  userId,
});

export const UpdateCartSchema = CartId.extend({
  discount: discount.optional(),
  total: total.optional(),
  userId,
});
