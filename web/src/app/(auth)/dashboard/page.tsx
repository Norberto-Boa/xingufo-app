import { cookies } from "next/headers";
import { JwtPayload, verify } from "jsonwebtoken";
import Ads from "@/components/Ads";
import { redirect } from "next/navigation";


export default function Dashboard() {
  const cookieStore = cookies();
  const token = cookieStore.get("auth.token");
  let decoded;
  if (token) {
    try {
      decoded = verify(token.value, "Mena") as JwtPayload;
    } catch (err) {
      console.log(err);
      redirect("/login");
    }
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
