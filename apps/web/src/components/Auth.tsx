"use client";

import { deleteCookie, getCookie } from "cookies-next";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useGetUserQuery } from "../hooks/useGetUserQuery";
import { queryClient } from "../services/reactQuery";
import { User } from "@/types";

interface AuthProps {
  children: React.ReactNode;
}

const PUBLIC_ROUTES = ["/login", "/signup", "/"];
const isPublicRoute = (path: string) => PUBLIC_ROUTES.includes(path);

export function Auth({ children }: AuthProps) {
  const router = useRouter();
  const pathName = usePathname();

  const { isSuccess, isError } = useGetUserQuery(!isPublicRoute(pathName));

  useEffect(() => {
    const authToken = getCookie("auth_token");
    const userId = getCookie("user_id");

    if ((isError || !authToken || !userId) && !isPublicRoute(pathName)) return router.push("login");
    if (authToken && userId && isPublicRoute(pathName)) return router.push("dashboard");
  }, [isSuccess, isError, pathName]);

  return <>{(isSuccess || isPublicRoute(pathName)) && children}</>;
}

export const useAuth = () => {
  return queryClient.getQueryData<User>(["user"])!;
};

export const signOut = () => {
  deleteCookie("auth_token");
  deleteCookie("user_id");
};
