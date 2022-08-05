import React, { FormEvent } from "react";
import { useAuth } from "../../context/auth-context";

export const LoginScreen = () => {
  const { login, user } = useAuth();

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const username = (evt.currentTarget.elements[0] as HTMLInputElement).value;
    const password = (evt.currentTarget.elements[1] as HTMLInputElement).value;
    login({ username, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      {user && <h6>当前登录用户: {user?.name}</h6>}
      <div>
        <label>用户名</label>
        <input type="text" id="username"></input>
      </div>
      <div>
        <label htmlFor="">密码</label>
        <input type="password" id="password" />
      </div>
      <button type="submit">登录</button>
    </form>
  );
};
