import React, { useState } from "react";
import { Button, Card, Divider } from "antd";
import styled from "@emotion/styled";

import logo from "assets/logo.svg";
import left from "assets/left.svg";
import right from "assets/right.svg";
import { LoginScreen } from "./login";
import { RegisterScreen } from "./register";
import { useDocumentTitle } from "../utils";
import { ErrorBox } from "../components/lib";

export const UnAuthApp = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useDocumentTitle("登录或注册以继续");

  return (
    <Container>
      <Header />
      <Background />
      <ShadowCard>
        <Title>{isRegister ? "请注册" : "请登录"}</Title>
        <ErrorBox error={error} />
        {isRegister ? (
          <RegisterScreen onError={setError} />
        ) : (
          <LoginScreen onError={setError} />
        )}{" "}
        <Divider />
        <a onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? "已经有账号了? 直接登录" : "没有账号? 注册新账号"}
        </a>
      </ShadowCard>
    </Container>
  );
};

export const LongButton = styled(Button)`
  width: 100%;
`;

const Title = styled.h2`
  margin-bottom: 2.4rem;
  color: rgb(94, 108.132);
`;

const Header = styled.div`
  background: url(${logo}) no-repeat center;
  padding: 5rem 0;
  background-size: 8rem;
  width: 100%;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`;

const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: left bottom, right bottom;
  background-image: url(${left}), url(${right});
  background-size: calc(((100vw - 40rem) / 2) - 3.2rem),
    calc(((100vw - 40rem) / 2) - 3.2rem), cover;
`;

const ShadowCard = styled(Card)`
  width: 40rem;
  min-height: 56rem;
  padding: 3.2rem 4rem;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 10px;
  text-align: center;
`;
