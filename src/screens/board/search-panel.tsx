import React from "react";
import { useTasksSearchParams } from "./util";
import { Row } from "components/lib";
import { Button, Input } from "antd";
import { UserSelect } from "../../components/user-select";
import { TaskTypeSelect } from "../../components/task-type-select";

export const SearchPanel = () => {
  const [searchParams, setSearchParams] = useTasksSearchParams();

  const reset = () =>
    setSearchParams({
      name: undefined,
      processorId: undefined,
      tagId: undefined,
      typeId: undefined,
    });

  return (
    <Row marginBottom={4} gap={true}>
      <Input
        style={{ width: "20rem" }}
        placeholder={"任务名"}
        value={searchParams.name}
        onChange={(evt) => setSearchParams({ name: evt.target.value })}
      />
      <UserSelect
        defaultOptionName={"经办人"}
        value={searchParams.processorId}
        onChange={(value) => setSearchParams({ processorId: value })}
      />
      <TaskTypeSelect
        defaultOptionName={"任务类型"}
        value={searchParams.typeId}
        onChange={(value) => setSearchParams({ typeId: value })}
      />
      <Button onClick={reset}>清除筛选器</Button>
    </Row>
  );
};
