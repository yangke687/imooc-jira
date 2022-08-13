import React from "react";
import { useAuth } from "../context/auth-context";
import { Button, Form, Input } from "antd";

export const RegisterScreen = () => {
  const { register } = useAuth();

  const handleSubmit = (values: { username: string; password: string }) =>
    register(values);

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

      <Button type="primary" htmlType="submit">
        注册
      </Button>
    </Form>
  );
};
