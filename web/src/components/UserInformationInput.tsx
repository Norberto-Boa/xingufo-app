"use client";

import { ChangeEvent, FormEvent, InputHTMLAttributes, useState } from "react";
import { PencilSimpleLine } from "phosphor-react";

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

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { target } = e;
    setValue((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    setDisabled(!disabled);
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

      {disabled ? (
        <div
          className="border border-zinc-300 rounded p-1 cursor-pointer transition-all hover:bg-zinc-400"
          onClick={() => setDisabled(!disabled)}
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
