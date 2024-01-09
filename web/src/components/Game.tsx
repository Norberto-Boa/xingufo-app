import { MapPin } from "phosphor-react";

export interface GameProps{
  HomeTeam: string
  AwayTeam: string
  location: string
  date: string
}

const Game = ({HomeTeam, AwayTeam, location, date} : GameProps) => {
  return (
    <div className="border-b-2 border-zinc-300 py-1 mb-2">
      <div className=" w-full flex justify-between mb-2">
        <div className="flex gap-2 items-center w-64">
          <div className="w-8 bg-zinc-300 max-h-10 min-h-[32px] rounded-full flex items-center justify-center text-sm font-roboto">
            {HomeTeam.charAt(0) + HomeTeam.charAt(3).toUpperCase()}
          </div>
          <span className="whitespace-nowrap overflow-hidden text-ellipsis" >{HomeTeam}</span>
        </div>

        <div className=" w-20">
          <div className=" flex min-w-[32px] p-1 max-w-[32px] bg-zinc-300 max-h-10 min-h-[32px] rounded-full items-center justify-center text-sm font-bold font-roboto">
            VS
          </div>
        </div>

        <div className="flex gap-2 items-center justify-end w-64">
          <span className="whitespace-nowrap overflow-hidden text-ellipsis">{AwayTeam}</span>
          <div className="w-8 bg-zinc-300 max-h-8 min-h-[32px] rounded-full flex items-center justify-center text-sm font-roboto ">
            {AwayTeam.charAt(0) + AwayTeam.charAt(3).toUpperCase()}
          </div>
        </div>

      </div>
      <div
        className="flex gap-2 items-center font-roboto font-semibold text-xs ml-9"
      >
        <MapPin
          size={16}
          weight="fill"
          className="text-green-500"
        />
        <span >{location}</span>
      </div>
    
        
    </div>
  )
}

export { Game };