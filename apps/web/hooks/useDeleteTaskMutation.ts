import { MutationFunction, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { getCookie } from "cookies-next";
import { api } from "../src/services/axios";
import { Task } from "../types";
import { queryClient } from "../src/services/reactQuery";

type TaskMutationData = Task;
type TaskMutationVariables = Pick<Task, "id">;
type removeTaskReqError = AxiosError<TaskMutationData>;

const deleteTask: MutationFunction<TaskMutationData, TaskMutationVariables> = async ({ id }) => {
  const authorId = getCookie("user_id");

  const { data } = await api.delete<TaskMutationData>(`task/${authorId}/${id}`);
  return data;
};

export function useDeleteTaskMutation() {
  return useMutation<TaskMutationData, removeTaskReqError, TaskMutationVariables>({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.refetchQueries(["tasks"]);
    },
  });
}
