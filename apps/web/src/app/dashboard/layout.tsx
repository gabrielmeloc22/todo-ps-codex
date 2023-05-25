import { Metadata } from "next";
import { Sidebar } from "./components/Sidebar";

export const metadata: Metadata = {
  title: "AllDone | Visão Geral",
};

interface DashboardLayoutProps {
  children: React.ReactNode;
}
export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="max-w-screen-lg w-full flex h-screen max-2xl:ml-0 ml-[10vw] flex-col gap-32 px-10 py-20 overflow-y-scroll no-scrollbar">
        {children}
      </main>
    </div>
  );
}
