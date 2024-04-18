import { JwtPayload, verify } from "jsonwebtoken";
import { cookies } from "next/headers";

export function CheckIfIsAuthenticatedOnServer():
  | { token: string; decoded: JwtPayload | string }
  | undefined {
  const cookieStore = cookies();
  const token = cookieStore.get("auth.token");
  if (token) {
    try {
      const verified = verify(token.value, "Mena");

      return { token: token.value, decoded: verified };
    } catch (error) {
      return;
    }
  }

  return;
}
