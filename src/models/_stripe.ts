import { z } from "zod";

enum CardFLagEnum {
  "Master",
  "Visa",
  "Elo",
}

export const CardSchema = z.object({
  cardFlag: z.nativeEnum(CardFLagEnum).default(CardFLagEnum.Master),
  cardName: z.string(),
  cardNumber: z.string().regex(/(\d){4}-(\d){4}-(\d){4}-(\d){4}/),
  expireDate: z.string().datetime(),
  CVC: z.number().min(100).max(999),
  installments: z.number().min(1).max(12).optional(),
});
