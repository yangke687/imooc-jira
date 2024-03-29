import { QueryKey, useQueryClient } from "react-query";
import { Project } from "../types/project";
import { reorder } from "./reorder";
import { Task } from "../types/task";

export const useConfig = (
  queryKey: QueryKey,
  callback: (target: any, old?: any[]) => any[]
) => {
  const queryClient = useQueryClient();

  return {
    onSuccess: () => queryClient.invalidateQueries(queryKey),

    async onMutate(target: any) {
      // optimistic update
      const prevItems = queryClient.getQueryData(queryKey);

      queryClient.setQueryData(queryKey, (old?: any[]) => {
        return callback(target, old);
      });

      return { prevItems }; // rollback onError
    },

    onError(error: any, newItem: any, context: any) {
      queryClient.setQueryData(queryKey, context?.prevItems);
    },
  };
};

export const useDeleteConfig = (queryKey: QueryKey) =>
  useConfig(
    queryKey,
    (target, old) => old?.filter((item) => item.id !== target.id) || []
  );

export const useEditConfig = (queryKey: QueryKey) =>
  useConfig(
    queryKey,
    (target, old) =>
      old?.map((item) => {
        return item.id === target.id ? { ...item, ...target } : item;
      }) || []
  );

export const useAddConfig = (queryKey: QueryKey) =>
  useConfig(queryKey, (target, old) => (old ? [...old, target] : []));

export const useReorderKanbanConfig = (queryKey: QueryKey) =>
  useConfig(queryKey, (target, old) => reorder({ list: old, ...target }));

export const useReorderTaskConfig = (queryKey: QueryKey) =>
  useConfig(queryKey, (target, old) => {
    const orderedList = reorder({ list: old, ...target }) as Task[];

    return orderedList.map((item) => {
      return item.id !== target.fromId
        ? item
        : {
            ...item,
            kanbanId: target.toKanbanId,
          };
    });
  });
