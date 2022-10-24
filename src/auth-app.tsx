import { useAuth } from "context/auth-context";
import React, { ReactNode, useState } from "react";
import { Navigate, Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import styled from "@emotion/styled";
import { Button, Dropdown, Menu } from "antd";
import { useDispatch } from "react-redux";

import { ProjectListScreen } from "screens/project-list";
import { ButtonNoPadding, Row } from "./components/lib";
import { ReactComponent as Logo } from "assets/software-logo.svg";
import { resetRoute, useDocumentTitle } from "./utils";
import { ProjectScreen } from "./screens/project";
import { ProjectModal } from "./screens/project-list/project-modal";
import { ProjectPopover } from "./components/project-popover";
// import { Counter } from "./screens/counter-sample"; // undo, redo, test samples

import { projectListActions } from "./store/project.list.slice";

export const AuthApp = () => {
  useDocumentTitle("项目列表", false);

  const dispatch = useDispatch();

  return (
    <Container>
      <PageHeader />
      <Main>
        {/*<Counter />*/}
        <BrowserRouter>
          <Routes>
            <Route
              path={"/projects"}
              element={
                <ProjectListScreen
                  projectButton={
                    <ButtonNoPadding
                      type={"link"}
                      onClick={() =>
                        dispatch(projectListActions.openProjectModal())
                      }
                    >
                      创建项目
                    </ButtonNoPadding>
                  }
                />
              }
            />
            <Route
              path={"/projects/:projectId/*"}
              element={<ProjectScreen />}
            />
            <Route path={"*"} element={<Navigate to={"/projects"} />} />
          </Routes>
        </BrowserRouter>
      </Main>
      <ProjectModal />
    </Container>
  );
};

const PageHeader = () => {
  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <ButtonNoPadding type={"link"} onClick={resetRoute}>
          <Logo width="18rem" color="rgb(38, 132, 255)" />
        </ButtonNoPadding>
        <ProjectPopover />
        <span>用户</span>
      </HeaderLeft>
      <HeaderRight>
        <User />
      </HeaderRight>
    </Header>
  );
};

const User = () => {
  const { logout, user } = useAuth();
  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item key="logout">
            <Button type={"link"} onClick={() => logout()}>
              登出
            </Button>
          </Menu.Item>
        </Menu>
      }
    >
      <Button type={"link"} onClick={(e) => e.preventDefault()}>
        Hi, {user?.name}
      </Button>
    </Dropdown>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  grid-template-areas:
    "header"
    "main";
  height: 100vh;
`;

const Header = styled(Row)`
  grid-area: header;
  padding: 3.2rem;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  z-index: 1;
`;

const HeaderLeft = styled(Row)``;

const HeaderRight = styled.div``;

const Main = styled.main`
  grid-area: main;
`;
