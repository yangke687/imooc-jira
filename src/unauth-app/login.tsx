import React from "react";
import { Form, Input } from "antd";
import { useAuth } from "../context/auth-context";
import { LongButton } from "./index";

export const LoginScreen = ({ onError }: { onError: (err: Error) => void }) => {
  const { login } = useAuth();

  // prettier-ignore
  const handleSubmit = (values: { username: string; password: string }) => login(values).catch(onError)

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
        登录
      </LongButton>
    </Form>
  );
};
