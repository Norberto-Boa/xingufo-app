import { Request, Response } from "express";
import { UserService } from "../services/UserServices";
import { UserDTO } from "../@types/User";
import { createUserValidator } from "../validators/User/CreateUserValidator";
import { loginUserValidator } from "../validators/User/LoginUserValidator";
import { compare } from "bcrypt";
import { generateAccessToken } from "../services/TokenService";
import { decryptedToken } from "../@types/Token";
import { editUserValidator } from "../validators/User/EditUserValidator";

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

export async function UpdateUserData(req: Request, res: Response) {
  const { cellphone, email, name } = editUserValidator.parse(req.body);

  const userData: decryptedToken = (req as any).user;

  const User = await UserService.existsByEmail(userData.email);

  // Check if User Exists
  if (!User) {
    return res.status(404).json({ message: "Usuario nao encontrado!" });
  }

  if (email) {
    const userExistsByBodyEmail = await UserService.existsByEmail(email);
    if (userExistsByBodyEmail) {
      if (userExistsByBodyEmail.email == User.email) {
        return res.status(200).json({ message: "Updated Successfully!" });
      }

      return res
        .status(400)
        .json({ message: "Usuario com esse email ja existe!" });
    }
  }

  // Check if User is updating cellphone number
  if (cellphone) {
    // Check if user with same cellphone number already exists
    const userExistsWithCellPhone = await UserService.existsByCellphone(
      cellphone
    );

    // Check if User is did not change their cell phone number on update
    if (userExistsWithCellPhone) {
      if (userExistsWithCellPhone.id == User.id) {
        return res.status(200).json({ message: "Updated Successfully!" });
      }

      return res
        .status(400)
        .json({ message: "Usuario com este numero ja existe!" });
    }
  }

  const updatedUser = await UserService.update(User.id, {
    cellphone: cellphone,
    email,
    name,
  });

  return res.status(201).json(updatedUser);
}
