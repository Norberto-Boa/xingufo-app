import Input from "@/components/input";
import Link from "next/link";

export default function Register() {
  return (
    <div className="py-4 px-5 dark:bg-zinc-900 rounded-lg border dark:border-zinc-800 flex flex-col w-[420px]">
      {/* Title */}
      <div className=" mb-4">
        <h1 className="text-xl font-bold uppercase mb-2">Cadastro</h1>
        <span className="text-slate-900 dark:text-zinc-400 leading-tight">
          Insira os teus dados para fazer parte da nossa plataforma
        </span>
      </div>

      {/* Form  */}
      <form className="mb-4">
        {/* Input Container */}
        <div>
          <label htmlFor="name">Nome</label>
          <Input type="text" id="name" name="name" />
        </div>
        {/* Input Container */}
        <div>
          <label htmlFor="email">Email</label>
          <Input type="text" id="email" name="email" />
        </div>
        {/* Input Container */}
        <div>
          <label htmlFor="password">Password</label>
          <Input type="text" id="password" name="password" />
        </div>
        {/* Input Container */}
        <div className="mb-4">
          <label htmlFor="cellphone">Cellphone</label>
          <Input type="text" id="cellphone" name="cellphone" />
        </div>

        <button
          type="submit"
          className="w-full bg-emerald-500 uppercase font-bold py-3 rounded transition-all hover:bg-emerald-600"
        >
          Cadastrar-se
        </button>
      </form>

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
