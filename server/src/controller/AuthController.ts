import { Request, Response } from "express";
import { UserService } from "../services/UserServices";
import { UserDTO } from "../@types/User";
import { createUserValidator } from "../validators/User/CreateUserValidator";
import { loginUserValidator } from "../validators/User/LoginUserValidator";
import { compare } from "bcrypt";
import { generateAccessToken } from "../services/TokenService";
import { decryptedToken } from "../@types/Token";

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
    cellphone: "+258" + cellphone,
    password: password,
  });

  return res.status(201).json({ message: "You were sucessfully registered" });
}

// Function that is called when the user is logging in
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

export async function getUserDetails(req: Request, res: Response) {
  const userData: decryptedToken = (req as any).user;

  const userDetails = await UserService.getUserByEmail(userData.email);

  if (!userDetails) {
    return res.status(404).json({ message: "Usuario nao encontrado!" });
  }

  return res.status(200).json(userDetails);
}
