import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { decryptedToken } from "../@types/Token";

export const requireUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new Error("Não está autorizado a aceder este recurso");
    }

    const [, token] = authHeader.split(" ");
    const decocded = verify(token, process.env.JWT_SECRET as string);
    (req as any).user = decocded as decryptedToken;
    return next();
  } catch (e) {
    return res.status(401).json({
      message: "Usuário não autenticado!",
    });
  }
};
