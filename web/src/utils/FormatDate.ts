import { formatToTimeZone } from "date-fns-timezone";

export function formatDate(date: string): string {
  return formatToTimeZone(date, "DD/MM/YYYY", {
    timeZone: "Africa/Johannesburg",
  });
}
