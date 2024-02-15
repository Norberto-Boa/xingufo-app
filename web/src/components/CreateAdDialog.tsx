"use client";
import * as Dialog from "@radix-ui/react-dialog";
import { PlusCircle, X } from "phosphor-react";

export default function CreateAdDialog() {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="flex items-center justify-center flex-col font-bold px-2 text-center h-full border rounded-lg bg-zinc-500">
        <PlusCircle size={48} className="text-green-500" /> Criar um anuncio
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/65 fixed inset-0 w-screen h-screen" />
        <Dialog.Content className="fixed p-4 bg-slate-500 rounded-lg w-full max-w-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Dialog.Close className="absolute right-6 top-6 text-zinc-200 hover:text-zinc-400 transition-all duration-500">
            <X size={24} aria-label="Close" />
          </Dialog.Close>

          <Dialog.Title className="2xl leading-tight font-bold">
            Criar um anuncio
          </Dialog.Title>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
