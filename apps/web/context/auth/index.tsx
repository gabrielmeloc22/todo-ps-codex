"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../../services/axios";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";

interface AuthContextData {
  id: string;
  name: string;
  lastName: string;
  email: string;
}

interface AuthContextProps {
  children: React.ReactNode;
}

export type GetUserRes = {
  id: string;
  name: string;
  lastName: string;
  email: string;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthContextProvider({ children }: AuthContextProps) {
  const [user, setUser] = useState<AuthContextData>({} as AuthContextData);
  const router = useRouter();

  useEffect(() => {
    const authToken = getCookie("auth_token");
    const userId = getCookie("user_id");

    if (authToken && userId) {
      api.defaults.headers.Authorization = `bearer ${authToken}`;

      api
        .get<GetUserRes>(`user/${userId}`)
        .then(({ data }) => {
          const { email, id, lastName, name } = data;

          setUser({ email, id, lastName, name });
          router.push("dashboard");
        })
        .catch(() => {
          router.push("login");
        });
    } else {
      router.push("login");
    }
  }, []);

  return <AuthContext.Provider value={user as AuthContextData}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const authContext = useContext(AuthContext);

  return authContext;
};
