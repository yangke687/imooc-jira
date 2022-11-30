import { useHttp } from "./http";
import { QueryKey, useMutation, useQuery } from "react-query";
import { Board } from "../types/board";
import { useAddConfig } from "./use-optimistic-config";

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
