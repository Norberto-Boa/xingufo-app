import { z } from "zod";

const createUserValidator = z.object({
  name: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    })
    .regex(new RegExp(/(^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-Z]$)/), {
      message: "Name must only contain alphabets.",
    }),
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email({ message: "Please enter a valid email" }),
  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Password must be a string",
    })
    .min(8, { message: "Password must be at least 8 characters long" }),
  cellphone: z
    .string({
      required_error: "Phone number is required",
      invalid_type_error: "Cellphone must a string",
    })
    .length(9, { message: "Cellphone number must only have 9 characters" }),
});

export { createUserValidator };
