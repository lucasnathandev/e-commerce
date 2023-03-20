import { Delivery } from "./delivery";
import { z } from "zod";

export const DeliveryProviderId = z.object({
  id: z.string(),
});

const cnpj = z.string().min(14, "CNPJ inválido").max(18, "CNPJ inválido");
const price = z.number();
const deliveries = z.array(Delivery);

export const DeliveryProvider = DeliveryProviderId.extend({
  cnpj,
  price,
  deliveries,
});
