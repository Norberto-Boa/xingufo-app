import { ApiErrorMessage } from "@/@types/global";
import { baseUrl } from "@/utils/BaseUrl";
import { CheckIfIsAuthenticatedOnServer } from "@/utils/ServerToken";
import { redirect } from "next/navigation";
import TeamInformationInput from "./TeamInformationInput";

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
          <h2 className="text-xl font-semibold">Informações da Equipe</h2>
          <span className="text-zinc-400">
            Estes sao os dados da sua equipe
          </span>
        </div>
      </div>
      {team ? (
        <div>
          <TeamInformationInput
            teamid={team.id}
            label="Name"
            name="name"
            value={team.name}
            type="text"
            id="name"
          />
          <TeamInformationInput
            teamid={team.id}
            label="Campo"
            name="homeField"
            value={team.homeField}
            type="text"
            id="homeField"
          />
          <TeamInformationInput
            teamid={team.id}
            label="Provincia"
            name="province"
            value={team.province}
            type="text"
            id="province"
          />
          <TeamInformationInput
            teamid={team.id}
            label="Cidade"
            name="city"
            value={team.city}
            type="text"
            id="city"
          />

          <TeamInformationInput
            teamid={team.id}
            label="Fundado em"
            name="foundedAt"
            defaultValue={team.foundedAt}
            value={team.foundedAt}
            type="date"
            id="foundedAt"
          />
        </div>
      ) : (
        "Nao contem equipe"
      )}
    </div>
  );
}
