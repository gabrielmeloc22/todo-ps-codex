import { MutationFunction, useMutation } from "@tanstack/react-query";
import { setCookie } from "cookies-next";
import { api } from "../src/services/axios";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";

export type UserLoginRes = {
  token: string;
  User: User;
};

type UserLoginVariables = {
  email: string;
  password: string;
};

type UserLoginErrors = AxiosError;

export type User = {
  id: string;
  name: string;
  lastName: string;
  email: string;
};

const loginUser: MutationFunction<UserLoginRes, UserLoginVariables> = async (variables) => {
  const { data } = await api.post("user/login", variables);
  return data;
};

const setUserCookies = (token: string, id: string) => {
  setCookie("auth_token", token);
  setCookie("user_id", id);
};

export function userUserLoginMutation() {
  const router = useRouter();

  return useMutation<UserLoginRes, UserLoginErrors, UserLoginVariables>({
    mutationFn: loginUser,
    onSuccess: ({ User, token }) => {
      setUserCookies(token, User.id);
      router.push("dashboard");
    },
  });
}
