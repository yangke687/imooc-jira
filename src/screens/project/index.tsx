import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router";
import { Link } from "react-router-dom";

import { BoardScreen } from "../board";
import { EpicScreen } from "../epic";
import styled from "@emotion/styled";
import { Menu } from "antd";

const useRouteType = () => {
  const units = useLocation().pathname.split("/");
  return units[units.length - 1];
};

export const ProjectScreen = () => {
  return (
    <Container>
      <Aside>
        <Menu mode={"inline"} selectedKeys={[useRouteType()]}>
          <Menu.Item key={"board"}>
            <Link to={"board"}>看板</Link>
          </Menu.Item>
          <Menu.Item key={"epic"}>
            <Link to={"epic"}>任务组</Link>
          </Menu.Item>
        </Menu>
      </Aside>
      <Main>
        <Routes>
          <Route path={"/board"} element={<BoardScreen />} />
          <Route path={"/epic"} element={<EpicScreen />} />
          <Route
            index
            element={
              <Navigate
                to={window.location.pathname + "/board"}
                replace={true}
              />
            }
          />
        </Routes>
      </Main>
    </Container>
  );
};

const Aside = styled.aside`
  background-color: rgb(244, 245, 247);
  display: flex;
`;

const Main = styled.div`
  display: flex;
  box-shadow: -5px 0 5px -5px rgba(0, 0, 0, 0.1);
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: 16rem 1fr;
`;
