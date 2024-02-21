import { JwtPayload, verify } from "jsonwebtoken";
import { parseCookies } from "nookies";
// import { cookies } from "next/headers";
import { redirect } from "next/navigation";


export function CheckIfIsAuthenticatedOnClient() {
  const { "auth.token": token } = parseCookies();
  let decoded;
  if (token) {
    try {
      decoded = verify(token, "Mena") as JwtPayload;
      return token;
    } catch (err) {
      redirect("/login");
    }
  }
}
