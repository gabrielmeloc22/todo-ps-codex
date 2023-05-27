import { useAuth } from "@/components/Auth";

export function Header() {
  const user = useAuth();

  return (
    <header className="font-bold">
      <h2 className="text-md font-normal">Editar perfil</h2>
      <h1 className="text-3xl mt-4">
        Perfil de{" "}
        <span className="text-violet-600">
          {user?.name} {user?.lastName}
        </span>
      </h1>
    </header>
  );
}
