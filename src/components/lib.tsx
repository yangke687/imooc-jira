import React from "react";
import { Button, Spin, Typography } from "antd";
import styled from "@emotion/styled";
import { DevTools } from "jira-dev-tool";

export const Row = styled.div<{
  gap?: number | boolean;
  between?: boolean;
  marginBottom?: number;
}>`
  display: flex;
  margin-bottom: ${(props) =>
    props.marginBottom ? props.marginBottom + "rem" : 0};
  align-items: center;
  justify-content: ${(props) => (props.between ? "space-between" : undefined)};

  > * {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    margin-right: ${(props) =>
      typeof props.gap === "number"
        ? props.gap + "rem"
        : props.gap
        ? "2rem"
        : undefined};
  }
`;

const FullPage = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FullPageLoading = () => (
  <FullPage>
    <Spin size="large" />
  </FullPage>
);

export const FullPageFallback = ({ error }: { error: Error | null }) => (
  <FullPage>
    <DevTools />
    <ErrorBox error={error} />
  </FullPage>
);

export const ButtonNoPadding = styled(Button)`
  padding: 0;
`;

const isError = (value: any): value is Error => value?.message;

export const ErrorBox = ({ error }: { error: unknown }) => {
  if (isError(error)) {
    return <Typography.Text type={"danger"}>{error.message}</Typography.Text>;
  }

  return null;
};

export const ScreenContainer = styled.div`
  padding: 3.2rem;
  width: 100%;
  display: flex;
  flex-direction: column;
`;
