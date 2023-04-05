import { z } from "zod";

export enum OrderStatusEnum {
  "Pending",
  "Processing",
  "Forwarded",
  "Completed",
  "Cancelled",
  "Refunded",
}

export const OrderId = z.object({
  id: z.string().optional(),
});

const status = z.nativeEnum(OrderStatusEnum).default(OrderStatusEnum.Pending);

export const OrderSchema = OrderId.extend({
  status,
});
