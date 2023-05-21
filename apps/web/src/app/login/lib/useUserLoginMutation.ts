import { MutationFunction, useMutation } from "@tanstack/react-query";
import { setCookie } from "cookies-next";
import { api } from "../../../services/axios";

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

type UserLoginErrors = {
  response: {
    data: {
      message: string;
    };
  };
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
  const mutation = useMutation<UserLoginRes, UserLoginErrors, UserLoginVariables>({
    mutationFn: loginUser,
    onSuccess: (data) => {
      setUserCookies(data.token, data.user.id);
      window.location.reload();
    },
    onError: (data) => {
      return data;
    },
  });

  return mutation;
}
