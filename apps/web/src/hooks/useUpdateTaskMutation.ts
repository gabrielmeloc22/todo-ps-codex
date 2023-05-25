import { MutationFunction, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { getCookie } from "cookies-next";
import { api } from "@/services/axios";
import { Task } from "@/types";
import { queryClient } from "@/services/reactQuery";

type TaskMutationData = Task;
type TaskMutationVariables = Partial<Omit<Task, "id" | "authorId" | "createdAt" | "updatedAt">> & {
  id: string;
};
type UpdateTaskReqError = AxiosError<TaskMutationData>;

const updateTask: MutationFunction<TaskMutationData, TaskMutationVariables> = async ({ id, ...rest }) => {
  const authorId = getCookie("user_id");

  const { data } = await api.put<TaskMutationData>(`task/${authorId}/${id}`, rest);
  return data;
};

export function useUpdateTaskMutation() {
  return useMutation<TaskMutationData, UpdateTaskReqError, TaskMutationVariables>({
    mutationFn: updateTask,
    onSuccess: () => {
      queryClient.refetchQueries(["tasks"]);
    },
  });
}
