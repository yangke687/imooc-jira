import { useAuth } from "context/auth-context";
import React from "react";
import styled from "@emotion/styled";
import { Dropdown, Menu } from "antd";
import { ProjectListScreen } from "screens/project-list";
import { Row } from "./components/lib";
import { ReactComponent as Logo } from "assets/software-logo.svg";
import { useDocumentTitle } from "./utils";

export const AuthApp = () => {
  const { logout, user } = useAuth();

  useDocumentTitle("项目列表", false);

  return (
    <Container>
      <Header between={true}>
        <HeaderLeft gap={true}>
          <Logo width="18rem" color="rgb(38, 132, 255)" />
          <h3>项目</h3>
          <h3>用户</h3>
        </HeaderLeft>
        <HeaderRight>
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item key="logout">
                  <a onClick={(e) => logout()}>登出</a>
                </Menu.Item>
              </Menu>
            }
          >
            <a onClick={(e) => e.preventDefault()}>Hi, {user?.name}</a>
          </Dropdown>
        </HeaderRight>
      </Header>
      <Main>
        <ProjectListScreen />
      </Main>
    </Container>
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
