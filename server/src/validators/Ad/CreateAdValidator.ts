import { z } from "zod";

export const createAdValidator = z.object({
  gameDate: z.coerce
    .date({
      required_error: "A data pretendida é obrigatória",
    })
    .refine((date) => {
      return date > new Date(Date.now());
    }, "Data deve ser maior que a data actual!"),
  gameTime: z.string(),
  location: z.string().optional(),
});
