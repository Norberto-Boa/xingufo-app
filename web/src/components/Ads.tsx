import { AdType } from "@/@types/Ads";
import { baseUrl } from "@/utils/BaseUrl";
import Ad from "./Ad";
import CreateAdDialog from "./CreateAdDialog";

async function getAds(): Promise<AdType[] | []> {
  const res = await fetch(`${baseUrl}ads`, {
    next: {
      revalidate: 30,
    }
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data!");
  }

  return await res.json();
}

interface AdsProps {
  userEmail: string;
}

export default async function Ads({ userEmail }: AdsProps) {
  const ads = await getAds();

  return (
    <div className="flex gap-2">
      {ads.map((ad) => {
        if (userEmail === ad.team.user.email) {
          return <p key={ad.id}> None</p>;
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
