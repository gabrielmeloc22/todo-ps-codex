import { MutationFunction, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { api } from "../src/services/axios";
import { ReqErrorRes, User } from "../types";

type UserMutationData = {
  token: string;
  user: User;
};

type CreateUserMutationVariables = {
  email: string;
  name: string;
  lastName: string;
  password: string;
};

type CreateUserReqError = AxiosError<ReqErrorRes>;

const createUser: MutationFunction<UserMutationData> = async (variables) => {
  const { data } = await api.post<UserMutationData>("user", variables);
  return data;
};

export function useCreateUserMutation() {
  const router = useRouter();

  return useMutation<UserMutationData, CreateUserReqError, CreateUserMutationVariables>({
    mutationFn: createUser,
    onSuccess: () => {
      router.push("login");
    },
  });
}
