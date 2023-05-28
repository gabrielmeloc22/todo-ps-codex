import { api } from "@/services/axios";
import { queryClient } from "@/services/reactQuery";
import { Task } from "@/types";
import { MutationFunction, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { getCookie } from "cookies-next";

type TaskMutationData = Task;
type TaskMutationVariables = Pick<Task, "id">;
type RemoveTaskReqError = AxiosError<TaskMutationData>;

const deleteTask: MutationFunction<TaskMutationData, TaskMutationVariables> = async ({ id }) => {
  const authorId = getCookie("user_id");

  const { data } = await api.delete<TaskMutationData>(`task/${authorId}/${id}`);
  return data;
};

export function useDeleteTaskMutation() {
  return useMutation<TaskMutationData, RemoveTaskReqError, TaskMutationVariables>({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.refetchQueries(["tasks"]);
    },
  });
}
