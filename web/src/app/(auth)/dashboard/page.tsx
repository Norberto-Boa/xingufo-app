import { cookies } from "next/headers";

export default function Dashboard() {
  const cookieStore = cookies();
  const token = cookieStore.get("auth.token");

  return (
    <div>
      <p>{token?.value}</p>
    </div>
  );
}
