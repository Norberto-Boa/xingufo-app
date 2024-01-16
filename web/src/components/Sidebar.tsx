import Logo from "@/assets/Logo.svg";
import Image from "next/image";

export default function Sidebar() {
  return (
    <div className="min-w-[240px] w-60 min-h-screen menu-container dark:bg-zinc-900 bg-white overflow-hidden">
      <div className="px-2 pt-8">
        <Image src={Logo} alt="" />
      </div>
      <div>
        <h4 className="dark:text-emerald-600 text-zinc-400 text-xl capital font-bold pt-12 px-4">
          Menu
        </h4>
      </div>

      {/* Menu List */}
      <div className="flex flex-col gap-4 pt-4">
        {/* <MenuItem
          name='Home'
          url='#'
          status={true}
          icon = {<House size={24} weight="fill" />}
        />
        
        <MenuItem
          name='Minha Equipe'
          url='#'
          status={false}
          icon = {<UsersThree size={24} weight="fill" />}
        />
    
        <MenuItem
          name='Jogos'
          url='#'
          status={false}
          icon = {<Strategy size={24} weight="fill" />}
        />

        <MenuItem
          name='Resultados'
          url='#'
          status={false}
          icon = {<Scroll size={24} weight="fill" />}
        /> */}
      </div>
    </div>
  );
}
