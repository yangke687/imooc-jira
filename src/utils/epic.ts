import { Epic } from "../types/epic";
import { useHttp } from "./http";
import { QueryKey, useMutation, useQuery } from "react-query";
import { Task } from "../types/task";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
} from "./use-optimistic-config";

export const useEpics = (param?: Partial<Epic>) => {
  const client = useHttp();

  return useQuery<Epic[]>(["epics", param], () =>
    client("epics", { data: param })
  );
};

export const useAddEpic = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    (params: Partial<Task>) =>
      client("epics", {
        data: params,
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useEpic = (id?: number) => {
  const client = useHttp();

  return useQuery<Task>(["epic", { id }], () => client(`epics/${id}`), {
    enabled: Boolean(id),
  });
};

export const useEditEpic = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    (params: Partial<Task>) =>
      client(`epics/${params.id}`, {
        method: "PATCH",
        data: params,
      }),
    useEditConfig(queryKey)
  );
};

export const useDeleteEpic = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    ({ id }: { id: number | string }) =>
      client(`epics/${id}`, {
        method: "DELETE",
      }),
    useDeleteConfig(queryKey)
  );
};
