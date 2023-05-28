import { Profile } from "./Profile";
import { CreateTaskDialog } from "./Task/CreateTaskDialog";

export function Sidebar() {
  return (
    <aside className="w-[20vw] max-w-xs max-2xl:hidden flex flex-col gap-16 px-10 py-24 bg-zinc-800">
      <Profile />
      <CreateTaskDialog />
    </aside>
  );
}
