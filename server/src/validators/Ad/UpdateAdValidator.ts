import { z } from "zod";

export const UpdateAdValidator = z.object({
  id: z.coerce
    .number({
      required_error: "O ID da equipe deve ser especificado!",
      invalid_type_error: "O ID deve ser um numero!",
    })
    .int({ message: "O ID deve ser um numero inteiro" }),
  gameDate: z.coerce
    .date({
      required_error: "A data pretendida é obrigatória",
      invalid_type_error: "A data inserida não é valida!",
    })
    .min(new Date(), {
      message: "O Anuncio deve ser marcado pelo menos um dia antes",
    })
    .optional(),
  gameTime: z
    .string()
    .datetime({ message: "A hora do jogo deve ser bem especificada!" })
    .optional(),
  location: z.string().optional(),
});
