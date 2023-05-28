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
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex flex-col relative w-full pl-[10vw] px-10 py-20 gap-18 max-2xl:px-8 max-2xl:pl-[5vw] max-xl:px-8 max-2xl:py-10 max-2xl:gap-10 overflow-y-scroll no-scrollbar [&>*]:mb-10">
        {children}
      </main>
    </div>
  );
}
