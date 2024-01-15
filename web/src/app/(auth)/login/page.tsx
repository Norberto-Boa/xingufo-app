import Input from "@/components/input";
import Link from "next/link";

export default function Register() {
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
      <form className="mb-4">
        {/* Input Container */}
        <div>
          <label htmlFor="email">Email/Numero de Celular</label>
          <Input
            type="text"
            id="email"
            name="email"
            placeholder="jonh.doe@xingufo.com | +258"
          />
        </div>
        {/* Input Container */}
        <div className="mb-4">
          <label htmlFor="password">Password</label>
          <Input type="text" id="password" name="password" />
        </div>

        <button
          type="submit"
          className="w-full bg-emerald-500 uppercase font-bold py-3 rounded transition-all hover:bg-emerald-600"
        >
          Login
        </button>
      </form>

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
