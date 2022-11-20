import { useHttp } from "./http";
import { useMount } from "./index";
import { useAsync } from "./use-async";
import { User } from "../types/user";

export const useUsers = (params?: Partial<User>) => {
  const client = useHttp();

  const { run, ...result } = useAsync<User[]>();

  useMount(() => {
    run(client("users"));
  });

  return result;
};
