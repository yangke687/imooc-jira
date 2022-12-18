import { useHttp } from "./http";
import { QueryKey, useMutation, useQuery } from "react-query";
import { Board } from "../types/board";
import { useAddConfig, useDeleteConfig } from "./use-optimistic-config";

export const useBoards = (params?: Partial<Board>) => {
  const client = useHttp();

  return useQuery<Board[]>(["boards", params], () =>
    client("kanbans", { data: params })
  );
};

export const useAddBoard = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    (params: Partial<Board>) =>
      client("kanbans", {
        data: params,
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useDeleteBoard = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    ({ id }: { id: number }) =>
      client(`kanbans/${id}`, {
        method: "DELETE",
      }),
    useDeleteConfig(queryKey)
  );
};

export interface SortProps {
  // put 'fromId' 'before' or 'after' 'refId'
  fromId: number;
  referenceId: number;
  type: "before" | "after";
}

export const useReorderBoard = () => {
  const client = useHttp();

  return useMutation((params: SortProps) =>
    client("kanbans/reorder", {
      data: params,
      method: "POST",
    })
  );
};
