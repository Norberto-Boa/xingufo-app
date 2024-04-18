"use client";
import Link from "next/link";
import clsx from "clsx";

interface MenuItemProps {
  url: string;
  name: string;
  status: boolean
  // icon: JSX.Element;
}


const MenuItem = (props: MenuItemProps) => {

  return (
    <Link href={"/dashboard"} className={clsx("flex w-[calc(100%-1rem)] gap-2 h-6 justify-start items-center mx-3 rounded-md p-4", {
      "bg-green-500 text-white": props.status,
      "bg-transparent text-zinc-900": !props.status
    })}
    >
      {/* {props.icon} */}
      <span className={`font-bold text-xl'}`}>{props.name}</span>
    </Link>
  )

}

export { MenuItem };