import React, { FormEvent } from "react";
import { useAuth } from "../context/auth-context";

export const RegisterScreen = () => {
  const { register } = useAuth();

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const username = (evt.currentTarget.elements[0] as HTMLInputElement).value;
    const password = (evt.currentTarget.elements[1] as HTMLInputElement).value;
    register({ username, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>用户名</label>
        <input type="text" id="username"></input>
      </div>
      <div>
        <label htmlFor="">密码</label>
        <input type="password" id="password" />
      </div>
      <button type="submit">注册</button>
    </form>
  );
};
