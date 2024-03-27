import { gameDTO } from "@/@types/Games";
import { baseUrl } from "@/utils/BaseUrl";
import { separateGameByDates } from "@/utils/SeparateGamesByDate";
import { CheckIfIsAuthenticatedOnServer } from "@/utils/ServerToken";
import { GamesTitle, formatTime } from "../utils/FormatDate";
import Image from "next/image";
import Time from "./Time";
import Location from "./Location";
import { redirect } from "next/navigation";

const token = CheckIfIsAuthenticatedOnServer();

async function getGames(): Promise<gameDTO[] | []> {
  const res = await fetch(`${baseUrl}games`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data!");
  }

  return res.json();
}

export default async function Games() {
  const games = await getGames();

  if (!games) {
    return <p>Não há jogos nos próximos dias!</p>;
  }

  const separatedGames = separateGameByDates(games);

  return (
    <div>
      <div className="mb-3">
        <h2 className="text-xl font-semibold">Jogos</h2>
        <span className="text-zinc-400">
          Para Proxima semana temos {games.length} jogos marcados!
        </span>
      </div>

      {separatedGames.map(({ date, games }) => (
        <div key={date} className="py-2 px-4 bg-zinc-800 w-full rounded">
          <h2 className="mb-2 font-bold text-lg">{GamesTitle(date)}</h2>
          <div>
            {games.map((game) => (
              <div
                key={game.id}
                className="border border-zinc-500 p-4 rounded-full flex gap-4 items-center"
              >
                {/* Home Team */}
                <div className="flex items-center gap-2 text-lg font-semibold">
                  <Image
                    className="rounded-full w-auto h-auto"
                    src={game.home.badge}
                    width={30}
                    height={30}
                    alt={game.home.name}
                  />
                  {game.home.name}
                </div>

                {/* VS text */}
                <div className="py-2 px-3 rounded-full bg-zinc-700 text-uppercase font-medium text-lg border border-zinc-500">
                  vs
                </div>

                {/* Away Team */}
                <div className="flex items-center gap-2 text-lg font-semibold">
                  {game.away.name}
                  <Image
                    className="rounded-full w-auto h-auto"
                    src={game.away.badge}
                    width={30}
                    height={30}
                    alt={game.away.name}
                  />
                </div>

                <div className="w-[1px] h-10 bg-zinc-200" />

                {/* Location */}
                <Location location={game.location} />
                {/* Time */}
                <Time gameTime={game.gameTime} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
