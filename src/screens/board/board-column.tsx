import React from "react";
import { Board } from "../../types/board";
import { useTasks } from "../../utils/task";
import { useTasksSearchParams } from "./util";

export const BoardColumn = ({ board }: { board: Board }) => {
  const { data: allTasks } = useTasks(useTasksSearchParams());

  const tasks = allTasks?.filter((item) => item.kanbanId === board.id);

  return (
    <div>
      <h3>{board.name}</h3>
      {tasks?.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
};
