import React from "react";
import { useDocumentTitle } from "../../utils";
import { useBoards } from "../../utils/board";
import { useBoardSearchParams, useProjectInUrl } from "./util";
import { BoardColumn } from "./board-column";
import styled from "@emotion/styled";

export const BoardScreen = () => {
  useDocumentTitle("看板列表");

  const { data: project } = useProjectInUrl();
  const { data: boards = [] } = useBoards(useBoardSearchParams());

  return (
    <div>
      <h1>{project?.name}看板</h1>
      <ColumnsContainer>
        {boards.map((item) => (
          <BoardColumn board={item} key={item.id} />
        ))}
      </ColumnsContainer>
    </div>
  );
};

const ColumnsContainer = styled.div`
  display: flex;
  overflow: hidden;
  margin-right: 2rem;
`;
