import { z } from "zod";
import { User } from "./user";
import { Cart } from "./cart";

export const ProductId = z.object({
  id: z.string(),
});

const description = z.string();
const price = z.number();
const code = z.string();
const owner = User;
const detailedDescription = z.string().optional();
const userId = z.string();
const cart = Cart;
const ratingStars = z.number().min(0).max(5);

export const Product = ProductId.extend({
  description,
  price,
  code,
  owner,
  detailedDescription,
  userId,
  cart,
});
