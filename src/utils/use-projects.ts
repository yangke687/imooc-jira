import { useHttp } from "./http";
import { Project } from "../screens/project-list/list";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useProjectSearchParams } from "../screens/project-list/util";

export const useProjects = (params?: Partial<Project>) => {
  const client = useHttp();

  return useQuery<Project[]>(["projects", params], () =>
    client("projects", { data: params })
  );
};

export const useEditProject = () => {
  const client = useHttp();
  const queryClient = useQueryClient();

  const [searchParams] = useProjectSearchParams();
  const queryKey = ["projects", searchParams];

  return useMutation(
    (params: Partial<Project>) =>
      client(`projects/${params.id}`, {
        method: "PATCH",
        data: params,
      }),
    {
      onSuccess: () => queryClient.invalidateQueries(queryKey),

      async onMutate(target) {
        // optimistic update
        const prevProjects = queryClient.getQueryData(queryKey);

        queryClient.setQueryData(queryKey, (old?: Project[]) => {
          return (
            old?.map((proj) =>
              proj.id === target.id ? { ...proj, pin: true } : proj
            ) || []
          );
        });

        return { prevProjects }; // rollback onError
      },
      onError(error, newItem, context) {
        queryClient.setQueryData(queryKey, context?.prevProjects);
      },
    }
  );
};

export const useAddProject = () => {
  const client = useHttp();
  const queryClient = useQueryClient();

  return useMutation(
    (params: Partial<Project>) =>
      client(`projects`, {
        method: "POST",
        data: params,
      }),
    {
      onSuccess: () => queryClient.invalidateQueries("projects"),
    }
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
