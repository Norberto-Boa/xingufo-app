import { ApiErrorMessage } from "@/@types/global";
import { baseUrl } from "@/utils/BaseUrl";
import { CheckIfIsAuthenticatedOnServer } from "@/utils/ServerToken";
import { redirect } from "next/navigation";
import UserInformationInput from "./UserInformationInput";

interface TeamDTO {
  id: string;
  name: string;
  badge: string;
  foundedAt: string;
  homeField: string;
  city: string;
  province: string;
}

async function getTeam(): Promise<TeamDTO | undefined> {
  const auth = CheckIfIsAuthenticatedOnServer();

  if (!auth) {
    redirect("/login");
  }

  const res = await fetch(`${baseUrl}teams/user/email/${auth.decoded.email}`, {
    headers: {
      Authorization: "Bearer " + auth.token,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data!");
  }

  return res.json();
}

export default async function TeamInformation() {
  const team = await getTeam();

  return (
    <div>
      <div className="mb-3 flex justify-between">
        <div>
          <h2 className="text-xl font-semibold">Informações Pessoais</h2>
          <span className="text-zinc-400">
            Os teus dados pessoais colectados pela plataforma
          </span>
        </div>
      </div>
      {team ? (
        <div>
          <UserInformationInput
            label="Name"
            name="name"
            value={team.name}
            type="text"
            id="name"
          />
          <UserInformationInput
            label="Campo"
            name="homeField"
            value={team.homeField}
            type="text"
            id="homeField"
          />
          <UserInformationInput
            label="Provincia"
            name="province"
            value={team.province}
            type="text"
            id="province"
          />
          <UserInformationInput
            label="Cidade"
            name="city"
            value={team.city}
            type="text"
            id="city"
          />

          <UserInformationInput
            label="Fundado em"
            name="foundedAt"
            defaultValue={team.foundedAt}
            value={team.foundedAt}
            type="datetime-local"
            id="foundedAt"
          />
        </div>
      ) : (
        "Nao contem equipe"
      )}
    </div>
  );
}
