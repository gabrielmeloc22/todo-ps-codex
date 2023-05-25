import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default function Home() {
  const cookieStore = cookies();
  const token = cookieStore.get("auth_token")?.value;
  const userId = cookieStore.get("user_id")?.value;

  if (!token || !userId) {
    redirect("/login");
  }
  redirect("/dashboard");
}
