"use client";
import * as Dialog from "@radix-ui/react-dialog";
import { Field, FieldProps, Form, Formik } from "formik";
import { PlusCircle, X } from "phosphor-react";
import DatePicker, { registerLocale } from "react-datepicker";
import { addDays } from "date-fns";
import Input from "./Input";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { ApiErrorMessage } from "../@types/global";
import { convertDateToTimezone } from "@/utils/ConvertDateToTimezone";
import { baseUrl } from "@/utils/BaseUrl";
import { CheckIfIsAuthenticatedOnClient } from "@/utils/Token";
import { useRouter } from "next/navigation";

interface FormValues {
  location: string;
  gameDate: Date;
  gameTime?: Date;
}

export default function CreateAdDialog() {
  const [apiError, setApiError] = useState<ApiErrorMessage>({ message: "" });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const router = useRouter();

  const initialValues: FormValues = {
    location: "",
    gameDate: addDays(new Date(), 1),
  };

  const handleSubmit = async ({ location, gameDate, gameTime }: FormValues) => {
    setIsSubmitting(true);
    setApiError({ message: "" });
    const date = convertDateToTimezone(gameDate);

    let time;
    if (gameTime) {
      time = convertDateToTimezone(gameTime);
    }

    const token = CheckIfIsAuthenticatedOnClient();
    try {
      const req = await fetch(`${baseUrl}ads`, {
        method: "POST",
        body: JSON.stringify({
          location: location,
          gameDate: date,
          gameTime: gameTime ? time : undefined,
        }),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (req.ok) {
        const successResponse = req.json();
        router.refresh();
      } else {
        const errorMessage = await req.json();
        setApiError({ message: errorMessage.message });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger className="flex items-center justify-center flex-col font-bold px-2 text-center h-full border border-zinc-400 rounded-lg bg-zinc-700">
        <PlusCircle size={48} className="text-green-500" /> Criar um anuncio
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/65 fixed inset-0 w-screen h-screen" />
        <Dialog.Content className="fixed p-4 bg-slate-500 rounded-lg w-full max-w-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Dialog.Close className="absolute right-4 top-4 text-zinc-300 hover:text-zinc-100 transition-all duration-500 focus:outline-none">
            <X size={24} aria-label="Close" />
          </Dialog.Close>

          <Dialog.Title className="text-xl leading-tight font-bold">
            Criar um anuncio
          </Dialog.Title>
          <Dialog.Description className="mt-2 font-light text-slate-200">
            Crie um anuncio para que possiveis adversarios vejam a
            disponibilidade da sua equipe
          </Dialog.Description>

          <div className="bg-slate-400 h-[1px] my-4 w-full" />

          <Formik
            initialValues={initialValues}
            onSubmit={(values, actions) => {
              handleSubmit(values);
              actions.setSubmitting(false);
            }}
          >
            <Form autoComplete="off">
              {/* Location Input  */}
              <Input
                label="Localização do Jogo"
                placeholder="Local a acontecer o Jogo"
                name="location"
                id="location"
                type="text"
                autoComplete="off"
              />
              <small className="mb-2 text-red-400">
                A não propôr nenhuma localização não escreva nada!
              </small>

              {/* Date Input*/}
              <div className="w-full">
                <label htmlFor="gameDate">
                  Selecione uma data proposta para o jogo
                </label>
                <Field name="gameDate" className="w-full">
                  {({ field, form }: FieldProps) => (
                    <DatePicker
                      wrapperClassName="w-full"
                      placeholderText="Selecione uma data"
                      className="bg-zinc-400 dark:bg-black border border-zinc-800 py-3 px-4 rounded text-sm placeholder:text-zinc-500 w-full mt-1"
                      id="gameDate"
                      {...field}
                      dateFormat={"EEEE, dd/MM/yyyy"}
                      onChange={(date: any) => {
                        form.setFieldValue("gameDate", date);
                        setApiError({ message: "" });
                      }}
                      selected={field.value}
                      minDate={addDays(new Date(), 1)}
                    />
                  )}
                </Field>
              </div>

              {/* Time Input*/}
              <div className="w-full">
                <label htmlFor="gameTime">Selecione uma hora proposta</label>
                <Field name="gameTime" className="w-full">
                  {({ field, form }: any) => (
                    <DatePicker
                      wrapperClassName="w-full"
                      placeholderText="Selecione uma hora"
                      timeCaption="Hora"
                      className="bg-zinc-400 dark:bg-black border border-zinc-800 py-3 px-4 rounded text-sm placeholder:text-zinc-500 w-full mt-1"
                      id="gameTime"
                      name="gameTime"
                      showTimeSelect
                      showTimeSelectOnly
                      timeFormat="HH:mm"
                      dateFormat={"HH:mm"}
                      {...field}
                      onChange={(time: any) => {
                        form.setFieldValue(field.name, time);
                      }}
                      selected={field.value}
                    />
                  )}
                </Field>
              </div>
              {apiError ? (
                <div className="mb-2 text-red-400">{apiError.message}</div>
              ) : null}
              <button
                type="submit"
                className="w-full bg-emerald-400 uppercase font-bold py-3 rounded transition-all hover:bg-emerald-500 disabled:opacity-70 disabled:cursor-not-allowed mt-4"
              >
                Criar Anuncio
              </button>
            </Form>
          </Formik>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
