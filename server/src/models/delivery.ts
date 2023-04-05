import { z } from "zod";
import { DeliveryProvider, DeliveryProviderId } from "./deliveryProvider";

export const DeliveryId = z.object({
  id: z.string().optional(),
});

const receiverName = z.string();
const zipCode = z.string().min(8).max(10);
const country = z.string();
const state = z.string();
const city = z.string();
const publicPlace = z.string();
const deliveryProvider: z.AnyZodObject = DeliveryProvider;
const deliveryProviderId = DeliveryProviderId;

export const Delivery = DeliveryId.extend({
  receiverName,
  zipCode,
  country,
  state,
  city,
  publicPlace,
  deliveryProvider,
  deliveryProviderId,
});
