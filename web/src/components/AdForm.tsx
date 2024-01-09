import * as Checkbox from "@radix-ui/react-checkbox";
import { Check } from "phosphor-react";
import { useState } from 'react';
import clsx from "clsx";

const AdForm = () => {

  const [checked, setChecked] = useState(false);

  const handleCheckbox = () =>{
    setChecked(!checked);

  }

  return (
    <form className="flex flex-col">
      <div className="mt-2">
        <label htmlFor="location">Insira onde pretende realizar o jogo:</label>
        <div className="flex mt-1 gap-2 flex-col">
          <input
            type="text"
            name="location"
            id="location"
            className="text-base px-2 rounded-md bg-white h-10 w-3/4 disabled:cursor-not-allowed"
            placeholder="Exemplo: campo de Sikwama"
            disabled= {checked ? true : false}
          />
          <div className="flex items-center gap-2 mb-4">
            <Checkbox.Root
              className="flex items-center group"
              id="def"
              onCheckedChange={handleCheckbox}
            >
              <div className="flex w-6 h-6 bg-white rounded items-center justify-center group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 transition-all duration-500">
                <Checkbox.Indicator >
                  <Check size={24} className="text-white" weight="bold"/>
                </Checkbox.Indicator>
              </div>
            </Checkbox.Root>
            <label htmlFor="def" className="leading-none">Qualquer campo</label>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col gap-1">
        <label htmlFor="date">Quando pretende jogar</label>
        <input
          type="datetime-local"
          name="date" id="date"
          className="h-10 w-3/4 px-2 rounded-md uppercase"
          min={Date.now()}
        />
      </div>
      
      <button
        type="submit"
        className="text-center mt-8 py-2 px- border-2 border-green-500 bg-green-500 text-white font-sans font-bold uppercase rounded-md"
      >
        Submeter
      </button>

    </form>
  )
}

export { AdForm };