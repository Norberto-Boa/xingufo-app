import { cookies } from "next/headers";
import { JwtPayload, verify } from "jsonwebtoken";
import Ads from "@/components/Ads";

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
  }

  return (
    <div>
      {/* Titutlo */}
      <div className="pt-8 pl-9">
        <h1 className="text-2xl font-semibold">
          Bem-vindo,{" "}
          <span className="text-emerald-600 font-bold">{decoded?.name}</span>
        </h1>
        <span className="mt-8 text-lg text-zinc-500 text-semibold">
          Conecte-se com os seus colegas
        </span>
      </div>

      {/* Ads */}
      <div className="pl-9">
        <div className="w-full px-4 py-2 bg-zinc-600 flex justify-between">
          <Ads />
        </div>
      </div>
    </div>
  );
}
