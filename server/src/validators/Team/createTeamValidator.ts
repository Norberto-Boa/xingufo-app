import { z } from "zod";

const createTeamValidator = z.object({
  name: z.string({
    required_error: "O campo equipe deve ser preenchido",
    invalid_type_error: "Nome deve ser uma string",
  }),
  badge: z
    .string({
      required_error: "O campo logotipo deve ser preenchido",
      invalid_type_error: "Don't fool us nigga",
    })
    .url({ message: "O campo logotipo deve ser uma URL." }),
  foundedAt: z
    .date({
      required_error: "A equipe deve ter uma data de criação",
      invalid_type_error: "A formatacao da data esta errada",
    })
    .max(new Date()),
  homeField: z
    .string({ invalid_type_error: "O campo foi mal formatado" })
    .optional(),
  city: z.string({
    required_error: "A equipe deve ter uma cidade",
    invalid_type_error: "A formatacao da cidade esta errada",
  }),
  province: z.string({
    required_error: "A equipe deve ter uma provincia",
    invalid_type_error: "A formatacao da provincia esta errada",
  }),
});

export { createTeamValidator };
