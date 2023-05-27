import { Metadata } from "next";
import { Sidebar } from "./components/Sidebar";
import { HamburguerMenu } from "./components/HamburguerMenu";

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
      <main className="flex flex-col relative w-full h-screen pl-[10vw] max-2xl:px-8 max-2xl:pl-[5vw] max-xl:px-8 gap-32 px-10 py-20 overflow-y-scroll no-scrollbar">
        {children}
        <HamburguerMenu />
      </main>
    </div>
  );
}
