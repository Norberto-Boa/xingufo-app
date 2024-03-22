import { JwtPayload, verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export function CheckIfIsAuthenticatedOnServer():
  | { token: string; decoded: JwtPayload }
  | undefined {
  const cookieStore = cookies();
  const token = cookieStore.get("auth.token");
  let decoded;
  if (token) {
    try {
      decoded = verify(token.value, "Mena") as JwtPayload;
      return { token: token.value, decoded: decoded };
    } catch (err) {
      redirect("/login");
    }
  }
}
