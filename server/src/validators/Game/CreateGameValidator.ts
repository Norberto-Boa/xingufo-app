import { z } from "zod";

export const createGameValidator = z.object({
  location: z.string({
    required_error: "O jogo deve ter uma localização!",
  }),
  homeTeamId: z.coerce.number({
    required_error: "O jogo deve ter uma equipe de casa!",
    invalid_type_error: "O ID deve ser um numero.",
  }),
  awayTeamId: z.coerce.number({
    required_error: "O jogo deve ter uma equipe de fora!",
    invalid_type_error: "O ID deve ser um numero.",
  }),
  gameTime: z.coerce.date({
    required_error: "O jogo deve ter uma hora!",
    invalid_type_error: "A hora deve ser uma data",
  }),
  gameDate: z.coerce.date({
    required_error: "O jogo deve ter uma data",
    invalid_type_error: "A data não está bem formatada.",
  }),
});
