import { Order } from "./order";
import { User } from "./user";
import { z } from "zod";

export const HistoryId = z.object({
  id: z.string(),
});

const action = z.string();
const user: z.AnyZodObject = User;
const userId = z.string();
const order = Order;
const orderId = z.string();

export const History = HistoryId.extend({
  action,
  user,
  userId,
  order,
  orderId,
});
