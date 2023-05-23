import { MutationFunction, useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { api } from "../src/services/axios";

type UserMutationData = {
  token: string;
  user: {
    id: string;
    email: string;
    password: string;
    name: string;
  };
};

type CreateUserMutationVariables = {
  email: string;
  name: string;
  lastName: string;
  password: string;
};

type CreateUserReqError = {
  response: {
    data: {
      message: string;
    };
  };
};

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
