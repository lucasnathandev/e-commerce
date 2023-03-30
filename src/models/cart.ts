import { UserId } from "./user";
import { ProductId } from "./product";
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
const total = z
  .number()
  .nonnegative("Erro na finalização da compra, valor negativo");
const products = z.array(ProductId).min(1).optional();
const userId = UserId;

export const CartSchema = CartId.extend({ discount, total, products, userId });

export const UpdateCartSchema = CartId.extend({
  discount: discount.optional(),
  total: total.optional(),
  products,
  userId,
});
