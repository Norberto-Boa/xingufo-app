import { AdType } from "@/@types/Ads";
import { baseUrl } from "@/utils/BaseUrl";
import * as Dialog from "@radix-ui/react-dialog";
import Ad from "./Ad";
import { PlusCircle } from "phosphor-react";
import CreateAdDialog from "./CreateAdDialog";

async function getAds(): Promise<AdType[] | []> {
  const res = await fetch(`${baseUrl}ads`);

  if (!res.ok) {
    throw new Error("Failed to fetch data!");
  }

  return res.json();
}

export default async function Ads() {
  const ads = await getAds();

  if (ads.length <= 0) {
    return <p>Nao ha nenhum anuncio por enquanto!</p>;
  }

  return (
    <div className="flex gap-2">
      {ads.map((ad) => {
        return (
          <Ad
            badge={ad.team.badge}
            date={ad.gameDate}
            location={ad.location}
            name={ad.team.name}
            time={ad.gameTime}
            key={ad.id}
          />
        );
      })}
      <CreateAdDialog />
    </div>
  );
}
