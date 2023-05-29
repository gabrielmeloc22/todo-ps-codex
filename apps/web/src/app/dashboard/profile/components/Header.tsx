import { useAuth } from "@/components/Auth";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export function Header() {
  const user = useAuth();

  return (
    <header className="font-bold">
      <h2 className="flex gap-4 text-md font-normal">
        <Link href="/dashboard">
          <ArrowLeft size={20} />
        </Link>{" "}
        Editar perfil
      </h2>
      <h1 className="text-3xl mt-4">
        Perfil de{" "}
        <span className="text-violet-600">
          {user?.name} {user?.lastName}
        </span>
      </h1>
    </header>
  );
}
