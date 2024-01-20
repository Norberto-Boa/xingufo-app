import { Request, Response } from "express";
import { UserService } from "../services/UserServices";
import { UserDTO } from "../@types/User";
import { createUserValidator } from "../validators/User/CreateUserValidator";
import { loginUserValidator } from "../validators/User/LoginUserValidator";
import { compare } from "bcrypt";
import { generateAccessToken } from "../services/TokenService";

export async function register(req: Request, res: Response) {
  const { name, email, password, cellphone } = createUserValidator.parse(
    req.body
  );

  const checkUserByCellphone = await UserService.existsByCellphone(cellphone);
  const checkUserByEmail = await UserService.existsByEmail(email);

  if (checkUserByCellphone || checkUserByEmail) {
    throw new Error(`User with these credentials already exists`);
  }

  await UserService.createUser({
    name: name,
    email: email,
    cellphone: cellphone,
    password: password,
  });

  return res.status(200).json({ message: "You were sucessfully registered" });
}

export async function login(req: Request, res: Response) {
  const { email, password } = loginUserValidator.parse(req.body);

  // Check if user exists by the email
  const user = await UserService.existsByEmail(email);

  if (!user) {
    throw new Error(`Credentials are wrong.`);
  }

  // Check if the passwor is correct
  const validPassword = await compare(password, user.password);

  if (!validPassword) {
    throw new Error(`Credentials are wrong.`);
  }

  // Generate the token
  const token = generateAccessToken(user.name, email);

  return res.status(200).json({
    message: "Login Sucessfully Done",
    token: token,
  });
}
