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
}

export default function UserInformationInput(InputProps: InputProps) {
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

    const res = await fetch(`${baseUrl}auth/update`, {
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
    <form className="mb-4 flex gap-2 items-center" onSubmit={handleSubmit}>
      <label htmlFor={InputProps.id}>{InputProps.label}</label>
      <input
        name={InputProps.name}
        id={InputProps.id}
        disabled={disabled}
        className="w-3/5 rounded ml-2 py-1 px-2 mr-3 text-slate-900"
        onChange={handleChange}
        value={value[InputProps.name]}
      />

      <span className="mt-2 text-red-500 text-sm">{error}</span>

      {disabled ? (
        <div
          className="border border-zinc-300 rounded p-1 cursor-pointer transition-all hover:bg-zinc-400"
          onClick={() => {
            setDisabled(!disabled);
            setError("");
          }}
        >
          <PencilSimpleLine size={20} />
        </div>
      ) : (
        <div className="bg-green-400 rounded py-1 px-3 transition-all hover:bg-green-500">
          <button type="submit">Save Changes</button>
        </div>
      )}
    </form>
  );
}
