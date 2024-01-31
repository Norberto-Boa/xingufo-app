import { format } from "date-fns";
import { pt } from "date-fns/locale";

const locales = { pt };

export default function (date: Date, formatStr = "PP") {
  return format(date, formatStr, {
    locale: locales.pt,
  });
}
