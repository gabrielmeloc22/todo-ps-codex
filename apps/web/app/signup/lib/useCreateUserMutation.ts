import { MutationFunction, useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { api } from "../../../services/axios";

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
  error: string;
  message: string;
};

const createUser: MutationFunction<UserMutationData> = async (variables) => {
  const { data } = await api.post<UserMutationData>("user", variables);
  return data;
};

export function useCreateUserMutation() {
  const router = useRouter();

  const mutation = useMutation<UserMutationData, CreateUserReqError, CreateUserMutationVariables>({
    mutationFn: createUser,
    onSuccess: () => {
      router.push("login");
    },
    mutationKey: ["user"],
  });

  return mutation;
}
