import { z } from "zod";

export const UserId = z.object({
  id: z.string(),
});
const user = z.string();
const password = z.string();
const email = z.string().email();
const firstName = z.string().optional();
const lastName = z.string().optional();
const rg = z.string().optional();
const cpf = z.string().optional();
const type = z.enum(["User", "Seller"]).default("User");
const age = z
  .number()
  .min(18, "Precisa ser maior de 18 anos para criar uma conta.")
  .optional();

export const UserCreationSchema = z.object({
  user,
  password,
  email,
});

export const UserLoginSchema = z.object({
  user,
  password,
});

export const UserUpdateSchema = z.object({
  id: z.string(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().optional(),
  age: z.number().optional(),
});

export const UserUpdateTypeSchema = z.object({
  id: z.string(),
  type: z.enum(["User", "Seller"]),
});

export const UserPasswordUpdateSchema = z.object({
  id: z.string(),
  password,
});
