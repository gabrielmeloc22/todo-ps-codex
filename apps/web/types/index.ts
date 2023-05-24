export type ReqErrorRes = {
  status: string;
  message: string;
};

export type Task = {
  id: string;
  authorId: string;
  createdAt: string;
  updatedAt: string;
  completionDate: string | null;
  title: string;
  content: string | null;
  status: boolean;
};

export type User = {
  id: string;
  name: string;
  lastName: string;
  email: string;
};
