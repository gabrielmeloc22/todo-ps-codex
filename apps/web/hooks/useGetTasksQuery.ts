import { QueryFunction, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { getCookie } from "cookies-next";
import { api } from "../src/services/axios";
import { Task } from "../types";

type GetTasksRes = Task[];
type GetTasksError = AxiosError;

const getTasks: QueryFunction<GetTasksRes> = async () => {
  const id = getCookie("user_id");
  const { data } = await api.get(`task/${id}`);

  return data;
};

export function useGetTasksQuery() {
  return useQuery<GetTasksRes, GetTasksError>({
    queryFn: getTasks,
    queryKey: ["tasks"],
    onError: (e) => {},
  });
}
