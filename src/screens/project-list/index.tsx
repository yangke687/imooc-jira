import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { cleanObj, useMount, useDebounce, useArray } from "../../utils";
import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { useHttp } from "../../utils/http";

export const ProjectListScreen = () => {
  const [users, setUsers] = useState([]);

  const [list, setList] = useState([]);

  const [param, setParam] = useState({
    name: "",
    personId: "",
  });

  const debouncedParam = useDebounce(param, 500);

  const client = useHttp();

  useEffect(() => {
    client("projects", { data: cleanObj(debouncedParam) }).then(setList);
  }, [debouncedParam]);

  useMount(() => {
    client("users").then(setUsers);
  });

  /*const persons: { name: string; age: number }[] = [
    { name: "jack", age: 25 },
    { name: "ma", age: 22 },
  ];*/

  // const { value, clear, removeIndex, add } = useArray(persons);

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel param={param} setParam={setParam} users={users} />
      <List list={list} users={users} />

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

const Container = styled.div`
  padding: 3.2rem;
`;
