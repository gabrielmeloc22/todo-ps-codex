import { useAuth } from "../../../../components/Auth";

const getGreeting = () => {
  const hours = new Date().getHours();
  if (hours < 12) return "Bom dia";
  if (hours >= 12 && hours < 18) return "Boa tarde";
  return "Boa noite";
};

export function Header() {
  const user = useAuth();

  return (
    <header className="font-bold">
      <h2 className="text-md font-normal">Visão Geral</h2>
      <h1 className="text-3xl mt-4">
        {getGreeting()},{" "}
        <span className="text-violet-600 underline">
          {user?.name} {user?.lastName}!
        </span>
      </h1>
    </header>
  );
}
