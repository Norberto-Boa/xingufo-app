import { format } from "date-fns";

export function formatDateToTime(date: string): string {
  return format(date, "kk':'mm");
}
