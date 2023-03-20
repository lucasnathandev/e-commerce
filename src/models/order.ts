import { History } from "./history";
import { z } from "zod";

export const OrderId = z.object({
  id: z.string(),
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

const history: z.AnyZodObject = History;

export const Order = OrderId.extend({
  status,
  history,
});
