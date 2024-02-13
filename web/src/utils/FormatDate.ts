import { format } from "date-fns";

export function formatDate(date: string): string {
  return format(date, "dd/MM/yyyy");
}
