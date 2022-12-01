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

export const BoardScreen = () => {
  useDocumentTitle("看板列表");

  const { data: project } = useProjectInUrl();
  const { data: boards = [], isLoading: boardIsLoading } = useBoards(
    useBoardSearchParams()
  );

  const { isLoading: tasksIsLoading } = useTasks(useTasksSearchParams()[0]);

  const isLoading = tasksIsLoading || boardIsLoading;

  return (
    <ScreenContainer>
      <h1>{project?.name}看板</h1>
      <SearchPanel />
      {isLoading ? (
        <Spin size={"large"} />
      ) : (
        <ColumnsContainer>
          {boards.map((item) => (
            <BoardColumn board={item} key={item.id} />
          ))}
          <CreateBoard />
        </ColumnsContainer>
      )}
      <TaskModal />
    </ScreenContainer>
  );
};

const ColumnsContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  margin-right: 2rem;
  flex: 1;
`;
