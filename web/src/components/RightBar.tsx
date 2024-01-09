import { News } from "./News";
import { UserTools } from "./UserTools";


const RightBar = () => {
  return (
    <div className="pt-10 px-8 bg-zinc-300 min-w-[200px] max-w-xs">
      <UserTools />
      <News />
    </div>
  )
}

export { RightBar };