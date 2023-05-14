import { MutationFunction, useMutation } from "@tanstack/react-query";
import { api } from "../../../services/axios";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";

type UserLoginRes = {
  token: string;
  user: {
    id: string;
    name: string;
    lastName: string;
    email: string;
  };
};

type UserLoginVariables = {
  email: string;
  password: string;
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

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      setUserCookies(data.token, data.user.id);
      router.push("dashboard");
    },
  });

  return mutation;
}
