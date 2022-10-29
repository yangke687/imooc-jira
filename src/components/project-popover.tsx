import React from "react";
import { Divider, List, Popover, Typography } from "antd";
import { useProjects } from "../utils/use-projects";
import styled from "@emotion/styled";
import { ButtonNoPadding } from "./lib";
import { useProjectModal } from "../screens/project-list/util";

export const ProjectPopover = () => {
  const { data: projects, isLoading } = useProjects();
  const pins = projects?.filter((item) => item.pin);

  const { open } = useProjectModal();

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
          <ButtonNoPadding onClick={open} type={"link"}>
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
