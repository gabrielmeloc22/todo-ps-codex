import { api } from "@/services/axios";
import { queryClient } from "@/services/reactQuery";
import { Task } from "@/types";
import { MutationFunction, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { getCookie } from "cookies-next";

type TaskMutationData = Task;
type TaskMutationVariables = Partial<Omit<Task, "authorId" | "createdAt" | "updatedAt">>;
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
