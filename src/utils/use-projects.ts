import { useHttp } from "./http";
import { Project } from "../screens/project-list/list";
import { useAsync } from "./use-async";
import { useQuery } from "react-query";

export const useProjects = (params?: Partial<Project>) => {
  const client = useHttp();

  return useQuery<Project[]>(["projects", params], () =>
    client("projects", { data: params })
  );
};

export const useEditProject = () => {
  const client = useHttp();

  const { run, ...result } = useAsync<Project[]>();

  const mutate = (params: Partial<Project>) =>
    run(client(`projects/${params.id}`, { data: params, method: "PATCH" }));

  return {
    mutate,
    ...result,
  };
};

export const useAddProject = () => {
  const client = useHttp();

  const { run, ...result } = useAsync<Project[]>();

  const mutate = (params: Partial<Project>) =>
    run(client(`projects/${params.id}`, { data: params, method: "POST" }));

  return {
    mutate,
    ...result,
  };
};
