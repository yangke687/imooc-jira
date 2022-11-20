import { useHttp } from "./http";
import { useQuery } from "react-query";
import { Board } from "../types/board";

export const useBoards = (params?: Partial<Board>) => {
  const client = useHttp();

  return useQuery<Board[]>(["boards", params], () =>
    client("kanbans", { data: params })
  );
};
