import { baseUrl } from "@/utils/BaseUrl";
import UserInformationInput from "./UserInformationInput";
import { CheckIfIsAuthenticatedOnServer } from "@/utils/ServerToken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface UserDetailsDTO {
  name: string;
  email: string;
  cellphone: string;
}

async function getUserInformation(): Promise<UserDetailsDTO> {
  const token = CheckIfIsAuthenticatedOnServer();

  if (!token) {
    redirect("/login");
  }

  const res = await fetch(`${baseUrl}userinfo`, {
    headers: {
      Authorization: "Bearer " + token.token,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data!");
  }

  return res.json();
}

export default async function UserInformation() {
  const userInformation = await getUserInformation();

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

      <div>
        <UserInformationInput
          label="Name"
          type="text"
          name="name"
          id="name"
          value={userInformation.name}
        />

        <UserInformationInput
          label="Cellphone"
          type="text"
          name="cellphone"
          id="cellphone"
          value={userInformation.cellphone}
        />
      </div>
    </div>
  );
}
