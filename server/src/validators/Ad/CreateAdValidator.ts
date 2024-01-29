import { z } from "zod";

export const createAdValidator = z.object({
  gameDate: z.coerce
    .date({
      required_error: "A data pretendida é obrigatória",
      invalid_type_error: "A data inserida não é valida!",
    })
    .min(new Date(), {
      message: "O Anuncio deve ser marcado pelo menos um dia antes",
    }),
  gameTime: z
    .string()
    .datetime({ message: "A hora do jogo deve ser bem especificada!" }),
  location: z.string().optional(),
});
