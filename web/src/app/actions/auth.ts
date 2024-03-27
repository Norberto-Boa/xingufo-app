"use server";

import { ApiError } from "@/@types/global";
import { baseUrl } from "@/utils/BaseUrl";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logOut(){
  cookies().delete('auth.token');
  redirect('/login');
}

interface FormValues {
  email: string;
  password: string;
}

interface LoginSuccess {
  message: string;
  token: string;
}

export async function login({email, password}: FormValues){
  const req = await fetch(baseUrl + "login", {
    method: "POST",
    body: JSON.stringify({ email: email, password: password }),
    headers: {
      "content-type": "application/json",
    },
  });

  if (req.ok) {
    const successResponse: LoginSuccess = await req.json();
    cookies().set({
      name: "auth.token",
      value: successResponse.token,
      path: "/"
    });

    redirect("/dashboard");
  } else {
    const errorMessage: ApiError = await req.json();
    return {message: errorMessage.error.message};
  }
}