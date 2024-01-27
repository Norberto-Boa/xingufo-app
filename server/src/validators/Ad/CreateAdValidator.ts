import { z } from "zod";

export const createAdValidator = z.object({
  teamId: z.coerce
    .number({
      required_error: "Campo equipe é obrigatório",
    })
    .int({ message: "A equipe deve ser um número inteiro!" }),
  gameDate: z.coerce
    .date({
      required_error: "A data pretendida é obrigatória",
    })
    .refine((date) => {
      return date.getUTCDate > new Date(Date.now()).getUTCDate;
    }, "Data deve ser maior que a data actual!"),
  gameTime: z.coerce.date(),
  location: z.string().optional(),
});
