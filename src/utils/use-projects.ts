import { useHttp } from "./http";
import { useEffect } from "react";
import { cleanObj } from "./index";
import { Project } from "../screens/project-list/list";
import { useAsync } from "./use-async";

export const useProjects = (params: Partial<Project>) => {
  const client = useHttp();

  const { run, ...result } = useAsync<Project[]>();

  useEffect(() => {
    run(client("projects", { data: cleanObj(params) }));
  }, [params]);

  return result;
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
