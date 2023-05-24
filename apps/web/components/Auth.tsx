"use client";

import { useGetUserQuery } from "../hooks/useGetUserQuery";
import { User } from "../types";
import { queryClient } from "../src/services/reactQuery";
import { usePathname, useRouter } from "next/navigation";
import { getCookie } from "cookies-next";

interface AuthProps {
  children: React.ReactNode;
}

const PUBLIC_ROUTES = ["/login", "/signup"];
const isPublicRoute = (path: string) => PUBLIC_ROUTES.includes(path);

export function Auth({ children }: AuthProps) {
  const router = useRouter();
  const pathName = usePathname();
  const authToken = getCookie("auth_token");
  const userId = getCookie("user_id");

  if ((!userId || !authToken) && !isPublicRoute(pathName)) {
    router.push("login");
    return null;
  }
  if (isPublicRoute(pathName)) {
    return <>{children}</>;
  }
  const { isSuccess } = useGetUserQuery();

  return <>{isSuccess && children}</>;
}

export const useAuth = () => {
  return queryClient.getQueryData<User>(["user"])!;
};
