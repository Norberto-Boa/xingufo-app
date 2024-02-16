type DateProps = string | Date

export function convertDateToTimezone(date : DateProps) {
  return new Date(date).toISOString();
}