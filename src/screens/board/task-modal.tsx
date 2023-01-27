import React, { useEffect } from "react";
import { useTasksModal, useTasksQueryKey } from "./util";
import { useDeleteTask, useEditTask } from "../../utils/task";
import { Input, Form, Modal, Button } from "antd";
import { UserSelect } from "../../components/user-select";
import { TaskTypeSelect } from "../../components/task-type-select";
import { Task } from "../../types/task";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

export const TaskModal = () => {
  const [form] = Form.useForm();

  const { editingTaskId, editingTask, close } = useTasksModal();

  const onCancel = () => {
    close();
    form.resetFields();
  };

  const { mutateAsync: editTask, isLoading: editLoading } = useEditTask(
    useTasksQueryKey()
  );

  const onOk = async () => {
    await editTask({ ...editingTask, ...form.getFieldsValue() });
    close();
  };

  useEffect(() => {
    form.setFieldsValue(editingTask);
  }, [editingTask, form]);

  const { mutateAsync } = useDeleteTask(useTasksQueryKey());

  const startDelete = () => {
    close();
    Modal.confirm({
      title: "确认删除任务吗?",
      okText: "确定",
      cancelText: "取消",
      onOk: () => mutateAsync({ id: editingTaskId }),
    });
  };

  return (
    <Modal
      forceRender={true}
      okText={"确认"}
      cancelText={"取消"}
      confirmLoading={editLoading}
      title={"编辑任务"}
      visible={Boolean(editingTaskId)}
      onCancel={onCancel}
      onOk={onOk}
    >
      <Form {...layout} initialValues={editingTask} form={form}>
        <Form.Item
          label={"任务名"}
          name={"name"}
          rules={[{ required: true, message: "请输入任务名" }]}
        >
          <Input placeholder={"任务名"} />
        </Form.Item>

        <Form.Item label={"经办人"} name={"processorId"}>
          <UserSelect defaultOptionName={"经办人"} />
        </Form.Item>

        <Form.Item label={"类型"} name={"typeId"}>
          <TaskTypeSelect />
        </Form.Item>
      </Form>

      <div style={{ textAlign: "right" }}>
        <Button type={"link"} onClick={startDelete}>
          删除
        </Button>
      </div>
    </Modal>
  );
};
