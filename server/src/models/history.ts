import { z } from "zod";

export const HistoryId = z.object({
  id: z.string().optional(),
});

const action = z.string();
const userId = z.string();
const orderId = z.string().optional();

export const History = HistoryId.extend({
  action,
  userId,
  orderId,
});
