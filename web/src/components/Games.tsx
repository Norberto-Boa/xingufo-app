import { gameDTO } from "@/@types/Games";
import { baseUrl } from "@/utils/BaseUrl";
import { SeparateGameByDates } from "@/utils/SeparateGamesByDate";
import { CheckIfIsAuthenticatedOnServer } from "@/utils/ServerToken";

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
  let i = 0;

  const gamesByDates = {
    0: SeparateGameByDates(games, i),
    1: SeparateGameByDates(games, i++),
    2: SeparateGameByDates(games, i++),
    3: SeparateGameByDates(games, i++),
    4: SeparateGameByDates(games, i++),
    5: SeparateGameByDates(games, i++),
    6: SeparateGameByDates(games, i++),
  }

  console.log(gamesByDates);

  return (
    <div>
      {
        <p>Hola</p>
      }
    </div>
  );
}
