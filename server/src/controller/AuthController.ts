import { Request, Response } from "express";
import { UserService } from "../services/userServices";
import { UserDTO } from "../@types/User";
import { createUserValidator } from "../validators/User/createUserValidator";

export async function register(req: Request, res: Response) {
  const { name, email, password, cellphone } = createUserValidator.parse(
    req.body
  );

  const userAlreadyExists = await UserService.existByEmailOrCellphone(
    email,
    cellphone
  );

  if (userAlreadyExists) {
    throw new Error(`User with these credentials already exists`);
  }

  await UserService.createUser({
    name: name,
    email: email,
    cellphone: cellphone,
    password: password,
  });

  return res.send({ message: "User sucessfully created" });
}
