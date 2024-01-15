import jwt from "jsonwebtoken";

export function generateAccessToken(name: string, email: string) {
  const Secret: string = process.env.SECRET ?? "";

  return jwt.sign({ name: name, email: email }, Secret, {
    expiresIn: "2h",
  });
}

export function generateRefreshToken(oldRefreshToken: string) {
  // const checkRefreshToken =
}
