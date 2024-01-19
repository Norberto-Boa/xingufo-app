import Sidebar from "@/components/Sidebar";
import Logo from "@/assets/Logo.svg";
import Image from "next/image";
import Rightbar from "@/components/RightBar";

export default function Auth({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex">
      <Sidebar />
      <div className="dark:bg-transparent bg-white overflow-hidden w-[70%]">
        {/* <div className="px-8 pt-8">
          <Image src={Logo} alt="" />
        </div> */}
        {children}
      </div>
      <Rightbar />
    </section>
  );
}
