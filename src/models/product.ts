import { z } from "zod";

export const ProductId = z.object({
  id: z.string().optional(),
});

const description = z.string();
const price = z.number();
const code = z.string();
const detailedDescription = z.string().optional();
const userId = z.string();
const isActive = z.boolean().default(true);
const ratingStars = z.number().min(0).max(5);

export const ProductSchema = z.object({
  description,
  price,
  code,
  detailedDescription,
  userId,
  isActive,
  ratingStars,
});

export const ProductUserIdSchema = z.object({
  userId,
});

export const CreateProductSchema = z.object({
  description,
  price,
  detailedDescription,
});

export const UpdateProductSchema = z.object({
  description: description.optional(),
  price: price.optional(),
  detailedDescription,
});
