import { UserCircle } from "phosphor-react";
import { ReactElement } from "react";



interface AdProps {
  profile: string;
  date: string;
  Campo: 'Fora' | 'Casa ' | 'Tanto faz'
}


const Ad = (props: AdProps) => {
  return (
    <div className='keen-slider__slide bg-zinc-300 flex flex-col items-center !w-[130px] !max-w-[130px] rounded-xl max-h-40 h-[180px]'>
      <span className="px-2 w-full mb-2 text-center overflow-hidden py-1 text-white font-roboto font-bold bg-green-600 text-base">{props.date}</span>
      <div className="rounded-full mb-2 w-24">
        <img src={props.profile} alt="" className="w-24" />
      </div>
      <span className="font-bold font-roboto whitespace-nowrap text-center overflow-hidden text-ellipsis px-2 w-32"> Sikwama FC</span>
      
      <span className="font-regular text-sm text-green-900 font-semibold">{props.Campo}</span>
    </div>
  )
}

export { Ad };