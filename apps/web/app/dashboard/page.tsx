"use client";

import { useAuth } from "../../context/auth";

export default function DashboardPage() {
  const { name } = useAuth();

  return <div>olá, {name}</div>;
}
