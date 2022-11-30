import { useHttp } from "./http";
import { QueryKey, useMutation, useQuery } from "react-query";
import { Task } from "../types/task";
import { useAddConfig } from "./use-optimistic-config";

export const useTasks = (params?: Partial<Task>) => {
  const client = useHttp();

  return useQuery<Task[]>(["tasks", params], () =>
    client("tasks", { data: params })
  );
};

export const useAddTask = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    (params: Partial<Task>) =>
      client("tasks", {
        data: params,
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};
