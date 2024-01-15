import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export default function Input(props: InputProps) {
  return (
    <input className="bg-zinc-400 dark:bg-black border border-zinc-800 py-3 px-4 rounded text-sm placeholder:text-zinc-500 w-[100%] mt-1" />
  );
}
