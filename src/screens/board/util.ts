import { useLocation } from "react-router";
import { useProject } from "../../utils/use-projects";

export const useProjectIdInUrl = () => {
  const { pathname } = useLocation();

  const id = pathname.match(/projects\/(\d+)/)?.[1];

  return Number(id);
};

export const useProjectInUrl = () => useProject(useProjectIdInUrl());

export const useBoardSearchParams = () => ({ projectId: useProjectIdInUrl() });
export const useBoardsQueryKey = () => ["kanbans", useBoardSearchParams()];

export const useTasksSearchParams = () => ({ projectId: useProjectIdInUrl() });
export const useTasksQueryKey = () => ["tasks", useTasksSearchParams()];
