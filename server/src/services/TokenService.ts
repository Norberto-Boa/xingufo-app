import jwt, { JwtPayload } from "jsonwebtoken";
import { verify } from "jsonwebtoken";
import { decryptedToken } from "../@types/token";

export function generateAccessToken(name: string, email: string) {
  const Secret: string = process.env.JWT_SECRET as string;

  return jwt.sign({ name: name, email: email }, Secret, {
    expiresIn: "2h",
  });
}
// export function decryptToken(token: string): decryptedToken | null {
//   const decryptedToken = verify(token, process.env.JWT_SECRET as string);

//   if (typeof decryptToken == "string") {
//     throw new Error("O Token é invalido.");
//   } else if (typeof decryptToken == "object") {
//     return decryptedToken as decryptedToken;
//   }

//   return null;
// }

export function generateRefreshToken(oldRefreshToken: string) {
  // const checkRefreshToken =
}
