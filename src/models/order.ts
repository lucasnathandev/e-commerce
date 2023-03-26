import { z } from "zod";

export const OrderId = z.object({
  id: z.string().optional(),
});

const status = z
  .enum([
    "Pending",
    "Processing",
    "Forwarded",
    "Completed",
    "Cancelled",
    "Refunded",
  ])
  .default("Pending");

export const Order = OrderId.extend({
  status,
});
