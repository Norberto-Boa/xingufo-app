import { z } from "zod";

export const CreateRequestValidator = z.object({
  fromTeamId: z
    .number({
      required_error: "O ID do requerente deve ser um numero!",
    })
    .int({
      message: "O numero deve ser inteiro",
    }),
  receiverTeamId: z
    .number({
      required_error: "O ID do desafiador deve ser um numero!",
    })
    .int({
      message: "O numero deve ser inteiro",
    }),
  gameDate: z.coerce
    .date({
      required_error: "A data pretendida é obrigatória",
      invalid_type_error: "A data inserida não é valida!",
    })
    .min(new Date(), {
      message: "O Anuncio deve ser marcado pelo menos um dia antes",
    }),
  gameTime: z.coerce.date({
    required_error: "O jogo deve ter uma data proposta",
    invalid_type_error: "Do not fool us please!",
  }),
  location: z.string().optional(),
});
