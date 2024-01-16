import { cookies } from "next/headers";
import { JwtPayload, verify } from "jsonwebtoken";

// interface decodedToken extends JwtPayload {
//   name: string;
//   email: string;
// }

export default function Dashboard() {
  const cookieStore = cookies();
  const token = cookieStore.get("auth.token");
  let decoded;
  if (token) {
    decoded = verify(token.value, "Mena") as JwtPayload;
    console.log(decoded);
  }

  return (
    <div>
      <p>{decoded?.name}</p>
    </div>
  );
}
