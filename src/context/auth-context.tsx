import React, { ReactNode } from "react";
import * as auth from "auth-provider";
import { User } from "../screens/project-list/search-panel";
import { http } from "../utils/http";
import { useMount } from "../utils";
import { useAsync } from "../utils/use-async";
import { FullPageFallback, FullPageLoading } from "../components/lib";

import * as authStore from "../store/auth.slice";
import { bootstrap, selectUser } from "../store/auth.slice";
import { useAppDispatch, useAppSelector } from "../hooks";

export interface AuthForm {
  username: string;
  password: string;
}

export const bootstrapUser = async () => {
  let user = null;
  const token = auth.getToken();

  if (token) {
    const data = await http("me", { token });
    user = data.user;
  }

  return user;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { isIdle, isLoading, error, isError, run } = useAsync<User | null>();

  const dispatch: (...args: unknown[]) => Promise<User> = useAppDispatch();

  useMount(() => {
    run(dispatch(bootstrap()));
  });

  if (isIdle || isLoading) {
    return <FullPageLoading />;
  }

  if (isError) {
    return <FullPageFallback error={error} />;
  }

  return <>{children}</>;
};

export const useAuth = () => {
  const dispatch = useAppDispatch();

  const user = useAppSelector(selectUser);

  const login = (form: AuthForm) => dispatch(authStore.login(form));

  const logout = () => dispatch(authStore.logout());

  const register = (form: AuthForm) => dispatch(authStore.register(form));

  return {
    user,
    login,
    logout,
    register,
  };
};
