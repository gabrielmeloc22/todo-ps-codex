import { TaskRouterOutputs, UserRouterOutputs } from "api";

export type ReqErrorRes = {
  status: string;
  message: string;
};

export type Task = NonNullable<TaskRouterOutputs["getTask"]>;

export type User = NonNullable<UserRouterOutputs["getUser"]>;
