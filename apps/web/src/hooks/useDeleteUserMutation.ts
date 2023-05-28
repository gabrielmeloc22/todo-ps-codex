import { api } from "@/services/axios";
import { queryClient } from "@/services/reactQuery";
import { User } from "@/types";
import { MutationFunction, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { getCookie } from "cookies-next";

type UserMutationData = User;
type DeleteUserReqError = AxiosError<UserMutationData>;

const deleteUser: MutationFunction<UserMutationData> = async () => {
  const userId = getCookie("user_id");

  const { data } = await api.delete<UserMutationData>(`user/${userId}`);
  return data;
};

export function useDeleteUserMutation() {
  return useMutation<UserMutationData, DeleteUserReqError>({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.refetchQueries(["Users"]);
    },
  });
}
