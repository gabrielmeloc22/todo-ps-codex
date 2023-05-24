import { QueryFunction, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { api } from "../src/services/axios";
import { User } from "../types";

type GetUserRes = {
  id: string;
  name: string;
  lastName: string;
  email: string;
};

type GetUserReqError = AxiosError;

const getUser: QueryFunction<User> = async () => {
  const id = getCookie("user_id");
  const authToken = getCookie("auth_token");

  api.defaults.headers.Authorization = `bearer ${authToken}`;

  const { data } = await api.get<GetUserRes>(`user/${id}`);

  return data;
};

export function useGetUserQuery() {
  const router = useRouter();

  return useQuery<GetUserRes, GetUserReqError>({
    queryFn: getUser,
    queryKey: ["user"],
    onError: () => {
      router.push("login");
    },
  });
}
