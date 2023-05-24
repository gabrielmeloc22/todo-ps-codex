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
      {children}
    </div>
  );
}
