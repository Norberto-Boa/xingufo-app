import { gameDTO } from "@/@types/Games";
import { addDays, isSameDay } from "date-fns";
import { GameDTO } from "../../../server/src/@types/Game";

interface gamesSeprated {
  date: string;
  games: gameDTO[];
}


export function separateGameByDates(games : gameDTO[]){
  const gamesByDate : { [key : string] : gameDTO[]} = {};

  games.forEach(game => {
    const date = String(game.gameDate);

    if(!gamesByDate[date]){
      gamesByDate[date] = [];
    }

    gamesByDate[date].push(game);
  });

  const gamesSeparated: gamesSeprated[] = Object.entries(gamesByDate).map(([date, games]) => ({
    date,
    games
  }))

  return gamesSeparated;
}


