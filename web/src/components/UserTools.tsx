import { Bell, Gear } from "phosphor-react";
import * as Avatar from "@radix-ui/react-avatar";

const UserTools = () => {
  return (
    <div className="flex gap-3 h-12 justify-end">
      <div className=" w-12 h-full border-2 rounded-full border-zinc-600 p-2 flex items-center justify-center">
        <Bell size={24} weight="fill"/>
      </div>

      <div className=" w-12 h-full border-2 rounded-full border-zinc-600 p-2 flex items-center justify-center">
        <Gear size={24} weight="fill"/>
      </div>

      <div className="h-full flex gap-2 justify-center">
        <Avatar.Root className="w-12 !h-full bg-zinc-400  flex justify-center items-center overflow-hidden rounded-full align-middle select-none">
          <Avatar.Image
            className="w-full h-full object-cover rounded-inherit"
            src="https://images.unsplash.com/photo-1587064712555-6e206484699b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=80&q=80"
          />

          <Avatar.AvatarFallback
            className="font-sans font-bold text-lg"
            delayMs={600}

          >
            ME
          </Avatar.AvatarFallback>
        </Avatar.Root>
      </div>
      
    </div>
  )
}

export { UserTools };