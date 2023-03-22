import { z } from "zod";

export const UserId = z.object({
  id: z.string(),
});
const user = z.string();
const password = z.string();
const email = z.string();
const firstName = z.string().optional();
const lastName = z.string().optional();
const rg = z.string().optional();
const cpf = z.string().optional();
const isActive = z.boolean().default(true);
const type = z.enum(["User", "Seller"]).default("User");
const age = z
  .number()
  .min(18, "Precisa ser maior de 18 anos para criar uma conta.");

export const User = UserId.extend({
  user,
  password,
  email,
  firstName,
  lastName,
  rg,
  cpf,
  isActive,
  type,
  age,
});
