"use client";

import { ChangeEvent, FormEvent, InputHTMLAttributes, useState } from "react";
import { PencilSimpleLine } from "phosphor-react";
import { baseUrl } from "@/utils/BaseUrl";
import { CheckIfIsAuthenticatedOnClient } from "@/utils/Token";
import { ApiErrorMessage } from "@/@types/global";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  value: string;
  name: string;
  teamid: string;
}

export default function TeamInformationInput(InputProps: InputProps) {
  const [disabled, setDisabled] = useState(true);
  const [value, setValue] = useState({
    [InputProps.name]: InputProps.value,
  });
  const [error, setError] = useState("");

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { target } = e;
    setValue((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const token = CheckIfIsAuthenticatedOnClient();

    const res = await fetch(`${baseUrl}teams/${InputProps.teamid}`, {
      method: "PUT",
      body: JSON.stringify({
        [InputProps.name]: value[InputProps.name],
      }),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const errorMessage: ApiErrorMessage = await res.json();
      setError(errorMessage.message);
    } else {
      setDisabled(!disabled);
      setError("");
    }
  }

  return (
    <form
      className="mb-4 grid grid-cols-12 gap-2 items-center"
      onSubmit={handleSubmit}
    >
      <label htmlFor={InputProps.id} className="col-span-2">
        {InputProps.label}
      </label>
      <div className="col-span-8">
        <input
          name={InputProps.name}
          id={InputProps.id}
          disabled={disabled}
          className="w-full rounded py-1 px-2 mr-3 text-slate-900 block"
          onChange={handleChange}
          value={value[InputProps.name]}
          type={InputProps?.type}
          required
        />

        <span className="mt-2 text-red-500 text-sm">{error}</span>
      </div>

      {disabled ? (
        <div
          className="col-span-2"
          onClick={() => {
            setDisabled(!disabled);
            setError("");
          }}
        >
          <PencilSimpleLine
            size={32}
            className="border border-zinc-300 rounded transition-all hover:bg-zinc-400 p-1 cursor-pointer "
          />
        </div>
      ) : (
        <div className="bg-green-400 rounded py-1 px-3 transition-all hover:bg-green-500 col-span-2">
          <button type="submit">Save Changes</button>
        </div>
      )}
    </form>
  );
}
