"use client";
import { logOut } from "@/app/actions/auth";
import { destroyCookie } from "nookies";
import Link from "next/link";

const deleteCookie = async () => {
  destroyCookie(null, "auth.token");
}

export default function UserTools() {
  return (
    <div className="flex gap-3 h-12 justify-end">
      <div
        className=" w-12 h-full border-2 rounded-full border-zinc-600 p-1 flex items-center justify-center"
      >
        <Link href={"/profile"}>Profile</Link>
      </div>

      <div
        className=" w-12 h-full border-2 rounded-full border-zinc-600 p-1 flex items-center justify-center cursor-pointer"
        onClick={deleteCookie}
      >
        <form action={logOut}>
          <button type="submit">Sign Out</button>
        </form>
      </div>

      <div className="h-full flex gap-2 justify-center">
        <div className="w-12 !h-full bg-zinc-400  flex justify-center items-center overflow-hidden rounded-full align-middle select-none">
          <div
            className="w-full h-full object-cover rounded-inherit bg-zinc-400"
          // src="https://images.unsplash.com/photo-1587064712555-6e206484699b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=80&q=80"
          />
        </div>
      </div>
    </div>
  );
}
