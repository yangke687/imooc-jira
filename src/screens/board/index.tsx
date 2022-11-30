import React from "react";
import { useDocumentTitle } from "../../utils";
import { useBoards } from "../../utils/board";
import { useBoardSearchParams, useProjectInUrl } from "./util";
import { BoardColumn } from "./board-column";
import styled from "@emotion/styled";
import { SearchPanel } from "./search-panel";
import { ScreenContainer } from "../../components/lib";

export const BoardScreen = () => {
  useDocumentTitle("看板列表");

  const { data: project } = useProjectInUrl();
  const { data: boards = [] } = useBoards(useBoardSearchParams());

  return (
    <ScreenContainer>
      <h1>{project?.name}看板</h1>
      <SearchPanel />
      <ColumnsContainer>
        {boards.map((item) => (
          <BoardColumn board={item} key={item.id} />
        ))}
      </ColumnsContainer>
    </ScreenContainer>
  );
};

const ColumnsContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  margin-right: 2rem;
  flex: 1;
`;
