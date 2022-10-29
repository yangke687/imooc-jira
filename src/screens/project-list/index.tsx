import React from "react";
import styled from "@emotion/styled";
import { useDebounce, useArray } from "../../utils";
import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { useProjects } from "../../utils/use-projects";
import { useProjectModal, useProjectSearchParams } from "./util";
import { useUsers } from "../../utils/use-users";
import { ButtonNoPadding, ErrorBox, Row } from "../../components/lib";

export const ProjectListScreen = () => {
  const [param, setParam] = useProjectSearchParams();

  const { isLoading, error, data: list } = useProjects(useDebounce(param, 500));

  // const { value, clear, removeIndex, add } = useArray(persons);

  const { data: users } = useUsers();

  const { open } = useProjectModal();

  return (
    <Container>
      <Row between={true}>
        <h1>项目列表</h1>
        <ButtonNoPadding onClick={open} type={"link"}>
          创建项目
        </ButtonNoPadding>
      </Row>
      <ErrorBox error={error} />
      <SearchPanel param={param} setParam={setParam} />
      <List loading={isLoading} dataSource={list || []} users={users || []} />

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
