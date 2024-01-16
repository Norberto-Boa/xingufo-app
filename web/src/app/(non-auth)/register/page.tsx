"use client";
import { ApiError } from "@/@types/global";
import Input from "@/components/input";
import { baseUrl } from "@/utils/BaseUrl";
import { ErrorMessage, Form, Formik, FormikErrors } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface FormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  cellphone: string;
}

const validate = ({
  name,
  email,
  password,
  confirmPassword,
  cellphone,
}: FormValues) => {
  let errors: FormikErrors<FormValues> = {};
  if (!name) {
    errors.name = "O campo nome é obrigatório";
  } else if (
    !/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u.test(
      name
    )
  ) {
    errors.name = "O campo nome só pode ter alfabeticos";
  }

  if (!email) {
    errors.email = "O campo email/celular é obrigatório";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    errors.email = "O email inserido é inválido";
  }

  if (!password) {
    errors.password = "O campo password é obrigatório";
  } else if (password.length < 8) {
    errors.password = "O password deve ter pelo menos 8 caracteres";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "As passwords são diferentes, verifique";
  }

  if (!cellphone) {
    errors.cellphone = "O campo numero de telefone é obrigatório.";
  } else if (cellphone.length !== 9) {
    errors.cellphone = "O numero de telefone deve ter 9 caracteres";
  } else if (!/[0-9]/.test(cellphone)) {
    errors.cellphone = " O numero de telefone só pode conter números";
  }

  return errors;
};

export default function Register() {
  const [apiErrors, setApiErrors] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const router = useRouter();

  const initialValues: FormValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    cellphone: "",
  };

  const handleSubmit = async ({
    name,
    email,
    password,
    cellphone,
  }: FormValues) => {
    try {
      setIsSubmitting(true);
      const req = await fetch(baseUrl + "signup", {
        method: "POST",
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
          cellphone: cellphone,
        }),
        headers: {
          "content-type": "application/json",
        },
      });

      if (req.ok) {
        router.push("/login");
      } else {
        const res: ApiError = await req.json();
        throw new Error(res.error.message);
      }
    } catch (e: any) {
      console.log(e);
      setApiErrors(e.message);
      setTimeout(() => {
        setIsSubmitting(false);
      }, 1000);
    }
  };

  return (
    <div className="py-4 px-5 dark:bg-zinc-900 rounded-lg border dark:border-zinc-800 flex flex-col w-[420px] overflow-x-hidden">
      {/* Title */}
      <div className=" mb-4">
        <h1 className="text-xl font-bold uppercase mb-2">Cadastro</h1>
        <span className="text-slate-900 dark:text-zinc-400 leading-tight">
          Insira os teus dados para fazer parte da nossa plataforma
        </span>
      </div>
      {/* API Error */}
      {apiErrors ? (
        <div className="text-red-500 mb-2">{apiErrors}</div>
      ) : null}{" "}
      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={(values, actions) => {
          handleSubmit(values);
          actions.setSubmitting(false);
        }}
      >
        {/* Form  */}
        <Form className="mb-4">
          {/* Input Name */}
          <Input
            type="text"
            id="name"
            name="name"
            label="Nome"
            placeholder="John Doe"
          />
          <div className="text-red-400">
            <ErrorMessage name="name" />
          </div>

          {/* Input Email */}
          <Input
            type="text"
            id="email"
            name="email"
            label="Email"
            placeholder="john.doe@gmail.com"
          />
          <div className="text-red-400">
            <ErrorMessage name="email" />
          </div>

          {/* Input Password */}
          <Input
            type="password"
            id="password"
            name="password"
            label="Password"
            placeholder="Password"
          />
          <div className="text-red-400">
            <ErrorMessage name="password" />
          </div>

          {/* Input Password */}
          <Input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            label="Confirmar Password"
            placeholder="Repita a palavra passe"
          />
          <div className="text-red-400">
            <ErrorMessage name="confirmPassword" />
          </div>

          {/* Input Container */}
          <Input
            type="text"
            id="cellphone"
            name="cellphone"
            label="Numero de Telefone"
            placeholder="84 123 4567"
          />
          <div className="text-red-400">
            <ErrorMessage name="cellphone" />
          </div>

          <button
            type="submit"
            disabled={isSubmitting ? true : false}
            className="w-full bg-emerald-500 uppercase font-bold py-3 rounded transition-all hover:bg-emerald-600 mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            Cadastrar-se
          </button>
        </Form>
      </Formik>
      <div>
        <p className="text-center">
          Já tem uma conta? Faça o{" "}
          <Link href="/login" className="text-emerald-500 font-bold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
