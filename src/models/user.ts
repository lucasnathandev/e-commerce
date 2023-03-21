import { History } from "./history";
import { ZodArray, z } from "zod";
import { Product } from "./product";

export const UserId = z.object({
  id: z.string(),
});
const user = z.string();
const password = z.string();
const firstName = z.string().optional();
const lastName = z.string().optional();
const rg = z.string().optional();
const cpf = z.string().optional();
const type = z.enum(["User", "Seller"]).default("User");
const age = z
  .number()
  .min(18, "Precisa ser maior de 18 anos para criar uma conta.");
const products: ZodArray<z.AnyZodObject> = z.array(Product);
const history = History;

export const User = UserId.extend({
  user,
  password,
  firstName,
  lastName,
  rg,
  cpf,
  type,
  age,
  products,
  history,
});
