import React from "react";
import { Board } from "../../types/board";
import { useTasks } from "../../utils/task";
import { useBoardsQueryKey, useTasksModal, useTasksSearchParams } from "./util";
import { useTaskTypes } from "../../utils/task-type";

import taskIcon from "../../assets/task.svg";
import bugIcon from "../../assets/bug.svg";
import styled from "@emotion/styled";
import { Button, Card, Dropdown, Menu, Modal } from "antd";
import { CreateTask } from "./create-task";
import { Task } from "../../types/task";
import { Mark } from "../../components/mark";
import { useDeleteBoard } from "../../utils/board";
import { Row } from "../../components/lib";
import { Drag, Drop, DropChild } from "../../components/drag-and-drop";

const TaskTypeIcon = ({ id }: { id: number }) => {
  const { data: taskTypes } = useTaskTypes();

  const name = taskTypes?.find((item) => item.id === id)?.name;

  if (!name) {
    return null;
  }

  return <img src={name === "bug" ? bugIcon : taskIcon} alt={"task-type"} />;
};

const TaskCard = React.forwardRef<HTMLDivElement, { task: Task }>(
  ({ task, ...dragProps }, ref) => {
    const { startEdit } = useTasksModal();
    const [searchParams] = useTasksSearchParams();
    const { name: keyword } = searchParams;

    return (
      <div ref={ref} {...dragProps}>
        <Card
          key={task.id}
          style={{ marginBottom: "0.5rem", cursor: "pointer" }}
          onClick={() => startEdit(task.id)}
        >
          <p>
            <Mark name={task.name} keyword={keyword} />
          </p>
          <TaskTypeIcon id={task.typeId} />
        </Card>
      </div>
    );
  }
);

export const BoardColumn = React.forwardRef<HTMLDivElement, { board: Board }>(
  ({ board, ...dragProps }, ref) => {
    const { data: allTasks } = useTasks(useTasksSearchParams()[0]);

    const tasks = allTasks?.filter((item) => item.kanbanId === board.id);

    return (
      <Container ref={ref} {...dragProps}>
        <TasksContainer>
          <Row between>
            <h3>{board.name}</h3>
            <More kanban={board} key={board.id} />
          </Row>
          <Drop
            type={"ROW"}
            direction={"vertical"}
            droppableId={`kanban-${board.id}`}
          >
            <DropChild>
              {tasks?.map((item, idx) => (
                <Drag draggableId={`task-${item.id}`} index={idx} key={item.id}>
                  <TaskCard task={item} key={item.id} />
                </Drag>
              ))}
            </DropChild>
          </Drop>
          <CreateTask boardId={board.id} />
        </TasksContainer>
      </Container>
    );
  }
);

const More = ({ kanban }: { kanban: Board }) => {
  const { mutateAsync } = useDeleteBoard(useBoardsQueryKey());

  const startDelete = () => {
    Modal.confirm({
      title: "确定删除看板吗?",
      onOk: () => mutateAsync({ id: kanban.id }),
      okText: "确定",
      cancelText: "取消",
    });
  };

  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item onClick={startDelete}>
            <Button type={"link"}>删除</Button>
          </Menu.Item>
        </Menu>
      }
    >
      <Button type={"link"}>...</Button>
    </Dropdown>
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
