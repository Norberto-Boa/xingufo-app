import { cookies } from "next/headers";
import { JwtPayload, verify } from "jsonwebtoken";
import Ads from "@/components/Ads";
import { redirect } from "next/navigation";

interface Payload extends JwtPayload {
  email: string;
  name: string;
}

export default function Dashboard() {
  const cookieStore = cookies();
  const token = cookieStore.get("auth.token");
  let decoded;
  if (token) {
    try {
      decoded = verify(token.value, "Mena") as Payload;
    } catch (err) {
      console.log(err);
      redirect("/login");
    }
  }

  if (!decoded) {
    redirect("/login");
  }

  return (
    <div>
      {/* Titutlo */}
      <div className="pt-8 px-9">
        <h1 className="text-2xl font-semibold">
          Bem-vindo,{" "}
          <span className="text-emerald-600 font-bold">{decoded?.name}</span>
        </h1>
        <span className="mt-8 text-lg text-zinc-500 text-semibold">
          Conecte-se com os seus colegas
        </span>
      </div>

      {/* Ads */}
      <div className="px-9 mt-4">
        <div className="w-full px-4 py-4 bg-zinc-900 border border-zinc-600 rounded-lg flex justify-between">
          <Ads userEmail={decoded.email} />
        </div>
      </div>
    </div>
  );
}
