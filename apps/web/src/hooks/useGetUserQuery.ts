import { api } from "@/services/axios";
import { User } from "@/types";
import { QueryFunction, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { getCookie } from "cookies-next";

type GetUserRes = User;
type GetUserReqError = AxiosError;

const getUser: QueryFunction<User> = async () => {
  const id = getCookie("user_id");
  const authToken = getCookie("auth_token");

  api.defaults.headers.Authorization = `bearer ${authToken}`;

  const { data } = await api.get<GetUserRes>(`user/${id}`);

  return data;
};

export function useGetUserQuery(enabled = true) {
  return useQuery<GetUserRes, GetUserReqError>({
    queryFn: getUser,
    queryKey: ["user"],
    enabled,
  });
}
