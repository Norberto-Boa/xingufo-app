import { gameDTO } from "@/@types/Games";
import { addDays, isSameDay } from "date-fns";
import { GameDTO } from "../../../server/src/@types/Game";

export function SeparateGameByDates(
  games: gameDTO[],
  addedDay: number
): GameDTO[] | void {
  const today = new Date() as Date;
  const addedDate = addDays(today, addedDay);

  let selectedGames : gameDTO[] = [];


  for (let i=0; i < games.length; i++) {
    if(isSameDay(games[i].gameDate, addedDate)){
      selectedGames.push(games[i]);
    }
  }

  return selectedGames;
}
