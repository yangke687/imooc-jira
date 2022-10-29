import { useHttp } from "./http";
import { Project } from "../screens/project-list/list";
import { useAsync } from "./use-async";
import { useMutation, useQuery, useQueryClient } from "react-query";

export const useProjects = (params?: Partial<Project>) => {
  const client = useHttp();

  return useQuery<Project[]>(["projects", params], () =>
    client("projects", { data: params })
  );
};

export const useEditProject = () => {
  const client = useHttp();
  const queryClient = useQueryClient();

  return useMutation(
    (params: Partial<Project>) =>
      client(`projects/${params.id}`, {
        method: "PATCH",
        data: params,
      }),
    {
      onSuccess: () => queryClient.invalidateQueries("projects"),
    }
  );
};

export const useAddProject = () => {
  const client = useHttp();
  const queryClient = useQueryClient();

  return useMutation(
    (params: Partial<Project>) =>
      client(`projects/${params.id}`, {
        method: "POST",
        data: params,
      }),
    {
      onSuccess: () => queryClient.invalidateQueries("projects"),
    }
  );
};
