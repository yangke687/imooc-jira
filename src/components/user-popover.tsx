import React from "react";
import { Divider, List, Popover, Typography } from "antd";
import styled from "@emotion/styled";
import { useUsers } from "../utils/use-users";

export const UserPopover = () => {
  const { data: users, isLoading, refetch } = useUsers();

  return (
    <Popover
      onVisibleChange={() => refetch()}
      placement={"bottomLeft"}
      content={
        <ContentContainer>
          <Typography.Text type={"secondary"}>组员列表</Typography.Text>
          <List>
            {users?.map((item) => (
              <List.Item key={item.id}>
                <List.Item.Meta title={item.name} />
              </List.Item>
            ))}
          </List>
          <Divider />
        </ContentContainer>
      }
    >
      <span>组员</span>
    </Popover>
  );
};

const ContentContainer = styled.div`
  min-width: 30rem;
`;
