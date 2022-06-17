import React, { useState, useEffect } from "react";
import qs from "qs";
import { cleanObj } from "../../utils";
import { SearchPanel } from "./search-panel";
import { List } from "./list";

const api = process.env.REACT_APP_API_URL;

console.log("here", process.env);

export const ProjectListScreen = () => {
  const [users, setUsers] = useState([]);

  const [list, setList] = useState([]);

  const [param, setParam] = useState({
    name: "",
    personId: "",
  });

  useEffect(() => {
    fetch(`${api}/projects?${qs.stringify(cleanObj(param))}`).then(
      async (res) => {
        if (res.ok) {
          setList(await res.json());
        }
      }
    );
  }, [param]);

  useEffect(() => {
    fetch(`${api}/users`).then(async (res) => {
      if (res.ok) {
        setUsers(await res.json());
      }
    });
  }, []);

  return (
    <div>
      <SearchPanel
        param={param}
        setParam={setParam}
        users={users}
        setUsers={setUsers}
      />
      <List list={list} users={users} />
    </div>
  );
};
