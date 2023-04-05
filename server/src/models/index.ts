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
  ProductSearchSchema,
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
  ProductSearchSchema,
  ProductUserIdSchema,
  CreateProductSchema,
  UpdateProductSchema,
  CartId,
  CartSchema,
  UpdateCartSchema,
  OrderId,
  OrderSchema,
  History,
  HistoryId,
};
