import { z } from "zod";

export const editUserValidator = z.object({
  name: z
    .string({
      invalid_type_error: "Name must be a string",
    })
    .regex(new RegExp(/(^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-Z]$)/), {
      message: "Name must only contain alphabets.",
    })
    .optional(),
  email: z
    .string({
      invalid_type_error: "Email must be a string",
    })
    .email({ message: "Please enter a valid email" })
    .optional(),
  cellphone: z
    .string({
      invalid_type_error: "Cellphone must a string",
    })
    .length(9, { message: "Cellphone number must only have 9 characters" })
    .optional(),
});
