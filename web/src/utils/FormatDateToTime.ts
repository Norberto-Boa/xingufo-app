import { formatToTimeZone } from "date-fns-timezone";

export function formatDateToTime(date: string): string {
  return formatToTimeZone(date, "HH:mm", { timeZone: "Africa/Johannesburg" });
}
