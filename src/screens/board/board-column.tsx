import React from "react";
import { Board } from "../../types/board";
import { useTasks } from "../../utils/task";
import { useTasksModal, useTasksSearchParams } from "./util";
import { useTaskTypes } from "../../utils/task-type";

import taskIcon from "../../assets/task.svg";
import bugIcon from "../../assets/bug.svg";
import styled from "@emotion/styled";
import { Card } from "antd";
import { CreateTask } from "./create-task";

const TaskTypeIcon = ({ id }: { id: number }) => {
  const { data: taskTypes } = useTaskTypes();

  const name = taskTypes?.find((item) => item.id === id)?.name;

  if (!name) {
    return null;
  }

  return <img src={name === "bug" ? bugIcon : taskIcon} alt={"task-type"} />;
};

export const BoardColumn = ({ board }: { board: Board }) => {
  const { data: allTasks } = useTasks(useTasksSearchParams()[0]);

  const tasks = allTasks?.filter((item) => item.kanbanId === board.id);

  const { startEdit } = useTasksModal();

  return (
    <Container>
      <TasksContainer>
        <h3>{board.name}</h3>
        {tasks?.map((item) => (
          <Card
            key={item.id}
            style={{ marginBottom: "0.5rem", cursor: "pointer" }}
            onClick={() => startEdit(item.id)}
          >
            <div>{item.name}</div>
            <TaskTypeIcon id={item.typeId} />
          </Card>
        ))}
        <CreateTask boardId={board.id} />
      </TasksContainer>
    </Container>
  );
};

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.7rem;
  margin-right: 1.5rem;
  min-width: 27rem;
  border-radius: 6px;
  background-color: rgb(244, 245, 247);
`;

const TasksContainer = styled.div`
  overflow: hidden;
  flex: 1;

  ::-webkit-scrollbar {
    display: none;
  }
`;
