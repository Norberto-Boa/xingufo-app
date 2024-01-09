import { Clock, MapPin, SoccerBall } from "phosphor-react";
import { isPast, format } from "date-fns";
import { ptBR } from "date-fns/locale";


interface FixturePlayedProps{
  HomeTeam: string;
  AwayTeam: string;
  Date: Date;
  Location: string;
  HomeTeamGoals: number;
  AwayTeamGoals: number;
}

const FixturePlayed = (props: FixturePlayedProps) => {
  const GameDate = format(props.Date, "EEEE • d 'de' MMMM '•' k'h'mm", {locale: ptBR})
  const checkWinner = () => {
    if (props.HomeTeamGoals > props.AwayTeamGoals) { 
      return "Home Team won";
    } else if (props.HomeTeamGoals < props.AwayTeamGoals) {
      return "Away Team won";
    } else if (props.HomeTeamGoals == props.AwayTeamGoals) {
      return "Draw";
    }
  }


  return (
    <div className='h-[80px] px-8 flex w-full mt-8 items-center font-medium font-roboto text-lg rounded-md overflow-hidden'>
      <div className='text-center justify-center bg-emerald-400 p-4 rounded-l h-[80px] items-center flex text-white w-[120px]'>
        <span>
          {checkWinner()}
        </span>
      </div>
      <div className='basis-1/2 bg-white p-2 rounded-r-lg h-[80px] flex flex-col justify-between' >
        <div className="flex justify-between">
          <span>{props.HomeTeam}</span><br />
          <span className="flex gap-1 items-center">
            <SoccerBall size={20} color={props.HomeTeamGoals >= props.AwayTeamGoals ? "#34d399" : "red"} />
            {props.HomeTeamGoals}
          </span>
        </div>
        <div className="flex justify-between">
          <span>{props.AwayTeam}</span>
          <span className=" flex gap-1 items-center">
            <SoccerBall size={20} color={props.HomeTeamGoals <= props.AwayTeamGoals ? "#34d399" : "red"} />
            {props.AwayTeamGoals}</span>
        </div>
      </div>

    </div>
  )
}

export { FixturePlayed };