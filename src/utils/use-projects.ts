import { useHttp } from "./http";
import { Project } from "../screens/project-list/list";
import { QueryKey, useMutation, useQuery, useQueryClient } from "react-query";
import { useProjectSearchParams } from "../screens/project-list/util";
import { useAddConfig, useEditConfig } from "./use-optimistic-config";

export const useProjects = (params?: Partial<Project>) => {
  const client = useHttp();

  return useQuery<Project[]>(["projects", params], () =>
    client("projects", { data: params })
  );
};

export const useEditProject = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    (params: Partial<Project>) =>
      client(`projects/${params.id}`, {
        method: "PATCH",
        data: params,
      }),
    useEditConfig(queryKey)
  );
};

export const useAddProject = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    (params: Partial<Project>) =>
      client(`projects`, {
        method: "POST",
        data: params,
      }),
    useAddConfig(queryKey)
  );
};

export const useProject = (id?: number) => {
  const client = useHttp();

  return useQuery<Project>(
    ["project", { id }],
    () => client(`projects/${id}`),
    {
      enabled: !!id,
    }
  );
};
