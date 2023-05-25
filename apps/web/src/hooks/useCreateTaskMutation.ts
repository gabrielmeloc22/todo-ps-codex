import { MutationFunction, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { getCookie } from "cookies-next";
import { api } from "@/services/axios";
import { queryClient } from "@/services/reactQuery";
import { Task } from "@/types";

type TaskMutationData = Task;
type TaskMutationVariables = Partial<Omit<Task, "id" | "authorId" | "createdAt" | "updatedAt">>;
type CreateTaskReqError = AxiosError<TaskMutationData>;

const createTask: MutationFunction<TaskMutationData, TaskMutationVariables> = async (variables) => {
  const authorId = getCookie("user_id");

  const { data } = await api.post<TaskMutationData>(`task/`, { authorId, ...variables });
  return data;
};

export function useCreateTaskMutation() {
  return useMutation<TaskMutationData, CreateTaskReqError, TaskMutationVariables>({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.refetchQueries(["tasks"]);
    },
  });
}
