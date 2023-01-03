import { useCallback, useMemo } from "react";
import { useLocation } from "react-router";
import { useProject } from "../../utils/use-projects";
import { useUrlQueryParam } from "../../utils/url";
import { useTask } from "../../utils/task";

export const useProjectIdInUrl = () => {
  const { pathname } = useLocation();

  const id = pathname.match(/projects\/(\d+)/)?.[1];

  return Number(id);
};

export const useProjectInUrl = () => useProject(useProjectIdInUrl());

export const useBoardSearchParams = () => ({ projectId: useProjectIdInUrl() });
export const useBoardsQueryKey = () => ["boards", useBoardSearchParams()];

export const useTasksSearchParams = () => {
  const [param, setParam] = useUrlQueryParam([
    "name",
    "typeId",
    "processorId",
    "tagId",
  ]);

  const projectId = useProjectIdInUrl();

  return [
    useMemo(
      () => ({
        projectId,
        typeId: Number(param.typeId) || undefined,
        processorId: Number(param.processorId) || undefined,
        tagId: Number(param.tagId) || undefined,
        name: param.name,
      }),
      [projectId, param]
    ),
    setParam,
  ] as const;
};

export const useTasksQueryKey = () => ["tasks", useTasksSearchParams()[0]];

export const useTasksModal = () => {
  const [{ editingTaskId }, setEditingTaskId] = useUrlQueryParam([
    "editingTaskId",
  ]);

  const { data: editingTask, isLoading } = useTask(Number(editingTaskId));

  const startEdit = useCallback(
    (id: number) => {
      setEditingTaskId({ editingTaskId: id });
    },
    [setEditingTaskId]
  );

  const close = useCallback(() => {
    setEditingTaskId({ editingTaskId: "" });
  }, [setEditingTaskId]);

  return {
    editingTaskId,
    editingTask,
    startEdit,
    close,
    isLoading,
  };
};
