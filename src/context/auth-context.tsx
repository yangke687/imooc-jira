import React, { ReactNode } from "react";
import * as auth from "auth-provider";
import { http } from "../utils/http";
import { useMount } from "../utils";
import { useAsync } from "../utils/use-async";
import { FullPageFallback, FullPageLoading } from "../components/lib";
import { User } from "../types/user";

interface AuthForm {
  username: string;
  password: string;
}

const bootstrapUser = async () => {
  let user = null;
  const token = auth.getToken();

  if (token) {
    const data = await http("me", { token });
    user = data.user;
  }

  return user;
};

const AuthContext = React.createContext<
  | {
      user: User | null;
      login: Function;
      register: Function;
      logout: Function;
    }
  | undefined
>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const {
    data: user,
    setData: setUser,
    isIdle,
    isLoading,
    error,
    isError,
    run,
  } = useAsync<User | null>();

  const login = (form: AuthForm) => auth.login(form).then(setUser);

  const register = (form: AuthForm) => auth.register(form).then(setUser);

  const logout = () => auth.logout().then(() => setUser(null));

  useMount(() => {
    run(bootstrapUser());
  });

  if (isIdle || isLoading) {
    return <FullPageLoading />;
  }

  if (isError) {
    return <FullPageFallback error={error} />;
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth必须在AuthProvider中使用");
  }

  return context;
};
