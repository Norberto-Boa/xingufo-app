import dayjs from "dayjs";

const generateDates = () => {
  const dates = new Array<Date>();
  var date = dayjs().startOf("day").toDate();
  var lastDate = dayjs().startOf("day").add(10, "day").toDate();

  while (date < lastDate) { 
    dates.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }

  return dates;
}

export { generateDates };