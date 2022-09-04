import React from "react";
import { useAuth } from "../context/auth-context";
import { Form, Input } from "antd";
import { LongButton } from "./index";

export const RegisterScreen = ({
  onError,
}: {
  onError: (err: Error) => void;
}) => {
  const { register } = useAuth();

  // prettier-ignore
  const handleSubmit = (values: { username: string; password: string }) => register(values).catch(onError)

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name="username"
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input placeholder="用户名" />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input placeholder="密码" />
      </Form.Item>

      <LongButton type="primary" htmlType="submit">
        注册
      </LongButton>
    </Form>
  );
};
