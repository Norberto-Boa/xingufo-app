import { gameDTO } from "@/@types/Games";
import { baseUrl } from "@/utils/BaseUrl";
import { separateGameByDates } from "@/utils/SeparateGamesByDate";
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


  if(!games){
    return <p>Não há jogos nos próximos dias!</p>
  }

  const separatedGames = separateGameByDates(games);

  return (
    <div>
      {separatedGames.map(({date, games}) =>(
        <div key={date}>
          <h2>{date}</h2>
          <ul>
            {games.map(game => (
              <li key={game.id}>{game.home.name} vs {game.away.name}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
