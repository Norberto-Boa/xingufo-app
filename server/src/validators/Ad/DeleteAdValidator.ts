import { z } from "zod";

export const deleteAdValidator = z.object({
  id: z.coerce
    .number({
      required_error: "O ID da equipe deve ser especificado!",
      invalid_type_error: "O ID deve ser um numero!",
    })
    .int({ message: "O ID deve ser um numero inteiro" }),
});
