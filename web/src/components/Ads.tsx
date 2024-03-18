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

interface AdsProps {
  userEmail: string;
}

export default async function Ads({ userEmail }: AdsProps) {
  const ads = await getAds();

  return (
    <div className="flex gap-2">
      {ads.map((ad) => {
        if (userEmail == ad.team.user.email) {
          return null;
        }
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
