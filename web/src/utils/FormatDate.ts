import { formatToTimeZone } from "date-fns-timezone";
import {format} from "date-fns";

export function formatDate(date: string): string {
  return formatToTimeZone(date, "DD/MM/YYYY", {
    timeZone: "Africa/Johannesburg",
  });
}

export function GamesTitle(date: string | Date): string {
  return format(date,"DD, MMMM YYYY");
}