"use client";
import Input from "@/components/input";
import { ErrorMessage, Form, Formik, FormikErrors } from "formik";
import Link from "next/link";

interface FormValues {
  email: string;
  password: string;
}

const validate = ({ email, password }: FormValues) => {
  let errors: FormikErrors<FormValues> = {};
  if (!email) {
    errors.email = "O campo email/celular é obrigatório.";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    errors.email = "O email inserido é inválido";
  }

  if (!password) {
    errors.password = "O campo password é obrigatório.";
  } else if (password.length < 8) {
    errors.password = "O password deve ter pelo menos 8 caracteres";
  }

  return errors;
};

export default function Register() {
  const initialValues: FormValues = {
    email: "",
    password: "",
  };

  // const formik = useFormik()

  return (
    <div className="py-4 px-5 dark:bg-zinc-900 rounded-lg border dark:border-zinc-800 flex flex-col w-[420px]">
      {/* Title */}
      <div className=" mb-4">
        <h1 className="text-xl font-bold uppercase mb-2">Login</h1>
        <span className="text-slate-900 dark:text-zinc-400 leading-tight">
          Insira os teus dados para fazer ter acesso a mais informacoes
        </span>
      </div>

      {/* Form  */}
      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={(values, actions) => {
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        }}
      >
        <Form className="mb-4">
          {/* Input Container */}
          <Input
            type="text"
            id="email"
            name="email"
            placeholder="jonh.doe@xingufo.com | 84 123 4567"
            label="Email/Numero de Celular"
          />
          <div className="text-red-400">
            <ErrorMessage name="email" />
          </div>
          {/* Input Container */}
          <Input
            type="text"
            id="password"
            name="password"
            placeholder="Password"
            label="Password"
          />
          <div className="text-red-400">
            <ErrorMessage name="password" />
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-500 uppercase font-bold py-3 rounded transition-all hover:bg-emerald-600 mt-4"
          >
            Login
          </button>
        </Form>
      </Formik>

      <div>
        <p className="text-center">
          Não tem uma conta. Faça o{" "}
          <Link href="/register" className="text-emerald-500 font-bold">
            Registo
          </Link>
        </p>
      </div>
    </div>
  );
}
