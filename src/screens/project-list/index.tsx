import React, { useState } from "react";
import styled from "@emotion/styled";
import { useDebounce, useArray } from "../../utils";
import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { Button, Typography } from "antd";
import { useProjects } from "../../utils/use-projects";
import { useProjectSearchParams } from "./util";
import { useUsers } from "../../utils/use-users";
import { Row } from "../../components/lib";

export const ProjectListScreen = (props: {
  setProjectModalOpen: (isOpen: boolean) => void;
}) => {
  const [param, setParam] = useProjectSearchParams();

  const {
    isLoading,
    error,
    data: list,
    retry,
  } = useProjects(useDebounce(param, 500));

  // const { value, clear, removeIndex, add } = useArray(persons);

  const { data: users } = useUsers();

  return (
    <Container>
      <Row between={true}>
        <h1>项目列表</h1>
        <Button onClick={() => props.setProjectModalOpen(true)}>
          创建项目
        </Button>
      </Row>
      {error ? (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      ) : null}
      <SearchPanel param={param} setParam={setParam} />
      <List
        loading={isLoading}
        dataSource={list || []}
        users={users || []}
        refresh={retry}
        setProjectModalOpen={props.setProjectModalOpen}
      />

      {/* <h2>useArray Hook Test</h2>

      <ul>
        {value.map((item, idx) => (
          <li key={idx}>
            {item.name} {item.age}
          </li>
        ))}
      </ul>

      <button onClick={() => add({ name: "Ke", age: 12 })}>Add</button>
      <button onClick={() => clear()}>Clear</button>
      <button onClick={() => removeIndex(0)}>Remove 0</button>*/}
    </Container>
  );
};

// ProjectListScreen.whyDidYouRender = true;

const Container = styled.div`
  padding: 3.2rem;
`;
