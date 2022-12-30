import React from "react";
import { useDocumentTitle } from "../../utils";
import { useBoards, useReorderBoard } from "../../utils/board";
import {
  useBoardSearchParams,
  useBoardsQueryKey,
  useProjectInUrl,
  useTasksQueryKey,
  useTasksSearchParams,
} from "./util";
import { BoardColumn } from "./board-column";
import styled from "@emotion/styled";
import { SearchPanel } from "./search-panel";
import { ScreenContainer } from "../../components/lib";
import { useReorderTask, useTasks } from "../../utils/task";
import { Spin } from "antd";
import { CreateBoard } from "./create-board";
import { TaskModal } from "./task-modal";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Drag, Drop, DropChild } from "../../components/drag-and-drop";

export const BoardScreen = () => {
  useDocumentTitle("看板列表");

  const { data: project } = useProjectInUrl();
  const { data: boards = [], isLoading: boardIsLoading } = useBoards(
    useBoardSearchParams()
  );

  const { isLoading: tasksIsLoading } = useTasks(useTasksSearchParams()[0]);

  const isLoading = tasksIsLoading || boardIsLoading;

  return (
    <DragDropContext onDragEnd={useDropEnd()}>
      <ScreenContainer>
        <h1>{project?.name}看板</h1>
        <SearchPanel />
        {isLoading ? (
          <Spin size={"large"} />
        ) : (
          <ColumnsContainer>
            <Drop
              type={"COLUMN"}
              direction={"horizontal"}
              droppableId={"kanban"}
            >
              <DropChild style={{ display: "flex" }}>
                {boards.map((item, idx) => (
                  <Drag
                    key={item.id}
                    draggableId={`kanban-column-${item.id}`}
                    index={idx}
                  >
                    <BoardColumn board={item} key={item.id} />
                  </Drag>
                ))}
              </DropChild>
            </Drop>
            <CreateBoard />
          </ColumnsContainer>
        )}
        <TaskModal />
      </ScreenContainer>
    </DragDropContext>
  );
};

export const useDropEnd = () => {
  const { data: kanbans } = useBoards(useBoardSearchParams());

  const { mutate: reorderKanban } = useReorderBoard(useBoardsQueryKey());

  const { data: allTasks = [] } = useTasks(useTasksSearchParams()[0]);

  const { mutate: reorderTask } = useReorderTask(useTasksQueryKey());

  return ({ source, destination, type }: DropResult) => {
    if (!source || !destination) {
      return;
    }

    if (type === "COLUMN") {
      const fromId = kanbans?.[source.index].id;
      const toId = kanbans?.[destination.index].id;

      if (!fromId || !toId || fromId === toId) {
        return;
      }

      const type = source.index < destination.index ? "after" : "before";

      reorderKanban({
        fromId,
        referenceId: toId,
        type,
      });
    }

    if (type === "ROW") {
      const fromKanbanId = +source.droppableId.split("-")[1];
      const toKanbanId = +destination.droppableId.split("-")[1];

      // if (fromKanbanId === toKanbanId) {
      //   return;
      // }

      const fromTask = allTasks.filter(
        (item) => item.kanbanId === fromKanbanId
      )[source.index];

      const toTask = allTasks.filter((item) => item.kanbanId === toKanbanId)[
        destination.index
      ];

      const type = source.index < destination.index ? "after" : "before";

      reorderTask({
        fromId: fromTask?.id,
        referenceId: toTask?.id,
        type,
        toKanbanId,
        fromKanbanId,
      });
    }
  };
};

const ColumnsContainer = styled("div")`
  display: flex;
  overflow-x: scroll;
  margin-right: 2rem;
  flex: 1;
`;
