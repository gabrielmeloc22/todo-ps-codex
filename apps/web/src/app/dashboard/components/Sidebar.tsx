import { Profile } from "./Profile";
import { CreateTaskDialog } from "./Task/CreateTaskDialog";

export function Sidebar() {
  return (
    <aside className="flex flex-col gap-8 items-center max-w-[350px] w-[20vw] px-20 py-20 bg-zinc-800">
      <Profile />
      <CreateTaskDialog />
    </aside>
  );
}
