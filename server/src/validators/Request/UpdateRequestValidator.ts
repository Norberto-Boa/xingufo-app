import { z } from "zod";

export const UpdateRequestValidator = z.object({
  id: z.coerce
    .number({
      required_error: "O ID do request deve ser especificado!",
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
  gameTime: z.coerce
    .date({
      required_error: "O jogo deve ter uma data proposta",
      invalid_type_error: "Do not fool us please!",
    })
    .optional(),
});
