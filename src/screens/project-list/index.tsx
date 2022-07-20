import React, { useState, useEffect } from "react";
import qs from "qs";
import { cleanObj, useMount, useDebounce, useArray } from "../../utils";
import { SearchPanel } from "./search-panel";
import { List } from "./list";

const api = process.env.REACT_APP_API_URL;

export const ProjectListScreen = () => {
  const [users, setUsers] = useState([]);

  const [list, setList] = useState([]);

  const [param, setParam] = useState({
    name: "",
    personId: "",
  });

  const debouncedParam = useDebounce(param, 500);

  useEffect(() => {
    fetch(`${api}/projects?${qs.stringify(cleanObj(debouncedParam))}`).then(
      async (res) => {
        if (res.ok) {
          setList(await res.json());
        }
      }
    );
  }, [debouncedParam]);

  useMount(() => {
    fetch(`${api}/users`).then(async (res) => {
      if (res.ok) {
        setUsers(await res.json());
      }
    });
  });

  const persons: { name: string; age: number }[] = [
    { name: "jack", age: 25 },
    { name: "ma", age: 22 },
  ];

  const { value, clear, removeIndex, add } = useArray(persons);

  return (
    <div>
      <SearchPanel param={param} setParam={setParam} users={users} />
      <List list={list} users={users} />

      <h2>useArray Hook Test</h2>

      <ul>
        {value.map((item, idx) => (
          <li key={idx}>
            {item.name} {item.age}
          </li>
        ))}
      </ul>

      <button onClick={() => add({ name: "Ke", age: 12 })}>Add</button>
      <button onClick={() => clear()}>Clear</button>
      <button onClick={() => removeIndex(0)}>Remove 0</button>
    </div>
  );
};
