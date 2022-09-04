import React from "react";
import { Form, Input } from "antd";
import { useAuth } from "../context/auth-context";
import { LongButton } from "./index";
import { useAsync } from "../utils/use-async";

export const LoginScreen = ({ onError }: { onError: (err: Error) => void }) => {
  const { login } = useAuth();

  const { run, isLoading } = useAsync(undefined, { throwError: true });

  // prettier-ignore
  const handleSubmit = async (values: { username: string; password: string }) => {
    try {
      await run(login(values))
    } catch (e) {
      onError(e as Error)
    }
  };

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

      <LongButton type="primary" loading={isLoading} htmlType="submit">
        登录
      </LongButton>
    </Form>
  );
};
