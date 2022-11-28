import React from "react";
import { IdSelect } from "./id-select";
import { useTaskTypes } from "../utils/task-type";

export const TaskTypeSelect = (
  props: React.ComponentProps<typeof IdSelect>
) => {
  const { data: types } = useTaskTypes();
  return <IdSelect options={types || []} {...props} />;
};
