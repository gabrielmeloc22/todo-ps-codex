"use client";

import { trpc } from "@/services/trpc";
import { deleteCookie, getCookie } from "cookies-next";
import { redirect, usePathname, useRouter } from "next/navigation";
import router from "next/router";
import { useEffect, useState } from "react";

interface AuthProps {
  children: React.ReactNode;
}
"bundinha"
const PUBLIC_ROUTES = ["/login", "/signup", "/"];
const isPublicRoute = (path: string) => PUBLIC_ROUTES.includes(path);

export function Auth({ children }: AuthProps) {
  const router = useRouter();
  const pathName = usePathname();

  const { isSuccess, isError } = trpc.user.getUser.useQuery(
    { id: getCookie("user_id") as string },
    { enabled: !isPublicRoute(pathName) }
  );

  useEffect(() => {
    const authToken = getCookie("auth_token");
    const userId = getCookie("user_id");

    if ((isError || !authToken || !userId) && !isPublicRoute(pathName)) return router.push("login");
    if (authToken && userId && isPublicRoute(pathName)) return router.push("dashboard");
  }, [isSuccess, isError, pathName]);

  return <>{(isSuccess || isPublicRoute(pathName)) && children}</>;
}

export const useAuth = () => {
  const user = trpc.useContext().user.getUser.getData({ id: getCookie("user_id") as string })!;

  return user;
};

export const signOut = () => {
  deleteCookie("auth_token");
  deleteCookie("user_id");
};
