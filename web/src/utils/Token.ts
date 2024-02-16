import { JwtPayload, verify } from "jsonwebtoken";
import { parseCookies } from "nookies";
// import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// export function CheckIfIsAuthenticatedOnServer(): string | undefined {
//   const cookieStore = cookies();
//   const token = cookieStore.get("auth.token");
//   let decoded;
//   if (token) {
//     try {
//       decoded = verify(token.value, "Mena") as JwtPayload;
//       return token?.value;
//     } catch (err) {
//       redirect("/login");
//     }
//   }
// }

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
