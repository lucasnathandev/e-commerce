import {
  UserCreationSchema,
  UserLoginSchema,
  UserPasswordUpdateSchema,
  UserUpdateSchema,
  UserUpdateTypeSchema,
  UserId,
} from "./user";
import {
  ProductSchema,
  CreateProductSchema,
  UpdateProductSchema,
  ProductUserIdSchema,
  ProductId,
} from "./product";
import { CartSchema, CartId, UpdateCartSchema } from "./cart";
import { OrderSchema, OrderId } from "./order";
import { History, HistoryId } from "./history";

export const models = {
  UserId,
  UserCreationSchema,
  UserLoginSchema,
  UserPasswordUpdateSchema,
  UserUpdateSchema,
  UserUpdateTypeSchema,
  ProductId,
  ProductSchema,
  ProductUserIdSchema,
  CreateProductSchema,
  UpdateProductSchema,
  CartSchema,
  CartId,
  UpdateCartSchema,
  OrderSchema,
  OrderId,
  History,
  HistoryId,
};
