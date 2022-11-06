import { useUrlQueryParam } from "../../utils/url";
import { useMemo } from "react";
import { useProject } from "../../utils/use-projects";

export const useProjectSearchParams = () => {
  const [param, setParam] = useUrlQueryParam(["name", "personId"]);
  return [
    useMemo(
      () => ({
        ...param,
        personId: Number(param.personId) || undefined,
      }),
      [param]
    ),
    setParam,
  ] as const;
};

export const useProjectModal = () => {
  const [{ projectCreate }, setProjectCreate] = useUrlQueryParam([
    "projectCreate",
  ]);

  const [{ editingProjectId }, setEditingProjectId] = useUrlQueryParam([
    "editingProjectId",
  ]);

  // prettier-ignore
  const {data: editingProject, isLoading} = useProject(Number(editingProjectId));

  // prettier-ignore
  const startEdit = (id: number) => setEditingProjectId({editingProjectId: id});

  const open = () => setProjectCreate({ projectCreate: true });

  const close = () => {
    if (editingProject) {
      setEditingProjectId({ editingProjectId: null });
    } else {
      setProjectCreate({ projectCreate: null });
    }
  };

  return {
    projectModalOpen: projectCreate === "true" || Boolean(editingProjectId),
    editingProject,
    isLoading,
    open,
    close,
    startEdit,
  };
};
