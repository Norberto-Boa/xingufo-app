import Sidebar from "@/components/Sidebar";
import Rightbar from "@/components/RightBar";
import { CheckIfIsAuthenticatedOnServer } from "@/utils/ServerToken";
import { redirect } from "next/navigation";

const token = CheckIfIsAuthenticatedOnServer();

export default function Auth({ children }: { children: React.ReactNode }) {
  if(!token){
    redirect('/login');
  }

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
