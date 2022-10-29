import { useUrlQueryParam } from "../../utils/url";
import { useMemo } from "react";

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

  const open = () => setProjectCreate({ projectCreate: true });

  const close = () => setProjectCreate({ projectCreate: null });

  return {
    projectModalOpen: projectCreate === "true",
    open,
    close,
  };
};
