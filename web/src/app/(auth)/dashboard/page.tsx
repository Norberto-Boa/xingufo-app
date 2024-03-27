import { cookies } from "next/headers";
import { JwtPayload, verify } from "jsonwebtoken";
import Ads from "@/components/Ads";
import { redirect } from "next/navigation";
import Games from "@/components/Games";
import { CheckIfIsAuthenticatedOnServer } from "@/utils/ServerToken";

interface Payload extends JwtPayload {
  email: string;
  name: string;
}

const token = CheckIfIsAuthenticatedOnServer();

export default function Dashboard() {
  let decoded;
  if (token) {
    decoded = token.decoded;
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
          <span className="text-emerald-600 font-bold">{decoded.name}</span>
        </h1>
        <span className="mt-8 text-lg text-zinc-500">
          Conecte-se com os seus colegas
        </span>
      </div>

      {/* Ads */}
      <div className="px-9 mt-4">
        <div className="w-full px-4 py-4 bg-zinc-900 border border-zinc-600 rounded-lg">
          <div className="mb-3">
            <h2 className="text-xl font-semibold">Anuncios</h2>
            <span className="text-zinc-400">
              Encontre aqui o seu adversario
            </span>
          </div>
          <div className="flex justify-between">
            <Ads userEmail={decoded.email} />
          </div>
        </div>
      </div>

      {/* Games */}
      <div className="px-9 mt-4">
        <div className="w-full px-4 py-4 bg-zinc-900 w border-zinc-600 rounded-lg">
          <Games />
        </div>
      </div>
    </div>
  );
}
