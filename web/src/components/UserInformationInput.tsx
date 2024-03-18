"use client";

import { InputHTMLAttributes, useState } from "react";
import { PencilSimpleLine } from "phosphor-react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  value: string;
}

export default function UserInformationInput(InputProps: InputProps) {
  const [disabled, setDisabled] = useState(true);

  return (
    <div className="mb-4 flex gap-2 items-center">
      <label htmlFor={InputProps.id}>{InputProps.label}</label>
      <input
        name={InputProps.name}
        id={InputProps.id}
        disabled={disabled}
        className="w-3/5 rounded ml-2 py-1 px-2 mr-3 text-slate-900"
        value={InputProps.value}
      />

      <div
        className={`p-1 ${
          disabled ? "border border-zinc-300" : "bg-green-400"
        } rounded`}
        onClick={() => setDisabled(!disabled)}
      >
        {disabled ? (
          <PencilSimpleLine size={20} />
        ) : (
          <div>
            <button type="submit" onClick={() => setDisabled(!disabled)}>
              Save Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
