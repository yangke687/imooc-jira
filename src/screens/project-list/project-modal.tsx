import React, { useEffect } from "react";
import { Button, Input, Drawer, Form, Spin } from "antd";
import { useProjectModal, useProjectsQueryKey } from "./util";
import { UserSelect } from "../../components/user-select";
import { useAddProject, useEditProject } from "../../utils/use-projects";
import { ErrorBox } from "../../components/lib";
import styled from "@emotion/styled";

export const ProjectModal = () => {
  // prettier-ignore
  const {projectModalOpen, close, editingProject, isLoading} = useProjectModal();

  const queryKey = useProjectsQueryKey();

  const useMutateProject = editingProject ? useEditProject : useAddProject;

  const {
    mutateAsync,
    error,
    isLoading: mutateLoading,
  } = useMutateProject(queryKey);

  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    mutateAsync({ ...editingProject, ...values }).then(() => {
      form.resetFields();
      close();
    });
  };

  useEffect(() => {
    form.setFieldsValue(editingProject);
  }, [editingProject, form]);

  const title = editingProject ? "编辑项目" : "新建项目";

  const onClose = () => {
    form.resetFields();
    close();
  };

  return (
    <Drawer
      forceRender
      onClose={onClose}
      visible={projectModalOpen}
      width={"100%"}
    >
      <Container>
        {isLoading ? (
          <Spin size={"large"} />
        ) : (
          <>
            <h1>{title}</h1>
            <ErrorBox error={error} />
            <Form
              form={form}
              layout={"vertical"}
              style={{ width: "40rem" }}
              onFinish={onFinish}
            >
              <Form.Item
                label={"项目名称"}
                name={"name"}
                rules={[{ required: true, message: "项目名称不能为空" }]}
              >
                <Input placeholder={"请输入项目名称"} />
              </Form.Item>

              <Form.Item
                label={"部门名称"}
                name={"organization"}
                rules={[{ required: true, message: "部门名称不能为空" }]}
              >
                <Input placeholder={"请输入部门名称"} />
              </Form.Item>

              <Form.Item label={"负责人"} name={"personId"}>
                <UserSelect defaultOptionName={"负责人"} />
              </Form.Item>

              <Form.Item style={{ textAlign: "right" }}>
                <Button
                  loading={mutateLoading}
                  type={"primary"}
                  htmlType={"submit"}
                >
                  提交
                </Button>
                <Button onClick={onClose}>关闭</Button>
              </Form.Item>
            </Form>
          </>
        )}
      </Container>
    </Drawer>
  );
};

const Container = styled.div`
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
