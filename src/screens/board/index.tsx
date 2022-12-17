import React from "react";
import { useDocumentTitle } from "../../utils";
import { useBoards } from "../../utils/board";
import {
  useBoardSearchParams,
  useProjectInUrl,
  useTasksSearchParams,
} from "./util";
import { BoardColumn } from "./board-column";
import styled from "@emotion/styled";
import { SearchPanel } from "./search-panel";
import { ScreenContainer } from "../../components/lib";
import { useTasks } from "../../utils/task";
import { Spin } from "antd";
import { CreateBoard } from "./create-board";
import { TaskModal } from "./task-modal";
import { DragDropContext } from "react-beautiful-dnd";
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
    <DragDropContext onDragEnd={() => console.log("saving data...")}>
      <ScreenContainer>
        <h1>{project?.name}看板</h1>
        <SearchPanel />
        {isLoading ? (
          <Spin size={"large"} />
        ) : (
          <Drop type={"COLUMN"} direction={"horizontal"} droppableId={"kanban"}>
            <ColumnsContainer>
              {boards.map((item, idx) => (
                <Drag
                  key={item.id}
                  draggableId={`kanban-column-${item.id}`}
                  index={idx}
                >
                  <BoardColumn board={item} key={item.id} />
                </Drag>
              ))}
              <CreateBoard />
            </ColumnsContainer>
          </Drop>
        )}
        <TaskModal />
      </ScreenContainer>
    </DragDropContext>
  );
};

const ColumnsContainer = styled(DropChild)`
  display: flex;
  overflow-x: scroll;
  margin-right: 2rem;
  flex: 1;
`;
