import React from "react";
import { Button, Drawer } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { selectedProjectModalOpen } from "../../store/project.list.slice";
import { projectListActions } from "../../store/project.list.slice";

export const ProjectModal = () => {
  const projectModalOpen = useSelector(selectedProjectModalOpen);

  const dispatch = useDispatch();

  return (
    <Drawer
      onClose={() => dispatch(projectListActions.closeProjectModal())}
      visible={projectModalOpen}
      width={"100%"}
    >
      <h1>Project Modal</h1>
      <Button onClick={() => dispatch(projectListActions.closeProjectModal())}>
        关闭
      </Button>
    </Drawer>
  );
};
