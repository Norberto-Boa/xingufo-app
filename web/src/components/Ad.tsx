import { formatDate } from "@/utils/FormatDate";
import { formatDateToTime } from "@/utils/FormatDateToTime";
import Image from "next/image";

interface AdProps {
  badge: string;
  date: string;
  time: string;
  location: string;
  name: string;
}

export default function Ad({ badge, date, time, location, name }: AdProps) {
  return (
    <div className="bg-zinc-700 flex flex-col items-center !w-[150px] rounded-lg max-h-52 h-[220px] overflow-hidden">
      <div className="px-2 w-full mb-2 text-center py-1 text-white font-bold bg-green-600 text-base">
        {formatDate(date)}
      </div>
      <div className="rounded-full mb-2 w-16">
        <Image
          src={badge}
          alt={name}
          className="w-full"
          width={80}
          height={80}
        />
      </div>
      <span className="font-bold whitespace-nowrap text-center overflow-hidden text-ellipsis px-2 w-32">
        {name}
      </span>
      <span className="font-semibold text-green-400 mb-2 text-center text-ellipsis overflow-hidden whitespace-nowrap px-1 w-32">
        {location}
      </span>
      <span className="font-semibold text-white">{formatDateToTime(time)}</span>
    </div>
  );
}
