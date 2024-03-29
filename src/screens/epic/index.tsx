import React, { useState } from "react";
import { Row, ScreenContainer } from "../../components/lib";
import { useProjectInUrl } from "../board/util";
import { useDeleteEpic, useEpics } from "../../utils/epic";
import { useEpicSearchParams, useEpicsQueryKey } from "./util";
import { Button, List, Modal } from "antd";
import dayjs from "dayjs";
import { useTasks } from "../../utils/task";
import { Link } from "react-router-dom";
import { CreateEpic } from "./create-epic";
import { Epic } from "../../types/epic";

export const EpicScreen = () => {
  const { data: currentProject } = useProjectInUrl();

  const { data: epics } = useEpics(useEpicSearchParams());

  const { mutate: deleteEpic } = useDeleteEpic(useEpicsQueryKey());

  const { data: tasks } = useTasks({ projectId: currentProject?.id });

  const [epicCreateOpen, setEpicCreateOpen] = useState(false);

  const confirmDeleteEpic = (epic: Epic) => {
    Modal.confirm({
      title: `确定删除项目组：${epic.name}`,
      content: "点击确定删除",
      okText: "确定",
      onOk() {
        deleteEpic({ id: epic.id });
      },
    });
  };

  return (
    <ScreenContainer>
      <Row between={true}>
        <h1>{currentProject?.name}任务组</h1>
        <Button onClick={() => setEpicCreateOpen(true)} type={"link"}>
          创建任务组
        </Button>
      </Row>

      <List
        style={{ overflow: "scroll" }}
        dataSource={epics || []}
        itemLayout={"vertical"}
        renderItem={(epic) => (
          <List.Item>
            <List.Item.Meta
              title={
                <Row between={true}>
                  <span>{epic.name}</span>
                  <Button type={"link"} onClick={() => confirmDeleteEpic(epic)}>
                    删除
                  </Button>
                </Row>
              }
              description={
                <div>
                  <div>开始时间: {dayjs(epic.start).format("YYYY-MM-DD")}</div>
                  <div>结束时间: {dayjs(epic.end).format("YYYY-MM-DD")}</div>
                </div>
              }
            />
            <>
              {tasks
                ?.filter((task) => task.epicId === epic.id)
                .map((task, idx) => {
                  return (
                    <Link
                      style={{ marginRight: 5 }}
                      key={idx}
                      to={`/projects/${currentProject?.id}/board?editingTaskId=${task.id}`}
                    >
                      {task.name}
                    </Link>
                  );
                })}
            </>
          </List.Item>
        )}
      />
      <CreateEpic
        visible={epicCreateOpen}
        onClose={() => setEpicCreateOpen(false)}
      />
    </ScreenContainer>
  );
};
