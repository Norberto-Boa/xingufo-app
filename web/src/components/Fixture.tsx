import { Clock, MapPin } from "phosphor-react";
import { isPast, format } from "date-fns";
import { ptBR } from "date-fns/locale";


interface FixtureProps{
  HomeTeam: string;
  AwayTeam: string;
  Date: Date;
  Location: string;
}

const Fixture = (props: FixtureProps) => {
  const isPlayed = isPast(props.Date);
  const GameDate = format(props.Date, "EEEE • d 'de' MMMM '•' k'h'mm", {locale: ptBR})

  return (
    <div className='h-[80px] px-8 flex w-full mt-8 items-center font-medium font-roboto text-lg rounded-md overflow-hidden'>
      <div className='text-center justify-center bg-emerald-400 p-4 rounded-l h-[80px] items-center flex text-white w-[120px]'>
        <span>
          {isPlayed ? 'Played': 'Not Played'}
        </span>
      </div>
      <div className='basis-1/2 bg-white p-2 rounded-r-lg h-[80px] flex flex-col justify-between' >
        <div className="flex justify-between">
          <span>{props.HomeTeam}</span><br />
          <span className="flex gap-1 items-center">
            <Clock size={20} color={"#34d399"} />
            {GameDate}
          </span>
        </div>
        <div className="flex justify-between">
          <span>{props.AwayTeam}</span>
          <span className=" flex gap-1 items-center">
            <MapPin size={20} color={'#34d399'} />
            {props.Location}</span>
        </div>
      </div>

    </div>
  )
}

export { Fixture };