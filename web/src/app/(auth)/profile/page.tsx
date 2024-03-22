import TeamInformation from "@/components/TeamInformation";
import UserInformation from "@/components/UserInformation";

export default function Profile() {
  return (
    <div>
      {/* Title */}
      <div className="pt-9 px-8">
        <h1 className="text-2xl font-semibold">Profile</h1>
        <span className="mt-8 text-lg text-zinc-500">
          Veja quem tu és para nós!
        </span>
      </div>

      {/* User Information */}
      <div className="px-9 mt-4">
        <div className="w-full px-4 py-4 bg-zinc-900 w border-zinc-600 rounded-lg mb-4">
          <UserInformation />
        </div>

        <div className="w-full px-4 py-4 bg-zinc-900 w border-zinc-600 rounded-lg">
          <TeamInformation />
        </div>
      </div>
    </div>
  );
}
