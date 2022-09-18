import React from "react";
import { Divider, List, Popover, Typography } from "antd";
import { useProjects } from "../utils/use-projects";
import styled from "@emotion/styled";
import { ButtonNoPadding } from "./lib";

export const ProjectPopover = (props: {
  setProjectModalOpen: (isOpen: boolean) => void;
}) => {
  const { data: projects, isLoading } = useProjects();
  const pins = projects?.filter((item) => item.pin);

  return (
    <Popover
      placement={"bottomLeft"}
      content={
        <ContentContainer>
          <Typography.Text type={"secondary"}>收藏项目</Typography.Text>
          <List>
            {pins?.map((item) => (
              <List.Item key={item.id}>
                <List.Item.Meta title={item.name} />
              </List.Item>
            ))}
          </List>
          <Divider />
          <ButtonNoPadding
            type={"link"}
            onClick={() => props.setProjectModalOpen(true)}
          >
            创建项目
          </ButtonNoPadding>
        </ContentContainer>
      }
    >
      <span>项目</span>
    </Popover>
  );
};

const ContentContainer = styled.div`
  min-width: 30rem;
`;
