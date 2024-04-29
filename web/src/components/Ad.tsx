"use client";
import { formatDate } from "@/utils/FormatDate";
import { formatDateToTime } from "@/utils/FormatDateToTime";
import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import { X } from "phosphor-react";

interface AdProps {
  badge: string;
  date: string;
  time: string;
  location: string;
  name: string;
}

export default function Ad({ badge, date, time, location, name }: AdProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="bg-zinc-700 flex flex-col items-center !w-[150px] rounded-lg max-h-52 h-[220px] overflow-hidden">
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
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/65 fixed inset-0 w-screen h-screen" />
        {/* Dialog COntent */}
        <Dialog.Content className="fixed p-4 bg-zinc-700 rounded-lg w-full max-w-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {/* Close Button */}
          <Dialog.Close className="absolute right-4 top-4 text-zinc-300 hover:text-zinc-100 transition-all duration-500 focus:outline-none">
            <X size={24} aria-label="Close" />
          </Dialog.Close>

          {/* Dialog Title */}
          <Dialog.Title className="text-xl leading-tight font-bold max-w-80">
            Jogar contra {name}
          </Dialog.Title>

          <div className="h-[1px] w-full bg-white/25 mt-4" />

          <div className="grid grid-cols-2 gap-y-2 mt-4">
            {/* Teams name*/}
            <div className="font-semibold">
              Equipa:
            </div>
            <div className="justify-self-end">
              {name}
            </div>

            {/* Location*/}
            <div className="font-semibold">
              Campo:
            </div>
            <div className="justify-self-end">
              {location}
            </div>

            {/* Proposed Date*/}
            <div className="font-semibold">
              Data:
            </div>
            <div className="justify-self-end">
              {formatDate(date)}
            </div>
          </div>

          <button className="w-full bg-green-500 py-2 mt-4 rounded font-bold transition-all hover:bg-green-600">Marcar Jogo</button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
