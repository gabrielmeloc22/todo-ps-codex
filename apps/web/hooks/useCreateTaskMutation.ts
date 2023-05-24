import { MutationFunction, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { getCookie } from "cookies-next";
import { api } from "../src/services/axios";
import { Task } from "../types";
import { queryClient } from "../src/services/reactQuery";

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
